import type { QuestionDefinition } from "@domain/questions/definitions";
import { SIGNED_NUMBERS_GENERATED_QUESTIONS } from "@domain/questions/bank/SIGNED_NUMBERS.generated";
import { SIGNED_NUMBERS_SAMPLE_QUESTIONS } from "@domain/questions/samples/SIGNED_NUMBERS.samples";
import type { TopicId } from "@domain/topics/types";

export function selectQuestionPool(topicId: TopicId): QuestionDefinition[] {
  switch (topicId) {
    case "SIGNED_NUMBERS":
      return [...SIGNED_NUMBERS_GENERATED_QUESTIONS, ...SIGNED_NUMBERS_SAMPLE_QUESTIONS];
    default:
      return [];
  }
}
