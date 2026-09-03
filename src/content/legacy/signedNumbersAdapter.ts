import { SKILLS } from "../catalog/index.ts";
import type { SkillId } from "../catalog/index.ts";
import {
  isGeneratedQuestionDefinition,
  type QuestionDefinition,
} from "../../domain/questions/definitions.ts";

export type SkillQuestionDefinition = QuestionDefinition & { skillId: SkillId };

const SKILL_IDS = new Set<string>(SKILLS.map((skill) => skill.id));
const SKILL_BY_LEGACY_SUBTOPIC: Readonly<Record<string, SkillId>> = {
  addition: "INT_ADD",
  subtraction: "INT_SUB",
  multiplication: "INT_MUL",
  mixed_operations: "INT_ORDER_OPS",
  decimals: "INT_DECIMAL_OPS",
  rationals: "INT_RATIONAL_OPS",
  mixed_rational_decimal: "INT_RATIONAL_OPS",
  negation: "INT_NEGATION",
  negation_parentheses: "INT_NEGATION",
  distributive: "INT_DISTRIBUTIVE",
  powers: "INT_POWERS",
  powers_parentheses: "INT_POWERS",
  fraction_powers: "INT_POWERS",
};

function legacySubtopic(definition: QuestionDefinition): string | undefined {
  return isGeneratedQuestionDefinition(definition)
    ? definition.metadata?.subtopic
    : definition.subtopic;
}

export function adaptSignedNumbersQuestion(definition: QuestionDefinition): SkillQuestionDefinition {
  if (definition.topicId !== "SIGNED_NUMBERS") {
    throw new Error(`Cannot adapt non-signed-number question ${definition.id}`);
  }
  const subtopic = legacySubtopic(definition);
  const skillId = subtopic ? SKILL_BY_LEGACY_SUBTOPIC[subtopic] : undefined;
  if (!skillId || !SKILL_IDS.has(skillId)) {
    throw new Error(`Signed-number question ${definition.id} has no valid skill mapping for subtopic ${subtopic ?? "<missing>"}`);
  }
  return { ...definition, skillId, category: definition.category ?? "calculation" };
}

export function adaptSignedNumbersQuestions(definitions: readonly QuestionDefinition[]): SkillQuestionDefinition[] {
  return definitions.map(adaptSignedNumbersQuestion);
}
