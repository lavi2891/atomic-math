import type { ExprSpec } from "../../core/types.ts";

const TOPIC_ID = "SIGNED_NUMBERS";

/**
 * Shared Hebrew prompt used by all SIGNED_NUMBERS specs.
 * {expr} will be replaced by the rendered LaTeX with sampled values.
 */
const PROMPT_HE: ExprSpec["promptTemplate"] = [
  { kind: "text", value: "חשבו:" },
  { kind: "math", latex: "{expr}", display: true },
];

/**
 * Optional generic hints (keep minimal for now; you can add per-spec hints later).
 */
const HINTS_ORDER_OF_OPS: ExprSpec["hintsTemplate"] = [
  [
    {
      kind: "text",
      value:
        "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
    },
  ],
];

const HINTS_DISTRIBUTE_MINUS: ExprSpec["hintsTemplate"] = [
  [
    {
      kind: "text",
      value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
    },
  ],
];

const HINTS_POWERS_PARENS: ExprSpec["hintsTemplate"] = [
  [
    {
      kind: "text",
      value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
    },
  ],
];

export const SIGNED_NUMBERS_SPECS: ExprSpec[] = [
  // ---------------------------
  // Tier 1 — daily basics (≈ 0.15–0.45)
  // ---------------------------

  {
    topicId: TOPIC_ID,
    templateId: "SN_T1_ADD_INT",
    subtopic: "addition",
    latex: "a+b",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -30,
        max: 30,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
      b: {
        type: "integer",
        min: -30,
        max: 30,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 80 }],
    tags: ["tier:1", "template:addition", "signed"],
    misconceptions: ["SIGN_ERROR"],
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T1_SUB_INT",
    subtopic: "subtraction",
    latex: "a-b",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -30,
        max: 30,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
      b: {
        type: "integer",
        min: -30,
        max: 30,
        preferNegative: 0.55,
        preferZero: 0.01,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 80 }],
    tags: ["tier:1", "template:subtraction", "signed"],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T1_MUL_INT",
    subtopic: "multiplication",
    latex: "a\\times b",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -12,
        max: 12,
        notZero: true,
        preferNegative: 0.45,
      },
      b: {
        type: "integer",
        min: -12,
        max: 12,
        notZero: true,
        preferNegative: 0.45,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 200 }],
    tags: ["tier:1", "template:multiplication", "signed"],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
  },

  // ---------------------------
  // Tier 2 — chains & mixed signs (≈ 0.45–0.75)
  // ---------------------------

  {
    topicId: TOPIC_ID,
    templateId: "SN_T2_CHAIN_ADD_SUB",
    subtopic: "mixed_operations",
    latex: "a+b-c",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
      b: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
      c: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 60 }],
    tags: ["tier:2", "template:chain", "signed"],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T2_CHAIN_SUB_ADD",
    subtopic: "mixed_operations",
    latex: "a-b+c",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
      b: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.6,
        preferZero: 0.01,
      },
      c: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 60 }],
    tags: ["tier:2", "template:chain", "signed"],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T2_CHAIN_SUB_SUB",
    subtopic: "mixed_operations",
    latex: "a-b-c",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.01,
      },
      b: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.45,
        preferZero: 0.01,
      },
      c: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.45,
        preferZero: 0.01,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 60 }],
    tags: ["tier:2", "template:chain", "signed"],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T2_LEADING_MINUS_ADD",
    subtopic: "negation",
    latex: "-a-b",
    promptTemplate: PROMPT_HE,
    vars: {
      // Prefer non-negative a,b so the leading minus is the main concept.
      a: { type: "natural", min: 0, max: 30, preferZero: 0.08 },
      b: { type: "natural", min: 0, max: 30, preferZero: 0.08 },
    },
    constraints: [{ kind: "resultAbsMax", value: 80 }],
    tags: ["tier:2", "template:leading_minus", "signed"],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T2_DIV_PLUS_INT",
    subtopic: "mixed_operations",
    latex: "\\frac{a}{b}+c",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -60,
        max: 60,
        preferNegative: 0.5,
        preferZero: 0.05,
      },
      b: {
        type: "integer",
        min: -12,
        max: 12,
        notZero: true,
        preferNegative: 0.45,
      },
      c: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.05,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 80 }],
    tags: ["tier:2", "template:mixed_div_add", "signed", "has:fraction"],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    hintsTemplate: HINTS_ORDER_OF_OPS,
  },

  // ---------------------------
  // Tier 3 — parentheses & distributive (≈ 0.75–1.0)
  // ---------------------------

  {
    topicId: TOPIC_ID,
    templateId: "SN_T3_NEGATE_PARENS_SUB",
    subtopic: "negation_parentheses",
    latex: "-(a-b)",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.03,
      },
      b: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.55,
        preferZero: 0.03,
      },
    },
    constraints: [
      { kind: "varNotEqual", a: "a", b: "b" },
      { kind: "resultAbsMax", value: 80 },
    ],
    tags: ["tier:3", "template:minus_parentheses", "signed"],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    hintsTemplate: HINTS_DISTRIBUTE_MINUS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T3_NEGATE_PARENS_ADD",
    subtopic: "negation_parentheses",
    latex: "-(a+b)",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.03,
      },
      b: {
        type: "integer",
        min: -20,
        max: 20,
        preferNegative: 0.5,
        preferZero: 0.03,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 80 }],
    tags: ["tier:3", "template:minus_parentheses", "signed"],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    hintsTemplate: HINTS_DISTRIBUTE_MINUS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T3_DISTRIB_A_B_PLUS_C",
    subtopic: "distributive",
    latex: "a(b+c)",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -8,
        max: 8,
        notZero: true,
        preferNegative: 0.45,
      },
      b: {
        type: "integer",
        min: -12,
        max: 12,
        preferNegative: 0.5,
        preferZero: 0.05,
      },
      c: {
        type: "integer",
        min: -12,
        max: 12,
        preferNegative: 0.5,
        preferZero: 0.05,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 600 }],
    tags: ["tier:3", "template:distributive", "signed"],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T3_DISTRIB_A_A_MINUS_B",
    subtopic: "distributive",
    latex: "a(a-b)",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -8,
        max: 8,
        notZero: true,
        preferNegative: 0.45,
      },
      b: {
        type: "integer",
        min: -12,
        max: 12,
        preferNegative: 0.5,
        preferZero: 0.05,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 600 }],
    tags: ["tier:3", "template:distributive", "signed"],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    hintsTemplate: HINTS_ORDER_OF_OPS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T3_DISTRIB_NEG_A_B_PLUS_C",
    subtopic: "distributive",
    latex: "-a(b+c)",
    promptTemplate: PROMPT_HE,
    vars: {
      a: { type: "natural", min: 1, max: 8 }, // keep leading minus explicit
      b: {
        type: "integer",
        min: -12,
        max: 12,
        preferNegative: 0.5,
        preferZero: 0.05,
      },
      c: {
        type: "integer",
        min: -12,
        max: 12,
        preferNegative: 0.5,
        preferZero: 0.05,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 600 }],
    tags: ["tier:3", "template:distributive_leading_minus", "signed"],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    hintsTemplate: HINTS_ORDER_OF_OPS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_T3_NEG_A_TIMES_B",
    subtopic: "multiplication",
    latex: "-a\\times b",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -12,
        max: 12,
        notZero: true,
        preferNegative: 0.45,
      },
      b: {
        type: "integer",
        min: -12,
        max: 12,
        notZero: true,
        preferNegative: 0.45,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 240 }],
    tags: ["tier:3", "template:mul_leading_minus", "signed"],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
  },

  // ---------------------------
  // Powers — key misconceptions (including (-a)^n vs -a^n)
  // ---------------------------

  {
    topicId: TOPIC_ID,
    templateId: "SN_POW_A_TO_N",
    subtopic: "powers",
    latex: "a^n",
    promptTemplate: PROMPT_HE,
    vars: {
      a: {
        type: "integer",
        min: -7,
        max: 7,
        notZero: true,
        preferNegative: 0.5,
      },
      n: { type: "natural", min: 2, max: 3 },
    },
    constraints: [{ kind: "resultAbsMax", value: 2000 }],
    tags: ["tier:2", "template:power", "signed"],
    misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
    hintsTemplate: HINTS_POWERS_PARENS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_POW_PARENS_NEG_A_TO_N",
    subtopic: "powers_parentheses",
    latex: "(-a)^n",
    promptTemplate: PROMPT_HE,
    vars: {
      a: { type: "natural", min: 1, max: 8 },
      n: { type: "natural", min: 2, max: 3 },
    },
    constraints: [{ kind: "resultAbsMax", value: 3000 }],
    tags: ["tier:3", "template:power_parens", "signed"],
    misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
    hintsTemplate: HINTS_POWERS_PARENS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_POW_LEADING_MINUS_A_TO_N",
    subtopic: "powers_parentheses",
    latex: "-a^n",
    promptTemplate: PROMPT_HE,
    vars: {
      a: { type: "natural", min: 1, max: 8 },
      n: { type: "natural", min: 2, max: 3 },
    },
    constraints: [{ kind: "resultAbsMax", value: 3000 }],
    tags: ["tier:3", "template:power_leading_minus", "signed"],
    misconceptions: ["PARENS_IN_POWERS"],
    hintsTemplate: HINTS_POWERS_PARENS,
  },

  // ---------------------------
  // Fraction powers — allow non-reduced display before exponent
  // (requires core support for simpleFraction with allowNonReduced + displayFraction)
  // ---------------------------

  {
    topicId: TOPIC_ID,
    templateId: "SN_FRAC_POW_SIMPLE_C2_C3",
    subtopic: "fraction_powers",
    latex: "\\left(f\\right)^c",
    promptTemplate: PROMPT_HE,
    vars: {
      // f is sampled as a simple fraction (possibly non-reduced for display),
      // including negative values, with small denominators.
      f: {
        type: "simpleFraction",
        min: -2,
        max: 2,
        denominators: [2, 3, 4, 5, 6, 8, 9, 10],
        maxNumerator: 9,
        allowNonReduced: true,
        allowNegative: true,
      },
      c: { type: "natural", min: 2, max: 3 },
    },
    constraints: [{ kind: "resultAbsMax", value: 2000 }],
    tags: ["tier:3", "template:fraction_power", "signed", "has:fraction"],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    hintsTemplate: HINTS_POWERS_PARENS,
  },

  {
    topicId: TOPIC_ID,
    templateId: "SN_FRAC_POW_LEADING_MINUS_SQ",
    subtopic: "fraction_powers",
    latex: "-\\left(f\\right)^2",
    promptTemplate: PROMPT_HE,
    vars: {
      f: {
        type: "simpleFraction",
        min: -2,
        max: 2,
        denominators: [2, 3, 4, 5, 6, 8, 9, 10],
        maxNumerator: 9,
        allowNonReduced: true,
        allowNegative: true,
      },
    },
    constraints: [{ kind: "resultAbsMax", value: 2000 }],
    tags: [
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "has:fraction",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    hintsTemplate: HINTS_POWERS_PARENS,
  },
];
