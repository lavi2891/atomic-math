import type { Question, RawAnswer } from "../questions/types";

export interface AnswerResult {
  /** Ephemeral evaluation/UI state. Attempt is the only persisted learning evidence. */
  questionId: string;
  /** Original instance retained for session review, never regenerated. */
  questionSnapshot?: Question;
  topicId: string;
  attemptIndex: number;
  isCorrect: boolean;
  rawAnswer: RawAnswer;
  normalizedAnswer?: unknown;
  responseTimeMs: number;
  timestamp: number; // Date.now()
  sessionId?: string;
  hintLevelUsed?: number; // 0-based index of hints used, or undefined
}

// optional: what evaluator returns (can be extended later)
export interface Evaluation {
  isCorrect: boolean;
  normalizedAnswer?: unknown; // for debugging/analytics (optional)
  message?: string; // short feedback if you want
}
