import type { Evaluation } from "../results/types";
import type { Question, RawAnswer, QuestionType } from "./types";
import { assert, unreachable } from "../../shared/assert";

function approxEqual(a: number, b: number, tol: number) {
  return Math.abs(a - b) <= tol;
}

function normalizeNumericInput(value: string): string {
  return value.trim().replace(",", ".").replace(/\s+/g, "");
}

function parseNumericValue(value: string): number | null {
  if (value.length === 0) return null;

  const fractionMatch = value.match(/^(-?\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = Number(fractionMatch[1]);
    const denominator = Number(fractionMatch[2]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return null;
    }
    return numerator / denominator;
  }

  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
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

      const studentValue = parseNumericValue(normalizeNumericInput(raw.data.value));

      if (studentValue === null) {
        return {
          isCorrect: false,
          normalizedAnswer: null,
          message: "invalid",
        };
      }

      const parsedCorrectAnswers = question.correctAnswers
        .map((answer) => parseNumericValue(normalizeNumericInput(answer)))
        .filter((value): value is number => value !== null);

      const tol = question.tolerance;
      // We intentionally use strict numeric equality when tolerance is not set.
      // Parsed forms like "1/2" and "0.5" both normalize to the same Number value.
      const ok = parsedCorrectAnswers.some((correctValue) =>
        tol === undefined
          ? studentValue === correctValue
          : approxEqual(studentValue, correctValue, tol),
      );

      return { isCorrect: ok, normalizedAnswer: studentValue };
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

function runNumericEvaluatorRuntimeChecks() {
  const numericQuestion = {
    id: "runtime-check-numeric",
    topicId: "RUNTIME",
    type: "numeric",
    prompt: [{ kind: "text", value: "runtime-check" }],
    correctAnswers: ["1/2"],
  } as const satisfies Question;

  assert(
    evaluateAnswer(numericQuestion, {
      questionType: "numeric",
      data: { value: "0.5" },
    }).isCorrect,
    "numeric check failed: 0.5 should match 1/2",
  );

  assert(
    evaluateAnswer(
      { ...numericQuestion, correctAnswers: ["-0.75"] },
      { questionType: "numeric", data: { value: "-3/4" } },
    ).isCorrect,
    "numeric check failed: -3/4 should match -0.75",
  );

  assert(
    evaluateAnswer(
      { ...numericQuestion, correctAnswers: ["1.5"] },
      { questionType: "numeric", data: { value: "1,5" } },
    ).isCorrect,
    "numeric check failed: 1,5 should match 1.5",
  );

  assert(
    evaluateAnswer(
      { ...numericQuestion, correctAnswers: ["1/4"] },
      { questionType: "numeric", data: { value: "1/4" } },
    ).isCorrect,
    "numeric check failed: 1/4 should match 1/4",
  );

  assert(
    !evaluateAnswer(numericQuestion, {
      questionType: "numeric",
      data: { value: "abc" },
    }).isCorrect,
    "numeric check failed: abc should be invalid/incorrect",
  );
}

if (import.meta.env.DEV) {
  runNumericEvaluatorRuntimeChecks();
}
