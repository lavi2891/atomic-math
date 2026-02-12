import type { Question } from "@domain/questions/types";

export const SIGNED_NUMBERS_QUESTIONS: Question[] = [
  {
    id: "A1-1",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    prompt: [
      { kind: "text", value: "מה הערך של " },
      { kind: "math", latex: "-3 + 5" },
      { kind: "text", value: " ?" },
    ],
    answer: 2,
    seeds: { difficulty: 0.2, timeMs: 5000 },
  },

  {
    id: "A1-2",
    topicId: "SIGNED_NUMBERS",
    type: "numeric",
    prompt: [
      { kind: "text", value: "חשב: " },
      { kind: "math", latex: "4 - 7" },
    ],
    answer: -3,
    seeds: { difficulty: 0.3, timeMs: 5000 },
  },

  {
    id: "A1-3",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    prompt: [{ kind: "text", value: "איזה מספר הוא הקטן ביותר?" }],
    options: [
      {
        id: "a",
        content: [{ kind: "math", latex: "-2" }],
      },
      {
        id: "b",
        content: [{ kind: "math", latex: "1" }],
      },
      {
        id: "c",
        content: [{ kind: "math", latex: "-5" }],
      },
    ],
    correctOptionId: "c",
    seeds: { difficulty: 0.4, timeMs: 6000 },
  },

  {
    id: "A1-4",
    topicId: "SIGNED_NUMBERS",
    type: "singleChoice",
    prompt: [
      { kind: "text", value: "מה התוצאה של " },
      { kind: "math", latex: "-4 \\times 2" },
      { kind: "text", value: " ?" },
    ],
    options: [
      { id: "a", content: [{ kind: "math", latex: "8" }] },
      { id: "b", content: [{ kind: "math", latex: "-8" }] },
      { id: "c", content: [{ kind: "math", latex: "-2" }] },
    ],
    correctOptionId: "b",
    seeds: { difficulty: 0.5, timeMs: 7000 },
  },

  {
    id: "A1-5",
    topicId: "SIGNED_NUMBERS",
    type: "multiChoice",
    prompt: [{ kind: "text", value: "סמן את כל המספרים השליליים:" }],
    options: [
      { id: "a", content: [{ kind: "math", latex: "-1" }] },
      { id: "b", content: [{ kind: "math", latex: "0" }] },
      { id: "c", content: [{ kind: "math", latex: "-7" }] },
      { id: "d", content: [{ kind: "math", latex: "3" }] },
    ],
    correctOptionIds: ["a", "c"],
    seeds: { difficulty: 0.4, timeMs: 8000 },
  },
];
