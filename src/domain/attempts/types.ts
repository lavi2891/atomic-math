import type { RawAnswer } from "../questions/types.ts";

export type SupportLevel = "independent" | "hint" | "guided";

export interface Attempt {
  attemptId: string;
  sessionId: string;
  studentId: string;
  questionId: string;
  questionInstanceId?: string;
  generatorId?: string;
  generatorSeed?: number;
  skillId: string;
  difficulty: number;
  submittedAnswer: RawAnswer;
  normalizedAnswer?: unknown;
  correct: boolean;
  supportLevel: SupportLevel;
  scoreValue: number;
  responseTimeMs: number;
  submittedAt: string;
  sequenceNumber: number;
  tags?: string[];
  misconceptionIds?: string[];
}
