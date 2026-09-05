import type { AnswerResult } from "../results/types.ts";
import type { Chapter, Stage, StageScoreThresholds, StageStars } from "./types.ts";

export const DEFAULT_STAGE_SCORE_THRESHOLDS: StageScoreThresholds = {
  passed: 0.6,
  strong: 0.8,
  excellent: 0.9,
};

export const DEFAULT_SHORTCUT_PASSING_ACCURACY = 0.8;

function validThresholds(thresholds: StageScoreThresholds): boolean {
  return thresholds.passed >= 0 && thresholds.passed <= thresholds.strong
    && thresholds.strong <= thresholds.excellent && thresholds.excellent <= 1;
}

function accuracy(results: readonly AnswerResult[]): number {
  return results.length ? results.filter((result) => result.isCorrect).length / results.length : 0;
}

function median(values: readonly number[]): number | undefined {
  if (!values.length) return undefined;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1]! + sorted[middle]!) / 2;
}

export function scoreStageResult(stage: Stage, results: readonly AnswerResult[]): StageStars {
  const thresholds = stage.scoring?.thresholds ?? DEFAULT_STAGE_SCORE_THRESHOLDS;
  if (!validThresholds(thresholds)) throw new Error(`Invalid scoring thresholds for stage ${stage.id}`);
  const resultAccuracy = accuracy(results);
  let stars: StageStars = resultAccuracy >= thresholds.excellent ? 3
    : resultAccuracy >= thresholds.strong ? 2
      : resultAccuracy >= thresholds.passed ? 1 : 0;
  const fluency = stage.scoring?.fluency;
  if (fluency && stars >= fluency.appliesFromStar) {
    if (!Number.isFinite(fluency.maximumMedianResponseTimeMs) || fluency.maximumMedianResponseTimeMs <= 0) {
      throw new Error(`Invalid fluency target for stage ${stage.id}`);
    }
    const responseMedian = median(results.filter((result) => result.isCorrect).map((result) => result.responseTimeMs));
    if (responseMedian !== undefined && responseMedian > fluency.maximumMedianResponseTimeMs) {
      stars = (fluency.appliesFromStar - 1) as StageStars;
    }
  }
  return stars;
}

export function shortcutPassed(chapter: Chapter, results: readonly AnswerResult[]): boolean {
  if (!chapter.shortcutTest) throw new Error(`Chapter ${chapter.id} has no shortcut test`);
  const passingAccuracy = chapter.shortcutTest.passingAccuracy ?? DEFAULT_SHORTCUT_PASSING_ACCURACY;
  if (!Number.isFinite(passingAccuracy) || passingAccuracy < 0 || passingAccuracy > 1) {
    throw new Error(`Invalid shortcut passing accuracy for chapter ${chapter.id}`);
  }
  return accuracy(results) >= passingAccuracy;
}

/** A shortcut clears the lead-up to a chapter challenge; optional and challenge stages remain intact. */
export function shortcutBypassStageIds(chapter: Chapter): string[] {
  const firstCheckpoint = chapter.stages.findIndex((stage) => stage.type === "checkpoint");
  const leadUp = firstCheckpoint < 0 ? chapter.stages : chapter.stages.slice(0, firstCheckpoint);
  return leadUp.filter((stage) => stage.type !== "bonus").map((stage) => stage.id);
}
