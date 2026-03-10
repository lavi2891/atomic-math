import type { Question } from "./types.ts";
import type { GeneratedQuestionDefinition } from "./generator/types.ts";

export type QuestionDefinition = Question | GeneratedQuestionDefinition;

export function isGeneratedQuestionDefinition(
  question: QuestionDefinition,
): question is GeneratedQuestionDefinition {
  return "kind" in question && question.kind === "generated";
}
