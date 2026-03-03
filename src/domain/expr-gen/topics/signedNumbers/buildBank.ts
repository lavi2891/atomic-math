import type { NumericQuestion } from "../../../questions/types.ts";

import { generateExprNumericQuestion } from "../../core/generateNumericQuestion.ts";
import { fnv1a32 } from "../../core/rng.ts";

import { SIGNED_NUMBERS_SPECS } from "./specs.ts";

interface BuildSignedNumbersBankInput {
  perBucketPerSpec: number;
  buckets?: number[];
  seedBase?: string | number;
}

const TOPIC_ID = "SIGNED_NUMBERS";
const MAX_ATTEMPTS_PER_SLOT = 200;

function defaultBuckets(): number[] {
  return Array.from({ length: 11 }, (_, index) => index);
}

function buildSeedKey(
  templateId: string,
  bucket: number,
  index: number,
): string {
  return `${TOPIC_ID}|${templateId}|d=${bucket}|i=${index}`;
}

function getQuestionSignature(question: NumericQuestion): string {
  const mathLatex =
    question.prompt.find((item) => item.kind === "math")?.latex ?? "";
  const answer = question.correctAnswers[0] ?? "";
  return `${mathLatex}||${answer}`;
}

export function buildSignedNumbersBank(
  input: BuildSignedNumbersBankInput,
): NumericQuestion[] {
  const buckets = input.buckets ?? defaultBuckets();
  const questions: NumericQuestion[] = [];
  const seenSignatures = new Set<string>();
  const seenIds = new Set<string>();

  for (const spec of SIGNED_NUMBERS_SPECS) {
    for (const bucket of buckets) {
      let producedForBucket = 0;
      let candidateIndex = 0;
      let relaxedMode = false;
      let strictAttemptCount = 0;
      const strictAttemptLimit = input.perBucketPerSpec * MAX_ATTEMPTS_PER_SLOT;

      while (producedForBucket < input.perBucketPerSpec) {
        if (!relaxedMode && strictAttemptCount >= strictAttemptLimit) {
          // Keep generation deterministic and complete even when a spec+bucket has
          // a small effective uniqueness space for the chosen difficulty target.
          relaxedMode = true;
        }

        const seedKey = buildSeedKey(spec.templateId, bucket, candidateIndex);
        const hashInput =
          input.seedBase === undefined
            ? seedKey
            : `${String(input.seedBase)}|${seedKey}`;
        const seedNumber = fnv1a32(hashInput);
        const hashSuffix = seedNumber.toString(16).padStart(8, "0").slice(0, 8);
        const id = `${spec.templateId}_d${bucket}_i${producedForBucket}_${hashSuffix}`;
        const difficultyTarget = bucket / 10;

        const question = generateExprNumericQuestion({
          id,
          exprSpec: spec,
          seedNumber,
          seedKey,
          difficultyTarget,
        });

        const signature = getQuestionSignature(question);
        const signatureSeen = seenSignatures.has(signature);
        if ((!relaxedMode && signatureSeen) || seenIds.has(question.id)) {
          strictAttemptCount += 1;
          candidateIndex += 1;
          continue;
        }

        seenSignatures.add(signature);
        seenIds.add(question.id);
        questions.push(question);
        producedForBucket += 1;
        candidateIndex += 1;
      }
    }
  }

  return questions;
}
