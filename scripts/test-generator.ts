import assert from "node:assert/strict";
import {
  createRecentHistory,
  recordGeneratedQuestionHistory,
  shouldRejectByRecentHistory,
} from "../src/domain/questions/generator/antiRepetition.ts";
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
import { SIGNED_NUMBERS_GENERATED_QUESTIONS } from "../src/domain/questions/bank/SIGNED_NUMBERS.generated.ts";
import { evaluateAnswer } from "../src/domain/questions/evaluators.ts";
import { resolveQuestionDefinition } from "../src/domain/questions/generator/resolveQuestionDefinition.ts";
import { sampleParam } from "../src/domain/questions/generator/sampleParam.ts";
import { SIGNED_NUMBERS_SAMPLE_QUESTIONS } from "../src/domain/questions/samples/SIGNED_NUMBERS.samples.ts";
import { parseExactNumericInput } from "../src/shared/mathInput/exactNumeric.ts";
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

run("exact numeric parsing supports integer decimal and fraction only", () => {
  assert.deepEqual(parseExactNumericInput("-3"), {
    ok: true,
    normalized: "-3",
    format: "integer",
    canonical: "-3",
    value: { num: -3n, den: 1n },
  });
  assert.deepEqual(parseExactNumericInput("2,5"), {
    ok: true,
    normalized: "2.5",
    format: "decimal",
    canonical: "5/2",
    value: { num: 5n, den: 2n },
  });
  assert.deepEqual(parseExactNumericInput("-7/4"), {
    ok: true,
    normalized: "-7/4",
    format: "fraction",
    canonical: "-7/4",
    value: { num: -7n, den: 4n },
  });
  assert.deepEqual(parseExactNumericInput("2 1/2"), {
    ok: false,
    normalized: "2 1/2",
  });
});

run("numeric evaluator respects accepted input formats", () => {
  const rationalQuestion: Question = {
    id: "NUMERIC_RATIONAL_001",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    prompt: [{ kind: "text", value: "חשבו:" }],
    correctAnswers: ["5/2"],
    acceptedInputFormats: ["fraction", "decimal"],
  };
  assert.equal(
    evaluateAnswer(rationalQuestion, {
      questionType: "numeric",
      data: { value: "2.5" },
    }).isCorrect,
    true,
  );
  assert.equal(
    evaluateAnswer(rationalQuestion, {
      questionType: "numeric",
      data: { value: "5/2" },
    }).isCorrect,
    true,
  );

  const decimalOnlyQuestion: Question = {
    ...rationalQuestion,
    id: "NUMERIC_DECIMAL_ONLY_001",
    correctAnswers: ["-0.75"],
    acceptedInputFormats: ["decimal"],
  };
  assert.equal(
    evaluateAnswer(decimalOnlyQuestion, {
      questionType: "numeric",
      data: { value: "-3/4" },
    }).isCorrect,
    false,
  );
  assert.equal(
    evaluateAnswer(decimalOnlyQuestion, {
      questionType: "numeric",
      data: { value: "-0.75" },
    }).isCorrect,
    true,
  );
});

run("generated question build flow", () => {
  const definition: GeneratedQuestionDefinition = {
    id: "GEN_TEST_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    structureKey: "a-(-b)",
    variantGroup: "double_negative_subtraction",
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
    acceptedInputFormats: ["integer"],
    metadata: {
      difficulty: 0.2,
      subtopic: "subtraction",
      source: "generator",
    },
    difficultyModel: ({ a, b }) =>
      Math.min(1, Math.abs(Number(a.value.num)) / 10 + Math.abs(Number(b.value.num)) / 10),
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
  assert.equal(question.structureKey, "a-(-b)");
  assert.equal(question.variantGroup, "double_negative_subtraction");
  assert.equal(question.difficulty, question.computedDifficulty);
  assert.ok(Math.abs((question.computedDifficulty ?? 0) - 0.3) < 1e-9);
  assert.deepEqual(question.acceptedInputFormats, ["integer"]);
  assert.equal(question.prompt[1]?.kind, "math");
  if (question.prompt[1]?.kind === "math") {
    assert.equal(question.prompt[1].latex, "-1-(-2)");
  }
});

run("generated question seed is deterministic", () => {
  const definition: GeneratedQuestionDefinition = {
    id: "GEN_TEST_SEED_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    structureKey: "a-(-b)",
    variantGroup: "double_negative_subtraction",
    promptTemplate: [{ kind: "math", latex: "-{a}-(-{b})", display: true }],
    exprTemplate: "-{a}-(-{b})",
    params: {
      a: { type: "natural", min: 1, max: 20 },
      b: { type: "natural", min: 1, max: 20 },
    },
    constraints: ["a !== b"],
    acceptedInputFormats: ["integer"],
    difficultyModel: ({ a, b }) =>
      Math.min(1, (Math.abs(Number(a.value.num)) + Math.abs(Number(b.value.num))) / 30),
  };

  const first = buildGeneratedQuestion(definition, { seed: 42 });
  const second = buildGeneratedQuestion(definition, { seed: 42 });
  const different = buildGeneratedQuestion(definition, { seed: 43 });

  assert.equal(first.id, second.id);
  assert.equal(first.renderedExpression, second.renderedExpression);
  assert.equal(first.computedDifficulty, second.computedDifficulty);
  assert.notEqual(first.id, different.id);
});

run("recent-history anti-repetition rejects repeated expressions", () => {
  const history = createRecentHistory();
  const definition = SIGNED_NUMBERS_GENERATED_QUESTIONS[0];
  if (!definition) {
    throw new Error("Expected at least one signed numbers definition");
  }

  const first = buildGeneratedQuestion(definition, { seed: 1 });
  recordGeneratedQuestionHistory(history, first);
  assert.equal(shouldRejectByRecentHistory(first, history), true);

  const second = buildGeneratedQuestion(definition, {
    seed: 1,
    recentHistory: history,
    maxAttempts: 20,
  });
  assert.notEqual(second.renderedExpression, first.renderedExpression);
});

run("signed numbers generator definitions stay curated and buildable", () => {
  const seenIds = new Set<string>();
  const seenTemplates = new Set<string>();
  const seenStructureKeys = new Set<string>();

  for (const definition of SIGNED_NUMBERS_GENERATED_QUESTIONS) {
    assert.equal(seenIds.has(definition.id), false, `duplicate definition id: ${definition.id}`);
    seenIds.add(definition.id);
    assert.ok(definition.structureKey, `missing structureKey: ${definition.id}`);
    assert.ok(definition.variantGroup, `missing variantGroup: ${definition.id}`);
    if (definition.tags?.some((tag) => tag === "has:decimal" || tag === "has:fraction")) {
      assert.ok(
        definition.acceptedInputFormats && definition.acceptedInputFormats.length > 0,
        `missing acceptedInputFormats: ${definition.id}`,
      );
    }
    assert.equal(
      seenStructureKeys.has(definition.structureKey),
      false,
      `duplicate structureKey: ${definition.structureKey}`,
    );
    seenStructureKeys.add(definition.structureKey);

    const normalizedTemplate = definition.exprTemplate
      .replaceAll(/\{[a-zA-Z_]\w*\}/g, "{_}")
      .replaceAll(/\s+/g, "");
    const duplicateKey = `${normalizedTemplate}||${(definition.acceptedInputFormats ?? []).join(",")}`;
    assert.equal(
      seenTemplates.has(duplicateKey),
      false,
      `duplicate exprTemplate shape: ${definition.exprTemplate}`,
    );
    seenTemplates.add(duplicateKey);

    for (const seed of [11, 29, 47]) {
      const question = buildGeneratedQuestion(definition, { seed, maxAttempts: 100 });
      assert.equal(question.baseId, definition.id);
      assert.equal(question.topicId, "SIGNED_NUMBERS");
      assert.ok(question.renderedExpression.length > 0);
      assert.ok(question.correctAnswers[0]);
      assert.ok(question.structureKey);
      assert.ok(question.variantGroup);
      if (definition.acceptedInputFormats) {
        assert.deepEqual(question.acceptedInputFormats, definition.acceptedInputFormats);
      }
      assert.equal(
        question.computedDifficulty === undefined ||
          (question.computedDifficulty >= 0 && question.computedDifficulty <= 1),
        true,
      );
      const evaluatedAnswer = parseExactNumericInput(
        toComputedAnswer(evaluateExpression(question.renderedExpression), {
          preferDecimal: question.input?.allowDecimal,
        }),
      );
      const storedAnswer = parseExactNumericInput(question.correctAnswers[0]);
      assert.equal(evaluatedAnswer.ok, true);
      assert.equal(storedAnswer.ok, true);
      if (evaluatedAnswer.ok && storedAnswer.ok) {
        assert.equal(evaluatedAnswer.canonical, storedAnswer.canonical);
      }
    }
  }
});

run("signed numbers sample fixtures stay stable", () => {
  assert.equal(SIGNED_NUMBERS_SAMPLE_QUESTIONS.length, 20);
  assert.deepEqual(
    [...new Set(SIGNED_NUMBERS_SAMPLE_QUESTIONS.map((question) => question.baseId))].sort(),
    [
      "SN_GEN_ADD_NEG_POS_001",
      "SN_GEN_NEGATE_PARENS_SUB_001",
      "SN_GEN_POWER_NEG_BASE_PARENS_002",
      "SN_GEN_SUB_DOUBLE_NEG_002",
    ],
  );
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
