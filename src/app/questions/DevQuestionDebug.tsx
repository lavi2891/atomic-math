import { useEffect, useState } from "react";
import {
  isGeneratedQuestionInstance,
  type Question,
} from "@domain/questions/types";
import { colors, radius, spacing } from "@ui/tokens";

type Props = {
  question: Question;
};

export function DevQuestionDebug({ question }: Props) {
  const isDev = import.meta.env.DEV;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isDev) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!event.ctrlKey || event.key.toLowerCase() !== "d") {
        return;
      }
      event.preventDefault();
      setIsVisible((prev) => !prev);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDev]);

  if (!isDev) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  const rows: Array<{ label: string; value: string | null }> = [];

  if (isGeneratedQuestionInstance(question)) {
    rows.push({
      label: "difficulty",
      value:
        typeof question.computedDifficulty === "number"
          ? question.computedDifficulty.toFixed(2)
          : typeof question.difficulty === "number"
            ? question.difficulty.toFixed(2)
            : null,
    });
    rows.push({
      label: "template",
      value:
        typeof question.metadata?.exprGenTemplateId === "string"
          ? question.metadata.exprGenTemplateId
          : null,
    });
    rows.push({
      label: "subtopic",
      value:
        typeof question.metadata?.inferredSubtopic === "string"
          ? question.metadata.inferredSubtopic
          : question.subtopic ?? null,
    });
    rows.push({
      label: "params",
      value:
        Object.keys(question.sampledParams).length > 0
          ? JSON.stringify(question.sampledParams)
          : null,
    });
    rows.push({
      label: "seed",
      value:
        typeof question.metadata?.seed === "string" || typeof question.metadata?.seed === "number"
          ? String(question.metadata.seed)
          : null,
    });
  } else {
    rows.push({
      label: "difficulty",
      value:
        typeof question.difficulty === "number"
          ? question.difficulty.toFixed(2)
          : null,
    });
    rows.push({
      label: "subtopic",
      value: question.subtopic ?? null,
    });
  }

  const visibleRows = rows.filter((row) => row.value !== null);
  if (visibleRows.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        fontSize: 11,
        opacity: 0.6,
        fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
        background: colors.bgSubtle,
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.md,
        padding: spacing.xs,
        justifySelf: "start",
        display: "grid",
        gap: 2,
      }}
    >
      <div>[dev]</div>
      {visibleRows.map((row) => (
        <div key={row.label}>
          {row.label}: {row.value}
        </div>
      ))}
    </div>
  );
}
