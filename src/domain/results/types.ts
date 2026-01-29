import type { RawAnswer } from "../questions/types";

export interface AnswerResult {
  questionId: string;
  topicId: string;
  isCorrect: boolean;
  rawAnswer: RawAnswer;
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
