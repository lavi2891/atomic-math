import type { DifficultyBand } from "../../content/catalog/types.ts";
import { isGeneratedQuestionDefinition } from "../../domain/questions/definitions.ts";
import type { GeneratedQuestionDefinition, ParamSpec } from "../../domain/questions/generator/types.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import type { Question } from "../../domain/questions/types.ts";

export interface VariableSummary {
  name: string;
  typeLabel: string;
  valuesLabel: string;
}

export interface ConstraintSummary {
  humanReadable: string[];
  technicalOnly: string[];
}

export interface BandSummary {
  band: DifficultyBand;
  variables: VariableSummary[];
  constraints: ConstraintSummary;
  changesFromPrevious: string[];
}

export interface FamilyAuthoringNote {
  rationaleHe?: string;
  difficultyNoteHe?: string;
}

export const FAMILY_AUTHORING_NOTES: Readonly<Record<string, FamilyAuthoringNote>> = {
  "INT_ADD:signed-sum": {
    rationaleHe: "תרגול חיבור מספרים מכוונים תוך הבחנה בין סימן המספר לבין גודלו.",
    difficultyNoteHe: "הקושי עולה באמצעות טווח מספרים רחב יותר, לצד שמירה על אותו מבנה חיבור בסיסי.",
  },
  "INT_ADD:negated-first-addend": {
    rationaleHe: "תרגול פירוש נכון של סימן שלילה לפני האיבר הראשון בתוך פעולת חיבור.",
  },
};

export function parameterTypeLabel(spec: ParamSpec): string {
  if (spec.type === "integer") return "מספר שלם";
  if (spec.type === "natural") return "מספר טבעי / מספר שלם חיובי";
  if (spec.type === "decimal") return "מספר עשרוני";
  return "מספר רציונלי";
}

function allowedIntegerValues(spec: Extract<ParamSpec, { type: "integer" | "natural" }>): number[] {
  const first = spec.type === "natural" ? Math.max(1, spec.min) : spec.min;
  const excluded = new Set(spec.exclude ?? []);
  return Array.from({ length: Math.max(0, spec.max - first + 1) }, (_, index) => first + index).filter((value) => !excluded.has(value));
}

function signLabels(min: number, max: number, excluded: readonly number[] = []): string[] {
  if (min > 0) return ["חיובי"];
  if (max < 0) return ["שלילי"];
  if (min <= 0 && max >= 0 && excluded.includes(0)) return ["שונה מאפס"];
  return [];
}

export function describeParameter(name: string, spec: ParamSpec): VariableSummary {
  const typeLabel = parameterTypeLabel(spec);
  if (spec.type === "integer" || spec.type === "natural") {
    const min = spec.type === "natural" ? Math.max(1, spec.min) : spec.min;
    const allowed = allowedIntegerValues(spec);
    const sparse = !!spec.exclude?.length && allowed.length <= 12;
    const range = sparse ? `אחד מהערכים: ${allowed.join(", ")}` : `בין ${min} ל־${spec.max}`;
    const signs = signLabels(min, spec.max, spec.exclude);
    const exclusions = !sparse && spec.exclude?.length ? `למעט ${spec.exclude.join(", ")}` : "";
    return { name, typeLabel, valuesLabel: [typeLabel, range, ...signs, exclusions].filter(Boolean).join(" · ") };
  }
  if (spec.type === "decimal") {
    const signs = signLabels(spec.min, spec.max, spec.exclude);
    return { name, typeLabel, valuesLabel: [typeLabel, `בין ${spec.min} ל־${spec.max}`, `בקפיצות של ${spec.step}`, ...signs, spec.exclude?.length ? `למעט ${spec.exclude.join(", ")}` : ""].filter(Boolean).join(" · ") };
  }
  if ("numerator" in spec) {
    const numeratorType = spec.numerator.type === "natural" ? "טבעי" : "שלם";
    const zero = spec.excludeZero ? " · שונה מאפס" : "";
    return { name, typeLabel, valuesLabel: `${typeLabel} · מונה ${numeratorType} בין ${spec.numerator.min} ל־${spec.numerator.max} · מכנה בין ${spec.denominator.min} ל־${spec.denominator.max}${zero}` };
  }
  return { name, typeLabel, valuesLabel: typeLabel };
}

const SIMPLE_CONSTRAINT = /^([A-Za-z_]\w*)\s*(===|!==|==|!=|>=|<=|>|<)\s*(-?\d+(?:\.\d+)?|[A-Za-z_]\w*)$/;

export function translateSimpleConstraint(constraint: string): string | null {
  const match = SIMPLE_CONSTRAINT.exec(constraint.trim());
  if (!match) return null;
  const [, left, operator, right] = match;
  if (!left || !operator || !right) return null;
  if ((operator === "!=" || operator === "!==") && right === "0") return `${left} שונה מאפס`;
  if (operator === ">" && right === "0") return `${left} חיובי`;
  if (operator === "<" && right === "0") return `${left} שלילי`;
  const relation = operator === ">" ? "גדול מ־" : operator === ">=" ? "גדול או שווה ל־" : operator === "<" ? "קטן מ־" : operator === "<=" ? "קטן או שווה ל־" : operator === "==" || operator === "===" ? "שווה ל־" : "שונה מ־";
  return `${left} ${relation}${right}`;
}

export function summarizeConstraints(constraints: readonly string[] = []): ConstraintSummary {
  const humanReadable: string[] = [];
  const technicalOnly: string[] = [];
  for (const constraint of constraints) {
    const translated = translateSimpleConstraint(constraint);
    if (translated) humanReadable.push(translated);
    else technicalOnly.push(constraint);
  }
  return { humanReadable, technicalOnly };
}

export function answerSemanticsLabel(question: Question): string {
  if (question.type === "singleChoice") return "בחירה יחידה";
  if (question.type === "multiChoice") return "בחירה מרובה";
  if (question.answerSemantics?.kind === "rounded") return `מספר עשרוני מעוגל ל־${question.answerSemantics.decimalPlaces} ספרות אחרי הנקודה`;
  if (question.answerSemantics?.kind === "exactDecimal") return "מספר עשרוני מדויק";
  const answer = question.correctAnswers[0] ?? "";
  if (answer.includes("/")) return "מספר רציונלי מדויק";
  if (answer.includes(".")) return "מספר עשרוני מדויק";
  return "מספר שלם מדויק";
}

export function generatorVariables(definition: GeneratedQuestionDefinition): VariableSummary[] {
  return Object.entries(definition.params).map(([name, spec]) => describeParameter(name, spec));
}

function bandRank(band: DifficultyBand): number { return ["A", "B", "C", "D"].indexOf(band); }

export function deriveBandSummaries(definitions: readonly SkillQuestionDefinition[], current: SkillQuestionDefinition): BandSummary[] {
  if (!isGeneratedQuestionDefinition(current) || !current.contentFamily) return [];
  const family = definitions
    .filter((item): item is GeneratedQuestionDefinition & { skillId: string; difficultyBand: DifficultyBand } => isGeneratedQuestionDefinition(item) && item.skillId === current.skillId && item.contentFamily === current.contentFamily && !!item.difficultyBand)
    .sort((left, right) => bandRank(left.difficultyBand) - bandRank(right.difficultyBand));
  let previous: VariableSummary[] | null = null;
  return family.map((definition) => {
    const variables = generatorVariables(definition);
    const changesFromPrevious = previous === null ? [] : variables.flatMap((variable) => {
      const earlier = previous?.find((item) => item.name === variable.name);
      return earlier?.valuesLabel === variable.valuesLabel ? [] : [`${variable.name}: ${earlier?.valuesLabel ?? "לא הוגדר"} ← ${variable.valuesLabel}`];
    });
    previous = variables;
    return { band: definition.difficultyBand, variables, constraints: summarizeConstraints(definition.constraints), changesFromPrevious };
  });
}

export function familyAuthoringNote(contentFamily: string | undefined, notes: Readonly<Record<string, FamilyAuthoringNote>> = FAMILY_AUTHORING_NOTES): FamilyAuthoringNote | null {
  return contentFamily ? notes[contentFamily] ?? null : null;
}

export function hasGeneratorExplanation(definition: SkillQuestionDefinition): boolean {
  return isGeneratedQuestionDefinition(definition);
}
