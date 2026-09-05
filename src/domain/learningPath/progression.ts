import type { LearningPath, StageProgress, StageStars, StudentLearningProgress } from "./types.ts";

/**
 * Locks guide the path UI only, never access to atomic Skill practice.
 * All preceding non-bonus stages need a star, including across chapter boundaries.
 * Completed stages stay replayable when a review is inserted earlier in the path.
 */
export function derivePathProgress(path: LearningPath, progress: StudentLearningProgress): StageProgress[] {
  let precedingMainStagesComplete = true;
  return path.chapters.flatMap((chapter) => chapter.stages.map((stage): StageProgress => {
    const stars = progress.bestStarsByStage[stage.id] ?? 0;
    const completed = stars >= 1 || progress.bypassedStageIds?.includes(stage.id) === true;
    const status = completed ? "completed" : precedingMainStagesComplete ? "available" : "locked";
    if (stage.type !== "bonus") precedingMainStagesComplete &&= completed;
    return { chapterId: chapter.id, stageId: stage.id, stars, status };
  }));
}

/**
 * Record an awarded result, not a mastery score. The caller supplies stars from
 * a stage activity; this foundation deliberately does not invent score thresholds.
 */
export function recordStageResult(
  path: LearningPath,
  progress: StudentLearningProgress,
  stageId: string,
  stars: StageStars,
): StudentLearningProgress {
  if (!Number.isInteger(stars) || stars < 0 || stars > 3) {
    throw new Error("Stage stars must be an integer from 0 to 3");
  }
  const stage = derivePathProgress(path, progress).find((entry) => entry.stageId === stageId);
  if (!stage) throw new Error(`Unknown stage in path ${path.id}: ${stageId}`);
  if (stage.status === "locked") throw new Error(`Stage is locked in the learning path: ${stageId}`);
  if (stars <= stage.stars) return progress;
  return {
    ...progress,
    bestStarsByStage: { ...progress.bestStarsByStage, [stageId]: stars },
  };
}

/** Sum authored stage bests once; replays and unknown stale IDs cannot inflate the total. */
export function totalEarnedStars(paths: readonly LearningPath[], progress: StudentLearningProgress | undefined): number {
  if (!progress) return 0;
  const stageIds = new Set(paths.flatMap((path) => path.chapters.flatMap((chapter) => chapter.stages.map((stage) => stage.id))));
  return [...stageIds].reduce((total, stageId) => total + (progress.bestStarsByStage[stageId] ?? 0), 0);
}
