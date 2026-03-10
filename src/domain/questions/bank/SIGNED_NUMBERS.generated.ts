import type { OptionContent } from "../types";
import type {
  GeneratedQuestionDefinition,
  IntegerLikeParamSpec,
  RationalParamSpec,
} from "../generator/types";

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

const FRACTION_BASE: RationalParamSpec = {
  type: "rational",
  numerator: { min: -9, max: 9, exclude: [0] },
  denominator: { min: 2, max: 10, exclude: [7] },
  simplify: false,
  excludeZero: true,
};

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
