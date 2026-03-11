import type { Evaluation } from "../results/types.ts";
import type {
  NumericInputFormat,
  Question,
  RawAnswer,
  QuestionType,
} from "./types.ts";
import { assert, unreachable } from "../../shared/assert.ts";
import {
  exactNumericEquals,
  parseExactNumericInput,
} from "../../shared/mathInput/exactNumeric.ts";
import { toNumber } from "../expr-gen/core/rational.ts";

function approxEqual(a: number, b: number, tol: number) {
  return Math.abs(a - b) <= tol;
}

function resolveAcceptedInputFormats(question: Extract<Question, { type: "numeric" }>): NumericInputFormat[] {
  return question.acceptedInputFormats ?? ["integer", "decimal", "fraction"];
}

function isAcceptedFormat(
  acceptedFormats: NumericInputFormat[],
  actualFormat: NumericInputFormat,
): boolean {
  return acceptedFormats.includes(actualFormat);
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

      const acceptedFormats = resolveAcceptedInputFormats(question);
      const studentValue = parseExactNumericInput(raw.data.value);

      if (!studentValue.ok || !isAcceptedFormat(acceptedFormats, studentValue.format)) {
        return {
          isCorrect: false,
          normalizedAnswer: null,
          message: "invalid",
        };
      }

      const parsedCorrectAnswers = question.correctAnswers
        .map((answer) => parseExactNumericInput(answer))
        .filter((value): value is Extract<typeof value, { ok: true }> => value.ok);

      const tol = question.tolerance;
      const ok = parsedCorrectAnswers.some((correctValue) =>
        tol === undefined
          ? exactNumericEquals(studentValue.value, correctValue.value)
          : approxEqual(toNumber(studentValue.value), toNumber(correctValue.value), tol),
      );

      return { isCorrect: ok, normalizedAnswer: studentValue.canonical };
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
    !evaluateAnswer(
      { ...numericQuestion, correctAnswers: ["0.5"], acceptedInputFormats: ["decimal"] },
      { questionType: "numeric", data: { value: "1/2" } },
    ).isCorrect,
    "numeric check failed: decimal-only question should reject fraction input",
  );

  assert(
    !evaluateAnswer(numericQuestion, {
      questionType: "numeric",
      data: { value: "abc" },
    }).isCorrect,
    "numeric check failed: abc should be invalid/incorrect",
  );
}

if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
  runNumericEvaluatorRuntimeChecks();
}
