import type { Question } from "@domain/questions/types";
import { SIGNED_NUMBERS_QUESTIONS } from "@domain/questions/bank/SIGNED_NUMBERS";
import type { TopicId } from "@domain/topics/types";

export function selectQuestionPool(topicId: TopicId): Question[] {
  switch (topicId) {
    case "SIGNED_NUMBERS":
      return SIGNED_NUMBERS_QUESTIONS;
    default:
      return [];
  }
}
