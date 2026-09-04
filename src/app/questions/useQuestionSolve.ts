import { useEffect, useMemo, useRef, useState } from "react";
import type { AnswerResult } from "@domain/results/types";
import type { RawAnswer, Question } from "@domain/questions/types";
import { evaluateAnswer } from "@domain/questions/evaluators";
import { assert, unreachable } from "@shared/assert";

type Mode = "solve" | "review";
type Phase = "answering" | "checked";

type AnyRawAnswer =
  | RawAnswer<"numeric">
  | RawAnswer<"singleChoice">
  | RawAnswer<"multiChoice">;

type LastEval = {
  isCorrect: boolean;
  message?: string;
  raw: AnyRawAnswer;
  attemptIndex: number;
  responseTimeMs: number;
  checkedAt: number;
  normalizedAnswer?: unknown;
};

type SolveState = {
  questionId: string;
  phase: Phase;
  numericValue: string;
  singleId: string | null;
  multiIds: string[];
  lastEval: LastEval | null;
  nextAttemptIndex: number;
};

export type QuestionSolveState = {
  phase: Phase;
  inputs: {
    numericValue: string;
    singleId: string | null;
    multiIds: string[];
  };
  lastEval: LastEval | null;
};

export type UseQuestionSolveResult = {
  state: QuestionSolveState;
  actions: {
    setNumericValue: (value: string) => void;
    setSingleId: (value: string) => void;
    setMultiIds: (value: string[]) => void;
    check: (numericParsedValue?: number | null) => AnswerResult | null;
    nextResult: () => AnswerResult | null;
  };
  derived: {
    canCheck: boolean;
    isNumericAnsweringSolve: boolean;
    disabledInputs: boolean;
  };
};

function createInitialSolveState(questionId: string): SolveState {
  return {
    questionId,
    phase: "answering",
    numericValue: "",
    singleId: null,
    multiIds: [],
    lastEval: null,
    nextAttemptIndex: 0,
  };
}

function getStateForQuestion(
  state: SolveState,
  questionId: string,
): SolveState {
  return state.questionId === questionId
    ? state
    : createInitialSolveState(questionId);
}

export function useQuestionSolve(
  question: Question,
  mode: Mode,
): UseQuestionSolveResult {
  const startTsRef = useRef<number>(0);
  const checkedAtRef = useRef<number | null>(null);
  const responseTimeMsRef = useRef<number | null>(null);

  useEffect(() => {
    if (mode === "solve") {
      startTsRef.current = Date.now();
      checkedAtRef.current = null;
      responseTimeMsRef.current = null;
    }
  }, [mode, question.id]);

  const [solveState, setSolveState] = useState<SolveState>(() =>
    createInitialSolveState(question.id),
  );

  const currentState = getStateForQuestion(solveState, question.id);
  const { phase, numericValue, singleId, multiIds, lastEval } = currentState;

  const canCheck = useMemo(() => {
    if (mode !== "solve") return false;

    switch (question.type) {
      case "numeric":
        return numericValue.trim().length > 0;
      case "singleChoice":
        return singleId !== null;
      case "multiChoice":
        return multiIds.length > 0;
      default:
        return unreachable(question, "Unknown question type");
    }
  }, [mode, question, numericValue, singleId, multiIds]);

  const disabledInputs = mode === "review" || phase === "checked";
  const isNumericAnsweringSolve =
    mode === "solve" && question.type === "numeric" && phase === "answering";

  function buildRaw(): AnyRawAnswer {
    switch (question.type) {
      case "numeric":
        return { questionType: "numeric", data: { value: numericValue } };

      case "singleChoice":
        assert(singleId !== null, "singleChoice requires optionId");
        return { questionType: "singleChoice", data: { optionId: singleId } };

      case "multiChoice":
        return { questionType: "multiChoice", data: { optionIds: multiIds } };

      default:
        return unreachable(question, "Unknown question type");
    }
  }

  function setNumericValue(value: string) {
    setSolveState((prev) => ({
      ...getStateForQuestion(prev, question.id),
      numericValue: value,
    }));
  }

  function setSingleId(value: string) {
    setSolveState((prev) => ({
      ...getStateForQuestion(prev, question.id),
      singleId: value,
    }));
  }

  function setMultiIds(value: string[]) {
    setSolveState((prev) => ({
      ...getStateForQuestion(prev, question.id),
      multiIds: value,
    }));
  }

  function check(
    numericParsedValue?: number | null,
  ): AnswerResult | null {
    if (mode !== "solve") return null;
    if (!canCheck || phase === "checked" || checkedAtRef.current !== null) return null;

    if (
      question.type === "numeric" &&
      (numericParsedValue === null ||
        numericParsedValue === undefined ||
        !Number.isFinite(numericParsedValue))
    ) {
      return null;
    }

    const checkedAt = Date.now();
    checkedAtRef.current = checkedAt;
    responseTimeMsRef.current = Math.max(0, checkedAt - startTsRef.current);

    let raw: AnyRawAnswer;
    let isCorrect: boolean;
    let message: string | undefined;
    let normalizedAnswer: unknown;

    if (question.type === "numeric") {
      assert(
        numericParsedValue !== null && numericParsedValue !== undefined,
        "numeric check requires valid parsed input",
      );
      raw = {
        questionType: "numeric",
        data: { value: numericValue },
      };
      const evaluation = evaluateAnswer(question, raw);
      isCorrect = evaluation.isCorrect;
      message = evaluation.message;
      normalizedAnswer = evaluation.normalizedAnswer;
    } else {
      raw = buildRaw();
      const evaluation = evaluateAnswer(question, raw);
      isCorrect = evaluation.isCorrect;
      message = evaluation.message;
      normalizedAnswer = evaluation.normalizedAnswer;
    }

    const responseTimeMs =
      responseTimeMsRef.current ?? Math.max(0, checkedAt - startTsRef.current);
    const attemptIndex = currentState.nextAttemptIndex;

    setSolveState((prev) => {
      const next = getStateForQuestion(prev, question.id);
      return {
        ...next,
        phase: "checked",
        lastEval: {
          isCorrect,
          message,
          raw,
          attemptIndex,
          responseTimeMs,
          checkedAt,
          normalizedAnswer,
        },
        nextAttemptIndex: next.nextAttemptIndex + 1,
      };
    });

    return {
      questionId: question.id,
      topicId: question.topicId,
      attemptIndex,
      isCorrect,
      rawAnswer: raw,
      normalizedAnswer,
      responseTimeMs,
      timestamp: checkedAt,
    };
  }

  function nextResult(): AnswerResult | null {
    if (mode !== "solve") return null;
    if (!lastEval) return null;

    return {
      questionId: question.id,
      topicId: question.topicId,
      attemptIndex: lastEval.attemptIndex,
      isCorrect: lastEval.isCorrect,
      rawAnswer: lastEval.raw,
      normalizedAnswer: lastEval.normalizedAnswer,
      responseTimeMs: lastEval.responseTimeMs,
      timestamp: lastEval.checkedAt,
    };
  }

  return {
    state: {
      phase,
      inputs: {
        numericValue,
        singleId,
        multiIds,
      },
      lastEval,
    },
    actions: {
      setNumericValue,
      setSingleId,
      setMultiIds,
      check,
      nextResult,
    },
    derived: {
      canCheck,
      isNumericAnsweringSolve,
      disabledInputs,
    },
  };
}
