import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import type { DifficultyBand } from "../catalog/types.ts";
import type { GeneratedChoiceDraft, GeneratedQuestionDefinition, ParamsSpec, SampledParams } from "../../domain/questions/generator/types.ts";
import type { QuestionCategory } from "../../domain/questions/categories.ts";
import type { ChoiceOption, QuestionCurationReason } from "../../domain/questions/types.ts";

type GeneratorRecipe = { skillId: string; expr: string; secondExpr: string; structures: [string, string]; min: number; max: number; factValues?: number[]; constraints?: [string[], string[]] };

const factFamilies: Record<string, number[]> = {
  AR_MUL_F_2_5_10: [2, 5, 10], AR_MUL_F_3_4: [3, 4], AR_MUL_F_6_7: [6, 7], AR_MUL_F_8_9: [8, 9],
  AR_DIV_F_2_5_10: [2, 5, 10], AR_DIV_F_3_4: [3, 4], AR_DIV_F_6_7: [6, 7], AR_DIV_F_8_9: [8, 9],
};

const recipes: GeneratorRecipe[] = [
  { skillId: "AR_ADD_FACTS", expr: "{a}+{b}", secondExpr: "{a}+{b}+1", structures: ["two-addend-sum", "related-three-addend-sum"], min: 0, max: 20 },
  { skillId: "AR_SUB_FACTS", expr: "{a}-{b}", secondExpr: "{a}+1-{b}", structures: ["nonnegative-difference", "adjusted-minuend-difference"], min: 0, max: 20, constraints: [["a >= b"], ["a + 1 >= b"]] },
  ...Object.entries(factFamilies).map(([skillId, factValues]) => ({ skillId, expr: skillId.includes("_MUL_") ? "{a}*{b}" : "{a}*{b}/{a}", secondExpr: skillId.includes("_MUL_") ? "{b}*{a}" : "({a}*{b})/{a}", structures: skillId.includes("_MUL_") ? ["fact-family-product", "commuted-product"] : ["exact-fact-family-quotient", "grouping-preserving-quotient"], min: Math.min(...factValues), max: Math.max(...factValues), factValues } as GeneratorRecipe)),
  { skillId: "AR_FACTORS_MULTIPLES", expr: "{a}*{b}", secondExpr: "{a}*({b}+1)", structures: ["multiple-as-product", "next-multiple-as-product"], min: 2, max: 12 },
  { skillId: "OPS_ORDER_BASIC", expr: "{a}+{b}*2", secondExpr: "{a}*2+{b}", structures: ["multiplication-before-leading-addition", "multiplication-before-trailing-addition"], min: 1, max: 12 },
  { skillId: "INT_ADD", expr: "{a}+{b}", secondExpr: "-{a}+{b}", structures: ["signed-sum", "negated-first-addend"], min: -12, max: 12 },
  { skillId: "INT_SUB", expr: "{a}-{b}", secondExpr: "-{a}-{b}", structures: ["signed-difference", "negative-minuend-difference"], min: -12, max: 12 },
  { skillId: "INT_MUL", expr: "{a}*{b}", secondExpr: "-{a}*{b}", structures: ["signed-product", "negated-first-factor"], min: -10, max: 10 },
  { skillId: "INT_DIV", expr: "{a}*{b}/{a}", secondExpr: "-{a}*{b}/{a}", structures: ["exact-signed-quotient", "negated-dividend-quotient"], min: -10, max: 10 },
  { skillId: "ALG_SUBSTITUTE", expr: "2*{a}+{b}", secondExpr: "{a}*{a}-{b}", structures: ["linear-substitution", "quadratic-substitution"], min: 1, max: 10 },
  { skillId: "EQ_ADD", expr: "{a}-{b}", secondExpr: "{a}+{b}", structures: ["inverse-addition-equation", "direct-addition-equation"], min: 1, max: 20 },
  { skillId: "EQ_MUL", expr: "{a}*{b}/{a}", secondExpr: "{a}*{b}/{b}", structures: ["solve-factor-by-first-quotient", "solve-factor-by-second-quotient"], min: 2, max: 10 },
];

function generator(recipe: GeneratorRecipe, band: DifficultyBand, alternate: boolean): GeneratedQuestionDefinition & { skillId: string } {
  const scale = band === "A" ? 1 : band === "B" ? 2 : band === "C" ? 4 : 6;
  const factFamily = recipe.skillId.startsWith("AR_MUL_F_") || recipe.skillId.startsWith("AR_DIV_F_");
  const reviewedBasicFacts = recipe.skillId === "AR_ADD_FACTS" || recipe.skillId === "AR_SUB_FACTS";
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
      a: { type: "integer", min: factFamily ? recipe.min : reviewedBasicFacts && band === "B" ? 10 : recipe.min * scale, max: factFamily ? recipe.max : reviewedBasicFacts ? (band === "A" ? 10 : recipe.max) : recipe.max * scale, exclude: factFamily ? omittedFactValues : ["INT_MUL", "INT_DIV"].includes(recipe.skillId) ? [0] : undefined },
      b: { type: "natural", min: factFamily ? factBandRange.min : reviewedBasicFacts && band === "B" ? 10 : band === "A" ? 1 : 4, max: factFamily ? factBandRange.max : reviewedBasicFacts && band === "A" ? 10 : Math.max(2, recipe.max) },
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

function sampledInteger(params: SampledParams, name: string): number {
  const sampled = params[name];
  if (!sampled || sampled.value.den !== 1n) throw new Error(`Expected integer parameter ${name}`);
  return Number(sampled.value.num);
}

type ChoiceSpec = { value: string; correct?: boolean; misconception: string };

function generatedChoiceDraft(skillId: string, prompt: string, specs: ChoiceSpec[], rotationKey: number, multi = false): GeneratedChoiceDraft {
  const offset = Math.abs(rotationKey) % specs.length;
  const arranged = [...specs.slice(offset), ...specs.slice(0, offset)];
  const options: ChoiceOption[] = arranged.map((spec, index) => {
    const misconceptionId = spec.correct ? undefined : `${skillId}:${spec.misconception}`;
    return {
      id: `o${index}`,
      content: [{ kind: "text", value: spec.value }],
      misconceptionId,
      misconceptionRationale: misconceptionId ? misconceptionRationale(misconceptionId) : undefined,
    };
  });
  const correctIds = arranged.flatMap((spec, index) => spec.correct ? [`o${index}`] : []);
  if (multi) return { type: "multiChoice", prompt: [{ kind: "text", value: prompt }], options, correctOptionIds: correctIds };
  if (correctIds.length !== 1) throw new Error("Generated single-choice question requires exactly one correct option");
  return { type: "singleChoice", prompt: [{ kind: "text", value: prompt }], options, correctOptionId: correctIds[0]! };
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
    metadata: { source: "human-review-pass-1", band: input.band, feature: input.family, difficultyFeature: input.difficultyFeature ?? "structure" },
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
    return generatedChoiceDraft("AR_PLACE_VALUE", `מה הערך של הספרה ${digit} במספר ${number}?`, [
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
      conceptualGenerator({ id: `MVP_AR_ADD_FACTS_MISSING_${band}`, skillId, family: "missing-addend", category: "conceptual", band, exprTemplate: "{a}+{b}", params: common, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft(skillId, `איזה מספר חסר? ${a} + □ = ${a + b}`, [{ value: `${b}`, correct: true, misconception: "inverse-operation" }, { value: `${a}`, misconception: "reuses-visible-value" }, { value: `${-b}`, misconception: "sign-confusion" }, { value: `${a + b}`, misconception: "uses-result-as-missing-value" }], a + b); } }),
      conceptualGenerator({ id: `MVP_AR_ADD_FACTS_COMMUTE_${band}`, skillId, family: "commutative-equivalence", category: "reasoning", band, exprTemplate: "{a}+{b}={b}+{a}", params: common, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft(skillId, `איזה ביטוי שווה ל־${a} + ${b}?`, [{ value: `${b} + ${a}`, correct: true, misconception: "commutative-relationship" }, { value: `${a} - ${b}`, misconception: "confuses-operation-or-symbol" }, { value: `${b} - ${a}`, misconception: "reverses-logical-direction" }, { value: `${a} + ${a}`, misconception: "reuses-visible-value" }], a); } }),
    ];
    return [
      conceptualGenerator({ id: `MVP_AR_SUB_FACTS_REMOVE_${band}`, skillId, family: "subtraction-as-removal", category: "conceptual", band, exprTemplate: "{a}+{b}-{b}", params: common, difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b; return generatedChoiceDraft(skillId, `היו ${total} פריטים והוציאו ${b}. כמה נשארו?`, [{ value: `${a}`, correct: true, misconception: "subtraction-as-removal" }, { value: `${-a}`, misconception: "sign-confusion" }, { value: `${total}`, misconception: "ignores-operation" }, { value: `${total + 1}`, misconception: "off-by-one-generalization" }], total); } }),
      conceptualGenerator({ id: `MVP_AR_SUB_FACTS_INVERSE_${band}`, skillId, family: "inverse-addition-check", category: "reasoning", band, exprTemplate: "({a}+{b})-{b}={a}", params: common, constraints: ["a != b"], difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const total = a + b; return generatedChoiceDraft(skillId, `באיזה תרגיל חיבור אפשר לבדוק ש־${total} - ${b} = ${a}?`, [{ value: `${a} + ${b} = ${total}`, correct: true, misconception: "inverse-operation" }, { value: `${total} + ${b} = ${a}`, misconception: "reverses-logical-direction" }, { value: `${a} + ${total} = ${b}`, misconception: "reorders-roles" }, { value: `${total} - ${a} = ${b}`, misconception: "uses-same-operation" }], total + b); } }),
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
  choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); return generatedChoiceDraft("AR_FACTORS_MULTIPLES", `איזה מהמספרים הבאים הם כפולות של ${a}? סמנו את כל התשובות הנכונות.`, [{ value: `${a * b}`, correct: true, misconception: "multiple-as-product" }, { value: `${a * (b + 1)}`, correct: true, misconception: "next-multiple" }, { value: `${a * b + 1}`, misconception: "off-by-one-generalization" }, { value: `${a * (b + 1) + 1}`, misconception: "adjacent-to-multiple" }], a + b, true); },
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
    conceptualGenerator({ id: `MVP_FRAC_EQUIV_FORWARD_${band}`, skillId: "FRAC_EQUIV", family: "expand-equivalent-fraction", category: "representation", band, exprTemplate: "({a}*{c})/({b}*{c})={a}/{b}", params, constraints: ["a < b"], difficultyFeature: "magnitude", choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const c = sampledInteger(sampled, "c"); return generatedChoiceDraft("FRAC_EQUIV", `איזה שבר שווה ל־${a}/${b}?`, [{ value: `${a * c}/${b * c}`, correct: true, misconception: "scales-both-parts" }, { value: `${a * c}/${b}`, misconception: "scales-numerator-only" }, { value: `${a}/${b * c}`, misconception: "scales-denominator-only" }, { value: `${a + c}/${b + c}`, misconception: "adds-to-both-parts" }], a + b + c); } }),
    conceptualGenerator({ id: `MVP_FRAC_EQUIV_REVERSE_${band}`, skillId: "FRAC_EQUIV", family: "simplify-equivalent-fraction", category: "reasoning", band, exprTemplate: "({a}*{c})/({b}*{c})={a}/{b}", params, constraints: ["a < b"], difficultyFeature: "magnitude", choiceBuilder: (sampled) => { const a = sampledInteger(sampled, "a"); const b = sampledInteger(sampled, "b"); const c = sampledInteger(sampled, "c"); return generatedChoiceDraft("FRAC_EQUIV", `איזה שבר הוא הצמצום של ${a * c}/${b * c}?`, [{ value: `${a}/${b}`, correct: true, misconception: "divides-both-parts" }, { value: `${a * c}/${b}`, misconception: "simplifies-denominator-only" }, { value: `${a}/${b * c}`, misconception: "simplifies-numerator-only" }, { value: `${a + c}/${b + c}`, misconception: "subtracts-common-factor" }], a * b * c); } }),
  ];
});

const ORDER_OF_OPERATIONS_GENERATORS = (["A", "B", "C"] as DifficultyBand[]).map((band, index) => conceptualGenerator({
  id: `MVP_OPS_ORDER_BASIC_FIRST_${band}`, skillId: "OPS_ORDER_BASIC", family: "identify-first-operation", category: index % 2 ? "reasoning" : "conceptual", band, exprTemplate: "{a}+{b}*{c}", params: { a: { type: "natural", min: [2, 9, 17][index]!, max: [8, 16, 26][index]! }, b: { type: "natural", min: 2, max: 8 }, c: { type: "natural", min: 2, max: 6 } }, difficultyFeature: "magnitude", choiceBuilder: (params) => { const a = sampledInteger(params, "a"); const b = sampledInteger(params, "b"); const c = sampledInteger(params, "c"); return generatedChoiceDraft("OPS_ORDER_BASIC", `איזו פעולה מבצעים קודם בתרגיל ${a} + ${b} × ${c}?`, [{ value: "כפל", correct: true, misconception: "multiplication-before-addition" }, { value: "חיבור", misconception: "works-left-to-right" }, { value: "את שתי הפעולות יחד", misconception: "no-operation-order" }, { value: "אי אפשר לדעת", misconception: "requires-parentheses" }], a + b + c); } }));

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

function choice(id: string, skillId: string, category: QuestionCategory, band: DifficultyBand, prompt: string, options: string[], correctIndex: number, misconceptionIds: Array<string | undefined>): SkillQuestionDefinition {
  const curationReason: QuestionCurationReason = category === "representation" ? "representation-evidence" : category === "reasoning" ? "reasoning-evidence" : "conceptual-evidence";
  return { id, topicId: "FOUNDATIONS", skillId, type: "singleChoice", authoringMode: "curated", contentFamily: `${skillId}:${category}`, curationReason, category, difficultyBand: band, difficulty: ({ A: .12, B: .38, C: .65, D: .9 })[band], prompt: [{ kind: "text", value: prompt }], options: options.map((value, index) => ({ id: `o${index}`, content: [{ kind: "text", value }], misconceptionId: misconceptionIds[index], misconceptionRationale: misconceptionIds[index] ? misconceptionRationale(misconceptionIds[index]) : undefined })), correctOptionId: `o${correctIndex}`, misconceptions: misconceptionIds.filter((value): value is string => !!value), tags: ["mvp", "human-reviewed", "short-item", `band:${band}`], version: 1 };
}

type ConceptRecipe = (index: number) => { prompt: string; options: string[]; correct: number; category?: QuestionCategory };
const conceptRecipes: Record<string, ConceptRecipe> = {
  AR_PLACE_VALUE: (i) => { const digit = 2 + i % 7; const zeros = 1 + i % 4; return { prompt: `מה הערך של הספרה ${digit} במספר ${digit}${"0".repeat(zeros)}?`, options: [`${digit}`, `${digit * 10 ** zeros}`, `${digit + zeros}`, `${zeros}`], correct: 1, category: i % 2 ? "conceptual" : "representation" }; },
  AR_ADD_FACTS: (i) => { const a = 2 + i; const b = 1 + i % 8; return { prompt: `איזה מספר חסר? ${a}+□=${a + b}`, options: [`${b}`, `${b + 10}`, `${-b}`, `${b + 1}`], correct: 0 }; },
  AR_SUB_FACTS: (i) => { const a = 8 + i; const b = 1 + i % 7; return { prompt: `באיזו פעולת חיבור בודקים את ${a}-${b}=${a - b}?`, options: [`${a - b}+${b}=${a}`, `${a}+${b}=${a - b}`, `${a}-${a - b}=${a}`, `${a - b}-${b}=${a}`], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  INT_NUMBER_LINE: (i) => { const n = 1 + i; return { prompt: `איזה מספר נמצא ${n} צעדים משמאל לאפס?`, options: [`${n}`, `${-n}`, "0", `${n + 1}`], correct: 1, category: i % 2 ? "conceptual" : "representation" }; },
  INT_COMPARE: (i) => { const n = 2 + i; return { prompt: `איזה מספר גדול יותר?`, options: [`${-n}`, `${-(n + 1)}`, "הם שווים", "אי אפשר לדעת"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  INT_NEGATION: (i) => { const n = 1 + i; return { prompt: `מהו המספר הנגדי של ${i % 2 ? n : -n}?`, options: [`${i % 2 ? -n : n}`, `${i % 2 ? n : -n}`, "0", `${n + 1}`], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  INT_ADD: (i) => { const a = 2 + i; return { prompt: `בלי לחשב במדויק: מה הסימן של −${a}+${a + 1}?`, options: ["חיובי", "שלילי", "אפס", "אי אפשר לדעת"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  INT_SUB: (i) => { const a = 2 + i; return { prompt: `איזה ביטוי שווה ל־${a}−(−${a + 1})?`, options: [`${a}+${a + 1}`, `${a}-${a + 1}`, `-${a}-${a + 1}`, `${a + 1}-${a}`], correct: 0 }; },
  INT_MUL: (i) => { const a = 2 + i; return { prompt: `מה הסימן של (−${a})×${a + 1}?`, options: ["שלילי", "חיובי", "אפס", "אי אפשר לדעת"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  INT_DIV: (i) => { const a = 2 + i; return { prompt: `מה הסימן של (−${a * 2})÷(−2)?`, options: ["חיובי", "שלילי", "אפס", "אי אפשר לדעת"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  FRAC_MEANING: (i) => { const d = 3 + i; const n = 1 + i % Math.min(5, d - 1); return { prompt: `שלם חולק ל־${d} חלקים שווים ונבחרו ${n}. איזה שבר מתאר זאת?`, options: [`${n}/${d}`, `${d}/${n}`, `${n}/${d + 1}`, `${n + 1}/${d}`], correct: 0, category: i % 2 ? "conceptual" : "representation" }; },
  FRAC_EQUIV: (i) => { const n = 1 + i; const d = n + 2 + i % 3; return { prompt: `איזה שבר שווה ל־${n}/${d}?`, options: [`${n * 2}/${d * 2}`, `${n + 1}/${d + 1}`, `${n * 2}/${d}`, `${n}/${d * 2}`], correct: 0, category: i % 2 ? "reasoning" : "representation" }; },
  ALG_EQUALITY: (i) => { const a = 2 + i; const b = 1 + i % 5; return { prompt: `איזה משפט שוויון נכון עבור ${a} ו־${b}?`, options: [`${a}+${b}=${b}+${a}`, `${a}+${b}=${a + b + 1}`, `${a}-${b}=${b}-${a}`, `${a}+0=0`], correct: 0, category: i % 2 ? "reasoning" : "conceptual" }; },
  ALG_VARIABLE: (i) => ({ prompt: i % 2 ? `בביטוי ${i + 2}x, מה מייצגת x?` : `אם n הוא מספר התלמידים בקבוצה ${i + 1}, מה יכול להשתנות?`, options: i % 2 ? ["מספר שיכול לקבל ערך", "סימן כפל בלבד", `תמיד ${i + 2}`, "סימן שוויון"] : ["הערך של n", "האות n עצמה", "סימן השוויון", "המספר 1"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }),
  ALG_SUBSTITUTE: (i) => { const x = 2 + i; return { prompt: `אם x=${x}, איזה ביטוי מתאר 2x+1 לאחר ההצבה?`, options: [`2×${x}+1`, `2+x+1`, `${x}+1`, `2×1+${x}`], correct: 0 }; },
  AR_FACTORS_MULTIPLES: (i) => { const n = 2 + i; return { prompt: `איזה מספר הוא כפולה של ${n}?`, options: [`${n * (2 + i % 4)}`, `${n * 2 + 1}`, `${n + 1}`, "1"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  OPS_ORDER_BASIC: (i) => ({ prompt: `איזו פעולה מבצעים קודם ב־${2 + i}+${3 + i % 4}×4?`, options: ["כפל", "חיבור", "משמאל לימין תמיד", "שתיהן יחד"], correct: 0 }),
  EQ_ADD: (i) => { const x = 2 + i % 8; const b = 1 + i % 6; return { prompt: `איזה ערך משלים את השוויון □+${b}=${x + b}?`, options: [`${x}`, `לא ${x}`, `${x} וחצי`, "אין פתרון"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
  EQ_MUL: (i) => { const x = 2 + i % 8; const b = 2 + i % 5; return { prompt: `איזה ערך משלים את השוויון ${b}×□=${x * b}?`, options: [`${x}`, `לא ${x}`, `${x} וחצי`, "אין פתרון"], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }; },
};

function factConcept(skillId: string, i: number): ReturnType<ConceptRecipe> {
  const factors = skillId.includes("2_5_10") ? [2, 5, 10] : skillId.includes("3_4") ? [3, 4] : skillId.includes("6_7") ? [6, 7] : [8, 9];
  const factor = factors[i % factors.length]!;
  const other = 2 + Math.floor(i / factors.length); const product = factor * other;
  return skillId.startsWith("AR_MUL")
    ? { prompt: `${factor} קבוצות ובכל קבוצה ${other} פריטים. איזה תרגיל מתאים?`, options: [`${factor}×${other}=${product}`, `${factor}+${other}=${product}`, `${product}÷${factor}=${product}`, `${product}-${other}=${product}`], correct: 0, category: i % 2 ? "conceptual" : "reasoning" }
    : { prompt: `${product} פריטים חולקו שווה בשווה ל־${factor} קבוצות. כמה בכל קבוצה?`, options: [`${other}`, `${other + 20}`, `${-other}`, `${other + 1}`], correct: 0, category: i % 2 ? "conceptual" : "reasoning" };
}
const skillIds = ["AR_PLACE_VALUE", "AR_ADD_FACTS", "AR_SUB_FACTS", ...Object.keys(factFamilies), "AR_FACTORS_MULTIPLES", "OPS_ORDER_BASIC", "INT_NUMBER_LINE", "INT_COMPARE", "INT_NEGATION", "INT_ADD", "INT_SUB", "INT_MUL", "INT_DIV", "FRAC_MEANING", "FRAC_EQUIV", "ALG_EQUALITY", "ALG_VARIABLE", "ALG_SUBSTITUTE", "EQ_ADD", "EQ_MUL"];
const fixedHeavySkills = new Set(["AR_PLACE_VALUE", "INT_NUMBER_LINE", "INT_COMPARE", "INT_NEGATION", "FRAC_MEANING", "FRAC_EQUIV", "ALG_EQUALITY", "ALG_VARIABLE"]);
const representativeFactIndices = [0, 1, 2, 3, 4, 9, 10, 11, 12, 13];
const representativeMixedIndices = [0, 1, 2, 6, 7, 8, 13, 14, 15, 16];

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

let fixedOrdinal = 0;
const replacedFixedSkills = new Set(["AR_PLACE_VALUE", "AR_ADD_FACTS", "AR_SUB_FACTS", ...Object.keys(factFamilies), "AR_FACTORS_MULTIPLES", "OPS_ORDER_BASIC", "INT_NUMBER_LINE", "FRAC_MEANING", "FRAC_EQUIV"]);
const FIXED = skillIds.flatMap((skillId) => {
  if (replacedFixedSkills.has(skillId)) return [];
  const factLike = skillId.includes("_FACTS") || skillId.includes("_F_");
  const indices = fixedHeavySkills.has(skillId)
    ? Array.from({ length: 18 }, (_, index) => index)
    : factLike ? representativeFactIndices : representativeMixedIndices;
  return indices.map((index) => {
  const item = skillId.startsWith("AR_MUL_F_") || skillId.startsWith("AR_DIV_F_") ? factConcept(skillId, index) : conceptRecipes[skillId]!(index);
  const category = item.category ?? "conceptual";
  const correctValue = item.options[item.correct]!;
  const distractors = item.options
    .map((value, optionIndex) => ({ value, misconceptionId: optionIndex === item.correct ? undefined : misconceptionPattern(skillId, category, optionIndex) }))
    .filter((entry) => entry.misconceptionId);
  const correct = fixedOrdinal % item.options.length;
  fixedOrdinal += 1;
  const arranged = [...distractors];
  arranged.splice(correct, 0, { value: correctValue, misconceptionId: undefined });
  const band = factLike ? (index < 9 ? "A" : "B") : index < 6 ? "A" : index < 13 ? "B" : "C";
  return choice(`MVP_${skillId}_CONCEPT_${index + 1}`, skillId, category, band, item.prompt, arranged.map((entry) => entry.value), correct, arranged.map((entry) => entry.misconceptionId));
  });
});

export const FOUNDATIONAL_QUESTIONS: SkillQuestionDefinition[] = [...GENERATED, ...REVIEWED_CONCEPT_GENERATORS, ...FIXED];
