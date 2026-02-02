import { useMemo, useRef, useState } from "react";
import type { AnswerResult } from "@domain/results/types";
import type {
  Question,
  RawAnswer,
  NumericQuestion,
  SingleChoiceQuestion,
  MultiChoiceQuestion,
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

type Props = {
  question: Question;
  onNext: (result: AnswerResult) => void;
  autoFocusNumeric?: boolean;
};

type Phase = "answering" | "checked";

type LastEval = {
  isCorrect: boolean;
  message?: string;
  raw: RawAnswer;
};

export function QuestionView({ question, onNext }: Props) {
  const [phase, setPhase] = useState<Phase>("answering");

  // initialize once per mount (QuestionView should be keyed by question.id)
  const startTsRef = useRef<number>(0);
  startTsRef.current ||= Date.now();

  const [numericValue, setNumericValue] = useState("");
  const [singleId, setSingleId] = useState<string | null>(null);
  const [multiIds, setMultiIds] = useState<string[]>([]);
  const [lastEval, setLastEval] = useState<LastEval | null>(null);

  const canCheck = useMemo(() => {
    switch (question.type) {
      case "numeric":
        return numericValue.trim().length > 0;
      case "singleChoice":
        return singleId !== null;
      case "multiChoice":
        return multiIds.length > 0;
      default:
        return false;
    }
  }, [question.type, numericValue, singleId, multiIds]);

  const disabledInputs = phase === "checked";

  function buildRaw(): RawAnswer {
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
    if (!canCheck) return;

    const raw = buildRaw();
    const ev = evaluateAnswer(question, raw);

    setLastEval({ isCorrect: ev.isCorrect, message: ev.message, raw });
    setPhase("checked");
  }

  function onNextClick() {
    assert(lastEval, "Next requires evaluation");

    const responseTimeMs = Math.max(0, Date.now() - startTsRef.current);

    const result: AnswerResult = {
      questionId: question.id,
      topicId: question.topicId,
      isCorrect: lastEval.isCorrect,
      rawAnswer: lastEval.raw,
      responseTimeMs,
      timestamp: Date.now(),
    };

    onNext(result);
  }

  return (
    <div style={{ display: "grid", gap: spacing.md }}>
      {/* prompt */}
      <div style={{ fontSize: fontSize.md, lineHeight: lineHeight.md }}>
        <ContentRenderer content={question.prompt} />
      </div>

      {/* answer area */}
      <div>
        {question.type === "numeric" && (
          <NumericAnswerInput
            question={question as NumericQuestion}
            value={numericValue}
            onChange={setNumericValue}
            disabled={disabledInputs}
          />
        )}

        {question.type === "singleChoice" && (
          <SingleChoiceAnswerInput
            question={question as SingleChoiceQuestion}
            selectedOptionId={singleId}
            onChange={setSingleId}
            disabled={disabledInputs}
          />
        )}

        {question.type === "multiChoice" && (
          <MultiChoiceAnswerInput
            question={question as MultiChoiceQuestion}
            selectedOptionIds={multiIds}
            onChange={setMultiIds}
            disabled={disabledInputs}
          />
        )}
      </div>

      {/* feedback */}
      {phase === "checked" && lastEval && (
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

      {/* actions */}
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
    </div>
  );
}
