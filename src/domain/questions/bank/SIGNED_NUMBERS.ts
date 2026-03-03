import type { Question } from "@domain/questions/types";

export const SIGNED_NUMBERS_QUESTIONS: Question[] =
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

  [
    {
      id: "SN_T1_ADD_INT_d0_i0_c840eb8d",
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
          latex: "-5+2",
          display: true,
        },
      ],
      correctAnswers: ["-3"],
      difficulty: 0.14814814814814814,
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
        difficulty: 0.14814814814814814,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d0_i1_c740e9fa",
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
          latex: "-2+4",
          display: true,
        },
      ],
      correctAnswers: ["2"],
      difficulty: 0.1851851851851852,
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
        difficulty: 0.1851851851851852,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d1_i0_6a571c6e",
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
          latex: "3+20",
          display: true,
        },
      ],
      correctAnswers: ["23"],
      difficulty: 0.18518518518518523,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:+",
        "tier:1",
        "template:addition",
        "signed",
      ],
      misconceptions: ["SIGN_ERROR"],
      seeds: {
        difficulty: 0.18518518518518523,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d1_i1_6b571e01",
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
          latex: "-1+(-18)",
          display: true,
        },
      ],
      correctAnswers: ["-19"],
      difficulty: 0.16049382716049385,
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
        difficulty: 0.16049382716049385,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d2_i0_115529fb",
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
          latex: "-12+(-26)",
          display: true,
        },
      ],
      correctAnswers: ["-38"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d2_i1_10552868",
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
          latex: "-18+5",
          display: true,
        },
      ],
      correctAnswers: ["-13"],
      difficulty: 0.26337448559670784,
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
        difficulty: 0.26337448559670784,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d3_i0_999f889c",
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
          latex: "-5+5",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.3703703703703704,
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
        difficulty: 0.3703703703703704,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d3_i1_9a9f8a2f",
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
          latex: "-23+21",
          display: true,
        },
      ],
      correctAnswers: ["-2"],
      difficulty: 0.5603864734299517,
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
        difficulty: 0.5603864734299517,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d4_i0_7d6257c1",
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
          latex: "7+(-30)",
          display: true,
        },
      ],
      correctAnswers: ["-23"],
      difficulty: 0.39506172839506176,
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
        difficulty: 0.39506172839506176,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d4_i1_7c62562e",
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
          latex: "14+(-13)",
          display: true,
        },
      ],
      correctAnswers: ["1"],
      difficulty: 0.4550264550264551,
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
        difficulty: 0.4550264550264551,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d5_i0_f33977a2",
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
          latex: "-9+9",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.41975308641975306,
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
        difficulty: 0.41975308641975306,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d5_i1_f4397935",
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
          latex: "5+(-29)",
          display: true,
        },
      ],
      correctAnswers: ["-24"],
      difficulty: 0.36015325670498083,
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
        difficulty: 0.36015325670498083,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d6_i0_c676962f",
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
          latex: "-5+28",
          display: true,
        },
      ],
      correctAnswers: ["23"],
      difficulty: 0.3500881834215167,
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
        difficulty: 0.3500881834215167,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d6_i1_c576949c",
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
          latex: "19+(-19)",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.5432098765432098,
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
        difficulty: 0.5432098765432098,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d7_i0_4ec0f4d0",
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
          latex: "-11+11",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.4444444444444445,
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
        difficulty: 0.4444444444444445,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d7_i1_4fc0f663",
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
          latex: "-8+8",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.4074074074074074,
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
        difficulty: 0.4074074074074074,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d8_i0_38c73345",
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
      difficulty: 0.617283950617284,
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
        difficulty: 0.617283950617284,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d8_i1_37c731b2",
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
          latex: "21+(-16)",
          display: true,
        },
      ],
      correctAnswers: ["5"],
      difficulty: 0.4797178130511464,
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
        difficulty: 0.4797178130511464,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d9_i0_7852cc86",
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
          latex: "-24+12",
          display: true,
        },
      ],
      correctAnswers: ["-12"],
      difficulty: 0.41975308641975306,
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
        difficulty: 0.41975308641975306,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d9_i1_7952ce19",
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
          latex: "-20+17",
          display: true,
        },
      ],
      correctAnswers: ["-3"],
      difficulty: 0.5000000000000001,
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
        difficulty: 0.5000000000000001,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d10_i0_7e567b96",
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
          latex: "-3+3",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.3703703703703704,
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
        difficulty: 0.3703703703703704,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_ADD_INT_d10_i1_7f567d29",
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
          latex: "4+(-30)",
          display: true,
        },
      ],
      correctAnswers: ["-26"],
      difficulty: 0.35802469135802467,
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
        difficulty: 0.35802469135802467,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d0_i0_326a24e4",
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
          latex: "1-2",
          display: true,
        },
      ],
      correctAnswers: ["-1"],
      difficulty: 0.1851851851851852,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "tier:1",
        "template:subtraction",
        "signed",
      ],
      misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.1851851851851852,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d0_i1_336a2677",
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
          latex: "-3-0",
          display: true,
        },
      ],
      correctAnswers: ["-3"],
      difficulty: 0,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "has:negative",
        "has:zero",
        "tier:1",
        "template:subtraction",
        "signed",
      ],
      misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d1_i0_50738aa3",
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
          latex: "-29-9",
          display: true,
        },
      ],
      correctAnswers: ["-38"],
      difficulty: 0.2962962962962963,
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
        difficulty: 0.2962962962962963,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d1_i1_4f738910",
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
          latex: "22-(-8)",
          display: true,
        },
      ],
      correctAnswers: ["30"],
      difficulty: 0.45679012345679015,
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
        difficulty: 0.45679012345679015,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d2_i0_015f1f76",
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
          latex: "3-(-28)",
          display: true,
        },
      ],
      correctAnswers: ["31"],
      difficulty: 0.5308641975308642,
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
        difficulty: 0.5308641975308642,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d2_i1_025f2109",
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
          latex: "-13-(-1)",
          display: true,
        },
      ],
      correctAnswers: ["-12"],
      difficulty: 0.3741690408357076,
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
        difficulty: 0.3741690408357076,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d3_i0_ee129735",
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
          latex: "-15-(-11)",
          display: true,
        },
      ],
      correctAnswers: ["-4"],
      difficulty: 0.6419753086419754,
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
        difficulty: 0.6419753086419754,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d3_i1_ed1295a2",
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
          latex: "-11-(-5)",
          display: true,
        },
      ],
      correctAnswers: ["-6"],
      difficulty: 0.48933782267115605,
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
        difficulty: 0.48933782267115605,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d4_i0_a33cff98",
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
          latex: "0-(-30)",
          display: true,
        },
      ],
      correctAnswers: ["30"],
      difficulty: 0.5555555555555556,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "has:negative",
        "has:zero",
        "tier:1",
        "template:subtraction",
        "signed",
      ],
      misconceptions: ["SUBTRACTION_SIGN_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.5555555555555556,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d4_i1_a43d012b",
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
          latex: "-4-(-4)",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.617283950617284,
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
        difficulty: 0.617283950617284,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d5_i0_6145ce37",
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
          latex: "9-(-25)",
          display: true,
        },
      ],
      correctAnswers: ["34"],
      difficulty: 0.49382716049382724,
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
        difficulty: 0.49382716049382724,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d5_i1_6045cca4",
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
          latex: "15-(-26)",
          display: true,
        },
      ],
      correctAnswers: ["41"],
      difficulty: 0.5061728395061729,
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
        difficulty: 0.5061728395061729,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d6_i0_567ff48a",
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
          latex: "4-(-30)",
          display: true,
        },
      ],
      correctAnswers: ["34"],
      difficulty: 0.5555555555555556,
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
        difficulty: 0.5555555555555556,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d6_i1_577ff61d",
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
          latex: "-1-(-30)",
          display: true,
        },
      ],
      correctAnswers: ["29"],
      difficulty: 0.5679012345679013,
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
        difficulty: 0.5679012345679013,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d7_i0_783226e9",
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
          latex: "-1-(-20)",
          display: true,
        },
      ],
      correctAnswers: ["19"],
      difficulty: 0.4506172839506174,
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
        difficulty: 0.4506172839506174,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d7_i1_77322556",
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
          latex: "-15-(-29)",
          display: true,
        },
      ],
      correctAnswers: ["14"],
      difficulty: 0.7347807577692634,
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
        difficulty: 0.7347807577692634,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d8_i0_a1e3aacc",
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
          latex: "-16-(-16)",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.7530864197530865,
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
        difficulty: 0.7530864197530865,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d8_i1_a2e3ac5f",
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
          latex: "-17-(-17)",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.7654320987654322,
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
        difficulty: 0.7654320987654322,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d9_i0_5eaf44eb",
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
          latex: "-8-(-8)",
          display: true,
        },
      ],
      correctAnswers: ["0"],
      difficulty: 0.6543209876543211,
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
        difficulty: 0.6543209876543211,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d9_i1_5daf4358",
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
      difficulty: 0.8765432098765432,
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
        difficulty: 0.8765432098765432,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d10_i0_ee5ceae5",
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
          latex: "-27-(-16)",
          display: true,
        },
      ],
      correctAnswers: ["-11"],
      difficulty: 0.7379972565157751,
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
        difficulty: 0.7379972565157751,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_SUB_INT_d10_i1_ed5ce952",
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
          latex: "-7-(-30)",
          display: true,
        },
      ],
      correctAnswers: ["23"],
      difficulty: 0.6419753086419754,
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
        difficulty: 0.6419753086419754,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d0_i0_0a8ae5a0",
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
          latex: "-1\\times-7",
          display: true,
        },
      ],
      correctAnswers: ["7"],
      difficulty: 0.024691358024691364,
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
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d0_i1_0b8ae733",
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
          latex: "2\\times-6",
          display: true,
        },
      ],
      correctAnswers: ["-12"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d1_i0_c893b43f",
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
          latex: "-2\\times10",
          display: true,
        },
      ],
      correctAnswers: ["-20"],
      difficulty: 0.061728395061728406,
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
        difficulty: 0.061728395061728406,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d1_i1_c793b2ac",
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
          latex: "-1\\times-4",
          display: true,
        },
      ],
      correctAnswers: ["4"],
      difficulty: 0,
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
        difficulty: 0,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d2_i0_af036872",
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
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d2_i1_b0036a05",
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
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d3_i0_39f3afd1",
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
          latex: "4\\times2",
          display: true,
        },
      ],
      correctAnswers: ["8"],
      difficulty: 0,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:*",
        "tier:1",
        "template:multiplication",
        "signed",
      ],
      misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
      seeds: {
        difficulty: 0,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d3_i1_38f3ae3e",
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
          latex: "6\\times11",
          display: true,
        },
      ],
      correctAnswers: ["66"],
      difficulty: 0.07407407407407407,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:*",
        "tier:1",
        "template:multiplication",
        "signed",
      ],
      misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
      seeds: {
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d4_i0_542c44ec",
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
          latex: "-5\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["60"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d4_i1_552c467f",
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
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d5_i0_1235138b",
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
          latex: "3\\times7",
          display: true,
        },
      ],
      correctAnswers: ["21"],
      difficulty: 0.024691358024691364,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:*",
        "tier:1",
        "template:multiplication",
        "signed",
      ],
      misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
      seeds: {
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d5_i1_113511f8",
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
          latex: "5\\times12",
          display: true,
        },
      ],
      correctAnswers: ["60"],
      difficulty: 0.08641975308641975,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:*",
        "tier:1",
        "template:multiplication",
        "signed",
      ],
      misconceptions: ["NEGATIVE_MULTIPLY_RULE"],
      seeds: {
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d6_i0_24e3d8be",
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
          latex: "-1\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["12"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d6_i1_25e3da51",
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
          latex: "-2\\times-6",
          display: true,
        },
      ],
      correctAnswers: ["12"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d7_i0_c920d51d",
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
          latex: "1\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["-12"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d7_i1_c820d38a",
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
          latex: "-1\\times12",
          display: true,
        },
      ],
      correctAnswers: ["-12"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d8_i0_558599b8",
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
          latex: "-8\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["96"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d8_i1_57859cde",
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
          latex: "-4\\times11",
          display: true,
        },
      ],
      correctAnswers: ["-44"],
      difficulty: 0.07407407407407407,
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
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d9_i0_3ecd77c4",
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
          latex: "-1\\times-10",
          display: true,
        },
      ],
      correctAnswers: ["10"],
      difficulty: 0.061728395061728406,
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
        difficulty: 0.061728395061728406,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d9_i1_41cd7c7d",
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
          latex: "-9\\times11",
          display: true,
        },
      ],
      correctAnswers: ["-99"],
      difficulty: 0.07407407407407407,
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
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d10_i0_4aeceae9",
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
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T1_MUL_INT_d10_i1_49ece956",
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
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d0_i0_e483ec51",
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
          latex: "2+5-1",
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
      correctAnswers: ["6"],
      difficulty: 0.14506172839506173,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:+",
        "op:-",
        "tier:2",
        "template:chain",
        "signed",
      ],
      misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
      seeds: {
        difficulty: 0.14506172839506173,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d0_i1_e383eabe",
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
          latex: "-6+(-5)-1",
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
      correctAnswers: ["-12"],
      difficulty: 0.1574074074074074,
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
        difficulty: 0.1574074074074074,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d1_i0_5993a4f2",
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
          latex: "-2+(-1)-5",
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
      difficulty: 0.14506172839506173,
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
        difficulty: 0.14506172839506173,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d1_i1_5a93a685",
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
          latex: "8+(-1)-(-5)",
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
      difficulty: 0.4290123456790124,
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
        difficulty: 0.4290123456790124,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d2_i0_7323f0bf",
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
          latex: "1+(-6)-(-13)",
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
      difficulty: 0.6331908831908832,
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
        difficulty: 0.6331908831908832,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d2_i1_7223ef2c",
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
          latex: "16+3-(-10)",
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
      correctAnswers: ["29"],
      difficulty: 0.5277777777777778,
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
        difficulty: 0.5277777777777778,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d3_i0_b51b2220",
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
          latex: "18+(-18)-(-4)",
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
      difficulty: 0.8405349794238685,
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
        difficulty: 0.8405349794238685,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d3_i1_b61b23b3",
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
          latex: "-1+(-3)-(-20)",
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
      correctAnswers: ["16"],
      difficulty: 0.6512345679012347,
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
        difficulty: 0.6512345679012347,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d4_i0_73b1119d",
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
          latex: "-6+(-7)-(-11)",
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
      difficulty: 0.7690796857463525,
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
        difficulty: 0.7690796857463525,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d4_i1_72b1100a",
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
          latex: "-8+2-(-6)",
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
      difficulty: 0.7993827160493827,
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
        difficulty: 0.7993827160493827,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d5_i0_cf74153e",
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
          latex: "14+(-20)-(-8)",
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
      difficulty: 0.910493827160494,
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
        difficulty: 0.910493827160494,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d5_i1_d07416d1",
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
          latex: "-18+13-(-4)",
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
      difficulty: 0.9022633744855967,
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
        difficulty: 0.9022633744855967,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d6_i0_bcc5500b",
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
          latex: "7+(-8)-(-1)",
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
      difficulty: 0.7993827160493827,
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
        difficulty: 0.7993827160493827,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d6_i1_bbc54e78",
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
          latex: "-8+(-4)-(-13)",
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
      difficulty: 0.8326210826210828,
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
        difficulty: 0.8326210826210828,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d7_i0_febc816c",
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
          latex: "4+(-14)-(-9)",
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
      difficulty: 0.8470017636684305,
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
        difficulty: 0.8470017636684305,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d7_i1_ffbc82ff",
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
          latex: "-2+(-3)-(-6)",
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
      difficulty: 0.712962962962963,
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
        difficulty: 0.712962962962963,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d8_i0_d50afd89",
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
          latex: "11+(-20)-(-10)",
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
      difficulty: 0.9290123456790124,
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
        difficulty: 0.9290123456790124,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d8_i1_d40afbf6",
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
          latex: "17+(-20)-(-6)",
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
      difficulty: 0.8919753086419753,
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
        difficulty: 0.8919753086419753,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d9_i0_b495ffaa",
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
          latex: "-7+(-15)-(-20)",
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
      difficulty: 0.910493827160494,
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
        difficulty: 0.910493827160494,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d9_i1_b596013d",
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
          latex: "6+13-18",
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
      difficulty: 0.6553497942386831,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:+",
        "op:-",
        "tier:2",
        "template:chain",
        "signed",
      ],
      misconceptions: ["SIGN_ERROR", "ORDER_OF_OPERATIONS_LINEAR"],
      seeds: {
        difficulty: 0.6553497942386831,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d10_i0_f52cb492",
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
          latex: "-18+9-(-10)",
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
      difficulty: 0.9022633744855967,
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
        difficulty: 0.9022633744855967,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_ADD_SUB_d10_i1_f62cb625",
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
          latex: "-5+(-4)-(-9)",
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
      difficulty: 0.8117283950617284,
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
        difficulty: 0.8117283950617284,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d0_i0_0de83085",
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
          latex: "-3-5+(-1)",
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
      difficulty: 0.14506172839506173,
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
        difficulty: 0.14506172839506173,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d0_i1_0ce82ef2",
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
          latex: "-11-13+6",
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
      difficulty: 0.2438271604938272,
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
        difficulty: 0.2438271604938272,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d1_i0_4d73c9c6",
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
          latex: "3-(-2)+2",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d1_i1_4e73cb59",
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
          latex: "6-(-13)+(-6)",
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
      correctAnswers: ["13"],
      difficulty: 0.4907407407407408,
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
        difficulty: 0.4907407407407408,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d2_i0_833b7ff3",
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
          latex: "-4-(-1)+6",
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
      difficulty: 0.5895061728395062,
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
        difficulty: 0.5895061728395062,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d2_i1_823b7e60",
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
          latex: "-6-(-1)+15",
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
      correctAnswers: ["10"],
      difficulty: 0.6388888888888891,
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
        difficulty: 0.6388888888888891,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d3_i0_2b8610f4",
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
          latex: "8-(-2)+(-17)",
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
      difficulty: 0.7579883805374003,
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
        difficulty: 0.7579883805374003,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d3_i1_2c861287",
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
          latex: "-9-1+15",
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
      difficulty: 0.5154320987654322,
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
        difficulty: 0.5154320987654322,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d4_i0_c446d139",
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
          latex: "7-(-6)+(-16)",
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
      difficulty: 0.8287037037037036,
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
        difficulty: 0.8287037037037036,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d4_i1_c346cfa6",
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
          latex: "-7-(-1)+6",
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
      difficulty: 0.7870370370370371,
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
        difficulty: 0.7870370370370371,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d5_i0_23d29cda",
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
          latex: "-4-(-20)+(-14)",
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
      difficulty: 0.910493827160494,
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
        difficulty: 0.910493827160494,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d5_i1_24d29e6d",
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
          latex: "-2-(-13)+(-13)",
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
      difficulty: 0.8041310541310541,
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
        difficulty: 0.8041310541310541,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d6_i0_2d5b4207",
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
          latex: "12-(-8)+(-20)",
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
      difficulty: 0.947530864197531,
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
        difficulty: 0.947530864197531,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d6_i1_2c5b4074",
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
          latex: "7-(-8)+(-16)",
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
      difficulty: 0.875,
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
        difficulty: 0.875,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d7_i0_b5a5a0a8",
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
          latex: "-11-(-2)+11",
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
      difficulty: 0.7690796857463525,
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
        difficulty: 0.7690796857463525,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d7_i1_b7a5a3ce",
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
          latex: "-5-(-10)+(-3)",
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
      difficulty: 0.75,
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
        difficulty: 0.75,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d8_i0_e2edaecd",
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
          latex: "3-(-17)+(-15)",
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
      difficulty: 0.8015613652868554,
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
        difficulty: 0.8015613652868554,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d8_i1_e1edad3a",
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
          latex: "11-(-8)+(-18)",
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
      difficulty: 0.9022633744855967,
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
        difficulty: 0.9022633744855967,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d9_i0_8503dfae",
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
          latex: "-15-(-16)+(-4)",
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
      difficulty: 0.8287037037037036,
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
        difficulty: 0.8287037037037036,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d9_i1_8603e141",
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
          latex: "6-(-13)+(-18)",
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
      difficulty: 0.9022633744855967,
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
        difficulty: 0.9022633744855967,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d10_i0_7dedd15e",
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
          latex: "-13-(-1)+9",
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
      difficulty: 0.7756410256410258,
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
        difficulty: 0.7756410256410258,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_ADD_d10_i1_7eedd2f1",
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
          latex: "-10-(-19)+(-10)",
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
      difficulty: 0.915692007797271,
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
        difficulty: 0.915692007797271,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d0_i0_c5bc1630",
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
          latex: "1-12-1",
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
      correctAnswers: ["-12"],
      difficulty: 0.22222222222222224,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:-",
        "tier:2",
        "template:chain",
        "signed",
      ],
      misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.22222222222222224,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d0_i1_c6bc17c3",
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
          latex: "4-0-1",
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
      difficulty: 0.22839506172839508,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:-",
        "has:zero",
        "tier:2",
        "template:chain",
        "signed",
      ],
      misconceptions: ["DOUBLE_MINUS_CONFUSION", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.22839506172839508,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d1_i0_69b0c88f",
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
          latex: "-4-3-12",
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
      correctAnswers: ["-19"],
      difficulty: 0.22222222222222224,
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
        difficulty: 0.22222222222222224,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d1_i1_68b0c6fc",
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
          latex: "-3-(-6)-(-2)",
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
      difficulty: 0.45679012345679015,
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
        difficulty: 0.45679012345679015,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d2_i0_16747382",
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
          latex: "-1-4-(-3)",
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
      difficulty: 0.5679012345679013,
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
        difficulty: 0.5679012345679013,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d2_i1_17747515",
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
          latex: "0-8-(-18)",
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
      correctAnswers: ["10"],
      difficulty: 0.7078189300411523,
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
        difficulty: 0.7078189300411523,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d3_i0_745e42a1",
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
          latex: "-8-(-3)-(-3)",
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
      difficulty: 0.6975308641975309,
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
        difficulty: 0.6975308641975309,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d3_i1_735e410e",
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
          latex: "7-9-(-4)",
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
      difficulty: 0.7201646090534979,
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
        difficulty: 0.7201646090534979,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d4_i0_3b9c867c",
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
          latex: "5-9-(-4)",
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
      difficulty: 0.802469135802469,
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
        difficulty: 0.802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d4_i1_3c9c880f",
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
          latex: "-11-(-5)-(-8)",
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
      difficulty: 0.7598204264870932,
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
        difficulty: 0.7598204264870932,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d5_i0_cc9edcdb",
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
          latex: "15-(-1)-20",
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
      correctAnswers: ["-4"],
      difficulty: 0.8641975308641975,
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
        difficulty: 0.8641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d5_i1_cb9edb48",
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
          latex: "-15-4-(-19)",
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
      difficulty: 0.925925925925926,
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
        difficulty: 0.925925925925926,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d6_i0_8c54e3ce",
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
          latex: "-14-4-(-19)",
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
      difficulty: 0.9064327485380117,
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
        difficulty: 0.9064327485380117,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d6_i1_8d54e561",
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
          latex: "-12-(-18)-3",
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
      difficulty: 0.8518518518518519,
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
        difficulty: 0.8518518518518519,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d7_i0_ea3eb2ed",
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
          latex: "2-17-(-12)",
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
      difficulty: 0.8358750907770516,
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
        difficulty: 0.8358750907770516,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d7_i1_e93eb15a",
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
          latex: "10-(-6)-15",
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
      difficulty: 0.8518518518518519,
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
        difficulty: 0.8518518518518519,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d8_i0_577fc4c8",
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
          latex: "-9-(-16)-8",
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
      difficulty: 0.8657407407407407,
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
        difficulty: 0.8657407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d8_i1_587fc65b",
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
          latex: "4-(-13)-16",
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
      difficulty: 0.8657407407407407,
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
        difficulty: 0.8657407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d9_i0_cf356627",
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
          latex: "-16-(-17)-1",
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
      difficulty: 0.9012345679012346,
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
        difficulty: 0.9012345679012346,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d9_i1_ce356494",
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
          latex: "-13-(-16)-3",
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
      difficulty: 0.888888888888889,
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
        difficulty: 0.888888888888889,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d10_i0_806ffb79",
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
          latex: "-1-(-20)-16",
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
      difficulty: 0.8827160493827162,
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
        difficulty: 0.8827160493827162,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_CHAIN_SUB_SUB_d10_i1_7f6ff9e6",
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
          latex: "-4-10-(-14)",
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
      difficulty: 0.8641975308641975,
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
        difficulty: 0.8641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d0_i0_10e6c7c8",
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
          latex: "-18-9",
          display: true,
        },
      ],
      correctAnswers: ["-27"],
      difficulty: 0.16049382716049385,
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
        difficulty: 0.16049382716049385,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d0_i1_11e6c95b",
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
          latex: "-19-21",
          display: true,
        },
      ],
      correctAnswers: ["-40"],
      difficulty: 0.1975308641975309,
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
        difficulty: 0.1975308641975309,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d1_i0_889c6927",
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
          latex: "-11-0",
          display: true,
        },
      ],
      correctAnswers: ["-11"],
      difficulty: 0.07407407407407407,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "has:zero",
        "tier:2",
        "template:leading_minus",
        "signed",
      ],
      misconceptions: ["LEADING_MINUS_CONFUSION"],
      seeds: {
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d1_i1_879c6794",
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
          latex: "-6-8",
          display: true,
        },
      ],
      correctAnswers: ["-14"],
      difficulty: 0.037037037037037035,
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
        difficulty: 0.037037037037037035,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d2_i0_7dd68f7a",
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
          latex: "-3-21",
          display: true,
        },
      ],
      correctAnswers: ["-24"],
      difficulty: 0.1975308641975309,
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
        difficulty: 0.1975308641975309,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d2_i1_7ed6910d",
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
          latex: "-3-13",
          display: true,
        },
      ],
      correctAnswers: ["-16"],
      difficulty: 0.09876543209876545,
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
        difficulty: 0.09876543209876545,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d3_i0_9e4b8d59",
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
          latex: "-1-30",
          display: true,
        },
      ],
      correctAnswers: ["-31"],
      difficulty: 0.308641975308642,
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
        difficulty: 0.308641975308642,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d3_i1_9d4b8bc6",
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
      difficulty: 0.2962962962962963,
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
        difficulty: 0.2962962962962963,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d4_i0_86c73814",
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
      difficulty: 0.12345679012345681,
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
        difficulty: 0.12345679012345681,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d4_i1_87c739a7",
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
          latex: "-10-14",
          display: true,
        },
      ],
      correctAnswers: ["-24"],
      difficulty: 0.11111111111111113,
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
        difficulty: 0.11111111111111113,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d5_i0_de7ca713",
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
          latex: "-2-30",
          display: true,
        },
      ],
      correctAnswers: ["-32"],
      difficulty: 0.308641975308642,
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
        difficulty: 0.308641975308642,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d5_i1_dd7ca580",
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
          latex: "-9-11",
          display: true,
        },
      ],
      correctAnswers: ["-20"],
      difficulty: 0.07407407407407407,
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
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d6_i0_d3b6cd66",
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
          latex: "-7-13",
          display: true,
        },
      ],
      correctAnswers: ["-20"],
      difficulty: 0.09876543209876545,
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
        difficulty: 0.09876543209876545,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d6_i1_d4b6cef9",
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
          latex: "-15-17",
          display: true,
        },
      ],
      correctAnswers: ["-32"],
      difficulty: 0.14814814814814814,
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
        difficulty: 0.14814814814814814,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d7_i0_15693225",
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
          latex: "-8-23",
          display: true,
        },
      ],
      correctAnswers: ["-31"],
      difficulty: 0.22222222222222227,
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
        difficulty: 0.22222222222222227,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d7_i1_14693092",
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
          latex: "-12-19",
          display: true,
        },
      ],
      correctAnswers: ["-31"],
      difficulty: 0.1728395061728395,
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
        difficulty: 0.1728395061728395,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d8_i0_7f231930",
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
          latex: "-16-29",
          display: true,
        },
      ],
      correctAnswers: ["-45"],
      difficulty: 0.2962962962962963,
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
        difficulty: 0.2962962962962963,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d8_i1_80231ac3",
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
          latex: "-14-29",
          display: true,
        },
      ],
      correctAnswers: ["-43"],
      difficulty: 0.2962962962962963,
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
        difficulty: 0.2962962962962963,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d9_i0_2317cb8f",
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
          latex: "-16-23",
          display: true,
        },
      ],
      correctAnswers: ["-39"],
      difficulty: 0.22222222222222227,
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
        difficulty: 0.22222222222222227,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d9_i1_2217c9fc",
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
          latex: "-19-29",
          display: true,
        },
      ],
      correctAnswers: ["-48"],
      difficulty: 0.2962962962962963,
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
        difficulty: 0.2962962962962963,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d10_i0_c8c294a1",
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
          latex: "-25-30",
          display: true,
        },
      ],
      correctAnswers: ["-55"],
      difficulty: 0.308641975308642,
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
        difficulty: 0.308641975308642,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_LEADING_MINUS_ADD_d10_i1_c7c2930e",
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
          latex: "-4-30",
          display: true,
        },
      ],
      correctAnswers: ["-34"],
      difficulty: 0.308641975308642,
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
        difficulty: 0.308641975308642,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d0_i0_75c52eeb",
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
          latex: "\\frac{15}{4}+19",
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
      correctAnswers: ["91/4"],
      difficulty: 0.20679012345679013,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:+",
        "op:/",
        "has:fraction",
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
        difficulty: 0.20679012345679013,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d0_i1_74c52d58",
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
          latex: "\\frac{56}{1}+5",
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
      correctAnswers: ["61"],
      difficulty: 0.5277777777777779,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:+",
        "op:/",
        "has:fraction",
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
        difficulty: 0.5277777777777779,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d1_i0_b8f994cc",
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
          latex: "\\frac{12}{12}+(-3)",
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
      difficulty: 0.4290123456790124,
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
        difficulty: 0.4290123456790124,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d1_i1_b9f9965f",
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
          latex: "\\frac{35}{-4}+(-19)",
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
      correctAnswers: ["-111/4"],
      difficulty: 0.48104056437389786,
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
        difficulty: 0.48104056437389786,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d2_i0_acb1b9fd",
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
          latex: "\\frac{27}{-2}+(-13)",
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
      correctAnswers: ["-53/2"],
      difficulty: 0.3124142661179699,
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
        difficulty: 0.3124142661179699,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d2_i1_abb1b86a",
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
          latex: "\\frac{-51}{-1}+(-3)",
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
      correctAnswers: ["48"],
      difficulty: 0.5495642701525055,
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
        difficulty: 0.5495642701525055,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d3_i0_09b1f21e",
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
          latex: "\\frac{15}{2}+(-7)",
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
      correctAnswers: ["1/2"],
      difficulty: 0.5154320987654322,
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
        difficulty: 0.5154320987654322,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d3_i1_0ab1f3b1",
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
          latex: "\\frac{4}{5}+(-1)",
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
      correctAnswers: ["-1/5"],
      difficulty: 0.3895061728395062,
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
        difficulty: 0.3895061728395062,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d4_i0_2c23cf9f",
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
          latex: "\\frac{33}{-3}+11",
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
      difficulty: 0.75,
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
        difficulty: 0.75,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d4_i1_2b23ce0c",
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
          latex: "\\frac{-46}{-6}+(-11)",
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
      correctAnswers: ["-10/3"],
      difficulty: 0.871309715512614,
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
        difficulty: 0.871309715512614,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d5_i0_41dbf000",
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
          latex: "\\frac{16}{4}+(-4)",
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
      difficulty: 0.5401234567901235,
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
        difficulty: 0.5401234567901235,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d5_i1_42dbf193",
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
          latex: "\\frac{-1}{-3}+(-1)",
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
      difficulty: 0.32201646090534986,
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
        difficulty: 0.32201646090534986,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d6_i0_36d149b1",
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
          latex: "\\frac{33}{-6}+7",
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
      correctAnswers: ["3/2"],
      difficulty: 0.7331649831649832,
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
        difficulty: 0.7331649831649832,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d6_i1_35d1481e",
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
          latex: "\\frac{-9}{-2}+(-5)",
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
      difficulty: 0.43312757201646096,
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
        difficulty: 0.43312757201646096,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d7_i0_92944d52",
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
          latex: "\\frac{-13}{-2}+(-8)",
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
      correctAnswers: ["-3/2"],
      difficulty: 0.4603513770180437,
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
        difficulty: 0.4603513770180437,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d7_i1_93944ee5",
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
          latex: "\\frac{-25}{7}+4",
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
      correctAnswers: ["3/7"],
      difficulty: 0.6448853615520282,
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
        difficulty: 0.6448853615520282,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d8_i0_678974a3",
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
          latex: "\\frac{-19}{-2}+(-9)",
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
      correctAnswers: ["1/2"],
      difficulty: 0.5674139051332034,
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
        difficulty: 0.5674139051332034,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d8_i1_66897310",
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
          latex: "\\frac{-26}{6}+4",
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
      difficulty: 0.6588319088319089,
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
        difficulty: 0.6588319088319089,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d9_i0_49800ee4",
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
          latex: "\\frac{-33}{-6}+(-6)",
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
      difficulty: 0.7443883277216612,
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
        difficulty: 0.7443883277216612,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d9_i1_4a801077",
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
          latex: "\\frac{-26}{-2}+(-12)",
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
      difficulty: 0.6493352326685661,
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
        difficulty: 0.6493352326685661,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d10_i0_7a3756f0",
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
          latex: "\\frac{-9}{-6}+(-3)",
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
      correctAnswers: ["-3/2"],
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T2_DIV_PLUS_INT_d10_i1_7b375883",
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
          latex: "\\frac{-6}{9}+(-1)",
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
      correctAnswers: ["-5/3"],
      difficulty: 0.38511659807956106,
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
        difficulty: 0.38511659807956106,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d0_i0_5ba7f591",
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
          latex: "-\\left(-19-4\\right)",
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
      correctAnswers: ["23"],
      difficulty: 0.41975308641975306,
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
        difficulty: 0.41975308641975306,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d0_i1_5aa7f3fe",
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
          latex: "-\\left(-13-4\\right)",
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
      correctAnswers: ["17"],
      difficulty: 0.34567901234567905,
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
        difficulty: 0.34567901234567905,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d1_i0_b76af932",
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
          latex: "-\\left(7-4\\right)",
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
      difficulty: 0.4832451499118166,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: [
        "DISTRIBUTE_NEGATIVE_OVER_PARENS",
        "SUBTRACTION_SIGN_ERROR",
      ],
      seeds: {
        difficulty: 0.4832451499118166,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d1_i1_b86afac5",
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
          latex: "-\\left(-20-4\\right)",
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
      correctAnswers: ["24"],
      difficulty: 0.43209876543209885,
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
        difficulty: 0.43209876543209885,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d2_i0_a4bc33ff",
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
          latex: "-\\left(-3-(-13)\\right)",
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
      correctAnswers: ["-10"],
      difficulty: 0.4311490978157645,
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
        difficulty: 0.4311490978157645,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d2_i1_a3bc326c",
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
          latex: "-\\left(-1-(-2)\\right)",
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
      difficulty: 0.43209876543209874,
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
        difficulty: 0.43209876543209874,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d3_i0_e6b36560",
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
          latex: "-\\left(5-(-20)\\right)",
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
      correctAnswers: ["-25"],
      difficulty: 0.43209876543209885,
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
        difficulty: 0.43209876543209885,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d3_i1_e7b366f3",
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
          latex: "-\\left(9-15\\right)",
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
      correctAnswers: ["6"],
      difficulty: 0.5925925925925927,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: [
        "DISTRIBUTE_NEGATIVE_OVER_PARENS",
        "SUBTRACTION_SIGN_ERROR",
      ],
      seeds: {
        difficulty: 0.5925925925925927,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d4_i0_d18865dd",
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
      difficulty: 0.54320987654321,
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
        difficulty: 0.54320987654321,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d4_i1_d088644a",
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
      difficulty: 0.5679012345679013,
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
        difficulty: 0.5679012345679013,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d5_i0_010c587e",
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
          latex: "-\\left(6-7\\right)",
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
      difficulty: 0.5890652557319225,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: [
        "DISTRIBUTE_NEGATIVE_OVER_PARENS",
        "SUBTRACTION_SIGN_ERROR",
      ],
      seeds: {
        difficulty: 0.5890652557319225,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d5_i1_020c5a11",
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
          latex: "-\\left(-1-(-20)\\right)",
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
      correctAnswers: ["-19"],
      difficulty: 0.4506172839506174,
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
        difficulty: 0.4506172839506174,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d6_i0_1a9ca44b",
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
          latex: "-\\left(-9-(-7)\\right)",
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
      difficulty: 0.5843621399176955,
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
        difficulty: 0.5843621399176955,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d6_i1_199ca2b8",
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
          latex: "-\\left(-11-(-12)\\right)",
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
      difficulty: 0.6728395061728395,
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
        difficulty: 0.6728395061728395,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d7_i0_5c93d5ac",
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
          latex: "-\\left(12-5\\right)",
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
      correctAnswers: ["-7"],
      difficulty: 0.4876543209876544,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: [
        "DISTRIBUTE_NEGATIVE_OVER_PARENS",
        "SUBTRACTION_SIGN_ERROR",
      ],
      seeds: {
        difficulty: 0.4876543209876544,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d7_i1_5d93d73f",
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
          latex: "-\\left(7-8\\right)",
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
      difficulty: 0.6080246913580247,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: [
        "DISTRIBUTE_NEGATIVE_OVER_PARENS",
        "SUBTRACTION_SIGN_ERROR",
      ],
      seeds: {
        difficulty: 0.6080246913580247,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d8_i0_32e251c9",
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
      difficulty: 0.5562053281351527,
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
        difficulty: 0.5562053281351527,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d8_i1_31e25036",
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
          latex: "-\\left(-17-(-18)\\right)",
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
      difficulty: 0.757201646090535,
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
        difficulty: 0.757201646090535,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d9_i0_136d557d",
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
          latex: "-\\left(-4-(-3)\\right)",
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
      difficulty: 0.5246913580246914,
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
        difficulty: 0.5246913580246914,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d9_i1_106d50c4",
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
          latex: "-\\left(17-4\\right)",
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
      correctAnswers: ["-13"],
      difficulty: 0.4822076978939725,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: [
        "DISTRIBUTE_NEGATIVE_OVER_PARENS",
        "SUBTRACTION_SIGN_ERROR",
      ],
      seeds: {
        difficulty: 0.4822076978939725,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d10_i0_fbe9bd52",
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
          latex: "-\\left(-12-(-13)\\right)",
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
      difficulty: 0.687559354226021,
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
        difficulty: 0.687559354226021,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_SUB_d10_i1_fce9bee5",
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
          latex: "-\\left(2-(-20)\\right)",
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
      correctAnswers: ["-22"],
      difficulty: 0.43209876543209885,
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
        difficulty: 0.43209876543209885,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d0_i0_40f4b4bc",
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
          latex: "-\\left(-14+(-13)\\right)",
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
      correctAnswers: ["27"],
      difficulty: 0.3580246913580248,
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
        difficulty: 0.3580246913580248,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d0_i1_41f4b64f",
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
          latex: "-\\left(-9+(-4)\\right)",
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
      correctAnswers: ["13"],
      difficulty: 0.29629629629629634,
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
        difficulty: 0.29629629629629634,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d1_i0_b8aa561b",
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
          latex: "-\\left(3+10\\right)",
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
      correctAnswers: ["-13"],
      difficulty: 0.308641975308642,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:+",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.308641975308642,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d1_i1_b7aa5488",
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
          latex: "-\\left(-5+(-3)\\right)",
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
      correctAnswers: ["8"],
      difficulty: 0.24691358024691362,
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
        difficulty: 0.24691358024691362,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d2_i0_656e010e",
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
          latex: "-\\left(-17+3\\right)",
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
      correctAnswers: ["14"],
      difficulty: 0.46042120551924476,
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
        difficulty: 0.46042120551924476,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d2_i1_666e02a1",
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
          latex: "-\\left(-5+7\\right)",
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
      correctAnswers: ["-2"],
      difficulty: 0.5361552028218695,
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
        difficulty: 0.5361552028218695,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d3_i0_c357d02d",
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
          latex: "-\\left(-15+5\\right)",
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
      correctAnswers: ["10"],
      difficulty: 0.49382716049382724,
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
        difficulty: 0.49382716049382724,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d3_i1_c257ce9a",
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
          latex: "-\\left(-7+19\\right)",
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
      difficulty: 0.5562053281351527,
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
        difficulty: 0.5562053281351527,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d4_i0_cb144470",
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
          latex: "-\\left(-10+4\\right)",
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
      correctAnswers: ["6"],
      difficulty: 0.45679012345679015,
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
        difficulty: 0.45679012345679015,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d4_i1_cc144603",
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
          latex: "-\\left(9+(-10)\\right)",
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
      difficulty: 0.6419753086419754,
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
        difficulty: 0.6419753086419754,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d5_i0_42c9e5cf",
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
          latex: "-\\left(2+(-2)\\right)",
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
      difficulty: 0.617283950617284,
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
        difficulty: 0.617283950617284,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d5_i1_41c9e43c",
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
          latex: "-\\left(8+(-8)\\right)",
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
      difficulty: 0.6543209876543211,
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
        difficulty: 0.6543209876543211,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d6_i0_1bcca1c2",
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
          latex: "-\\left(-5+5\\right)",
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
      difficulty: 0.617283950617284,
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
        difficulty: 0.617283950617284,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d6_i1_1ccca355",
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
          latex: "-\\left(-1+1\\right)",
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
      difficulty: 0.617283950617284,
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
        difficulty: 0.617283950617284,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d7_i0_79b670e1",
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
          latex: "-\\left(-10+10\\right)",
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
      difficulty: 0.6790123456790125,
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
        difficulty: 0.6790123456790125,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d7_i1_78b66f4e",
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
          latex: "-\\left(-14+6\\right)",
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
      correctAnswers: ["8"],
      difficulty: 0.5167548500881834,
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
        difficulty: 0.5167548500881834,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d8_i0_8e2c9ee7",
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
          latex: "-\\left(0+19\\right)",
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
      correctAnswers: ["-19"],
      difficulty: 0.41975308641975306,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:+",
        "has:zero",
        "tier:3",
        "template:minus_parentheses",
        "signed",
      ],
      misconceptions: ["DISTRIBUTE_NEGATIVE_OVER_PARENS", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.41975308641975306,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d8_i1_902ca20d",
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
      difficulty: 0.617283950617284,
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
        difficulty: 0.617283950617284,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d9_i0_2a6dd253",
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
          latex: "-\\left(-2+18\\right)",
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
      difficulty: 0.44855967078189307,
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
        difficulty: 0.44855967078189307,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d9_i1_296dd0c0",
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
          latex: "-\\left(18+(-18)\\right)",
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
      difficulty: 0.7777777777777778,
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
        difficulty: 0.7777777777777778,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d10_i0_ace3d18d",
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
          latex: "-\\left(-19+19\\right)",
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
      difficulty: 0.7901234567901234,
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
        difficulty: 0.7901234567901234,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEGATE_PARENS_ADD_d10_i1_abe3cffa",
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
          latex: "-\\left(16+(-17)\\right)",
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
      difficulty: 0.7436456063907044,
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
        difficulty: 0.7436456063907044,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d0_i0_e91c69a7",
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
          latex: "4\\times(-11+(-2))",
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
      correctAnswers: ["-52"],
      difficulty: 0.09567901234567902,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.09567901234567902,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d0_i1_e81c6814",
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
          latex: "2\\times(-1+2)",
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
      difficulty: 0.021604938271604937,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.021604938271604937,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d1_i0_7166c848",
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
          latex: "1\\times(4+(-3))",
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
      difficulty: 0.2993827160493827,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.2993827160493827,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d1_i1_7266c9db",
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
          latex: "2\\times(-3+2)",
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
      difficulty: 0.14506172839506173,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.14506172839506173,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d2_i0_fecb8dd9",
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
          latex: "-2\\times(-1+1)",
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
      difficulty: 0.39197530864197533,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d2_i1_fdcb8c46",
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
          latex: "-8\\times(-1+1)",
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
      difficulty: 0.42901234567901236,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.42901234567901236,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d3_i0_de568ffa",
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
      difficulty: 0.39197530864197533,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d3_i1_df56918d",
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
          latex: "-1\\times(-4+4)",
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
      difficulty: 0.39197530864197533,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d4_i0_3efca793",
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
          latex: "4\\times(-6+6)",
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
      difficulty: 0.404320987654321,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.404320987654321,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d4_i1_3dfca600",
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
      difficulty: 0.39197530864197533,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d5_i0_e7473894",
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
          latex: "-7\\times(-1+1)",
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
      difficulty: 0.41666666666666674,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d5_i1_e8473a27",
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
          latex: "5\\times(11+(-10))",
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
      difficulty: 0.297699214365881,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.297699214365881,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d6_i0_75e932a5",
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
          latex: "-5\\times(7+(-7))",
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
      difficulty: 0.41666666666666674,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d6_i1_74e93112",
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
          latex: "-7\\times(-6+6)",
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
      difficulty: 0.41666666666666674,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d7_i0_3436cde6",
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
          latex: "-3\\times(-7+8)",
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
      difficulty: 0.29012345679012347,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.29012345679012347,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d7_i1_3536cf79",
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
          latex: "-2\\times(11+(-12))",
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
      difficulty: 0.41666666666666674,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d8_i0_8397cc0f",
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
          latex: "-5\\times(-10+10)",
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
      difficulty: 0.4537037037037037,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.4537037037037037,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d8_i1_8297ca7c",
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
          latex: "-8\\times(-8+12)",
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
      correctAnswers: ["-32"],
      difficulty: 0.10802469135802469,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.10802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d9_i0_dfa319b0",
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
          latex: "-6\\times(0+(-11))",
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
      correctAnswers: ["66"],
      difficulty: 0.09567901234567902,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:+",
        "op:*",
        "has:negative",
        "has:zero",
        "tier:3",
        "template:distributive",
        "signed",
      ],
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.09567901234567902,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d9_i1_e0a31b43",
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
          latex: "7\\times(9+(-8))",
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
      difficulty: 0.15329218106995887,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.15329218106995887,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d10_i0_0093d524",
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
          latex: "-6\\times(-12+12)",
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
      difficulty: 0.478395061728395,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.478395061728395,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_B_PLUS_C_d10_i1_0193d6b7",
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
          latex: "-8\\times(1+(-1))",
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
      difficulty: 0.42901234567901236,
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
      misconceptions: [
        "DISTRIBUTIVE_ERROR",
        "SIGN_ERROR",
        "ORDER_OF_OPERATIONS",
      ],
      seeds: {
        difficulty: 0.42901234567901236,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d0_i0_d3754d65",
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
          latex: "-6\\times(-6-1)",
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
      correctAnswers: ["42"],
      difficulty: 0.02160493827160494,
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
        difficulty: 0.02160493827160494,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d0_i1_d2754bd2",
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
          latex: "-6\\times(-6-0)",
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
      correctAnswers: ["36"],
      difficulty: 0.02160493827160494,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "op:*",
        "has:negative",
        "has:zero",
        "tier:3",
        "template:distributive",
        "signed",
      ],
      misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.02160493827160494,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d1_i0_91c2e8a6",
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
          latex: "-2\\times(-2-(-4))",
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
      correctAnswers: ["-4"],
      difficulty: 0.25617283950617287,
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
        difficulty: 0.25617283950617287,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d1_i1_92c2ea39",
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
          latex: "-3\\times(-3-(-1))",
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
      correctAnswers: ["6"],
      difficulty: 0.25617283950617287,
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
        difficulty: 0.25617283950617287,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d2_i0_e2148853",
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
          latex: "-7\\times(-7-(-5))",
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
      correctAnswers: ["14"],
      difficulty: 0.2808641975308642,
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
        difficulty: 0.2808641975308642,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d2_i1_e4148b79",
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
          latex: "3\\times(3-(-11))",
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
      correctAnswers: ["42"],
      difficulty: 0.33024691358024694,
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
        difficulty: 0.33024691358024694,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d3_i0_44d35354",
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
          latex: "7\\times(7-7)",
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
      difficulty: 0.404320987654321,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "op:*",
        "tier:3",
        "template:distributive",
        "signed",
      ],
      misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.404320987654321,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d3_i1_45d354e7",
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
          latex: "2\\times(2-(-12))",
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
      correctAnswers: ["28"],
      difficulty: 0.34259259259259256,
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
        difficulty: 0.34259259259259256,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d4_i0_8896b999",
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
          latex: "1\\times(1-1)",
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
      difficulty: 0.37962962962962965,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "op:*",
        "tier:3",
        "template:distributive",
        "signed",
      ],
      misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.37962962962962965,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d4_i1_8796b806",
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
          latex: "-3\\times(-3-(-3))",
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
      difficulty: 0.6265432098765433,
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
        difficulty: 0.6265432098765433,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d5_i0_6921bd4d",
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
      difficulty: 0.4413580246913581,
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
        difficulty: 0.4413580246913581,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d5_i1_6621b894",
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
          latex: "-2\\times(-2-(-3))",
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
      difficulty: 0.37962962962962965,
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
        difficulty: 0.37962962962962965,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d6_i0_72e79567",
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
      difficulty: 0.37962962962962965,
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
        difficulty: 0.37962962962962965,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d6_i1_71e793d4",
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
          latex: "5\\times(5-(-5))",
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
      correctAnswers: ["50"],
      difficulty: 0.25617283950617287,
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
        difficulty: 0.25617283950617287,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d7_i0_fe31f8c1",
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
          latex: "5\\times(5-(-11))",
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
      correctAnswers: ["80"],
      difficulty: 0.33024691358024694,
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
        difficulty: 0.33024691358024694,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d7_i1_ff31fa54",
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
          latex: "4\\times(4-(-6))",
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
      correctAnswers: ["40"],
      difficulty: 0.26851851851851855,
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
        difficulty: 0.26851851851851855,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d8_i0_7afe862d",
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
          latex: "6\\times(6-6)",
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
      difficulty: 0.39197530864197533,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "op:*",
        "tier:3",
        "template:distributive",
        "signed",
      ],
      misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d8_i1_78fe8307",
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
          latex: "2\\times(2-2)",
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
      difficulty: 0.37962962962962965,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "op:*",
        "tier:3",
        "template:distributive",
        "signed",
      ],
      misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.37962962962962965,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d9_i0_1b14b3e8",
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
          latex: "-5\\times(-5-(-9))",
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
      correctAnswers: ["-20"],
      difficulty: 0.30555555555555564,
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
        difficulty: 0.30555555555555564,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d9_i1_1c14b57b",
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
          latex: "5\\times(5-5)",
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
      difficulty: 0.37962962962962965,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:-",
        "op:*",
        "tier:3",
        "template:distributive",
        "signed",
      ],
      misconceptions: ["DISTRIBUTIVE_ERROR", "SIGN_ERROR"],
      seeds: {
        difficulty: 0.37962962962962965,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d10_i0_19d4acbe",
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
          latex: "-8\\times(-8-(-8))",
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
      difficulty: 0.6635802469135803,
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
        difficulty: 0.6635802469135803,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_A_A_MINUS_B_d10_i1_1ad4ae51",
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
          latex: "-3\\times(-3-(-12))",
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
      correctAnswers: ["-27"],
      difficulty: 0.34259259259259256,
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
        difficulty: 0.34259259259259256,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d0_i0_07d0e358",
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
          latex: "-2\\times(3+(-7))",
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
      difficulty: 0.04629629629629631,
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
        difficulty: 0.04629629629629631,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d0_i1_08d0e4eb",
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
          latex: "-3\\times(10+(-8))",
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
      difficulty: 0.2314814814814815,
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
        difficulty: 0.2314814814814815,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d1_i0_c5d9b1f7",
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
          latex: "-3\\times(-1+(-8))",
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
      correctAnswers: ["27"],
      difficulty: 0.05864197530864198,
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
        difficulty: 0.05864197530864198,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d1_i1_c4d9b064",
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
          latex: "-3\\times(-1+(-4))",
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
      correctAnswers: ["15"],
      difficulty: 0.021604938271604937,
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
        difficulty: 0.021604938271604937,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d2_i0_8ed4c74a",
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
          latex: "-5\\times(-5+5)",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d2_i1_8fd4c8dd",
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
          latex: "-5\\times(3+(-3))",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d3_i0_dcc60aa9",
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
          latex: "-4\\times(-4+4)",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d3_i1_dbc60916",
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
          latex: "-2\\times(7+(-7))",
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
      difficulty: 0.41666666666666674,
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
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d4_i0_517242a4",
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
          latex: "-2\\times(-12+11)",
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
      difficulty: 0.41666666666666674,
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
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d4_i1_52724437",
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
      difficulty: 0.404320987654321,
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
        difficulty: 0.404320987654321,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d5_i0_6f7ba863",
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
          latex: "-2\\times(1+(-1))",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d5_i1_6e7ba6d0",
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
          latex: "-2\\times(-2+2)",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d6_i0_65f30336",
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
          latex: "-5\\times(-6+6)",
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
      difficulty: 0.404320987654321,
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
        difficulty: 0.404320987654321,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d6_i1_66f304c9",
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
          latex: "-6\\times(-12+(-5))",
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
      correctAnswers: ["102"],
      difficulty: 0.10802469135802469,
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
        difficulty: 0.10802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d7_i0_266769f5",
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
          latex: "-5\\times(-4+4)",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d7_i1_25676862",
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
          latex: "-6\\times(-5+5)",
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
      difficulty: 0.404320987654321,
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
        difficulty: 0.404320987654321,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d8_i0_760d34c0",
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
          latex: "-6\\times(-7+7)",
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
      difficulty: 0.41666666666666674,
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
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d8_i1_770d3653",
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
          latex: "-7\\times(0+0)",
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
      difficulty: 0.41666666666666674,
      tags: [
        "topic:signed_numbers",
        "vars:3",
        "op:+",
        "op:*",
        "has:zero",
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
        difficulty: 0.41666666666666674,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d9_i0_3416035f",
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
          latex: "-4\\times(11+(-11))",
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
      difficulty: 0.4660493827160494,
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
        difficulty: 0.4660493827160494,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d9_i1_36160685",
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
          latex: "-2\\times(11+(-11))",
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
      difficulty: 0.4660493827160494,
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
        difficulty: 0.4660493827160494,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d10_i0_f99cc30b",
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
          latex: "-3\\times(3+(-3))",
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
      difficulty: 0.39197530864197533,
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
        difficulty: 0.39197530864197533,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_DISTRIB_NEG_A_B_PLUS_C_d10_i1_f89cc178",
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
          latex: "-4\\times(10+(-11))",
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
      difficulty: 0.33136924803591467,
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
        difficulty: 0.33136924803591467,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d0_i0_702db370",
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
          latex: "--11\\times-1",
          display: true,
        },
      ],
      correctAnswers: ["-11"],
      difficulty: 0.07407407407407407,
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
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d0_i1_712db503",
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
          latex: "--5\\times-8",
          display: true,
        },
      ],
      correctAnswers: ["-40"],
      difficulty: 0.037037037037037035,
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
        difficulty: 0.037037037037037035,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d1_i0_e7e354cf",
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
          latex: "--7\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["-84"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d1_i1_e6e3533c",
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
          latex: "--8\\times2",
          display: true,
        },
      ],
      correctAnswers: ["16"],
      difficulty: 0.037037037037037035,
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
        difficulty: 0.037037037037037035,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d2_i0_c0e610c2",
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
          latex: "--3\\times12",
          display: true,
        },
      ],
      correctAnswers: ["36"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d2_i1_c1e61255",
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
          latex: "--2\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["-24"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d3_i0_1ecfdfe1",
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
          latex: "--5\\times12",
          display: true,
        },
      ],
      correctAnswers: ["60"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d3_i1_1dcfde4e",
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
          latex: "--6\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["-72"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d4_i0_e60e23bc",
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
          latex: "--3\\times-12",
          display: true,
        },
      ],
      correctAnswers: ["-36"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d4_i1_e70e254f",
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
          latex: "--4\\times-11",
          display: true,
        },
      ],
      correctAnswers: ["-44"],
      difficulty: 0.07407407407407407,
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
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d5_i0_5dc3c51b",
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
          latex: "--2\\times7",
          display: true,
        },
      ],
      correctAnswers: ["14"],
      difficulty: 0.024691358024691364,
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
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d5_i1_5fc3c841",
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
          latex: "-12\\times6",
          display: true,
        },
      ],
      correctAnswers: ["-72"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d6_i0_0b8771a1",
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
          latex: "--5\\times11",
          display: true,
        },
      ],
      correctAnswers: ["55"],
      difficulty: 0.07407407407407407,
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
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d6_i1_08876ce8",
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
          latex: "--6\\times11",
          display: true,
        },
      ],
      correctAnswers: ["66"],
      difficulty: 0.07407407407407407,
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
        difficulty: 0.07407407407407407,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d7_i0_68713f2d",
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
      difficulty: 0.061728395061728406,
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
        difficulty: 0.061728395061728406,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d7_i1_65713a74",
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
          latex: "--11\\times12",
          display: true,
        },
      ],
      correctAnswers: ["132"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d8_i0_eaa4b02e",
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
          latex: "-8\\times9",
          display: true,
        },
      ],
      correctAnswers: ["-72"],
      difficulty: 0.04938271604938273,
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
        difficulty: 0.04938271604938273,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d8_i1_eca4b354",
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
          latex: "--9\\times-10",
          display: true,
        },
      ],
      correctAnswers: ["-90"],
      difficulty: 0.061728395061728406,
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
        difficulty: 0.061728395061728406,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d9_i0_605a4e67",
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
          latex: "--10\\times10",
          display: true,
        },
      ],
      correctAnswers: ["100"],
      difficulty: 0.061728395061728406,
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
        difficulty: 0.061728395061728406,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d9_i1_5f5a4cd4",
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
          latex: "-6\\times12",
          display: true,
        },
      ],
      correctAnswers: ["-72"],
      difficulty: 0.08641975308641975,
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
        difficulty: 0.08641975308641975,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d10_i0_768c1139",
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
          latex: "--5\\times-10",
          display: true,
        },
      ],
      correctAnswers: ["-50"],
      difficulty: 0.061728395061728406,
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
        difficulty: 0.061728395061728406,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_T3_NEG_A_TIMES_B_d10_i1_748c0e13",
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
          latex: "--6\\times-8",
          display: true,
        },
      ],
      correctAnswers: ["-48"],
      difficulty: 0.037037037037037035,
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
        difficulty: 0.037037037037037035,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d0_i0_052151ff",
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
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d0_i1_0421506c",
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
          latex: "5^{2}",
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
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d1_i0_47188360",
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
      difficulty: 0.19753086419753088,
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
        difficulty: 0.19753086419753088,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d1_i1_481884f3",
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
          latex: "-2^{2}",
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
      correctAnswers: ["-4"],
      difficulty: 0.012345679012345682,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d2_i0_bb0d11fe",
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
          latex: "-3^{2}",
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
      correctAnswers: ["-9"],
      difficulty: 0.012345679012345682,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d2_i1_ba0d106b",
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
      correctAnswers: ["-25"],
      difficulty: 0.012345679012345682,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d3_i0_17d01732",
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
          latex: "1^{3}",
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
      difficulty: 0.25925925925925924,
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
        difficulty: 0.25925925925925924,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d3_i1_15d0140c",
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
          latex: "7^{2}",
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
      correctAnswers: ["49"],
      difficulty: 0.03703703703703705,
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
        difficulty: 0.03703703703703705,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d4_i0_7b01c24b",
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
          latex: "-4^{2}",
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
      correctAnswers: ["-16"],
      difficulty: 0.012345679012345682,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d4_i1_7a01c0b8",
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
          latex: "-7^{2}",
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
      difficulty: 0.03703703703703705,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.03703703703703705,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d5_i0_bef8f6d2",
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
          latex: "-1^{3}",
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
      correctAnswers: ["-1"],
      difficulty: 0.25925925925925924,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.25925925925925924,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d5_i1_bff8f865",
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
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d6_i0_2ded7d91",
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
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d6_i1_7fe4660e",
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
          latex: "-1^{2}",
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
      correctAnswers: ["-1"],
      difficulty: 0.19753086419753088,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.19753086419753088,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d7_i0_62717811",
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
          latex: "4^{2}",
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
      correctAnswers: ["16"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d7_i1_19a01bf3",
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
          latex: "-4^{3}",
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
      correctAnswers: ["-64"],
      difficulty: 0.012345679012345682,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d8_i0_90a7c438",
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
          latex: "-3^{3}",
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
      correctAnswers: ["-27"],
      difficulty: 0.012345679012345682,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d8_i1_92a7c75e",
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
      difficulty: 0.012345679012345682,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d9_i0_d79efd78",
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
      correctAnswers: ["-36"],
      difficulty: 0.024691358024691364,
      tags: [
        "topic:signed_numbers",
        "vars:2",
        "op:^",
        "has:negative",
        "tier:2",
        "template:power",
        "signed",
      ],
      misconceptions: ["POWER_RULES", "NEGATIVE_BASE_PARITY"],
      seeds: {
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d9_i1_d09ef273",
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
          latex: "4^{3}",
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
      correctAnswers: ["64"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d10_i0_d9b4a925",
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
          latex: "5^{3}",
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
      correctAnswers: ["125"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_A_TO_N_d10_i1_5a60fb6b",
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
          latex: "6^{3}",
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
      correctAnswers: ["216"],
      difficulty: 0.024691358024691364,
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
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d0_i0_2422c189",
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
          latex: "-8^{2}",
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
      correctAnswers: ["-64"],
      difficulty: 0.04938271604938272,
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
        difficulty: 0.04938271604938272,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d0_i1_ac1b48dc",
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
          latex: "-2^{3}",
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
      correctAnswers: ["-8"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d1_i0_0b2c8afe",
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
          latex: "-6^{3}",
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
      difficulty: 0.024691358024691364,
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
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d1_i1_0a2c896b",
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
          latex: "-8^{3}",
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
      correctAnswers: ["-512"],
      difficulty: 0.04938271604938272,
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
        difficulty: 0.04938271604938272,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d2_i0_ea38d636",
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
      difficulty: 0.03703703703703705,
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
        difficulty: 0.03703703703703705,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d2_i1_996f84bf",
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
          latex: "-2^{2}",
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
      correctAnswers: ["-4"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d3_i0_fc3cbc2b",
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
          latex: "-1^{3}",
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
      correctAnswers: ["-1"],
      difficulty: 0.25925925925925924,
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
        difficulty: 0.25925925925925924,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d3_i1_fb3cba98",
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
      correctAnswers: ["-36"],
      difficulty: 0.024691358024691364,
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
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d4_i0_c5a2531a",
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
          latex: "-3^{3}",
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
      correctAnswers: ["-27"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d4_i1_c6a254ad",
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
          latex: "-1^{3}",
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
      correctAnswers: ["-1"],
      difficulty: 0.25925925925925924,
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
        difficulty: 0.25925925925925924,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d5_i0_841b9679",
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
          latex: "-1^{2}",
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
      correctAnswers: ["-1"],
      difficulty: 0.19753086419753088,
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
        difficulty: 0.19753086419753088,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d5_i1_831b94e6",
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
      correctAnswers: ["-25"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d6_i0_d863cb40",
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
          latex: "-4^{2}",
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
      correctAnswers: ["-16"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d6_i1_d963ccd3",
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
      correctAnswers: ["-25"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d7_i0_0b3b6a4f",
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
      correctAnswers: ["-25"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d7_i1_0a3b68bc",
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
          latex: "-4^{3}",
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
      correctAnswers: ["-64"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d8_i0_258d9e2e",
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
          latex: "-3^{2}",
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
      correctAnswers: ["-9"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d8_i1_268d9fc1",
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
          latex: "-2^{2}",
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
      correctAnswers: ["-4"],
      difficulty: 0.012345679012345682,
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
        difficulty: 0.012345679012345682,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d9_i0_23796c9d",
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
      correctAnswers: ["-36"],
      difficulty: 0.024691358024691364,
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
        difficulty: 0.024691358024691364,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d9_i1_22796b0a",
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
          latex: "-7^{2}",
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
      difficulty: 0.03703703703703705,
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
        difficulty: 0.03703703703703705,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d10_i0_fded85fb",
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
          latex: "-8^{3}",
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
      correctAnswers: ["-512"],
      difficulty: 0.04938271604938272,
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
        difficulty: 0.04938271604938272,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_PARENS_NEG_A_TO_N_d10_i1_fced8468",
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
      difficulty: 0.03703703703703705,
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
        difficulty: 0.03703703703703705,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d0_i0_22955845",
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
          latex: "-\\left(4^{2}\\right)",
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
      correctAnswers: ["-16"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d0_i1_219556b2",
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
      difficulty: 0.28395061728395066,
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
        difficulty: 0.28395061728395066,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d1_i0_6220f186",
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
          latex: "-\\left(8^{3}\\right)",
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
      correctAnswers: ["-512"],
      difficulty: 0.29629629629629634,
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
        difficulty: 0.29629629629629634,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d1_i1_6320f319",
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
      difficulty: 0.271604938271605,
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
        difficulty: 0.271604938271605,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d2_i0_6ba996b3",
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
          latex: "-\\left(3^{2}\\right)",
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
      correctAnswers: ["-9"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d2_i1_6aa99520",
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
          latex: "-\\left(2^{2}\\right)",
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
      correctAnswers: ["-4"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d3_i0_13f427b4",
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
          latex: "-\\left(3^{3}\\right)",
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
      correctAnswers: ["-27"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d3_i1_16f42c6d",
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
          latex: "-\\left(8^{2}\\right)",
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
      correctAnswers: ["-64"],
      difficulty: 0.29629629629629634,
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
        difficulty: 0.29629629629629634,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d4_i0_92683166",
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
          latex: "-\\left(1^{3}\\right)",
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
      correctAnswers: ["-1"],
      difficulty: 0.5061728395061729,
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
        difficulty: 0.5061728395061729,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d4_i1_90682e40",
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
          latex: "-\\left(1^{2}\\right)",
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
      correctAnswers: ["-1"],
      difficulty: 0.4444444444444445,
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
        difficulty: 0.4444444444444445,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d5_i0_ecf3f528",
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
          latex: "-\\left(5^{2}\\right)",
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
      correctAnswers: ["-25"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d5_i1_1e1c210f",
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
          latex: "-\\left(5^{3}\\right)",
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
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d6_i0_41086834",
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
      difficulty: 0.271604938271605,
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
        difficulty: 0.271604938271605,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d6_i1_3f08650e",
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
          latex: "-\\left(2^{3}\\right)",
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
      correctAnswers: ["-8"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d7_i0_b4061821",
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
          latex: "-\\left(4^{3}\\right)",
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
      correctAnswers: ["-64"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d7_i1_df0749aa",
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
      difficulty: 0.28395061728395066,
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
        difficulty: 0.28395061728395066,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d8_i0_5a070929",
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
      difficulty: 0.28395061728395066,
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
        difficulty: 0.28395061728395066,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d8_i1_59070796",
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
          latex: "-\\left(4^{2}\\right)",
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
      correctAnswers: ["-16"],
      difficulty: 0.2592592592592593,
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
        difficulty: 0.2592592592592593,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d9_i0_c675d00a",
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
      difficulty: 0.28395061728395066,
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
        difficulty: 0.28395061728395066,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d9_i1_c775d19d",
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
      difficulty: 0.28395061728395066,
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
        difficulty: 0.28395061728395066,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d10_i0_f573fb3a",
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
      difficulty: 0.28395061728395066,
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
        difficulty: 0.28395061728395066,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_POW_LEADING_MINUS_A_TO_N_d10_i1_f673fccd",
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
      difficulty: 0.271604938271605,
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
        difficulty: 0.271604938271605,
      },
      input: {
        allowMinus: true,
        allowDecimal: false,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d0_i0_d5e072e5",
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
          latex: "\\left(\\frac{6}{9}\\right)^{2}",
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
      correctAnswers: ["4/9"],
      difficulty: 0.3127572016460906,
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
        difficulty: 0.3127572016460906,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d0_i1_d4e07152",
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
          latex: "\\left(-\\frac{8}{12}\\right)^{2}",
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
      correctAnswers: ["4/9"],
      difficulty: 0.3127572016460906,
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
        difficulty: 0.3127572016460906,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d1_i0_942e0e26",
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
          latex: "\\left(\\frac{6}{30}\\right)^{3}",
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
      correctAnswers: ["1/125"],
      difficulty: 0.49283950617283956,
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
        difficulty: 0.49283950617283956,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d1_i1_952e0fb9",
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
          latex: "\\left(-\\frac{18}{30}\\right)^{3}",
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
      difficulty: 0.4671604938271606,
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
        difficulty: 0.4671604938271606,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d2_i0_e47fadd3",
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
          latex: "\\left(-\\frac{6}{8}\\right)^{2}",
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
      correctAnswers: ["9/16"],
      difficulty: 0.3402777777777778,
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
        difficulty: 0.3402777777777778,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d2_i1_e37fac40",
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
          latex: "\\left(-\\frac{2}{9}\\right)^{2}",
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
      correctAnswers: ["4/81"],
      difficulty: 0.6822130772748056,
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
        difficulty: 0.6822130772748056,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d3_i0_473e78d4",
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
          latex: "\\left(\\frac{14}{20}\\right)^{2}",
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
      correctAnswers: ["49/100"],
      difficulty: 0.65,
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
        difficulty: 0.65,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d3_i1_483e7a67",
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
          latex: "\\left(-\\frac{24}{27}\\right)^{2}",
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
      correctAnswers: ["64/81"],
      difficulty: 0.5450388660265204,
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
        difficulty: 0.5450388660265204,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d4_i0_8b01df19",
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
          latex: "\\left(-\\frac{3}{30}\\right)^{2}",
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
      correctAnswers: ["1/100"],
      difficulty: 0.7388888888888889,
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
        difficulty: 0.7388888888888889,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d4_i1_8901dbf3",
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
      difficulty: 0.7406172839506173,
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
        difficulty: 0.7406172839506173,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d5_i0_6b8ce2cd",
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
          latex: "\\left(\\frac{2}{20}\\right)^{2}",
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
      correctAnswers: ["1/100"],
      difficulty: 0.7388888888888889,
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
        difficulty: 0.7388888888888889,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d5_i1_688cde14",
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
          latex: "\\left(-\\frac{6}{20}\\right)^{2}",
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
      correctAnswers: ["9/100"],
      difficulty: 0.7240740740740742,
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
        difficulty: 0.7240740740740742,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d6_i0_7552bae7",
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
          latex: "\\left(-\\frac{1}{8}\\right)^{2}",
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
      correctAnswers: ["1/64"],
      difficulty: 0.6390817901234569,
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
        difficulty: 0.6390817901234569,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d6_i1_7452b954",
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
          latex: "\\left(\\frac{2}{18}\\right)^{2}",
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
      correctAnswers: ["1/81"],
      difficulty: 0.6890717878372199,
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
        difficulty: 0.6890717878372199,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d7_i0_fd9d1988",
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
          latex: "\\left(\\frac{12}{27}\\right)^{2}",
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
      correctAnswers: ["16/81"],
      difficulty: 0.6547782350251486,
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
        difficulty: 0.6547782350251486,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d7_i1_fe9d1b1b",
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
          latex: "\\left(-\\frac{4}{18}\\right)^{3}",
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
      correctAnswers: ["-8/729"],
      difficulty: 0.6900032176666837,
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
        difficulty: 0.6900032176666837,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d8_i0_7d69abad",
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
          latex: "\\left(\\frac{3}{30}\\right)^{2}",
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
      correctAnswers: ["1/100"],
      difficulty: 0.7388888888888889,
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
        difficulty: 0.7388888888888889,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d8_i1_7c69aa1a",
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
          latex: "\\left(\\frac{27}{30}\\right)^{2}",
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
      correctAnswers: ["81/100"],
      difficulty: 0.5907407407407408,
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
        difficulty: 0.5907407407407408,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d9_i0_1f7fdc8e",
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
          latex: "\\left(-\\frac{1}{9}\\right)^{2}",
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
      correctAnswers: ["1/81"],
      difficulty: 0.6890717878372199,
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
        difficulty: 0.6890717878372199,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d9_i1_207fde21",
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
          latex: "\\left(-\\frac{1}{10}\\right)^{2}",
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
      correctAnswers: ["1/100"],
      difficulty: 0.7388888888888889,
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
        difficulty: 0.7388888888888889,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d10_i0_6880b53e",
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
          latex: "\\left(\\frac{2}{20}\\right)^{3}",
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
      difficulty: 0.7406172839506173,
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
        difficulty: 0.7406172839506173,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_SIMPLE_C2_C3_d10_i1_6980b6d1",
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
      difficulty: 0.7406172839506173,
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
        difficulty: 0.7406172839506173,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d0_i0_015f66aa",
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
          latex: "-\\left(\\left(-\\frac{3}{6}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/4"],
      difficulty: 0.5802469135802469,
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
        difficulty: 0.5802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d0_i1_025f683d",
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
          latex: "-\\left(\\left(\\frac{3}{6}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/4"],
      difficulty: 0.5802469135802469,
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
        difficulty: 0.5802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d1_i0_21d46489",
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
          latex: "-\\left(\\left(-\\frac{2}{4}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/4"],
      difficulty: 0.5802469135802469,
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
        difficulty: 0.5802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d1_i1_20d462f6",
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
          latex: "-\\left(\\left(\\frac{9}{15}\\right)^{2}\\right)",
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
      difficulty: 0.6419753086419754,
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
        difficulty: 0.6419753086419754,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d2_i0_4cdf3d38",
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
          latex: "-\\left(\\left(-\\frac{14}{18}\\right)^{2}\\right)",
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
      correctAnswers: ["-49/81"],
      difficulty: 0.7736625514403291,
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
        difficulty: 0.7736625514403291,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d2_i1_4ddf3ecb",
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
          latex: "-\\left(\\left(\\frac{6}{10}\\right)^{2}\\right)",
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
      difficulty: 0.6419753086419754,
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
        difficulty: 0.6419753086419754,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d3_i0_37271cd7",
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
          latex: "-\\left(\\left(\\frac{2}{12}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/36"],
      difficulty: 0.851851851851852,
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
        difficulty: 0.851851851851852,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d3_i1_36271b44",
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
          latex: "-\\left(\\left(-\\frac{12}{24}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/4"],
      difficulty: 0.5802469135802469,
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
        difficulty: 0.5802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d4_i0_573fa496",
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
          latex: "-\\left(\\left(-\\frac{3}{10}\\right)^{2}\\right)",
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
      correctAnswers: ["-9/100"],
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
      ],
      misconceptions: [
        "LEADING_MINUS_CONFUSION",
        "POWER_OF_FRACTION",
        "PARENS_IN_POWERS",
      ],
      seeds: {
        difficulty: 1,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d4_i1_583fa629",
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
          latex: "-\\left(\\left(-\\frac{6}{15}\\right)^{2}\\right)",
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
      correctAnswers: ["-4/25"],
      difficulty: 0.7160493827160496,
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
        difficulty: 0.7160493827160496,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d5_i0_98f20955",
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
          latex: "-\\left(\\left(\\frac{15}{30}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/4"],
      difficulty: 0.5802469135802469,
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
        difficulty: 0.5802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d5_i1_96f2062f",
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
          latex: "-\\left(\\left(-\\frac{2}{3}\\right)^{2}\\right)",
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
      correctAnswers: ["-4/9"],
      difficulty: 0.5185185185185186,
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
        difficulty: 0.5185185185185186,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d6_i0_c3fce204",
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
          latex: "-\\left(\\left(-\\frac{4}{9}\\right)^{2}\\right)",
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
      correctAnswers: ["-16/81"],
      difficulty: 0.8971193415637861,
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
        difficulty: 0.8971193415637861,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d6_i1_c4fce397",
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
          latex: "-\\left(\\left(\\frac{2}{6}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/9"],
      difficulty: 0.6419753086419754,
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
        difficulty: 0.6419753086419754,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d7_i0_62057e43",
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
          latex: "-\\left(\\left(-\\frac{6}{16}\\right)^{2}\\right)",
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
      correctAnswers: ["-9/64"],
      difficulty: 0.8734567901234569,
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
        difficulty: 0.8734567901234569,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d7_i1_61057cb0",
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
          latex: "-\\left(\\left(\\frac{6}{12}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/4"],
      difficulty: 0.5802469135802469,
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
        difficulty: 0.5802469135802469,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d8_i0_a65d0bf2",
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
          latex: "-\\left(\\left(\\frac{27}{30}\\right)^{2}\\right)",
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
      difficulty: 0.7777777777777778,
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
        difficulty: 0.7777777777777778,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d8_i1_a75d0d85",
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
          latex: "-\\left(\\left(\\frac{12}{30}\\right)^{2}\\right)",
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
      correctAnswers: ["-4/25"],
      difficulty: 0.7160493827160496,
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
        difficulty: 0.7160493827160496,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d9_i0_314d5351",
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
          latex: "-\\left(\\left(-\\frac{27}{30}\\right)^{2}\\right)",
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
      difficulty: 0.7777777777777778,
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
        difficulty: 0.7777777777777778,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d9_i1_304d51be",
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
          latex: "-\\left(\\left(\\frac{9}{30}\\right)^{2}\\right)",
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
      correctAnswers: ["-9/100"],
      difficulty: 1,
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
        difficulty: 1,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d10_i0_50389877",
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
          latex: "-\\left(\\left(-\\frac{6}{8}\\right)^{2}\\right)",
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
      correctAnswers: ["-9/16"],
      difficulty: 0.5370370370370371,
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
        difficulty: 0.5370370370370371,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
    {
      id: "SN_FRAC_POW_LEADING_MINUS_SQ_d10_i1_52389b9d",
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
          latex: "-\\left(\\left(-\\frac{3}{24}\\right)^{2}\\right)",
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
      correctAnswers: ["-1/64"],
      difficulty: 0.9660493827160496,
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
        difficulty: 0.9660493827160496,
      },
      input: {
        allowMinus: true,
        allowDecimal: true,
      },
    },
  ];
