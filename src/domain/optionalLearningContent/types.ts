import type { LearningMedia } from "../media/types.ts";

export type RiddleDifficulty = "easy" | "medium" | "hard";
export type RiddleSubmissionStatus = "submitted" | "reviewed" | "accepted" | "needs-revision";
export type LearningResourceType = "video" | "externalLink" | "tool" | "article";

export interface RiddleFinalAnswer {
  /** Small exact-answer support only; the written response remains the learning artifact. */
  readonly acceptedAnswers: readonly [string, ...string[]];
}

export interface RiddleDefinition {
  readonly id: string;
  readonly type: "riddle";
  readonly titleHe: string;
  readonly promptHe: string;
  readonly difficulty: RiddleDifficulty;
  readonly media?: LearningMedia;
  readonly finalAnswer?: RiddleFinalAnswer;
}

export interface LearningResourceDefinition {
  readonly id: string;
  readonly type: LearningResourceType;
  readonly titleHe: string;
  readonly shortDescription?: string;
  readonly url: string;
  readonly media?: LearningMedia;
  readonly sourceLabel?: string;
  readonly durationMinutes?: number;
  readonly opensExternally: true;
}

export type OptionalLearningNode = RiddleDefinition | LearningResourceDefinition;

export interface RiddleSubmission {
  readonly submissionId: string;
  readonly studentId: string;
  readonly riddleId: string;
  readonly responseText: string;
  readonly finalAnswerText?: string;
  readonly finalAnswerCorrect?: boolean;
  readonly submittedAt: string;
  readonly updatedAt: string;
  readonly difficulty: RiddleDifficulty;
  readonly status: RiddleSubmissionStatus;
}

function normalizeFinalAnswer(value: string): string {
  return value.trim().replace(/\s+/gu, " ").toLocaleLowerCase("he-IL");
}

export function checkRiddleFinalAnswer(riddle: RiddleDefinition, answer: string): boolean | undefined {
  if (!riddle.finalAnswer) return undefined;
  const normalized = normalizeFinalAnswer(answer);
  return riddle.finalAnswer.acceptedAnswers.some((candidate) => normalizeFinalAnswer(candidate) === normalized);
}

export function createRiddleSubmission(input: {
  riddle: RiddleDefinition;
  studentId: string;
  responseText: string;
  finalAnswerText?: string;
  submissionId?: string;
  now?: string;
}): RiddleSubmission {
  const responseText = input.responseText.trim();
  if (!responseText) throw new Error("Riddle response cannot be empty");
  const submittedAt = input.now ?? new Date().toISOString();
  const finalAnswerText = input.finalAnswerText?.trim() || undefined;
  return {
    submissionId: input.submissionId ?? globalThis.crypto?.randomUUID?.() ?? `riddle-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    studentId: input.studentId,
    riddleId: input.riddle.id,
    responseText,
    finalAnswerText,
    finalAnswerCorrect: finalAnswerText ? checkRiddleFinalAnswer(input.riddle, finalAnswerText) : undefined,
    submittedAt,
    updatedAt: submittedAt,
    difficulty: input.riddle.difficulty,
    status: "submitted",
  };
}

export function safeExternalResourceUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}
