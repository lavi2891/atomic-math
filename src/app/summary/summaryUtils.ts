import type { AnswerResult } from "@domain/results/types";

export type SummaryCounts = {
  answeredCount: number;
  correctCount: number;
};

export function getSummaryCounts(
  results: AnswerResult[] | undefined,
): SummaryCounts {
  const answeredCount = results?.length ?? 0;
  const correctCount = results?.filter((result) => result.isCorrect).length ?? 0;
  return { answeredCount, correctCount };
}
