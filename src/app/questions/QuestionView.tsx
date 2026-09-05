import { useCallback, useEffect, useMemo, useRef } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import type { AnswerResult } from "@domain/results/types";
import type {
  ChoiceOption,
  Question,
  RawAnswer,
} from "@domain/questions/types";
import { ContentRenderer } from "@ui/ContentRenderer";
import { ResponsiveMedia } from "@ui/ResponsiveMedia";
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
import { useQuestionSolve } from "./useQuestionSolve";
import { numericAnswerFormatHint, resolveAcceptedInputFormats } from "@domain/questions/evaluators";

import { feedbackDelayMs } from "../../domain/session/studentSessionUx.ts";
import type { SessionMode } from "../../domain/session/practiceSession.ts";

import { MobileSubmitBar } from "./MobileSubmitBar.tsx";
import type { PracticeViewport } from "../session/usePracticeViewport.ts";

type Mode = "solve" | "review";

type AnyRawAnswer =
  | RawAnswer<"numeric">
  | RawAnswer<"singleChoice">
  | RawAnswer<"multiChoice">;

type ReviewData = {
  rawAnswer: AnyRawAnswer;
  isCorrect: boolean;
  showCorrectAnswer?: boolean;
  tone?: "default" | "neutral";
};

type Props = {
  question: Question;
  mode?: Mode;
  sessionMode?: SessionMode;
  viewport?: PracticeViewport;
  onNext?: (result: AnswerResult) => void;
  onEvaluated?: (result: AnswerResult) => void;
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
      return <NumericMathValue value={raw.data.value} />;

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
      return (
        <span>
          {question.correctAnswers.map((answer, index) => (
            <span key={`${answer}-${index}`} style={{ marginInlineEnd: spacing.xs }}>
              {index > 0 ? <span aria-hidden="true">/ </span> : null}
              <NumericMathValue value={answer} />
            </span>
          ))}
        </span>
      );

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
  sessionMode = "practice",
  viewport,
  onNext,
  onEvaluated,
  review,
}: Props) {
  const mobileAction = mode === "solve" && !!viewport?.narrow;
  const autoAdvanceMs = feedbackDelayMs(sessionMode);
  const numericInputRef = useRef<HTMLInputElement>(null);
  const lastHandledEnterTsRef = useRef<number | null>(null);
  const shuffleSeed = useMemo(
    () => cryptoSeed() ^ hashString32(question.id),
    [question.id],
  );

  const solve = useQuestionSolve(question, mode);
  const {
    state: {
      phase,
      inputs: { numericValue, singleId, multiIds },
      lastEval,
    },
    actions: { setNumericValue, setSingleId, setMultiIds, check, nextResult },
    derived: { canCheck, disabledInputs },
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
      ? resolveAcceptedInputFormats(question)
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
      exactNumeric === null ||
      !exactNumeric.ok ||
      (exactNumeric !== null &&
        exactNumeric.ok &&
        !numericAcceptedFormats.includes(exactNumeric.format)));
  const numericHelperText =
    numericIsInvalid && parsedNumeric && !parsedNumeric.ok
      ? mapErrorToHebrew(parsedNumeric.error.code)
      : numericIsInvalid && (!exactNumeric || !exactNumeric.ok)
        ? mapErrorToHebrew("SYNTAX")
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
  const numericFormatHint = question.type === "numeric" ? numericAnswerFormatHint(question) : null;
  const numericCanCheck =
    question.type === "numeric"
      ? canCheck && hasNumericInput && !numericIsInvalid
      : canCheck;

  function onCheck() {
    if (phase !== "answering" || (question.type === "numeric" ? !numericCanCheck : !canCheck)) return;
    if (question.type === "numeric") {
      if (!parsedNumeric || !parsedNumeric.ok || parsedNumeric.kind !== "RATIONAL")
        return;
      const result = check(parsedNumeric.value);
      if (result) onEvaluated?.(result);
      return;
    }

    const result = check();
    if (result) onEvaluated?.(result);
  }

  const onNextClick = useCallback(() => {
    if (mode !== "solve") return;
    assert(onNext, "onNext is required in solve mode");

    const result = nextResult();
    assert(result, "Next requires evaluation");
    onNext(result);
  }, [mode, nextResult, onNext]);

  const advanceRef = useRef(onNextClick);
  useEffect(() => { advanceRef.current = onNextClick; }, [onNextClick]);
  useEffect(() => {
    if (mode !== "solve" || phase !== "checked" || autoAdvanceMs === null) return;
    const timeout = window.setTimeout(() => advanceRef.current(), autoAdvanceMs);
    return () => window.clearTimeout(timeout);
  }, [mode, phase, autoAdvanceMs]);

  function onNumericSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (phase !== "answering") return;

    if (
      question.type === "numeric" &&
      (!numericCanCheck || !hasNumericInput || !parsedNumeric || !parsedNumeric.ok)
    ) {
      return;
    }

    onCheck();
  }

  function onWrapperKeyDownCapture(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" || event.repeat || event.nativeEvent.isComposing) return;
    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)
      return;
    if (mode !== "solve" || phase !== "checked") return;
    if (lastHandledEnterTsRef.current === event.timeStamp) return;

    lastHandledEnterTsRef.current = event.timeStamp;
    event.preventDefault();
    event.stopPropagation();
    if (autoAdvanceMs === null) onNextClick();
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
    if (!viewport?.keyboardOpen) return;
    // Keep a long question's focused field clear of the action bar without
    // swapping or resizing the question card when the keyboard opens.
    const frame = requestAnimationFrame(() => {
      const input = numericInputRef.current;
      if (!input) return;
      const rect = input.getBoundingClientRect();
      const visibleBottom = viewport.top + viewport.height - 84;
      if (rect.bottom > visibleBottom) window.scrollBy(0, rect.bottom - visibleBottom + spacing.xs);
    });
    return () => cancelAnimationFrame(frame);
  }, [viewport?.height, viewport?.keyboardOpen, viewport?.top, question.id]);

  useEffect(() => {
    if (mode !== "solve" || phase !== "checked") return;

    function onWindowKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key !== "Enter" || event.repeat || event.isComposing) return;
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey)
        return;
      if (lastHandledEnterTsRef.current === event.timeStamp) return;

      lastHandledEnterTsRef.current = event.timeStamp;
      event.preventDefault();
      event.stopPropagation();
      if (autoAdvanceMs === null) onNextClick();
    }

    window.addEventListener("keydown", onWindowKeyDown, { capture: true });
    return () =>
      window.removeEventListener("keydown", onWindowKeyDown, {
        capture: true,
      });
  }, [mode, onNextClick, phase, autoAdvanceMs]);

  const reviewData = mode === "review" ? review : null;
  const showCorrect = reviewData?.showCorrectAnswer ?? true;
  const numericUxProps = {
    previewLatex: numericPreviewLatex,
    helperText: numericHelperText,
    isInvalid: numericIsInvalid,
    emphasizeFraction: numericEmphasizeFraction,
    formatHint: numericFormatHint,
  } as const;
  const showPrimaryAction = mode === "solve" && (phase === "answering" || autoAdvanceMs === null);
  const primaryActionDisabled = phase === "answering" && (question.type === "numeric" ? !numericCanCheck : !canCheck);
  const primaryActionLabel = phase === "answering" ? he.session.check : he.session.next;
  const onPrimaryAction = phase === "answering" ? onCheck : onNextClick;

  return (
    <div
      className="practice-question"
      onKeyDownCapture={onWrapperKeyDownCapture}
      style={{
        display: "grid",
        gap: spacing.md,
        overflowY: viewport?.keyboardOpen ? "auto" : undefined,
        minHeight: 0,
        alignContent: "start",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "hidden",
      }}
    >
      <div
        className="practice-question__prompt"
        style={{
          fontSize: fontSize.md,
          lineHeight: lineHeight.md,
          overflowWrap: "anywhere",
          wordBreak: "break-word",
          minWidth: 0,
        }}
      >
        {question.media ? <ResponsiveMedia media={question.media} /> : null}
        <ContentRenderer content={question.prompt} />
      </div>

      {mode === "solve" ? <div className="practice-question__answer">
        {question.type === "numeric" ? (
          <form onSubmit={onNumericSubmit} style={{ display: "grid", gap: spacing.sm, minWidth: 0 }}>
            <NumericAnswerInput
              question={question}
              value={numericValue}
              onChange={setNumericValue}
              disabled={disabledInputs}
              inputRef={numericInputRef}
              autoFocus
              feedbackState={phase === "checked" && lastEval ? (lastEval.isCorrect ? "correct" : "incorrect") : undefined}
              {...numericUxProps}
            />
          </form>
        ) : question.type === "singleChoice" ? (
          <SingleChoiceAnswerInput
            question={question}
            selectedOptionId={singleId}
            onChange={setSingleId}
            shuffleSeed={shuffleSeed}
            disabled={disabledInputs}
            showFeedback={phase === "checked"}
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
              showFeedback={phase === "checked"}
            />
          </div>
        ) : (
          unreachable(question, "Unknown question type")
        )}
      </div> : null}

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
            {reviewData.isCorrect ? he.feedback.correct : reviewData.tone === "neutral" ? "כדאי לבדוק שוב ◇" : he.feedback.incorrect}
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

      {showPrimaryAction && !mobileAction ? (
        <div className="practice-primary-action" style={{ display: "flex", gap: spacing.sm, minWidth: 0 }}>
          <button type="button" onClick={onPrimaryAction} disabled={primaryActionDisabled} style={{
            flex: 1, minWidth: 0, width: "100%", maxWidth: "100%", boxSizing: "border-box",
            padding: `${spacing.sm}px ${spacing.md}px`, borderRadius: radius.md, border: `1px solid ${colors.border}`,
            cursor: primaryActionDisabled ? "not-allowed" : "pointer",
          }}>{primaryActionLabel}</button>
        </div>
      ) : null}

      {mobileAction && showPrimaryAction && viewport ? <MobileSubmitBar viewport={viewport} label={primaryActionLabel} state={phase} disabled={primaryActionDisabled} onSubmit={onPrimaryAction} /> : null}
      {!viewport?.keyboardOpen ? <DevQuestionDebug question={question} /> : null}
    </div>
  );
}

function NumericMathValue({ value }: { value: string }) {
  return <ContentRenderer content={[{ kind: "math", latex: value.replaceAll("−", "-").replaceAll("×", "\\times ").replaceAll("÷", "\\div ") }]} />;
}
