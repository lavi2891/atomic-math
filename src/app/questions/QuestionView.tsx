import type { FormEvent } from "react";
import type { AnswerResult } from "@domain/results/types";
import type { ChoiceOption, Question, RawAnswer } from "@domain/questions/types";
import { ContentRenderer } from "@ui/ContentRenderer";
import {
  MultiChoiceAnswerInput,
  NumericAnswerInput,
  SingleChoiceAnswerInput,
} from "./AnswerInputs";
import { assert, unreachable } from "@shared/assert";
import { he } from "@copy/he";
import { colors, fontSize, lineHeight, radius, spacing } from "@ui/tokens";
import {
  useQuestionSolve,
  type QuestionAttemptEvent,
} from "./useQuestionSolve";

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
  rated?: boolean;
  onNext?: (result: AnswerResult) => void;
  onAttempt?: (event: QuestionAttemptEvent) => void;
  review?: ReviewData;
};

function findOptionsByIds(options: ChoiceOption[], ids: string[]): ChoiceOption[] {
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
      const opt = question.options.find((o) => o.id === question.correctOptionId);
      return opt ? <ContentRenderer content={opt.content} /> : <span>-</span>;
    }

    case "multiChoice": {
      const opts = findOptionsByIds(question.options, question.correctOptionIds);

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
  rated = false,
  onNext,
  onAttempt,
  review,
}: Props) {
  const solve = useQuestionSolve(question, mode, rated);
  const {
    state: {
      phase,
      inputs: { numericValue, singleId, multiIds },
      errors: { numericValidationError },
      lastEval,
    },
    actions: { setNumericValue, setSingleId, setMultiIds, check, nextResult },
    derived: { canCheck, isNumericAnsweringSolve, disabledInputs },
  } = solve;

  function onCheck() {
    const attemptEvent = check();
    if (attemptEvent) {
      onAttempt?.(attemptEvent);
    }
  }

  function onNumericSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onCheck();
  }

  function onNextClick() {
    if (mode !== "solve") return;
    assert(onNext, "onNext is required in solve mode");

    const result = nextResult();
    assert(result, "Next requires evaluation");
    onNext(result);
  }

  const reviewData = mode === "review" ? review : null;
  const showCorrect = reviewData?.showCorrectAnswer ?? true;

  return (
    <div
      style={{
        display: "grid",
        gap: spacing.md,
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          fontSize: fontSize.md,
          lineHeight: lineHeight.md,
          overflowWrap: "anywhere",
          wordBreak: "break-word",
          minWidth: 0,
        }}
      >
        <ContentRenderer content={question.prompt} />
      </div>

      <div>
        {question.type === "numeric" ? (
          isNumericAnsweringSolve ? (
            <form
              onSubmit={onNumericSubmit}
              style={{ display: "grid", gap: spacing.sm, minWidth: 0 }}
            >
              <NumericAnswerInput
                question={question}
                value={numericValue}
                onChange={setNumericValue}
                disabled={disabledInputs}
              />
              <button
                type="submit"
                disabled={!canCheck}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  minWidth: 0,
                  padding: `${spacing.sm}px ${spacing.md}px`,
                  borderRadius: radius.md,
                  border: `1px solid ${colors.border}`,
                  cursor: !canCheck ? "not-allowed" : "pointer",
                }}
              >
                {he.session.check}
              </button>
              {numericValidationError ? (
                <div style={{ color: "#ff8a80", fontSize: fontSize.sm }}>
                  {numericValidationError}
                </div>
              ) : null}
            </form>
          ) : (
            <NumericAnswerInput
              question={question}
              value={numericValue}
              onChange={setNumericValue}
              disabled={disabledInputs}
            />
          )
        ) : question.type === "singleChoice" ? (
          <SingleChoiceAnswerInput
            question={question}
            selectedOptionId={singleId}
            onChange={setSingleId}
            disabled={disabledInputs}
          />
        ) : question.type === "multiChoice" ? (
          <div style={{ display: "grid", gap: spacing.xs }}>
            <div
              style={{
                fontSize: fontSize.sm,
                color: colors.textMuted,
              }}
            >
              {he.question.multiHint}
            </div>
            <MultiChoiceAnswerInput
              question={question}
              selectedOptionIds={multiIds}
              onChange={setMultiIds}
              disabled={disabledInputs}
            />
          </div>
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
            {he.review.yourAnswer} {getUserAnswerNode(question, reviewData.rawAnswer)}
          </div>

          {showCorrect ? (
            <div>
              {he.review.correctAnswer} {getCorrectAnswerNode(question)}
            </div>
          ) : null}
        </div>
      )}

      {mode === "solve" && !isNumericAnsweringSolve ? (
        <div style={{ display: "flex", gap: spacing.sm, minWidth: 0 }}>
          {phase === "answering" ? (
            <button
              type="button"
              onClick={onCheck}
              disabled={!canCheck}
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                padding: `${spacing.sm}px ${spacing.md}px`,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                cursor: !canCheck ? "not-allowed" : "pointer",
              }}
            >
              {he.session.check}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNextClick}
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                padding: `${spacing.sm}px ${spacing.md}px`,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                cursor: "pointer",
              }}
            >
              {he.session.next}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
