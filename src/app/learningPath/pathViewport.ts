import type { LearningPath } from "../../domain/learningPath/types.ts";

export const DEFAULT_PAST_STAGE_COUNT = 4;
export const DEFAULT_FUTURE_STAGE_COUNT = 4;

export type PathViewport = {
  readonly visibleStageIds: ReadonlySet<string>;
  readonly hasOlderRequiredStages: boolean;
  readonly hasFutureRequiredStages: boolean;
};

/**
 * Limits presentation only. Progression still derives from the complete path.
 * Optional stages are included when they sit inside the visible main-path span.
 */
export function derivePathViewport(
  path: LearningPath,
  focusStageId: string | undefined,
  pastStageCount = DEFAULT_PAST_STAGE_COUNT,
  futureStageCount = DEFAULT_FUTURE_STAGE_COUNT,
): PathViewport {
  const allStages = path.chapters.flatMap((chapter) => chapter.stages);
  const requiredStages = allStages.filter((stage) => stage.type !== "bonus");
  if (requiredStages.length === 0) {
    return { visibleStageIds: new Set(), hasOlderRequiredStages: false, hasFutureRequiredStages: false };
  }

  const requestedFocusIndex = requiredStages.findIndex((stage) => stage.id === focusStageId);
  const focusIndex = requestedFocusIndex >= 0 ? requestedFocusIndex : 0;
  const firstRequiredIndex = Math.max(0, focusIndex - Math.max(0, pastStageCount));
  const lastRequiredIndex = Math.min(requiredStages.length - 1, focusIndex + Math.max(0, futureStageCount));
  const allStageIndex = new Map(allStages.map((stage, index) => [stage.id, index]));
  const firstRequiredStage = requiredStages[firstRequiredIndex]!;
  const lastRequiredStage = requiredStages[lastRequiredIndex]!;
  const firstFlatIndex = firstRequiredIndex === 0 ? 0 : allStageIndex.get(firstRequiredStage.id)!;
  const lastFlatIndex = lastRequiredIndex === requiredStages.length - 1
    ? allStages.length - 1
    : allStageIndex.get(lastRequiredStage.id)!;

  return {
    visibleStageIds: new Set(allStages.slice(firstFlatIndex, lastFlatIndex + 1).map((stage) => stage.id)),
    hasOlderRequiredStages: firstRequiredIndex > 0,
    hasFutureRequiredStages: lastRequiredIndex < requiredStages.length - 1,
  };
}
