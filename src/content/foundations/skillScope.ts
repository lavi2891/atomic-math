import { isGeneratedQuestionDefinition } from "../../domain/questions/definitions.ts";
import type { GeneratedQuestionDefinition, ParamSpec } from "../../domain/questions/generator/types.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";

export const ATOMIC_FACT_SKILL_VALUES = {
  AR_MUL_F_2_5_10: [2, 5, 10],
  AR_MUL_F_3_4: [3, 4],
  AR_MUL_F_6_7: [6, 7],
  AR_MUL_F_8_9: [8, 9],
  AR_DIV_F_2_5_10: [2, 5, 10],
  AR_DIV_F_3_4: [3, 4],
  AR_DIV_F_6_7: [6, 7],
  AR_DIV_F_8_9: [8, 9],
} as const satisfies Readonly<Record<string, readonly number[]>>;

function possibleIntegers(spec: ParamSpec): number[] | null {
  if (spec.type !== "integer" && spec.type !== "natural") return null;
  const minimum = spec.type === "natural" ? Math.max(1, spec.min) : spec.min;
  const excluded = new Set(spec.exclude ?? []);
  return Array.from({ length: Math.max(0, spec.max - minimum + 1) }, (_, index) => minimum + index)
    .filter((value) => !excluded.has(value));
}

function factSkillValues(definition: GeneratedQuestionDefinition): readonly number[] | undefined {
  return definition.skillId ? ATOMIC_FACT_SKILL_VALUES[definition.skillId as keyof typeof ATOMIC_FACT_SKILL_VALUES] : undefined;
}

/** Blocking authoring audit: every Band/family must preserve the atomic fact-family operand. */
export function atomicSkillIdentityIssues(definitions: readonly SkillQuestionDefinition[]): string[] {
  return definitions.flatMap((definition) => {
    if (!isGeneratedQuestionDefinition(definition)) return [];
    const expected = factSkillValues(definition);
    if (!expected) return [];
    const parameter = definition.params.a;
    const actual = parameter ? possibleIntegers(parameter) : null;
    if (!actual?.length) return [`${definition.id}: atomic fact skill requires an enumerable parameter a`];
    const unexpected = actual.filter((value) => !expected.includes(value as never));
    const missing = expected.filter((value) => !actual.includes(value));
    const issues: string[] = [];
    if (unexpected.length) issues.push(`${definition.id}: parameter a drifts outside ${definition.skillId} (${unexpected.join(", ")})`);
    if (missing.length) issues.push(`${definition.id}: parameter a omits atomic family values (${missing.join(", ")})`);
    const requiredOperator = definition.skillId?.includes("_MUL_") ? "*" : "/";
    if (!definition.exprTemplate.includes(requiredOperator)) issues.push(`${definition.id}: template does not preserve the ${definition.skillId} operation`);
    return issues;
  });
}
