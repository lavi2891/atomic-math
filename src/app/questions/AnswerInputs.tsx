import type {
  NumericQuestion,
  SingleChoiceQuestion,
  MultiChoiceQuestion,
} from "@domain/questions/types";
import type { CSSProperties, RefObject } from "react";
import { ContentRenderer } from "@ui/ContentRenderer";
import { he } from "@copy/he";
import {
  borders,
  colors,
  fontSize,
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
    errorText?: string | null;
    isInvalid?: boolean;
  } & Disabled,
) {
  const {
    value,
    onChange,
    disabled,
    autoFocus,
    inputRef,
    previewLatex,
    errorText,
    isInvalid,
  } = props;
  const style: CSSProperties = {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    fontSize: fontSize.md,
    padding: `${spacing.md - 2}px ${spacing.md}px`,
    borderRadius: radius.md,
    border: `${borders.normalPx}px solid ${isInvalid ? "#ff8a80" : colors.border}`,
    background: colors.inputBg,
    color: colors.inputText,
    ["--numeric-placeholder-color" as string]: colors.placeholderText,
  };

  return (
    <div style={{ display: "grid", gap: spacing.xs }}>
      <input
        ref={inputRef}
        className="numeric-answer-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoFocus={autoFocus}
        dir="ltr"
        placeholder={he.placeholders.numericAnswer}
        style={style}
      />
      {previewLatex ? (
        <div
          className="math-input-preview"
          dir="ltr"
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 22,
            color: colors.textMuted,
            paddingTop: spacing.xs,
          }}
        >
          <ContentRenderer
            content={[{ kind: "math", latex: previewLatex }]}
            dir="ltr"
          />
        </div>
      ) : null}
      {errorText && value.trim().length > 0 ? (
        <div
          dir="rtl"
          style={{
            fontSize: fontSize.sm,
            color: "#ff8a80",
          }}
        >
          {errorText}
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
  } & Disabled,
) {
  const { question, selectedOptionId, onChange, disabled } = props;

  return (
    <div style={{ display: "grid", gap: spacing.sm }}>
      {question.options.map((opt) => {
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
  } & Disabled,
) {
  const { question, selectedOptionIds, onChange, disabled } = props;

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
      {question.options.map((opt) => {
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
