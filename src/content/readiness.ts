import { SKILLS } from "./catalog/skills.ts";
import type { DifficultyBand, QuestionCategory } from "./catalog/types.ts";
import type { SkillQuestionDefinition } from "../domain/session/skillQuestionSelector.ts";
import { isGeneratedQuestionDefinition } from "../domain/questions/definitions.ts";
import { questionCategory } from "../domain/questions/categories.ts";

export type ReadinessStrategy = "generatorHeavy" | "fixedHeavy" | "mixed";
export interface SkillReadiness { skillId: string; strategy: ReadinessStrategy; requiredCategories: QuestionCategory[]; requiredBands: DifficultyBand[]; humanReviewed: boolean }

const conceptual = new Set(["AR_PLACE_VALUE", "INT_NUMBER_LINE", "INT_COMPARE", "INT_NEGATION", "FRAC_MEANING", "FRAC_EQUIV", "ALG_EQUALITY", "ALG_VARIABLE"]);
export const CONTENT_READINESS: SkillReadiness[] = SKILLS.map((skill) => ({
  skillId: skill.id,
  strategy: conceptual.has(skill.id) ? "fixedHeavy" : "mixed",
  requiredCategories: ["AR_PLACE_VALUE", "INT_NUMBER_LINE", "FRAC_MEANING"].includes(skill.id)
    ? ["conceptual", "representation"]
    : skill.id === "FRAC_EQUIV" ? ["reasoning", "representation"]
    : conceptual.has(skill.id) ? ["conceptual", "reasoning"] : ["calculation", "conceptual"],
  requiredBands: skill.id.includes("_FACTS") || skill.id.includes("_F_") || skill.id === "INT_NEGATION" ? ["A", "B"] : ["A", "B", "C"],
  humanReviewed: true,
}));

export function readinessIssues(entry: SkillReadiness, definitions: readonly SkillQuestionDefinition[]): string[] {
  const content = definitions.filter((item) => item.skillId === entry.skillId);
  const fixed = content.filter((item) => !isGeneratedQuestionDefinition(item));
  const generated = content.filter(isGeneratedQuestionDefinition);
  const generatedEvidence = generated.filter((item) => questionCategory(item) !== "calculation");
  const issues: string[] = [];
  if (!entry.humanReviewed) issues.push("human review flag is false");
  if (entry.strategy === "fixedHeavy" && fixed.length < 18 && generatedEvidence.length < 2) issues.push("fixed-heavy threshold requires 18 curated items or 2 conceptual generators");
  if (entry.strategy === "mixed" && (generated.length < 1 || (fixed.length < 10 && generatedEvidence.length < 1))) issues.push("mixed threshold requires generated calculation plus curated or generated conceptual evidence");
  for (const category of entry.requiredCategories) if (!content.some((item) => questionCategory(item) === category)) issues.push(`missing category ${category}`);
  for (const band of entry.requiredBands) if (!content.some((item) => item.difficultyBand === band)) issues.push(`missing band ${band}`);
  return issues;
}

export function readySkillIds(definitions: readonly SkillQuestionDefinition[], manifest: readonly SkillReadiness[] = CONTENT_READINESS): Set<string> {
  return new Set(manifest.filter((entry) => readinessIssues(entry, definitions).length === 0).map((entry) => entry.skillId));
}

export function readyDefinitions(definitions: readonly SkillQuestionDefinition[]): SkillQuestionDefinition[] {
  const ready = readySkillIds(definitions);
  return definitions.filter((item) => ready.has(item.skillId));
}
