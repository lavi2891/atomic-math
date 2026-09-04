import type { Chapter, LearningPath, Stage, StudentLearningProgress } from "../learningPath/types.ts";
import { derivePathProgress } from "../learningPath/progression.ts";

export interface LearningPathCard {
  path: LearningPath;
  chapter?: Chapter;
  stage?: Stage;
  completedStages: number;
  totalStages: number;
  pathCompleted: boolean;
  availability: "ready" | "coming_soon" | "content_unavailable" | "progress_unavailable";
}

/** Choose the next main stage without turning optional bonuses into a detour. */
export function learningPathCards(paths: readonly LearningPath[], progress: StudentLearningProgress | undefined, availableSkillIds: ReadonlySet<string>): LearningPathCard[] {
  return paths.map((path) => {
    const mainStages = path.chapters.flatMap((chapter) => chapter.stages
      .filter((stage) => stage.type !== "bonus").map((stage) => ({ chapter, stage })));
    const empty = { path, completedStages: 0, totalStages: 0, pathCompleted: false };
    if (!mainStages.length) return { ...empty, availability: "coming_soon" };
    if (!progress) return { ...empty, availability: "progress_unavailable" };
    const states = new Map(derivePathProgress(path, progress).map((entry) => [entry.stageId, entry]));
    const next = mainStages.find(({ stage }) => states.get(stage.id)?.status !== "completed");
    const current = next ?? mainStages.at(-1)!;
    const chapterMain = current.chapter.stages.filter((stage) => stage.type !== "bonus");
    return {
      path, ...current,
      completedStages: chapterMain.filter((stage) => states.get(stage.id)?.status === "completed").length,
      totalStages: chapterMain.length,
      pathCompleted: !next,
      availability: states.get(current.stage.id)?.status !== "locked" && current.stage.skillIds.every((id) => availableSkillIds.has(id)) ? "ready" : "content_unavailable",
    };
  });
}
