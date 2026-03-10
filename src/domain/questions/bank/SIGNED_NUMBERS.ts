import type { Question } from "@domain/questions/types";

export const SIGNED_NUMBERS_QUESTIONS: Question[] = [
  {
    id: "SN_T1_SUB_INT__numeric__d0__i0__e0fc9d09",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-22-13",
        display: true,
      },
    ],
    correctAnswers: ["-35"],
    difficulty: 0.19540229885057472,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.19540229885057472,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_LEADING_MINUS_A_TO_N__numeric__d0__i1__dffc9b76",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(6^{3}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-216"],
    difficulty: 0.25287356321839083,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_leading_minus",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS"],
    seeds: {
      difficulty: 0.25287356321839083,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d0__i2__defc99e3",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{6}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-9/25"],
    difficulty: 0.5977011494252874,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5977011494252874,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d0__i3__ddfc9850",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(3+7)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-10"],
    difficulty: 0.04310344827586208,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.04310344827586208,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d0__i4__e4fca355",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-12}{-2}+3",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["9"],
    difficulty: 0.1982758620689655,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.1982758620689655,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d0__i5__e3fca1c2",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(9+(-3))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-6"],
    difficulty: 0.1810344827586207,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.1810344827586207,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C__numeric__d0__i6__e2fca02f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-3\\times(-10+2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["24"],
    difficulty: 0.07758620689655173,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.07758620689655173,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d0__i7__e1fc9e9c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7-11+(-4)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-22"],
    difficulty: 0.20402298850574713,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.20402298850574713,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_A_TO_N__numeric__d0__i8__e8fca9a1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "2^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["8"],
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:2",
      "template:power",
      "signed",
    ],
    misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.01149425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d0__i9__e7fca80e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10+5-6",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-11"],
    difficulty: 0.1925287356321839,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.1925287356321839,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d0__i10__e0a86f32",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6-4-0",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-10"],
    difficulty: 0.13793103448275862,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "has:zero",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.13793103448275862,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d0__i11__e1a870c5",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-21-3",
        display: true,
      },
    ],
    correctAnswers: ["-24"],
    difficulty: 0.18390804597701152,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.18390804597701152,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d0__i12__dea86c0c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times-1",
        display: true,
      },
    ],
    correctAnswers: ["2"],
    difficulty: 0,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d0__i13__dfa86d9f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-2+1)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.1925287356321839,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.1925287356321839,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d0__i14__dca868e6",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(\\frac{6}{9}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["8/27"],
    difficulty: 0.3337590464027246,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.3337590464027246,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_POW_PARENS_NEG_A_TO_N__numeric__d0__i15__dda86a79",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-5^{2}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["25"],
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_parens",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.01149425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d0__i16__daa865c0",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-23-22",
        display: true,
      },
    ],
    correctAnswers: ["-45"],
    difficulty: 0.20689655172413796,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.20689655172413796,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d0__i17__dba86753",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6-10+(-1)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-17"],
    difficulty: 0.1925287356321839,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.1925287356321839,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d0__i18__e8a87bca",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9\\times-1",
        display: true,
      },
    ],
    correctAnswers: ["9"],
    difficulty: 0.04597701149425288,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.04597701149425288,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d0__i19__e9a87d5d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8\\times1",
        display: true,
      },
    ],
    correctAnswers: ["-8"],
    difficulty: 0.034482758620689655,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.034482758620689655,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_PARENS_NEG_A_TO_N__numeric__d0__i20__daa62729",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6^{2}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["36"],
    difficulty: 0.02298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_parens",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.02298850574712644,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_A_TO_N__numeric__d0__i21__d9a62596",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "1^{2}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.1839080459770115,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:2",
      "template:power",
      "signed",
    ],
    misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.1839080459770115,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i0__d881d685",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-1\\times(-3+(-1))",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-8\\times-2",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.027298850574712645,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "vars:2",
      "tier:1",
      "template:multiplication",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS",
      "NEGATIVE_MULTIPLY_RULE",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.027298850574712645,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i1__d781d4f2",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-6^{2}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=2^{2}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.01724137931034483,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_parens",
      "signed",
      "tier:2",
      "template:power",
      "family:compare",
    ],
    misconceptions: [
      "PARENS_IN_POWERS",
      "NEGATIVE_BASE_PARITY",
      "POWER_RULES",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.01724137931034483,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i2__d681d35f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-7\\times4",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-6-6-20",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.16091954022988508,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
      "vars:3",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "NEGATIVE_MULTIPLY_RULE",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.16091954022988508,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i3__d581d1cc",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-3\\times(3+3)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-26+(-30)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.15373563218390807,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
      "vars:2",
      "has:negative",
      "tier:1",
      "template:addition",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.15373563218390807,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i4__d481d039",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-27+(-15)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-1\\times-2",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.12643678160919541,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "NEGATIVE_MULTIPLY_RULE",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.12643678160919541,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i5__d381cea6",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-11+(-4)-(-4)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-1\\times-2",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.21695402298850575,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "LEADING_MINUS_CONFUSION",
      "NEGATIVE_MULTIPLY_RULE",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.21695402298850575,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i6__d281cd13",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-1\\times-3",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-2\\times-5",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "NEGATIVE_MULTIPLY_RULE",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0,
    },
  },
  {
    id: "SN_COMPARE__compare__d0__i7__d181cb80",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-28+(-19)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=1^{2}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.22413793103448276,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
      "op:^",
      "tier:2",
      "template:power",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "POWER_RULES",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.22413793103448276,
    },
  },
  {
    id: "SN_SIGN__sign__d0__i0__93d2cb89",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-8+(-4)-10",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.1925287356321839,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.1925287356321839,
    },
  },
  {
    id: "SN_SIGN__sign__d0__i1__92d2c9f6",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-3\\times(8+(-3))",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.05459770114942529,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.05459770114942529,
    },
  },
  {
    id: "SN_SIGN__sign__d0__i2__91d2c863",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-3\\times(-3+2)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.020114942528735632,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.020114942528735632,
    },
  },
  {
    id: "SN_SIGN__sign__d0__i3__90d2c6d0",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-9+(-3)-6",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.1810344827586207,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.1810344827586207,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d0__i0__e6f415b0",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "2^{2}",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "17-18",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(2^{2}\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-5-3",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-8)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:2",
      "template:power",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "POWER_RULES",
      "NEGATIVE_BASE_PARITY",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.01149425287356322,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d0__i1__e7f41743",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-1\\times(-11+(-3))",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "\\left(-1\\times(-11+(-3))\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "13-13",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-5-14",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-9)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.08908045977011494,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.08908045977011494,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d0__i2__e8f418d6",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-1\\times2",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "11-3",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-6-13",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-1\\times2\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-10)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "NEGATIVE_MULTIPLY_RULE",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d0__i3__e9f41a69",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(-3+(-2)\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "7-4",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-10-17",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-\\left(-3+(-2)\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-3)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.2298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.2298850574712644,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d1__i0__c0879f2a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-14}{1}+(-7)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-21"],
    difficulty: 0.13505747126436785,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.13505747126436785,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d1__i1__c187a0bd",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-4+3)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.278735632183908,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.278735632183908,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d1__i2__be879c04",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(-\\frac{6}{10}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-27/125"],
    difficulty: 0.4349425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.4349425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_POW_PARENS_NEG_A_TO_N__numeric__d1__i3__bf879d97",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-5^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-125"],
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_parens",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.01149425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d1__i4__bc8798de",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times-4",
        display: true,
      },
    ],
    correctAnswers: ["8"],
    difficulty: 0,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_A_MINUS_B__numeric__d1__i5__bd879a71",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-1-3)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["4"],
    difficulty: 0.008620689655172414,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.008620689655172414,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d1__i6__ba8795b8",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6-(-6)-6",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-6"],
    difficulty: 0.367816091954023,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.367816091954023,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d1__i7__bb87974b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-13}{4}+(-19)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-89/4"],
    difficulty: 0.1925287356321839,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.1925287356321839,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d1__i8__b8879292",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-24-3",
        display: true,
      },
    ],
    correctAnswers: ["-27"],
    difficulty: 0.21839080459770116,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.21839080459770116,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d1__i9__b9879425",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9+4-0",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-5"],
    difficulty: 0.3342911877394636,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "has:zero",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.3342911877394636,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d1__i10__3581bdf7",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6-(-4)-4",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-6"],
    difficulty: 0.367816091954023,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.367816091954023,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d1__i11__3481bc64",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-13}{-3}+8",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["37/3"],
    difficulty: 0.14124668435013263,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.14124668435013263,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d1__i12__3781c11d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-49/100"],
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d1__i13__3681bf8a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8+(-6)-(-6)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-8"],
    difficulty: 0.3994252873563219,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.3994252873563219,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d1__i14__3181b7ab",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(-\\frac{9}{18}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-1/8"],
    difficulty: 0.35344827586206895,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.35344827586206895,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_A_MINUS_B__numeric__d1__i15__3381bad1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-1-(-4))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-3"],
    difficulty: 0.3247126436781609,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.3247126436781609,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d1__i16__3281b93e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times1",
        display: true,
      },
    ],
    correctAnswers: ["-2"],
    difficulty: 0,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d1__i17__2d81b15f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-4-3\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["7"],
    difficulty: 0.2298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.2298850574712644,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d1__i18__2c81afcc",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7-(-6)+(-6)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-7"],
    difficulty: 0.3879310344827587,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.3879310344827587,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d1__i19__237ae5dc",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-3+2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.24999999999999997,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.24999999999999997,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d1__i20__247ae76f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-11}{-3}+(-5)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-4/3"],
    difficulty: 0.4036050156739811,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.4036050156739811,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d1__i21__257ae902",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-3-6\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["9"],
    difficulty: 0.2413793103448276,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.2413793103448276,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i0__180d6fc6",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-7\\times2",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-7-(-13)+(-9)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.37256852343059244,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
      "vars:3",
      "op:+",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "NEGATIVE_MULTIPLY_RULE",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.37256852343059244,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i1__190d7159",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=2^{2}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-5-3",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.00574712643678161,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:2",
      "template:power",
      "signed",
      "op:-",
      "template:leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "POWER_RULES",
      "NEGATIVE_BASE_PARITY",
      "LEADING_MINUS_CONFUSION",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.00574712643678161,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i2__160d6ca0",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-5^{2}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=2^{2}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_parens",
      "signed",
      "tier:2",
      "template:power",
      "family:compare",
    ],
    misconceptions: [
      "PARENS_IN_POWERS",
      "NEGATIVE_BASE_PARITY",
      "POWER_RULES",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.01149425287356322,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i3__170d6e33",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(-3-(-20)\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-6-2-2",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.2959770114942529,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "vars:3",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.2959770114942529,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i4__1c0d7612",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\left(-\\frac{10}{16}\\right)^{3}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=\\left(\\frac{4}{6}\\right)^{3}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.45169902751170715,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.45169902751170715,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i5__1d0d77a5",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-1\\times(1+(-1))",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-7\\times-4",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.19396551724137934,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "vars:2",
      "tier:1",
      "template:multiplication",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS",
      "NEGATIVE_MULTIPLY_RULE",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.19396551724137934,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i6__1a0d72ec",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-3\\times(-2+(-9))",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-3\\times(-3+(-2))",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.04310344827586208,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.04310344827586208,
    },
  },
  {
    id: "SN_COMPARE__compare__d1__i7__1b0d747f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-7-(-5)+(-8)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-1\\times(-1-0)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.20402298850574715,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "op:*",
      "has:zero",
      "tier:3",
      "template:distributive",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTIVE_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.20402298850574715,
    },
  },
  {
    id: "SN_SIGN__sign__d1__i0__735dcdaa",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(-4-1\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.2298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.2298850574712644,
    },
  },
  {
    id: "SN_SIGN__sign__d1__i1__745dcf3d",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "2^{2}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:2",
      "template:power",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "POWER_RULES",
      "NEGATIVE_BASE_PARITY",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.01149425287356322,
    },
  },
  {
    id: "SN_SIGN__sign__d1__i2__715dca84",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-3\\times(1+(-4))",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.020114942528735632,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.020114942528735632,
    },
  },
  {
    id: "SN_SIGN__sign__d1__i3__725dcc17",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-5-30",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.28735632183908044,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.28735632183908044,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d1__i0__8ae8c80f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-2\\times-4",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "12-12",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-8-3",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-2\\times-4\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-3)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "NEGATIVE_MULTIPLY_RULE",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d1__i1__89e8c67c",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(-2+(-2)\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "13-4",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-\\left(-2+(-2)\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-15-15",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-11)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.2298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.2298850574712644,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d1__i2__8ce8cb35",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(-3-6\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-3-6",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-\\left(-3-6\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "--3-6",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "7-10",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.2413793103448276,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.2413793103448276,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d1__i3__8be8c9a2",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-7\\times-4",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "\\left(-7\\times-4\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "2-17",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-13-5",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-6)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.02298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "NEGATIVE_MULTIPLY_RULE",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.02298850574712644,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d2__i0__f64f5557",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-3+2\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.4597701149425288,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.4597701149425288,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d2__i1__f54f53c4",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{16}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-16/25"],
    difficulty: 0.5287356321839082,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5287356321839082,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d2__i2__f84f587d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-3+8\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-5"],
    difficulty: 0.3936781609195403,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.3936781609195403,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d2__i3__f74f56ea",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times-12",
        display: true,
      },
    ],
    correctAnswers: ["24"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d2__i4__f24f4f0b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-4-(-18)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-14"],
    difficulty: 0.4559386973180077,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.4559386973180077,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d2__i5__f14f4d78",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-28+(-21)",
        display: true,
      },
    ],
    correctAnswers: ["-49"],
    difficulty: 0.264367816091954,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.264367816091954,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_LEADING_MINUS_A_TO_N__numeric__d2__i6__f44f5231",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(6^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-36"],
    difficulty: 0.25287356321839083,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_leading_minus",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS"],
    seeds: {
      difficulty: 0.25287356321839083,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d2__i7__f34f509e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8+8-(-7)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["7"],
    difficulty: 0.4425287356321839,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.4425287356321839,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d2__i8__ee4f48bf",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(\\frac{16}{20}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["64/125"],
    difficulty: 0.4009195402298851,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.4009195402298851,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d2__i9__1fe1291c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-14}{-4}+(-8)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-9/2"],
    difficulty: 0.369047619047619,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.369047619047619,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d2__i10__21e12c42",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(1+(-1))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3649425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3649425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d2__i11__22e12dd5",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(\\frac{9}{12}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["27/64"],
    difficulty: 0.36530172413793105,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.36530172413793105,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_POW_A_TO_N__numeric__d2__i12__1be122d0",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "2^{2}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["4"],
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:2",
      "template:power",
      "signed",
    ],
    misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.01149425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d2__i13__1ce12463",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8+(-17)-(-16)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-9"],
    difficulty: 0.6651453684922244,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.6651453684922244,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d2__i14__1de125f6",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-23-(-13)",
        display: true,
      },
    ],
    correctAnswers: ["-10"],
    difficulty: 0.6316841579210395,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.6316841579210395,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d2__i15__1ee12789",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-3-(-8)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-5"],
    difficulty: 0.3936781609195403,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.3936781609195403,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d2__i16__27e135b4",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9+(-11)-(-2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-18"],
    difficulty: 0.4339080459770115,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.4339080459770115,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d2__i17__31e80137",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-27+(-11)",
        display: true,
      },
    ],
    correctAnswers: ["-38"],
    difficulty: 0.25287356321839083,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.25287356321839083,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d2__i18__30e7ffa4",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8+16-(-4)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["12"],
    difficulty: 0.5775862068965517,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.5775862068965517,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d2__i19__33e8045d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-15}{-5}+(-3)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.49137931034482757,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.49137931034482757,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d2__i20__32e802ca",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-14}{-9}+(-8)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-58/9"],
    difficulty: 0.3211548987411057,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.3211548987411057,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d2__i21__2de7faeb",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-2+3\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.4597701149425288,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.4597701149425288,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i0__4dd525f3",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-7-(-17)-(-13)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(6^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.3735632183908046,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.3735632183908046,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i1__4cd52460",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-8+(-17)-(-5)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-5^{2}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.257183908045977,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_parens",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "PARENS_IN_POWERS",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.257183908045977,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i2__4fd52919",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-8-(-6)+1",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-6\\times-4",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.35632183908045983,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "op:*",
      "tier:1",
      "template:multiplication",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.35632183908045983,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i3__4ed52786",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-8+(-3)-(-7)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=\\frac{-14}{4}+(-4)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.4334975369458128,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "op:/",
      "has:fraction",
      "template:mixed_div_add",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "ORDER_OF_OPERATIONS",
      "NEGATIVE_DIVIDE_RULE",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.4334975369458128,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i4__51d52c3f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\left(\\frac{12}{30}\\right)^{3}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(5^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.34689655172413797,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
      "template:power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.34689655172413797,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i5__50d52aac",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-1\\times(-1-11)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-6-(-10)-5",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.4008620689655173,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "vars:3",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.4008620689655173,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i6__53d52f65",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=2^{3}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.4022988505747127,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "tier:2",
      "template:power",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "POWER_RULES",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.4022988505747127,
    },
  },
  {
    id: "SN_COMPARE__compare__d2__i7__52d52dd2",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-28+2",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=\\left(-\\frac{4}{18}\\right)^{3}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.46570757341297997,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.46570757341297997,
    },
  },
  {
    id: "SN_SIGN__sign__d2__i0__a92583d7",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(-2+(-2)\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.2298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.2298850574712644,
    },
  },
  {
    id: "SN_SIGN__sign__d2__i1__a8258244",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-7-7-(-4)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.37931034482758624,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.37931034482758624,
    },
  },
  {
    id: "SN_SIGN__sign__d2__i2__ab2586fd",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(5^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.2413793103448276,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.2413793103448276,
    },
  },
  {
    id: "SN_SIGN__sign__d2__i3__aa25856a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-6-26",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.2413793103448276,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.2413793103448276,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d2__i0__37ac7302",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-8+5-(-8)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-8+5-8",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "3-8",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-8+5-(-8)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-15-9",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.5287356321839081,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5287356321839081,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d2__i1__38ac7495",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-21-(-11)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-21-11",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-21-(-11)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "5-18",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-5-6",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.5944170771756978,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5944170771756978,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d2__i2__35ac6fdc",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-29+17",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "4-6",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-15-9",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-29+17\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-2)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.4780023781212842,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.4780023781212842,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d2__i3__36ac716f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "\\frac{-14}{-8}+8",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "6-14",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(\\frac{-14}{-8}+8\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-4-9",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-8)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.23973727422003285,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.23973727422003285,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d3__i0__0c0775b8",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times12",
        display: true,
      },
    ],
    correctAnswers: ["-24"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_A_MINUS_B__numeric__d3__i1__0d07774b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-1-(-1))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.5833333333333334,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5833333333333334,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d3__i2__0f077a71",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(-\\frac{3}{30}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-1/1000"],
    difficulty: 0.6895402298850575,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.6895402298850575,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d3__i3__10077c04",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-24-(-1)",
        display: true,
      },
    ],
    correctAnswers: ["-23"],
    difficulty: 0.46264367816091956,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.46264367816091956,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d3__i4__11077d97",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6\\times-12",
        display: true,
      },
    ],
    correctAnswers: ["72"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d3__i5__12077f2a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-3+10",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.5028735632183908,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5028735632183908,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d3__i6__130780bd",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-3+4\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.4885057471264368,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.4885057471264368,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d3__i7__fdc116a1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-(-2)+6",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.7442528735632183,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7442528735632183,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d3__i8__fcc1150e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-22-(-10)",
        display: true,
      },
    ],
    correctAnswers: ["-12"],
    difficulty: 0.5820271682340648,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5820271682340648,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d3__i9__fbc1137b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(-\\frac{3}{8}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-27/512"],
    difficulty: 0.5916397270114943,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.5916397270114943,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d3__i10__01c11ced",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-14}{-3}+(-5)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1/3"],
    difficulty: 0.47167487684729065,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.47167487684729065,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d3__i11__00c11b5a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6-12",
        display: true,
      },
    ],
    correctAnswers: ["-18"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d3__i12__ffc119c7",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-11-(-10)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-9"],
    difficulty: 0.4879832810867294,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.4879832810867294,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d3__i13__fec11834",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-15}{-4}+(-4)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1/4"],
    difficulty: 0.48563218390804597,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.48563218390804597,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d3__i14__f5c10a09",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-15-(-13)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-10"],
    difficulty: 0.5862068965517242,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5862068965517242,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d3__i15__f4c10876",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-5-(-6)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.5287356321839081,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.5287356321839081,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d3__i16__03c35eaa",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-14}{4}+3",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1/2"],
    difficulty: 0.4675697865353038,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.4675697865353038,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d3__i17__04c3603d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-4-(-19)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-15"],
    difficulty: 0.4633998790078645,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.4633998790078645,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d3__i18__01c35b84",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-(-3)+(-16)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-21"],
    difficulty: 0.49137931034482757,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.49137931034482757,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d3__i19__02c35d17",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-(-16)-0",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["8"],
    difficulty: 0.6551724137931035,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "has:zero",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.6551724137931035,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d3__i20__ffc3585e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-24-(-11)",
        display: true,
      },
    ],
    correctAnswers: ["-13"],
    difficulty: 0.6063218390804599,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.6063218390804599,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d3__i21__00c359f1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-21-(-14)",
        display: true,
      },
    ],
    correctAnswers: ["-7"],
    difficulty: 0.6436781609195403,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.6436781609195403,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i0__f61fb6f4",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\left(\\frac{3}{10}\\right)^{3}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{18}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.705344827586207,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
      "vars:1",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "LEADING_MINUS_CONFUSION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.705344827586207,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i1__f71fb887",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-1\\times(-1-(-12))",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-9+1-(-5)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.4942528735632184,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "vars:3",
      "op:+",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.4942528735632184,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i2__f81fba1a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-22-(-16)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(-4-(-8)\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.5564263322884012,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "tier:3",
      "template:minus_parentheses",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.5564263322884012,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i3__f91fbbad",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(\\frac{27}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{24}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6264367816091955,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "has:negative",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6264367816091955,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i4__f21fb0a8",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-7-(-1)-(-9)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-25-(-19)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6770114942528735,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6770114942528735,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i5__f31fb23b",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-25+28",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-9-2+7",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.47242747673782154,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
      "vars:3",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: ["SIGN_ERROR", "SUBTRACTION_SIGN_ERROR", "SIGN_INTUITION"],
    seeds: {
      difficulty: 0.47242747673782154,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i6__f41fb3ce",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-7-(-10)-(-10)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{24}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.471264367816092,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.471264367816092,
    },
  },
  {
    id: "SN_COMPARE__compare__d3__i7__f51fb561",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\frac{-14}{2}+7",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10+(-4)-(-13)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6275419982316535,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
      "op:-",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6275419982316535,
    },
  },
  {
    id: "SN_SIGN__sign__d3__i0__bedda438",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-8-(-9)+1",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6791187739463601,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.6791187739463601,
    },
  },
  {
    id: "SN_SIGN__sign__d3__i1__bfdda5cb",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-17-(-9)+9",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8274171737660581,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8274171737660581,
    },
  },
  {
    id: "SN_SIGN__sign__d3__i2__c0dda75e",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "\\left(-\\frac{6}{27}\\right)^{3}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6424167888620848,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.6424167888620848,
    },
  },
  {
    id: "SN_SIGN__sign__d3__i3__c1dda8f1",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-7-(-2)-(-4)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6748768472906405,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.6748768472906405,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d3__i0__95964221",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{27}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-\\left(\\frac{27^{2}}{30}\\right)",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "16-16",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(\\frac{27}{30}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-8-4",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d3__i1__9496408e",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{8}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-\\left(\\frac{8^{2}}{10}\\right)",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "15-17",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(\\frac{8}{10}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-8-7",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.5287356321839082,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.5287356321839082,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d3__i2__93963efb",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-1\\times(-1-(-1))",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "\\left(-1\\times(-1-(-1))\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-1\\times(-1-1)",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "10-15",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-4-15",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.5833333333333334,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5833333333333334,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d3__i3__92963d68",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "\\left(-\\frac{16}{18}\\right)^{3}",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "15-5",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(\\left(-\\frac{16}{18}\\right)^{3}\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-14-16",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-8)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.5629503492423884,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5629503492423884,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d4__i0__581a41d5",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-21-(-13)",
        display: true,
      },
    ],
    correctAnswers: ["-8"],
    difficulty: 0.6272577996715929,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.6272577996715929,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d4__i1__571a4042",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-81/100"],
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d4__i2__561a3eaf",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6\\times8",
        display: true,
      },
    ],
    correctAnswers: ["-48"],
    difficulty: 0.034482758620689655,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.034482758620689655,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d4__i3__551a3d1c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-(-13)-5",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.793103448275862,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.793103448275862,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d4__i4__541a3b89",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-3+3\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.5747126436781609,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5747126436781609,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d4__i5__531a39f6",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(5+(-5))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3649425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3649425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d4__i6__521a3863",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times8",
        display: true,
      },
    ],
    correctAnswers: ["-16"],
    difficulty: 0.034482758620689655,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.034482758620689655,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d4__i7__511a36d0",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(\\frac{1}{9}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["1/729"],
    difficulty: 0.6435204894123583,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.6435204894123583,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d4__i8__601a4e6d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-22-(-11)",
        display: true,
      },
    ],
    correctAnswers: ["-11"],
    difficulty: 0.5977011494252874,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5977011494252874,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d4__i9__90537376",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9-(-1)+7",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.7174329501915709,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7174329501915709,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d4__i10__91537509",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-30+6",
        display: true,
      },
    ],
    correctAnswers: ["-24"],
    difficulty: 0.3563218390804598,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.3563218390804598,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d4__i11__8e537050",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(\\frac{2}{18}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["1/729"],
    difficulty: 0.6435204894123583,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.6435204894123583,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_A_MINUS_B__numeric__d4__i12__945379c2",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-1-(-2))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.4109195402298851,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.4109195402298851,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d4__i13__9353782f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-4-(-20)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-16"],
    difficulty: 0.471264367816092,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.471264367816092,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d4__i14__295092ba",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7-30",
        display: true,
      },
    ],
    correctAnswers: ["-37"],
    difficulty: 0.28735632183908044,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.28735632183908044,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d4__i15__28509127",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-4-(-5)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.5057471264367817,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.5057471264367817,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d4__i16__25508c6e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times7",
        display: true,
      },
    ],
    correctAnswers: ["-14"],
    difficulty: 0.02298850574712644,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.02298850574712644,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d4__i17__225087b5",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-16}{-5}+(-4)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-4/5"],
    difficulty: 0.48563218390804597,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.48563218390804597,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d4__i18__21508622",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-29+28",
        display: true,
      },
    ],
    correctAnswers: ["-1"],
    difficulty: 0.6087990487514864,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.6087990487514864,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d4__i19__244e4c44",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7-22",
        display: true,
      },
    ],
    correctAnswers: ["-29"],
    difficulty: 0.19540229885057472,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.19540229885057472,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d4__i20__264e4f6a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7\\times-12",
        display: true,
      },
    ],
    correctAnswers: ["84"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d4__i21__274e50fd",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-4-(-11)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.7387669801462905,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7387669801462905,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i0__8ee07739",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-10+0-(-19)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-22-(-26)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7351959141886546,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "has:zero",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7351959141886546,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i1__8de075a6",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-9-(-4)+(-20)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10+(-5)-(-18)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6695402298850575,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6695402298850575,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i2__8ce07413",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(\\frac{27}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-22-(-30)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7471264367816091,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7471264367816091,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i3__8be07280",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(-3+3\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6839080459770115,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "op:+",
      "template:minus_parentheses",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6839080459770115,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i4__92e07d85",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\left(-\\frac{12}{27}\\right)^{3}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-8-(-16)-9",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7198108336092585,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
      "vars:3",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7198108336092585,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i5__91e07bf2",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-20-(-9)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6408045977011494,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6408045977011494,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i6__90e07a5f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-7-(-9)-2",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7356321839080459,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7356321839080459,
    },
  },
  {
    id: "SN_COMPARE__compare__d4__i7__8fe078cc",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-30-(-8)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=\\left(\\frac{3}{10}\\right)^{3}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6478735632183907,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6478735632183907,
    },
  },
  {
    id: "SN_SIGN__sign__d4__i0__0af07055",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_SIGN__sign__d4__i1__09f06ec2",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
  },
  {
    id: "SN_SIGN__sign__d4__i2__08f06d2f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{27}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
  },
  {
    id: "SN_SIGN__sign__d4__i3__07f06b9c",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-9-(-17)+(-11)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7868492224475997,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7868492224475997,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d4__i0__5cd485fc",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-9-(-6)+2",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-9-6+2",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "4-9",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-9-(-6)+2\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-18-3",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.7174329501915709,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7174329501915709,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d4__i1__5dd4878f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "16-12",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{9}{10}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-3-13",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-6)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d4__i2__5ed48922",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-10+(-9)-(-15)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-10+(-9)-15",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-10+(-9)-(-15)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "2-9",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-18-15",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7327586206896551,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7327586206896551,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d4__i3__5fd48ab5",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-8-(-1)+7",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-8-1+7",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "8-12",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-7-11",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "\\left(-8-(-1)+7\\right)+0",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "D",
    difficulty: 0.7442528735632183,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7442528735632183,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d5__i0__1667dd16",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7-15",
        display: true,
      },
    ],
    correctAnswers: ["-22"],
    difficulty: 0.1149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.1149425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d5__i1__1767dea9",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-4+4\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.5747126436781609,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5747126436781609,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d5__i2__1467d9f0",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-28+6",
        display: true,
      },
    ],
    correctAnswers: ["-22"],
    difficulty: 0.33825944170771755,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.33825944170771755,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d5__i3__1567db83",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11+(-10)-(-19)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-2"],
    difficulty: 0.8343920145190562,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.8343920145190562,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d5__i4__1a67e362",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7\\times11",
        display: true,
      },
    ],
    correctAnswers: ["-77"],
    difficulty: 0.06896551724137931,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.06896551724137931,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d5__i5__1b67e4f5",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-18-(-16)",
        display: true,
      },
    ],
    correctAnswers: ["-2"],
    difficulty: 0.685823754789272,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.685823754789272,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d5__i6__1867e03c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-16}{6}+2",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-2/3"],
    difficulty: 0.4885057471264368,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.4885057471264368,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d5__i7__1967e1cf",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-2-(-10)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.7586206896551724,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7586206896551724,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d5__i8__1e67e9ae",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-2+2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3649425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3649425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C__numeric__d5__i9__1f67eb41",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-4\\times(-6+6)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3764367816091954,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.3764367816091954,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d5__i10__71836adb",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(7+(-6))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.3386699507389162,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3386699507389162,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C__numeric__d5__i11__70836948",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-4\\times(-2+2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3649425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.3649425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d5__i12__72836c6e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{18}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-81/100"],
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d5__i13__74836f94",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10-(-5)+5",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.7672413793103449,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7672413793103449,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d5__i14__7783744d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10-(-19)+(-5)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["4"],
    difficulty: 0.7980943738656986,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7980943738656986,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d5__i15__768372ba",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-29+7",
        display: true,
      },
    ],
    correctAnswers: ["-22"],
    difficulty: 0.3590963139120095,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.3590963139120095,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d5__i16__69835e43",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-10-(-20)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["2"],
    difficulty: 0.8390804597701149,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8390804597701149,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d5__i17__68835cb0",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-19}{3}+7",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["2/3"],
    difficulty: 0.5252571082879612,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5252571082879612,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d5__i18__df7bc940",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-5-(-3)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["2"],
    difficulty: 0.4367816091954023,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.4367816091954023,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d5__i19__e17bcc66",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-3+20\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-17"],
    difficulty: 0.4540229885057471,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.4540229885057471,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_LEADING_MINUS_A_TO_N__numeric__d5__i20__e27bcdf9",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(7^{3}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-343"],
    difficulty: 0.26436781609195403,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_leading_minus",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS"],
    seeds: {
      difficulty: 0.26436781609195403,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d5__i21__e47bd11f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7-23",
        display: true,
      },
    ],
    correctAnswers: ["-30"],
    difficulty: 0.20689655172413796,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.20689655172413796,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i0__ee6c42da",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-1\\times(-1-(-1))",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6537356321839082,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6537356321839082,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i1__ef6c446d",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=\\left(\\frac{6}{20}\\right)^{3}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.705344827586207,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "template:fraction_power",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.705344827586207,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i2__ec6c3fb4",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-19-(-18)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-12+(-6)-(-15)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7366152450090745,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "vars:3",
      "op:+",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7366152450090745,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i3__ed6c4147",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{1}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10+(-16)-(-13)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7780172413793104,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:3",
      "op:+",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7780172413793104,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i4__ea6c3c8e",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-19-(-14)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-8-(-20)-6",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7075015124016939,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "vars:3",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7075015124016939,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i5__eb6c3e21",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-29+18",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{18}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6070154577883472,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6070154577883472,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i6__e86c3968",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-10-(-10)+3",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10-(-13)+(-7)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.679708222811671,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:compare",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR", "SIGN_INTUITION"],
    seeds: {
      difficulty: 0.679708222811671,
    },
  },
  {
    id: "SN_COMPARE__compare__d5__i7__e96c3afb",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-10-(-12)+(-2)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-9-(-6)-(-6)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7112068965517242,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7112068965517242,
    },
  },
  {
    id: "SN_SIGN__sign__d5__i0__c93e0b96",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-10-(-7)+4",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7327586206896551,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7327586206896551,
    },
  },
  {
    id: "SN_SIGN__sign__d5__i1__ca3e0d29",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-19-(-27)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7254150702426565,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7254150702426565,
    },
  },
  {
    id: "SN_SIGN__sign__d5__i2__c73e0870",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-11+5-(-5)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7473876698014629,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7473876698014629,
    },
  },
  {
    id: "SN_SIGN__sign__d5__i3__c83e0a03",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-10-(-12)+(-1)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7614942528735632,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7614942528735632,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d5__i0__edd6dc5b",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-9-(-19)+(-12)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-9-19+(-12)",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "8-4",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-9-(-19)+(-12)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-15-5",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.8343920145190562,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8343920145190562,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d5__i1__ecd6dac8",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-23-(-20)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-23-20",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "5-15",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-15-14",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "\\left(-23-(-20)\\right)+0",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "D",
    difficulty: 0.736631684157921,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.736631684157921,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d5__i2__efd6df81",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-23-(-30)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-23-30",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "5-4",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-23-(-30)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-15-5",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.7816091954022988,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7816091954022988,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d5__i3__eed6ddee",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "16-9",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-15-8",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "(-12)^{2}",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "D",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d6__i0__212db6c3",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-17}{-6}+(-2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["5/6"],
    difficulty: 0.4974645030425963,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.4974645030425963,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d6__i1__202db530",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9-13-(-20)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-2"],
    difficulty: 0.8390804597701149,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8390804597701149,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d6__i2__232db9e9",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-21-(-19)",
        display: true,
      },
    ],
    correctAnswers: ["-2"],
    difficulty: 0.7257799671592775,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7257799671592775,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d6__i3__222db856",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11+(-5)-(-19)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["3"],
    difficulty: 0.8162431941923775,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.8162431941923775,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d6__i4__242dbb7c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{18}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-81/100"],
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C__numeric__d6__i5__262dbea2",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-5\\times(-7+7)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3879310344827587,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.3879310344827587,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d6__i6__292dc35b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-3\\times-12",
        display: true,
      },
    ],
    correctAnswers: ["36"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d6__i7__282dc1c8",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(6+(-6))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3764367816091954,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3764367816091954,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d6__i8__a8f3f093",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-24+7",
        display: true,
      },
    ],
    correctAnswers: ["-17"],
    difficulty: 0.31896551724137934,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.31896551724137934,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d6__i9__a9f3f226",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8\\times-8",
        display: true,
      },
    ],
    correctAnswers: ["64"],
    difficulty: 0.034482758620689655,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.034482758620689655,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d6__i10__aaf3f3b9",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9-(-19)-11",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.8439201451905626,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8439201451905626,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d6__i11__adf3f872",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-8+8)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3994252873563218,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3994252873563218,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d6__i12__aef3fa05",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(\\frac{3}{24}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["1/512"],
    difficulty: 0.5974766522988505,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.5974766522988505,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d6__i13__b0f3fd2b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7\\times-10",
        display: true,
      },
    ],
    correctAnswers: ["70"],
    difficulty: 0.0574712643678161,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.0574712643678161,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d6__i14__39fb909b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11-(-1)+10",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.7787356321839081,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7787356321839081,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d6__i15__38fb8f08",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-17}{7}+2",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-3/7"],
    difficulty: 0.5056746836665701,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5056746836665701,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d6__i16__3afb922e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-20}{-7}+(-3)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1/7"],
    difficulty: 0.5463875205254516,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5463875205254516,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C__numeric__d6__i17__3dfb96e7",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-5\\times(6+(-7))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["5"],
    difficulty: 0.1416256157635468,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.1416256157635468,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d6__i18__3efb987a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{7}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-49/100"],
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d6__i19__31fb8403",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-5-(-19)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-14"],
    difficulty: 0.48154869933454325,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.48154869933454325,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d6__i20__30fb8270",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-29",
        display: true,
      },
    ],
    correctAnswers: ["-37"],
    difficulty: 0.27586206896551724,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.27586206896551724,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d6__i21__33f94892",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9-11-(-18)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-2"],
    difficulty: 0.8122605363984673,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8122605363984673,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i0__f7f4e807",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(-5-(-4)\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10-(-20)+(-7)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.668103448275862,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "vars:3",
      "op:+",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.668103448275862,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i1__f6f4e674",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-12+(-5)-(-14)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-21-(-16)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7079228243021346,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7079228243021346,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i2__f9f4eb2d",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-10-(-8)+(-3)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-12+1-(-5)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6063218390804599,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6063218390804599,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i3__f8f4e99a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-11-(-1)+7",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{18}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6411964472309301,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6411964472309301,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i4__f3f4e1bb",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-21-(-21)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-9-(-10)-(-1)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7241379310344829,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "vars:3",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7241379310344829,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i5__f2f4e028",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-11+(-9)-(-16)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.771551724137931,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:3",
      "op:+",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.771551724137931,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i6__f5f4e4e1",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7586206896551725,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7586206896551725,
    },
  },
  {
    id: "SN_COMPARE__compare__d6__i7__f4f4e34e",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-9-5-(-19)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-30+17",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6270417422867514,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "op:+",
      "tier:1",
      "template:addition",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6270417422867514,
    },
  },
  {
    id: "SN_SIGN__sign__d6__i0__d403e543",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-10-(-20)+(-8)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8477011494252874,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8477011494252874,
    },
  },
  {
    id: "SN_SIGN__sign__d6__i1__d303e3b0",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-11+(-4)-(-18)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8017241379310345,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8017241379310345,
    },
  },
  {
    id: "SN_SIGN__sign__d6__i2__d603e869",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-20-(-21)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7422003284072249,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7422003284072249,
    },
  },
  {
    id: "SN_SIGN__sign__d6__i3__d503e6d6",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-11-(-2)+13",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6956233421750663,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.6956233421750663,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d6__i0__ad8ce34e",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "16-9",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-15-3",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-2)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d6__i1__ae8ce4e1",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{7}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "16-14",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{7}{10}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-16-14",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-4)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d6__i2__ab8ce028",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-10-(-18)+(-5)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "\\left(-10-(-18)+(-5)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-10-18+(-5)",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "3-17",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-7-15",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8017241379310345,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8017241379310345,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d6__i3__ac8ce1bb",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-9-(-19)-10",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-9-19-10",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "8-17",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-9-(-19)-10\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-14-4",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.8620689655172414,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8620689655172414,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d7__i0__83251a84",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-12+(-7)-(-14)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-5"],
    difficulty: 0.6900656814449917,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.6900656814449917,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d7__i1__7f251438",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-19}{-1}+(-19)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.5373563218390804,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5373563218390804,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d7__i2__802515cb",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-5-(-4)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.5057471264367817,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.5057471264367817,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d7__i3__8125175e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9-15",
        display: true,
      },
    ],
    correctAnswers: ["-24"],
    difficulty: 0.1149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.1149425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d7__i4__822518f1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-27+7",
        display: true,
      },
    ],
    correctAnswers: ["-20"],
    difficulty: 0.3422733077905492,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.3422733077905492,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d7__i5__7b250dec",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-1+1)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3649425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3649425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d7__i6__7c250f7f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-19}{7}+2",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-5/7"],
    difficulty: 0.5243928787485955,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5243928787485955,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d7__i7__2d6b5165",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times11",
        display: true,
      },
    ],
    correctAnswers: ["-22"],
    difficulty: 0.06896551724137931,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.06896551724137931,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d7__i8__2c6b4fd2",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{16}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-16/25"],
    difficulty: 0.5287356321839082,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5287356321839082,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d7__i9__2b6b4e3f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-22-(-22)",
        display: true,
      },
    ],
    correctAnswers: ["0"],
    difficulty: 0.7701149425287356,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7701149425287356,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d7__i10__2a6b4cac",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11-(-2)+9",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.7787356321839081,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7787356321839081,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d7__i11__296b4b19",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10-(-18)+(-9)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.8400383141762451,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8400383141762451,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d7__i12__286b4986",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-18}{-2}+(-9)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.5258620689655172,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5258620689655172,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C__numeric__d7__i13__346b5c6a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-5\\times(2+(-2))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3649425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.3649425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d7__i14__336d996e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times(-6+6)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3764367816091954,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3764367816091954,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d7__i15__346d9b01",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-19}{-12}+(-1)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["7/12"],
    difficulty: 0.5267695099818511,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5267695099818511,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d7__i16__316d9648",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{8}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-16/25"],
    difficulty: 0.5287356321839082,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5287356321839082,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d7__i17__326d97db",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-9+9)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.410919540229885,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.410919540229885,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d7__i18__376d9fba",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-22-(-15)",
        display: true,
      },
    ],
    correctAnswers: ["-7"],
    difficulty: 0.6603970741901776,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.6603970741901776,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d7__i19__386da14d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-28+29",
        display: true,
      },
    ],
    correctAnswers: ["1"],
    difficulty: 0.6087990487514864,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.6087990487514864,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d7__i20__356d9c94",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-26",
        display: true,
      },
    ],
    correctAnswers: ["-34"],
    difficulty: 0.2413793103448276,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.2413793103448276,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d7__i21__366d9e27",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-12+(-12)-(-19)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-5"],
    difficulty: 0.7799455535390201,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.7799455535390201,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i0__803f46a8",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{16}{20}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10-(-9)-(-1)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6436781609195403,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:3",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6436781609195403,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i1__813f483b",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-11-(-1)+10",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-9-(-1)-(-12)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7227011494252874,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7227011494252874,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i2__823f49ce",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-12-(-19)+(-14)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-22-(-17)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7176964747291426,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR", "SIGN_INTUITION"],
    seeds: {
      difficulty: 0.7176964747291426,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i3__833f4b61",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\left(\\frac{14}{16}\\right)^{3}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{18}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.622418283045977,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
      "vars:1",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "LEADING_MINUS_CONFUSION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.622418283045977,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i4__843f4cf4",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-12-(-3)+8",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{24}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6451149425287357,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6451149425287357,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i5__853f4e87",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-1\\times(-1-(-1))",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6882183908045978,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6882183908045978,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i6__863f501a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{16}{20}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-23-(-20)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.6326836581709147,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "op:-",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6326836581709147,
    },
  },
  {
    id: "SN_COMPARE__compare__d7__i7__873f51ad",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-9-(-14)-6",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7865353037766832,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7865353037766832,
    },
  },
  {
    id: "SN_SIGN__sign__d7__i0__35fb4904",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{7}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_SIGN__sign__d7__i1__36fb4a97",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-9-(-13)-1",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7135278514588859,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7135278514588859,
    },
  },
  {
    id: "SN_SIGN__sign__d7__i2__37fb4c2a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-9-9-(-20)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8390804597701149,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8390804597701149,
    },
  },
  {
    id: "SN_SIGN__sign__d7__i3__38fb4dbd",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-23-(-25)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7770114942528736,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7770114942528736,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d7__i0__0b76b26d",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-10-(-12)-3",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "\\left(-10-(-12)-3\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-10-12-3",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "8-4",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-15-3",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7528735632183908,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7528735632183908,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d7__i1__0a76b0da",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-9-4-(-13)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-9-4-13",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-9-4-(-13)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "9-8",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-9-6",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.793103448275862,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.793103448275862,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d7__i2__0976af47",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{7}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{7}{10}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "16-10",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-5-18",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-7)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d7__i3__0876adb4",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-13+(-2)-(-14)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-13+(-2)-14",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-13+(-2)-(-14)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "2-16",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-16-10",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7885878489326766,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7885878489326766,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d8__i0__f0758bd1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-22}{-10}+(-2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1/5"],
    difficulty: 0.5687042842215256,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5687042842215256,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d8__i1__ed758718",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(-\\frac{2}{20}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-1/1000"],
    difficulty: 0.6895402298850575,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.6895402298850575,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d8__i2__f475921d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-4+9\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-5"],
    difficulty: 0.42911877394636017,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.42911877394636017,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d8__i3__f375908a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-6-(-9)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-3"],
    difficulty: 0.5057471264367817,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.5057471264367817,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d8__i4__f2758ef7",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-12-(-16)+(-9)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-5"],
    difficulty: 0.7284482758620691,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7284482758620691,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d8__i5__f1758d64",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9-29",
        display: true,
      },
    ],
    correctAnswers: ["-38"],
    difficulty: 0.27586206896551724,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.27586206896551724,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d8__i6__e8757f39",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-3\\times12",
        display: true,
      },
    ],
    correctAnswers: ["-36"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d8__i7__e7757da6",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8-30",
        display: true,
      },
    ],
    correctAnswers: ["-38"],
    difficulty: 0.28735632183908044,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.28735632183908044,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_LEADING_MINUS_A_TO_N__numeric__d8__i8__0408540a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(7^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-49"],
    difficulty: 0.26436781609195403,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_leading_minus",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS"],
    seeds: {
      difficulty: 0.26436781609195403,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d8__i9__0508559d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{24}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-16/25"],
    difficulty: 0.5287356321839082,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5287356321839082,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d8__i10__020850e4",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-25+25",
        display: true,
      },
    ],
    correctAnswers: ["0"],
    difficulty: 0.5747126436781609,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.5747126436781609,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d8__i11__03085277",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9\\times2",
        display: true,
      },
    ],
    correctAnswers: ["-18"],
    difficulty: 0.04597701149425288,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.04597701149425288,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d8__i12__00084dbe",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11-(-20)+(-5)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["4"],
    difficulty: 0.8132183908045977,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8132183908045977,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d8__i13__01084f51",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-23-(-17)",
        display: true,
      },
    ],
    correctAnswers: ["-6"],
    difficulty: 0.6916541729135431,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.6916541729135431,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d8__i14__fe084a98",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9\\times-4",
        display: true,
      },
    ],
    correctAnswers: ["36"],
    difficulty: 0.04597701149425288,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.04597701149425288,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d8__i15__ff084c2b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-8\\times7",
        display: true,
      },
    ],
    correctAnswers: ["-56"],
    difficulty: 0.034482758620689655,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.034482758620689655,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d8__i16__fc084772",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-20}{-11}+(-2)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-2/11"],
    difficulty: 0.5457157784743991,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5457157784743991,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d8__i17__fd084905",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-6-(-5)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.5287356321839081,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.5287356321839081,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_A_MINUS_B__numeric__d8__i18__fc0608db",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-1-(-3))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-2"],
    difficulty: 0.35344827586206895,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.35344827586206895,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d8__i19__fb060748",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11-(-6)-(-5)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.7701149425287356,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7701149425287356,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_A_TO_N__numeric__d8__i20__0206124d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "3^{2}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["9"],
    difficulty: 0.01149425287356322,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:2",
      "template:power",
      "signed",
    ],
    misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.01149425287356322,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_SIMPLE_C2_C3__numeric__d8__i21__ff060d94",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\left(\\frac{3}{30}\\right)^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["1/1000"],
    difficulty: 0.6895402298850575,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power",
      "signed",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
    ],
    seeds: {
      difficulty: 0.6895402298850575,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i0__ad8754cd",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-23-(-23)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10-(-12)-(-7)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6522988505747127,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "vars:3",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6522988505747127,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i1__ac87533a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-13+(-1)-(-13)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7496684350132627,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7496684350132627,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i2__ab8751a7",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-23-(-21)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7723638180909547,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "op:-",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7723638180909547,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i3__aa875014",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-30-(-24)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-10-6-(-14)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7742200328407224,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "vars:3",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7742200328407224,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i4__a9874e81",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{27}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-23-(-19)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7228885557221388,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "op:-",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7228885557221388,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i5__a8874cee",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(-5+14\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-24-(-26)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6230263988884679,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
      "op:-",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.6230263988884679,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i6__a7874b5b",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-10-(-8)-(-3)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-24-(-18)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7155172413793104,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7155172413793104,
    },
  },
  {
    id: "SN_COMPARE__compare__d8__i7__a68749c8",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-13+(-3)-(-11)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-14+(-3)-(-15)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7239168877099912,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7239168877099912,
    },
  },
  {
    id: "SN_SIGN__sign__d8__i0__a34bba51",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{2}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 1,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 1,
    },
  },
  {
    id: "SN_SIGN__sign__d8__i1__a24bb8be",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{4}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.735632183908046,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.735632183908046,
    },
  },
  {
    id: "SN_SIGN__sign__d8__i2__a14bb72b",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-24-(-19)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7212643678160919,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7212643678160919,
    },
  },
  {
    id: "SN_SIGN__sign__d8__i3__a04bb598",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-10-(-14)-6",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7553366174055829,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7553366174055829,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d8__i0__78b7c448",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-13+(-7)-(-20)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-13+(-7)-20",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-13+(-7)-(-20)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "2-10",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-12-15",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.8821839080459771,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8821839080459771,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d8__i1__79b7c5db",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-\\left(\\frac{9^{2}}{10}\\right)",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "16-7",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-6-16",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7241379310344828,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7241379310344828,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d8__i2__7ab7c76e",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "15-8",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-10-10",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "(-10)^{2}",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "D",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d8__i3__7bb7c901",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{1}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-\\left(\\frac{1^{2}}{10}\\right)",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "16-14",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(\\frac{1}{10}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-10-5",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 1,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 1,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d9__i0__65854472",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-6-(-20)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-14"],
    difficulty: 0.5057471264367817,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.5057471264367817,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d9__i1__66854605",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-27+27",
        display: true,
      },
    ],
    correctAnswers: ["0"],
    difficulty: 0.5977011494252874,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.5977011494252874,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d9__i2__648542df",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9-30",
        display: true,
      },
    ],
    correctAnswers: ["-39"],
    difficulty: 0.28735632183908044,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.28735632183908044,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d9__i3__61853e26",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-26-(-26)",
        display: true,
      },
    ],
    correctAnswers: ["0"],
    difficulty: 0.8160919540229885,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8160919540229885,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d9__i4__62853fb9",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-20}{5}+4",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.5488505747126438,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5488505747126438,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d9__i5__60853c93",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9\\times-12",
        display: true,
      },
    ],
    correctAnswers: ["108"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d9__i6__6d85510a",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-13+0-(-14)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.7885878489326766,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "has:zero",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.7885878489326766,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d9__i7__6e85529d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10-30",
        display: true,
      },
    ],
    correctAnswers: ["-40"],
    difficulty: 0.28735632183908044,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.28735632183908044,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d9__i8__98cd856f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9\\times-11",
        display: true,
      },
    ],
    correctAnswers: ["99"],
    difficulty: 0.06896551724137931,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.06896551724137931,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d9__i9__9acd8895",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10-8-(-18)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.8505747126436781,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8505747126436781,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d9__i10__99cd8702",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-26+26",
        display: true,
      },
    ],
    correctAnswers: ["0"],
    difficulty: 0.5862068965517242,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.5862068965517242,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_LEADING_MINUS_ADD__numeric__d9__i11__94cd7f23",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10-29",
        display: true,
      },
    ],
    correctAnswers: ["-39"],
    difficulty: 0.27586206896551724,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "tier:2",
      "template:leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION"],
    seeds: {
      difficulty: 0.27586206896551724,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d9__i12__96cd8249",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{24}{30}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-16/25"],
    difficulty: 0.5287356321839082,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.5287356321839082,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d9__i13__a0cd9207",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11-(-16)+(-6)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.8146551724137931,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8146551724137931,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d9__i14__26c61634",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-22}{7}+3",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1/7"],
    difficulty: 0.5695999402895955,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5695999402895955,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d9__i15__27c617c7",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-11-(-17)+(-7)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.8274171737660581,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8274171737660581,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d9__i16__29c61aed",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-3\\times-9",
        display: true,
      },
    ],
    correctAnswers: ["27"],
    difficulty: 0.04597701149425288,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.04597701149425288,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_ADD__numeric__d9__i17__22c60fe8",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(17+(-17)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.7126436781609196,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7126436781609196,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_ADD_SUB__numeric__d9__i18__24c6130e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-13+0-(-11)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-2"],
    difficulty: 0.7486737400530503,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "has:zero",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
    seeds: {
      difficulty: 0.7486737400530503,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d9__i19__25c614a1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-26+(-29)",
        display: true,
      },
    ],
    correctAnswers: ["-55"],
    difficulty: 0.27586206896551724,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.27586206896551724,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d9__i20__1ec6099c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-9\\times-10",
        display: true,
      },
    ],
    correctAnswers: ["90"],
    difficulty: 0.0574712643678161,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.0574712643678161,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_ADD_INT__numeric__d9__i21__1fc60b2f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "addition",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-26+7",
        display: true,
      },
    ],
    correctAnswers: ["-19"],
    difficulty: 0.33421750663129973,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:+",
      "has:negative",
      "tier:1",
      "template:addition",
      "signed",
    ],
    misconceptions: ["SIGN_ERROR"],
    seeds: {
      difficulty: 0.33421750663129973,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i0__4f9d85ae",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-12-(-5)-(-9)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-24-(-24)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7586206896551724,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7586206896551724,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i1__509d8741",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-11-(-6)-0",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6687565308254964,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "has:zero",
      "tier:2",
      "template:chain",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6687565308254964,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i2__4d9d8288",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-14+3-(-8)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-24-(-12)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.680008210180624,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.680008210180624,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i3__4e9d841b",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-14+(-5)-(-18)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-24-(-29)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.815579997357643,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.815579997357643,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i4__539d8bfa",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=\\left(-\\frac{14}{20}\\right)^{3}",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7216666666666667,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:2",
      "template:fraction_power",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7216666666666667,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i5__549d8d8d",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{9}{10}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{14}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7586206896551725,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7586206896551725,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i6__519d88d4",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\left(-\\frac{24}{27}\\right)^{3}",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{7}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6780268987591253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power",
      "signed",
      "vars:1",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "POWER_OF_FRACTION",
      "SIMPLIFY_BEFORE_POWER_CONFUSION",
      "NEGATIVE_BASE_PARITY",
      "LEADING_MINUS_CONFUSION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.6780268987591253,
    },
  },
  {
    id: "SN_COMPARE__compare__d9__i7__529d8a67",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{18}{20}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-11-(-20)-(-2)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7040229885057472,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:3",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7040229885057472,
    },
  },
  {
    id: "SN_SIGN__sign__d9__i0__185b72f2",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-14+(-1)-(-17)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8071331981068289,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8071331981068289,
    },
  },
  {
    id: "SN_SIGN__sign__d9__i1__195b7485",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{1}{10}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 1,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 1,
    },
  },
  {
    id: "SN_SIGN__sign__d9__i2__165b6fcc",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-13+(-1)-(-19)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7799455535390201,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7799455535390201,
    },
  },
  {
    id: "SN_SIGN__sign__d9__i3__175b715f",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-24-(-27)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7892720306513411,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7892720306513411,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d9__i0__f06d65a7",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-15+(-1)-(-17)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-15+(-1)-17",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "2-16",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-15+(-1)-(-17)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-9-5",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.8274171737660581,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8274171737660581,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d9__i1__ef6d6414",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-12-(-6)+6",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-12-6+6",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "3-6",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "\\left(-12-(-6)+6\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-6-11",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.7902298850574713,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7902298850574713,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d9__i2__f26d68cd",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "16-15",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "-3-5",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-10)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "C",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d9__i3__f16d673a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-24-(-20)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-24-20",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-24-(-20)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "5-7",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-11-18",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.735632183908046,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.735632183908046,
    },
  },
  {
    id: "SN_T3_NEGATE_PARENS_SUB__numeric__d10__i0__a85032da",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "negation_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(-7-(-19)\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
        },
      ],
    ],
    correctAnswers: ["-12"],
    difficulty: 0.5178463399879008,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:3",
      "template:minus_parentheses",
      "signed",
    ],
    misconceptions: [
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.5178463399879008,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_POW_PARENS_NEG_A_TO_N__numeric__d10__i1__a6502fb4",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "powers_parentheses",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-7^{3}",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-343"],
    difficulty: 0.03448275862068966,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:^",
      "tier:3",
      "template:power_parens",
      "signed",
    ],
    misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
    seeds: {
      difficulty: 0.03448275862068966,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d10__i2__a7503147",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(11+(-12))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.4166666666666666,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.4166666666666666,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_A_MINUS_B__numeric__d10__i3__a4502c8e",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(-1-(-12))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-11"],
    difficulty: 0.34770114942528735,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.34770114942528735,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d10__i4__a2502968",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-12-(-1)-(-12)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.7528735632183908,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7528735632183908,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d10__i5__a3502afb",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-25}{-8}+(-3)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1/8"],
    difficulty: 0.6045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.6045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_ADD__numeric__d10__i6__a0502642",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-14-(-4)+11",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.7885878489326766,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.7885878489326766,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d10__i7__a15027d5",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-28-(-30)",
        display: true,
      },
    ],
    correctAnswers: ["2"],
    difficulty: 0.8390804597701149,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.8390804597701149,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d10__i8__e5426cd4",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-3\\times-11",
        display: true,
      },
    ],
    correctAnswers: ["33"],
    difficulty: 0.06896551724137931,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.06896551724137931,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d10__i9__e842718d",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-22}{-11}+(-3)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["-1"],
    difficulty: 0.5561650992685476,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5561650992685476,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d10__i10__e7426ffa",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{5}{8}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-25/64"],
    difficulty: 0.7270114942528735,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.7270114942528735,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T2_CHAIN_SUB_SUB__numeric__d10__i11__e242681b",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-12-2-(-15)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["1"],
    difficulty: 0.793103448275862,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
    ],
    misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.793103448275862,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_MUL_INT__numeric__d10__i12__e1426688",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-10\\times12",
        display: true,
      },
    ],
    correctAnswers: ["-120"],
    difficulty: 0.08045977011494253,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "has:negative",
      "tier:1",
      "template:multiplication",
      "signed",
    ],
    misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.08045977011494253,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d10__i13__e4426b41",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-2\\times(10+(-11))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["2"],
    difficulty: 0.3712121212121212,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.3712121212121212,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d10__i14__e34269ae",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-25}{4}+7",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["3/4"],
    difficulty: 0.5959770114942529,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5959770114942529,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d10__i15__dd42603c",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-3\\times10",
        display: true,
      },
    ],
    correctAnswers: ["-30"],
    difficulty: 0.0574712643678161,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.0574712643678161,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_NEG_A_TIMES_B__numeric__d10__i16__543acccc",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "multiplication",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-4\\times10",
        display: true,
      },
    ],
    correctAnswers: ["-40"],
    difficulty: 0.0574712643678161,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:*",
      "tier:3",
      "template:mul_leading_minus",
      "signed",
    ],
    misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
    seeds: {
      difficulty: 0.0574712643678161,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T3_DISTRIB_A_B_PLUS_C__numeric__d10__i17__553ace5f",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-1\\times(12+(-12))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.44540229885057464,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive",
      "signed",
    ],
    misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR", "ORDER_OF_OPERATIONS"],
    seeds: {
      difficulty: 0.44540229885057464,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_FRAC_POW_LEADING_MINUS_SQ__numeric__d10__i18__563acff2",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "fraction_powers",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(\\frac{14}{16}\\right)^{2}\\right)",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
        },
      ],
    ],
    correctAnswers: ["-49/64"],
    difficulty: 0.6408045977011494,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.6408045977011494,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C__numeric__d10__i19__573ad185",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "distributive",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-6\\times(8+(-8))",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.3994252873563218,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:*",
      "has:negative",
      "tier:3",
      "template:distributive_leading_minus",
      "signed",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "DISTRIBUTIVE_ERROR",
      "SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.3994252873563218,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T1_SUB_INT__numeric__d10__i20__503ac680",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "subtraction",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "-27-(-7)",
        display: true,
      },
    ],
    correctAnswers: ["-20"],
    difficulty: 0.5721583652618136,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
    seeds: {
      difficulty: 0.5721583652618136,
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_T2_DIV_PLUS_INT__numeric__d10__i21__523ac9a6",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    subtopic: "mixed_operations",
    prompt: [
      {
        kind: "text",
        value: "חשבו:",
      },
      {
        kind: "math",
        latex: "\\frac{-22}{2}+11",
        display: true,
      },
    ],
    hints: [
      [
        {
          kind: "text",
          value:
            "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
        },
      ],
    ],
    correctAnswers: ["0"],
    difficulty: 0.5718390804597702,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
    ],
    seeds: {
      difficulty: 0.5718390804597702,
    },
    input: {
      allowMinus: true,
      allowDecimal: true,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i0__6dce235e",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-14+(-1)-(-18)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7974137931034484,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "vars:3",
      "op:+",
      "op:-",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7974137931034484,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i1__6ece24f1",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-26-(-18)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-28-(-22)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7375899962106859,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:compare",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR", "SIGN_INTUITION"],
    seeds: {
      difficulty: 0.7375899962106859,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i2__6bce2038",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-15+5-(-8)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-13-(-1)+12",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7902298850574713,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7902298850574713,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i3__6cce21cb",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-13-(-17)+(-2)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-27-(-23)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7918169183382164,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:2",
      "tier:1",
      "template:subtraction",
      "family:compare",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR", "SIGN_INTUITION"],
    seeds: {
      difficulty: 0.7918169183382164,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i4__71ce29aa",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-30-(-26)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-12-1-(-15)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.793103448275862,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "vars:3",
      "tier:2",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.793103448275862,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i5__72ce2b3d",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-26-(-9)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-27-(-24)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.6899498968464486,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:compare",
    ],
    misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR", "SIGN_INTUITION"],
    seeds: {
      difficulty: 0.6899498968464486,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i6__6fce2684",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=\\frac{-50}{-7}+(-2)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-13-(-20)+(-1)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7897372742200328,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:/",
      "has:fraction",
      "has:negative",
      "tier:2",
      "template:mixed_div_add",
      "signed",
      "op:-",
      "template:chain",
      "family:compare",
    ],
    misconceptions: [
      "ORDER_OF_OPERATIONS",
      "SIGN_ERROR",
      "NEGATIVE_DIVIDE_RULE",
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_INTUITION",
    ],
    seeds: {
      difficulty: 0.7897372742200328,
    },
  },
  {
    id: "SN_COMPARE__compare__d10__i7__70ce2817",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "comparison",
    prompt: [
      {
        kind: "text",
        value: "איזה גדול יותר? ",
      },
      {
        kind: "math",
        latex: "A=-14+15-(-2)",
        display: true,
      },
      {
        kind: "text",
        value: " או ",
      },
      {
        kind: "math",
        latex: "B=-\\left(\\left(-\\frac{18}{20}\\right)^{2}\\right)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "A גדול יותר",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "B גדול יותר",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "שווים",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7399425287356323,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "vars:1",
      "op:^",
      "has:fraction",
      "tier:3",
      "template:fraction_power_leading_minus",
      "family:compare",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SIGN_INTUITION",
      "SUBTRACTION_SIGN_ERROR",
    ],
    seeds: {
      difficulty: 0.7399425287356323,
    },
  },
  {
    id: "SN_SIGN__sign__d10__i0__af7b665a",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-11-(-19)-6",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8257713248638837,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8257713248638837,
    },
  },
  {
    id: "SN_SIGN__sign__d10__i1__b07b67ed",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-13+(-12)-(-20)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.7959770114942529,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:+",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SIGN_ERROR",
      "ORDER_OF_OPERATIONS_LINEAR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.7959770114942529,
    },
  },
  {
    id: "SN_SIGN__sign__d10__i2__ad7b6334",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-27-(-26)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.8148148148148149,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8148148148148149,
    },
  },
  {
    id: "SN_SIGN__sign__d10__i3__ae7b64c7",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "sign",
    prompt: [
      {
        kind: "text",
        value: "איזה סימן יהיה לתוצאה? ",
      },
      {
        kind: "math",
        latex: "-28-(-30)",
        display: true,
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "text",
            value: "חיובי",
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "text",
            value: "שלילי",
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "text",
            value: "אפס",
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.8390804597701149,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:sign",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "NEGATIVE_MULTIPLY_RULE",
    ],
    seeds: {
      difficulty: 0.8390804597701149,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d10__i0__4b9731f9",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-27-(-25)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-27-25",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-27-(-25)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "5-16",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-13-6",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.8020434227330779,
    tags: [
      "topic:signed_numbers",
      "vars:2",
      "op:-",
      "has:negative",
      "tier:1",
      "template:subtraction",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "SUBTRACTION_SIGN_ERROR",
      "SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8020434227330779,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d10__i1__4a973066",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex:
              "\\left(-\\left(\\left(-\\frac{21}{30}\\right)^{2}\\right)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "15-10",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "-3-15",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "(-4)^{2}",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "A",
    difficulty: 0.7931034482758621,
    tags: [
      "topic:signed_numbers",
      "vars:1",
      "op:^",
      "has:fraction",
      "has:negative",
      "tier:3",
      "template:fraction_power_leading_minus",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "LEADING_MINUS_CONFUSION",
      "POWER_OF_FRACTION",
      "PARENS_IN_POWERS",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
    ],
    seeds: {
      difficulty: 0.7931034482758621,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d10__i2__49972ed3",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-12-7-(-18)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-12-7-18",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-12-7-(-18)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "8-14",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-12-6",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.8314176245210728,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8314176245210728,
    },
  },
  {
    id: "SN_EQUIV__equivalent__d10__i3__48972d40",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    subtopic: "equivalent_value",
    prompt: [
      {
        kind: "text",
        value: "איזה מהביטויים שווה ל־",
      },
      {
        kind: "math",
        latex: "-12-7-(-19)",
        display: true,
      },
      {
        kind: "text",
        value: "?",
      },
    ],
    options: [
      {
        id: "A",
        content: [
          {
            kind: "math",
            latex: "-12-7-19",
            display: true,
          },
        ],
      },
      {
        id: "B",
        content: [
          {
            kind: "math",
            latex: "\\left(-12-7-(-19)\\right)+0",
            display: true,
          },
        ],
      },
      {
        id: "C",
        content: [
          {
            kind: "math",
            latex: "9-6",
            display: true,
          },
        ],
      },
      {
        id: "D",
        content: [
          {
            kind: "math",
            latex: "-10-18",
            display: true,
          },
        ],
      },
    ],
    correctOptionId: "B",
    difficulty: 0.8620689655172414,
    tags: [
      "topic:signed_numbers",
      "vars:3",
      "op:-",
      "has:negative",
      "tier:2",
      "template:chain",
      "signed",
      "family:equivalent",
    ],
    misconceptions: [
      "DOUBLE_MINUS_CONFUSION",
      "SIGN_ERROR",
      "SUBTRACTION_SIGN_ERROR",
      "DISTRIBUTE_NEGATIVE_OVER_PARENS",
      "PARENS_IN_POWERS",
    ],
    seeds: {
      difficulty: 0.8620689655172414,
    },
  },
];

// [
//   // ----------------------------
//   // SN_ADD_SAME_SIGN (5)
//   // ----------------------------
//   {
//     id: "SN_SAME_01",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_SAME_SIGN",
//     type: "numeric",
//     difficulty: 0.2,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-7)+(-5)" },
//     ],
//     correctAnswers: ["-12"],
//     misconceptions: ["SIGN_ERROR"],
//     tags: ["set:SN_01"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_SAME_02",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_SAME_SIGN",
//     type: "numeric",
//     difficulty: 0.25,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "3.4+2.6" },
//     ],
//     correctAnswers: ["6"],
//     misconceptions: ["DECIMAL_ADD_ERROR"],
//     tags: ["set:SN_01"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: true },
//   },
//   {
//     id: "SN_SAME_03",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_SAME_SIGN",
//     type: "numeric",
//     difficulty: 0.3,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-2.5)+(-1.75)" },
//     ],
//     correctAnswers: ["-4.25"],
//     misconceptions: ["SIGN_ERROR", "DECIMAL_ADD_ERROR"],
//     tags: ["set:SN_01"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: true },
//   },
//   {
//     id: "SN_SAME_04",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_SAME_SIGN",
//     type: "singleChoice",
//     difficulty: 0.3,
//     prompt: [
//       {
//         kind: "text",
//         value: "בלי לחשב בדיוק: האם (-19) + (-4) קטן מ־(-19)?",
//       },
//     ],
//     options: [
//       { id: "A", content: [{ kind: "text", value: "כן, קטן יותר" }] },
//       { id: "B", content: [{ kind: "text", value: "לא, גדול יותר" }] },
//       { id: "C", content: [{ kind: "text", value: "שווה" }] },
//       { id: "D", content: [{ kind: "text", value: "אי אפשר לדעת" }] },
//     ],
//     correctOptionId: "A",
//     misconceptions: ["SIGN_INTUITION"],
//     tags: ["set:SN_01"],
//     version: 1,
//   },
//   // ----------------------------
//   // SN_ADD_OPPOSITE_SIGN (5)
//   // ----------------------------
//   {
//     id: "SN_OPP_01",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_OPPOSITE_SIGN",
//     type: "numeric",
//     difficulty: 0.25,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-8)+3" },
//     ],
//     correctAnswers: ["-5"],
//     misconceptions: ["SIGN_ERROR"],
//     tags: ["set:SN_02"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_OPP_02",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_OPPOSITE_SIGN",
//     type: "numeric",
//     difficulty: 0.3,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "6+(-9)" },
//     ],
//     correctAnswers: ["-3"],
//     misconceptions: ["SIGN_ERROR"],
//     tags: ["set:SN_02"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_OPP_03",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_OPPOSITE_SIGN",
//     type: "numeric",
//     difficulty: 0.35,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-3.2)+1.7" },
//     ],
//     correctAnswers: ["-1.5"],
//     misconceptions: ["SIGN_ERROR", "DECIMAL_ADD_ERROR"],
//     tags: ["set:SN_02"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: true },
//   },
//   {
//     id: "SN_OPP_04",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ADD_OPPOSITE_SIGN",
//     type: "numeric",
//     difficulty: 0.4,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{5}{2}\\right)+\\left(\\frac{3}{4}\\right)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-1.75"], // -7/4
//     misconceptions: ["FRACTION_ADD_ERROR", "SIGN_ERROR"],
//     tags: ["set:SN_02"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: true },
//   },

//   // ----------------------------
//   // SN_SUBTRACT (5)
//   // ----------------------------
//   {
//     id: "SN_SUB_01",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_SUBTRACT",
//     type: "numeric",
//     difficulty: 0.3,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "5-(-3)" },
//     ],
//     correctAnswers: ["8"],
//     misconceptions: ["SUBTRACT_NEGATIVE_ERROR"],
//     tags: ["set:SN_03"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_SUB_02",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_SUBTRACT",
//     type: "numeric",
//     difficulty: 0.35,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-4)-7" },
//     ],
//     correctAnswers: ["-11"],
//     misconceptions: ["SIGN_ERROR", "SUBTRACTION_ERROR"],
//     tags: ["set:SN_03"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_SUB_03",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_SUBTRACT",
//     type: "numeric",
//     difficulty: 0.4,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-6)-(-10)" },
//     ],
//     correctAnswers: ["4"],
//     misconceptions: ["SUBTRACT_NEGATIVE_ERROR", "SIGN_ERROR"],
//     tags: ["set:SN_03"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_SUB_04",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_SUBTRACT",
//     type: "singleChoice",
//     difficulty: 0.4,
//     prompt: [
//       { kind: "text", value: "איזה גדול יותר? " },
//       { kind: "math", latex: "A=(-2)-(-9)" },
//       { kind: "text", value: " או " },
//       { kind: "math", latex: "B=(-2)-9" },
//     ],
//     options: [
//       { id: "A", content: [{ kind: "text", value: "A גדול יותר" }] },
//       { id: "B", content: [{ kind: "text", value: "B גדול יותר" }] },
//       { id: "C", content: [{ kind: "text", value: "שווים" }] },
//       { id: "D", content: [{ kind: "text", value: "אי אפשר לדעת" }] },
//     ],
//     correctOptionId: "A",
//     misconceptions: ["SUBTRACT_NEGATIVE_ERROR", "SIGN_INTUITION"],
//     tags: ["set:SN_03"],
//     version: 1,
//   },

//   // ----------------------------
//   // SN_MULT_DIV (5)
//   // ----------------------------
//   {
//     id: "SN_MD_01",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_MULT_DIV",
//     type: "numeric",
//     difficulty: 0.35,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-4)\\times(-3)" },
//     ],
//     correctAnswers: ["12"],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     tags: ["set:SN_04"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_MD_02",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_MULT_DIV",
//     type: "numeric",
//     difficulty: 0.4,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "12\\div(-3)" },
//     ],
//     correctAnswers: ["-4"],
//     misconceptions: ["NEGATIVE_DIVIDE_RULE"],
//     tags: ["set:SN_04"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_MD_03",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_MULT_DIV",
//     type: "numeric",
//     difficulty: 0.45,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-2.5)\\times4" },
//     ],
//     correctAnswers: ["-10"],
//     misconceptions: ["SIGN_ERROR", "DECIMAL_MULT_ERROR"],
//     tags: ["set:SN_04"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: true },
//   },
//   {
//     id: "SN_MD_04",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_MULT_DIV",
//     type: "numeric",
//     difficulty: 0.5,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{3}{5}\\right)\\times 10",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-6"],
//     misconceptions: ["FRACTION_MULT_ERROR", "SIGN_ERROR"],
//     tags: ["set:SN_04"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_MD_05",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_MULT_DIV",
//     type: "singleChoice",
//     difficulty: 0.45,
//     prompt: [
//       { kind: "text", value: "איזה סימן יהיה לתוצאה? " },
//       { kind: "math", latex: "(-8)\\times 7\\times (-2)" },
//     ],
//     options: [
//       { id: "A", content: [{ kind: "text", value: "חיובי" }] },
//       { id: "B", content: [{ kind: "text", value: "שלילי" }] },
//       { id: "C", content: [{ kind: "text", value: "אפס" }] },
//       { id: "D", content: [{ kind: "text", value: "אי אפשר לדעת" }] },
//     ],
//     correctOptionId: "A",
//     misconceptions: ["SIGN_PARITY_MULTIPLICATION"],
//     tags: ["set:SN_04"],
//     version: 1,
//   },

//   // ----------------------------
//   // SN_ORDER_OF_OPERATIONS (5)
//   // ----------------------------
//   {
//     id: "SN_OOO_01",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ORDER_OF_OPERATIONS",
//     type: "numeric",
//     difficulty: 0.45,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "-3+7-5" },
//     ],
//     correctAnswers: ["-1"],
//     misconceptions: ["ORDER_OF_OPERATIONS", "SIGN_ERROR"],
//     tags: ["set:SN_05"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_OOO_02",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ORDER_OF_OPERATIONS",
//     type: "numeric",
//     difficulty: 0.5,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "6-(-2+5)" },
//     ],
//     correctAnswers: ["3"],
//     misconceptions: ["PARENTHESIS_SIGN_ERROR", "SUBTRACT_NEGATIVE_ERROR"],
//     tags: ["set:SN_05"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_OOO_03",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ORDER_OF_OPERATIONS",
//     type: "numeric",
//     difficulty: 0.55,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-2)\\times(3-7)" },
//     ],
//     correctAnswers: ["8"],
//     misconceptions: ["DISTRIBUTION_SIGN_ERROR", "NEGATIVE_MULTIPLY_RULE"],
//     tags: ["set:SN_05"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_OOO_04",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ORDER_OF_OPERATIONS",
//     type: "numeric",
//     difficulty: 0.6,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "(-12)\\div 3+(-1)\\times 4" },
//     ],
//     correctAnswers: ["-8"],
//     misconceptions: ["ORDER_OF_OPERATIONS", "SIGN_ERROR"],
//     tags: ["set:SN_05"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },

//   // ----------------------------
//   // SN_ABSOLUTE_VALUE (5)
//   // ----------------------------
//   {
//     id: "SN_ABS_01",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ABSOLUTE_VALUE",
//     type: "numeric",
//     difficulty: 0.35,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "|-9|" },
//     ],
//     correctAnswers: ["9"],
//     misconceptions: ["ABS_CONFUSION"],
//     tags: ["set:SN_06"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_ABS_02",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ABSOLUTE_VALUE",
//     type: "singleChoice",
//     difficulty: 0.45,
//     prompt: [
//       { kind: "text", value: "איזה נכון? " },
//       { kind: "math", latex: "|-3|=-3" },
//     ],
//     options: [
//       { id: "A", content: [{ kind: "text", value: "נכון" }] },
//       { id: "B", content: [{ kind: "text", value: "לא נכון" }] },
//     ],
//     correctOptionId: "B",
//     misconceptions: ["ABS_CONFUSION"],
//     tags: ["set:SN_06"],
//     version: 1,
//   },
//   {
//     id: "SN_ABS_03",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ABSOLUTE_VALUE",
//     type: "numeric",
//     difficulty: 0.55,
//     prompt: [
//       { kind: "text", value: "חשב: " },
//       { kind: "math", latex: "|-2.5|+|1.2|" },
//     ],
//     correctAnswers: ["3.7"],
//     misconceptions: ["ABS_CONFUSION", "DECIMAL_ADD_ERROR"],
//     tags: ["set:SN_06"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: true },
//   },
//   {
//     id: "SN_ABS_04",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ABSOLUTE_VALUE",
//     type: "numeric",
//     difficulty: 0.6,
//     prompt: [
//       { kind: "text", value: "מצא x כך ש: " },
//       { kind: "math", latex: "|x|=6" },
//     ],
//     correctAnswers: ["6", "-6"],
//     misconceptions: ["ABS_SINGLE_SOLUTION_ERROR"],
//     tags: ["set:SN_06"],
//     version: 1,
//     input: { allowMinus: true, allowDecimal: false },
//   },
//   {
//     id: "SN_ABS_05",
//     topicId: "SIGNED_NUMBERS",
//     subtopic: "SN_ABSOLUTE_VALUE",
//     type: "singleChoice",
//     difficulty: 0.65,
//     prompt: [{ kind: "text", value: "מי קרוב יותר ל־0? A = -0.8 או B = 0.3" }],
//     options: [
//       { id: "A", content: [{ kind: "text", value: "A" }] },
//       { id: "B", content: [{ kind: "text", value: "B" }] },
//       { id: "C", content: [{ kind: "text", value: "שווים" }] },
//       { id: "D", content: [{ kind: "text", value: "אי אפשר לדעת" }] },
//     ],
//     correctOptionId: "B",
//     misconceptions: ["ABS_DISTANCE_INTUITION", "SIGN_INTUITION"],
//     tags: ["set:SN_06"],
//     version: 1,
//   },
// ] as const;

// [
//   {
//     id: "SN_T1_ADD_INT_d0_i0_c840eb8d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5+2",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.14814814814814814,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.14814814814814814,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d0_i1_c740e9fa",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2+4",
//         display: true,
//       },
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.1851851851851852,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.1851851851851852,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d1_i0_6a571c6e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "3+20",
//         display: true,
//       },
//     ],
//     correctAnswers: ["23"],
//     difficulty: 0.18518518518518523,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.18518518518518523,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d1_i1_6b571e01",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1+(-18)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-19"],
//     difficulty: 0.16049382716049385,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.16049382716049385,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d2_i0_115529fb",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-12+(-26)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-38"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d2_i1_10552868",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-18+5",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-13"],
//     difficulty: 0.26337448559670784,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.26337448559670784,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d3_i0_999f889c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5+5",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.3703703703703704,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.3703703703703704,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d3_i1_9a9f8a2f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-23+21",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.5603864734299517,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5603864734299517,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d4_i0_7d6257c1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7+(-30)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-23"],
//     difficulty: 0.39506172839506176,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.39506172839506176,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d4_i1_7c62562e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "14+(-13)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.4550264550264551,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.4550264550264551,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d5_i0_f33977a2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-9+9",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.41975308641975306,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.41975308641975306,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d5_i1_f4397935",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5+(-29)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-24"],
//     difficulty: 0.36015325670498083,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.36015325670498083,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d6_i0_c676962f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5+28",
//         display: true,
//       },
//     ],
//     correctAnswers: ["23"],
//     difficulty: 0.3500881834215167,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.3500881834215167,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d6_i1_c576949c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "19+(-19)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.5432098765432098,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5432098765432098,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d7_i0_4ec0f4d0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-11+11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.4444444444444445,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.4444444444444445,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d7_i1_4fc0f663",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8+8",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.4074074074074074,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.4074074074074074,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d8_i0_38c73345",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-25+25",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.617283950617284,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.617283950617284,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d8_i1_37c731b2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "21+(-16)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["5"],
//     difficulty: 0.4797178130511464,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.4797178130511464,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d9_i0_7852cc86",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-24+12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.41975308641975306,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.41975308641975306,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d9_i1_7952ce19",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-20+17",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.5000000000000001,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5000000000000001,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d10_i0_7e567b96",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3+3",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.3703703703703704,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.3703703703703704,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_ADD_INT_d10_i1_7f567d29",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "addition",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4+(-30)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-26"],
//     difficulty: 0.35802469135802467,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:1",
//       "template:addition",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.35802469135802467,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d0_i0_326a24e4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1-2",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.1851851851851852,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.1851851851851852,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d0_i1_336a2677",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3-0",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "has:zero",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d1_i0_50738aa3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-29-9",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-38"],
//     difficulty: 0.2962962962962963,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.2962962962962963,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d1_i1_4f738910",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "22-(-8)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["30"],
//     difficulty: 0.45679012345679015,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.45679012345679015,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d2_i0_015f1f76",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "3-(-28)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["31"],
//     difficulty: 0.5308641975308642,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5308641975308642,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d2_i1_025f2109",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-13-(-1)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.3741690408357076,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.3741690408357076,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d3_i0_ee129735",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-15-(-11)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-4"],
//     difficulty: 0.6419753086419754,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6419753086419754,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d3_i1_ed1295a2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-11-(-5)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-6"],
//     difficulty: 0.48933782267115605,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.48933782267115605,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d4_i0_a33cff98",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "0-(-30)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["30"],
//     difficulty: 0.5555555555555556,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "has:zero",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5555555555555556,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d4_i1_a43d012b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4-(-4)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.617283950617284,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.617283950617284,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d5_i0_6145ce37",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "9-(-25)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["34"],
//     difficulty: 0.49382716049382724,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.49382716049382724,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d5_i1_6045cca4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "15-(-26)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["41"],
//     difficulty: 0.5061728395061729,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5061728395061729,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d6_i0_567ff48a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4-(-30)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["34"],
//     difficulty: 0.5555555555555556,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5555555555555556,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d6_i1_577ff61d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1-(-30)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["29"],
//     difficulty: 0.5679012345679013,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5679012345679013,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d7_i0_783226e9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1-(-20)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["19"],
//     difficulty: 0.4506172839506174,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.4506172839506174,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d7_i1_77322556",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-15-(-29)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["14"],
//     difficulty: 0.7347807577692634,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7347807577692634,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d8_i0_a1e3aacc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-16-(-16)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.7530864197530865,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7530864197530865,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d8_i1_a2e3ac5f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-17-(-17)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.7654320987654322,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7654320987654322,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d9_i0_5eaf44eb",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8-(-8)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.6543209876543211,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6543209876543211,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d9_i1_5daf4358",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-26-(-26)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.8765432098765432,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8765432098765432,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d10_i0_ee5ceae5",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-27-(-16)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-11"],
//     difficulty: 0.7379972565157751,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7379972565157751,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_SUB_INT_d10_i1_ed5ce952",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "subtraction",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7-(-30)",
//         display: true,
//       },
//     ],
//     correctAnswers: ["23"],
//     difficulty: 0.6419753086419754,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:1",
//       "template:subtraction",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6419753086419754,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d0_i0_0a8ae5a0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times-7",
//         display: true,
//       },
//     ],
//     correctAnswers: ["7"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d0_i1_0b8ae733",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2\\times-6",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d1_i0_c893b43f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times10",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-20"],
//     difficulty: 0.061728395061728406,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.061728395061728406,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d1_i1_c793b2ac",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times-4",
//         display: true,
//       },
//     ],
//     correctAnswers: ["4"],
//     difficulty: 0,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d2_i0_af036872",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["24"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d2_i1_b0036a05",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-24"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d3_i0_39f3afd1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4\\times2",
//         display: true,
//       },
//     ],
//     correctAnswers: ["8"],
//     difficulty: 0,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d3_i1_38f3ae3e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "6\\times11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["66"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d4_i0_542c44ec",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["60"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d4_i1_552c467f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-36"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d5_i0_1235138b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "3\\times7",
//         display: true,
//       },
//     ],
//     correctAnswers: ["21"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d5_i1_113511f8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["60"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d6_i0_24e3d8be",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["12"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d6_i1_25e3da51",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times-6",
//         display: true,
//       },
//     ],
//     correctAnswers: ["12"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d7_i0_c920d51d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d7_i1_c820d38a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d8_i0_558599b8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["96"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d8_i1_57859cde",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4\\times11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-44"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d9_i0_3ecd77c4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times-10",
//         display: true,
//       },
//     ],
//     correctAnswers: ["10"],
//     difficulty: 0.061728395061728406,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.061728395061728406,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d9_i1_41cd7c7d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-9\\times11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-99"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d10_i0_4aeceae9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-10\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-120"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T1_MUL_INT_d10_i1_49ece956",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["84"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:1",
//       "template:multiplication",
//       "signed",
//     ],
//     misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d0_i0_e483ec51",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2+5-1",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["6"],
//     difficulty: 0.14506172839506173,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.14506172839506173,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d0_i1_e383eabe",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6+(-5)-1",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.1574074074074074,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.1574074074074074,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d1_i0_5993a4f2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2+(-1)-5",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-8"],
//     difficulty: 0.14506172839506173,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.14506172839506173,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d1_i1_5a93a685",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "8+(-1)-(-5)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["12"],
//     difficulty: 0.4290123456790124,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.4290123456790124,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d2_i0_7323f0bf",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1+(-6)-(-13)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["8"],
//     difficulty: 0.6331908831908832,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.6331908831908832,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d2_i1_7223ef2c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "16+3-(-10)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["29"],
//     difficulty: 0.5277777777777778,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.5277777777777778,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d3_i0_b51b2220",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "18+(-18)-(-4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["4"],
//     difficulty: 0.8405349794238685,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.8405349794238685,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d3_i1_b61b23b3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1+(-3)-(-20)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["16"],
//     difficulty: 0.6512345679012347,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.6512345679012347,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d4_i0_73b1119d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6+(-7)-(-11)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.7690796857463525,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.7690796857463525,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d4_i1_72b1100a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8+2-(-6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.7993827160493827,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.7993827160493827,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d5_i0_cf74153e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "14+(-20)-(-8)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.910493827160494,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.910493827160494,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d5_i1_d07416d1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-18+13-(-4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.9022633744855967,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.9022633744855967,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d6_i0_bcc5500b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7+(-8)-(-1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.7993827160493827,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.7993827160493827,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d6_i1_bbc54e78",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8+(-4)-(-13)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.8326210826210828,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.8326210826210828,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d7_i0_febc816c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4+(-14)-(-9)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.8470017636684305,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.8470017636684305,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d7_i1_ffbc82ff",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2+(-3)-(-6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.712962962962963,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.712962962962963,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d8_i0_d50afd89",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "11+(-20)-(-10)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.9290123456790124,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.9290123456790124,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d8_i1_d40afbf6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "17+(-20)-(-6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["3"],
//     difficulty: 0.8919753086419753,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.8919753086419753,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d9_i0_b495ffaa",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7+(-15)-(-20)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.910493827160494,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.910493827160494,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d9_i1_b596013d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "6+13-18",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.6553497942386831,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.6553497942386831,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d10_i0_f52cb492",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-18+9-(-10)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.9022633744855967,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.9022633744855967,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_ADD_SUB_d10_i1_f62cb625",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5+(-4)-(-9)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.8117283950617284,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
//     seeds: {
//       difficulty: 0.8117283950617284,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d0_i0_0de83085",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3-5+(-1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-9"],
//     difficulty: 0.14506172839506173,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.14506172839506173,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d0_i1_0ce82ef2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-11-13+6",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-18"],
//     difficulty: 0.2438271604938272,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.2438271604938272,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d1_i0_4d73c9c6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "3-(-2)+2",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["7"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d1_i1_4e73cb59",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "6-(-13)+(-6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["13"],
//     difficulty: 0.4907407407407408,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.4907407407407408,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d2_i0_833b7ff3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4-(-1)+6",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["3"],
//     difficulty: 0.5895061728395062,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5895061728395062,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d2_i1_823b7e60",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6-(-1)+15",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["10"],
//     difficulty: 0.6388888888888891,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6388888888888891,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d3_i0_2b8610f4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "8-(-2)+(-17)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-7"],
//     difficulty: 0.7579883805374003,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7579883805374003,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d3_i1_2c861287",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-9-1+15",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["5"],
//     difficulty: 0.5154320987654322,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5154320987654322,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d4_i0_c446d139",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7-(-6)+(-16)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.8287037037037036,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8287037037037036,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d4_i1_c346cfa6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7-(-1)+6",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.7870370370370371,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7870370370370371,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d5_i0_23d29cda",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4-(-20)+(-14)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.910493827160494,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.910493827160494,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d5_i1_24d29e6d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2-(-13)+(-13)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.8041310541310541,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8041310541310541,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d6_i0_2d5b4207",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "12-(-8)+(-20)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.947530864197531,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.947530864197531,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d6_i1_2c5b4074",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7-(-8)+(-16)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.875,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.875,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d7_i0_b5a5a0a8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-11-(-2)+11",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.7690796857463525,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7690796857463525,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d7_i1_b7a5a3ce",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5-(-10)+(-3)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.75,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.75,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d8_i0_e2edaecd",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "3-(-17)+(-15)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["5"],
//     difficulty: 0.8015613652868554,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8015613652868554,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d8_i1_e1edad3a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "11-(-8)+(-18)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.9022633744855967,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.9022633744855967,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d9_i0_8503dfae",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-15-(-16)+(-4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.8287037037037036,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8287037037037036,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d9_i1_8603e141",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "6-(-13)+(-18)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.9022633744855967,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.9022633744855967,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d10_i0_7dedd15e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-13-(-1)+9",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.7756410256410258,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7756410256410258,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_ADD_d10_i1_7eedd2f1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-10-(-19)+(-10)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.915692007797271,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.915692007797271,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d0_i0_c5bc1630",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1-12-1",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.22222222222222224,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.22222222222222224,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d0_i1_c6bc17c3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4-0-1",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["3"],
//     difficulty: 0.22839506172839508,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:zero",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.22839506172839508,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d1_i0_69b0c88f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4-3-12",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-19"],
//     difficulty: 0.22222222222222224,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.22222222222222224,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d1_i1_68b0c6fc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3-(-6)-(-2)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["5"],
//     difficulty: 0.45679012345679015,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.45679012345679015,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d2_i0_16747382",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1-4-(-3)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.5679012345679013,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5679012345679013,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d2_i1_17747515",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "0-8-(-18)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["10"],
//     difficulty: 0.7078189300411523,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "has:zero",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7078189300411523,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d3_i0_745e42a1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8-(-3)-(-3)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.6975308641975309,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6975308641975309,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d3_i1_735e410e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7-9-(-4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.7201646090534979,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7201646090534979,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d4_i0_3b9c867c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5-9-(-4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d4_i1_3c9c880f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-11-(-5)-(-8)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.7598204264870932,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7598204264870932,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d5_i0_cc9edcdb",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "15-(-1)-20",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-4"],
//     difficulty: 0.8641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d5_i1_cb9edb48",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-15-4-(-19)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.925925925925926,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.925925925925926,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d6_i0_8c54e3ce",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-14-4-(-19)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.9064327485380117,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.9064327485380117,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d6_i1_8d54e561",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-12-(-18)-3",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["3"],
//     difficulty: 0.8518518518518519,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8518518518518519,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d7_i0_ea3eb2ed",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2-17-(-12)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.8358750907770516,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8358750907770516,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d7_i1_e93eb15a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "10-(-6)-15",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.8518518518518519,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8518518518518519,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d8_i0_577fc4c8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-9-(-16)-8",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.8657407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8657407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d8_i1_587fc65b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4-(-13)-16",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.8657407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8657407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d9_i0_cf356627",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-16-(-17)-1",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.9012345679012346,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.9012345679012346,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d9_i1_ce356494",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-13-(-16)-3",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.888888888888889,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.888888888888889,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d10_i0_806ffb79",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1-(-20)-16",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["3"],
//     difficulty: 0.8827160493827162,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8827160493827162,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_CHAIN_SUB_SUB_d10_i1_7f6ff9e6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4-10-(-14)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.8641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:-",
//       "has:negative",
//       "tier:2",
//       "template:chain",
//       "signed",
//     ],
//     misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.8641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d0_i0_10e6c7c8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-18-9",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-27"],
//     difficulty: 0.16049382716049385,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.16049382716049385,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d0_i1_11e6c95b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-19-21",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-40"],
//     difficulty: 0.1975308641975309,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.1975308641975309,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d1_i0_889c6927",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-11-0",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-11"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:zero",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d1_i1_879c6794",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6-8",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-14"],
//     difficulty: 0.037037037037037035,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.037037037037037035,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d2_i0_7dd68f7a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3-21",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-24"],
//     difficulty: 0.1975308641975309,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.1975308641975309,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d2_i1_7ed6910d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3-13",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-16"],
//     difficulty: 0.09876543209876545,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.09876543209876545,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d3_i0_9e4b8d59",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1-30",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-31"],
//     difficulty: 0.308641975308642,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.308641975308642,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d3_i1_9d4b8bc6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8-29",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-37"],
//     difficulty: 0.2962962962962963,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.2962962962962963,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d4_i0_86c73814",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7-15",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-22"],
//     difficulty: 0.12345679012345681,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.12345679012345681,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d4_i1_87c739a7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-10-14",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-24"],
//     difficulty: 0.11111111111111113,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.11111111111111113,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d5_i0_de7ca713",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2-30",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-32"],
//     difficulty: 0.308641975308642,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.308641975308642,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d5_i1_dd7ca580",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-9-11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-20"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d6_i0_d3b6cd66",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7-13",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-20"],
//     difficulty: 0.09876543209876545,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.09876543209876545,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d6_i1_d4b6cef9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-15-17",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-32"],
//     difficulty: 0.14814814814814814,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.14814814814814814,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d7_i0_15693225",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8-23",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-31"],
//     difficulty: 0.22222222222222227,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.22222222222222227,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d7_i1_14693092",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-12-19",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-31"],
//     difficulty: 0.1728395061728395,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.1728395061728395,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d8_i0_7f231930",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-16-29",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-45"],
//     difficulty: 0.2962962962962963,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.2962962962962963,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d8_i1_80231ac3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-14-29",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-43"],
//     difficulty: 0.2962962962962963,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.2962962962962963,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d9_i0_2317cb8f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-16-23",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-39"],
//     difficulty: 0.22222222222222227,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.22222222222222227,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d9_i1_2217c9fc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-19-29",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-48"],
//     difficulty: 0.2962962962962963,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.2962962962962963,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d10_i0_c8c294a1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-25-30",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-55"],
//     difficulty: 0.308641975308642,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.308641975308642,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_LEADING_MINUS_ADD_d10_i1_c7c2930e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4-30",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-34"],
//     difficulty: 0.308641975308642,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:2",
//       "template:leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION"],
//     seeds: {
//       difficulty: 0.308641975308642,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d0_i0_75c52eeb",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{15}{4}+19",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["91/4"],
//     difficulty: 0.20679012345679013,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.20679012345679013,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d0_i1_74c52d58",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{56}{1}+5",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["61"],
//     difficulty: 0.5277777777777779,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.5277777777777779,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d1_i0_b8f994cc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{12}{12}+(-3)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.4290123456790124,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.4290123456790124,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d1_i1_b9f9965f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{35}{-4}+(-19)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-111/4"],
//     difficulty: 0.48104056437389786,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.48104056437389786,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d2_i0_acb1b9fd",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{27}{-2}+(-13)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-53/2"],
//     difficulty: 0.3124142661179699,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.3124142661179699,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d2_i1_abb1b86a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-51}{-1}+(-3)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["48"],
//     difficulty: 0.5495642701525055,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.5495642701525055,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d3_i0_09b1f21e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{15}{2}+(-7)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1/2"],
//     difficulty: 0.5154320987654322,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.5154320987654322,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d3_i1_0ab1f3b1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{4}{5}+(-1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/5"],
//     difficulty: 0.3895061728395062,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.3895061728395062,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d4_i0_2c23cf9f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{33}{-3}+11",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.75,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.75,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d4_i1_2b23ce0c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-46}{-6}+(-11)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-10/3"],
//     difficulty: 0.871309715512614,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.871309715512614,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d5_i0_41dbf000",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{16}{4}+(-4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.5401234567901235,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.5401234567901235,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d5_i1_42dbf193",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-1}{-3}+(-1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2/3"],
//     difficulty: 0.32201646090534986,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.32201646090534986,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d6_i0_36d149b1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{33}{-6}+7",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["3/2"],
//     difficulty: 0.7331649831649832,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.7331649831649832,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d6_i1_35d1481e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-9}{-2}+(-5)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/2"],
//     difficulty: 0.43312757201646096,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.43312757201646096,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d7_i0_92944d52",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-13}{-2}+(-8)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-3/2"],
//     difficulty: 0.4603513770180437,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.4603513770180437,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d7_i1_93944ee5",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-25}{7}+4",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["3/7"],
//     difficulty: 0.6448853615520282,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.6448853615520282,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d8_i0_678974a3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-19}{-2}+(-9)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1/2"],
//     difficulty: 0.5674139051332034,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.5674139051332034,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d8_i1_66897310",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-26}{6}+4",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/3"],
//     difficulty: 0.6588319088319089,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.6588319088319089,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d9_i0_49800ee4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-33}{-6}+(-6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/2"],
//     difficulty: 0.7443883277216612,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.7443883277216612,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d9_i1_4a801077",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-26}{-2}+(-12)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.6493352326685661,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.6493352326685661,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d10_i0_7a3756f0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-9}{-6}+(-3)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-3/2"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T2_DIV_PLUS_INT_d10_i1_7b375883",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "mixed_operations",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\frac{-6}{9}+(-1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-5/3"],
//     difficulty: 0.38511659807956106,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:/",
//       "has:fraction",
//       "has:negative",
//       "tier:2",
//       "template:mixed_div_add",
//       "signed",
//     ],
//     misconceptions: [
//       "ORDER_OF_OPERATIONS",
//       "SIGN_ERROR",
//       "NEGATIVE_DIVIDE_RULE",
//     ],
//     seeds: {
//       difficulty: 0.38511659807956106,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d0_i0_5ba7f591",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-19-4\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["23"],
//     difficulty: 0.41975308641975306,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.41975308641975306,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d0_i1_5aa7f3fe",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-13-4\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["17"],
//     difficulty: 0.34567901234567905,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.34567901234567905,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d1_i0_b76af932",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7-4\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.4832451499118166,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.4832451499118166,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d1_i1_b86afac5",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-20-4\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["24"],
//     difficulty: 0.43209876543209885,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.43209876543209885,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d2_i0_a4bc33ff",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-3-(-13)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-10"],
//     difficulty: 0.4311490978157645,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.4311490978157645,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d2_i1_a3bc326c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-1-(-2)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.43209876543209874,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.43209876543209874,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d3_i0_e6b36560",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(5-(-20)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-25"],
//     difficulty: 0.43209876543209885,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.43209876543209885,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d3_i1_e7b366f3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(9-15\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["6"],
//     difficulty: 0.5925925925925927,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.5925925925925927,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d4_i0_d18865dd",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-4-(-5)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.54320987654321,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.54320987654321,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d4_i1_d088644a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-6-(-5)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.5679012345679013,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.5679012345679013,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d5_i0_010c587e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(6-7\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.5890652557319225,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.5890652557319225,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d5_i1_020c5a11",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-1-(-20)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-19"],
//     difficulty: 0.4506172839506174,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.4506172839506174,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d6_i0_1a9ca44b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-9-(-7)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.5843621399176955,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.5843621399176955,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d6_i1_199ca2b8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-11-(-12)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.6728395061728395,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.6728395061728395,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d7_i0_5c93d5ac",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(12-5\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-7"],
//     difficulty: 0.4876543209876544,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.4876543209876544,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d7_i1_5d93d73f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7-8\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.6080246913580247,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.6080246913580247,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d8_i0_32e251c9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-7-(-19)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.5562053281351527,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.5562053281351527,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d8_i1_31e25036",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-17-(-18)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.757201646090535,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.757201646090535,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d9_i0_136d557d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-4-(-3)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.5246913580246914,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.5246913580246914,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d9_i1_106d50c4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(17-4\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-13"],
//     difficulty: 0.4822076978939725,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.4822076978939725,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d10_i0_fbe9bd52",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-12-(-13)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.687559354226021,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.687559354226021,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_SUB_d10_i1_fce9bee5",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(2-(-20)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-22"],
//     difficulty: 0.43209876543209885,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTE_NEGATIVE_OVER_PARENS",
//       "SUBTRACTION_SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.43209876543209885,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d0_i0_40f4b4bc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-14+(-13)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["27"],
//     difficulty: 0.3580246913580248,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.3580246913580248,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d0_i1_41f4b64f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-9+(-4)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["13"],
//     difficulty: 0.29629629629629634,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.29629629629629634,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d1_i0_b8aa561b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(3+10\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-13"],
//     difficulty: 0.308641975308642,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.308641975308642,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d1_i1_b7aa5488",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-5+(-3)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["8"],
//     difficulty: 0.24691358024691362,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.24691358024691362,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d2_i0_656e010e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-17+3\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["14"],
//     difficulty: 0.46042120551924476,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.46042120551924476,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d2_i1_666e02a1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-5+7\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.5361552028218695,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5361552028218695,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d3_i0_c357d02d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-15+5\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["10"],
//     difficulty: 0.49382716049382724,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.49382716049382724,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d3_i1_c257ce9a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-7+19\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-12"],
//     difficulty: 0.5562053281351527,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5562053281351527,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d4_i0_cb144470",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-10+4\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["6"],
//     difficulty: 0.45679012345679015,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.45679012345679015,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d4_i1_cc144603",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(9+(-10)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.6419753086419754,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6419753086419754,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d5_i0_42c9e5cf",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(2+(-2)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.617283950617284,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.617283950617284,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d5_i1_41c9e43c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(8+(-8)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.6543209876543211,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6543209876543211,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d6_i0_1bcca1c2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-5+5\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.617283950617284,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.617283950617284,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d6_i1_1ccca355",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-1+1\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.617283950617284,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.617283950617284,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d7_i0_79b670e1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-10+10\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.6790123456790125,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6790123456790125,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d7_i1_78b66f4e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-14+6\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["8"],
//     difficulty: 0.5167548500881834,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.5167548500881834,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d8_i0_8e2c9ee7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(0+19\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-19"],
//     difficulty: 0.41975308641975306,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:zero",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.41975308641975306,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d8_i1_902ca20d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-3+3\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.617283950617284,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.617283950617284,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d9_i0_2a6dd253",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-2+18\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["-16"],
//     difficulty: 0.44855967078189307,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.44855967078189307,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d9_i1_296dd0c0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(18+(-18)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.7777777777777778,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7777777777777778,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d10_i0_ace3d18d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(-19+19\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.7901234567901234,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7901234567901234,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEGATE_PARENS_ADD_d10_i1_abe3cffa",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "negation_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(16+(-17)\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: מינוס לפני סוגריים מחליף סימן לכל איבר בתוך הסוגריים.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.7436456063907044,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:+",
//       "has:negative",
//       "tier:3",
//       "template:minus_parentheses",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.7436456063907044,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d0_i0_e91c69a7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4\\times(-11+(-2))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-52"],
//     difficulty: 0.09567901234567902,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.09567901234567902,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d0_i1_e81c6814",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2\\times(-1+2)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.021604938271604937,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.021604938271604937,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d1_i0_7166c848",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1\\times(4+(-3))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.2993827160493827,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.2993827160493827,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d1_i1_7266c9db",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2\\times(-3+2)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.14506172839506173,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.14506172839506173,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d2_i0_fecb8dd9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(-1+1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d2_i1_fdcb8c46",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8\\times(-1+1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.42901234567901236,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.42901234567901236,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d3_i0_de568ffa",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times(-1+1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d3_i1_df56918d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times(-4+4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d4_i0_3efca793",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4\\times(-6+6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.404320987654321,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.404320987654321,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d4_i1_3dfca600",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times(5+(-5))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d5_i0_e7473894",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7\\times(-1+1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d5_i1_e8473a27",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5\\times(11+(-10))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["5"],
//     difficulty: 0.297699214365881,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.297699214365881,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d6_i0_75e932a5",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times(7+(-7))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d6_i1_74e93112",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7\\times(-6+6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d7_i0_3436cde6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(-7+8)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-3"],
//     difficulty: 0.29012345679012347,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.29012345679012347,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d7_i1_3536cf79",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(11+(-12))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d8_i0_8397cc0f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times(-10+10)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.4537037037037037,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.4537037037037037,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d8_i1_8297ca7c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8\\times(-8+12)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-32"],
//     difficulty: 0.10802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.10802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d9_i0_dfa319b0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times(0+(-11))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["66"],
//     difficulty: 0.09567901234567902,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "has:zero",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.09567901234567902,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d9_i1_e0a31b43",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7\\times(9+(-8))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["7"],
//     difficulty: 0.15329218106995887,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.15329218106995887,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d10_i0_0093d524",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times(-12+12)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.478395061728395,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.478395061728395,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_B_PLUS_C_d10_i1_0193d6b7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8\\times(1+(-1))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.42901234567901236,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: [
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//       "ORDER_OF_OPERATIONS",
//     ],
//     seeds: {
//       difficulty: 0.42901234567901236,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d0_i0_d3754d65",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times(-6-1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["42"],
//     difficulty: 0.02160493827160494,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.02160493827160494,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d0_i1_d2754bd2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times(-6-0)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["36"],
//     difficulty: 0.02160493827160494,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "has:zero",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.02160493827160494,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d1_i0_91c2e8a6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(-2-(-4))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-4"],
//     difficulty: 0.25617283950617287,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.25617283950617287,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d1_i1_92c2ea39",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(-3-(-1))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["6"],
//     difficulty: 0.25617283950617287,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.25617283950617287,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d2_i0_e2148853",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7\\times(-7-(-5))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["14"],
//     difficulty: 0.2808641975308642,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.2808641975308642,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d2_i1_e4148b79",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "3\\times(3-(-11))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["42"],
//     difficulty: 0.33024691358024694,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.33024691358024694,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d3_i0_44d35354",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7\\times(7-7)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.404320987654321,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.404320987654321,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d3_i1_45d354e7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2\\times(2-(-12))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["28"],
//     difficulty: 0.34259259259259256,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.34259259259259256,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d4_i0_8896b999",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1\\times(1-1)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.37962962962962965,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.37962962962962965,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d4_i1_8796b806",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(-3-(-3))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.6265432098765433,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6265432098765433,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d5_i0_6921bd4d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times(-1-(-2))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.4413580246913581,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.4413580246913581,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d5_i1_6621b894",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(-2-(-3))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.37962962962962965,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.37962962962962965,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d6_i0_72e79567",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1\\times(-1-(-3))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-2"],
//     difficulty: 0.37962962962962965,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.37962962962962965,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d6_i1_71e793d4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5\\times(5-(-5))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["50"],
//     difficulty: 0.25617283950617287,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.25617283950617287,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d7_i0_fe31f8c1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5\\times(5-(-11))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["80"],
//     difficulty: 0.33024691358024694,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.33024691358024694,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d7_i1_ff31fa54",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4\\times(4-(-6))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["40"],
//     difficulty: 0.26851851851851855,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.26851851851851855,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d8_i0_7afe862d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "6\\times(6-6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d8_i1_78fe8307",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2\\times(2-2)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.37962962962962965,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.37962962962962965,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d9_i0_1b14b3e8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times(-5-(-9))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-20"],
//     difficulty: 0.30555555555555564,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.30555555555555564,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d9_i1_1c14b57b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5\\times(5-5)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.37962962962962965,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.37962962962962965,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d10_i0_19d4acbe",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8\\times(-8-(-8))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.6635802469135803,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.6635802469135803,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_A_A_MINUS_B_d10_i1_1ad4ae51",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(-3-(-12))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-27"],
//     difficulty: 0.34259259259259256,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:-",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive",
//       "signed",
//     ],
//     misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
//     seeds: {
//       difficulty: 0.34259259259259256,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d0_i0_07d0e358",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(3+(-7))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["8"],
//     difficulty: 0.04629629629629631,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.04629629629629631,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d0_i1_08d0e4eb",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(10+(-8))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["-6"],
//     difficulty: 0.2314814814814815,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.2314814814814815,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d1_i0_c5d9b1f7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(-1+(-8))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["27"],
//     difficulty: 0.05864197530864198,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.05864197530864198,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d1_i1_c4d9b064",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(-1+(-4))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["15"],
//     difficulty: 0.021604938271604937,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.021604938271604937,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d2_i0_8ed4c74a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times(-5+5)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d2_i1_8fd4c8dd",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times(3+(-3))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d3_i0_dcc60aa9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4\\times(-4+4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d3_i1_dbc60916",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(7+(-7))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d4_i0_517242a4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(-12+11)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["2"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d4_i1_52724437",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(-6+6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.404320987654321,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.404320987654321,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d5_i0_6f7ba863",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(1+(-1))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d5_i1_6e7ba6d0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(-2+2)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d6_i0_65f30336",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times(-6+6)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.404320987654321,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.404320987654321,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d6_i1_66f304c9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times(-12+(-5))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["102"],
//     difficulty: 0.10802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.10802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d7_i0_266769f5",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5\\times(-4+4)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d7_i1_25676862",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times(-5+5)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.404320987654321,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.404320987654321,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d8_i0_760d34c0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times(-7+7)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d8_i1_770d3653",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7\\times(0+0)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.41666666666666674,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:zero",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.41666666666666674,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d9_i0_3416035f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4\\times(11+(-11))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.4660493827160494,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.4660493827160494,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d9_i1_36160685",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2\\times(11+(-11))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.4660493827160494,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.4660493827160494,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d10_i0_f99cc30b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times(3+(-3))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["0"],
//     difficulty: 0.39197530864197533,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.39197530864197533,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d10_i1_f89cc178",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "distributive",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4\\times(10+(-11))",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value:
//             "רמז: זכרו את סדר הפעולות (סוגריים לפני כפל/חילוק לפני חיבור/חיסור).",
//         },
//       ],
//     ],
//     correctAnswers: ["4"],
//     difficulty: 0.33136924803591467,
//     tags: [
//       "topic:signed_numbers",
//       "vars:3",
//       "op:+",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:distributive_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "DISTRIBUTIVE_ERROR",
//       "SIGN_ERROR",
//     ],
//     seeds: {
//       difficulty: 0.33136924803591467,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d0_i0_702db370",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--11\\times-1",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-11"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d0_i1_712db503",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--5\\times-8",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-40"],
//     difficulty: 0.037037037037037035,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.037037037037037035,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d1_i0_e7e354cf",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--7\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-84"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d1_i1_e6e3533c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--8\\times2",
//         display: true,
//       },
//     ],
//     correctAnswers: ["16"],
//     difficulty: 0.037037037037037035,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.037037037037037035,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d2_i0_c0e610c2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--3\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["36"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d2_i1_c1e61255",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--2\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-24"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d3_i0_1ecfdfe1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--5\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["60"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d3_i1_1dcfde4e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--6\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-72"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d4_i0_e60e23bc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--3\\times-12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-36"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d4_i1_e70e254f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--4\\times-11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-44"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d5_i0_5dc3c51b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--2\\times7",
//         display: true,
//       },
//     ],
//     correctAnswers: ["14"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d5_i1_5fc3c841",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-12\\times6",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-72"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d6_i0_0b8771a1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--5\\times11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["55"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d6_i1_08876ce8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--6\\times11",
//         display: true,
//       },
//     ],
//     correctAnswers: ["66"],
//     difficulty: 0.07407407407407407,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.07407407407407407,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d7_i0_68713f2d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3\\times10",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-30"],
//     difficulty: 0.061728395061728406,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.061728395061728406,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d7_i1_65713a74",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--11\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["132"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d8_i0_eaa4b02e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8\\times9",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-72"],
//     difficulty: 0.04938271604938273,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.04938271604938273,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d8_i1_eca4b354",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--9\\times-10",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-90"],
//     difficulty: 0.061728395061728406,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.061728395061728406,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d9_i0_605a4e67",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--10\\times10",
//         display: true,
//       },
//     ],
//     correctAnswers: ["100"],
//     difficulty: 0.061728395061728406,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.061728395061728406,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d9_i1_5f5a4cd4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6\\times12",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-72"],
//     difficulty: 0.08641975308641975,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.08641975308641975,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d10_i0_768c1139",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--5\\times-10",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-50"],
//     difficulty: 0.061728395061728406,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.061728395061728406,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_T3_NEG_A_TIMES_B_d10_i1_748c0e13",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "multiplication",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "--6\\times-8",
//         display: true,
//       },
//     ],
//     correctAnswers: ["-48"],
//     difficulty: 0.037037037037037035,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:*",
//       "has:negative",
//       "tier:3",
//       "template:mul_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["LEADING_MINUS_CONFUSION", "NEGATIVE_MULTIPLY_RULE"],
//     seeds: {
//       difficulty: 0.037037037037037035,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d0_i0_052151ff",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["4"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d0_i1_0421506c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["25"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d1_i0_47188360",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.19753086419753088,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.19753086419753088,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d1_i1_481884f3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-4"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d2_i0_bb0d11fe",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d2_i1_ba0d106b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-25"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d3_i0_17d01732",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "1^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1"],
//     difficulty: 0.25925925925925924,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.25925925925925924,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d3_i1_15d0140c",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "7^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["49"],
//     difficulty: 0.03703703703703705,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.03703703703703705,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d4_i0_7b01c24b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-16"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d4_i1_7a01c0b8",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49"],
//     difficulty: 0.03703703703703705,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.03703703703703705,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d5_i0_bef8f6d2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.25925925925925924,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.25925925925925924,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d5_i1_bff8f865",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "2^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["8"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d6_i0_2ded7d91",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "3^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["9"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d6_i1_7fe4660e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.19753086419753088,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.19753086419753088,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d7_i0_62717811",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["16"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d7_i1_19a01bf3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-64"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d8_i0_90a7c438",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-27"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d8_i1_92a7c75e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-125"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d9_i0_d79efd78",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-36"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:negative",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d9_i1_d09ef273",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "4^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["64"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d10_i0_d9b4a925",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "5^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["125"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_A_TO_N_d10_i1_5a60fb6b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "6^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["216"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:2",
//       "template:power",
//       "signed",
//     ],
//     misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d0_i0_2422c189",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-64"],
//     difficulty: 0.04938271604938272,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.04938271604938272,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d0_i1_ac1b48dc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-8"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d1_i0_0b2c8afe",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-216"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d1_i1_0a2c896b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-512"],
//     difficulty: 0.04938271604938272,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.04938271604938272,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d2_i0_ea38d636",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-343"],
//     difficulty: 0.03703703703703705,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.03703703703703705,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d2_i1_996f84bf",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-4"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d3_i0_fc3cbc2b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.25925925925925924,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.25925925925925924,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d3_i1_fb3cba98",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-36"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d4_i0_c5a2531a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-27"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d4_i1_c6a254ad",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.25925925925925924,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.25925925925925924,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d5_i0_841b9679",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-1^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.19753086419753088,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.19753086419753088,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d5_i1_831b94e6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-25"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d6_i0_d863cb40",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-16"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d6_i1_d963ccd3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-25"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d7_i0_0b3b6a4f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-5^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-25"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d7_i1_0a3b68bc",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-4^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-64"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d8_i0_258d9e2e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-3^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d8_i1_268d9fc1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-2^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-4"],
//     difficulty: 0.012345679012345682,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.012345679012345682,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d9_i0_23796c9d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-6^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-36"],
//     difficulty: 0.024691358024691364,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.024691358024691364,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d9_i1_22796b0a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49"],
//     difficulty: 0.03703703703703705,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.03703703703703705,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d10_i0_fded85fb",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-8^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-512"],
//     difficulty: 0.04938271604938272,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.04938271604938272,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_PARENS_NEG_A_TO_N_d10_i1_fced8468",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-7^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-343"],
//     difficulty: 0.03703703703703705,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_parens",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS", "NEGATIVE_BASE_PARITY"],
//     seeds: {
//       difficulty: 0.03703703703703705,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d0_i0_22955845",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(4^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-16"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d0_i1_219556b2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49"],
//     difficulty: 0.28395061728395066,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.28395061728395066,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d1_i0_6220f186",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(8^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-512"],
//     difficulty: 0.29629629629629634,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.29629629629629634,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d1_i1_6320f319",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(6^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-216"],
//     difficulty: 0.271604938271605,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.271604938271605,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d2_i0_6ba996b3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(3^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d2_i1_6aa99520",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(2^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-4"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d3_i0_13f427b4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(3^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-27"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d3_i1_16f42c6d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(8^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-64"],
//     difficulty: 0.29629629629629634,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.29629629629629634,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d4_i0_92683166",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(1^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.5061728395061729,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.5061728395061729,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d4_i1_90682e40",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(1^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1"],
//     difficulty: 0.4444444444444445,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.4444444444444445,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d5_i0_ecf3f528",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(5^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-25"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d5_i1_1e1c210f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(5^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-125"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d6_i0_41086834",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(6^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-36"],
//     difficulty: 0.271604938271605,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.271604938271605,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d6_i1_3f08650e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(2^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-8"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d7_i0_b4061821",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(4^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-64"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d7_i1_df0749aa",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7^{3}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-343"],
//     difficulty: 0.28395061728395066,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.28395061728395066,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d8_i0_5a070929",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49"],
//     difficulty: 0.28395061728395066,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.28395061728395066,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d8_i1_59070796",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(4^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-16"],
//     difficulty: 0.2592592592592593,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.2592592592592593,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d9_i0_c675d00a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49"],
//     difficulty: 0.28395061728395066,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.28395061728395066,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d9_i1_c775d19d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49"],
//     difficulty: 0.28395061728395066,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.28395061728395066,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d10_i0_f573fb3a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(7^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49"],
//     difficulty: 0.28395061728395066,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.28395061728395066,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_POW_LEADING_MINUS_A_TO_N_d10_i1_f673fccd",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "powers_parentheses",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(6^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-36"],
//     difficulty: 0.271604938271605,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "tier:3",
//       "template:power_leading_minus",
//       "signed",
//     ],
//     misconceptions: ["PARENS_IN_POWERS"],
//     seeds: {
//       difficulty: 0.271604938271605,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: false,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d0_i0_d5e072e5",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{6}{9}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["4/9"],
//     difficulty: 0.3127572016460906,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.3127572016460906,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d0_i1_d4e07152",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{8}{12}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["4/9"],
//     difficulty: 0.3127572016460906,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.3127572016460906,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d1_i0_942e0e26",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{6}{30}\\right)^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/125"],
//     difficulty: 0.49283950617283956,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.49283950617283956,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d1_i1_952e0fb9",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{18}{30}\\right)^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-27/125"],
//     difficulty: 0.4671604938271606,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.4671604938271606,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d2_i0_e47fadd3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{6}{8}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["9/16"],
//     difficulty: 0.3402777777777778,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.3402777777777778,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d2_i1_e37fac40",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{2}{9}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["4/81"],
//     difficulty: 0.6822130772748056,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.6822130772748056,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d3_i0_473e78d4",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{14}{20}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["49/100"],
//     difficulty: 0.65,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.65,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d3_i1_483e7a67",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{24}{27}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["64/81"],
//     difficulty: 0.5450388660265204,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.5450388660265204,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d4_i0_8b01df19",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{3}{30}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/100"],
//     difficulty: 0.7388888888888889,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7388888888888889,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d4_i1_8901dbf3",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{3}{30}\\right)^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/1000"],
//     difficulty: 0.7406172839506173,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7406172839506173,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d5_i0_6b8ce2cd",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{2}{20}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/100"],
//     difficulty: 0.7388888888888889,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7388888888888889,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d5_i1_688cde14",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{6}{20}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["9/100"],
//     difficulty: 0.7240740740740742,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7240740740740742,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d6_i0_7552bae7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{1}{8}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/64"],
//     difficulty: 0.6390817901234569,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.6390817901234569,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d6_i1_7452b954",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{2}{18}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/81"],
//     difficulty: 0.6890717878372199,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.6890717878372199,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d7_i0_fd9d1988",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{12}{27}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["16/81"],
//     difficulty: 0.6547782350251486,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.6547782350251486,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d7_i1_fe9d1b1b",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{4}{18}\\right)^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-8/729"],
//     difficulty: 0.6900032176666837,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.6900032176666837,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d8_i0_7d69abad",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{3}{30}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/100"],
//     difficulty: 0.7388888888888889,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7388888888888889,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d8_i1_7c69aa1a",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{27}{30}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["81/100"],
//     difficulty: 0.5907407407407408,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.5907407407407408,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d9_i0_1f7fdc8e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{1}{9}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/81"],
//     difficulty: 0.6890717878372199,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.6890717878372199,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d9_i1_207fde21",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{1}{10}\\right)^{2}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/100"],
//     difficulty: 0.7388888888888889,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7388888888888889,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d10_i0_6880b53e",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(\\frac{2}{20}\\right)^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["1/1000"],
//     difficulty: 0.7406172839506173,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7406172839506173,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_SIMPLE_C2_C3_d10_i1_6980b6d1",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "\\left(-\\frac{3}{30}\\right)^{3}",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/1000"],
//     difficulty: 0.7406172839506173,
//     tags: [
//       "topic:signed_numbers",
//       "vars:2",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power",
//       "signed",
//     ],
//     misconceptions: [
//       "POWER_OF_FRACTION",
//       "SIMPLIFY_BEFORE_POWER_CONFUSION",
//       "NEGATIVE_BASE_PARITY",
//     ],
//     seeds: {
//       difficulty: 0.7406172839506173,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d0_i0_015f66aa",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{3}{6}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/4"],
//     difficulty: 0.5802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d0_i1_025f683d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{3}{6}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/4"],
//     difficulty: 0.5802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d1_i0_21d46489",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{2}{4}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/4"],
//     difficulty: 0.5802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d1_i1_20d462f6",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{9}{15}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9/25"],
//     difficulty: 0.6419753086419754,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.6419753086419754,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d2_i0_4cdf3d38",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{14}{18}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-49/81"],
//     difficulty: 0.7736625514403291,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.7736625514403291,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d2_i1_4ddf3ecb",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{6}{10}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9/25"],
//     difficulty: 0.6419753086419754,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.6419753086419754,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d3_i0_37271cd7",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{2}{12}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/36"],
//     difficulty: 0.851851851851852,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.851851851851852,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d3_i1_36271b44",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{12}{24}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/4"],
//     difficulty: 0.5802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d4_i0_573fa496",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{3}{10}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9/100"],
//     difficulty: 1,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 1,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d4_i1_583fa629",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{6}{15}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-4/25"],
//     difficulty: 0.7160493827160496,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.7160493827160496,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d5_i0_98f20955",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{15}{30}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/4"],
//     difficulty: 0.5802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d5_i1_96f2062f",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{2}{3}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-4/9"],
//     difficulty: 0.5185185185185186,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5185185185185186,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d6_i0_c3fce204",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{4}{9}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-16/81"],
//     difficulty: 0.8971193415637861,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.8971193415637861,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d6_i1_c4fce397",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{2}{6}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/9"],
//     difficulty: 0.6419753086419754,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.6419753086419754,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d7_i0_62057e43",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{6}{16}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9/64"],
//     difficulty: 0.8734567901234569,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.8734567901234569,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d7_i1_61057cb0",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{6}{12}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/4"],
//     difficulty: 0.5802469135802469,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5802469135802469,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d8_i0_a65d0bf2",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{27}{30}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-81/100"],
//     difficulty: 0.7777777777777778,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.7777777777777778,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d8_i1_a75d0d85",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{12}{30}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-4/25"],
//     difficulty: 0.7160493827160496,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.7160493827160496,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d9_i0_314d5351",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{27}{30}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-81/100"],
//     difficulty: 0.7777777777777778,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.7777777777777778,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d9_i1_304d51be",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(\\frac{9}{30}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9/100"],
//     difficulty: 1,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 1,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d10_i0_50389877",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{6}{8}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-9/16"],
//     difficulty: 0.5370370370370371,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.5370370370370371,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
//   {
//     id: "SN_FRAC_POW_LEADING_MINUS_SQ_d10_i1_52389b9d",
//     topicId: "SIGNED_NUMBERS",
//     type: "numeric",
//     subtopic: "fraction_powers",
//     prompt: [
//       {
//         kind: "text",
//         value: "חשבו:",
//       },
//       {
//         kind: "math",
//         latex: "-\\left(\\left(-\\frac{3}{24}\\right)^{2}\\right)",
//         display: true,
//       },
//     ],
//     hints: [
//       [
//         {
//           kind: "text",
//           value: "רמז: שימו לב לסוגריים בבסיס החזקה. זה משנה את התוצאה.",
//         },
//       ],
//     ],
//     correctAnswers: ["-1/64"],
//     difficulty: 0.9660493827160496,
//     tags: [
//       "topic:signed_numbers",
//       "vars:1",
//       "op:^",
//       "has:fraction",
//       "has:negative",
//       "tier:3",
//       "template:fraction_power_leading_minus",
//       "signed",
//     ],
//     misconceptions: [
//       "LEADING_MINUS_CONFUSION",
//       "POWER_OF_FRACTION",
//       "PARENS_IN_POWERS",
//     ],
//     seeds: {
//       difficulty: 0.9660493827160496,
//     },
//     input: {
//       allowMinus: true,
//       allowDecimal: true,
//     },
//   },
// ];
