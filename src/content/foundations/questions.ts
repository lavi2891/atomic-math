import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import { ATOMIC_FACT_SKILL_VALUES, SIGNED_SKILL_INVARIANTS } from "./skillScope.ts";
import type { DifficultyBand } from "../catalog/types.ts";
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
  { skillId: "ALG_SUBSTITUTE", expr: "{c}*{a}+{b}", secondExpr: "{a}*{a}-{b}", structures: ["linear-substitution", "quadratic-substitution"], min: 1, max: 10 },
  { skillId: "EQ_ADD", expr: "{a}-{b}", secondExpr: "{a}+{b}", structures: ["inverse-addition-equation", "direct-addition-equation"], min: 1, max: 20 },
  { skillId: "EQ_MUL", expr: "{a}*{b}/{a}", secondExpr: "{a}*{b}/{b}", structures: ["solve-factor-by-first-quotient", "solve-factor-by-second-quotient"], min: 2, max: 10 },
];

function generator(recipe: GeneratorRecipe, band: DifficultyBand, alternate: boolean): GeneratedQuestionDefinition & { skillId: string } {
  const scale = band === "A" ? 1 : band === "B" ? 2 : band === "C" ? 4 : 6;
  const factFamily = recipe.skillId.startsWith("AR_MUL_F_") || recipe.skillId.startsWith("AR_DIV_F_");
  const reviewedBasicFacts = recipe.skillId === "AR_ADD_FACTS" || recipe.skillId === "AR_SUB_FACTS";
  const orderOfOperations = recipe.skillId === "OPS_ORDER_BASIC";
  const variableCoefficient = recipe.skillId === "ALG_SUBSTITUTE" && !alternate;
  const expr = alternate ? recipe.secondExpr : recipe.expr;
  const structure = recipe.structures[alternate ? 1 : 0];
  const constraints = recipe.constraints?.[alternate ? 1 : 0];
  const factBandRange = band === "A" ? { min: 1, max: 5 } : { min: 6, max: 10 };
  const omittedFactValues = Array.from(
    { length: recipe.max - recipe.min + 1 },
    (_, index) => recipe.min + index,
  ).filter((value) => factFamily && !recipe.factValues?.includes(value));
  return {
    id: `MVP_${recipe.skillId}_${band}_${alternate ? "B" : "A"}`,
    topicId: "FOUNDATIONS", skillId: recipe.skillId, kind: "generated", authoringMode: "generated", contentFamily: `${recipe.skillId}:${structure}`, category: "calculation", difficultyBand: band,
    exprTemplate: expr, promptTemplate: [{ kind: "text", value: "חשבו:" }, { kind: "math", latex: expr, display: true }],
    params: {
      a: { type: "integer", min: factFamily ? recipe.min : reviewedBasicFacts && band === "B" ? 10 : recipe.min * scale, max: factFamily ? recipe.max : reviewedBasicFacts ? (band === "A" ? 10 : recipe.max) : recipe.max * scale, exclude: factFamily ? omittedFactValues : undefined },
      ...(orderOfOperations || variableCoefficient ? { c: { type: "natural" as const, min: 2, max: 5 } } : {}),
      b: { type: "natural", min: orderOfOperations ? 1 : factFamily ? factBandRange.min : reviewedBasicFacts && band === "B" ? 10 : band === "A" ? 1 : 4, max: factFamily ? factBandRange.max : orderOfOperations ? 3 : reviewedBasicFacts && band === "A" ? 10 : Math.max(2, recipe.max) },
    },
    constraints,
    acceptedInputFormats: ["integer"], answerSemantics: { kind: "exact" }, structureKey: `${recipe.skillId}:${band}:${structure}`, variantGroup: recipe.skillId,
    difficultyModel: () => ({ A: 0.12, B: 0.38, C: 0.65, D: 0.9 })[band], metadata: { source: "foundational-mvp", band, feature: structure, difficultyFeature: reviewedBasicFacts || factFamily ? "magnitude" : "mixed" }, tags: ["mvp", "short-item", `band:${band}`], version: 1,
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
  { skillId: "INT_SUB", idPart: "NEG_MINUS_POS", family: "negative-minus-positive", signPattern: "negative-positive operand", exprTemplate: "(-{m})-{n}" },
  { skillId: "INT_SUB", idPart: "NEG_MINUS_NEG", family: "negative-minus-negative", signPattern: "negative-negative operand", exprTemplate: "(-{m})-(-{n})", constraints: ["m != n"] },
  { skillId: "INT_MUL", idPart: "NEG_POS", family: "negative-times-positive", signPattern: "negative×positive", exprTemplate: "(-{m})*{n}" },
  { skillId: "INT_MUL", idPart: "POS_NEG", family: "positive-times-negative", signPattern: "positive×negative", exprTemplate: "{m}*(-{n})" },
  { skillId: "INT_MUL", idPart: "NEG_NEG", family: "negative-times-negative", signPattern: "negative×negative", exprTemplate: "(-{m})*(-{n})" },
  { skillId: "INT_DIV", idPart: "NEG_POS", family: "negative-divided-by-positive", signPattern: "negative÷positive", exprTemplate: "(-({m}*{n}))/{m}" },
  { skillId: "INT_DIV", idPart: "POS_NEG", family: "positive-divided-by-negative", signPattern: "positive÷negative", exprTemplate: "({m}*{n})/(-{m})" },
  { skillId: "INT_DIV", idPart: "NEG_NEG", family: "negative-divided-by-negative", signPattern: "negative÷negative", exprTemplate: "(-({m}*{n}))/(-{m})" },
];

const SIGNED_CALCULATION_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = SIGNED_CALCULATION_FAMILIES.flatMap((family) => SIGNED_BANDS.map((band) => {
  const range = signedBandRange(band);
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
    params: { m: { type: "natural", ...range }, n: { type: "natural", ...range } },
    constraints: family.constraints,
    acceptedInputFormats: ["integer"],
    answerSemantics: { kind: "exact" },
    structureKey: `${family.skillId}:${band}:${family.family}`,
    variantGroup: `${family.skillId}:${family.family}`,
    difficultyModel: () => ({ A: 0.12, B: 0.38, C: 0.65, D: 0.9 })[band],
    metadata: { source: "signed-semantics-pass", band, feature: family.family, difficultyFeature: "magnitude", skillInvariant: SIGNED_SKILL_INVARIANTS[family.skillId], signPattern: family.signPattern },
    tags: ["mvp", "signed-structure", "requires-rereview", `band:${band}`],
    version: 3,
  };
}));

function sampledInteger(params: SampledParams, name: string): number {
  const sampled = params[name];
  if (!sampled || sampled.value.den !== 1n) throw new Error(`Expected integer parameter ${name}`);
  return Number(sampled.value.num);
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
  skillInvariant?: string;
  signPattern?: string;
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
    choiceBuilder: input.choiceBuilder,
    generatedType: input.generatedType ?? "singleChoice",
    structureKey: `${input.skillId}:${input.band}:${input.family}`,
    variantGroup: `${input.skillId}:${input.family}`,
    difficultyModel: () => ({ A: 0.12, B: 0.38, C: 0.65, D: 0.9 })[input.band],
    metadata: { source: "human-review-pass-1", band: input.band, feature: input.family, difficultyFeature: input.difficultyFeature ?? "structure", skillInvariant: input.skillInvariant ?? SIGNED_SKILL_INVARIANTS[input.skillId], signPattern: input.signPattern ?? (SIGNED_SKILL_INVARIANTS[input.skillId] ? input.family : undefined) },
    tags: ["mvp", "generated-concept", "requires-rereview", `band:${input.band}`],
    version: 2,
  };
}

const PLACE_VALUE_GENERATORS = ([
  { band: "A", family: "identify-digit-value", category: "conceptual", expr: "10*{a}+{b}", params: { a: { type: "natural", min: 1, max: 9 }, b: { type: "integer", min: 0, max: 9 } }, constraints: ["a != b"], place: 10 },
  { band: "B", family: "identify-digit-value", category: "representation", expr: "100*{a}+10*{b}+{c}", params: { a: { type: "natural", min: 1, max: 9 }, b: { type: "natural", min: 1, max: 9 }, c: { type: "integer", min: 0, max: 9 } }, constraints: ["a != b", "b != c"], place: 100 },
  { band: "C", family: "identify-digit-value", category: "representation", expr: "1000*{a}+100*{b}+10*{c}+{d}", params: { a: { type: "natural", min: 1, max: 9 }, b: { type: "integer", min: 0, max: 9 }, c: { type: "integer", min: 0, max: 9 }, d: { type: "integer", min: 0, max: 9 } }, constraints: ["a != b"], place: 1000 },
] as const).map((recipe) => conceptualGenerator({
  id: `MVP_AR_PLACE_VALUE_GEN_${recipe.band}`,
  skillId: "AR_PLACE_VALUE", family: recipe.family, category: recipe.category, band: recipe.band,
  exprTemplate: recipe.expr, params: recipe.params, constraints: [...recipe.constraints], difficultyFeature: "magnitude",
  choiceBuilder: (params) => {
    const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b");
    const c = params.c ? sampledInteger(params, "c") : 0; const d = params.d ? sampledInteger(params, "d") : 0;
    const number = recipe.band === "A" ? 10 * a + b : recipe.band === "B" ? 100 * a + 10 * b + c : 1000 * a + 100 * b + 10 * c + d;
    const digit = a; const value = digit * recipe.place;
    return generatedChoiceDraft("AR_PLACE_VALUE", `מה הערך של הספרה [[${digit}]] במספר [[${number}]]?`, [
      { value: `${value}`, correct: true, misconception: "identifies-place-value" },
      { value: `${digit}`, misconception: "ignores-place-or-direction" },
      { value: `${digit * (recipe.place === 10 ? 100 : recipe.place / 10)}`, misconception: "uses-adjacent-value" },
      { value: "0", misconception: "uses-irrelevant-value" },
    ], number);
  },
}));

function basicFactConceptGenerators(skillId: "AR_ADD_FACTS" | "AR_SUB_FACTS"): Array<GeneratedQuestionDefinition & { skillId: string }> {
  return (["A", "B"] as DifficultyBand[]).flatMap((band) => {
    const range = band === "A" ? { min: 2, max: 9 } : { min: 10, max: 20 };
    const common = { a: { type: "natural" as const, ...range }, b: { type: "natural" as const, ...range } };
    if (skillId === "AR_ADD_FACTS") return [
      conceptualGenerator({ id: `MVP_AR_ADD_FACTS_MISSING_${band}`, skillId, family: "missing-addend", category: "conceptual", band, exprTemplate: "{a}+{b}", params: common, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft(skillId, `איזה מספר חסר? [[${a} + □ = ${a + b}]]`, [{ value: `${b}`, correct: true, misconception: "inverse-operation" }, { value: `${a}`, misconception: "reuses-visible-value" }, { value: `${-b}`, misconception: "sign-confusion" }, { value: `${a + b}`, misconception: "uses-result-as-missing-value" }], a + b); } }),
      conceptualGenerator({ id: `MVP_AR_ADD_FACTS_COMMUTE_${band}`, skillId, family: "commutative-equivalence", category: "reasoning", band, exprTemplate: "{a}+{b}={b}+{a}", params: common, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft(skillId, `איזה ביטוי שווה ל־[[${a} + ${b}]]?`, [{ value: `${b} + ${a}`, correct: true, misconception: "commutative-relationship" }, { value: `${a} - ${b}`, misconception: "confuses-operation-or-symbol" }, { value: `${b} - ${a}`, misconception: "reverses-logical-direction" }, { value: `${a} + ${a}`, misconception: "reuses-visible-value" }], a); } }),
    ];
    return [
      conceptualGenerator({ id: `MVP_AR_SUB_FACTS_REMOVE_${band}`, skillId, family: "subtraction-as-removal", category: "conceptual", band, exprTemplate: "{a}+{b}-{b}", params: common, difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b; return generatedChoiceDraft(skillId, `היו ${total} פריטים והוציאו ${b}. כמה נשארו?`, [{ value: `${a}`, correct: true, misconception: "subtraction-as-removal" }, { value: `${-a}`, misconception: "sign-confusion" }, { value: `${total}`, misconception: "ignores-operation" }, { value: `${total + 1}`, misconception: "off-by-one-generalization" }], total); } }),
      conceptualGenerator({ id: `MVP_AR_SUB_FACTS_INVERSE_${band}`, skillId, family: "inverse-addition-check", category: "reasoning", band, exprTemplate: "({a}+{b})-{b}={a}", params: common, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b; return generatedChoiceDraft(skillId, `באיזה תרגיל חיבור אפשר לבדוק ש־[[${total} - ${b} = ${a}]]?`, [{ value: `${a} + ${b} = ${total}`, correct: true, misconception: "inverse-operation" }, { value: `${total} + ${b} = ${a}`, misconception: "reverses-logical-direction" }, { value: `${a} + ${total} = ${b}`, misconception: "reorders-roles" }, { value: `${total} - ${a} = ${b}`, misconception: "uses-same-operation" }], total + b); } }),
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
      id: `MVP_${skillId}_CONTEXT_${band}`, skillId, family: "concrete-equal-groups", category: band === "A" ? "conceptual" : "reasoning", band, exprTemplate: "{a}*{b}", params, constraints: ["a != 2 || b != 2"], difficultyFeature: "magnitude",
      choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const product = a * b; const contexts = [["שקיות", "שקית", "כדורים"], ["קופסאות", "קופסה", "פריטים"], ["מדפים", "מדף", "ספרים"]] as const; const [groups, group, items] = contexts[(a + b) % contexts.length]!; return generatedChoiceDraft(skillId, `יש ${a} ${groups}, ובכל ${group} ${b} ${items}. איזה תרגיל מתאים למציאת המספר הכולל?`, [{ value: `${a} × ${b}`, correct: true, misconception: "equal-groups-product" }, { value: `${a} + ${b}`, misconception: "uses-addition-for-equal-groups" }, { value: `${product} ÷ ${a}`, misconception: "uses-inverse-operation" }, { value: `${product} - ${b}`, misconception: "confuses-operation-or-symbol" }], product); },
    })];
    return ["equal-sharing", "grouping"].map((meaning) => conceptualGenerator({
      id: `MVP_${skillId}_${meaning === "equal-sharing" ? "SHARING" : "GROUPING"}_${band}`, skillId, family: meaning, category: meaning === "equal-sharing" ? "conceptual" : "reasoning", band, exprTemplate: "({a}*{b})/{a}", params, constraints: ["a != b"], difficultyFeature: "magnitude",
      choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const product = a * b; const prompt = meaning === "equal-sharing" ? `${product} כדורים מחלקים שווה בשווה בין ${a} ילדים. כמה יקבל כל ילד?` : `יש ${product} כדורים. מכניסים ${a} כדורים בכל שקית. לכמה שקיות הם יספיקו?`; return generatedChoiceDraft(skillId, prompt, [{ value: `${b}`, correct: true, misconception: meaning }, { value: `${a}`, misconception: "reverses-divisor-and-quotient" }, { value: `${product}`, misconception: "uses-dividend-as-answer" }, { value: `${product - a}`, misconception: "subtracts-once" }], product + (meaning === "equal-sharing" ? 0 : 1)); },
    }));
  });
});

const FACTORS_MULTIPLES_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => conceptualGenerator({
  id: `MVP_AR_FACTORS_MULTIPLES_MULTI_${band}`, skillId: "AR_FACTORS_MULTIPLES", family: "identify-multiples", category: index % 2 ? "reasoning" : "conceptual", band, exprTemplate: "{a}*{b}", generatedType: "multiChoice",
  params: { a: { type: "natural", min: [2, 6, 11][index]!, max: [5, 10, 16][index]! }, b: { type: "natural", min: 2, max: 6 } }, difficultyFeature: "magnitude",
  choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("AR_FACTORS_MULTIPLES", `איזה מהמספרים הבאים הם כפולות של [[${a}]]? סמנו את כל התשובות הנכונות.`, [{ value: `${a * b}`, correct: true, misconception: "multiple-as-product" }, { value: `${a * (b + 1)}`, correct: true, misconception: "next-multiple" }, { value: `${a * b + 1}`, misconception: "off-by-one-generalization" }, { value: `${a * (b + 1) + 1}`, misconception: "adjacent-to-multiple" }], a + b, true); },
}));

const NUMBER_LINE_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => {
  const ranges = [{ min: 1, max: 6 }, { min: 7, max: 15 }, { min: 16, max: 30 }]; const range = ranges[index]!;
  return conceptualGenerator({ id: `MVP_INT_NUMBER_LINE_LEFT_${band}`, skillId: "INT_NUMBER_LINE", family: "left-of-zero", category: index % 2 ? "conceptual" : "representation", band, exprTemplate: "-{n}", params: { context: { type: "integer", min: 0, max: 2 }, n: { type: "natural", ...range } }, difficultyFeature: "magnitude", choiceBuilder: (params) => { const n = sampledInteger(params, "n"); return generatedChoiceDraft("INT_NUMBER_LINE", `איזה מספר נמצא ${n} צעדים משמאל לאפס על ציר המספרים?`, [{ value: `${-n}`, correct: true, misconception: "left-is-negative" }, { value: `${n}`, misconception: "reverses-representation" }, { value: "0", misconception: "uses-origin" }, { value: `${-(n + 1)}`, misconception: "off-by-one-generalization" }], n); } });
});

const FRACTION_MEANING_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => {
  const max = [6, 10, 16][index]!;
  return conceptualGenerator({ id: `MVP_FRAC_MEANING_PARTS_${band}`, skillId: "FRAC_MEANING", family: "selected-equal-parts", category: index % 2 ? "conceptual" : "representation", band, exprTemplate: "{b}/{a}", params: { a: { type: "natural", min: 3 + index * 2, max }, b: { type: "natural", min: 1, max: max - 1 } }, constraints: ["b < a"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const contexts = [["שלם", "חולק"], ["מלבן", "חולק"], ["עוגה", "חולקה"]] as const; const [context, verb] = contexts[(a + b) % contexts.length]!; return generatedChoiceDraft("FRAC_MEANING", `${context} ${verb} ל־${a} חלקים שווים ונבחרו ${b} חלקים. איזה שבר מתאר את החלק שנבחר?`, [{ value: `${b}/${a}`, correct: true, misconception: "part-over-whole" }, { value: `${a}/${b}`, misconception: "reverses-representation" }, { value: `${b}/${a + 1}`, misconception: "changes-whole-size" }, { value: `${b + 1}/${a}`, misconception: "off-by-one-generalization" }], a + b); } });
});

const FRACTION_EQUIVALENCE_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).flatMap((band, index) => {
  const params: ParamsSpec = { a: { type: "natural", min: [1, 5, 9][index]!, max: [4, 8, 12][index]! }, b: { type: "natural", min: [3, 7, 11][index]!, max: [6, 10, 14][index]! }, c: { type: "natural", min: 2, max: 5 } };
  return [
    conceptualGenerator({ id: `MVP_FRAC_EQUIV_FORWARD_${band}`, skillId: "FRAC_EQUIV", family: "expand-equivalent-fraction", category: "representation", band, exprTemplate: "({a}*{c})/({b}*{c})={a}/{b}", params, constraints: ["a < b"], difficultyFeature: "magnitude", choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const c = sampledInteger(sampled, "c"); return generatedChoiceDraft("FRAC_EQUIV", `איזה שבר שווה ל־[[${a}/${b}]]?`, [{ value: `${a * c}/${b * c}`, correct: true, misconception: "scales-both-parts" }, { value: `${a * c}/${b}`, misconception: "scales-numerator-only" }, { value: `${a}/${b * c}`, misconception: "scales-denominator-only" }, { value: `${a + c}/${b + c}`, misconception: "adds-to-both-parts" }], a + b + c); } }),
    conceptualGenerator({ id: `MVP_FRAC_EQUIV_REVERSE_${band}`, skillId: "FRAC_EQUIV", family: "simplify-equivalent-fraction", category: "reasoning", band, exprTemplate: "({a}*{c})/({b}*{c})={a}/{b}", params, constraints: ["a < b"], difficultyFeature: "magnitude", choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const c = sampledInteger(sampled, "c"); return generatedChoiceDraft("FRAC_EQUIV", `איזה שבר הוא הצמצום של [[${a * c}/${b * c}]]?`, [{ value: `${a}/${b}`, correct: true, misconception: "divides-both-parts" }, { value: `${a * c}/${b}`, misconception: "simplifies-denominator-only" }, { value: `${a}/${b * c}`, misconception: "simplifies-numerator-only" }, { value: `${a + c}/${b + c}`, misconception: "subtracts-common-factor" }], a * b * c); } }),
  ];
});

const ORDER_OF_OPERATIONS_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => conceptualGenerator({
  id: `MVP_OPS_ORDER_BASIC_FIRST_${band}`, skillId: "OPS_ORDER_BASIC", family: "identify-first-operation", category: index % 2 ? "reasoning" : "conceptual", band, exprTemplate: "{a}+{b}*{c}", params: { a: { type: "natural", min: [2, 9, 17][index]!, max: [8, 16, 26][index]! }, b: { type: "natural", min: 2, max: 8 }, c: { type: "natural", min: 2, max: 6 } }, difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const c = sampledInteger(params, "c"); return generatedChoiceDraft("OPS_ORDER_BASIC", `איזו פעולה מבצעים קודם בתרגיל [[${a} + ${b} × ${c}]]?`, [{ value: "כפל", correct: true, misconception: "multiplication-before-addition" }, { value: "חיבור", misconception: "works-left-to-right" }, { value: "את שתי הפעולות יחד", misconception: "no-operation-order" }, { value: "אי אפשר לדעת", misconception: "requires-parentheses" }], a + b + c); } }));

const REVIEWED_CONCEPT_GENERATORS: Array<GeneratedQuestionDefinition & { skillId: string }> = [
  ...PLACE_VALUE_GENERATORS,
  ...basicFactConceptGenerators("AR_ADD_FACTS"),
  ...basicFactConceptGenerators("AR_SUB_FACTS"),
  ...FACT_CONTEXT_GENERATORS,
  ...FACTORS_MULTIPLES_GENERATORS,
  ...NUMBER_LINE_GENERATORS,
  ...FRACTION_MEANING_GENERATORS,
  ...FRACTION_EQUIVALENCE_GENERATORS,
  ...ORDER_OF_OPERATIONS_GENERATORS,
];

function misconceptionPattern(skillId: string, category: QuestionCategory, ordinal: number): string {
  const patterns = category === "representation"
    ? ["reverses-representation", "ignores-place-or-direction", "uses-adjacent-value"]
    : category === "reasoning"
      ? ["applies-operation-without-relationship", "reverses-logical-direction", "accepts-surface-match"]
      : ["confuses-operation-or-symbol", "uses-irrelevant-value", "off-by-one-generalization"];
  return `${skillId}:${patterns[ordinal % patterns.length]}`;
}

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
};

function misconceptionRationale(id: string): string {
  return misconceptionRationales[id.slice(id.indexOf(":") + 1)] ?? "Plausible misconception requiring author review.";
}

const GLOBAL_BANDS: DifficultyBand[] = ["A", "B", "C"];
const globalBandRange = (band: DifficultyBand) => band === "A" ? { min: 2, max: 6 } : band === "B" ? { min: 7, max: 15 } : { min: 16, max: 30 };
const globalCategory = (band: DifficultyBand): QuestionCategory => band === "A" ? "conceptual" : "reasoning";

const GLOBAL_AUTHORING_GENERATORS = GLOBAL_BANDS.flatMap((band) => {
  const range = globalBandRange(band);
  const pairParams: ParamsSpec = { a: { type: "natural", ...range }, b: { type: "natural", ...range } };
  const singleParams: ParamsSpec = { context: { type: "integer", min: 0, max: 2 }, n: { type: "natural", ...range } };
  const category = globalCategory(band);
  const equalityFamily = band === "A" ? "additive-identity-equality" : band === "B" ? "commutative-equality" : "inverse-operation-equality";
  const equalityTemplate = band === "A" ? "({a}+{b})+0={a}+{b}" : band === "B" ? "{a}+{b}={b}+{a}" : "({a}+{b})-{b}={a}";
  const variableFamily = band === "A" ? "identify-variable" : band === "B" ? "distinguish-variable-and-coefficient" : "variable-effect-in-linear-expression";
  const variableTemplate = band === "C" ? "{n}x+1" : "{n}x";
  const substituteFamily = band === "A" ? "substitute-one-term" : band === "B" ? "substitute-two-term" : "substitute-parenthesized-expression";
  const substituteTemplate = band === "A" ? "{a}*{x}" : band === "B" ? "{a}*{x}+{b}" : "{a}*({x}+{b})";
  const equationAddFamily = band === "A" ? "missing-addend-left" : band === "B" ? "reversed-equality-missing-addend" : "missing-minuend";
  const equationAddTemplate = band === "A" ? "{a}+{b}={a}+{b}" : band === "B" ? "{a}+{b}={a}+{b}" : "({a}+{b})-{b}={a}";
  const equationMulFamily = band === "A" ? "missing-factor-left" : band === "B" ? "reversed-equality-missing-factor" : "missing-divisor";
  const equationMulTemplate = band === "C" ? "({a}*{b})/{b}={a}" : "{a}*{b}={a}*{b}";
  return [
    conceptualGenerator({ id: `MVP_INT_COMPARE_ADJACENT_NEGATIVES_${band}`, skillId: "INT_COMPARE", family: "compare-adjacent-negatives", category, band, exprTemplate: "-{n}>-({n}+1)", params: singleParams, difficultyFeature: "magnitude", choiceBuilder: (params) => { const n = sampledInteger(params, "n"); return generatedChoiceDraft("INT_COMPARE", `השוו בין [[${-n}]] לבין [[${-(n + 1)}]].`, [{ value: ">", correct: true, misconception: "closer-to-zero-is-greater" }, { value: "<", misconception: "larger-absolute-value-is-greater" }, { value: "=", misconception: "ignores-unit-difference" }, { value: "אי אפשר לדעת", misconception: "avoids-signed-comparison" }], n); } }),
    ...([1, -1] as const).map((sign) => conceptualGenerator({ id: `MVP_INT_NEGATION_${sign === 1 ? "POSITIVE" : "NEGATIVE"}_${band}`, skillId: "INT_NEGATION", family: sign === 1 ? "opposite-of-positive" : "opposite-of-negative", category, band, exprTemplate: sign === 1 ? "-({n})" : "-(-{n})", params: singleParams, difficultyFeature: "magnitude", choiceBuilder: (params) => { const n = sampledInteger(params, "n"); const shown = sign * n; return generatedChoiceDraft("INT_NEGATION", `מהו המספר הנגדי של [[${shown}]]?`, [{ value: `${-shown}`, correct: true, misconception: "changes-sign" }, { value: `${shown}`, misconception: "keeps-original-sign" }, { value: "0", misconception: "confuses-opposite-with-zero" }, { value: `${-shown + sign}`, misconception: "off-by-one-generalization" }], n + sign); } })),
    conceptualGenerator({ id: `MVP_INT_ADD_OPPOSITES_${band}`, skillId: "INT_ADD", family: "opposites-result-zero", category, band, exprTemplate: "(-{n})+{n}", params: singleParams, difficultyFeature: "magnitude", signPattern: "opposites; result zero", choiceBuilder: (params) => { const n = sampledInteger(params, "n"); return generatedChoiceDraft("INT_ADD", `מה התוצאה של [[(−${n}) + ${n}]]?`, [{ value: "0", correct: true, misconception: "opposites-sum-to-zero" }, { value: `${n}`, misconception: "ignores-negative-addend" }, { value: `${-n}`, misconception: "follows-first-sign" }, { value: `${2 * n}`, misconception: "adds-absolute-values" }], n); } }),
    conceptualGenerator({ id: `MVP_INT_SUB_NEGATIVE_REWRITE_${band}`, skillId: "INT_SUB", family: "subtract-negative-as-addition", category, band, exprTemplate: "{a}-(-{b})={a}+{b}", params: pairParams, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("INT_SUB", `איזה ביטוי שווה ל־[[${a} − (−${b})]]?`, [{ value: `${a} + ${b}`, correct: true, misconception: "subtracting-negative-becomes-addition" }, { value: `${a} - ${b}`, misconception: "drops-parenthesized-sign" }, { value: `−${a} - ${b}`, misconception: "negates-minuend" }, { value: `${b} - ${a}`, misconception: "reverses-subtraction" }], a + b); } }),
    conceptualGenerator({ id: `MVP_INT_MUL_SIGN_${band}`, skillId: "INT_MUL", family: "negative-times-positive-sign", category, band, exprTemplate: "(-{a})*{b}", params: pairParams, difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("INT_MUL", `מה הסימן של [[(−${a}) × ${b}]]?`, [{ value: "שלילי", correct: true, misconception: "one-negative-factor" }, { value: "חיובי", misconception: "ignores-negative-factor" }, { value: "אפס", misconception: "confuses-sign-with-zero" }, { value: "אי אפשר לדעת", misconception: "avoids-sign-rule" }], a + b); } }),
    conceptualGenerator({ id: `MVP_INT_DIV_SIGN_${band}`, skillId: "INT_DIV", family: "negative-divided-by-negative-sign", category, band, exprTemplate: "(-({a}*{b}))/(-{a})", params: pairParams, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("INT_DIV", `מה הסימן של [[(−${a * b}) ÷ (−${a})]]?`, [{ value: "חיובי", correct: true, misconception: "two-negative-signs" }, { value: "שלילי", misconception: "keeps-one-negative-sign" }, { value: "אפס", misconception: "confuses-sign-with-zero" }, { value: "אי אפשר לדעת", misconception: "avoids-sign-rule" }], a + b); } }),
    conceptualGenerator({ id: `MVP_ALG_EQUALITY_${band}`, skillId: "ALG_EQUALITY", family: equalityFamily, category, band, exprTemplate: equalityTemplate, params: pairParams, constraints: ["a != b"], difficultyFeature: "structure", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const specs: ChoiceSpec[] = band === "A" ? [{ value: `(${a} + ${b}) + 0 = ${a} + ${b}`, correct: true, misconception: "additive-identity" }, { value: `(${a} + ${b}) + 0 = 0`, misconception: "misuses-additive-identity" }, { value: `(${a} + ${b}) + 1 = ${a} + ${b}`, misconception: "ignores-added-value" }, { value: `0 - (${a} + ${b}) = ${a} + ${b}`, misconception: "confuses-operation-or-symbol" }] : band === "B" ? [{ value: `${a} + ${b} = ${b} + ${a}`, correct: true, misconception: "commutative-equality" }, { value: `${a} + ${b} = ${a + b + 1}`, misconception: "accepts-near-result" }, { value: `${a} - ${b} = ${b} - ${a}`, misconception: "overgeneralizes-commutativity" }, { value: `${a} + 0 = 0`, misconception: "misuses-additive-identity" }] : [{ value: `(${a} + ${b}) - ${b} = ${a}`, correct: true, misconception: "inverse-operation" }, { value: `(${a} + ${b}) - ${a} = ${a}`, misconception: "reuses-visible-value" }, { value: `${a} + ${b} = ${a}`, misconception: "ignores-added-value" }, { value: `${a} - ${b} = ${b} - ${a}`, misconception: "overgeneralizes-commutativity" }]; return generatedChoiceDraft("ALG_EQUALITY", "איזה משפט שוויון נכון?", specs, a + b); } }),
    conceptualGenerator({ id: `MVP_ALG_VARIABLE_${band}`, skillId: "ALG_VARIABLE", family: variableFamily, category, band, exprTemplate: variableTemplate, params: singleParams, difficultyFeature: "structure", choiceBuilder: (params) => { const n = sampledInteger(params, "n"); if (band === "A") return generatedChoiceDraft("ALG_VARIABLE", `בביטוי [[${n}x]], מה תפקידה של [[x]]?`, [{ value: "משתנה שמייצג מספר", correct: true, misconception: "variable-can-vary" }, { value: "סימן כפל בלבד", misconception: "reads-variable-as-operation" }, { value: `המספר [[${n}]]`, misconception: "confuses-variable-with-coefficient" }, { value: "סימן שוויון", misconception: "confuses-algebraic-symbols" }], n); if (band === "B") return generatedChoiceDraft("ALG_VARIABLE", `בביטוי [[${n}x]], מהו המקדם של [[x]]?`, [{ value: `${n}`, correct: true, misconception: "identifies-coefficient" }, { value: "x", misconception: "confuses-variable-with-coefficient" }, { value: "1", misconception: "assumes-unit-coefficient" }, { value: `${n + 1}`, misconception: "off-by-one-generalization" }], n); return generatedChoiceDraft("ALG_VARIABLE", `בביטוי [[${n}x + 1]], מה עשוי להשתנות כאשר הערך של [[x]] משתנה?`, [{ value: "ערך הביטוי", correct: true, misconception: "variable-affects-expression" }, { value: `המקדם [[${n}]]`, misconception: "changes-coefficient" }, { value: "סימן החיבור", misconception: "changes-operation" }, { value: "המספר הקבוע", misconception: "changes-constant" }], n); } }),
    conceptualGenerator({ id: `MVP_ALG_SUBSTITUTE_${band}`, skillId: "ALG_SUBSTITUTE", family: substituteFamily, category, band, exprTemplate: substituteTemplate, params: { a: { type: "natural", min: 2, max: 5 }, x: { type: "natural", ...range }, b: { type: "natural", min: 1, max: 6 } }, constraints: ["a != x", "b != x", "a * x != a + x"], difficultyFeature: "structure", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const x = sampledInteger(params, "x"); const b = sampledInteger(params, "b"); const shown = band === "A" ? `${a}x` : band === "B" ? `${a}x + ${b}` : `${a}(x + ${b})`; const specs: ChoiceSpec[] = band === "A" ? [{ value: `${a} × ${x}`, correct: true, misconception: "substitutes-variable-value" }, { value: `${a} + ${x}`, misconception: "replaces-coefficient-multiplication-with-addition" }, { value: `${x}`, misconception: "drops-coefficient" }, { value: `${a}`, misconception: "uses-coefficient-only" }] : band === "B" ? [{ value: `${a} × ${x} + ${b}`, correct: true, misconception: "substitutes-variable-value" }, { value: `${a} + ${x} + ${b}`, misconception: "replaces-coefficient-multiplication-with-addition" }, { value: `${x} + ${b}`, misconception: "drops-coefficient" }, { value: `${a} × ${b} + ${x}`, misconception: "substitutes-into-wrong-position" }] : [{ value: `${a} × (${x} + ${b})`, correct: true, misconception: "substitutes-variable-value" }, { value: `${a} × ${x} + ${b}`, misconception: "ignores-parentheses" }, { value: `${a} + ${x} + ${b}`, misconception: "replaces-multiplication-with-addition" }, { value: `(${a} + ${b}) × ${x}`, misconception: "substitutes-into-wrong-position" }]; return generatedChoiceDraft("ALG_SUBSTITUTE", `אם [[x = ${x}]], איזה ביטוי מתקבל לאחר הצבה ב־[[${shown}]]?`, specs, a + x + b); } }),
    conceptualGenerator({ id: `MVP_EQ_ADD_${band}`, skillId: "EQ_ADD", family: equationAddFamily, category, band, exprTemplate: equationAddTemplate, params: pairParams, constraints: ["a != b"], difficultyFeature: "structure", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b; const equation = band === "A" ? `□ + ${b} = ${total}` : band === "B" ? `${total} = ${a} + □` : `□ - ${b} = ${a}`; const answer = band === "B" ? b : band === "C" ? total : a; return generatedChoiceDraft("EQ_ADD", `איזה ערך משלים את השוויון [[${equation}]]?`, [{ value: `${answer}`, correct: true, misconception: "inverse-addition" }, { value: `${band === "C" ? a : total}`, misconception: "uses-result-as-unknown" }, { value: `${band === "B" ? a : b}`, misconception: "reuses-visible-addend" }, { value: `${total + 1}`, misconception: "off-by-one-generalization" }], total); } }),
    conceptualGenerator({ id: `MVP_EQ_MUL_${band}`, skillId: "EQ_MUL", family: equationMulFamily, category, band, exprTemplate: equationMulTemplate, params: pairParams, constraints: ["a != b"], difficultyFeature: "structure", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const product = a * b; const equation = band === "A" ? `□ × ${b} = ${product}` : band === "B" ? `${product} = ${a} × □` : `${product} ÷ □ = ${a}`; const answer = band === "A" ? a : b; return generatedChoiceDraft("EQ_MUL", `איזה ערך משלים את השוויון [[${equation}]]?`, [{ value: `${answer}`, correct: true, misconception: "inverse-multiplication" }, { value: `${band === "A" ? b : a}`, misconception: "reuses-visible-factor" }, { value: `${product}`, misconception: "uses-product-as-factor" }, { value: `${a + b}`, misconception: "adds-instead-of-dividing" }], product); } }),
  ];
});

const CURATED_WORDING_ITEMS: SkillQuestionDefinition[] = [{
  id: "MVP_ALG_VARIABLE_MEANING_CURATED",
  topicId: "FOUNDATIONS",
  skillId: "ALG_VARIABLE",
  type: "singleChoice",
  authoringMode: "curated",
  contentFamily: "ALG_VARIABLE:contextual-variable-meaning",
  curationReason: "deliberate-example" satisfies QuestionCurationReason,
  curationJustificationHe: "הניסוח עצמו בודק את משמעות המשתנה בהקשר, ללא ערכים מספריים שרירותיים.",
  category: "reasoning",
  difficultyBand: "A",
  difficulty: 0.12,
  prompt: authoredStudentContent("אם המשתנה [[n]] מייצג את מספר התלמידים בקבוצה, מה יכול להשתנות?"),
  options: ["הערך של [[n]]", "האות [[n]] עצמה", "סימן השוויון", "שם הקבוצה"].map((value, index) => ({ id: `o${index}`, content: authoredChoiceContent(value), misconceptionId: index === 0 ? undefined : misconceptionPattern("ALG_VARIABLE", "reasoning", index), misconceptionRationale: index === 0 ? undefined : misconceptionRationale(misconceptionPattern("ALG_VARIABLE", "reasoning", index)) })),
  correctOptionId: "o0",
  tags: ["mvp", "curated", "wording-sensitive", "requires-rereview", "band:A"],
  version: 2,
}];

export const FOUNDATIONAL_QUESTIONS: SkillQuestionDefinition[] = [...GENERATED, ...SIGNED_CALCULATION_GENERATORS, ...REVIEWED_CONCEPT_GENERATORS, ...GLOBAL_AUTHORING_GENERATORS, ...CURATED_WORDING_ITEMS];
