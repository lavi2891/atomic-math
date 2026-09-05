import type {
  NumericQuestion,
  SingleChoiceQuestion,
  MultiChoiceQuestion,
} from "@domain/questions/types";
import { useId, useMemo } from "react";
import type { CSSProperties, RefObject } from "react";
import { ContentRenderer } from "@ui/ContentRenderer";
import { he } from "@copy/he";
import { shuffleWithSeed } from "@shared/math";
import {
  borders,
  colors,
  radius,
  spacing,
  icons,
  sizes,
  uiText,
} from "@ui/tokens";

type Disabled = { disabled?: boolean };
type ChoiceFeedback = { showFeedback?: boolean };
type NumericFeedback = { feedbackState?: "correct" | "incorrect" };
type AnswerState = "correct" | "missed-correct" | "incorrect" | "neutral";

function answerState(correct: boolean, selected: boolean, showFeedback: boolean): AnswerState {
  if (!showFeedback) return "neutral";
  if (correct) return "correct";
  return selected ? "incorrect" : "neutral";
}

function multiAnswerState(correct: boolean, selected: boolean, showFeedback: boolean): AnswerState {
  if (!showFeedback) return "neutral";
  if (correct) return selected ? "correct" : "missed-correct";
  return selected ? "incorrect" : "neutral";
}

function answerColors(state: AnswerState, selected: boolean) {
  if (state === "correct") return { border: "#4ade80", background: "#163f2d", color: "#e1ffec" };
  if (state === "missed-correct") return { border: "#78b98f", background: "#263b30", color: "#e1f6e8" };
  if (state === "incorrect") return { border: "#f87171", background: "#4a2026", color: "#ffe5e5" };
  return { border: selected ? colors.borderStrong : colors.border, background: selected ? colors.bgSelected : uiText.transparent, color: colors.text };
}

export function NumericAnswerInput(
  props: {
    question: NumericQuestion;
    value: string;
    onChange: (v: string) => void;
    autoFocus?: boolean;
    inputRef?: RefObject<HTMLInputElement | null>;
    previewLatex?: string | null;
    helperText?: string | null;
    formatHint?: string | null;
    isInvalid?: boolean;
    emphasizeFraction?: boolean;
  } & Disabled & NumericFeedback,
) {
  const {
    question,
    value,
    onChange,
    disabled,
    autoFocus,
    inputRef,
    previewLatex,
    helperText,
    formatHint,
    isInvalid,
    emphasizeFraction,
    feedbackState,
  } = props;
  const feedbackId = useId();
  const allowDecimal = question.input?.allowDecimal !== false;
  const inputRadius = Math.max(8, radius.md - 4);
  const feedbackColors = feedbackState === "correct"
    ? { border: "#4ade80", background: "#173b2b" }
    : feedbackState === "incorrect"
      ? { border: "#f87171", background: "#472126" }
      : null;
  const inputStyle: CSSProperties = {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    fontSize: 16,
    height: 40,
    padding: "10px 42px 10px 12px",
    borderRadius: inputRadius,
    border: `${feedbackColors ? borders.strongPx : borders.normalPx}px solid ${feedbackColors?.border ?? (isInvalid ? "#ff8a80" : colors.border)}`,
    background: feedbackColors?.background ?? colors.inputBg,
    color: colors.inputText,
    direction: "ltr",
    ["--numeric-placeholder-color" as string]: colors.placeholderText,
  };
  const previewFontSize = emphasizeFraction ? 24 : 20;

  return (
    <div
      className="math-input-card"
      style={{
        display: "grid",
        gap: spacing.sm,
        background: colors.surface,
        border: `${borders.normalPx}px solid ${colors.border}`,
        borderRadius: radius.md,
        padding: spacing.md,
      }}
    >
      <div
        className="math-input-preview"
        dir="ltr"
        style={{
          minHeight: "clamp(40px, 5.5vw, 44px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          opacity: 0.9,
          fontSize: previewFontSize,
        }}
      >
        {previewLatex ? (
          <ContentRenderer
            content={[{ kind: "math", latex: previewLatex }]}
            dir="ltr"
          />
        ) : (
          <div aria-hidden style={{ minHeight: 1, width: "100%" }} />
        )}
      </div>
      <div className="numeric-answer-field">
        <input
          ref={inputRef}
          className="numeric-answer-input"
          type="text"
          enterKeyHint="done"
          inputMode={allowDecimal ? "decimal" : "numeric"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoFocus={autoFocus}
          dir="ltr"
          placeholder={he.placeholders.numericAnswer}
          data-answer-state={feedbackState ?? "neutral"}
          aria-invalid={feedbackState === "incorrect" || isInvalid || undefined}
          aria-describedby={feedbackState ? feedbackId : undefined}
          style={inputStyle}
        />
        {feedbackState ? (
          <span
            id={feedbackId}
            className={`numeric-answer-status numeric-answer-status--${feedbackState}`}
            role="status"
            aria-live="polite"
          >
            <span aria-hidden="true">{feedbackState === "correct" ? icons.check : "✗"}</span>{" "}
            <span className="visually-hidden">{feedbackState === "correct" ? "נכון" : "לא נכון"}</span>
          </span>
        ) : null}
      </div>
      {formatHint ? (
        <div className="answer-format-hint" dir="rtl" style={{ fontSize: 12, color: colors.textMuted }}>
          {formatHint}
        </div>
      ) : null}
      {isInvalid && value.trim().length > 0 && helperText ? (
        <div
          dir="rtl"
          style={{
            fontSize: 12,
            color: "#ff8a80",
          }}
        >
          {helperText}
        </div>
      ) : null}
      <div className="numeric-correct-answer" aria-live="polite">
        {feedbackState === "incorrect" ? (
          <span>
            {he.review.correctAnswer}{" "}
            <span dir="ltr">
              {question.correctAnswers.map((answer, index) => (
                <span key={`${answer}-${index}`}>
                  {index > 0 ? " / " : null}
                  <ContentRenderer content={[{ kind: "math", latex: answer }]} dir="ltr" />
                </span>
              ))}
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function SingleChoiceAnswerInput(
  props: {
    question: SingleChoiceQuestion;
    selectedOptionId: string | null;
    onChange: (optionId: string) => void;
    shuffleSeed: number;
  } & Disabled & ChoiceFeedback,
) {
  const { question, selectedOptionId, onChange, disabled, shuffleSeed, showFeedback = false } = props;
  const displayedOptions = useMemo(
    () => shuffleWithSeed(question.options, shuffleSeed),
    [question.options, shuffleSeed],
  );

  return (
    <div style={{ display: "grid", gap: spacing.sm }}>
      {displayedOptions.map((opt) => {
        const checked = selectedOptionId === opt.id;
        const state = answerState(opt.id === question.correctOptionId, checked, showFeedback);
        const feedbackColors = answerColors(state, checked);

        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            aria-pressed={checked}
            data-option-id={opt.id}
            data-answer-state={state}
            onClick={() => onChange(opt.id)}
            style={{
              textAlign: "right",
              padding: `${spacing.md - 2}px ${spacing.md}px`,
              borderRadius: radius.md,
              border: `${state !== "neutral" || checked ? borders.strongPx : borders.normalPx}px solid ${feedbackColors.border}`,
              background: feedbackColors.background,
              color: feedbackColors.color,
              cursor: disabled ? "default" : "pointer",
              display: "flex",
              gap: spacing.sm,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ flex: 1, minWidth: 0 }}><ContentRenderer content={opt.content} /></span>
            <span className="answer-choice__status" aria-label={state === "correct" ? "תשובה נכונה" : state === "incorrect" ? "תשובה שגויה שנבחרה" : undefined} aria-hidden={state === "neutral"} style={{ width: sizes.checkIconBoxPx }}>
              {state === "correct" ? icons.check : state === "incorrect" ? "✕" : uiText.empty}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function MultiChoiceAnswerInput(
  props: {
    question: MultiChoiceQuestion;
    selectedOptionIds: string[];
    onChange: (optionIds: string[]) => void;
    shuffleSeed: number;
  } & Disabled & ChoiceFeedback,
) {
  const { question, selectedOptionIds, onChange, disabled, shuffleSeed, showFeedback = false } = props;
  const displayedOptions = useMemo(
    () => shuffleWithSeed(question.options, shuffleSeed),
    [question.options, shuffleSeed],
  );

  function toggle(id: string) {
    const has = selectedOptionIds.includes(id);
    onChange(
      has
        ? selectedOptionIds.filter((x) => x !== id)
        : [...selectedOptionIds, id],
    );
  }

  return (
    <div style={{ display: "grid", gap: spacing.sm }}>
      {displayedOptions.map((opt) => {
        const checked = selectedOptionIds.includes(opt.id);
        const state = multiAnswerState(question.correctOptionIds.includes(opt.id), checked, showFeedback);
        const feedbackColors = answerColors(state, checked);

        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            aria-pressed={checked}
            data-option-id={opt.id}
            data-answer-state={state}
            onClick={() => toggle(opt.id)}
            style={{
              textAlign: "right",
              padding: `${spacing.md - 2}px ${spacing.md}px`,
              borderRadius: radius.md,
              border: `${state !== "neutral" || checked ? borders.strongPx : borders.normalPx}px ${state === "missed-correct" ? "dashed" : "solid"} ${feedbackColors.border}`,
              background: feedbackColors.background,
              color: feedbackColors.color,
              cursor: disabled ? "default" : "pointer",
              display: "flex",
              gap: spacing.sm,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ flex: 1, minWidth: 0 }}>
              <ContentRenderer content={opt.content} />
            </span>

            <span
              className={`answer-choice__status${state === "missed-correct" ? " answer-choice__status--missed" : ""}`}
              aria-label={state === "correct" ? "תשובה נכונה שנבחרה" : state === "missed-correct" ? "תשובה נכונה שלא נבחרה" : state === "incorrect" ? "תשובה שגויה שנבחרה" : undefined}
              aria-hidden={state === "neutral"}
              style={{ width: state === "missed-correct" ? "auto" : sizes.checkIconBoxPx }}
            >
              {state === "correct" ? icons.check : state === "missed-correct" ? "גם נכונה" : state === "incorrect" ? "✕" : !showFeedback && checked ? icons.check : uiText.empty}
            </span>
          </button>
        );
      })}
    </div>
  );
}
