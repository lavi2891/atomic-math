import type { Evaluation } from "../results/types";
import type { Question, RawAnswer, QuestionType } from "./types";
import { assert, unreachable } from "../../shared/assert";

function approxEqual(a: number, b: number, tol: number) {
  return Math.abs(a - b) <= tol;
}

function assertAnswerType<T extends QuestionType>(
  questionType: QuestionType,
  raw: RawAnswer,
  expected: T,
): asserts raw is RawAnswer<T> {
  assert(
    raw.questionType === expected,
    `RawAnswer type mismatch. expected=${expected} got=${raw.questionType}`,
  );
  assert(
    questionType === expected,
    `Question type mismatch. expected=${expected} got=${questionType}`,
  );
}

export function evaluateAnswer(question: Question, raw: RawAnswer): Evaluation {
  // hard guard: evaluator boundary
  assert(
    raw.questionType === question.type,
    `Question/RawAnswer type mismatch. question=${question.type} raw=${raw.questionType}`,
  );

  switch (question.type) {
    case "numeric": {
      assertAnswerType(question.type, raw, "numeric");

      const trimmed = raw.data.value.trim().replace(",", ".");
      const parsed = Number(trimmed);

      if (!Number.isFinite(parsed)) {
        return {
          isCorrect: false,
          normalizedAnswer: null,
          message: "Not a number",
        };
      }

      const tol = question.tolerance ?? 0;
      const ok =
        tol === 0
          ? parsed === question.answer
          : approxEqual(parsed, question.answer, tol);

      return { isCorrect: ok, normalizedAnswer: parsed };
    }

    case "singleChoice": {
      assertAnswerType(question.type, raw, "singleChoice");

      const ok = raw.data.optionId === question.correctOptionId;
      return { isCorrect: ok, normalizedAnswer: raw.data.optionId };
    }

    case "multiChoice": {
      assertAnswerType(question.type, raw, "multiChoice");

      const a = [...new Set(raw.data.optionIds)].sort();
      const b = [...new Set(question.correctOptionIds)].sort();

      const ok = a.length === b.length && a.every((v, i) => v === b[i]);
      return { isCorrect: ok, normalizedAnswer: a };
    }

    default:
      return unreachable(question, "Unknown question type");
  }
}
