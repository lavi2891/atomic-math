import type { OptionContent, SingleChoiceQuestion } from "../../../questions/types.ts";
import { generateEvaluatedExprAttempt } from "../../core/generateNumericQuestion.ts";
import { parseLatex } from "../../core/parseLatex.ts";
import type { Rational } from "../../core/rational.ts";
import { createRandom, fnv1a32 } from "../../core/rng.ts";
import { signatureForCompare } from "../../core/signatures.ts";
import type { ExprSpec, GenerateExprNumericQuestionInput } from "../../core/types.ts";

import type { CompareSpec } from "./compareSpec.ts";

const MAX_ATTEMPTS = 120;

interface GenerateCompareQuestionInput {
  id: string;
  seedNumber: number;
  difficultyTarget?: number;
  spec: CompareSpec;
  seenSignatures?: Set<string>;
}

type CompareOutcome = "A_LARGER" | "B_LARGER" | "EQUAL";

function compareRationals(a: Rational, b: Rational): CompareOutcome {
  const left = a.num * b.den;
  const right = b.num * a.den;
  if (left > right) return "A_LARGER";
  if (left < right) return "B_LARGER";
  return "EQUAL";
}

function dedupeTags(tags: string[]): string[] {
  return [...new Set(tags)];
}

function buildPrompt(aLatex: string, bLatex: string): OptionContent[] {
  return [
    { kind: "text", value: "איזה גדול יותר? " },
    { kind: "math", latex: `A=${aLatex}`, display: true },
    { kind: "text", value: " או " },
    { kind: "math", latex: `B=${bLatex}`, display: true },
  ];
}

function buildOptions(): SingleChoiceQuestion["options"] {
  return [
    { id: "A", content: [{ kind: "text", value: "A גדול יותר" }] },
    { id: "B", content: [{ kind: "text", value: "B גדול יותר" }] },
    { id: "C", content: [{ kind: "text", value: "שווים" }] },
  ];
}

function optionIdForOutcome(outcome: CompareOutcome): string {
  if (outcome === "A_LARGER") return "A";
  if (outcome === "B_LARGER") return "B";
  return "C";
}

function pickSpec(sourceExprSpecs: ExprSpec[], seed: number): ExprSpec {
  const rng = createRandom(seed);
  const index = rng.nextInt(0, sourceExprSpecs.length - 1);
  return sourceExprSpecs[index]!;
}

export function generateSignedNumbersCompareQuestion(
  input: GenerateCompareQuestionInput,
): SingleChoiceQuestion {
  if (input.spec.sourceExprSpecs.length === 0) {
    throw new Error("Compare generator requires at least one source expression spec");
  }

  const parsedByTemplate = new Map<string, ReturnType<typeof parseLatex>>();
  for (const exprSpec of input.spec.sourceExprSpecs) {
    parsedByTemplate.set(exprSpec.templateId, parseLatex(exprSpec.latex));
  }

  let bestQuestion: SingleChoiceQuestion | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;
  const equalGateRng = createRandom(input.seedNumber ^ 0x57c2d1a1);

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const seedA = fnv1a32(`${input.seedNumber}|compare|A|${attempt}`);
    const seedB = fnv1a32(`${input.seedNumber}|compare|B|${attempt}`);
    const exprSpecA = pickSpec(input.spec.sourceExprSpecs, seedA);
    const exprSpecB = pickSpec(input.spec.sourceExprSpecs, seedB);
    const parsedAstA = parsedByTemplate.get(exprSpecA.templateId);
    const parsedAstB = parsedByTemplate.get(exprSpecB.templateId);
    if (!parsedAstA || !parsedAstB) {
      throw new Error("Missing parsed expression spec for compare generation");
    }

    let evaluatedA: ReturnType<typeof generateEvaluatedExprAttempt>;
    let evaluatedB: ReturnType<typeof generateEvaluatedExprAttempt>;
    try {
      const attemptInputA: GenerateExprNumericQuestionInput = {
        id: `${input.id}_A`,
        exprSpec: exprSpecA,
        seedNumber: seedA,
        difficultyTarget: input.difficultyTarget,
      };
      const attemptInputB: GenerateExprNumericQuestionInput = {
        id: `${input.id}_B`,
        exprSpec: exprSpecB,
        seedNumber: seedB,
        difficultyTarget: input.difficultyTarget,
      };
      evaluatedA = generateEvaluatedExprAttempt(attemptInputA, parsedAstA, attempt);
      evaluatedB = generateEvaluatedExprAttempt(attemptInputB, parsedAstB, attempt);
    } catch {
      continue;
    }

    const outcome = compareRationals(evaluatedA.result, evaluatedB.result);
    if (outcome === "EQUAL" && !equalGateRng.chance(input.spec.maxEqualRate)) {
      continue;
    }

    const correctOptionId = optionIdForOutcome(outcome);
    const signature = signatureForCompare(
      input.spec.topicId,
      evaluatedA.latexRendered,
      evaluatedB.latexRendered,
      correctOptionId,
    );
    if (input.seenSignatures?.has(signature)) {
      continue;
    }

    const tags = dedupeTags([
      ...evaluatedA.tags,
      ...evaluatedB.tags,
      ...(input.spec.tags ?? []),
      "family:compare",
    ]);
    const questionDifficulty =
      (evaluatedA.difficulty.normalized + evaluatedB.difficulty.normalized) / 2;
    const distanceToTarget =
      input.difficultyTarget === undefined
        ? 0
        : Math.abs(questionDifficulty - input.difficultyTarget);

    const question: SingleChoiceQuestion = {
      id: input.id,
      topicId: input.spec.topicId,
      type: "singleChoice",
      subtopic: input.spec.subtopic,
      prompt: buildPrompt(evaluatedA.latexRendered, evaluatedB.latexRendered),
      options: buildOptions(),
      correctOptionId,
      difficulty: questionDifficulty,
      tags,
      misconceptions: dedupeTags([
        ...(exprSpecA.misconceptions ?? []),
        ...(exprSpecB.misconceptions ?? []),
        ...(input.spec.misconceptions ?? []),
      ]),
      seeds: {
        difficulty: questionDifficulty,
      },
    };

    if (input.seenSignatures) input.seenSignatures.add(signature);

    if (input.difficultyTarget === undefined || distanceToTarget <= 0.1) {
      return question;
    }
    if (distanceToTarget < bestDistance) {
      bestDistance = distanceToTarget;
      bestQuestion = question;
    }
  }

  if (bestQuestion) {
    return bestQuestion;
  }
  throw new Error(`Failed to generate compare question ${input.id} after ${MAX_ATTEMPTS} attempts`);
}

function runCompareRuntimeChecks(): void {
  const a = { num: 5n, den: 2n };
  const b = { num: 2n, den: 1n };
  const c = { num: -7n, den: 3n };
  const d = { num: -7n, den: 3n };
  if (compareRationals(a, b) !== "A_LARGER") {
    throw new Error("Compare check failed: expected A to be larger");
  }
  if (compareRationals(c, b) !== "B_LARGER") {
    throw new Error("Compare check failed: expected B to be larger");
  }
  if (compareRationals(c, d) !== "EQUAL") {
    throw new Error("Compare check failed: expected equality");
  }
}

if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
  runCompareRuntimeChecks();
}
