import type { RawAnswer } from "../questions/types.ts";
import type { DifficultyBand, SkillId } from "../../content/catalog/types.ts";
import type { QuestionCategory } from "../questions/categories.ts";
import type { LiteracyDemand } from "../questions/types.ts";

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
  /** Definition-level supporting knowledge captured for later diagnostics; never used as an access gate. */
  supportingSkills?: SkillId[];
  difficulty: number;
  difficultyBand?: DifficultyBand;
  category?: QuestionCategory;
  /** Definition-level reading demand; optional only for attempts created before this field existed. */
  literacyDemand?: LiteracyDemand;
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
