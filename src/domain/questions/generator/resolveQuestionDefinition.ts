import type { Question } from "../types.ts";
import type { QuestionDefinition } from "../definitions.ts";
import { isGeneratedQuestionDefinition } from "../definitions.ts";
import { buildGeneratedQuestion } from "./buildGeneratedQuestion.ts";

export function resolveQuestionDefinition(question: QuestionDefinition): Question {
  return isGeneratedQuestionDefinition(question)
    ? buildGeneratedQuestion(question)
    : question;
}

export function resolveQuestionDefinitions(
  questions: QuestionDefinition[],
): Question[] {
  return questions.map(resolveQuestionDefinition);
}
