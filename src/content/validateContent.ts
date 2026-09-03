import { SKILLS } from "./catalog/skills.ts";
import { validateEvidencePolicy } from "./catalog/policies.ts";
import { FOUNDATIONAL_QUESTIONS } from "./foundations/questions.ts";
import { CONTENT_READINESS, readinessIssues } from "./readiness.ts";
import { isGeneratedQuestionDefinition } from "../domain/questions/definitions.ts";
import { buildGeneratedQuestion } from "../domain/questions/generator/buildGeneratedQuestion.ts";

export interface ContentValidationReport { issues: string[]; skills: number; definitions: number; generatedSamples: number }

function optionText(value: unknown): string { return JSON.stringify(value); }

export function validateFoundationalContent(samplesPerGenerator = 100): ContentValidationReport {
  const issues: string[] = [];
  let generatedSamples = 0;
  const ids = new Set<string>();
  const correctPositions = new Map<number, number>();
  const fixedSurfaceKeys = new Set<string>();
  for (const skill of SKILLS) for (const issue of validateEvidencePolicy(skill.evidencePolicy)) issues.push(`${skill.id}: ${issue}`);
  for (const entry of CONTENT_READINESS) for (const issue of readinessIssues(entry, FOUNDATIONAL_QUESTIONS)) issues.push(`${entry.skillId}: ${issue}`);
  for (const definition of FOUNDATIONAL_QUESTIONS) {
    if (ids.has(definition.id)) issues.push(`${definition.id}: duplicate definition id`);
    ids.add(definition.id);
    if (!definition.category) issues.push(`${definition.id}: category is missing`);
    if (!definition.difficultyBand) issues.push(`${definition.id}: difficulty band is missing`);
    if (isGeneratedQuestionDefinition(definition)) {
      const rendered = new Set<string>();
      for (let seed = 1; seed <= samplesPerGenerator; seed += 1) {
        try {
          const question = buildGeneratedQuestion(definition, { seed, maxAttempts: 100 });
          rendered.add(question.renderedExpression);
          generatedSamples += 1;
        } catch { issues.push(`${definition.id}: rejected seed ${seed}`); break; }
      }
      if (rendered.size < Math.min(3, samplesPerGenerator)) issues.push(`${definition.id}: insufficient generated variety`);
    } else if (definition.type === "singleChoice") {
      const optionValues = definition.options.map((option) => optionText(option.content));
      const surfaceKey = `${definition.skillId}|${optionText(definition.prompt)}|${optionValues.join("|")}`;
      if (fixedSurfaceKeys.has(surfaceKey)) issues.push(`${definition.id}: duplicate fixed-question surface`);
      fixedSurfaceKeys.add(surfaceKey);
      if (new Set(optionValues).size !== optionValues.length) issues.push(`${definition.id}: duplicate options`);
      const correctIndex = definition.options.findIndex((option) => option.id === definition.correctOptionId);
      if (correctIndex < 0) issues.push(`${definition.id}: correct option is absent`);
      else correctPositions.set(correctIndex, (correctPositions.get(correctIndex) ?? 0) + 1);
    } else if (definition.type === "multiChoice") {
      if (!definition.correctOptionIds.length || definition.correctOptionIds.some((id) => !definition.options.some((option) => option.id === id))) issues.push(`${definition.id}: invalid correct options`);
    }
  }
  const positionCounts = [...correctPositions.values()];
  if (positionCounts.length < 4 || Math.max(...positionCounts) - Math.min(...positionCounts) > 2) issues.push("fixed bank correct-answer positions are unbalanced");
  return { issues, skills: SKILLS.length, definitions: FOUNDATIONAL_QUESTIONS.length, generatedSamples };
}
