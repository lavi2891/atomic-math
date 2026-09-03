import type { RawAnswer } from "../questions/types.ts";
import type { DifficultyBand } from "../../content/catalog/types.ts";
import type { QuestionCategory } from "../questions/categories.ts";

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
  difficultyBand?: DifficultyBand;
  category?: QuestionCategory;
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
