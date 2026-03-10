import type { GeneratedQuestionDefinition } from "../generator/types";

export const SIGNED_NUMBERS_GENERATED_QUESTIONS: GeneratedQuestionDefinition[] = [
  {
    id: "SN_GEN_SUB_NEG_NEG_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    promptTemplate: [
      { kind: "text", value: "חשבו:" },
      { kind: "math", latex: "-{a}-(-{b})", display: true },
    ],
    exprTemplate: "-{a}-(-{b})",
    params: {
      a: { type: "natural", min: 1, max: 20 },
      b: { type: "natural", min: 1, max: 20 },
    },
    constraints: ["a !== b"],
    tags: ["topic:signed_numbers", "template:generated_sub_neg_neg", "signed"],
    metadata: {
      difficulty: 0.22,
      subtopic: "subtraction",
      source: "generator",
    },
    input: {
      allowMinus: true,
      allowDecimal: false,
    },
  },
  {
    id: "SN_GEN_ABS_DIFF_001",
    topicId: "SIGNED_NUMBERS",
    kind: "generated",
    promptTemplate: [
      { kind: "text", value: "חשבו:" },
      { kind: "math", latex: "|{a}-{b}|", display: true },
    ],
    exprTemplate: "|{a}-{b}|",
    params: {
      a: { type: "integer", min: -10, max: 10 },
      b: { type: "integer", min: -10, max: 10 },
    },
    constraints: ["a !== b"],
    tags: ["topic:signed_numbers", "template:generated_abs_diff", "signed"],
    metadata: {
      difficulty: 0.28,
      subtopic: "absolute_value",
      source: "generator",
    },
    input: {
      allowMinus: false,
      allowDecimal: false,
    },
  },
];
