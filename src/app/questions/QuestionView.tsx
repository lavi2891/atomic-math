import { useEffect, useMemo, useRef, useState } from "react";
import type { AnswerResult } from "@domain/results/types";
import type {
  ChoiceOption,
  Question,
  RawAnswer,
} from "@domain/questions/types";
import { evaluateAnswer } from "@domain/questions/evaluators";
import { ContentRenderer } from "@ui/ContentRenderer";
import {
  MultiChoiceAnswerInput,
  NumericAnswerInput,
  SingleChoiceAnswerInput,
} from "./AnswerInputs";
import { assert, unreachable } from "@shared/assert";
import { he } from "@copy/he";
import { colors, fontSize, lineHeight, radius, spacing } from "@ui/tokens";

type Mode = "solve" | "review";

type AnyRawAnswer =
  | RawAnswer<"numeric">
  | RawAnswer<"singleChoice">
  | RawAnswer<"multiChoice">;

type ReviewData = {
  rawAnswer: AnyRawAnswer;
  isCorrect: boolean;
  showCorrectAnswer?: boolean;
};

type Props = {
  question: Question;
  mode?: Mode;
  onNext?: (result: AnswerResult) => void;
  review?: ReviewData;
};

type Phase = "answering" | "checked";

type LastEval = {
  isCorrect: boolean;
  message?: string;
  raw: AnyRawAnswer;
};

type SolveState = {
  questionId: string;
  phase: Phase;
  numericValue: string;
  singleId: string | null;
  multiIds: string[];
  lastEval: LastEval | null;
};

function createInitialSolveState(questionId: string): SolveState {
  return {
    questionId,
    phase: "answering",
    numericValue: "",
    singleId: null,
    multiIds: [],
    lastEval: null,
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

function findOptionsByIds(
  options: ChoiceOption[],
  ids: string[],
): ChoiceOption[] {
  return ids.flatMap((id) => {
    const opt = options.find((o) => o.id === id);
    return opt ? [opt] : [];
  });
}

function getUserAnswerNode(question: Question, raw: AnyRawAnswer) {
  if (question.type !== raw.questionType) return <span>-</span>;

  switch (raw.questionType) {
    case "numeric":
      return <span dir="ltr">{raw.data.value}</span>;

    case "singleChoice": {
      if (question.type !== "singleChoice") return <span>-</span>;
      const opt = question.options.find((o) => o.id === raw.data.optionId);
      return opt ? <ContentRenderer content={opt.content} /> : <span>-</span>;
    }

    case "multiChoice": {
      if (question.type !== "multiChoice") return <span>-</span>;
      const opts = findOptionsByIds(question.options, raw.data.optionIds);

      if (opts.length === 0) return <span>-</span>;

      return (
        <span>
          {opts.map((o) => (
            <span key={o.id} style={{ marginInlineEnd: spacing.xs }}>
              <ContentRenderer content={o.content} />
            </span>
          ))}
        </span>
      );
    }
  }
}

function getCorrectAnswerNode(question: Question) {
  switch (question.type) {
    case "numeric":
      return <span dir="ltr">{question.answer}</span>;

    case "singleChoice": {
      const opt = question.options.find(
        (o) => o.id === question.correctOptionId,
      );
      return opt ? <ContentRenderer content={opt.content} /> : <span>-</span>;
    }

    case "multiChoice": {
      const opts = findOptionsByIds(
        question.options,
        question.correctOptionIds,
      );

      if (opts.length === 0) return <span>-</span>;

      return (
        <span>
          {opts.map((o) => (
            <span key={o.id} style={{ marginInlineEnd: spacing.xs }}>
              <ContentRenderer content={o.content} />
            </span>
          ))}
        </span>
      );
    }

    default:
      return unreachable(question, "Unknown question type");
  }
}

export function QuestionView({
  question,
  mode = "solve",
  onNext,
  review,
}: Props) {
  const startTsRef = useRef<number>(0);
  const checkedAtRef = useRef<number | null>(null);
  const solveTimeMsRef = useRef<number | null>(null);
  useEffect(() => {
    if (mode === "solve") {
      startTsRef.current = Date.now();
      checkedAtRef.current = null;
      solveTimeMsRef.current = null;
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

  function onCheck() {
    if (mode !== "solve") return;
    if (!canCheck) return;

    const checkedAt = Date.now();
    checkedAtRef.current = checkedAt;
    solveTimeMsRef.current = Math.max(0, checkedAt - startTsRef.current);

    const raw = buildRaw();
    const ev = evaluateAnswer(question, raw);

    setSolveState((prev) => {
      const next = getStateForQuestion(prev, question.id);
      return {
        ...next,
        phase: "checked",
        lastEval: { isCorrect: ev.isCorrect, message: ev.message, raw },
      };
    });
  }

  function onNextClick() {
    if (mode !== "solve") return;
    assert(lastEval, "Next requires evaluation");
    assert(onNext, "onNext is required in solve mode");

    const responseTimeMs =
      solveTimeMsRef.current ?? Math.max(0, Date.now() - startTsRef.current);

    const result: AnswerResult = {
      questionId: question.id,
      topicId: question.topicId,
      attemptIndex: 0,
      isCorrect: lastEval.isCorrect,
      rawAnswer: lastEval.raw,
      responseTimeMs,
      timestamp: Date.now(),
    };

    onNext(result);
  }

  const reviewData = mode === "review" ? review : null;
  const showCorrect = reviewData?.showCorrectAnswer ?? true;

  return (
    <div style={{ display: "grid", gap: spacing.md }}>
      <div style={{ fontSize: fontSize.md, lineHeight: lineHeight.md }}>
        <ContentRenderer content={question.prompt} />
      </div>

      <div>
        {question.type === "numeric" ? (
          <NumericAnswerInput
            question={question}
            value={numericValue}
            onChange={(value) =>
              setSolveState((prev) => ({
                ...getStateForQuestion(prev, question.id),
                numericValue: value,
              }))
            }
            disabled={disabledInputs}
          />
        ) : question.type === "singleChoice" ? (
          <SingleChoiceAnswerInput
            question={question}
            selectedOptionId={singleId}
            onChange={(value) =>
              setSolveState((prev) => ({
                ...getStateForQuestion(prev, question.id),
                singleId: value,
              }))
            }
            disabled={disabledInputs}
          />
        ) : question.type === "multiChoice" ? (
          <MultiChoiceAnswerInput
            question={question}
            selectedOptionIds={multiIds}
            onChange={(value) =>
              setSolveState((prev) => ({
                ...getStateForQuestion(prev, question.id),
                multiIds: value,
              }))
            }
            disabled={disabledInputs}
          />
        ) : (
          unreachable(question, "Unknown question type")
        )}
      </div>

      {mode === "solve" && phase === "checked" && lastEval && (
        <div
          style={{
            padding: `${spacing.sm}px ${spacing.md}px`,
            borderRadius: radius.md,
            border: `1px solid ${colors.borderSubtle}`,
            background: colors.bgSubtle,
          }}
        >
          <strong>
            {lastEval.isCorrect ? he.feedback.correct : he.feedback.incorrect}
          </strong>
          {lastEval.message ? (
            <div style={{ marginTop: spacing.xs }}>{lastEval.message}</div>
          ) : null}
        </div>
      )}

      {mode === "review" && reviewData && (
        <div
          style={{
            padding: `${spacing.sm}px ${spacing.md}px`,
            borderRadius: radius.md,
            border: `1px solid ${colors.borderSubtle}`,
            background: colors.bgSubtle,
            display: "grid",
            gap: spacing.xs,
          }}
        >
          <strong>
            {reviewData.isCorrect ? he.feedback.correct : he.feedback.incorrect}
          </strong>

          <div>
            {he.review.yourAnswer}{" "}
            {getUserAnswerNode(question, reviewData.rawAnswer)}
          </div>

          {showCorrect ? (
            <div>
              {he.review.correctAnswer} {getCorrectAnswerNode(question)}
            </div>
          ) : null}
        </div>
      )}

      {mode === "solve" ? (
        <div style={{ display: "flex", gap: spacing.sm }}>
          {phase === "answering" ? (
            <button
              type="button"
              onClick={onCheck}
              disabled={!canCheck}
              style={{
                flex: 1,
                padding: `${spacing.sm}px ${spacing.md}px`,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                cursor: !canCheck ? "not-allowed" : "pointer",
              }}
            >
              {he.actions.check}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNextClick}
              style={{
                flex: 1,
                padding: `${spacing.sm}px ${spacing.md}px`,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                cursor: "pointer",
              }}
            >
              {he.actions.next}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
