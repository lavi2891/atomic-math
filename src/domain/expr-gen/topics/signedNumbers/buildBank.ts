import type { Question } from "../../../questions/types.ts";

import { generateExprNumericQuestion } from "../../core/generateNumericQuestion.ts";
import { createRandom, fnv1a32 } from "../../core/rng.ts";
import { signatureForQuestion } from "../../core/signatures.ts";

import type { CompareSpec } from "./compareSpec.ts";
import type { EquivalentSpec } from "./equivalentSpec.ts";
import { generateSignedNumbersCompareQuestion } from "./generateCompareQuestion.ts";
import { generateSignedNumbersEquivalentQuestion } from "./generateEquivalentQuestion.ts";
import { generateSignedNumbersSignQuestion } from "./generateSignQuestion.ts";
import type { SignSpec } from "./signSpec.ts";
import { SIGNED_NUMBERS_SPECS } from "./specs.ts";

interface BuildSignedNumbersBankInput {
  perBucketPerSpec: number;
  buckets?: number[];
  seedBase?: string | number;
}

type Family = "numeric" | "compare" | "sign" | "equivalent";

const TOPIC_ID = "SIGNED_NUMBERS";
const MAX_ATTEMPTS_PER_SLOT = 220;
const MAX_ATTEMPTS_PER_FAMILY = 16000;
const FAMILY_RATIOS: Record<Family, number> = {
  numeric: 0.6,
  compare: 0.2,
  sign: 0.1,
  equivalent: 0.1,
};

const COMPARE_SPEC: CompareSpec = {
  topicId: TOPIC_ID,
  family: "compareAB",
  subtopic: "comparison",
  sourceExprSpecs: SIGNED_NUMBERS_SPECS,
  maxEqualRate: 0.1,
  tags: ["signed", "family:compare"],
  misconceptions: ["SIGN_INTUITION", "SUBTRACTION_SIGN_ERROR"],
};

const SIGN_SPEC: SignSpec = {
  topicId: TOPIC_ID,
  family: "signOfResult",
  subtopic: "sign",
  sourceExprSpecs: SIGNED_NUMBERS_SPECS,
  zeroRate: 0.05,
  tags: ["signed", "family:sign"],
  misconceptions: ["SIGN_ERROR", "NEGATIVE_MULTIPLY_RULE"],
};

const EQUIVALENT_SPEC: EquivalentSpec = {
  topicId: TOPIC_ID,
  family: "equivalentValue",
  subtopic: "equivalent_value",
  sourceExprSpecs: SIGNED_NUMBERS_SPECS,
  tags: ["signed", "family:equivalent"],
  misconceptions: [
    "SUBTRACTION_SIGN_ERROR",
    "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    "PARENS_IN_POWERS",
  ],
};

function defaultBuckets(): number[] {
  return Array.from({ length: 11 }, (_, index) => index);
}

function buildSeedKey(
  family: Family,
  bucket: number,
  candidateIndex: number,
): string {
  return `${TOPIC_ID}|${family}|d=${bucket}|i=${candidateIndex}`;
}

function computeFamilyTargets(totalPerBucket: number): Record<Family, number> {
  const compareCount = Math.round(totalPerBucket * FAMILY_RATIOS.compare);
  const signCount = Math.round(totalPerBucket * FAMILY_RATIOS.sign);
  const equivalentCount = Math.round(totalPerBucket * FAMILY_RATIOS.equivalent);
  const numericCount = Math.max(
    0,
    totalPerBucket - compareCount - signCount - equivalentCount,
  );
  return {
    numeric: numericCount,
    compare: compareCount,
    sign: signCount,
    equivalent: equivalentCount,
  };
}

function buildQuestionId(
  family: Family,
  bucket: number,
  producedForFamily: number,
  seedNumber: number,
): string {
  const hashSuffix = seedNumber.toString(16).padStart(8, "0").slice(0, 8);
  return `SN_${family}_d${bucket}_i${producedForFamily}_${hashSuffix}`;
}

function pickNumericSpec(seedNumber: number) {
  const rng = createRandom(seedNumber);
  const specIndex = rng.nextInt(0, SIGNED_NUMBERS_SPECS.length - 1);
  return SIGNED_NUMBERS_SPECS[specIndex]!;
}

function generateFamilyQuestion(params: {
  family: Family;
  id: string;
  seedNumber: number;
  difficultyTarget: number;
  compareSeenSignatures: Set<string>;
  signSeenSignatures: Set<string>;
  equivalentSeenSignatures: Set<string>;
}): Question {
  switch (params.family) {
    case "numeric": {
      const exprSpec = pickNumericSpec(params.seedNumber);
      return generateExprNumericQuestion({
        id: params.id,
        exprSpec,
        seedNumber: params.seedNumber,
        difficultyTarget: params.difficultyTarget,
      });
    }
    case "compare":
      return generateSignedNumbersCompareQuestion({
        id: params.id,
        seedNumber: params.seedNumber,
        difficultyTarget: params.difficultyTarget,
        spec: COMPARE_SPEC,
        seenSignatures: params.compareSeenSignatures,
      });
    case "sign":
      return generateSignedNumbersSignQuestion({
        id: params.id,
        seedNumber: params.seedNumber,
        difficultyTarget: params.difficultyTarget,
        spec: SIGN_SPEC,
        seenSignatures: params.signSeenSignatures,
      });
    case "equivalent":
      return generateSignedNumbersEquivalentQuestion({
        id: params.id,
        seedNumber: params.seedNumber,
        difficultyTarget: params.difficultyTarget,
        spec: EQUIVALENT_SPEC,
        seenSignatures: params.equivalentSeenSignatures,
      });
    default:
      throw new Error("Unsupported signed numbers family");
  }
}

export function buildSignedNumbersBank(
  input: BuildSignedNumbersBankInput,
): Question[] {
  const buckets = input.buckets ?? defaultBuckets();
  const totalPerBucket = Math.max(1, SIGNED_NUMBERS_SPECS.length * input.perBucketPerSpec);
  const questions: Question[] = [];
  const seenGlobalSignatures = new Set<string>();
  const seenIds = new Set<string>();
  const compareSeenSignatures = new Set<string>();
  const signSeenSignatures = new Set<string>();
  const equivalentSeenSignatures = new Set<string>();
  const familyCounts: Record<Family, number> = {
    numeric: 0,
    compare: 0,
    sign: 0,
    equivalent: 0,
  };

  for (const bucket of buckets) {
    const familyTargets = computeFamilyTargets(totalPerBucket);
    const families: Family[] = ["numeric", "compare", "sign", "equivalent"];

    for (const family of families) {
      const targetCount = familyTargets[family];
      if (targetCount <= 0) continue;

      let producedForFamily = 0;
      let candidateIndex = 0;
      let failedAttempts = 0;
      const strictAttemptLimit = Math.max(1, targetCount * MAX_ATTEMPTS_PER_SLOT);

      while (producedForFamily < targetCount) {
        if (failedAttempts >= strictAttemptLimit || candidateIndex >= MAX_ATTEMPTS_PER_FAMILY) {
          throw new Error(
            `Failed to generate ${family} signed-numbers questions for bucket ${bucket}. produced=${producedForFamily}, target=${targetCount}`,
          );
        }

        const seedKey = buildSeedKey(family, bucket, candidateIndex);
        const hashInput =
          input.seedBase === undefined
            ? seedKey
            : `${String(input.seedBase)}|${seedKey}`;
        const seedNumber = fnv1a32(hashInput);
        const id = buildQuestionId(family, bucket, producedForFamily, seedNumber);
        const difficultyTarget = bucket / 10;

        let question: Question;
        try {
          question = generateFamilyQuestion({
            family,
            id,
            seedNumber,
            difficultyTarget,
            compareSeenSignatures,
            signSeenSignatures,
            equivalentSeenSignatures,
          });
        } catch {
          failedAttempts += 1;
          candidateIndex += 1;
          continue;
        }

        const signature = signatureForQuestion(question);
        if (seenGlobalSignatures.has(signature) || seenIds.has(question.id)) {
          failedAttempts += 1;
          candidateIndex += 1;
          continue;
        }

        seenGlobalSignatures.add(signature);
        seenIds.add(question.id);
        questions.push(question);
        familyCounts[family] += 1;
        producedForFamily += 1;
        candidateIndex += 1;
      }
    }
  }

  const difficulties = questions
    .map((question) => question.difficulty)
    .filter((difficulty): difficulty is number => difficulty !== undefined);
  const minDifficulty = difficulties.length > 0 ? Math.min(...difficulties) : 0;
  const maxDifficulty = difficulties.length > 0 ? Math.max(...difficulties) : 0;
  console.warn(
    `SIGNED_NUMBERS mix summary: numeric=${familyCounts.numeric}, compare=${familyCounts.compare}, sign=${familyCounts.sign}, equivalent=${familyCounts.equivalent}, minDifficulty=${minDifficulty.toFixed(3)}, maxDifficulty=${maxDifficulty.toFixed(3)}`,
  );

  return questions;
}
