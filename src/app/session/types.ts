import type { Question } from "@domain/questions/types";
import type { AnswerResult } from "@domain/results/types";

export interface SessionProps {
  questions: Question[];
  onSessionEnd: (results: AnswerResult[]) => void;
}

export interface SessionState {
  index: number;
  results: AnswerResult[];
}
