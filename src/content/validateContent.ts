import { SKILLS } from "./catalog/skills.ts";
import { validateEvidencePolicy } from "./catalog/policies.ts";
import { FOUNDATIONAL_QUESTIONS } from "./foundations/questions.ts";
import { CONTENT_READINESS, readinessIssues } from "./readiness.ts";
import { isGeneratedQuestionDefinition } from "../domain/questions/definitions.ts";
import { createRecentHistory, recordGeneratedQuestionHistory } from "../domain/questions/generator/antiRepetition.ts";
import { buildGeneratedQuestion } from "../domain/questions/generator/buildGeneratedQuestion.ts";
import { evaluateExpression } from "../domain/questions/generator/evaluateExpression.ts";
import type { GeneratedQuestionDefinition, ParamSpec } from "../domain/questions/generator/types.ts";
import type { SkillQuestionDefinition } from "../domain/session/skillQuestionSelector.ts";
import type { OptionContent, Question, QuestionCurationReason } from "../domain/questions/types.ts";
import type { GeneratedQuestionInstance } from "../domain/questions/types.ts";
import { atomicSkillIdentityIssues, signedGeneratedInstanceIssues, signedSkillDefinitionIssues } from "./foundations/skillScope.ts";
import { hasAmbiguousProseNumber, mathLookingText } from "./foundations/studentMathContent.ts";

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

const APPROVED_FIXED_NUMERIC_REASONS = new Set<QuestionCurationReason>([
  "misconception",
  "edge-case",
  "representation",
  "regression",
  "deliberate-example",
]);
const NUMERIC_LITERAL_PATTERN = /(?:^|[^\p{L}\p{N}_])[-−–]?\d+(?:[.,/]\d+)?/gu;
const GENERIC_JUSTIFICATION_PATTERN = /(?:convenient|arbitrary|magic number|דוגמה נוחה|מספר שרירותי)/iu;

function contentSurface(content: readonly OptionContent[]): string {
  return content.map((part) => part.kind === "text" ? part.value : part.latex).join(" ");
}

const CONSECUTIVE_SIGN_PATTERN = /[+−*×/÷-]\s*[-−]\s*\d/u;

function studentFacingNotationIssues(definitionId: string, question: GeneratedQuestionInstance, seed: number): string[] {
  const surfaces = [contentSurface(question.prompt), ...(question.type === "numeric" ? [] : question.options.map((option) => contentSurface(option.content)))];
  return surfaces.some((surface) => CONSECUTIVE_SIGN_PATTERN.test(surface))
    ? [`${definitionId}: seed ${seed} exposes a negative operand without parentheses`]
    : [];
}

/** Small, explicit invariants for Skills whose identity must be visible in the rendered task. */
export function pedagogicalTargetingIssues(definition: GeneratedQuestionDefinition, question: GeneratedQuestionInstance, seed: number): string[] {
  const promptText = contentSurface(question.prompt);
  const allStudentText = [promptText, ...(question.type === "numeric" ? [] : question.options.map((option) => contentSurface(option.content)))].join(" ");
  const promptMath = question.prompt.filter((part) => part.kind === "math").map((part) => part.latex).join(" ");
  const issues: string[] = [];
  if ((definition.skillId === "EQ_ADD" || definition.skillId === "EQ_MUL") && !promptMath.includes("=")) issues.push(`${definition.id}: seed ${seed} does not show the equation being solved`);
  if (definition.skillId === "ALG_SUBSTITUTE" && (!/הצב/u.test(promptText) || !promptMath.includes("="))) issues.push(`${definition.id}: seed ${seed} does not explicitly present substitution`);
  if (definition.skillId === "AR_FACTORS_MULTIPLES" && !/כפול|גורמ/u.test(promptText)) issues.push(`${definition.id}: seed ${seed} does not explicitly target factors or multiples`);
  if (definition.skillId === "INT_COMPARE" && (!/השוו|השוואה|יחס/u.test(promptText) || question.prompt.filter((part) => part.kind === "math").length < 2)) issues.push(`${definition.id}: seed ${seed} does not explicitly show both signed values being compared`);
  if (definition.skillId === "INT_NEGATION" && !/נגד/u.test(promptText)) issues.push(`${definition.id}: seed ${seed} does not explicitly target opposite-number reasoning`);
  if (definition.skillId === "INT_MUL" && definition.contentFamily?.includes("sign-rules") && !/מכפלה/u.test(promptText)) issues.push(`${definition.id}: seed ${seed} does not explicitly ask for the product sign`);
  if (definition.skillId === "INT_DIV" && definition.contentFamily?.includes("sign-rules") && !/מנה|תוצאת החלוקה/u.test(promptText)) issues.push(`${definition.id}: seed ${seed} does not explicitly ask for the quotient sign`);
  if (definition.skillId === "ALG_VARIABLE" && /(?:משתנה שמייצג מספר|הוא מספר)/u.test(allStudentText)) issues.push(`${definition.id}: seed ${seed} describes a variable imprecisely`);
  return issues;
}

export function signedMultiplicationLoadIssues(definitions: readonly SkillQuestionDefinition[]): string[] {
  return definitions.flatMap((definition) => {
    if (!isGeneratedQuestionDefinition(definition) || definition.skillId !== "INT_MUL" || definition.category !== "calculation") return [];
    const m = definition.params.m; const n = definition.params.n;
    if (!m || !n || m.type === "rational" || n.type === "rational") return [];
    return m.max > 10 && n.max > 10
      ? [`${definition.id}: signed multiplication permits arbitrary two-digit by two-digit arithmetic`]
      : [];
  });
}

export function studentMathContentIssues(definitionId: string, question: Question, sampleLabel = "curated"): string[] {
  const surfaces: Array<{ label: string; content: readonly OptionContent[] }> = [
    { label: "prompt", content: question.prompt },
    ...(question.hints ?? []).map((content, index) => ({ label: `hint ${index + 1}`, content })),
    ...(question.type === "numeric" ? [] : question.options.map((option) => ({ label: `option ${option.id}`, content: option.content }))),
  ];
  return surfaces.flatMap(({ label, content }) => content.flatMap((part) => {
    if (part.kind === "text" && mathLookingText(part.value)) {
      return [`${definitionId}: ${sampleLabel} ${label} contains mathematical notation in a text segment`];
    }
    if (part.kind === "math" && !part.latex.trim()) {
      return [`${definitionId}: ${sampleLabel} ${label} contains an empty math segment`];
    }
    if (part.kind === "math" && /(?:\+|-|\\times|\\div|\*|\/)\s*-\s*\d/u.test(part.latex)) {
      return [`${definitionId}: ${sampleLabel} ${label} contains consecutive operators before a negative operand`];
    }
    if (part.kind === "math" && /(?:\d|[A-Za-z])\s*\/\s*(?:$|[)=<>+*/])/u.test(part.latex)) {
      return [`${definitionId}: ${sampleLabel} ${label} contains malformed fraction notation`];
    }
    return [];
  }));
}

export function studentMathContentWarnings(definitionId: string, question: Question, sampleLabel = "curated"): string[] {
  const surfaces: Array<{ label: string; content: readonly OptionContent[] }> = [
    { label: "prompt", content: question.prompt },
    ...(question.hints ?? []).map((content, index) => ({ label: `hint ${index + 1}`, content })),
    ...(question.type === "numeric" ? [] : question.options.map((option) => ({ label: `option ${option.id}`, content: option.content }))),
  ];
  return surfaces.flatMap(({ label, content }) => content.flatMap((part) =>
    part.kind === "text" && hasAmbiguousProseNumber(part.value)
      ? [`${definitionId}: ${sampleLabel} ${label} contains a prose number; confirm it is incidental rather than mathematical problem data`]
      : [],
  ));
}

function numericContentValue(content: readonly OptionContent[]): string | null {
  const source = contentSurface(content).trim().replaceAll("−", "-").replaceAll("×", "*").replaceAll("÷", "/");
  if (!source || !/^[\d+\-*/().\s]+$/u.test(source)) return null;
  try { return rationalKey(evaluateExpression(source)); } catch { return null; }
}

function mathematicallyDuplicateChoiceIssues(definitionId: string, question: GeneratedQuestionInstance, seed: number): string[] {
  if (question.type === "numeric") return [];
  const correctIds = question.type === "singleChoice" ? [question.correctOptionId] : question.correctOptionIds;
  const correctValues = new Set(question.options.filter((option) => correctIds.includes(option.id)).map((option) => numericContentValue(option.content)).filter((value): value is string => value !== null));
  if (!correctValues.size) return [];
  const duplicate = question.options.some((option) => !correctIds.includes(option.id) && correctValues.has(numericContentValue(option.content) ?? ""));
  return duplicate ? [`${definitionId}: seed ${seed} has a distractor mathematically equal to a correct option`] : [];
}

export function generatedInstanceMetadataIssues(definition: GeneratedQuestionDefinition, question: GeneratedQuestionInstance): string[] {
  const issues: string[] = [];
  if (question.templateId !== definition.id || question.baseId !== definition.id) issues.push(`${definition.id}: generated instance identity does not match its definition`);
  const reconstructed = definition.exprTemplate.replace(/\{([A-Za-z_]\w*)\}/g, (match, name: string) => question.sampledParams[name] ?? match);
  if (reconstructed !== question.renderedExpression) issues.push(`${definition.id}: rendered expression does not match template and sampled params`);
  for (const [name, spec] of Object.entries(definition.params)) {
    const raw = question.sampledParams[name];
    if (raw === undefined) { issues.push(`${definition.id}: sampled param ${name} is missing`); continue; }
    if (spec.type === "rational") continue;
    const value = Number(raw);
    const minimum = spec.type === "natural" ? Math.max(1, spec.min) : spec.min;
    if (!Number.isFinite(value) || value < minimum || value > spec.max || spec.exclude?.includes(value)) issues.push(`${definition.id}: sampled param ${name}=${raw} violates its declared range`);
  }
  return issues;
}

export function symbolicAuthoringIssues(definition: GeneratedQuestionDefinition): string[] {
  const issues: string[] = [];
  for (const symbol of definition.studentFacingSymbols ?? []) {
    if (!/^[A-Za-z]\w*$/u.test(symbol)) issues.push(`${definition.id}: invalid student-facing symbol ${symbol}`);
    if (definition.params[symbol]) issues.push(`${definition.id}: ${symbol} cannot be both a sampled parameter and an intentional student-facing symbol`);
    if (!new RegExp(`\\b${symbol}\\b`, "u").test(definition.exprTemplate)) issues.push(`${definition.id}: declared student-facing symbol ${symbol} is absent from exprTemplate`);
  }
  return issues;
}

export interface CuratedNumericLiteralItem {
  definitionId: string;
  curationReason?: QuestionCurationReason;
  justification?: string;
  literals: string[];
}

export function curatedNumericLiteralItems(definitions: readonly SkillQuestionDefinition[]): CuratedNumericLiteralItem[] {
  return definitions.flatMap((definition) => {
    if (isGeneratedQuestionDefinition(definition)) return [];
    const answerSurface = definition.type === "numeric"
      ? definition.correctAnswers.join(" ")
      : definition.options.map((option) => contentSurface(option.content)).join(" ");
    const surface = `${contentSurface(definition.prompt)} ${answerSurface}`;
    const literals = [...surface.matchAll(NUMERIC_LITERAL_PATTERN)].map((match) => match[0]!.trim());
    return literals.length ? [{ definitionId: definition.id, curationReason: definition.curationReason, justification: definition.curationJustificationHe, literals: [...new Set(literals)] }] : [];
  });
}

export function curatedNumericLiteralIssues(definitions: readonly SkillQuestionDefinition[]): string[] {
  return curatedNumericLiteralItems(definitions).flatMap((item) => {
    if (!item.curationReason || !APPROVED_FIXED_NUMERIC_REASONS.has(item.curationReason)) return [`${item.definitionId}: curated numeric literals require an approved curationReason`];
    if (!item.justification?.trim()) return [`${item.definitionId}: curated numeric literals require curationJustificationHe explaining why the exact values matter`];
    if (GENERIC_JUSTIFICATION_PATTERN.test(item.justification)) return [`${item.definitionId}: curationJustificationHe does not establish a pedagogical need for the exact values`];
    return [];
  });
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

function parameterBounds(spec: ParamSpec): { min: number; max: number } | null {
  if (spec.type === "rational") return null;
  return { min: spec.min, max: spec.max };
}

const BAND_ORDER = ["A", "B", "C", "D"];

export function magnitudeBandProgressionIssues(definitions: readonly SkillQuestionDefinition[]): string[] {
  const groups = new Map<string, GeneratedQuestionDefinition[]>();
  for (const definition of definitions) {
    if (!isGeneratedQuestionDefinition(definition) || definition.metadata?.difficultyFeature !== "magnitude" || !definition.contentFamily) continue;
    const key = `${definition.skillId}|${definition.contentFamily}`;
    groups.set(key, [...(groups.get(key) ?? []), definition]);
  }
  const issues: string[] = [];
  for (const [key, family] of groups) {
    family.sort((left, right) => BAND_ORDER.indexOf(left.difficultyBand ?? "") - BAND_ORDER.indexOf(right.difficultyBand ?? ""));
    for (let index = 1; index < family.length; index += 1) {
      const easier = family[index - 1]!; const harder = family[index]!;
      const sharedBounds = Object.entries(harder.params).flatMap(([name, hardSpec]) => {
        const easySpec = easier.params[name]; if (!easySpec) return [];
        const easy = parameterBounds(easySpec); const hard = parameterBounds(hardSpec); if (!easy || !hard) return [];
        return [{ name, easy, hard }];
      });
      const regression = sharedBounds.find(({ easy, hard }) => hard.min < easy.min || hard.max < easy.max);
      if (regression) issues.push(`${key}: Band ${harder.difficultyBand} lowers ${regression.name} below Band ${easier.difficultyBand}`);
      const meaningfulIncrease = sharedBounds.some(({ easy, hard }) => hard.min >= easy.max);
      if (!meaningfulIncrease) issues.push(`${key}: Band ${harder.difficultyBand} does not increase a magnitude range beyond Band ${easier.difficultyBand}`);
    }
  }
  return issues;
}

const STRUCTURAL_BAND_SKILLS = new Set(["ALG_EQUALITY", "ALG_VARIABLE", "ALG_SUBSTITUTE", "EQ_ADD", "EQ_MUL"]);

export function structuralBandProgressionIssues(definitions: readonly SkillQuestionDefinition[]): string[] {
  const issues: string[] = [];
  const declaredFamilies = new Map<string, GeneratedQuestionDefinition[]>();
  for (const definition of definitions) {
    if (!isGeneratedQuestionDefinition(definition) || definition.metadata?.difficultyFeature !== "structure" || !definition.contentFamily) continue;
    const key = `${definition.skillId}|${definition.contentFamily}`;
    declaredFamilies.set(key, [...(declaredFamilies.get(key) ?? []), definition]);
  }
  for (const [key, family] of declaredFamilies) {
    if (family.length < 2) continue;
    const stages = family.map((definition) => definition.metadata?.structuralStage);
    if (stages.some((stage) => typeof stage !== "string") || new Set(stages).size !== family.length) issues.push(`${key}: structural Bands must declare distinct structuralStage values`);
  }
  for (const skillId of STRUCTURAL_BAND_SKILLS) {
    const family = definitions.filter((definition): definition is GeneratedQuestionDefinition & { skillId: string } =>
      isGeneratedQuestionDefinition(definition) && definition.skillId === skillId && !!definition.choiceBuilder,
    );
    const bands = new Set(family.map((definition) => definition.difficultyBand));
    for (const band of ["A", "B", "C"]) if (!bands.has(band as GeneratedQuestionDefinition["difficultyBand"])) issues.push(`${skillId}: missing structural Band ${band}`);
    if (family.some((definition) => definition.metadata?.difficultyFeature !== "structure")) issues.push(`${skillId}: structural Bands must declare difficultyFeature=structure`);
    const contentFamilies = family.map((definition) => definition.contentFamily);
    if (new Set(contentFamilies).size !== 1) issues.push(`${skillId}: structural Bands must share one pedagogical content family`);
    const stages = family.map((definition) => definition.metadata?.structuralStage);
    if (stages.some((stage) => typeof stage !== "string") || new Set(stages).size !== family.length) issues.push(`${skillId}: every structural Band must declare a distinct structuralStage`);
    if ((skillId === "EQ_ADD" || skillId === "EQ_MUL") && family.some((definition) => Object.values(definition.params).some((spec) => spec.type !== "rational" && spec.min < 1))) {
      issues.push(`${skillId}: equation Bands must not introduce signed-number arithmetic`);
    }
    if (["ALG_EQUALITY", "ALG_SUBSTITUTE", "EQ_ADD", "EQ_MUL"].includes(skillId)) {
      const ordered = [...family].sort((left, right) => BAND_ORDER.indexOf(left.difficultyBand ?? "") - BAND_ORDER.indexOf(right.difficultyBand ?? ""));
      const symbolCounts = ordered.map((definition) => definition.studentFacingSymbols?.length ?? 0);
      if (symbolCounts.some((count, index) => index > 0 && count <= symbolCounts[index - 1]!)) issues.push(`${skillId}: symbolic abstraction must increase strictly across Bands`);
    }
  }
  return issues;
}

export function validateFoundationalContent(samplesPerGenerator = 100): ContentValidationReport {
  const issues: string[] = [];
  const warnings: string[] = [];
  let generatedSamples = 0;
  const ids = new Set<string>();
  const correctPositions = new Map<number, number>();
  const fixedSurfaceKeys = new Set<string>();
  const normalizedFamilies = new Map<string, { skillId: string; family: string; ids: string[] }>();
  issues.push(...magnitudeBandProgressionIssues(FOUNDATIONAL_QUESTIONS));
  issues.push(...structuralBandProgressionIssues(FOUNDATIONAL_QUESTIONS));
  issues.push(...curatedNumericLiteralIssues(FOUNDATIONAL_QUESTIONS));
  issues.push(...atomicSkillIdentityIssues(FOUNDATIONAL_QUESTIONS));
  issues.push(...signedSkillDefinitionIssues(FOUNDATIONAL_QUESTIONS));
  issues.push(...signedMultiplicationLoadIssues(FOUNDATIONAL_QUESTIONS));
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
      if (!definition.metadata?.difficultyFeature) issues.push(`${definition.id}: difficultyFeature is missing`);
      if (!definition.choiceBuilder && !definition.answerSemantics) issues.push(`${definition.id}: answer semantics are implicit`);
      issues.push(...symbolicAuthoringIssues(definition));
      const rendered = new Set<string>();
      for (let seed = 1; seed <= samplesPerGenerator; seed += 1) {
        try {
          const question = buildGeneratedQuestion(definition, { seed, maxAttempts: 100 });
          const repeat = buildGeneratedQuestion(definition, { seed, maxAttempts: 100 });
          issues.push(...generatedInstanceMetadataIssues(definition, question));
          issues.push(...signedGeneratedInstanceIssues(definition, question));
          issues.push(...studentFacingNotationIssues(definition.id, question, seed));
          issues.push(...studentMathContentIssues(definition.id, question, `seed ${seed}`));
          warnings.push(...studentMathContentWarnings(definition.id, question, `seed ${seed}`));
          issues.push(...pedagogicalTargetingIssues(definition, question, seed));
          issues.push(...mathematicallyDuplicateChoiceIssues(definition.id, question, seed));
          if (question.id !== repeat.id || question.renderedExpression !== repeat.renderedExpression) issues.push(`${definition.id}: seed ${seed} is not reproducible`);
          if (question.renderedExpression.includes("undefined") || optionText(question.prompt).includes("undefined")) issues.push(`${definition.id}: seed ${seed} rendered undefined content`);
          if (question.type === "numeric") {
            const expected = evaluateExpression(question.renderedExpression);
            const actual = evaluateExpression(question.correctAnswers[0]);
            if (rationalKey(expected) !== rationalKey(actual)) issues.push(`${definition.id}: seed ${seed} answer does not match expression`);
          } else {
            const optionValues = question.options.map((option) => optionText(option.content));
            const correctIds = question.type === "singleChoice" ? [question.correctOptionId] : question.correctOptionIds;
            if (new Set(optionValues).size !== optionValues.length) issues.push(`${definition.id}: seed ${seed} has duplicate options`);
            if (correctIds.length === 0 || correctIds.some((id) => !question.options.some((option) => option.id === id))) issues.push(`${definition.id}: seed ${seed} has invalid correct options`);
            for (const option of question.options) {
              if (correctIds.includes(option.id) && option.misconceptionId) issues.push(`${definition.id}: seed ${seed} correct option has misconception metadata`);
              if (!correctIds.includes(option.id) && (!option.misconceptionId || !option.misconceptionRationale)) issues.push(`${definition.id}: seed ${seed} distractor metadata is incomplete`);
            }
          }
          if (!difficultyMatchesBand(definition.difficultyBand, question.difficulty)) issues.push(`${definition.id}: seed ${seed} difficulty is outside band ${definition.difficultyBand}`);
          rendered.add(question.renderedExpression);
          generatedSamples += 1;
        } catch { issues.push(`${definition.id}: rejected seed ${seed}`); break; }
      }
      const requiredVariety = definition.studentFacingSymbols?.length ? 1 : Math.min(3, samplesPerGenerator);
      if (rendered.size < requiredVariety) issues.push(`${definition.id}: insufficient generated variety`);
      try {
        const history = createRecentHistory();
        const first = buildGeneratedQuestion(definition, { seed: 1, maxAttempts: 100 });
        recordGeneratedQuestionHistory(history, first);
        const next = buildGeneratedQuestion(definition, { seed: 1, recentHistory: history, maxAttempts: 100 });
        if (next.renderedExpression === first.renderedExpression) issues.push(`${definition.id}: anti-repetition repeated the recent expression`);
      } catch { issues.push(`${definition.id}: anti-repetition could not produce a follow-up item`); }
    } else if (definition.type === "singleChoice") {
      issues.push(...studentMathContentIssues(definition.id, definition));
      warnings.push(...studentMathContentWarnings(definition.id, definition));
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
      issues.push(...studentMathContentIssues(definition.id, definition));
      warnings.push(...studentMathContentWarnings(definition.id, definition));
      if (definition.authoringMode !== "curated" || !definition.curationReason) issues.push(`${definition.id}: fixed numeric item requires an explicit curation reason`);
      const surfaceKey = `${definition.skillId}|${optionText(definition.prompt)}|${definition.correctAnswers.join("|")}`;
      if (fixedSurfaceKeys.has(surfaceKey)) issues.push(`${definition.id}: duplicate fixed-question surface`);
      fixedSurfaceKeys.add(surfaceKey);
      const normalizedKey = `${definition.skillId}|${definition.contentFamily}|${normalizedNumericSurface(definition.prompt)}`;
      const existing = normalizedFamilies.get(normalizedKey);
      normalizedFamilies.set(normalizedKey, { skillId: definition.skillId ?? "missing-skill", family: definition.contentFamily ?? "missing-family", ids: [...(existing?.ids ?? []), definition.id] });
    } else if (definition.type === "multiChoice") {
      issues.push(...studentMathContentIssues(definition.id, definition));
      warnings.push(...studentMathContentWarnings(definition.id, definition));
      if (definition.authoringMode !== "curated" || !definition.curationReason) issues.push(`${definition.id}: curated authoring intent is incomplete`);
      if (!definition.correctOptionIds.length || definition.correctOptionIds.some((id) => !definition.options.some((option) => option.id === id))) issues.push(`${definition.id}: invalid correct options`);
    }
  }
  const positionCounts = [...correctPositions.values()];
  const fixedChoiceCount = positionCounts.reduce((sum, count) => sum + count, 0);
  if (fixedChoiceCount >= 4 && (positionCounts.length < 4 || Math.max(...positionCounts) - Math.min(...positionCounts) > 2)) issues.push("fixed bank correct-answer positions are unbalanced");
  for (const group of normalizedFamilies.values()) if (group.ids.length >= 4) warnings.push(`${group.skillId}/${group.family}: near-identical curated family (${group.ids.length} items: ${group.ids.slice(0, 3).join(", ")}...)`);
  return { issues, warnings, skills: SKILLS.length, definitions: FOUNDATIONAL_QUESTIONS.length, generatedSamples, audit: auditFoundationalContent() };
}
