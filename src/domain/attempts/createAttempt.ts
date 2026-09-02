import type { AnswerResult } from "../results/types.ts";
import {
  isGeneratedQuestionInstance,
  type Question,
} from "../questions/types.ts";
import type { PracticeSession } from "../session/practiceSession.ts";
import { attemptScoreConfig } from "../mastery/config.ts";
import type { Attempt, SupportLevel } from "./types.ts";

function createAttemptId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `attempt-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function scoreAttempt(correct: boolean, supportLevel: SupportLevel): number {
  return correct ? attemptScoreConfig[supportLevel] : attemptScoreConfig.incorrect;
}

export function createAttemptFromAnswer(input: {
  session: PracticeSession;
  question: Question;
  result: AnswerResult;
  sequenceNumber: number;
  supportLevel?: SupportLevel;
  attemptId?: string;
}): Attempt {
  const { question, result, session } = input;
  if (!question.skillId) {
    throw new Error(`Practice question ${question.id} is missing required skillId`);
  }
  const supportLevel = input.supportLevel ?? "independent";
  const generated = isGeneratedQuestionInstance(question) ? question : undefined;
  return {
    attemptId: input.attemptId ?? createAttemptId(),
    sessionId: session.id,
    studentId: session.studentId,
    questionId: generated?.baseId ?? question.id,
    questionInstanceId: generated?.id,
    generatorId: generated?.templateId,
    generatorSeed: generated?.generatorSeed,
    skillId: question.skillId,
    difficulty: question.difficulty ?? 0.5,
    submittedAnswer: result.rawAnswer,
    normalizedAnswer: result.normalizedAnswer,
    correct: result.isCorrect,
    supportLevel,
    scoreValue: scoreAttempt(result.isCorrect, supportLevel),
    responseTimeMs: result.responseTimeMs,
    submittedAt: new Date(result.timestamp).toISOString(),
    sequenceNumber: input.sequenceNumber,
    tags: question.tags,
    misconceptionIds: question.misconceptions,
  };
}
