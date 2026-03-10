import type { QuestionDefinition } from "@domain/questions/definitions";
import { SIGNED_NUMBERS_QUESTIONS } from "@domain/questions/bank/SIGNED_NUMBERS";
import { SIGNED_NUMBERS_GENERATED_QUESTIONS } from "@domain/questions/bank/SIGNED_NUMBERS.generated";
import type { TopicId } from "@domain/topics/types";

export function selectQuestionPool(topicId: TopicId): QuestionDefinition[] {
  switch (topicId) {
    case "SIGNED_NUMBERS":
      return [...SIGNED_NUMBERS_QUESTIONS, ...SIGNED_NUMBERS_GENERATED_QUESTIONS];
    default:
      return [];
  }
}
