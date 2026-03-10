import { SIGNED_NUMBERS_GENERATED_QUESTIONS } from "../bank/SIGNED_NUMBERS.generated.ts";
import { buildGeneratedQuestion } from "../generator/buildGeneratedQuestion.ts";
import type { GeneratedQuestionInstance } from "../types.ts";

const [subNegNegDefinition, absDiffDefinition] = SIGNED_NUMBERS_GENERATED_QUESTIONS;

if (!subNegNegDefinition || !absDiffDefinition) {
  throw new Error("Expected signed numbers generator definitions to be registered");
}

function buildSamples(
  definition: (typeof SIGNED_NUMBERS_GENERATED_QUESTIONS)[number],
  seeds: number[],
): GeneratedQuestionInstance[] {
  return seeds.map((seed) => buildGeneratedQuestion(definition, { seed }));
}

export const SIGNED_NUMBERS_SAMPLE_QUESTIONS: GeneratedQuestionInstance[] = [
  ...buildSamples(subNegNegDefinition, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  ...buildSamples(absDiffDefinition, [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]),
];
