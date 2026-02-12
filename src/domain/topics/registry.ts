import type { Topic, TopicId } from "./types";

export const TOPICS: Topic[] = [
  {
    id: "SIGNED_NUMBERS",
    title: "מספרים מכוונים",
    order: 1,
    icon: "signedNumbers",
    colorToken: "topicBlue",
  },
  {
    id: "ALGEBRA_EXPRESSIONS",
    title: "ביטויים אלגבריים",
    order: 2,
    icon: "algebraExpressions",
    colorToken: "topicPurple",
  },
  {
    id: "LINEAR_EQUATIONS",
    title: "משוואות ליניאריות",
    order: 3,
    icon: "linearEquations",
    colorToken: "topicGreen",
  },
  {
    id: "TRIANGLES",
    title: "משולשים",
    order: 4,
    icon: "triangles",
    colorToken: "topicOrange",
  },
];

export function listTopics(): Topic[] {
  return [...TOPICS].sort((a, b) => a.order - b.order);
}

export function getTopicById(id: TopicId): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id);
}
