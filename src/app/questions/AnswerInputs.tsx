import type {
  NumericQuestion,
  SingleChoiceQuestion,
  MultiChoiceQuestion,
} from "@domain/questions/types";
import { useMemo } from "react";
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

export function NumericAnswerInput(
  props: {
    question: NumericQuestion;
    value: string;
    onChange: (v: string) => void;
    autoFocus?: boolean;
    inputRef?: RefObject<HTMLInputElement | null>;
    previewLatex?: string | null;
    helperText?: string | null;
    isInvalid?: boolean;
    emphasizeFraction?: boolean;
  } & Disabled,
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
    isInvalid,
    emphasizeFraction,
  } = props;
  const allowDecimal = question.input?.allowDecimal !== false;
  const inputRadius = Math.max(8, radius.md - 4);
  const inputStyle: CSSProperties = {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    fontSize: 16,
    height: 40,
    padding: "10px 12px",
    borderRadius: inputRadius,
    border: `${borders.normalPx}px solid ${isInvalid ? "#ff8a80" : colors.border}`,
    background: colors.inputBg,
    color: colors.inputText,
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
      <input
        ref={inputRef}
        className="numeric-answer-input"
        type="text"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoFocus={autoFocus}
        dir="ltr"
        placeholder={he.placeholders.numericAnswer}
        style={inputStyle}
      />
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
    </div>
  );
}

export function SingleChoiceAnswerInput(
  props: {
    question: SingleChoiceQuestion;
    selectedOptionId: string | null;
    onChange: (optionId: string) => void;
    shuffleSeed: number;
  } & Disabled,
) {
  const { question, selectedOptionId, onChange, disabled, shuffleSeed } = props;
  const displayedOptions = useMemo(
    () => shuffleWithSeed(question.options, shuffleSeed),
    [question.options, shuffleSeed],
  );

  return (
    <div style={{ display: "grid", gap: spacing.sm }}>
      {displayedOptions.map((opt) => {
        const checked = selectedOptionId === opt.id;

        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            aria-pressed={checked}
            onClick={() => onChange(opt.id)}
            style={{
              textAlign: "right",
              padding: `${spacing.md - 2}px ${spacing.md}px`,
              borderRadius: radius.md,
              border: `${checked ? borders.strongPx : borders.normalPx}px solid ${
                checked ? colors.borderStrong : colors.border
              }`,
              background: checked ? colors.bgSelected : uiText.transparent,
              cursor: disabled ? "default" : "pointer",
            }}
          >
            <ContentRenderer content={opt.content} />
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
  } & Disabled,
) {
  const { question, selectedOptionIds, onChange, disabled, shuffleSeed } = props;
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

        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            aria-pressed={checked}
            onClick={() => toggle(opt.id)}
            style={{
              textAlign: "right",
              padding: `${spacing.md - 2}px ${spacing.md}px`,
              borderRadius: radius.md,
              border: `${checked ? borders.strongPx : borders.normalPx}px solid ${
                checked ? colors.borderStrong : colors.border
              }`,
              background: checked ? colors.bgSelected : uiText.transparent,
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

            <span aria-hidden style={{ width: sizes.checkIconBoxPx }}>
              {checked ? icons.check : uiText.empty}
            </span>
          </button>
        );
      })}
    </div>
  );
}
