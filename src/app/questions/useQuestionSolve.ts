import { useEffect, useMemo, useRef, useState } from "react";
import type { AnswerResult } from "@domain/results/types";
import type { RawAnswer, Question } from "@domain/questions/types";
import type { RecordAttemptInput } from "@domain/stats/types";
import { evaluateAnswer } from "@domain/questions/evaluators";
import { assert, unreachable } from "@shared/assert";
import { he } from "@copy/he";

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
};

type SolveState = {
  questionId: string;
  phase: Phase;
  numericValue: string;
  numericValidationError: string | null;
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
  errors: {
    numericValidationError: string | null;
  };
  lastEval: LastEval | null;
};

export type QuestionAttemptEvent = RecordAttemptInput;

export type UseQuestionSolveResult = {
  state: QuestionSolveState;
  actions: {
    setNumericValue: (value: string) => void;
    setSingleId: (value: string) => void;
    setMultiIds: (value: string[]) => void;
    check: () => QuestionAttemptEvent | null;
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
    numericValidationError: null,
    singleId: null,
    multiIds: [],
    lastEval: null,
    nextAttemptIndex: 0,
  };
}

function getStateForQuestion(state: SolveState, questionId: string): SolveState {
  return state.questionId === questionId
    ? state
    : createInitialSolveState(questionId);
}

export function useQuestionSolve(
  question: Question,
  mode: Mode,
  rated: boolean,
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
  const {
    phase,
    numericValue,
    numericValidationError,
    singleId,
    multiIds,
    lastEval,
  } = currentState;

  const trimmedNumericValue = numericValue.trim();
  const parsedNumericValue = Number(trimmedNumericValue);
  const isValidNumericInput =
    trimmedNumericValue.length > 0 && Number.isFinite(parsedNumericValue);

  const canCheck = useMemo(() => {
    if (mode !== "solve") return false;

    switch (question.type) {
      case "numeric":
        return isValidNumericInput;
      case "singleChoice":
        return singleId !== null;
      case "multiChoice":
        return multiIds.length > 0;
      default:
        return unreachable(question, "Unknown question type");
    }
  }, [mode, question, isValidNumericInput, singleId, multiIds]);

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
      numericValidationError: null,
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

  function check(): QuestionAttemptEvent | null {
    if (mode !== "solve") return null;

    if (question.type === "numeric" && !isValidNumericInput) {
      setSolveState((prev) => ({
        ...getStateForQuestion(prev, question.id),
        numericValidationError: he.validation.invalidNumber,
      }));
      return null;
    }

    if (!canCheck) return null;

    const checkedAt = Date.now();
    checkedAtRef.current = checkedAt;
    responseTimeMsRef.current = Math.max(0, checkedAt - startTsRef.current);

    const raw = buildRaw();
    const evaluation = evaluateAnswer(question, raw);
    const responseTimeMs =
      responseTimeMsRef.current ?? Math.max(0, checkedAt - startTsRef.current);
    const attemptIndex = currentState.nextAttemptIndex;

    setSolveState((prev) => {
      const next = getStateForQuestion(prev, question.id);
      return {
        ...next,
        phase: "checked",
        lastEval: {
          isCorrect: evaluation.isCorrect,
          message: evaluation.message,
          raw,
          attemptIndex,
          responseTimeMs,
          checkedAt,
        },
        nextAttemptIndex: next.nextAttemptIndex + 1,
      };
    });

    return {
      questionId: question.id,
      topicId: question.topicId,
      correct: evaluation.isCorrect,
      timeMs: responseTimeMs,
      rated,
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
      responseTimeMs: lastEval.responseTimeMs,
      timestamp: Date.now(),
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
      errors: {
        numericValidationError,
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
