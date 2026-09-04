import { isGeneratedQuestionDefinition } from "../../domain/questions/definitions.ts";
import type { GeneratedQuestionDefinition, ParamSpec } from "../../domain/questions/generator/types.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import type { GeneratedQuestionInstance } from "../../domain/questions/types.ts";

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

export const SIGNED_SKILL_INVARIANTS: Readonly<Record<string, string>> = {
  INT_NUMBER_LINE: "signed-number-position",
  INT_COMPARE: "signed-number-comparison",
  INT_NEGATION: "opposite-number-reasoning",
  INT_ADD: "signed-addition",
  INT_SUB: "signed-subtraction",
  INT_MUL: "signed-multiplication",
  INT_DIV: "signed-division",
};

const SIGNED_OPERATORS: Readonly<Record<string, string>> = {
  INT_ADD: "+",
  INT_SUB: "-",
  INT_MUL: "*",
  INT_DIV: "/",
};

function usesTargetOperation(skillId: string, expression: string): boolean {
  if (skillId === "INT_SUB") return /(?:\d|\)|\})\s*-\s*(?:\d|\(|\{)/u.test(expression);
  const operator = SIGNED_OPERATORS[skillId];
  return !!operator && expression.includes(operator);
}

export function signedSkillDefinitionIssues(definitions: readonly SkillQuestionDefinition[]): string[] {
  const issues: string[] = [];
  const families = new Map<string, GeneratedQuestionDefinition[]>();
  for (const definition of definitions) {
    if (!isGeneratedQuestionDefinition(definition) || !definition.skillId?.startsWith("INT_")) continue;
    const expectedInvariant = SIGNED_SKILL_INVARIANTS[definition.skillId];
    if (!expectedInvariant) issues.push(`${definition.id}: unknown signed-number Skill invariant`);
    if (definition.metadata?.skillInvariant !== expectedInvariant) issues.push(`${definition.id}: missing or incorrect signed Skill invariant`);
    if (typeof definition.metadata?.signPattern !== "string" || !definition.metadata.signPattern.trim()) issues.push(`${definition.id}: explicit signPattern is missing`);
    const operator = SIGNED_OPERATORS[definition.skillId];
    if (operator && !usesTargetOperation(definition.skillId, definition.exprTemplate)) issues.push(`${definition.id}: template does not contain the target signed operation`);
    if (definition.contentFamily) families.set(definition.contentFamily, [...(families.get(definition.contentFamily) ?? []), definition]);
  }
  for (const [family, members] of families) {
    if (members.length < 2) continue;
    const structuralProgression = members.every((item) => item.metadata?.difficultyFeature === "structure");
    if (structuralProgression) {
      const stages = members.map((item) => item.metadata?.structuralStage);
      if (stages.some((stage) => typeof stage !== "string") || new Set(stages).size !== members.length) issues.push(`${family}: structural signed Bands require distinct structuralStage values`);
    } else {
      if (new Set(members.map((item) => item.exprTemplate)).size !== 1) issues.push(`${family}: magnitude-based template changes across Bands`);
      if (new Set(members.map((item) => item.metadata?.signPattern)).size !== 1) issues.push(`${family}: magnitude-based signPattern changes across Bands`);
    }
    if (new Set(members.map((item) => item.metadata?.skillInvariant)).size !== 1) issues.push(`${family}: Skill invariant changes across Bands`);
  }
  return issues;
}

export function signedGeneratedInstanceIssues(definition: GeneratedQuestionDefinition, question: GeneratedQuestionInstance): string[] {
  const skillId = definition.skillId;
  if (!skillId || !SIGNED_OPERATORS[skillId]) return [];
  const expression = question.renderedExpression;
  const hasStructuralNegative = /(?:^-\d|\(-(?:\d|\())/u.test(expression);
  const issues: string[] = [];
  if (!hasStructuralNegative) issues.push(`${definition.id}: ${skillId} instance does not contain a structurally negative operand`);
  if (!usesTargetOperation(skillId, expression)) issues.push(`${definition.id}: ${skillId} instance does not use its target operation`);
  const signPattern = String(definition.metadata?.signPattern ?? "");
  if (question.type === "numeric" && question.correctAnswers.includes("0") && !signPattern.includes("zero")) issues.push(`${definition.id}: zero result is not attributed to an explicit zero/opposites family`);
  return issues;
}
