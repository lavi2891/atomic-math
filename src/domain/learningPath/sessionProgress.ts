import type { PersistedSession } from "../sync/types.ts";
import type { LearningPath, LearningStageReference, Stage, StageStars, StudentLearningProgress } from "./types.ts";

export function findLearningStage(paths: readonly LearningPath[], reference: LearningStageReference): Stage | undefined {
  return paths.find((path) => path.id === reference.pathId)?.chapters
    .flatMap((chapter) => chapter.stages).find((stage) => stage.id === reference.stageId);
}

export function matchesStageSkills(stage: Stage, skillIds: readonly string[]): boolean {
  return stage.skillIds.length === skillIds.length && stage.skillIds.every((id) => skillIds.includes(id));
}

/**
 * A completed fixed stage activity earns one UX star, independently of accuracy.
 * Saved sessions restore the student's place without another persistence store.
 * Higher-star scoring is deferred; Mastery still uses Attempts only.
 */
export function progressFromSessions(studentId: string, paths: readonly LearningPath[], sessions: readonly PersistedSession[]): StudentLearningProgress {
  const bestStarsByStage: Partial<Record<string, StageStars>> = {};
  for (const session of sessions) {
    if (session.studentId !== studentId || !session.learningStage || session.status !== "completed"
      || session.endReason !== "completed" || session.settings.mode !== "fixed"
      || session.questionCount < session.settings.questionCount) continue;
    const stage = findLearningStage(paths, session.learningStage);
    if (stage && matchesStageSkills(stage, session.selectedSkillIds)) bestStarsByStage[stage.id] = 1;
  }
  return { studentId, bestStarsByStage };
}
