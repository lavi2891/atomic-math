import type { Topic, TopicId } from "./types";

export const TOPICS: Topic[] = [
  {
    id: "SIGNED_NUMBERS",
    title: "מספרים מכוונים",
    order: 1,
    icon: "signedNumbers",
    colorToken: "blue",
  },
  {
    id: "ALGEBRA_EXPRESSIONS",
    title: "ביטויים אלגבריים",
    order: 2,
    icon: "algebraExpressions",
    colorToken: "green",
  },
  {
    id: "LINEAR_EQUATIONS",
    title: "משוואות ליניאריות",
    order: 3,
    icon: "linearEquations",
    colorToken: "orange",
  },
  {
    id: "TRIANGLES",
    title: "משולשים",
    order: 4,
    icon: "triangles",
    colorToken: "teal",
  },
];

export function listTopics(): Topic[] {
  return [...TOPICS].sort((a, b) => a.order - b.order);
}

export function getTopicById(id: TopicId): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id);
}
