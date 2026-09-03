import { SKILLS } from "./catalog/skills.ts";
import { validateEvidencePolicy } from "./catalog/policies.ts";
import { FOUNDATIONAL_QUESTIONS } from "./foundations/questions.ts";
import { CONTENT_READINESS, readinessIssues } from "./readiness.ts";
import { isGeneratedQuestionDefinition } from "../domain/questions/definitions.ts";
import { createRecentHistory, recordGeneratedQuestionHistory } from "../domain/questions/generator/antiRepetition.ts";
import { buildGeneratedQuestion } from "../domain/questions/generator/buildGeneratedQuestion.ts";
import { evaluateExpression } from "../domain/questions/generator/evaluateExpression.ts";

export interface SkillContentAudit {
  skillId: string;
  total: number;
  generated: number;
  fixedNumeric: number;
  curatedFixed: number;
  categories: Record<string, number>;
  bands: Record<string, number>;
}

export interface ContentAudit {
  total: number;
  generated: number;
  fixedNumeric: number;
  curatedFixed: number;
  bySkill: SkillContentAudit[];
}

export interface ContentValidationReport {
  issues: string[];
  warnings: string[];
  skills: number;
  definitions: number;
  generatedSamples: number;
  audit: ContentAudit;
}

function optionText(value: unknown): string { return JSON.stringify(value); }
function rationalKey(value: { num: bigint; den: bigint }): string { return `${value.num}/${value.den}`; }
function normalizedNumericSurface(value: unknown): string {
  return optionText(value).replace(/[−-]?\d+(?:[.,/]\d+)*/gu, "#").replace(/\s+/gu, " ");
}

export function auditFoundationalContent(): ContentAudit {
  const bySkill = SKILLS.map((skill): SkillContentAudit => {
    const definitions = FOUNDATIONAL_QUESTIONS.filter((item) => item.skillId === skill.id);
    const generated = definitions.filter(isGeneratedQuestionDefinition);
    const fixed = definitions.filter((item) => !isGeneratedQuestionDefinition(item));
    const tally = (key: "category" | "difficultyBand") => Object.fromEntries(
      [...new Set(definitions.map((item) => item[key] ?? "missing"))].sort().map((value) => [value, definitions.filter((item) => (item[key] ?? "missing") === value).length]),
    );
    return {
      skillId: skill.id,
      total: definitions.length,
      generated: generated.length,
      fixedNumeric: fixed.filter((item) => "type" in item && item.type === "numeric").length,
      curatedFixed: fixed.length,
      categories: tally("category"),
      bands: tally("difficultyBand"),
    };
  });
  return {
    total: FOUNDATIONAL_QUESTIONS.length,
    generated: bySkill.reduce((sum, item) => sum + item.generated, 0),
    fixedNumeric: bySkill.reduce((sum, item) => sum + item.fixedNumeric, 0),
    curatedFixed: bySkill.reduce((sum, item) => sum + item.curatedFixed, 0),
    bySkill,
  };
}

function difficultyMatchesBand(band: string | undefined, difficulty: number | undefined): boolean {
  if (band === undefined || difficulty === undefined) return false;
  if (band === "A") return difficulty >= 0 && difficulty < 0.25;
  if (band === "B") return difficulty >= 0.25 && difficulty < 0.5;
  if (band === "C") return difficulty >= 0.5 && difficulty < 0.8;
  return difficulty >= 0.8 && difficulty <= 1;
}

export function validateFoundationalContent(samplesPerGenerator = 100): ContentValidationReport {
  const issues: string[] = [];
  const warnings: string[] = [];
  let generatedSamples = 0;
  const ids = new Set<string>();
  const correctPositions = new Map<number, number>();
  const fixedSurfaceKeys = new Set<string>();
  const normalizedFamilies = new Map<string, { skillId: string; family: string; ids: string[] }>();
  for (const skill of SKILLS) for (const issue of validateEvidencePolicy(skill.evidencePolicy)) issues.push(`${skill.id}: ${issue}`);
  for (const entry of CONTENT_READINESS) for (const issue of readinessIssues(entry, FOUNDATIONAL_QUESTIONS)) issues.push(`${entry.skillId}: ${issue}`);
  for (const definition of FOUNDATIONAL_QUESTIONS) {
    if (ids.has(definition.id)) issues.push(`${definition.id}: duplicate definition id`);
    ids.add(definition.id);
    if (!definition.category) issues.push(`${definition.id}: category is missing`);
    if (!definition.difficultyBand) issues.push(`${definition.id}: difficulty band is missing`);
    if (!definition.contentFamily) issues.push(`${definition.id}: content family is missing`);
    if (isGeneratedQuestionDefinition(definition)) {
      const authoringMode: string | undefined = definition.authoringMode;
      if (authoringMode !== "generated") issues.push("generated definition: authoring mode is missing");
      if (!Object.keys(definition.params).length) issues.push(`${definition.id}: generator has no parameters`);
      if (!definition.answerSemantics) issues.push(`${definition.id}: answer semantics are implicit`);
      const rendered = new Set<string>();
      for (let seed = 1; seed <= samplesPerGenerator; seed += 1) {
        try {
          const question = buildGeneratedQuestion(definition, { seed, maxAttempts: 100 });
          const repeat = buildGeneratedQuestion(definition, { seed, maxAttempts: 100 });
          if (question.id !== repeat.id || question.renderedExpression !== repeat.renderedExpression) issues.push(`${definition.id}: seed ${seed} is not reproducible`);
          if (question.renderedExpression.includes("undefined") || optionText(question.prompt).includes("undefined")) issues.push(`${definition.id}: seed ${seed} rendered undefined content`);
          const expected = evaluateExpression(question.renderedExpression);
          const actual = evaluateExpression(question.correctAnswers[0]);
          if (rationalKey(expected) !== rationalKey(actual)) issues.push(`${definition.id}: seed ${seed} answer does not match expression`);
          if (!difficultyMatchesBand(definition.difficultyBand, question.difficulty)) issues.push(`${definition.id}: seed ${seed} difficulty is outside band ${definition.difficultyBand}`);
          rendered.add(question.renderedExpression);
          generatedSamples += 1;
        } catch { issues.push(`${definition.id}: rejected seed ${seed}`); break; }
      }
      if (rendered.size < Math.min(3, samplesPerGenerator)) issues.push(`${definition.id}: insufficient generated variety`);
      try {
        const history = createRecentHistory();
        const first = buildGeneratedQuestion(definition, { seed: 1, maxAttempts: 100 });
        recordGeneratedQuestionHistory(history, first);
        const next = buildGeneratedQuestion(definition, { seed: 1, recentHistory: history, maxAttempts: 100 });
        if (next.renderedExpression === first.renderedExpression) issues.push(`${definition.id}: anti-repetition repeated the recent expression`);
      } catch { issues.push(`${definition.id}: anti-repetition could not produce a follow-up item`); }
    } else if (definition.type === "singleChoice") {
      if (definition.authoringMode !== "curated" || !definition.curationReason) issues.push(`${definition.id}: curated authoring intent is incomplete`);
      const optionValues = definition.options.map((option) => optionText(option.content));
      const surfaceKey = `${definition.skillId}|${optionText(definition.prompt)}|${optionValues.join("|")}`;
      if (fixedSurfaceKeys.has(surfaceKey)) issues.push(`${definition.id}: duplicate fixed-question surface`);
      fixedSurfaceKeys.add(surfaceKey);
      if (new Set(optionValues).size !== optionValues.length) issues.push(`${definition.id}: duplicate options`);
      const correctIndex = definition.options.findIndex((option) => option.id === definition.correctOptionId);
      if (correctIndex < 0) issues.push(`${definition.id}: correct option is absent`);
      else {
        correctPositions.set(correctIndex, (correctPositions.get(correctIndex) ?? 0) + 1);
        if (definition.options[correctIndex]?.misconceptionId) issues.push(`${definition.id}: correct option has a misconception id`);
      }
      for (const [index, option] of definition.options.entries()) if (index !== correctIndex && (!option.misconceptionId || !option.misconceptionRationale)) issues.push(`${definition.id}: distractor ${option.id} has incomplete misconception metadata`);
      const normalizedKey = `${definition.skillId}|${definition.contentFamily}|${normalizedNumericSurface(definition.prompt)}|${normalizedNumericSurface(definition.options.map((option) => option.content))}`;
      const existing = normalizedFamilies.get(normalizedKey);
      normalizedFamilies.set(normalizedKey, { skillId: definition.skillId, family: definition.contentFamily ?? "missing-family", ids: [...(existing?.ids ?? []), definition.id] });
    } else if (definition.type === "numeric") {
      if (definition.authoringMode !== "curated" || !definition.curationReason) issues.push(`${definition.id}: fixed numeric item requires an explicit curation reason`);
      const surfaceKey = `${definition.skillId}|${optionText(definition.prompt)}|${definition.correctAnswers.join("|")}`;
      if (fixedSurfaceKeys.has(surfaceKey)) issues.push(`${definition.id}: duplicate fixed-question surface`);
      fixedSurfaceKeys.add(surfaceKey);
      const normalizedKey = `${definition.skillId}|${definition.contentFamily}|${normalizedNumericSurface(definition.prompt)}`;
      const existing = normalizedFamilies.get(normalizedKey);
      normalizedFamilies.set(normalizedKey, { skillId: definition.skillId ?? "missing-skill", family: definition.contentFamily ?? "missing-family", ids: [...(existing?.ids ?? []), definition.id] });
    } else if (definition.type === "multiChoice") {
      if (!definition.correctOptionIds.length || definition.correctOptionIds.some((id) => !definition.options.some((option) => option.id === id))) issues.push(`${definition.id}: invalid correct options`);
    }
  }
  const positionCounts = [...correctPositions.values()];
  if (positionCounts.length < 4 || Math.max(...positionCounts) - Math.min(...positionCounts) > 2) issues.push("fixed bank correct-answer positions are unbalanced");
  for (const group of normalizedFamilies.values()) if (group.ids.length >= 4) warnings.push(`${group.skillId}/${group.family}: near-identical curated family (${group.ids.length} items: ${group.ids.slice(0, 3).join(", ")}...)`);
  return { issues, warnings, skills: SKILLS.length, definitions: FOUNDATIONAL_QUESTIONS.length, generatedSamples, audit: auditFoundationalContent() };
}
