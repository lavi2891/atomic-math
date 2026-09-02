import { SIGNED_NUMBERS_GENERATED_QUESTIONS } from "@domain/questions/bank/SIGNED_NUMBERS.generated";
import { SIGNED_NUMBERS_SAMPLE_QUESTIONS } from "@domain/questions/samples/SIGNED_NUMBERS.samples";
import type { TopicId } from "@domain/topics/types";
import { adaptSignedNumbersQuestions } from "../content/legacy/signedNumbersAdapter";
import type { SkillQuestionDefinition } from "../content/legacy/signedNumbersAdapter";

export function selectQuestionPool(topicId: TopicId): SkillQuestionDefinition[] {
  switch (topicId) {
    case "SIGNED_NUMBERS":
      return adaptSignedNumbersQuestions([
        ...SIGNED_NUMBERS_GENERATED_QUESTIONS,
        ...SIGNED_NUMBERS_SAMPLE_QUESTIONS,
      ]);
    default:
      return [];
  }
}
