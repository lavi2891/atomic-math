import type { DifficultyBand, SkillId } from "../../content/catalog/types.ts";
import { isGeneratedQuestionDefinition } from "../../domain/questions/definitions.ts";
import type { GeneratedQuestionDefinition, ParamSpec } from "../../domain/questions/generator/types.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import { isGeneratedQuestionInstance, type Question } from "../../domain/questions/types.ts";
import { formatStudentMathExpression } from "../../domain/questions/generator/renderTemplate.ts";

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
  template: string;
  templateChangedFromPrevious: boolean;
  variables: VariableSummary[];
  constraints: ConstraintSummary;
  studentFacingSymbols: string[];
  supportingSkills: SkillId[];
  symbolicConditions: ConstraintSummary;
  changesFromPrevious: string[];
}

export interface GeneratorStructureSummary {
  /** The executable expression source, before parameter substitution. */
  template: string;
  /** The expression produced for the currently selected seed. */
  instantiated: string;
  structuralLabel: string | null;
  constraints: ConstraintSummary;
  sampledValues: Array<{ name: string; value: string }>;
  studentFacingSymbols: string[];
  supportingSkills: SkillId[];
  symbolicConditions: ConstraintSummary;
  transformationNotes: string[];
  instanceMatchesDefinition: boolean;
  signPattern: string | null;
  signPatternLabel: string | null;
  skillInvariant: string | null;
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

const STRUCTURE_LABELS: Readonly<Record<string, string>> = {
  "two-addend-sum": "סכום של שני מחוברים משתנים",
  "related-three-addend-sum": "שלושה מחוברים — שני משתנים וקבוע 1",
  "nonnegative-difference": "הפרש שאינו שלילי",
  "adjusted-minuend-difference": "הפרש עם הגדלת המחוסר בקבוע 1",
  "fact-family-product": "מכפלה ממשפחת עובדות",
  "commuted-product": "מכפלה בחילוף סדר הגורמים",
  "exact-fact-family-quotient": "מנה מדויקת ממשפחת עובדות",
  "grouping-preserving-quotient": "מנה מדויקת עם קיבוץ מפורש",
  "multiple-as-product": "כפולה המיוצגת כמכפלה",
  "next-multiple-as-product": "הכפולה הבאה באמצעות הגדלת גורם ב־1",
  "multiplication-before-leading-addition": "חיבור וכפל — הכפל קודם",
  "multiplication-before-trailing-addition": "כפל וחיבור — הכפל קודם",
  "signed-sum": "חיבור מספרים מכוונים",
  "negated-first-addend": "חיבור עם שלילת המחובר הראשון",
  "signed-difference": "חיסור מספרים מכוונים",
  "negative-minuend-difference": "חיסור עם מחוסר שלילי",
  "signed-product": "כפל מספרים מכוונים",
  "negated-first-factor": "כפל עם שלילת הגורם הראשון",
  "exact-signed-quotient": "מנה מדויקת של מספרים מכוונים",
  "negated-dividend-quotient": "מנה מדויקת עם שלילת המחולק",
  "linear-substitution": "הצבה בביטוי ליניארי",
  "quadratic-substitution": "הצבה בביטוי ריבועי",
  "inverse-addition-equation": "מציאת נעלם באמצעות פעולה הפוכה לחיבור",
  "direct-addition-equation": "מציאת נעלם במשוואת חיבור",
  "solve-factor-by-first-quotient": "מציאת גורם באמצעות חילוק בגורם הראשון",
  "solve-factor-by-second-quotient": "מציאת גורם באמצעות חילוק בגורם השני",
  "negative-plus-positive-positive-result": "שלילי ועוד חיובי — הגודל החיובי גדול יותר",
  "negative-plus-positive-negative-result": "שלילי ועוד חיובי — הגודל השלילי גדול יותר",
  "negative-plus-negative": "חיבור שני מספרים שליליים",
  "opposites-result-zero": "חיבור מספרים נגדיים — התוצאה אפס",
  "positive-minus-negative": "מספר חיובי פחות מספר שלילי",
  "negative-minus-positive": "מספר שלילי פחות מספר חיובי",
  "negative-minus-negative": "מספר שלילי פחות מספר שלילי",
  "negative-times-positive": "מספר שלילי כפול מספר חיובי",
  "positive-times-negative": "מספר חיובי כפול מספר שלילי",
  "negative-times-negative": "מספר שלילי כפול מספר שלילי",
  "negative-divided-by-positive": "מספר שלילי חלקי מספר חיובי",
  "positive-divided-by-negative": "מספר חיובי חלקי מספר שלילי",
  "negative-divided-by-negative": "מספר שלילי חלקי מספר שלילי",
  "equality-abstraction": "שוויון — מעבר ממספרים לייצוג סמלי",
  "variable-concepts": "משתנה, מקדם והשפעת ערך המשתנה",
  "substitution-abstraction": "הצבה — מתוצאה מספרית לביטוי סמלי",
  "additive-equation-abstraction": "משוואת חיבור — מנעלם מספרי לפתרון סמלי",
  "multiplicative-inverse-abstraction": "פעולות הפוכות בכפל — ממספרים לזהות סמלית",
};

const SIGN_PATTERN_LABELS: Readonly<Record<string, string>> = {
  "negative+positive; positive magnitude larger": "שלילי + חיובי; הגודל החיובי גדול יותר",
  "negative+positive; negative magnitude larger": "שלילי + חיובי; הגודל השלילי גדול יותר",
  "negative+negative": "שלילי + שלילי",
  "opposites; result zero": "מספרים נגדיים; התוצאה אפס",
  "positive-negative operand": "חיובי פחות שלילי",
  "negative-positive operand": "שלילי פחות חיובי",
  "negative-negative operand": "שלילי פחות שלילי",
  "negative×positive": "שלילי × חיובי",
  "positive×negative": "חיובי × שלילי",
  "negative×negative": "שלילי × שלילי",
  "negative÷positive": "שלילי ÷ חיובי",
  "positive÷negative": "חיובי ÷ שלילי",
  "negative÷negative": "שלילי ÷ שלילי",
};

function structureFeature(definition: GeneratedQuestionDefinition): string | null {
  const feature = definition.metadata?.feature;
  if (typeof feature === "string") return feature;
  const familyFeature = definition.contentFamily?.split(":").at(-1);
  return familyFeature || null;
}

/** Preserve the executable template; only normalize multiplication for clearer KaTeX display. */
export function generatorTemplateLatex(template: string): string {
  return formatStudentMathExpression(template).replaceAll("*", "\\cdot ");
}

export function generatorStructureSummary(
  definition: SkillQuestionDefinition,
  question: Question,
): GeneratorStructureSummary | null {
  if (!isGeneratedQuestionDefinition(definition) || !isGeneratedQuestionInstance(question)) return null;
  const feature = structureFeature(definition);
  const signPattern = typeof definition.metadata?.signPattern === "string" ? definition.metadata.signPattern : null;
  const sampledValues = Object.entries(question.sampledParams).map(([name, value]) => ({ name, value }));
  const transformationNotes = sampledValues.flatMap(({ name, value }) => {
    if (!definition.exprTemplate.includes(`-{${name}}`)) return [];
    const numeric = Number(value);
    return [Number.isFinite(numeric)
      ? `הערך שנדגם עבור ${name} הוא ${value}; התבנית שוללת אותו ולכן ערכו בביטוי הוא ${-numeric}.`
      : `התבנית מפעילה שלילה על הערך שנדגם עבור ${name}.`];
  });
  return {
    template: definition.exprTemplate,
    instantiated: formatStudentMathExpression(question.renderedExpression),
    structuralLabel: feature ? STRUCTURE_LABELS[feature] ?? null : null,
    constraints: summarizeConstraints(definition.constraints),
    sampledValues,
    studentFacingSymbols: definition.studentFacingSymbols ?? [],
    supportingSkills: definition.supportingSkills ?? [],
    symbolicConditions: summarizeConstraints(definition.symbolicConditions),
    transformationNotes,
    instanceMatchesDefinition: question.templateId === definition.id && question.baseId === definition.id,
    signPattern,
    signPatternLabel: signPattern ? SIGN_PATTERN_LABELS[signPattern] ?? STRUCTURE_LABELS[feature ?? ""] ?? signPattern : null,
    skillInvariant: typeof definition.metadata?.skillInvariant === "string" ? definition.metadata.skillInvariant : null,
  };
}

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
const OFFSET_CONSTRAINT = /^([A-Za-z_]\w*)\s*([+-])\s*(\d+(?:\.\d+)?)\s*(>=|<=|>|<|===|==|!==|!=)\s*(-?\d+(?:\.\d+)?|[A-Za-z_]\w*)$/;

function relationLabel(operator: string): string {
  return operator === ">" ? "גדול מ־" : operator === ">=" ? "גדול או שווה ל־" : operator === "<" ? "קטן מ־" : operator === "<=" ? "קטן או שווה ל־" : operator === "==" || operator === "===" ? "שווה ל־" : "שונה מ־";
}

export function translateSimpleConstraint(constraint: string): string | null {
  const offsetMatch = OFFSET_CONSTRAINT.exec(constraint.trim());
  if (offsetMatch) {
    const [, left, sign, offset, operator, right] = offsetMatch;
    if (!left || !sign || !offset || !operator || !right) return null;
    return `${left} ${sign === "+" ? "ועוד" : "פחות"} ${offset} ${relationLabel(operator)}${right}`;
  }
  const match = SIMPLE_CONSTRAINT.exec(constraint.trim());
  if (!match) return null;
  const [, left, operator, right] = match;
  if (!left || !operator || !right) return null;
  if ((operator === "!=" || operator === "!==") && right === "0") return `${left} שונה מאפס`;
  if (operator === ">" && right === "0") return `${left} חיובי`;
  if (operator === "<" && right === "0") return `${left} שלילי`;
  return `${left} ${relationLabel(operator)}${right}`;
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
  let previous: { variables: VariableSummary[]; constraints: ConstraintSummary; template: string; studentFacingSymbols: string[]; supportingSkills: SkillId[]; symbolicConditions: ConstraintSummary } | null = null;
  return family.map((definition) => {
    const variables = generatorVariables(definition);
    const constraints = summarizeConstraints(definition.constraints);
    const studentFacingSymbols = definition.studentFacingSymbols ?? [];
    const supportingSkills = definition.supportingSkills ?? [];
    const symbolicConditions = summarizeConstraints(definition.symbolicConditions);
    const changesFromPrevious = previous === null ? [] : variables.flatMap((variable) => {
      const earlier = previous?.variables.find((item) => item.name === variable.name);
      return earlier?.valuesLabel === variable.valuesLabel ? [] : [`${variable.name}: ${earlier?.valuesLabel ?? "לא הוגדר"} ← ${variable.valuesLabel}`];
    });
    if (previous && JSON.stringify(previous.constraints) !== JSON.stringify(constraints)) {
      const readable = constraints.humanReadable.length ? constraints.humanReadable.join("; ") : "אין תנאים פשוטים ברמה זו";
      changesFromPrevious.push(`תנאים: ${readable}`);
    }
    if (previous && JSON.stringify(previous.studentFacingSymbols) !== JSON.stringify(studentFacingSymbols)) changesFromPrevious.push(`סמלים שנשארים בשאלה: ${studentFacingSymbols.join(", ") || "אין"}`);
    if (previous && JSON.stringify(previous.supportingSkills) !== JSON.stringify(supportingSkills)) changesFromPrevious.push(`Skills תומכים: ${supportingSkills.join(", ") || "אין"}`);
    if (previous && JSON.stringify(previous.symbolicConditions) !== JSON.stringify(symbolicConditions)) changesFromPrevious.push(`תנאים על סמלים: ${symbolicConditions.humanReadable.join("; ") || "אין"}`);
    const templateChangedFromPrevious = previous !== null && previous.template !== definition.exprTemplate;
    previous = { variables, constraints, template: definition.exprTemplate, studentFacingSymbols, supportingSkills, symbolicConditions };
    return { band: definition.difficultyBand, template: definition.exprTemplate, templateChangedFromPrevious, variables, constraints, studentFacingSymbols, supportingSkills, symbolicConditions, changesFromPrevious };
  });
}

export function familyAuthoringNote(contentFamily: string | undefined, notes: Readonly<Record<string, FamilyAuthoringNote>> = FAMILY_AUTHORING_NOTES): FamilyAuthoringNote | null {
  return contentFamily ? notes[contentFamily] ?? null : null;
}

export function hasGeneratorExplanation(definition: SkillQuestionDefinition): boolean {
  return isGeneratedQuestionDefinition(definition);
}
