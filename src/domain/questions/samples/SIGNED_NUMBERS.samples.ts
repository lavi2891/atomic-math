import { SIGNED_NUMBERS_GENERATED_QUESTIONS } from "../bank/SIGNED_NUMBERS.generated.ts";
import { buildGeneratedQuestion } from "../generator/buildGeneratedQuestion.ts";
import type { GeneratedQuestionDefinition } from "../generator/types.ts";
import type { GeneratedQuestionInstance } from "../types.ts";

function getDefinition(id: string): GeneratedQuestionDefinition {
  const definition = SIGNED_NUMBERS_GENERATED_QUESTIONS.find((entry) => entry.id === id);
  if (!definition) {
    throw new Error(`Expected signed numbers generator definition "${id}" to be registered`);
  }
  return definition;
}

function buildSamples(
  definition: GeneratedQuestionDefinition,
  seeds: number[],
): GeneratedQuestionInstance[] {
  return seeds.map((seed) => buildGeneratedQuestion(definition, { seed }));
}

const SAMPLE_DEFINITIONS: Array<{ id: string; seeds: number[] }> = [
  { id: "SN_GEN_ADD_NEG_POS_001", seeds: [1, 2, 3, 4, 5] },
  { id: "SN_GEN_SUB_DOUBLE_NEG_002", seeds: [101, 102, 103, 104, 105] },
  { id: "SN_GEN_NEGATE_PARENS_SUB_001", seeds: [201, 202, 203, 204, 205] },
  { id: "SN_GEN_POWER_NEG_BASE_PARENS_002", seeds: [301, 302, 303, 304, 305] },
];

export const SIGNED_NUMBERS_SAMPLE_QUESTIONS: GeneratedQuestionInstance[] =
  SAMPLE_DEFINITIONS.flatMap(({ id, seeds }) => buildSamples(getDefinition(id), seeds));
