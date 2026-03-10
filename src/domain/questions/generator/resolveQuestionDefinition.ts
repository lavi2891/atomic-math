import type { Question } from "../types.ts";
import type { QuestionDefinition } from "../definitions.ts";
import { isGeneratedQuestionDefinition } from "../definitions.ts";
import { buildGeneratedQuestion } from "./buildGeneratedQuestion.ts";
import {
  createRecentHistory,
  recordGeneratedQuestionHistory,
  type AntiRepetitionConfig,
  type GeneratedQuestionRecentHistory,
} from "./antiRepetition.ts";

type ResolveQuestionOptions = {
  recentHistory?: GeneratedQuestionRecentHistory;
  antiRepetitionConfig?: Partial<AntiRepetitionConfig>;
};

export function resolveQuestionDefinition(
  question: QuestionDefinition,
  options: ResolveQuestionOptions = {},
): Question {
  if (!isGeneratedQuestionDefinition(question)) {
    return question;
  }

  const resolved = buildGeneratedQuestion(question, {
    recentHistory: options.recentHistory,
    antiRepetitionConfig: options.antiRepetitionConfig,
  });
  if (options.recentHistory) {
    recordGeneratedQuestionHistory(options.recentHistory, resolved);
  }
  return resolved;
}

export function resolveQuestionDefinitions(
  questions: QuestionDefinition[],
  options: ResolveQuestionOptions = {},
): Question[] {
  const recentHistory = options.recentHistory ?? createRecentHistory();
  return questions.map((question) =>
    resolveQuestionDefinition(question, {
      recentHistory,
      antiRepetitionConfig: options.antiRepetitionConfig,
    }),
  );
}
