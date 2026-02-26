import type { Question } from "@domain/questions/types";
import { clamp01 } from "@shared/math";

export function getQuestionDifficulty(question: Question): number {
  return clamp01(question.difficulty ?? 0.5);
}

export function pickClosestByDifficulty(
  questions: Question[],
  targetDifficulty: number,
): Question | null {
  if (questions.length === 0) return null;

  const sorted = [...questions].sort((a, b) => {
    const distanceA = Math.abs(getQuestionDifficulty(a) - targetDifficulty);
    const distanceB = Math.abs(getQuestionDifficulty(b) - targetDifficulty);
    return distanceA - distanceB;
  });

  return sorted[0] ?? null;
}
