import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import { ATOMIC_FACT_SKILL_VALUES, SIGNED_SKILL_INVARIANTS } from "./skillScope.ts";
import type { DifficultyBand, SkillId } from "../catalog/types.ts";
import type { GeneratedChoiceDraft, GeneratedQuestionDefinition, ParamsSpec, SampledParams } from "../../domain/questions/generator/types.ts";
import type { QuestionCategory } from "../../domain/questions/categories.ts";
import type { ChoiceOption, OptionContent, QuestionCurationReason } from "../../domain/questions/types.ts";
import { authoredChoiceContent, authoredStudentContent } from "./studentMathContent.ts";

type GeneratorRecipe = { skillId: string; expr: string; secondExpr: string; structures: [string, string]; min: number; max: number; factValues?: readonly number[]; constraints?: [string[], string[]] };

const factFamilies: Readonly<Record<string, readonly number[]>> = ATOMIC_FACT_SKILL_VALUES;

const recipes: GeneratorRecipe[] = [
  { skillId: "AR_ADD_FACTS", expr: "{a}+{b}", secondExpr: "{a}+{b}+1", structures: ["two-addend-sum", "related-three-addend-sum"], min: 0, max: 20 },
  { skillId: "AR_SUB_FACTS", expr: "{a}-{b}", secondExpr: "{a}+1-{b}", structures: ["nonnegative-difference", "adjusted-minuend-difference"], min: 0, max: 20, constraints: [["a >= b"], ["a + 1 >= b"]] },
  ...Object.entries(factFamilies).map(([skillId, factValues]) => ({ skillId, expr: skillId.includes("_MUL_") ? "{a}*{b}" : "{a}*{b}/{a}", secondExpr: skillId.includes("_MUL_") ? "{b}*{a}" : "({a}*{b})/{a}", structures: skillId.includes("_MUL_") ? ["fact-family-product", "commuted-product"] : ["exact-fact-family-quotient", "grouping-preserving-quotient"], min: Math.min(...factValues), max: Math.max(...factValues), factValues } as GeneratorRecipe)),
  { skillId: "AR_FACTORS_MULTIPLES", expr: "{a}*{b}", secondExpr: "{a}*({b}+1)", structures: ["multiple-as-product", "next-multiple-as-product"], min: 2, max: 12 },
  { skillId: "OPS_ORDER_BASIC", expr: "{a}+{b}*{c}", secondExpr: "{a}*{c}+{b}", structures: ["multiplication-before-leading-addition", "multiplication-before-trailing-addition"], min: 1, max: 12 },
];

function generator(recipe: GeneratorRecipe, band: DifficultyBand, alternate: boolean): GeneratedQuestionDefinition & { skillId: string } {
  const scale = band === "A" ? 1 : band === "B" ? 2 : band === "C" ? 4 : 6;
  const factFamily = recipe.skillId.startsWith("AR_MUL_F_") || recipe.skillId.startsWith("AR_DIV_F_");
  const reviewedBasicFacts = recipe.skillId === "AR_ADD_FACTS" || recipe.skillId === "AR_SUB_FACTS";
  const orderOfOperations = recipe.skillId === "OPS_ORDER_BASIC";
  const factorsAndMultiples = recipe.skillId === "AR_FACTORS_MULTIPLES";
  const expr = alternate ? recipe.secondExpr : recipe.expr;
  const structure = recipe.structures[alternate ? 1 : 0];
  const constraints = recipe.constraints?.[alternate ? 1 : 0];
  const factBandRange = band === "A" ? { min: 1, max: 5 } : { min: 6, max: 10 };
  const multipleBandRange = band === "A" ? { min: 2, max: 5 } : band === "B" ? { min: 6, max: 10 } : { min: 11, max: 16 };
  const omittedFactValues = Array.from(
    { length: recipe.max - recipe.min + 1 },
    (_, index) => recipe.min + index,
  ).filter((value) => factFamily && !recipe.factValues?.includes(value));
  return {
    id: `MVP_${recipe.skillId}_${band}_${alternate ? "B" : "A"}`,
    topicId: "FOUNDATIONS", skillId: recipe.skillId, kind: "generated", authoringMode: "generated", contentFamily: `${recipe.skillId}:${structure}`, category: "calculation", difficultyBand: band,
    exprTemplate: expr,
    promptTemplate: factorsAndMultiples
      ? alternate
        ? [{ kind: "text", value: "נתונה הכפולה " }, { kind: "math", latex: "{a}\\times {b}" }, { kind: "text", value: " של " }, { kind: "math", latex: "{a}" }, { kind: "text", value: ". מצאו את הכפולה הבאה." }]
        : [{ kind: "text", value: "מהי הכפולה של " }, { kind: "math", latex: "{a}" }, { kind: "text", value: " שמתקבלת כאשר כופלים ב־" }, { kind: "math", latex: "{b}" }, { kind: "text", value: "?" }]
      : [{ kind: "text", value: "חשבו:" }, { kind: "math", latex: expr, display: true }],
    params: {
      a: { type: "integer", min: factFamily ? recipe.min : factorsAndMultiples ? multipleBandRange.min : reviewedBasicFacts && band === "B" ? 10 : recipe.min * scale, max: factFamily ? recipe.max : factorsAndMultiples ? multipleBandRange.max : reviewedBasicFacts ? (band === "A" ? 10 : recipe.max) : recipe.max * scale, exclude: factFamily ? omittedFactValues : undefined },
      ...(orderOfOperations ? { c: { type: "natural" as const, min: 2, max: 5 } } : {}),
      b: { type: "natural", min: factorsAndMultiples ? multipleBandRange.min : orderOfOperations ? 1 : factFamily ? factBandRange.min : reviewedBasicFacts && band === "B" ? 10 : band === "A" ? 1 : 4, max: factorsAndMultiples ? multipleBandRange.max : factFamily ? factBandRange.max : orderOfOperations ? 3 : reviewedBasicFacts && band === "A" ? 10 : Math.max(2, recipe.max) },
    },
    constraints,
    acceptedInputFormats: ["integer"], answerSemantics: { kind: "exact" }, structureKey: `${recipe.skillId}:${band}:${structure}`, variantGroup: recipe.skillId,
    difficultyModel: () => ({ A: 0.12, B: 0.38, C: 0.65, D: 0.9 })[band], metadata: { source: "foundational-mvp", band, feature: structure, difficultyFeature: reviewedBasicFacts || factFamily || factorsAndMultiples ? "magnitude" : "mixed" }, tags: ["mvp", "short-item", ...(factorsAndMultiples ? ["requires-rereview"] : []), `band:${band}`], version: factorsAndMultiples ? 4 : 1,
  };
}

const GENERATED = recipes.flatMap((recipe) => {
  const factLike = recipe.skillId.includes("_FACTS") || recipe.skillId.includes("_F_");
  const bands: DifficultyBand[] = factLike ? ["A", "B"] : ["A", "B", "C"];
  return bands.flatMap((band) => [generator(recipe, band, false), generator(recipe, band, true)]);
});

const SIGNED_BANDS: DifficultyBand[] = ["A", "B", "C"];
const signedBandRange = (band: DifficultyBand) => band === "A" ? { min: 1, max: 10 } : band === "B" ? { min: 11, max: 30 } : { min: 31, max: 100 };

type SignedOperationSkillId = "INT_ADD" | "INT_SUB" | "INT_MUL" | "INT_DIV";
type SignedCalculationFamily = {
  skillId: SignedOperationSkillId;
  idPart: string;
  family: string;
  signPattern: string;
  exprTemplate: string;
  constraints?: string[];
};

const SIGNED_CALCULATION_FAMILIES: readonly SignedCalculationFamily[] = [
  { skillId: "INT_ADD", idPart: "NEG_POS_POSITIVE", family: "negative-plus-positive-positive-result", signPattern: "negative+positive; positive magnitude larger", exprTemplate: "(-{m})+{n}", constraints: ["n > m"] },
  { skillId: "INT_ADD", idPart: "NEG_POS_NEGATIVE", family: "negative-plus-positive-negative-result", signPattern: "negative+positive; negative magnitude larger", exprTemplate: "(-{m})+{n}", constraints: ["m > n"] },
  { skillId: "INT_ADD", idPart: "NEG_NEG", family: "negative-plus-negative", signPattern: "negative+negative", exprTemplate: "(-{m})+(-{n})" },
  { skillId: "INT_SUB", idPart: "POS_MINUS_NEG", family: "positive-minus-negative", signPattern: "positive-negative operand", exprTemplate: "{m}-(-{n})" },
  { skillId: "INT_SUB", idPart: "POS_MINUS_LARGER_POS", family: "positive-minus-larger-positive", signPattern: "positive-positive operand; negative result", exprTemplate: "{m}-{n}", constraints: ["n > m"] },
  { skillId: "INT_SUB", idPart: "NEG_MINUS_POS", family: "negative-minus-positive", signPattern: "negative-positive operand", exprTemplate: "(-{m})-{n}" },
  { skillId: "INT_SUB", idPart: "NEG_MINUS_NEG", family: "negative-minus-negative", signPattern: "negative-negative operand", exprTemplate: "(-{m})-(-{n})", constraints: ["m != n"] },
  { skillId: "INT_MUL", idPart: "NEG_POS", family: "negative-times-positive", signPattern: "negative×positive", exprTemplate: "(-{m})*{n}" },
  { skillId: "INT_MUL", idPart: "POS_NEG", family: "positive-times-negative", signPattern: "positive×negative", exprTemplate: "{m}*(-{n})" },
  { skillId: "INT_MUL", idPart: "NEG_NEG", family: "negative-times-negative", signPattern: "negative×negative", exprTemplate: "(-{m})*(-{n})" },
  { skillId: "INT_DIV", idPart: "NEG_POS", family: "negative-divided-by-positive", signPattern: "negative÷positive", exprTemplate: "(-({m}*{n}))/{m}" },
  { skillId: "INT_DIV", idPart: "POS_NEG", family: "positive-divided-by-negative", signPattern: "positive÷negative", exprTemplate: "({m}*{n})/(-{m})" },
  { skillId: "INT_DIV", idPart: "NEG_NEG", family: "negative-divided-by-negative", signPattern: "negative÷negative", exprTemplate: "(-({m}*{n}))/(-{m})" },
];

const SIGNED_CALCULATION_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = SIGNED_CALCULATION_FAMILIES.flatMap((family) => {
  const bands = family.skillId === "INT_MUL" ? (["A", "B"] as DifficultyBand[]) : family.skillId === "INT_DIV" ? (["A"] as DifficultyBand[]) : SIGNED_BANDS;
  return bands.map((band) => {
  const range = signedBandRange(band);
  const isMentalStrategyMultiplication = family.skillId === "INT_MUL" && band === "B";
  const mentalStrategyFactors = [10, 11, 20, 30];
  const omittedMentalStrategyFactors = Array.from({ length: 21 }, (_, index) => index + 10).filter((value) => !mentalStrategyFactors.includes(value));
  return {
    id: `MVP_${family.skillId}_${family.idPart}_${band}`,
    topicId: "FOUNDATIONS",
    skillId: family.skillId,
    kind: "generated",
    authoringMode: "generated",
    contentFamily: `${family.skillId}:${family.family}`,
    category: "calculation",
    difficultyBand: band,
    exprTemplate: family.exprTemplate,
    promptTemplate: [{ kind: "text", value: "חשבו:" }, { kind: "math", latex: family.exprTemplate, display: true }],
    params: isMentalStrategyMultiplication
      ? { m: { type: "natural", min: 10, max: 30, exclude: omittedMentalStrategyFactors }, n: { type: "natural", min: 2, max: 10 } }
      : { m: { type: "natural", ...range }, n: { type: "natural", ...range } },
    constraints: family.constraints,
    acceptedInputFormats: ["integer"],
    answerSemantics: { kind: "exact" },
    structureKey: `${family.skillId}:${band}:${family.family}`,
    variantGroup: `${family.skillId}:${family.family}`,
    difficultyModel: () => ({ A: 0.12, B: 0.38, C: 0.65, D: 0.9 })[band],
    metadata: { source: "signed-semantics-pass", band, feature: family.family, difficultyFeature: isMentalStrategyMultiplication ? "structure" : "magnitude", structuralStage: isMentalStrategyMultiplication ? "special-mental-factor" : undefined, skillInvariant: SIGNED_SKILL_INVARIANTS[family.skillId], signPattern: family.signPattern },
    tags: ["mvp", "signed-structure", "requires-rereview", `band:${band}`],
    version: isMentalStrategyMultiplication ? 4 : 3,
  };
  });
});

function sampledInteger(params: SampledParams, name: string): number {
  const sampled = params[name];
  if (!sampled || sampled.value.den !== 1n) throw new Error(`Expected integer parameter ${name}`);
  return Number(sampled.value.num);
}

function sampledWording(params: SampledParams, variants: readonly string[]): string {
  return variants[sampledInteger(params, "wordingVariant") % variants.length]!;
}

type ChoiceSpec = { value: string; correct?: boolean; misconception: string };

function generatedChoiceDraft(skillId: string, prompt: string | OptionContent[], specs: ChoiceSpec[], rotationKey: number, multi = false): GeneratedChoiceDraft {
  const offset = Math.abs(rotationKey) % specs.length;
  const arranged = [...specs.slice(offset), ...specs.slice(0, offset)];
  const options: ChoiceOption[] = arranged.map((spec, index) => {
    const misconceptionId = spec.correct ? undefined : `${skillId}:${spec.misconception}`;
    return {
      id: `o${index}`,
      content: authoredChoiceContent(spec.value),
      misconceptionId,
      misconceptionRationale: misconceptionId ? misconceptionRationale(misconceptionId) : undefined,
    };
  });
  const correctIds = arranged.flatMap((spec, index) => spec.correct ? [`o${index}`] : []);
  const promptContent = typeof prompt === "string" ? authoredStudentContent(prompt) : prompt;
  if (multi) return { type: "multiChoice", prompt: promptContent, options, correctOptionIds: correctIds };
  if (correctIds.length !== 1) throw new Error("Generated single-choice question requires exactly one correct option");
  return { type: "singleChoice", prompt: promptContent, options, correctOptionId: correctIds[0]! };
}

function conceptualGenerator(input: {
  id: string;
  skillId: string;
  family: string;
  category: QuestionCategory;
  band: DifficultyBand;
  exprTemplate: string;
  params: ParamsSpec;
  constraints?: string[];
  choiceBuilder: (params: SampledParams) => GeneratedChoiceDraft;
  generatedType?: "singleChoice" | "multiChoice";
  difficultyFeature?: "magnitude" | "structure";
  structuralStage?: string;
  studentFacingSymbols?: string[];
  symbolicConditions?: string[];
  supportingSkills?: SkillId[];
  representationKind?: "context-to-expression" | "number-line-to-number" | "number-line-to-fraction" | "expanded-to-standard-form" | "equivalent-symbolic-form" | "substitution-to-expression";
  skillInvariant?: string;
  signPattern?: string;
  version?: number;
}): GeneratedQuestionDefinition & { skillId: string } {
  return {
    id: input.id,
    topicId: "FOUNDATIONS",
    skillId: input.skillId,
    kind: "generated",
    authoringMode: "generated",
    contentFamily: `${input.skillId}:${input.family}`,
    category: input.category,
    difficultyBand: input.band,
    exprTemplate: input.exprTemplate,
    promptTemplate: [{ kind: "text", value: "הנוסח נבנה מהפרמטרים המוגרלים." }],
    params: input.params,
    constraints: input.constraints,
    studentFacingSymbols: input.studentFacingSymbols,
    symbolicConditions: input.symbolicConditions,
    supportingSkills: input.supportingSkills,
    choiceBuilder: input.choiceBuilder,
    generatedType: input.generatedType ?? "singleChoice",
    structureKey: `${input.skillId}:${input.band}:${input.family}`,
    variantGroup: `${input.skillId}:${input.family}`,
    difficultyModel: () => ({ A: 0.12, B: 0.38, C: 0.65, D: 0.9 })[input.band],
    metadata: { source: "human-review-pass-2", band: input.band, feature: input.family, difficultyFeature: input.difficultyFeature ?? "structure", structuralStage: input.structuralStage, representationKind: input.representationKind, skillInvariant: input.skillInvariant ?? SIGNED_SKILL_INVARIANTS[input.skillId], signPattern: input.signPattern ?? (SIGNED_SKILL_INVARIANTS[input.skillId] ? input.family : undefined) },
    tags: ["mvp", "generated-concept", "requires-rereview", `band:${input.band}`],
    // The 2026-09-04 pedagogical audit replaced fallback misconception metadata
    // across every generated choice family. Floor at v5 so prior family approvals
    // cannot silently carry over to the newly diagnostic distractors.
    version: Math.max(input.version ?? 3, 5),
  };
}

function distinctIncorrectNumbers(correct: number, candidates: readonly number[]): number[] {
  const values = candidates.filter((candidate, index, all) => Number.isInteger(candidate) && candidate >= 0 && candidate !== correct && all.indexOf(candidate) === index);
  for (let delta = 1; values.length < 3; delta += 1) {
    for (const candidate of [correct + delta, Math.max(0, correct - delta)]) if (candidate !== correct && !values.includes(candidate)) values.push(candidate);
  }
  return values.slice(0, 3);
}

function placeValueQuestion(params: SampledParams, digits: number[], allowedPositions: number[]): GeneratedChoiceDraft {
  const positionIndex = sampledInteger(params, "position") % allowedPositions.length;
  const position = allowedPositions[positionIndex]!;
  const number = digits.reduce((value, digit) => value * 10 + digit, 0);
  const reversedDigits = [...digits].reverse();
  const digit = reversedDigits[position]!;
  const place = 10 ** position;
  const value = digit * place;
  const placeName = ["האחדות", "העשרות", "המאות", "האלפים"][position]!;
  const wrongValues = distinctIncorrectNumbers(value, [digit, digit * 10, digit * 100, digit * 1000, place, place * 10, number]);
  return generatedChoiceDraft("AR_PLACE_VALUE", `מה הערך של ספרת ${placeName} במספר [[${number}]]?`, [
    { value: `${value}`, correct: true, misconception: "identifies-place-value" },
    { value: `${wrongValues[0]}`, misconception: "uses-digit-not-place-value" },
    { value: `${wrongValues[1]}`, misconception: "uses-adjacent-place-value" },
    { value: `${wrongValues[2]}`, misconception: digit === 0 ? "misunderstands-zero-placeholder" : "misplaces-digit" },
  ], number + position);
}

const PLACE_VALUE_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = [
  conceptualGenerator({
    id: "MVP_AR_PLACE_VALUE_GEN_A", skillId: "AR_PLACE_VALUE", family: "identify-digit-value", category: "conceptual", band: "A",
    exprTemplate: "10*{a}+{b}", params: { a: { type: "natural", min: 1, max: 9 }, b: { type: "natural", min: 1, max: 9 }, position: { type: "integer", min: 0, max: 1 } }, constraints: ["a != b"], difficultyFeature: "structure", structuralStage: "two-digit-distinct-nonzero", version: 5,
    choiceBuilder: (params) => placeValueQuestion(params, [sampledInteger(params, "a"), sampledInteger(params, "b")], [0, 1]),
  }),
  conceptualGenerator({
    id: "MVP_AR_PLACE_VALUE_GEN_B", skillId: "AR_PLACE_VALUE", family: "identify-digit-value", category: "conceptual", band: "B",
    exprTemplate: "100*{a}+10*{b}+{c}", params: { a: { type: "natural", min: 1, max: 9 }, b: { type: "integer", min: 0, max: 9 }, c: { type: "integer", min: 0, max: 9 }, position: { type: "integer", min: 0, max: 1 } }, difficultyFeature: "structure", structuralStage: "three-digit-repeat-or-zero-nonleading-place", version: 5,
    choiceBuilder: (params) => placeValueQuestion(params, [sampledInteger(params, "a"), sampledInteger(params, "b"), sampledInteger(params, "c")], [0, 1]),
  }),
  conceptualGenerator({
    id: "MVP_AR_PLACE_VALUE_GEN_C", skillId: "AR_PLACE_VALUE", family: "compose-expanded-number", category: "representation", band: "C",
    exprTemplate: "{a}*1000+{b}*100+{c}*10+{d}", params: { a: { type: "natural", min: 1, max: 9 }, b: { type: "integer", min: 0, max: 9 }, c: { type: "integer", min: 0, max: 9 }, d: { type: "integer", min: 0, max: 9 } }, difficultyFeature: "structure", structuralStage: "expanded-to-standard-with-repeat-or-zero", representationKind: "expanded-to-standard-form", version: 5,
    choiceBuilder: (params) => {
      const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const c = sampledInteger(params, "c"); const d = sampledInteger(params, "d");
      const number = 1000 * a + 100 * b + 10 * c + d;
      const wrongValues = distinctIncorrectNumbers(number, [1000 * a + 100 * c + 10 * b + d, 1000 * a + 10 * b + 100 * c + d, 100 * a + 10 * b + c + d, number + 90, number - 90]);
      return generatedChoiceDraft("AR_PLACE_VALUE", `איזה מספר מתאים לפירוק [[${a} × 1000 + ${b} × 100 + ${c} × 10 + ${d}]]?`, [
        { value: `${number}`, correct: true, misconception: "composes-expanded-form" },
        ...wrongValues.map((value) => ({ value: `${value}`, misconception: "misplaces-digit-in-composition" })),
      ], number);
    },
  }),
];

function basicFactConceptGenerators(skillId: "AR_ADD_FACTS" | "AR_SUB_FACTS"): Array<GeneratedQuestionDefinition & { skillId: string }> {
  return (["A", "B"] as DifficultyBand[]).flatMap((band) => {
    const range = band === "A" ? { min: 2, max: 9 } : { min: 10, max: 20 };
    const common = { a: { type: "natural" as const, ...range }, b: { type: "natural" as const, ...range } };
    if (skillId === "AR_ADD_FACTS") return [
      conceptualGenerator({ id: `MVP_AR_ADD_FACTS_MISSING_${band}`, skillId, family: "missing-addend", category: "conceptual", band, exprTemplate: "{a}+{b}", params: common, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft(skillId, `איזה מספר חסר? [[${a} + □ = ${a + b}]]`, [{ value: `${b}`, correct: true, misconception: "inverse-operation" }, { value: `${a}`, misconception: "reuses-visible-value" }, { value: `${-b}`, misconception: "sign-confusion" }, { value: `${a + b}`, misconception: "uses-result-as-missing-value" }], a + b); } }),
      conceptualGenerator({
        id: `MVP_AR_ADD_FACTS_COMMUTE_${band}`, skillId, family: "commutative-equivalence", category: "reasoning", band, version: 3,
        exprTemplate: band === "A" ? "{a}+{b}={b}+{a}" : "{a}+{b}=\\square+{a}", params: common, constraints: ["a != b"], difficultyFeature: "structure", structuralStage: band === "A" ? "recognize-commuted-expression" : "complete-commuted-equality",
        choiceBuilder: (params) => {
          const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b;
          if (band === "A") return generatedChoiceDraft(skillId, `איזה ביטוי שווה ל־[[${a} + ${b}]]?`, [{ value: `${b} + ${a}`, correct: true, misconception: "commutative-relationship" }, { value: `${a} - ${b}`, misconception: "confuses-operation-or-symbol" }, { value: `${b} - ${a}`, misconception: "reverses-logical-direction" }, { value: `${a} + ${a}`, misconception: "reuses-visible-value" }], a);
          return generatedChoiceDraft(skillId, `איזה מספר משלים את השוויון [[${a} + ${b} = □ + ${a}]]?`, [{ value: `${b}`, correct: true, misconception: "commutative-relationship" }, { value: `${a}`, misconception: "reuses-visible-value" }, { value: `${total}`, misconception: "uses-result-as-missing-value" }, { value: `${-b}`, misconception: "sign-confusion" }], total);
        },
      }),
    ];
    return [
      conceptualGenerator({ id: `MVP_AR_SUB_FACTS_REMOVE_${band}`, skillId, family: "subtraction-as-removal", category: "conceptual", band, exprTemplate: "{a}+{b}-{b}", params: common, difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b; return generatedChoiceDraft(skillId, `היו [[${total}]] פריטים והוציאו [[${b}]]. כמה נשארו?`, [{ value: `${a}`, correct: true, misconception: "subtraction-as-removal" }, { value: `${-a}`, misconception: "sign-confusion" }, { value: `${total}`, misconception: "ignores-operation" }, { value: `${total + 1}`, misconception: "off-by-one-generalization" }], total); } }),
    ];
  });
}

const FACT_CONTEXT_GENERATORS = Object.entries(factFamilies).flatMap(([skillId, values]) => {
  const isMultiplication = skillId.startsWith("AR_MUL");
  return (["A", "B"] as DifficultyBand[]).flatMap((band) => {
    const bRange = band === "A" ? { min: 3, max: 5 } : { min: 6, max: 10 };
    const omitted = Array.from({ length: Math.max(...values) - Math.min(...values) + 1 }, (_, index) => Math.min(...values) + index).filter((value) => !values.includes(value));
    const params: ParamsSpec = { a: { type: "integer", min: Math.min(...values), max: Math.max(...values), exclude: omitted }, b: { type: "natural", ...bRange } };
    if (isMultiplication) return [conceptualGenerator({
      id: `MVP_${skillId}_CONTEXT_${band}`, skillId, family: "concrete-equal-groups", category: "representation", band, exprTemplate: "{a}*{b}", params, constraints: ["a != 2 || b != 2"], difficultyFeature: "magnitude", representationKind: "context-to-expression", version: 5,
      choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const product = a * b; const contexts = [["שקיות", "שקית", "כדורים"], ["קופסאות", "קופסה", "קלפים"], ["מדפים", "מדף", "ספרים"], ["צלחות", "צלחת", "עוגיות"]] as const; const [groups, group, items] = contexts[(a + b) % contexts.length]!; return generatedChoiceDraft(skillId, `יש [[${a}]] ${groups}, ובכל ${group} [[${b}]] ${items}. איזה תרגיל מתאים למציאת מספר ה${items} הכולל?`, [{ value: `${a} × ${b}`, correct: true, misconception: "equal-groups-product" }, { value: `${a} + ${b}`, misconception: "uses-addition-for-equal-groups" }, { value: `${product} ÷ ${a}`, misconception: "uses-inverse-operation" }, { value: `${product} - ${b}`, misconception: "confuses-operation-or-symbol" }], product); },
    })];
    return ["equal-sharing", "grouping"].map((meaning) => conceptualGenerator({
      id: `MVP_${skillId}_${meaning === "equal-sharing" ? "SHARING" : "GROUPING"}_${band}`, skillId, family: meaning, category: meaning === "equal-sharing" ? "conceptual" : "reasoning", band, exprTemplate: "({a}*{b})/{a}", params, constraints: ["a != b"], difficultyFeature: "magnitude", version: 4,
      choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const product = a * b; const contexts = [{ items: "כדורים", container: "שקית", containers: "שקיות", placement: "בכל שקית מכניסים" }, { items: "ספרים", container: "מדף", containers: "מדפים", placement: "על כל מדף מניחים" }, { items: "עוגיות", container: "צלחת", containers: "צלחות", placement: "בכל צלחת מניחים" }, { items: "תפוחים", container: "סל", containers: "סלים", placement: "בכל סל מניחים" }] as const; const context = contexts[(a + b) % contexts.length]!; const prompt = meaning === "equal-sharing" ? `מחלקים [[${product}]] ${context.items} שווה בשווה בין [[${a}]] ילדים. כמה ${context.items} יקבל כל ילד?` : `יש [[${product}]] ${context.items}. ${context.placement} [[${a}]] ${context.items}. כמה ${context.containers} צריך כדי לסדר את כולם?`; return generatedChoiceDraft(skillId, prompt, [{ value: `${b}`, correct: true, misconception: meaning }, { value: `${a}`, misconception: "reverses-divisor-and-quotient" }, { value: `${product}`, misconception: "uses-dividend-as-answer" }, { value: `${product - a}`, misconception: "subtracts-once" }], product + (meaning === "equal-sharing" ? 0 : context.container.length)); },
    }));
  });
});

function plausibleNonMultiples(base: number, multiplier: number): number[] {
  const first = base * multiplier;
  return [first + Math.max(1, Math.floor(base / 2)), base * (multiplier + 1) - 1, first - 1, first + 1]
    .filter((value, index, all) => value > 0 && value % base !== 0 && all.indexOf(value) === index)
    .slice(0, 2);
}

function plausibleNonFactors(product: number, a: number, b: number): number[] {
  const candidates = [a + 1, Math.max(2, a - 1), b + 1, Math.max(2, b - 1), a + b, Math.abs(b - a) + 1];
  for (let value = 2; candidates.length < 12; value += 1) candidates.push(value);
  return candidates.filter((value, index, all) => value > 1 && product % value !== 0 && all.indexOf(value) === index).slice(0, 2);
}

const FACTORS_MULTIPLES_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => conceptualGenerator({
  id: `MVP_AR_FACTORS_MULTIPLES_MULTI_${band}`, skillId: "AR_FACTORS_MULTIPLES", family: "identify-multiples", category: "conceptual", band, exprTemplate: "{a}*{b}", generatedType: "multiChoice",
  params: { a: { type: "natural", min: [2, 6, 11][index]!, max: [5, 10, 16][index]! }, b: { type: "natural", min: 2, max: 6 } }, difficultyFeature: "magnitude",
  version: 4,
  choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const wrong = plausibleNonMultiples(a, b); return generatedChoiceDraft("AR_FACTORS_MULTIPLES", `איזה מהמספרים הבאים הם כפולות של [[${a}]]? סמנו את כל התשובות הנכונות.`, [{ value: `${a * b}`, correct: true, misconception: "multiple-as-product" }, { value: `${a * (b + 1)}`, correct: true, misconception: "next-multiple" }, { value: `${wrong[0]}`, misconception: "near-multiple-not-divisible" }, { value: `${wrong[1]}`, misconception: "near-multiple-not-divisible" }], a + b, true); },
}));

const FACTOR_IDENTIFICATION_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => conceptualGenerator({
  id: `MVP_AR_FACTORS_MULTIPLES_FACTORS_${band}`, skillId: "AR_FACTORS_MULTIPLES", family: "identify-factors", category: "conceptual", band, exprTemplate: "{a}*{b}", generatedType: "multiChoice",
  params: { a: { type: "natural", min: [2, 4, 7][index]!, max: [3, 6, 10][index]! }, b: { type: "natural", min: [4, 7, 11][index]!, max: [6, 10, 15][index]! } }, constraints: ["a != b"], difficultyFeature: "magnitude", version: 2,
  choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const product = a * b; const wrong = plausibleNonFactors(product, a, b); return generatedChoiceDraft("AR_FACTORS_MULTIPLES", `איזה מהמספרים הבאים הם גורמים של [[${product}]]? סמנו את כל התשובות הנכונות.`, [{ value: `${a}`, correct: true, misconception: "factor-of-product" }, { value: `${b}`, correct: true, misconception: "other-factor-of-product" }, { value: `${wrong[0]}`, misconception: "near-factor-not-divisor" }, { value: `${wrong[1]}`, misconception: "near-factor-not-divisor" }], product, true); },
}));

const NUMBER_LINE_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => {
  if (band === "C") return conceptualGenerator({
    id: "MVP_INT_NUMBER_LINE_LEFT_C", skillId: "INT_NUMBER_LINE", family: "cross-zero-left-move", category: "representation", band, exprTemplate: "{start}-{steps}", params: { wordingVariant: { type: "integer", min: 0, max: 2 }, start: { type: "natural", min: 2, max: 12 }, steps: { type: "natural", min: 4, max: 25 } }, constraints: ["steps > start"], difficultyFeature: "structure", structuralStage: "multi-step-crosses-zero", representationKind: "number-line-to-number", version: 5,
    choiceBuilder: (params) => { const start = sampledInteger(params, "start"); const steps = sampledInteger(params, "steps"); const result = start - steps; return generatedChoiceDraft("INT_NUMBER_LINE", sampledWording(params, [`מתחילים בנקודה [[${start}]] על ישר המספרים ונעים [[${steps}]] צעדים שמאלה. לאיזה מספר מגיעים?`, `על ישר המספרים מתחילים ב־[[${start}]] ומתקדמים [[${steps}]] יחידות שמאלה. היכן נעצרים?`, `נקודה נמצאת ב־[[${start}]]. מזיזים אותה [[${steps}]] יחידות שמאלה על ישר המספרים. מה מיקומה החדש?`]), [{ value: `${result}`, correct: true, misconception: "moves-left-by-subtraction" }, { value: `${steps - start}`, misconception: "drops-negative-result" }, { value: `${start + steps}`, misconception: "moves-right-instead-of-left" }, { value: `${-steps}`, misconception: "starts-from-zero" }], start + steps + sampledInteger(params, "wordingVariant")); },
  });
  const ranges = [{ min: 1, max: 6 }, { min: 7, max: 15 }, { min: 16, max: 30 }]; const range = ranges[index]!;
  return conceptualGenerator({ id: `MVP_INT_NUMBER_LINE_LEFT_${band}`, skillId: "INT_NUMBER_LINE", family: "left-of-zero", category: "representation", band, exprTemplate: "-{n}", params: { wordingVariant: { type: "integer", min: 0, max: 2 }, n: { type: "natural", ...range } }, difficultyFeature: "magnitude", representationKind: "number-line-to-number", version: 5, choiceBuilder: (params) => { const n = sampledInteger(params, "n"); return generatedChoiceDraft("INT_NUMBER_LINE", sampledWording(params, [`איזה מספר נמצא [[${n}]] צעדים משמאל לאפס על ישר המספרים?`, `מתחילים באפס ונעים [[${n}]] יחידות שמאלה. לאיזה מספר מגיעים?`, `איזו נקודה על ישר המספרים נמצאת [[${n}]] יחידות משמאל ל־[[0]]?`]), [{ value: `${-n}`, correct: true, misconception: "left-is-negative" }, { value: `${n}`, misconception: "reverses-representation" }, { value: "0", misconception: "uses-origin" }, { value: `${-(n + 1)}`, misconception: "off-by-one-generalization" }], n + sampledInteger(params, "wordingVariant")); } });
});

const NUMBER_LINE_CONCEPT_GENERATOR = conceptualGenerator({
  id: "MVP_INT_NUMBER_LINE_DIRECTION_A", skillId: "INT_NUMBER_LINE", family: "left-move-decreases-value", category: "conceptual", band: "A", exprTemplate: "{n}-1<{n}", params: { wordingVariant: { type: "integer", min: 0, max: 2 }, n: { type: "integer", min: -10, max: 10 } }, difficultyFeature: "structure", structuralStage: "direction-value-invariant", version: 2,
  choiceBuilder: (params) => { const n = sampledInteger(params, "n"); return generatedChoiceDraft("INT_NUMBER_LINE", sampledWording(params, [`מתחילים ב־[[${n}]] ונעים צעד אחד שמאלה על ישר המספרים. מה נכון תמיד?`, `נקודה נמצאת ב־[[${n}]]. מזיזים אותה יחידה אחת שמאלה. איזה יחס נכון?`, `על ישר המספרים עוברים מ־[[${n}]] אל הנקודה שמשמאלו. מה קורה לערך?`]), [{ value: `המספר החדש קטן מ־[[${n}]]`, correct: true, misconception: "left-move-decreases-value" }, { value: `המספר החדש גדול מ־[[${n}]]`, misconception: "moves-right-instead-of-left" }, { value: `המספר החדש שווה ל־[[${n}]]`, misconception: "movement-does-not-change-value" }, { value: "אי אפשר לדעת", misconception: "avoids-number-line-direction" }], n + sampledInteger(params, "wordingVariant")); },
});

const FRACTION_MEANING_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => {
  const max = [6, 10, 16][index]!;
  return conceptualGenerator({ id: `MVP_FRAC_MEANING_PARTS_${band}`, skillId: "FRAC_MEANING", family: "selected-equal-parts", category: "conceptual", band, exprTemplate: "{b}/{a}", params: { a: { type: "natural", min: [3, 6, 10][index]!, max }, b: { type: "natural", min: 1, max: max - 1 } }, constraints: ["b < a"], difficultyFeature: "magnitude", version: 4, choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const contexts = [["שלם", "חולק"], ["מלבן", "חולק"], ["עוגה", "חולקה"]] as const; const [context, verb] = contexts[(a + b) % contexts.length]!; return generatedChoiceDraft("FRAC_MEANING", `${context} ${verb} ל־[[${a}]] חלקים שווים ונבחרו [[${b}]] חלקים. איזה שבר מתאר את החלק שנבחר?`, [{ value: `${b}/${a}`, correct: true, misconception: "part-over-whole" }, { value: `${a}/${b}`, misconception: "reverses-part-and-whole" }, { value: `${b}/${a + 1}`, misconception: "changes-whole-size" }, { value: `${b + 1}/${a}`, misconception: "changes-selected-parts" }], a + b); } });
});

function fractionNumberLineLatex(numerator: number, denominator: number): string {
  return Array.from({ length: denominator + 1 }, (_, index) => {
    const tick = index === numerator ? "\\overset{\\blacktriangle}{\\vert}" : "\\vert";
    const labelled = index === 0 ? `\\underset{0}{${tick}}` : index === denominator ? `\\underset{1}{${tick}}` : tick;
    return index === denominator ? labelled : `${labelled}\\overline{\\qquad}`;
  }).join("");
}

const FRACTION_MEANING_COVERAGE_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = [
  conceptualGenerator({
    id: "MVP_FRAC_MEANING_NUMERATOR_A", skillId: "FRAC_MEANING", family: "numerator-meaning", category: "conceptual", band: "A", exprTemplate: "{a}/{b}", params: { a: { type: "natural", min: 1, max: 4 }, b: { type: "natural", min: 3, max: 8 } }, constraints: ["a < b"], difficultyFeature: "structure", structuralStage: "interpret-numerator", version: 1,
    choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("FRAC_MEANING", `בשבר [[${a}/${b}]], מה מציין המונה [[${a}]]?`, [{ value: "כמה חלקים שווים נבחרו", correct: true, misconception: "numerator-counts-selected-parts" }, { value: "לכמה חלקים שווים חולק השלם", misconception: "confuses-numerator-and-denominator" }, { value: "כמה שלמים יש", misconception: "reads-numerator-as-whole-count" }, { value: "מה גודלו של כל חלק", misconception: "reads-numerator-as-part-size" }], a + b); },
  }),
  conceptualGenerator({
    id: "MVP_FRAC_MEANING_DENOMINATOR_A", skillId: "FRAC_MEANING", family: "denominator-meaning", category: "conceptual", band: "A", exprTemplate: "{a}/{b}", params: { a: { type: "natural", min: 1, max: 4 }, b: { type: "natural", min: 3, max: 8 } }, constraints: ["a < b"], difficultyFeature: "structure", structuralStage: "interpret-denominator", version: 1,
    choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("FRAC_MEANING", `בשבר [[${a}/${b}]], מה מציין המכנה [[${b}]]?`, [{ value: "לכמה חלקים שווים חולק השלם", correct: true, misconception: "denominator-counts-equal-parts" }, { value: "כמה חלקים נבחרו", misconception: "confuses-numerator-and-denominator" }, { value: "כמה שלמים יש", misconception: "reads-denominator-as-whole-count" }, { value: "כמה חלקים לא נבחרו", misconception: "reads-denominator-as-unselected-count" }], a + b); },
  }),
  conceptualGenerator({
    id: "MVP_FRAC_MEANING_SET_B", skillId: "FRAC_MEANING", family: "fraction-of-a-set", category: "conceptual", band: "B", exprTemplate: "{selected}/{total}", params: { selected: { type: "natural", min: 2, max: 7 }, total: { type: "natural", min: 5, max: 12 } }, constraints: ["selected < total", "selected * 2 != total"], difficultyFeature: "structure", structuralStage: "selected-items-in-set", version: 1,
    choiceBuilder: (params) => { const selected = sampledInteger(params, "selected"); const total = sampledInteger(params, "total"); return generatedChoiceDraft("FRAC_MEANING", `בקבוצה יש [[${total}]] עצמים, ומתוכם [[${selected}]] מסומנים. איזה שבר מן הקבוצה מסומן?`, [{ value: `${selected}/${total}`, correct: true, misconception: "selected-over-total-set" }, { value: `${total}/${selected}`, misconception: "reverses-part-and-whole" }, { value: `${selected}/${total - selected}`, misconception: "uses-unselected-as-denominator" }, { value: `${total - selected}/${total}`, misconception: "reports-unselected-fraction" }], selected + total); },
  }),
  conceptualGenerator({
    id: "MVP_FRAC_MEANING_NUMBER_LINE_B", skillId: "FRAC_MEANING", family: "fraction-on-number-line", category: "representation", band: "B", exprTemplate: "{a}/{b}", params: { a: { type: "natural", min: 1, max: 5 }, b: { type: "natural", min: 3, max: 7 } }, constraints: ["a < b"], difficultyFeature: "structure", structuralStage: "point-on-unit-interval", representationKind: "number-line-to-fraction", version: 1,
    choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("FRAC_MEANING", [...authoredStudentContent(`הקטע מ־[[0]] עד [[1]] חולק ל־[[${b}]] חלקים שווים. איזה שבר מתאים לנקודה המסומנת?`), { kind: "math", latex: fractionNumberLineLatex(a, b), display: true }], [{ value: `${a}/${b}`, correct: true, misconception: "locates-fraction-on-unit-interval" }, { value: `${b}/${a}`, misconception: "reverses-part-and-whole" }, { value: `${a}/${b + 1}`, misconception: "counts-ticks-instead-of-intervals" }, { value: `${a + 1}/${b}`, misconception: "counts-zero-as-selected-step" }], a + b); },
  }),
];

const FRACTION_EQUIVALENCE_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).flatMap((band) => {
  const cRange = band === "A" ? { min: 2, max: 3 } : band === "B" ? { min: 2, max: 5 } : { min: 4, max: 9 };
  const params: ParamsSpec = { a: { type: "natural", min: 1, max: 6 }, b: { type: "natural", min: 3, max: 10 }, c: { type: "natural", ...cRange } };
  const common = { params, difficultyFeature: "structure" as const, version: 4 };
  const forward = conceptualGenerator({
    id: `MVP_FRAC_EQUIV_FORWARD_${band}`, skillId: "FRAC_EQUIV", family: "expand-equivalent-fraction", category: band === "A" ? "representation" : "reasoning", band, exprTemplate: band === "B" ? "{a}/{b}=\\square/({b}*{c})" : "{a}/{b}=({a}*{c})/({b}*{c})", ...common,
    constraints: band === "B" ? ["a < b", "a * c != a + c"] : ["a < b"], structuralStage: band === "A" ? "recognize-simple-scaling" : band === "B" ? "complete-missing-numerator" : "justify-scaling-both-parts", representationKind: band === "A" ? "equivalent-symbolic-form" : undefined,
    choiceBuilder: (sampled) => {
      const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const c = sampledInteger(sampled, "c");
      if (band === "B") return generatedChoiceDraft("FRAC_EQUIV", `איזה מספר משלים את השוויון [[${a}/${b} = □/${b * c}]]?`, [{ value: `${a * c}`, correct: true, misconception: "scales-both-parts" }, { value: `${a + c}`, misconception: "adds-scale-factor" }, { value: `${a}`, misconception: "keeps-numerator-unchanged" }, { value: `${a * c + c}`, misconception: "uses-denominator-scale-in-numerator" }], a + b + c);
      if (band === "C") return generatedChoiceDraft("FRAC_EQUIV", `מדוע השברים [[${a}/${b}]] ו־[[${a * c}/${b * c}]] שווים?`, [{ value: `המונה והמכנה הוכפלו באותו מספר [[${c}]]`, correct: true, misconception: "scales-both-parts" }, { value: `רק המונה הוכפל ב־[[${c}]]`, misconception: "scales-numerator-only" }, { value: `רק המכנה הוכפל ב־[[${c}]]`, misconception: "scales-denominator-only" }, { value: `הוסיפו [[${c}]] למונה ולמכנה`, misconception: "adds-to-both-parts" }], a + b + c);
      return generatedChoiceDraft("FRAC_EQUIV", `איזה שבר שווה ל־[[${a}/${b}]]?`, [{ value: `${a * c}/${b * c}`, correct: true, misconception: "scales-both-parts" }, { value: `${a * c}/${b}`, misconception: "scales-numerator-only" }, { value: `${a}/${b * c}`, misconception: "scales-denominator-only" }, { value: `${a + c}/${b + c}`, misconception: "adds-to-both-parts" }], a + b + c);
    },
  });
  const reverse = conceptualGenerator({
    id: `MVP_FRAC_EQUIV_REVERSE_${band}`, skillId: "FRAC_EQUIV", family: "simplify-equivalent-fraction", category: band === "A" ? "representation" : "reasoning", band, exprTemplate: band === "B" ? "({a}*{c})/({b}*{c})={a}/\\square" : "({a}*{c})/({b}*{c})={a}/{b}", ...common,
    constraints: band === "B" ? ["a < b", "b != c"] : ["a < b"], structuralStage: band === "A" ? "recognize-simple-simplification" : band === "B" ? "complete-missing-denominator" : "simplify-by-non-obvious-common-factor", representationKind: band === "A" ? "equivalent-symbolic-form" : undefined,
    choiceBuilder: (sampled) => {
      const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const c = sampledInteger(sampled, "c");
      if (band === "B") return generatedChoiceDraft("FRAC_EQUIV", `איזה מספר משלים את השוויון [[${a * c}/${b * c} = ${a}/□]]?`, [{ value: `${b}`, correct: true, misconception: "divides-both-parts" }, { value: `${b * c}`, misconception: "keeps-denominator-unchanged" }, { value: `${c}`, misconception: "uses-common-factor-as-denominator" }, { value: `${b + c}`, misconception: "adds-instead-of-dividing" }], a * b + c);
      const wording = band === "C" ? `מחלקים את המונה ואת המכנה של [[${a * c}/${b * c}]] בגורם המשותף [[${c}]]. איזה שבר מתקבל?` : `איזה שבר מתקבל מצמצום [[${a * c}/${b * c}]] ב־[[${c}]]?`;
      return generatedChoiceDraft("FRAC_EQUIV", wording, [{ value: `${a}/${b}`, correct: true, misconception: "divides-both-parts" }, { value: `${a * c}/${b}`, misconception: "simplifies-denominator-only" }, { value: `${a}/${b * c}`, misconception: "simplifies-numerator-only" }, { value: `${a + c}/${b + c}`, misconception: "adds-instead-of-dividing" }], a * b * c);
    },
  });
  return [forward, reverse];
});

const ORDER_OF_OPERATIONS_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band) => conceptualGenerator({
  id: `MVP_OPS_ORDER_BASIC_FIRST_${band}`, skillId: "OPS_ORDER_BASIC", family: "identify-first-operation",
  category: "conceptual", band, version: band === "A" ? 3 : 4,
  exprTemplate: band === "A" ? "{a}+{b}*{c}" : band === "B" ? "{a}+{b}*{c}-{d}" : "({a}+{b})*{c}",
  params: {
    a: { type: "natural", min: 2, max: 12 }, b: { type: "natural", min: 2, max: 8 }, c: { type: "natural", min: 2, max: 6 },
    ...(band === "B" ? { d: { type: "natural" as const, min: 2, max: 9 } } : {}),
  },
  difficultyFeature: "structure", structuralStage: band === "A" ? "two-operations" : band === "B" ? "three-operations" : "parenthesized-priority",
  choiceBuilder: (params) => {
    const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const c = sampledInteger(params, "c");
    const d = params.d ? sampledInteger(params, "d") : 0;
    const expression = band === "A" ? `${a} + ${b} × ${c}` : band === "B" ? `${a} + ${b} × ${c} − ${d}` : `(${a} + ${b}) × ${c}`;
    const correct = band === "C" ? "החיבור שבסוגריים" : "כפל";
    return generatedChoiceDraft("OPS_ORDER_BASIC", `איזו פעולה מבצעים קודם בתרגיל [[${expression}]]?`, [{ value: correct, correct: true, misconception: band === "C" ? "parentheses-before-multiplication" : "multiplication-before-addition" }, { value: band === "C" ? "כפל" : "החיבור השמאלי", misconception: band === "C" ? "ignores-parentheses" : "works-left-to-right" }, { value: "את כל הפעולות יחד", misconception: "no-operation-order" }, { value: "אי אפשר לדעת", misconception: "requires-more-marking" }], a + b + c + d);
  },
}));

const SAME_PRECEDENCE_ORDER_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = [
  conceptualGenerator({
    id: "MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_ADDSUB_A", skillId: "OPS_ORDER_BASIC", family: "same-precedence-left-to-right", category: "conceptual", band: "A", exprTemplate: "{a}-{b}+{c}", params: { a: { type: "natural", min: 6, max: 15 }, b: { type: "natural", min: 2, max: 5 }, c: { type: "natural", min: 2, max: 6 } }, difficultyFeature: "structure", structuralStage: "addition-subtraction-left-to-right", version: 1,
    choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const c = sampledInteger(params, "c"); return generatedChoiceDraft("OPS_ORDER_BASIC", `איזו פעולה מבצעים קודם בתרגיל [[${a} − ${b} + ${c}]]?`, [{ value: "החיסור השמאלי", correct: true, misconception: "same-precedence-left-to-right" }, { value: "החיבור הימני", misconception: "addition-always-before-subtraction" }, { value: "את שתי הפעולות יחד", misconception: "no-operation-order" }, { value: "אי אפשר לדעת", misconception: "requires-more-marking" }], a + b + c); },
  }),
  conceptualGenerator({
    id: "MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_DIVMUL_B", skillId: "OPS_ORDER_BASIC", family: "same-precedence-left-to-right", category: "conceptual", band: "B", exprTemplate: "{a}/{b}*{c}", params: { a: { type: "natural", min: 6, max: 18 }, b: { type: "natural", min: 2, max: 6 }, c: { type: "natural", min: 2, max: 6 } }, difficultyFeature: "structure", structuralStage: "division-multiplication-left-to-right", version: 1,
    choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const c = sampledInteger(params, "c"); return generatedChoiceDraft("OPS_ORDER_BASIC", `איזו פעולה מבצעים קודם בתרגיל [[${a} ÷ ${b} × ${c}]]?`, [{ value: "החילוק השמאלי", correct: true, misconception: "same-precedence-left-to-right" }, { value: "הכפל הימני", misconception: "multiplication-always-before-division" }, { value: "את שתי הפעולות יחד", misconception: "no-operation-order" }, { value: "אי אפשר לדעת", misconception: "requires-more-marking" }], a + b + c); },
  }),
];

const REVIEWED_CONCEPT_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = [
  ...PLACE_VALUE_GENERATORS,
  ...basicFactConceptGenerators("AR_ADD_FACTS"),
  ...basicFactConceptGenerators("AR_SUB_FACTS"),
  ...FACT_CONTEXT_GENERATORS,
  ...FACTORS_MULTIPLES_GENERATORS,
  ...FACTOR_IDENTIFICATION_GENERATORS,
  ...NUMBER_LINE_GENERATORS,
  NUMBER_LINE_CONCEPT_GENERATOR,
  ...FRACTION_MEANING_GENERATORS,
  ...FRACTION_MEANING_COVERAGE_GENERATORS,
  ...FRACTION_EQUIVALENCE_GENERATORS,
  ...ORDER_OF_OPERATIONS_GENERATORS,
  ...SAME_PRECEDENCE_ORDER_GENERATORS,
];

const misconceptionRationales: Record<string, string> = {
  "reverses-representation": "The learner reverses the represented direction or relationship.",
  "ignores-place-or-direction": "The learner notices the digit or magnitude but ignores its place or direction.",
  "uses-adjacent-value": "The learner chooses a nearby represented value instead of interpreting the model.",
  "applies-operation-without-relationship": "The learner performs a visible operation without checking the stated relationship.",
  "reverses-logical-direction": "The learner reverses an inverse or equality relationship.",
  "accepts-surface-match": "The learner selects an expression that looks similar but is not equivalent.",
  "confuses-operation-or-symbol": "The learner interprets the operation, sign, or symbol as a different one.",
  "uses-irrelevant-value": "The learner reuses a visible value that does not satisfy the question.",
  "off-by-one-generalization": "The learner applies the intended pattern with a one-step adjustment error.",
  "accepts-consecutive-values-as-equal": "The learner treats nearby consecutive values as equal without evaluating both sides.",
  "accepts-near-result": "The learner accepts a result that is one unit from the required value.",
  "addition-always-before-subtraction": "The learner gives addition priority over subtraction instead of working left to right.",
  "adds-absolute-values": "The learner ignores signs and adds the absolute values.",
  "adds-factors": "The learner adds visible factors instead of using their multiplicative relationship.",
  "adds-instead-of-dividing": "The learner adds where division is required to undo multiplication or scaling.",
  "adds-instead-of-subtracting": "The learner adds the known addend instead of subtracting it to find the missing addend.",
  "adds-scale-factor": "The learner adds the scale factor rather than multiplying by it.",
  "adds-to-both-parts": "The learner adds the same number to numerator and denominator and assumes equivalence is preserved.",
  "adds-value-without-substitution": "The learner appends the given value without replacing the target variable.",
  "assumes-unit-coefficient": "The learner assumes every written variable has coefficient one even when a coefficient is shown.",
  "avoids-number-line-direction": "The learner treats number-line direction as insufficient information.",
  "avoids-sign-rule": "The learner does not apply the sign rule even though operand signs determine the answer.",
  "avoids-signed-comparison": "The learner treats a comparison of explicit signed values as indeterminate.",
  "changes-coefficient": "The learner changes the fixed coefficient when only the variable value changes.",
  "changes-constant": "The learner changes the constant term when only the variable value changes.",
  "changes-operation": "The learner changes an operation sign when the variable value changes.",
  "changes-remaining-sign": "After cancelling opposites, the learner reverses the sign of the remaining addend.",
  "changes-selected-parts": "The learner changes the count of selected parts by one.",
  "changes-whole-size": "The learner changes the denominator instead of preserving the stated partition of the whole.",
  "checks-one-side-only": "The learner evaluates or adjusts only one side of an equality.",
  "concatenates-coefficient-and-value": "The learner writes adjacent digits instead of multiplying the coefficient by the substituted value.",
  "confuses-algebraic-symbols": "The learner confuses a variable with another algebraic symbol such as equality.",
  "confuses-numerator-and-denominator": "The learner swaps the roles of numerator and denominator.",
  "confuses-opposite-with-zero": "The learner assumes every number and its opposite are themselves zero rather than having sum zero.",
  "confuses-sign-with-zero": "The learner reports zero as a sign outcome despite nonzero factors or operands.",
  "confuses-variable-with-coefficient": "The learner swaps the roles of the variable and its coefficient.",
  "counts-ticks-instead-of-intervals": "The learner counts number-line tick marks instead of equal intervals.",
  "counts-zero-as-selected-step": "The learner counts the zero endpoint as an additional selected interval.",
  "drops-coefficient": "The learner removes the coefficient when substituting for the variable.",
  "drops-middle-addend": "The learner notices the cancelling pair but also discards the uncancelled middle addend.",
  "drops-negative-result": "The learner finds the magnitude of a cross-zero move but omits the negative sign.",
  "drops-parenthesized-sign": "The learner removes parentheses and loses the negative sign of the subtracted number.",
  "drops-variable-without-replacement": "The learner deletes the variable rather than replacing it with the given value.",
  "follows-first-sign": "The learner copies the sign of the first addend without combining the values.",
  "ignores-added-value": "The learner omits a visible additive term while isolating the unknown.",
  "ignores-magnitude-difference": "The learner treats unequal negative magnitudes as equal.",
  "ignores-negative-addend": "The learner ignores the negative addend and returns the positive magnitude.",
  "ignores-operation": "The learner reuses a visible number without carrying out the stated operation.",
  "ignores-parentheses": "The learner substitutes or evaluates without preserving the grouping indicated by parentheses.",
  "ignores-sign": "The learner compares magnitudes while disregarding positive and negative signs.",
  "ignores-unit-difference": "The learner overlooks the one-unit change encoded in the related fact.",
  "ignores-visible-factor": "The learner omits a visible multiplicative factor while isolating the unknown.",
  "keeps-denominator-unchanged": "The learner simplifies the numerator but leaves the denominator at its unsimplified value.",
  "keeps-numerator-unchanged": "The learner scales the denominator without applying the same factor to the numerator.",
  "keeps-original-sign": "The learner repeats the original number instead of changing to its opposite.",
  "larger-absolute-value-is-greater": "The learner compares absolute values and ignores how negative numbers are ordered.",
  "misplaces-digit": "The learner places a digit in the wrong positional column.",
  "misplaces-digit-in-composition": "The learner reconstructs an expanded number with a place shifted left or right.",
  "movement-does-not-change-value": "The learner assumes a number-line move leaves the numerical value unchanged.",
  "moves-right-instead-of-left": "The learner reverses the stated number-line direction.",
  "multiplication-always-before-division": "The learner gives multiplication priority over division instead of working left to right.",
  "multiplies-instead-of-dividing": "The learner multiplies by the known factor instead of dividing to find a missing factor.",
  "near-factor-not-divisor": "The learner selects a value close to a genuine factor without checking exact divisibility.",
  "near-multiple-not-divisible": "The learner selects a value near a multiple without checking divisibility by the base.",
  "negates-minuend": "The learner changes the sign of the minuend rather than rewriting subtraction of a negative.",
  "no-operation-order": "The learner assumes all visible operations can be performed simultaneously.",
  "reads-denominator-as-unselected-count": "The learner interprets the denominator as the number of unselected parts.",
  "reads-denominator-as-whole-count": "The learner interprets the denominator as a count of whole objects.",
  "reads-numerator-as-part-size": "The learner interprets the numerator as the size of each equal part.",
  "reads-numerator-as-whole-count": "The learner interprets the numerator as a count of complete wholes.",
  "reads-variable-as-operation": "The learner interprets a variable letter as an operation sign.",
  "replaces-all-symbols": "The learner replaces every letter in the expression rather than only the assigned variable.",
  "replaces-coefficient-multiplication-with-addition": "The learner turns coefficient multiplication into addition during substitution.",
  "replaces-multiplication-with-addition": "The learner changes multiplication into addition while rewriting the substituted expression.",
  "reports-unselected-fraction": "The learner reports the complement instead of the selected part of the set.",
  "requires-more-marking": "The learner believes explicit grouping is required even when precedence rules determine the order.",
  "reuses-visible-addend": "The learner copies the known addend as the missing addend.",
  "reuses-visible-factor": "The learner copies the known factor as the missing factor.",
  "reuses-visible-value": "The learner selects a prominent visible value without checking the relationship.",
  "reverses-division-order": "The learner divides the known factor by the product instead of product by factor.",
  "reverses-divisor-and-quotient": "The learner swaps the roles of divisor and quotient in an exact fact family.",
  "reverses-part-and-whole": "The learner writes whole-over-part instead of part-over-whole.",
  "reverses-subtraction": "The learner reverses minuend and subtrahend.",
  "reverses-subtraction-order": "The learner subtracts the total from the known addend instead of the known addend from the total.",
  "scales-denominator-only": "The learner multiplies only the denominator when forming an equivalent fraction.",
  "scales-numerator-only": "The learner multiplies only the numerator when forming an equivalent fraction.",
  "sign-confusion": "The learner assigns a sign inconsistent with the arithmetic relationship.",
  "simplifies-denominator-only": "The learner divides only the denominator by the common factor.",
  "simplifies-numerator-only": "The learner divides only the numerator by the common factor.",
  "starts-from-zero": "The learner performs the move from zero instead of from the stated starting point.",
  "substitutes-into-wrong-position": "The learner inserts the given value into a different symbolic position.",
  "subtracts-once": "The learner models repeated grouping as a single subtraction.",
  "treats-equals-as-next-answer": "The learner reads the equals sign as an instruction to write an answer rather than a relation.",
  "uses-addition-for-equal-groups": "The learner adds the group size and group count instead of multiplying them.",
  "uses-adjacent-place-value": "The learner gives the digit the value of an adjacent place.",
  "uses-common-factor-as-denominator": "The learner mistakes the removed common factor for the simplified denominator.",
  "uses-denominator-scale-in-numerator": "The learner transfers the scaled denominator pattern incorrectly to the numerator.",
  "uses-digit-not-place-value": "The learner reports the digit itself instead of its positional value.",
  "uses-dividend-as-answer": "The learner repeats the dividend rather than finding the quotient.",
  "uses-inverse-operation": "The learner applies the inverse operation to an equal-groups situation that calls for multiplication.",
  "uses-near-side-total": "The learner chooses a value near the side total rather than preserving equality.",
  "uses-origin": "The learner answers with the number-line origin instead of moving from it.",
  "uses-product-as-factor": "The learner repeats the product as the missing factor.",
  "uses-result-as-missing-value": "The learner writes the full result into a missing-addend position.",
  "uses-result-as-unknown": "The learner assigns the equation's result directly to the unknown.",
  "uses-side-total-as-missing-value": "The learner uses the value of an entire side as the missing component.",
  "uses-unrelated-operation": "The learner selects an operation unrelated to the inverse relationship in the equation.",
  "uses-unselected-as-denominator": "The learner uses the unselected count as the denominator instead of the total set size.",
  "uses-wrong-sign-rule": "The learner applies the opposite product or quotient sign rule.",
  "works-left-to-right": "The learner evaluates strictly left to right despite a higher-precedence operation.",
};

function misconceptionRationale(id: string): string {
  const key = id.slice(id.indexOf(":") + 1);
  const rationale = misconceptionRationales[key];
  if (!rationale) throw new Error(`Missing misconception rationale for ${id}`);
  return rationale;
}

const GLOBAL_BANDS: DifficultyBand[] = ["A", "B", "C"];
const globalBandRange = (band: DifficultyBand) => band === "A" ? { min: 2, max: 6 } : band === "B" ? { min: 7, max: 15 } : { min: 16, max: 30 };

const SIGNED_CONCEPT_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = [
  ...GLOBAL_BANDS.map((band) => {
    const range = globalBandRange(band);
    const pairParams: ParamsSpec = { a: { type: "natural", ...range }, b: { type: "natural", ...range } };
    const singleParams: ParamsSpec = { wordingVariant: { type: "integer", min: 0, max: 2 }, n: { type: "natural", ...range } };
    if (band === "A") return conceptualGenerator({
      id: "MVP_INT_COMPARE_SIGNED_A", skillId: "INT_COMPARE", family: "signed-comparison", category: "conceptual", band,
      exprTemplate: "-{n}<0", params: singleParams, difficultyFeature: "structure", structuralStage: "negative-versus-zero", signPattern: "negative compared with zero", version: 4,
      choiceBuilder: (params) => { const n = sampledInteger(params, "n"); const prompt = sampledWording(params, [`איזה סימן משלים את ההשוואה? [[${-n}]] [[\\square]] [[0]]`, `בחרו סימן כדי להשלים את ההשוואה: [[${-n}]] [[\\square]] [[0]]`, `השלימו את ההשוואה: [[${-n}]] [[\\square]] [[0]]`]); return generatedChoiceDraft("INT_COMPARE", prompt, [{ value: "<", correct: true, misconception: "negative-is-less-than-zero" }, { value: ">", misconception: "larger-absolute-value-is-greater" }, { value: "=", misconception: "ignores-sign" }, { value: "אי אפשר לדעת", misconception: "avoids-signed-comparison" }], n); },
    });
    if (band === "B") return conceptualGenerator({
      id: "MVP_INT_COMPARE_SIGNED_B", skillId: "INT_COMPARE", family: "signed-comparison", category: "reasoning", band,
      exprTemplate: "-{n}>-({n}+1)", params: singleParams, difficultyFeature: "structure", structuralStage: "adjacent-negatives", signPattern: "two adjacent negative values", version: 4,
      choiceBuilder: (params) => { const n = sampledInteger(params, "n"); const prompt = sampledWording(params, [`איזה סימן משלים את ההשוואה? [[${-n}]] [[\\square]] [[${-(n + 1)}]]`, `בחרו סימן כדי להשלים את ההשוואה: [[${-n}]] [[\\square]] [[${-(n + 1)}]]`, `השלימו את ההשוואה: [[${-n}]] [[\\square]] [[${-(n + 1)}]]`]); return generatedChoiceDraft("INT_COMPARE", prompt, [{ value: ">", correct: true, misconception: "closer-to-zero-is-greater" }, { value: "<", misconception: "larger-absolute-value-is-greater" }, { value: "=", misconception: "ignores-unit-difference" }, { value: "אי אפשר לדעת", misconception: "avoids-signed-comparison" }], n); },
    });
    return conceptualGenerator({
      id: "MVP_INT_COMPARE_SIGNED_C", skillId: "INT_COMPARE", family: "signed-comparison", category: "reasoning", band,
      exprTemplate: "-{a}>-{b}", params: pairParams, constraints: ["a < b"], difficultyFeature: "structure", structuralStage: "independent-negative-magnitudes", signPattern: "two non-adjacent negative values", version: 4,
      choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("INT_COMPARE", `איזה סימן משלים את ההשוואה? [[${-a}]] [[\\square]] [[${-b}]]`, [{ value: ">", correct: true, misconception: "closer-to-zero-is-greater" }, { value: "<", misconception: "larger-absolute-value-is-greater" }, { value: "=", misconception: "ignores-magnitude-difference" }, { value: "אי אפשר לדעת", misconception: "avoids-signed-comparison" }], a + b); },
    });
  }),
  conceptualGenerator({
    id: "MVP_INT_COMPARE_NEGATIVE_POSITIVE_A", skillId: "INT_COMPARE", family: "negative-versus-positive", category: "conceptual", band: "A", exprTemplate: "-{a}<{b}", params: { a: { type: "natural", min: 1, max: 12 }, b: { type: "natural", min: 1, max: 12 } }, difficultyFeature: "structure", structuralStage: "negative-versus-positive", signPattern: "negative compared with positive", version: 1,
    choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("INT_COMPARE", `איזה סימן משלים את ההשוואה? [[${-a}]] [[\\square]] [[${b}]]`, [{ value: "<", correct: true, misconception: "negative-less-than-positive" }, { value: ">", misconception: "larger-absolute-value-is-greater" }, { value: "=", misconception: "ignores-sign" }, { value: "אי אפשר לדעת", misconception: "avoids-signed-comparison" }], a + b); },
  }),
  conceptualGenerator({
    id: "MVP_INT_NEGATION_POSITIVE_A", skillId: "INT_NEGATION", family: "opposite-number-structure", category: "conceptual", band: "A",
    exprTemplate: "-({n})", params: { wordingVariant: { type: "integer", min: 0, max: 2 }, n: { type: "natural", min: 2, max: 15 } }, difficultyFeature: "structure", structuralStage: "opposite-of-positive", signPattern: "opposite of positive", version: 3,
    choiceBuilder: (params) => { const n = sampledInteger(params, "n"); const prompt = sampledWording(params, [`מהו המספר הנגדי של [[${n}]]?`, `בחרו את המספר הנגדי ל־[[${n}]].`, `איזה מספר נמצא במרחק שווה מאפס ובצד הנגדי ל־[[${n}]]?`]); return generatedChoiceDraft("INT_NEGATION", prompt, [{ value: `${-n}`, correct: true, misconception: "changes-sign" }, { value: `${n}`, misconception: "keeps-original-sign" }, { value: "0", misconception: "confuses-opposite-with-zero" }, { value: `${-(n + 1)}`, misconception: "off-by-one-generalization" }], n); },
  }),
  conceptualGenerator({
    id: "MVP_INT_NEGATION_NEGATIVE_B", skillId: "INT_NEGATION", family: "opposite-number-structure", category: "conceptual", band: "B",
    exprTemplate: "-(-{n})", params: { wordingVariant: { type: "integer", min: 0, max: 2 }, n: { type: "natural", min: 2, max: 15 } }, difficultyFeature: "structure", structuralStage: "opposite-of-negative", signPattern: "opposite of negative", version: 4,
    choiceBuilder: (params) => { const n = sampledInteger(params, "n"); const prompt = sampledWording(params, [`מהו המספר הנגדי של [[${-n}]]?`, `בחרו את המספר הנגדי ל־[[${-n}]].`, `איזה מספר נמצא במרחק שווה מאפס ובצד הנגדי ל־[[${-n}]]?`]); return generatedChoiceDraft("INT_NEGATION", prompt, [{ value: `${n}`, correct: true, misconception: "changes-sign" }, { value: `${-n}`, misconception: "keeps-original-sign" }, { value: "0", misconception: "confuses-opposite-with-zero" }, { value: `${n + 1}`, misconception: "off-by-one-generalization" }], n); },
  }),
  conceptualGenerator({
    id: "MVP_INT_ADD_OPPOSITES_A", skillId: "INT_ADD", family: "opposites-result-zero", category: "conceptual", band: "A",
    exprTemplate: "(-{n})+{n}", params: { wordingVariant: { type: "integer", min: 0, max: 2 }, n: { type: "natural", min: 2, max: 20 } }, difficultyFeature: "structure", structuralStage: "additive-opposites", signPattern: "opposites; result zero", version: 3,
    choiceBuilder: (params) => { const n = sampledInteger(params, "n"); const prompt = sampledWording(params, [`מה התוצאה של [[(−${n}) + ${n}]]?`, `חשבו את סכום המספרים הנגדיים [[(−${n}) + ${n}]].`, `איזה ערך מתקבל בביטוי [[(−${n}) + ${n}]]?`]); return generatedChoiceDraft("INT_ADD", prompt, [{ value: "0", correct: true, misconception: "opposites-sum-to-zero" }, { value: `${n}`, misconception: "ignores-negative-addend" }, { value: `${-n}`, misconception: "follows-first-sign" }, { value: `${2 * n}`, misconception: "adds-absolute-values" }], n); },
  }),
  conceptualGenerator({
    id: "MVP_INT_ADD_OPPOSITES_B", skillId: "INT_ADD", family: "opposites-result-zero", category: "reasoning", band: "B",
    exprTemplate: "(-{n})+{m}+{n}", params: { wordingVariant: { type: "integer", min: 0, max: 2 }, m: { type: "integer", min: -12, max: 12 }, n: { type: "natural", min: 2, max: 20 } }, constraints: ["m != 0", "m + n != 0", "m + 2 * n != 0"], difficultyFeature: "structure", structuralStage: "opposites-inside-three-addends", signPattern: "opposites within three addends", version: 3,
    choiceBuilder: (params) => { const m = sampledInteger(params, "m"); const n = sampledInteger(params, "n"); return generatedChoiceDraft("INT_ADD", sampledWording(params, [`בלי לחשב כל שלב בנפרד, מה תוצאת הביטוי [[(-${n}) + (${m}) + ${n}]]?`, `בביטוי [[(-${n}) + (${m}) + ${n}]], אילו מחוברים מתבטלים ומה נשאר?`, `חשבו בעזרת זוג מספרים נגדיים: [[(-${n}) + (${m}) + ${n}]].`]), [{ value: `${m}`, correct: true, misconception: "cancels-additive-opposites" }, { value: "0", misconception: "drops-middle-addend" }, { value: `${m + 2 * n}`, misconception: "adds-absolute-values" }, { value: `${-m}`, misconception: "changes-remaining-sign" }], m + n + sampledInteger(params, "wordingVariant")); },
  }),
  conceptualGenerator({
    id: "MVP_INT_SUB_NEGATIVE_REWRITE_A", skillId: "INT_SUB", family: "subtract-negative-as-addition", category: "conceptual", band: "A",
    exprTemplate: "{a}-(-{b})={a}+{b}", params: { a: { type: "natural", min: 2, max: 15 }, b: { type: "natural", min: 2, max: 15 } }, constraints: ["a != b"], difficultyFeature: "structure", structuralStage: "rewrite-subtracted-negative", signPattern: "positive-negative operand", version: 3,
    choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("INT_SUB", `איזה ביטוי שווה ל־[[${a} − (−${b})]]?`, [{ value: `${a} + ${b}`, correct: true, misconception: "subtracting-negative-becomes-addition" }, { value: `${a} - ${b}`, misconception: "drops-parenthesized-sign" }, { value: `−${a} - ${b}`, misconception: "negates-minuend" }, { value: `${b} - ${a}`, misconception: "reverses-subtraction" }], a + b); },
  }),
  ...(["A", "B"] as DifficultyBand[]).flatMap((band) => {
    const range = { min: 2, max: 9 };
    const params: ParamsSpec = { a: { type: "natural", ...range }, b: { type: "natural", ...range } };
    const twoNegatives = band === "B";
    return [
      conceptualGenerator({
        id: `MVP_INT_MUL_SIGN_${band}`, skillId: "INT_MUL", family: "multiplication-sign-rules", category: "conceptual", band,
        exprTemplate: twoNegatives ? "(-{a})*(-{b})" : "(-{a})*{b}", params, difficultyFeature: "structure", structuralStage: twoNegatives ? "two-negative-factors" : "one-negative-factor", signPattern: twoNegatives ? "negative×negative" : "negative×positive", version: 5,
        choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const expression = twoNegatives ? `(−${a}) × (−${b})` : `(−${a}) × ${b}`; return generatedChoiceDraft("INT_MUL", `מהו הסימן של המכפלה בתרגיל [[${expression}]]?`, [{ value: twoNegatives ? "חיובי" : "שלילי", correct: true, misconception: twoNegatives ? "two-negative-signs" : "one-negative-factor" }, { value: twoNegatives ? "שלילי" : "חיובי", misconception: "uses-wrong-sign-rule" }, { value: "אפס", misconception: "confuses-sign-with-zero" }, { value: "אי אפשר לדעת", misconception: "avoids-sign-rule" }], a + b); },
      }),
      conceptualGenerator({
        id: `MVP_INT_DIV_SIGN_${band}`, skillId: "INT_DIV", family: "division-sign-rules", category: "conceptual", band,
        exprTemplate: twoNegatives ? "(-({a}*{b}))/(-{a})" : "(-({a}*{b}))/{a}", params, difficultyFeature: "structure", structuralStage: twoNegatives ? "two-negative-operands" : "one-negative-operand", signPattern: twoNegatives ? "negative÷negative" : "negative÷positive", version: 5,
        choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const expression = twoNegatives ? `(−${a * b}) ÷ (−${a})` : `(−${a * b}) ÷ ${a}`; return generatedChoiceDraft("INT_DIV", `מהו הסימן של המנה בתרגיל [[${expression}]]?`, [{ value: twoNegatives ? "חיובי" : "שלילי", correct: true, misconception: twoNegatives ? "two-negative-signs" : "one-negative-operand" }, { value: twoNegatives ? "שלילי" : "חיובי", misconception: "uses-wrong-sign-rule" }, { value: "אפס", misconception: "confuses-sign-with-zero" }, { value: "אי אפשר לדעת", misconception: "avoids-sign-rule" }], a + b); },
      }),
    ];
  }),
];

const GLOBAL_AUTHORING_GENERATORS = GLOBAL_BANDS.flatMap((band) => {
  const algebraPairParams: ParamsSpec = { a: { type: "natural", min: 2, max: 12 }, b: { type: "natural", min: 2, max: 12 } };
  const algebraSingleParams: ParamsSpec = { n: { type: "natural", min: 2, max: 12 } };
  return [
    conceptualGenerator({
      id: `MVP_ALG_EQUALITY_${band}`, skillId: "ALG_EQUALITY", family: band === "A" ? "noncanonical-equality" : band === "B" ? "missing-value-both-sides" : "equal-expression-relation", category: band === "A" ? "conceptual" : "reasoning", band, version: band === "A" ? 5 : 4,
      exprTemplate: band === "A" ? "({a}+{b})={a}+{b}" : band === "B" ? "\\square+{a}={a}+{b};{a}+{b}={a}+\\square" : "{a}+{b}={c}+({a}+{b}-{c})",
      params: band === "C" ? { ...algebraPairParams, c: { type: "natural", min: 2, max: 12 } } : algebraPairParams,
      constraints: band === "C" ? ["a != b", "c < a + b", "c != a", "c != b"] : ["a != b"], difficultyFeature: "structure", structuralStage: band === "A" ? "result-on-left" : band === "B" ? "missing-value-on-either-side" : "different-expressions-same-value",
      choiceBuilder: (params) => {
        const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b;
        if (band === "A") return generatedChoiceDraft("ALG_EQUALITY", "איזה משפט שוויון נכון? שימו לב לערכים בשני צדי סימן השוויון.", [{ value: `${total} = ${a} + ${b}`, correct: true, misconception: "equality-relates-equal-values" }, { value: `${total + 1} = ${a} + ${b}`, misconception: "accepts-near-result" }, { value: `${total} = ${a} + ${b + 1}`, misconception: "checks-one-side-only" }, { value: `${a} = ${total} + ${b}`, misconception: "treats-equals-as-next-answer" }], total);
        if (band === "B") return generatedChoiceDraft("ALG_EQUALITY", `אותו מספר חסר בשני משפטי השוויון: [[□ + ${a} = ${a} + ${b}]] וגם [[${a} + ${b} = ${a} + □]]. מהו המספר?`, [{ value: `${b}`, correct: true, misconception: "maintains-equality-both-sides" }, { value: `${a}`, misconception: "reuses-visible-value" }, { value: `${total}`, misconception: "uses-side-total-as-missing-value" }, { value: `${total + 1}`, misconception: "uses-near-side-total" }], total);
        const c = sampledInteger(params, "c"); const d = total - c;
        return generatedChoiceDraft("ALG_EQUALITY", "איזה משפט שוויון מציג שני ביטויים שונים בעלי אותו ערך?", [{ value: `${a} + ${b} = ${c} + ${d}`, correct: true, misconception: "compares-both-sides" }, { value: `${a} + ${b} = ${c} + ${d + 1}`, misconception: "accepts-near-result" }, { value: `${a} + ${b + 1} = ${c} + ${d}`, misconception: "checks-one-side-only" }, { value: `${total} = ${total + 1}`, misconception: "accepts-consecutive-values-as-equal" }], a + b + c);
      },
    }),
    conceptualGenerator({ id: `MVP_ALG_VARIABLE_${band}`, skillId: "ALG_VARIABLE", family: "variable-concepts", category: band === "C" ? "reasoning" : "conceptual", band, version: band === "A" ? 4 : band === "B" ? 4 : 3, exprTemplate: band === "C" ? "{n}x+1" : "{n}x", params: algebraSingleParams, difficultyFeature: "structure", structuralStage: band === "A" ? "identify-variable" : band === "B" ? "identify-coefficient" : "reason-about-variable-effect", studentFacingSymbols: ["x"], choiceBuilder: (params) => { const n = sampledInteger(params, "n"); if (band === "A") return generatedChoiceDraft("ALG_VARIABLE", `בביטוי [[${n}x]], מה תפקידה של [[x]]?`, [{ value: "משתנה; האות [[x]] מייצגת ערך מספרי", correct: true, misconception: "variable-can-vary" }, { value: "סימן כפל בלבד", misconception: "reads-variable-as-operation" }, { value: `המספר [[${n}]]`, misconception: "confuses-variable-with-coefficient" }, { value: "סימן שוויון", misconception: "confuses-algebraic-symbols" }], n); if (band === "B") return generatedChoiceDraft("ALG_VARIABLE", `בביטוי [[${n}x]], מהו המקדם של [[x]]?`, [{ value: `${n}`, correct: true, misconception: "identifies-coefficient" }, { value: "x", misconception: "confuses-variable-with-coefficient" }, { value: "1", misconception: "assumes-unit-coefficient" }, { value: `${n + 1}`, misconception: "off-by-one-generalization" }], n); return generatedChoiceDraft("ALG_VARIABLE", `בביטוי [[${n}x + 1]], מה עשוי להשתנות כאשר הערך של [[x]] משתנה?`, [{ value: "ערך הביטוי", correct: true, misconception: "variable-affects-expression" }, { value: `המקדם [[${n}]]`, misconception: "changes-coefficient" }, { value: "סימן החיבור", misconception: "changes-operation" }, { value: "המספר הקבוע", misconception: "changes-constant" }], n); } }),
    conceptualGenerator({
      id: `MVP_ALG_SUBSTITUTE_${band}`, skillId: "ALG_SUBSTITUTE", family: "substitution-abstraction",
      category: band === "A" ? "calculation" : "representation", band, version: 4,
      exprTemplate: band === "A" ? "{a}*{x}" : band === "B" ? "a*{x}+{b}" : "a*({x}+b)",
      params: band === "A" ? { a: { type: "natural", min: 2, max: 5 }, x: { type: "natural", min: 2, max: 30 } } : band === "B" ? { x: { type: "natural", min: 2, max: 30 }, b: { type: "natural", min: 1, max: 6 } } : { x: { type: "natural", min: 2, max: 30 } },
      constraints: band === "A" ? ["a != x", "a * x != a + x"] : band === "B" ? ["b != x"] : undefined,
      difficultyFeature: "structure", structuralStage: band === "A" ? "numeric-result" : band === "B" ? "one-symbol-remains" : "multiple-symbols-remain",
      studentFacingSymbols: band === "A" ? [] : band === "B" ? ["a"] : ["a", "b"],
      representationKind: band === "A" ? undefined : "substitution-to-expression",
      choiceBuilder: (params) => {
        const x = sampledInteger(params, "x");
        if (band === "A") {
          const a = sampledInteger(params, "a");
          return generatedChoiceDraft("ALG_SUBSTITUTE", `אם [[x = ${x}]], איזה ביטוי מתקבל לאחר הצבה ב־[[${a}x]]?`, [{ value: `${a} × ${x}`, correct: true, misconception: "substitutes-variable-value" }, { value: `${a}${x}`, misconception: "concatenates-coefficient-and-value" }, { value: `${a} + ${x}`, misconception: "replaces-coefficient-multiplication-with-addition" }, { value: `${x}`, misconception: "drops-coefficient" }], a + x);
        }
        if (band === "B") {
          const b = sampledInteger(params, "b");
          return generatedChoiceDraft("ALG_SUBSTITUTE", `אם [[x = ${x}]], איזה ביטוי מתקבל לאחר הצבה ב־[[ax + ${b}]]?`, [{ value: `a × ${x} + ${b}`, correct: true, misconception: "substitutes-variable-value" }, { value: `a + ${x} + ${b}`, misconception: "replaces-coefficient-multiplication-with-addition" }, { value: `${x} + ${b}`, misconception: "drops-coefficient" }, { value: `a × ${b} + ${x}`, misconception: "substitutes-into-wrong-position" }], x + b);
        }
        return generatedChoiceDraft("ALG_SUBSTITUTE", `אם [[x = ${x}]], איזה ביטוי מתקבל לאחר הצבה ב־[[a(x + b)]]?`, [{ value: `a × (${x} + b)`, correct: true, misconception: "substitutes-variable-value" }, { value: `a × ${x} + b`, misconception: "ignores-parentheses" }, { value: `a + ${x} + b`, misconception: "replaces-multiplication-with-addition" }, { value: `(a + b) × ${x}`, misconception: "substitutes-into-wrong-position" }], x);
      },
    }),
    conceptualGenerator({
      id: `MVP_EQ_ADD_${band}`, skillId: "EQ_ADD", family: "additive-equation-abstraction",
      category: band === "C" ? "reasoning" : "calculation", band, version: band === "B" ? 4 : 3,
      exprTemplate: band === "A" ? "\\square+{b}={a}+{b}" : band === "B" ? "x+{a}={a}+{b}" : "x+a=b+{n}",
      params: band === "C" ? algebraSingleParams : algebraPairParams,
      constraints: band === "C" ? undefined : ["a != b"], difficultyFeature: "structure",
      structuralStage: band === "A" ? "numeric-placeholder" : band === "B" ? "one-symbol" : "symbolic-solution",
      studentFacingSymbols: band === "A" ? [] : band === "B" ? ["x"] : ["x", "a", "b"],
      choiceBuilder: (params) => {
        if (band === "C") {
          const n = sampledInteger(params, "n");
          return generatedChoiceDraft("EQ_ADD", `נתון [[x + a = b + ${n}]]. איזה ביטוי שווה תמיד ל־[[x]]?`, [{ value: `b + ${n} - a`, correct: true, misconception: "inverse-addition" }, { value: `b + ${n} + a`, misconception: "adds-instead-of-subtracting" }, { value: `a - b - ${n}`, misconception: "reverses-logical-direction" }, { value: `b - a`, misconception: "ignores-added-value" }], n);
        }
        const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b;
        const equation = band === "A" ? `□ + ${b} = ${total}` : `x + ${a} = ${total}`;
        const correct = band === "A" ? a : b;
        const visibleAddend = band === "A" ? b : a;
        return generatedChoiceDraft("EQ_ADD", band === "A" ? `איזה ערך משלים את השוויון [[${equation}]]?` : `איזה ערך של [[x]] מקיים את השוויון [[${equation}]]?`, [{ value: `${correct}`, correct: true, misconception: "inverse-addition" }, { value: `${total}`, misconception: "uses-result-as-unknown" }, { value: `${visibleAddend}`, misconception: "reuses-visible-addend" }, { value: `${total + 1}`, misconception: "off-by-one-generalization" }], total);
      },
    }),
    conceptualGenerator({
      id: `MVP_EQ_MUL_${band}`, skillId: "EQ_MUL", family: "multiplicative-equation-abstraction",
      category: band === "C" ? "reasoning" : "calculation", band, version: band === "B" ? 4 : 3,
      exprTemplate: band === "A" ? "\\square*{b}={a}*{b}" : band === "B" ? "x*{b}={a}*{b}" : "a*x=b*{n}",
      params: band === "C" ? algebraSingleParams : algebraPairParams,
      constraints: band === "C" ? undefined : ["a != b"], difficultyFeature: "structure",
      structuralStage: band === "A" ? "numeric-placeholder" : band === "B" ? "one-symbol" : "symbolic-solution",
      studentFacingSymbols: band === "A" ? [] : band === "B" ? ["x"] : ["x", "a", "b"],
      symbolicConditions: band === "C" ? ["a != 0"] : undefined,
      choiceBuilder: (params) => {
        if (band !== "C") {
          const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const product = a * b;
          const equation = band === "A" ? `□ × ${b} = ${product}` : `x × ${b} = ${product}`;
          return generatedChoiceDraft("EQ_MUL", band === "A" ? `איזה ערך משלים את השוויון [[${equation}]]?` : `איזה ערך של [[x]] מקיים את השוויון [[${equation}]]?`, [{ value: `${a}`, correct: true, misconception: "inverse-multiplication" }, { value: `${b}`, misconception: "reuses-visible-factor" }, { value: `${product}`, misconception: "uses-product-as-factor" }, { value: `${a + b}`, misconception: "adds-instead-of-dividing" }], a + b);
        }
        const n = sampledInteger(params, "n");
        return generatedChoiceDraft("EQ_MUL", `נתון [[a × x = b × ${n}]], כאשר [[a ≠ 0]]. איזה ביטוי שווה תמיד ל־[[x]]?`, [{ value: `(b × ${n}) ÷ a`, correct: true, misconception: "inverse-multiplication" }, { value: `b × ${n} × a`, misconception: "multiplies-instead-of-dividing" }, { value: `(b + ${n}) ÷ a`, misconception: "adds-factors" }, { value: `b ÷ a`, misconception: "ignores-visible-factor" }], n);
      },
    }),
  ];
});

const SEMANTIC_EVIDENCE_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = [
  conceptualGenerator({
    id: "MVP_ALG_SUBSTITUTE_MEANING_A", skillId: "ALG_SUBSTITUTE", family: "meaning-of-substitution", category: "conceptual", band: "A", version: 1,
    exprTemplate: "x={n};a*x+b", params: { n: { type: "natural", min: 2, max: 12 } }, difficultyFeature: "structure", structuralStage: "replace-variable-with-given-value", studentFacingSymbols: ["x", "a", "b"],
    choiceBuilder: (params) => { const n = sampledInteger(params, "n"); return generatedChoiceDraft("ALG_SUBSTITUTE", `בפעולת הצבה נתון [[x = ${n}]]. כאשר מציבים בביטוי [[ax + b]], מה עושים?`, [{ value: `מחליפים את [[x]] ב־[[${n}]] ומשאירים את שאר הביטוי במקומו`, correct: true, misconception: "substitution-replaces-variable" }, { value: `מחליפים גם את [[a]] וגם את [[b]] ב־[[${n}]]`, misconception: "replaces-all-symbols" }, { value: `מוסיפים [[${n}]] לביטוי בלי להחליף את [[x]]`, misconception: "adds-value-without-substitution" }, { value: `מוחקים את [[x]] בלי להציב במקומו ערך`, misconception: "drops-variable-without-replacement" }], n); },
  }),
  conceptualGenerator({
    id: "MVP_EQ_ADD_INVERSE_CONCEPT_A", skillId: "EQ_ADD", family: "missing-addend-inverse-operation", category: "conceptual", band: "A", version: 1,
    exprTemplate: "\\square+{b}={total}", params: { b: { type: "natural", min: 2, max: 12 }, total: { type: "natural", min: 14, max: 30 } }, constraints: ["total > b"], difficultyFeature: "structure", structuralStage: "choose-inverse-operation",
    choiceBuilder: (params) => { const b = sampledInteger(params, "b"); const total = sampledInteger(params, "total"); return generatedChoiceDraft("EQ_ADD", `באיזו פעולה אפשר למצוא את המספר החסר ב־[[□ + ${b} = ${total}]]?`, [{ value: `לחסר [[${b}]] מ־[[${total}]]`, correct: true, misconception: "inverse-addition" }, { value: `לחבר [[${b}]] ו־[[${total}]]`, misconception: "adds-instead-of-subtracting" }, { value: `לחסר [[${total}]] מ־[[${b}]]`, misconception: "reverses-subtraction-order" }, { value: `לכפול את [[${b}]] ב־[[${total}]]`, misconception: "uses-unrelated-operation" }], b + total); },
  }),
  conceptualGenerator({
    id: "MVP_EQ_MUL_INVERSE_CONCEPT_A", skillId: "EQ_MUL", family: "missing-factor-inverse-operation", category: "conceptual", band: "A", version: 1,
    exprTemplate: "\\square*{factor}={factor}*{quotient}", params: { factor: { type: "natural", min: 2, max: 9 }, quotient: { type: "natural", min: 2, max: 9 } }, difficultyFeature: "structure", structuralStage: "choose-inverse-operation",
    choiceBuilder: (params) => { const factor = sampledInteger(params, "factor"); const quotient = sampledInteger(params, "quotient"); const product = factor * quotient; return generatedChoiceDraft("EQ_MUL", `באיזו פעולה אפשר למצוא את המספר החסר ב־[[□ × ${factor} = ${product}]]?`, [{ value: `לחלק את [[${product}]] ב־[[${factor}]]`, correct: true, misconception: "inverse-multiplication" }, { value: `לכפול את [[${product}]] ב־[[${factor}]]`, misconception: "multiplies-instead-of-dividing" }, { value: `לחבר את [[${product}]] ו־[[${factor}]]`, misconception: "adds-factors" }, { value: `לחלק את [[${factor}]] ב־[[${product}]]`, misconception: "reverses-division-order" }], factor + quotient); },
  }),
];

const CURATED_WORDING_ITEMS: SkillQuestionDefinition[] = [
  {
    id: "MVP_INT_NEGATION_ZERO_CURATED",
    topicId: "FOUNDATIONS",
    skillId: "INT_NEGATION",
    type: "singleChoice",
    authoringMode: "curated",
    contentFamily: "INT_NEGATION:zero-is-self-opposite",
    curationReason: "edge-case" satisfies QuestionCurationReason,
    curationJustificationHe: "הערך המדויק 0 חיוני כאן: אפס הוא המספר היחיד ששווה לנגדי שלו, ולכן זהו מקרה קצה מכוון ולא דוגמה מספרית שרירותית.",
    category: "conceptual",
    difficultyBand: "A",
    difficulty: 0.08,
    prompt: authoredStudentContent("מהו המספר הנגדי של [[0]]?"),
    options: [
      { id: "o0", content: authoredChoiceContent("[[0]]"), },
      { id: "o1", content: authoredChoiceContent("[[1]]"), misconceptionId: "INT_NEGATION:forces-positive-opposite", misconceptionRationale: "Assumes an opposite must be strictly positive." },
      { id: "o2", content: authoredChoiceContent("[[-1]]"), misconceptionId: "INT_NEGATION:forces-negative-opposite", misconceptionRationale: "Assumes an opposite must be strictly negative." },
      { id: "o3", content: authoredChoiceContent("לא קיים מספר נגדי ל־[[0]]"), misconceptionId: "INT_NEGATION:excludes-zero-from-negation", misconceptionRationale: "Treats zero as outside the opposite-number relationship." },
    ],
    correctOptionId: "o0",
    tags: ["mvp", "curated", "edge-case", "requires-rereview", "band:A"],
    version: 1,
  },
  {
    id: "MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED",
    topicId: "FOUNDATIONS",
    skillId: "ALG_VARIABLE",
    type: "singleChoice",
    authoringMode: "curated",
    contentFamily: "ALG_VARIABLE:contextual-variable-meaning",
    curationReason: "deliberate-example" satisfies QuestionCurationReason,
    curationJustificationHe: "הניסוח ההקשרי עצמו הוא האובייקט הפדגוגי ומבחין בין אות מתמטית לבין הכמות שהיא מייצגת.",
    category: "conceptual",
    difficultyBand: "A",
    difficulty: 0.12,
    prompt: authoredStudentContent("בקבוצה יש [[n]] תלמידים. מה מייצגת האות [[n]]?"),
    options: [
      { id: "o0", content: authoredChoiceContent("מספר התלמידים בקבוצה") },
      { id: "o1", content: authoredChoiceContent("שם הקבוצה"), misconceptionId: "ALG_VARIABLE:confuses-variable-with-label", misconceptionRationale: "Treats the algebraic symbol as a name or label rather than a quantity." },
      { id: "o2", content: authoredChoiceContent("מספר הכיתות"), misconceptionId: "ALG_VARIABLE:selects-wrong-context-quantity", misconceptionRationale: "Selects a different count from the context instead of the quantity assigned to the variable." },
      { id: "o3", content: authoredChoiceContent("מספר המורים"), misconceptionId: "ALG_VARIABLE:selects-unrelated-context-quantity", misconceptionRationale: "Selects an unrelated contextual quantity instead of the represented quantity." },
    ],
    correctOptionId: "o0",
    tags: ["mvp", "curated", "wording-sensitive", "requires-rereview", "band:A"],
    version: 4,
  },
  {
    id: "MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED",
    topicId: "FOUNDATIONS",
    skillId: "ALG_VARIABLE",
    type: "singleChoice",
    authoringMode: "curated",
    contentFamily: "ALG_VARIABLE:contextual-variable-value",
    curationReason: "deliberate-example" satisfies QuestionCurationReason,
    curationJustificationHe: "הערכים 18 ו־25 מתארים שתי הפעלות נפרדות של אותו סימון, וממחישים שערך המשתנה תלוי במקרה שנבדק.",
    category: "reasoning",
    difficultyBand: "B",
    difficulty: 0.38,
    prompt: authoredStudentContent("בכל פעם בודקים קבוצה אחת, והאות [[n]] מייצגת את מספר התלמידים בקבוצה שנבדקת. פעם בודקים קבוצה של [[18]] תלמידים ובפעם אחרת קבוצה של [[25]] תלמידים. מה נכון לגבי [[n]] בשני המקרים הנפרדים?"),
    options: [
      { id: "o0", content: authoredChoiceContent("הערך של [[n]] יכול להשתנות לפי הקבוצה שנבדקת") },
      { id: "o1", content: authoredChoiceContent("[[n]] חייב להיות שווה ל־[[18]] בכל מקרה"), misconceptionId: "ALG_VARIABLE:treats-variable-as-fixed-value", misconceptionRationale: "Treats the first observed value as a permanent value of the variable." },
      { id: "o2", content: authoredChoiceContent("[[n]] הוא שם של תלמיד"), misconceptionId: "ALG_VARIABLE:confuses-variable-with-label", misconceptionRationale: "Treats the algebraic symbol as a name or label rather than a quantity." },
      { id: "o3", content: authoredChoiceContent("[[n]] הוא סימן פעולה"), misconceptionId: "ALG_VARIABLE:reads-variable-as-operation", misconceptionRationale: "Interprets the variable symbol as an operation sign." },
    ],
    correctOptionId: "o0",
    tags: ["mvp", "curated", "wording-sensitive", "requires-rereview", "band:B"],
    version: 5,
  },
];

export const FOUNDATIONAL_QUESTIONS: SkillQuestionDefinition[] = [...GENERATED, ...SIGNED_CALCULATION_GENERATORS, ...REVIEWED_CONCEPT_GENERATORS, ...SIGNED_CONCEPT_GENERATORS, ...GLOBAL_AUTHORING_GENERATORS, ...SEMANTIC_EVIDENCE_GENERATORS, ...CURATED_WORDING_ITEMS];
