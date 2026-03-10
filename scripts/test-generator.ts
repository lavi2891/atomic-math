import assert from "node:assert/strict";
import { buildGeneratedQuestion } from "../src/domain/questions/generator/buildGeneratedQuestion.ts";
import { evaluateConstraint } from "../src/domain/questions/generator/constraints.ts";
import {
  evaluateExpression,
  toComputedAnswer,
} from "../src/domain/questions/generator/evaluateExpression.ts";
import {
  extractTemplatePlaceholders,
  renderDisplayTemplate,
  renderExpressionTemplate,
} from "../src/domain/questions/generator/renderTemplate.ts";
import { resolveQuestionDefinition } from "../src/domain/questions/generator/resolveQuestionDefinition.ts";
import { sampleParam } from "../src/domain/questions/generator/sampleParam.ts";
import type { GeneratedQuestionDefinition, SampledParams } from "../src/domain/questions/generator/types.ts";
import type { Question } from "../src/domain/questions/types.ts";

function run(name: string, testFn: () => void): void {
  testFn();
  process.stdout.write(`PASS ${name}\n`);
}

function sequenceRng(values: number[]): () => number {
  let index = 0;
  return () => {
    const value = values[index] ?? values[values.length - 1] ?? 0;
    index += 1;
    return value;
  };
}

const sampledParams: SampledParams = {
  a: {
    type: "natural",
    expr: "7",
    display: "7",
    value: { num: 7n, den: 1n },
  },
  b: {
    type: "natural",
    expr: "3",
    display: "3",
    value: { num: 3n, den: 1n },
  },
  frac: {
    type: "rational",
    expr: "-5/2",
    display: "-\\frac{5}{2}",
    value: { num: -5n, den: 2n },
  },
};

run("placeholder extraction and replacement", () => {
  assert.deepEqual(
    extractTemplatePlaceholders("-{a}-(-{b})-{missing}", ["a", "b"]),
    ["a", "b"],
  );
  assert.equal(renderExpressionTemplate("-{a}-(-{b})", sampledParams), "-7-(-3)");
  assert.equal(renderDisplayTemplate("{frac}+{a}", sampledParams), "-\\frac{5}{2}+7");
});

run("integer and natural sampling", () => {
  assert.equal(
    sampleParam(
      { type: "integer", min: -2, max: 2, exclude: [-2, -1, 0, 2] },
      sequenceRng([0]),
    ).expr,
    "1",
  );
  assert.equal(
    sampleParam(
      { type: "natural", min: 0, max: 3, exclude: [1, 2] },
      sequenceRng([0]),
    ).expr,
    "3",
  );
});

run("decimal sampling by step", () => {
  const sampled = sampleParam(
    { type: "decimal", min: 0.1, max: 0.5, step: 0.2 },
    sequenceRng([0.5]),
  );
  assert.equal(sampled.expr, "0.3");
});

run("rational sampling and simplification", () => {
  const simplified = sampleParam(
    {
      type: "rational",
      numerator: { min: 2, max: 2 },
      denominator: { min: 4, max: 4 },
      simplify: true,
    },
    sequenceRng([0]),
  );
  assert.equal(simplified.expr, "1/2");
  assert.equal(simplified.display, "\\frac{1}{2}");
  assert.deepEqual(simplified.value, { num: 1n, den: 2n });
});

run("constraint handling", () => {
  assert.equal(evaluateConstraint("a !== b", sampledParams), true);
  assert.equal(evaluateConstraint("a + b <= 10 && a !== 0 && b !== 0", sampledParams), true);
  assert.equal(evaluateConstraint("a + b < 10 && b > 10", sampledParams), false);
});

run("expression evaluation", () => {
  assert.equal(toComputedAnswer(evaluateExpression("-7-(-3)")), "-4");
  assert.equal(toComputedAnswer(evaluateExpression("|-2-5|")), "7");
  assert.equal(toComputedAnswer(evaluateExpression("0.2+0.3"), { preferDecimal: true }), "0.5");
});

run("generated question build flow", () => {
  const definition: GeneratedQuestionDefinition = {
    id: "GEN_TEST_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    promptTemplate: [
      { kind: "text", value: "חשבו:" },
      { kind: "math", latex: "-{a}-(-{b})", display: true },
    ],
    exprTemplate: "-{a}-(-{b})",
    params: {
      a: { type: "natural", min: 1, max: 3 },
      b: { type: "natural", min: 1, max: 3 },
    },
    constraints: ["a !== b"],
    metadata: {
      difficulty: 0.2,
      subtopic: "subtraction",
      source: "generator",
    },
  };

  const question = buildGeneratedQuestion(definition, {
    rng: sequenceRng([0, 0, 0, 0.6]),
    maxAttempts: 5,
  });

  assert.match(question.id, /^GEN_TEST_001__/);
  assert.equal(question.baseId, "GEN_TEST_001");
  assert.equal(question.renderedExpression, "-1-(-2)");
  assert.deepEqual(question.sampledParams, { a: "1", b: "2" });
  assert.equal(question.correctAnswers[0], "1");
  assert.equal(question.prompt[1]?.kind, "math");
  if (question.prompt[1]?.kind === "math") {
    assert.equal(question.prompt[1].latex, "-1-(-2)");
  }
});

run("static question compatibility", () => {
  const staticQuestion: Question = {
    id: "STATIC_001",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    prompt: [{ kind: "text", value: "חשבו:" }],
    correctAnswers: ["4"],
  };

  assert.equal(resolveQuestionDefinition(staticQuestion), staticQuestion);
});
