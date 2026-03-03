import type { SingleChoiceQuestion } from "../../../questions/types.ts";
import { generateEvaluatedExprAttempt } from "../../core/generateNumericQuestion.ts";
import { parseLatex } from "../../core/parseLatex.ts";
import type { Rational } from "../../core/rational.ts";
import { createRandom, fnv1a32 } from "../../core/rng.ts";
import { signatureForSign } from "../../core/signatures.ts";
import type { ExprSpec, GenerateExprNumericQuestionInput } from "../../core/types.ts";

import type { SignSpec } from "./signSpec.ts";

const MAX_ATTEMPTS = 120;

interface GenerateSignQuestionInput {
  id: string;
  seedNumber: number;
  difficultyTarget?: number;
  spec: SignSpec;
  seenSignatures?: Set<string>;
}

type SignOutcome = "POSITIVE" | "NEGATIVE" | "ZERO";

function signOf(value: Rational): SignOutcome {
  if (value.num > 0n) return "POSITIVE";
  if (value.num < 0n) return "NEGATIVE";
  return "ZERO";
}

function dedupeTags(tags: string[]): string[] {
  return [...new Set(tags)];
}

function buildOptions(): SingleChoiceQuestion["options"] {
  return [
    { id: "A", content: [{ kind: "text", value: "חיובי" }] },
    { id: "B", content: [{ kind: "text", value: "שלילי" }] },
    { id: "C", content: [{ kind: "text", value: "אפס" }] },
  ];
}

function optionIdForSign(sign: SignOutcome): string {
  if (sign === "POSITIVE") return "A";
  if (sign === "NEGATIVE") return "B";
  return "C";
}

function pickSpec(sourceExprSpecs: ExprSpec[], seed: number): ExprSpec {
  const rng = createRandom(seed);
  const index = rng.nextInt(0, sourceExprSpecs.length - 1);
  return sourceExprSpecs[index]!;
}

function matchesTarget(sign: SignOutcome, targetZero: boolean): boolean {
  if (targetZero) return sign === "ZERO";
  return sign !== "ZERO";
}

function tryGenerateForTarget(
  input: GenerateSignQuestionInput,
  targetZero: boolean,
): SingleChoiceQuestion | undefined {
  const parsedByTemplate = new Map<string, ReturnType<typeof parseLatex>>();
  for (const exprSpec of input.spec.sourceExprSpecs) {
    parsedByTemplate.set(exprSpec.templateId, parseLatex(exprSpec.latex));
  }

  let bestQuestion: SingleChoiceQuestion | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const attemptSeed = fnv1a32(`${input.seedNumber}|sign|${targetZero ? "zero" : "nonzero"}|${attempt}`);
    const exprSpec = pickSpec(input.spec.sourceExprSpecs, attemptSeed);
    const parsedAst = parsedByTemplate.get(exprSpec.templateId);
    if (!parsedAst) {
      throw new Error("Missing parsed expression spec for sign generation");
    }

    let evaluated: ReturnType<typeof generateEvaluatedExprAttempt>;
    try {
      const attemptInput: GenerateExprNumericQuestionInput = {
        id: `${input.id}_S`,
        exprSpec,
        seedNumber: attemptSeed,
        difficultyTarget: input.difficultyTarget,
      };
      evaluated = generateEvaluatedExprAttempt(attemptInput, parsedAst, attempt);
    } catch {
      continue;
    }

    const sign = signOf(evaluated.result);
    if (!matchesTarget(sign, targetZero)) {
      continue;
    }

    const correctOptionId = optionIdForSign(sign);
    const signature = signatureForSign(
      input.spec.topicId,
      evaluated.latexRendered,
      sign,
    );
    if (input.seenSignatures?.has(signature)) {
      continue;
    }

    const questionDifficulty = evaluated.difficulty.normalized;
    const distanceToTarget =
      input.difficultyTarget === undefined
        ? 0
        : Math.abs(questionDifficulty - input.difficultyTarget);

    const question: SingleChoiceQuestion = {
      id: input.id,
      topicId: input.spec.topicId,
      type: "singleChoice",
      subtopic: input.spec.subtopic,
      prompt: [
        { kind: "text", value: "מה סימן התוצאה?" },
        { kind: "math", latex: evaluated.latexRendered, display: true },
      ],
      options: buildOptions(),
      correctOptionId,
      difficulty: questionDifficulty,
      tags: dedupeTags([...evaluated.tags, ...(input.spec.tags ?? []), "family:sign"]),
      misconceptions: input.spec.misconceptions ?? [],
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

  return bestQuestion;
}

export function generateSignedNumbersSignQuestion(
  input: GenerateSignQuestionInput,
): SingleChoiceQuestion {
  if (input.spec.sourceExprSpecs.length === 0) {
    throw new Error("Sign generator requires at least one source expression spec");
  }

  const targetRng = createRandom(input.seedNumber ^ 0x91f6ab5d);
  const targetZero = targetRng.chance(input.spec.zeroRate);
  const targetAttempt = tryGenerateForTarget(input, targetZero);
  if (targetAttempt) {
    return targetAttempt;
  }
  const fallbackAttempt = tryGenerateForTarget(input, false);
  if (fallbackAttempt) {
    return fallbackAttempt;
  }
  throw new Error(`Failed to generate sign question ${input.id} after ${MAX_ATTEMPTS} attempts`);
}
