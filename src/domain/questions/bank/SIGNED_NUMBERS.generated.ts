import type { OptionContent } from "../types";
import type {
  DecimalParamSpec,
  GeneratedQuestionDefinition,
  IntegerLikeParamSpec,
  RationalParamSpec,
  SampledParams,
} from "../generator/types";
import { clamp01 } from "../../../shared/math.ts";

const PROMPT_PREFIX: OptionContent[] = [{ kind: "text", value: "חשבו:" }];

const HINTS_ORDER_OF_OPS: OptionContent[][] = [
  [
    {
      kind: "text",
      value:
        "רמז: זכרו את סדר הפעולות. סוגריים קודמים לכפל וחילוק, ואלה קודמים לחיבור וחיסור.",
    },
  ],
];

const HINTS_DISTRIBUTE_MINUS: OptionContent[][] = [
  [
    {
      kind: "text",
      value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
    },
  ],
];

const HINTS_POWERS_PARENS: OptionContent[][] = [
  [
    {
      kind: "text",
      value: "רמז: בדקו אם המינוס שייך לבסיס או נמצא מחוץ לחזקה.",
    },
  ],
];

function mathPrompt(exprTemplate: string): OptionContent[] {
  return [
    ...PROMPT_PREFIX,
    { kind: "math", latex: exprTemplate, display: true },
  ];
}

function exprGenMetadata(
  exprGenTemplateId: string,
  inferredSubtopic: string,
  inferredDifficulty: number,
) {
  return {
    difficulty: inferredDifficulty,
    subtopic: inferredSubtopic,
    source: "expr-gen",
    exprGenTopic: "signedNumbers",
    exprGenTemplateId,
    inferredSubtopic,
    inferredDifficulty,
  } as const;
}

const SMALL_NATURAL: IntegerLikeParamSpec = { type: "natural", min: 1, max: 12 };
const MEDIUM_NATURAL: IntegerLikeParamSpec = { type: "natural", min: 1, max: 20 };
const CHAIN_NATURAL: IntegerLikeParamSpec = { type: "natural", min: 1, max: 15 };
const SMALL_INTEGER: IntegerLikeParamSpec = {
  type: "integer",
  min: -12,
  max: 12,
  exclude: [0],
};
const DECIMAL_TENTHS: DecimalParamSpec = {
  type: "decimal",
  min: -2,
  max: 2,
  step: 0.1,
  exclude: [0],
};
const POSITIVE_DECIMAL_TENTHS: DecimalParamSpec = {
  type: "decimal",
  min: 0.2,
  max: 2,
  step: 0.1,
};

const FRACTION_BASE: RationalParamSpec = {
  type: "rational",
  numerator: { min: -9, max: 9, exclude: [0] },
  denominator: { min: 2, max: 10, exclude: [7] },
  simplify: false,
  excludeZero: true,
};
const SIGNED_HALF_TO_TENTHS: RationalParamSpec = {
  type: "rational",
  numerator: { min: -5, max: 5, exclude: [0] },
  denominator: { min: 2, max: 5 },
  simplify: true,
  excludeZero: true,
};
const INPUT_INTEGER = ["integer"] as const;
const INPUT_DECIMAL = ["decimal"] as const;
const INPUT_FRACTION_OR_DECIMAL = ["fraction", "decimal"] as const;

function asNumber(sampledParams: SampledParams, key: string): number {
  const sampled = sampledParams[key];
  if (!sampled) {
    throw new Error(`Missing sampled param "${key}"`);
  }
  return Number(sampled.value.num) / Number(sampled.value.den);
}

function averageMagnitude(sampledParams: SampledParams, keys: string[]): number {
  return (
    keys.reduce((sum, key) => sum + Math.abs(asNumber(sampledParams, key)), 0) /
    Math.max(1, keys.length)
  );
}

function closenessBoost(sampledParams: SampledParams, leftKey: string, rightKey: string): number {
  const gap = Math.abs(Math.abs(asNumber(sampledParams, leftKey)) - Math.abs(asNumber(sampledParams, rightKey)));
  return gap <= 2 ? 0.1 : gap <= 5 ? 0.05 : 0;
}

function signedAddSubDifficulty(
  sampledParams: SampledParams,
  base: number,
  keys: string[],
  extra = 0,
): number {
  const sizeBoost = averageMagnitude(sampledParams, keys) / 40;
  return clamp01(
    base +
      sizeBoost +
      (keys.length >= 2 ? closenessBoost(sampledParams, keys[0]!, keys[1]!) : 0) +
      extra,
  );
}

function chainDifficulty(sampledParams: SampledParams, base: number, extra = 0): number {
  const sizeBoost = averageMagnitude(sampledParams, ["a", "b", "c"]) / 32;
  const closeness =
    closenessBoost(sampledParams, "a", "b") + closenessBoost(sampledParams, "b", "c") / 2;
  return clamp01(base + sizeBoost + closeness + extra);
}

function distributiveDifficulty(
  sampledParams: SampledParams,
  base: number,
  extra = 0,
): number {
  const outer = Math.abs(asNumber(sampledParams, "a"));
  const inner = averageMagnitude(
    sampledParams,
    Object.keys(sampledParams).filter((key) => key !== "a"),
  );
  return clamp01(base + outer / 24 + inner / 28 + extra);
}

function powerDifficulty(
  sampledParams: SampledParams,
  base: number,
  extra = 0,
): number {
  const magnitude = Math.abs(asNumber(sampledParams, "a"));
  const exponent = sampledParams.n ? asNumber(sampledParams, "n") : asNumber(sampledParams, "c");
  return clamp01(base + magnitude / 18 + (exponent - 2) * 0.12 + extra);
}

function fractionPowerDifficulty(
  sampledParams: SampledParams,
  base: number,
  extra = 0,
): number {
  const fraction = sampledParams.f;
  if (!fraction) {
    return clamp01(base + extra);
  }
  const numerator = Math.abs(Number(fraction.value.num));
  const denominator = Number(fraction.value.den);
  const exponent = sampledParams.c ? asNumber(sampledParams, "c") : 2;
  return clamp01(base + numerator / 24 + denominator / 22 + (exponent - 2) * 0.1 + extra);
}

export const SIGNED_NUMBERS_GENERATED_QUESTIONS: GeneratedQuestionDefinition[] = [
  // Addition with signed numbers
  {
    id: "SN_GEN_ADD_NEG_POS_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}+{b}",
    promptTemplate: mathPrompt("-{a}+{b}"),
    params: {
      a: MEDIUM_NATURAL,
      b: MEDIUM_NATURAL,
    },
    structureKey: "-a+b",
    variantGroup: "signed_addition",
    difficultyModel: (sampledParams) =>
      signedAddSubDifficulty(sampledParams, 0.18, ["a", "b"]),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:addition"],
    misconceptions: ["SIGN_ERROR"],
    metadata: exprGenMetadata("SN_T1_ADD_INT", "addition", 0.2),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_ADD_NEG_NEG_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}+(-{b})",
    promptTemplate: mathPrompt("-{a}+(-{b})"),
    params: {
      a: MEDIUM_NATURAL,
      b: MEDIUM_NATURAL,
    },
    structureKey: "-a+(-b)",
    variantGroup: "signed_addition",
    difficultyModel: (sampledParams) =>
      signedAddSubDifficulty(sampledParams, 0.24, ["a", "b"], 0.04),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:addition"],
    misconceptions: ["SIGN_ERROR"],
    metadata: exprGenMetadata("SN_T1_ADD_INT", "addition", 0.25),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },

  // Subtraction with signed numbers
  {
    id: "SN_GEN_SUB_POS_POS_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}-{b}",
    promptTemplate: mathPrompt("{a}-{b}"),
    params: {
      a: MEDIUM_NATURAL,
      b: MEDIUM_NATURAL,
    },
    structureKey: "a-b",
    variantGroup: "signed_subtraction",
    difficultyModel: (sampledParams) =>
      signedAddSubDifficulty(sampledParams, 0.24, ["a", "b"]),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:subtraction"],
    misconceptions: ["SUBTRACTION_SIGN_ERROR"],
    metadata: exprGenMetadata("SN_T1_SUB_INT", "subtraction", 0.25),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_SUB_DOUBLE_NEG_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}-(-{b})",
    promptTemplate: mathPrompt("{a}-(-{b})"),
    params: {
      a: MEDIUM_NATURAL,
      b: MEDIUM_NATURAL,
    },
    structureKey: "a-(-b)",
    variantGroup: "double_negative_subtraction",
    difficultyModel: (sampledParams) =>
      signedAddSubDifficulty(sampledParams, 0.32, ["a", "b"], 0.05),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:subtraction"],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SUBTRACTION_SIGN_ERROR"],
    metadata: exprGenMetadata("SN_T1_SUB_INT", "subtraction", 0.35),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },

  // Multiplication and mixed fraction arithmetic
  {
    id: "SN_GEN_MUL_NEG_POS_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}\\times {b}",
    promptTemplate: mathPrompt("-{a}\\times {b}"),
    params: {
      a: SMALL_NATURAL,
      b: SMALL_NATURAL,
    },
    structureKey: "-a*b",
    variantGroup: "signed_multiplication",
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:multiplication"],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    metadata: exprGenMetadata("SN_T1_MUL_INT", "multiplication", 0.3),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_MUL_NEG_NEG_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "(-{a})\\times(-{b})",
    promptTemplate: mathPrompt("(-{a})\\times(-{b})"),
    params: {
      a: SMALL_NATURAL,
      b: SMALL_NATURAL,
    },
    structureKey: "(-a)*(-b)",
    variantGroup: "signed_multiplication",
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:multiplication"],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    metadata: exprGenMetadata("SN_T1_MUL_INT", "multiplication", 0.35),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_DIV_ADD_SIGNED_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "\\frac{-{a}}{{b}}+{c}",
    promptTemplate: mathPrompt("\\frac{-{a}}{{b}}+{c}"),
    params: {
      a: { type: "natural", min: 1, max: 36 },
      b: { type: "natural", min: 2, max: 12 },
      c: SMALL_INTEGER,
    },
    structureKey: "(-a/b)+c",
    variantGroup: "signed_fraction_addition",
    difficultyModel: (sampledParams) =>
      clamp01(
        0.5 +
          Math.abs(asNumber(sampledParams, "a")) / 54 +
          Math.abs(asNumber(sampledParams, "c")) / 30 +
          Math.abs(asNumber(sampledParams, "b")) / 36,
      ),
    acceptedInputFormats: [...INPUT_FRACTION_OR_DECIMAL],
    tags: [
      "topic:signed_numbers",
      "signed",
      "category:mixed_operations",
      "has:fraction",
    ],
    misconceptions: ["ORDER_OF_OPERATIONS", "NEGATIVE_DIVIDE_RULE", "SIGN_ERROR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
    metadata: exprGenMetadata("SN_T2_DIV_PLUS_INT", "mixed_operations", 0.55),
  },

  // Signed decimals
  {
    id: "SN_GEN_DEC_ADD_SIGNED_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}+{b}",
    promptTemplate: mathPrompt("{a}+{b}"),
    params: {
      a: DECIMAL_TENTHS,
      b: DECIMAL_TENTHS,
    },
    constraints: ["a + b !== 0"],
    structureKey: "decimal+decimal",
    variantGroup: "signed_decimals",
    difficultyModel: (sampledParams) =>
      clamp01(0.34 + averageMagnitude(sampledParams, ["a", "b"]) / 10),
    acceptedInputFormats: [...INPUT_DECIMAL],
    tags: ["topic:signed_numbers", "signed", "category:decimals", "has:decimal"],
    misconceptions: ["SIGN_ERROR", "DECIMAL_PLACE_VALUE"],
    metadata: exprGenMetadata("SN_DEC_ADD_SIGNED", "decimals", 0.35),
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_GEN_DEC_SUB_DOUBLE_NEG_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}-(-{b})",
    promptTemplate: mathPrompt("{a}-(-{b})"),
    params: {
      a: POSITIVE_DECIMAL_TENTHS,
      b: POSITIVE_DECIMAL_TENTHS,
    },
    structureKey: "decimal-(-decimal)",
    variantGroup: "signed_decimals",
    difficultyModel: (sampledParams) =>
      clamp01(0.42 + averageMagnitude(sampledParams, ["a", "b"]) / 12),
    acceptedInputFormats: [...INPUT_DECIMAL],
    tags: ["topic:signed_numbers", "signed", "category:decimals", "has:decimal"],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "DECIMAL_PLACE_VALUE"],
    metadata: exprGenMetadata("SN_DEC_SUB_DOUBLE_NEG", "decimals", 0.42),
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },

  // Signed rational arithmetic
  {
    id: "SN_GEN_RAT_ADD_INT_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}+{b}",
    promptTemplate: mathPrompt("{a}+{b}"),
    params: {
      a: SIGNED_HALF_TO_TENTHS,
      b: { type: "integer", min: -4, max: 4, exclude: [0] },
    },
    constraints: ["a + b !== 0"],
    structureKey: "rational+integer",
    variantGroup: "signed_rationals",
    difficultyModel: (sampledParams) =>
      clamp01(0.48 + averageMagnitude(sampledParams, ["a", "b"]) / 10),
    acceptedInputFormats: [...INPUT_FRACTION_OR_DECIMAL],
    tags: ["topic:signed_numbers", "signed", "category:rationals", "has:fraction"],
    misconceptions: ["SIGN_ERROR", "FRACTION_INTEGER_COMBINATION"],
    metadata: exprGenMetadata("SN_RAT_ADD_INT", "rationals", 0.48),
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_GEN_RAT_SUB_DEC_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}-{b}",
    promptTemplate: mathPrompt("{a}-{b}"),
    params: {
      a: { type: "rational", numerator: { min: 1, max: 5 }, denominator: { min: 2, max: 4 }, simplify: true, excludeZero: true },
      b: POSITIVE_DECIMAL_TENTHS,
    },
    structureKey: "rational-decimal",
    variantGroup: "mixed_rational_decimal",
    difficultyModel: (sampledParams) =>
      clamp01(0.58 + averageMagnitude(sampledParams, ["a", "b"]) / 10),
    acceptedInputFormats: [...INPUT_FRACTION_OR_DECIMAL],
    tags: [
      "topic:signed_numbers",
      "signed",
      "category:mixed_rational_decimal",
      "has:fraction",
      "has:decimal",
    ],
    misconceptions: ["DECIMAL_FRACTION_CONVERSION", "SIGN_ERROR"],
    metadata: exprGenMetadata("SN_RAT_SUB_DEC", "mixed_rational_decimal", 0.58),
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },

  // Multi-step expressions
  {
    id: "SN_GEN_CHAIN_ADD_SUB_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}+{b}-{c}",
    promptTemplate: mathPrompt("-{a}+{b}-{c}"),
    params: {
      a: CHAIN_NATURAL,
      b: CHAIN_NATURAL,
      c: CHAIN_NATURAL,
    },
    structureKey: "-a+b-c",
    variantGroup: "signed_chain",
    difficultyModel: (sampledParams) => chainDifficulty(sampledParams, 0.42),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:multi_step"],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
    metadata: exprGenMetadata("SN_T2_CHAIN_ADD_SUB", "mixed_operations", 0.45),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  // Kept separate from the previous chain because the subtraction-first reading pattern
  // triggers a different student error pattern even though both simplify linearly.
  {
    id: "SN_GEN_CHAIN_SUB_ADD_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}-{b}+{c}",
    promptTemplate: mathPrompt("-{a}-{b}+{c}"),
    params: {
      a: CHAIN_NATURAL,
      b: CHAIN_NATURAL,
      c: CHAIN_NATURAL,
    },
    structureKey: "-a-b+c",
    variantGroup: "signed_chain",
    difficultyModel: (sampledParams) => chainDifficulty(sampledParams, 0.47, 0.03),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:multi_step"],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
    metadata: exprGenMetadata("SN_T2_CHAIN_SUB_ADD", "mixed_operations", 0.5),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_CHAIN_SUB_SUB_003",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}-{b}-{c}",
    promptTemplate: mathPrompt("-{a}-{b}-{c}"),
    params: {
      a: CHAIN_NATURAL,
      b: CHAIN_NATURAL,
      c: CHAIN_NATURAL,
    },
    structureKey: "-a-b-c",
    variantGroup: "signed_chain",
    difficultyModel: (sampledParams) => chainDifficulty(sampledParams, 0.52, 0.05),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:multi_step"],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
    metadata: exprGenMetadata("SN_T2_CHAIN_SUB_SUB", "mixed_operations", 0.55),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_LEADING_MINUS_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}-{b}",
    promptTemplate: mathPrompt("-{a}-{b}"),
    params: {
      a: MEDIUM_NATURAL,
      b: MEDIUM_NATURAL,
    },
    structureKey: "-a-b",
    variantGroup: "leading_minus",
    difficultyModel: (sampledParams) =>
      signedAddSubDifficulty(sampledParams, 0.36, ["a", "b"], 0.03),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:negation"],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    metadata: exprGenMetadata("SN_T2_LEADING_MINUS_ADD", "negation", 0.4),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },

  // Negation over parentheses
  {
    id: "SN_GEN_NEGATE_PARENS_SUB_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-({a}-{b})",
    promptTemplate: mathPrompt("-({a}-{b})"),
    params: {
      a: MEDIUM_NATURAL,
      b: MEDIUM_NATURAL,
    },
    constraints: ["a !== b"],
    structureKey: "-(a-b)",
    variantGroup: "negation_parentheses",
    difficultyModel: (sampledParams) =>
      signedAddSubDifficulty(sampledParams, 0.56, ["a", "b"], 0.08),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:negation_parentheses"],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    hintsTemplate: HINTS_DISTRIBUTE_MINUS,
    metadata: exprGenMetadata("SN_T3_NEGATE_PARENS_SUB", "negation_parentheses", 0.6),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_NEGATE_PARENS_ADD_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-({a}+{b})",
    promptTemplate: mathPrompt("-({a}+{b})"),
    params: {
      a: MEDIUM_NATURAL,
      b: MEDIUM_NATURAL,
    },
    structureKey: "-(a+b)",
    variantGroup: "negation_parentheses",
    difficultyModel: (sampledParams) =>
      signedAddSubDifficulty(sampledParams, 0.52, ["a", "b"], 0.06),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:negation_parentheses"],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    hintsTemplate: HINTS_DISTRIBUTE_MINUS,
    metadata: exprGenMetadata("SN_T3_NEGATE_PARENS_ADD", "negation_parentheses", 0.55),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },

  // Distributive structure
  {
    id: "SN_GEN_DISTRIB_SIGNED_SUM_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}(-{b}+{c})",
    promptTemplate: mathPrompt("{a}(-{b}+{c})"),
    params: {
      a: { type: "natural", min: 2, max: 8 },
      b: SMALL_NATURAL,
      c: SMALL_NATURAL,
    },
    constraints: ["b !== c"],
    structureKey: "a(-b+c)",
    variantGroup: "signed_distributive",
    difficultyModel: (sampledParams) =>
      distributiveDifficulty(
        sampledParams,
        0.66,
        closenessBoost(sampledParams, "b", "c"),
      ),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:distributive"],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
    metadata: exprGenMetadata("SN_T3_DISTRIB_A_B_PLUS_C", "distributive", 0.7),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_DISTRIB_REPEATED_TERM_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}({a}-{b})",
    promptTemplate: mathPrompt("{a}({a}-{b})"),
    params: {
      a: { type: "natural", min: 2, max: 8 },
      b: SMALL_NATURAL,
    },
    constraints: ["a !== b"],
    structureKey: "a(a-b)",
    variantGroup: "signed_distributive",
    difficultyModel: (sampledParams) =>
      distributiveDifficulty(
        sampledParams,
        0.72,
        closenessBoost(sampledParams, "a", "b"),
      ),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:distributive"],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
    metadata: exprGenMetadata("SN_T3_DISTRIB_A_A_MINUS_B", "distributive", 0.75),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_DISTRIB_LEADING_NEG_003",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}({b}+{c})",
    promptTemplate: mathPrompt("-{a}({b}+{c})"),
    params: {
      a: { type: "natural", min: 1, max: 8 },
      b: SMALL_NATURAL,
      c: SMALL_NATURAL,
    },
    structureKey: "-a(b+c)",
    variantGroup: "signed_distributive",
    difficultyModel: (sampledParams) => distributiveDifficulty(sampledParams, 0.76, 0.04),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:distributive"],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    hintsTemplate: HINTS_ORDER_OF_OPS,
    metadata: exprGenMetadata("SN_T3_DISTRIB_NEG_A_B_PLUS_C", "distributive", 0.8),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },

  // Powers
  {
    id: "SN_GEN_POWER_SIGNED_BASE_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "{a}^{n}",
    promptTemplate: mathPrompt("{a}^{n}"),
    params: {
      a: { type: "integer", min: -7, max: 7, exclude: [0] },
      n: { type: "natural", min: 2, max: 3 },
    },
    structureKey: "a^n",
    variantGroup: "powers",
    difficultyModel: (sampledParams) => powerDifficulty(sampledParams, 0.56),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:powers"],
    misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
    hintsTemplate: HINTS_POWERS_PARENS,
    metadata: exprGenMetadata("SN_POW_A_TO_N", "powers", 0.6),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_POWER_NEG_BASE_PARENS_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "(-{a})^{n}",
    promptTemplate: mathPrompt("(-{a})^{n}"),
    params: {
      a: { type: "natural", min: 1, max: 8 },
      n: { type: "natural", min: 2, max: 3 },
    },
    structureKey: "(-a)^n",
    variantGroup: "powers_parentheses",
    difficultyModel: (sampledParams) => powerDifficulty(sampledParams, 0.72, 0.04),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:powers"],
    misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
    hintsTemplate: HINTS_POWERS_PARENS,
    metadata: exprGenMetadata("SN_POW_PARENS_NEG_A_TO_N", "powers_parentheses", 0.75),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  // Kept separate from the parenthesized version because `(-a)^n` and `-a^n`
  // test different precedence rules even when they sometimes share a numeric result.
  {
    id: "SN_GEN_POWER_LEADING_MINUS_003",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-{a}^{n}",
    promptTemplate: mathPrompt("-{a}^{n}"),
    params: {
      a: { type: "natural", min: 1, max: 8 },
      n: { type: "natural", min: 2, max: 3 },
    },
    structureKey: "-a^n",
    variantGroup: "powers_parentheses",
    difficultyModel: (sampledParams) => powerDifficulty(sampledParams, 0.76, 0.07),
    acceptedInputFormats: [...INPUT_INTEGER],
    tags: ["topic:signed_numbers", "signed", "category:powers"],
    misconceptions: ["PARENS_IN_POWERS"],
    hintsTemplate: HINTS_POWERS_PARENS,
    metadata: exprGenMetadata("SN_POW_LEADING_MINUS_A_TO_N", "powers_parentheses", 0.8),
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },

  // Fraction powers
  {
    id: "SN_GEN_FRAC_POWER_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "\\left({f}\\right)^{c}",
    promptTemplate: mathPrompt("\\left({f}\\right)^{c}"),
    params: {
      f: FRACTION_BASE,
      c: { type: "natural", min: 2, max: 3 },
    },
    structureKey: "(f)^c",
    variantGroup: "fraction_powers",
    difficultyModel: (sampledParams) => fractionPowerDifficulty(sampledParams, 0.76),
    acceptedInputFormats: [...INPUT_FRACTION_OR_DECIMAL],
    tags: [
      "topic:signed_numbers",
      "signed",
      "category:fraction_powers",
      "has:fraction",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    hintsTemplate: HINTS_POWERS_PARENS,
    metadata: exprGenMetadata("SN_FRAC_POW_SIMPLE_C2_C3", "fraction_powers", 0.8),
  },
  {
    id: "SN_GEN_FRAC_POWER_LEADING_MINUS_002",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    exprTemplate: "-\\left({f}\\right)^2",
    promptTemplate: mathPrompt("-\\left({f}\\right)^2"),
    params: {
      f: FRACTION_BASE,
    },
    structureKey: "-(f)^2",
    variantGroup: "fraction_powers",
    difficultyModel: (sampledParams) => fractionPowerDifficulty(sampledParams, 0.8, 0.05),
    acceptedInputFormats: [...INPUT_FRACTION_OR_DECIMAL],
    tags: [
      "topic:signed_numbers",
      "signed",
      "category:fraction_powers",
      "has:fraction",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    hintsTemplate: HINTS_POWERS_PARENS,
    metadata: exprGenMetadata(
      "SN_FRAC_POW_LEADING_MINUS_SQ",
      "fraction_powers",
      0.85,
    ),
  },
];
