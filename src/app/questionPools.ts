import { FOUNDATIONAL_QUESTIONS } from "../content/foundations/questions";
import { readyDefinitions } from "../content/readiness";
import type { TopicId } from "@domain/topics/types";
import type { SkillQuestionDefinition } from "../content/legacy/signedNumbersAdapter";

export function selectQuestionPool(topicId: TopicId): SkillQuestionDefinition[] {
  void topicId;
  return readyDefinitions(FOUNDATIONAL_QUESTIONS);
}
