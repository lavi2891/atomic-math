import { useCallback, useEffect, useMemo, useRef } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import type { AnswerResult } from "@domain/results/types";
import type {
  ChoiceOption,
  Question,
  RawAnswer,
} from "@domain/questions/types";
import { ContentRenderer } from "@ui/ContentRenderer";
import {
  MultiChoiceAnswerInput,
  NumericAnswerInput,
  SingleChoiceAnswerInput,
} from "./AnswerInputs";
import { DevQuestionDebug } from "./DevQuestionDebug";
import { assert, unreachable } from "@shared/assert";
import { parseMathInput } from "@shared/mathInput";
import { parseExactNumericInput } from "@shared/mathInput/exactNumeric";
import type { ParseErrCode } from "@shared/mathInput";
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

function cryptoSeed(): number {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
    const buf = new Uint32Array(1);
    globalThis.crypto.getRandomValues(buf);
    return buf[0] ?? 0;
  }
  return Math.floor(Math.random() * 0x1_0000_0000);
}

function hashString32(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
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
      return <span dir="ltr">{question.correctAnswers.join(" / ")}</span>;

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
  rated = false,
  onNext,
  onAttempt,
  review,
}: Props) {
  const numericInputRef = useRef<HTMLInputElement>(null);
  const lastHandledEnterTsRef = useRef<number | null>(null);
  const shuffleSeed = useMemo(
    () => cryptoSeed() ^ hashString32(question.id),
    [question.id],
  );

  const solve = useQuestionSolve(question, mode, rated);
  const {
    state: {
      phase,
      inputs: { numericValue, singleId, multiIds },
      lastEval,
    },
    actions: { setNumericValue, setSingleId, setMultiIds, check, nextResult },
    derived: { canCheck, isNumericAnsweringSolve, disabledInputs },
  } = solve;

  const parsedNumeric = useMemo(
    () =>
      question.type === "numeric"
        ? parseMathInput("RATIONAL", numericValue)
        : null,
    [question.type, numericValue],
  );
  const exactNumeric = useMemo(
    () => (question.type === "numeric" ? parseExactNumericInput(numericValue) : null),
    [question.type, numericValue],
  );

  const numericAcceptedFormats =
    question.type === "numeric"
      ? (question.acceptedInputFormats ?? ["integer", "decimal", "fraction"])
      : [];

  function mapErrorToHebrew(code: ParseErrCode | string): string {
    switch (code) {
      case "INVALID_CHAR":
      case "INVALID_CHARS":
      case "INVALID_TOKEN":
        return "יש תווים לא חוקיים";
      case "MISMATCHED_PAREN":
      case "UNBALANCED_PARENS":
        return "סוגריים לא מאוזנים";
      case "DIVIDE_BY_ZERO":
      case "DIV_BY_ZERO":
        return "אסור לחלק באפס";
      case "NOT_ALLOWED_FOR_KIND":
      case "IDENTIFIERS_NOT_ALLOWED":
        return "אסור להשתמש באותיות כאן";
      case "SYNTAX":
      default:
        return "כתיב לא תקין";
    }
  }

  const hasNumericInput = numericValue.trim().length > 0;
  const numericPreviewLatex =
    question.type === "numeric" &&
    hasNumericInput &&
    parsedNumeric &&
    parsedNumeric.ok
      ? (parsedNumeric.latexPreview ?? null)
      : null;
  const numericIsInvalid =
    question.type === "numeric" &&
    hasNumericInput &&
    ((parsedNumeric !== null && !parsedNumeric.ok) ||
      (exactNumeric !== null &&
        exactNumeric.ok &&
        !numericAcceptedFormats.includes(exactNumeric.format)));
  const numericHelperText =
    numericIsInvalid && parsedNumeric && !parsedNumeric.ok
      ? mapErrorToHebrew(parsedNumeric.error.code)
      : question.type === "numeric" &&
          hasNumericInput &&
          exactNumeric &&
          exactNumeric.ok &&
          !numericAcceptedFormats.includes(exactNumeric.format)
        ? exactNumeric.format === "fraction"
          ? "כאן עונים בלי שבר פשוט"
          : exactNumeric.format === "decimal"
            ? "כאן עונים בלי מספר עשרוני"
            : "הפורמט הזה לא נתמך כאן"
      : null;
  const numericEmphasizeFraction =
    question.type === "numeric" &&
    hasNumericInput &&
    /[/\\]/.test(numericValue);
  const numericCanCheck =
    question.type === "numeric"
      ? canCheck && hasNumericInput && !numericIsInvalid
      : canCheck;

  function onCheck() {
    if (question.type === "numeric") {
      if (!parsedNumeric || !parsedNumeric.ok || parsedNumeric.kind !== "RATIONAL")
        return;
      const attemptEvent = check(parsedNumeric.value);
      if (attemptEvent) {
        onAttempt?.(attemptEvent);
      }
      return;
    }

    const attemptEvent = check();
    if (attemptEvent) {
      onAttempt?.(attemptEvent);
    }
  }

  const onNextClick = useCallback(() => {
    if (mode !== "solve") return;
    assert(onNext, "onNext is required in solve mode");

    const result = nextResult();
    assert(result, "Next requires evaluation");
    onNext(result);
  }, [mode, nextResult, onNext]);

  function onNumericSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === "solve" && phase === "checked") {
      onNextClick();
      return;
    }

    if (
      question.type === "numeric" &&
      (!hasNumericInput || !parsedNumeric || !parsedNumeric.ok)
    ) {
      return;
    }

    onCheck();
  }

  function onWrapperKeyDownCapture(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)
      return;
    if (mode !== "solve" || phase !== "checked") return;
    if (lastHandledEnterTsRef.current === event.timeStamp) return;

    lastHandledEnterTsRef.current = event.timeStamp;
    event.preventDefault();
    event.stopPropagation();
    onNextClick();
  }

  useEffect(() => {
    if (mode !== "solve") return;
    if (question.type !== "numeric") return;
    if (phase !== "answering") return;

    const rafId = requestAnimationFrame(() => {
      const input = numericInputRef.current;
      if (!input) return;

      input.focus({ preventScroll: true });
      if (input.value.length > 0) input.select();
    });

    return () => cancelAnimationFrame(rafId);
  }, [mode, phase, question.id, question.type]);

  useEffect(() => {
    if (mode !== "solve" || phase !== "checked") return;

    function onWindowKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Enter") return;
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)
        return;
      if (lastHandledEnterTsRef.current === event.timeStamp) return;

      lastHandledEnterTsRef.current = event.timeStamp;
      event.preventDefault();
      event.stopPropagation();
      onNextClick();
    }

    window.addEventListener("keydown", onWindowKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", onWindowKeyDown, {
        capture: true,
      });
  }, [mode, onNextClick, phase]);

  const reviewData = mode === "review" ? review : null;
  const showCorrect = reviewData?.showCorrectAnswer ?? true;
  const numericUxProps = {
    previewLatex: numericPreviewLatex,
    helperText: numericHelperText,
    isInvalid: numericIsInvalid,
    emphasizeFraction: numericEmphasizeFraction,
  } as const;

  return (
    <div
      onKeyDownCapture={onWrapperKeyDownCapture}
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
                inputRef={numericInputRef}
                autoFocus
                {...numericUxProps}
              />
              <button
                type="submit"
                disabled={!numericCanCheck}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  minWidth: 0,
                  padding: `${spacing.sm}px ${spacing.md}px`,
                  borderRadius: radius.md,
                  border: `1px solid ${colors.border}`,
                  cursor: !numericCanCheck ? "not-allowed" : "pointer",
                }}
              >
                {he.session.check}
              </button>
            </form>
          ) : (
            <NumericAnswerInput
              question={question}
              value={numericValue}
              onChange={setNumericValue}
              disabled={disabledInputs}
              inputRef={numericInputRef}
              autoFocus
              {...numericUxProps}
            />
          )
        ) : question.type === "singleChoice" ? (
          <SingleChoiceAnswerInput
            question={question}
            selectedOptionId={singleId}
            onChange={setSingleId}
            shuffleSeed={shuffleSeed}
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
              shuffleSeed={shuffleSeed}
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

      {mode === "solve" && !isNumericAnsweringSolve ? (
        <div style={{ display: "flex", gap: spacing.sm, minWidth: 0 }}>
          {phase === "answering" ? (
            <button
              type="button"
              onClick={onCheck}
              disabled={
                question.type === "numeric" ? !numericCanCheck : !canCheck
              }
              style={{
                flex: 1,
                minWidth: 0,
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
                padding: `${spacing.sm}px ${spacing.md}px`,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                cursor:
                  question.type === "numeric" && !numericCanCheck
                    ? "not-allowed"
                    : !canCheck
                      ? "not-allowed"
                      : "pointer",
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

      <DevQuestionDebug question={question} />
    </div>
  );
}
