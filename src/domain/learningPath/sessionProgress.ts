import type { PersistedSession } from "../sync/types.ts";
import type { Chapter, LearningPath, LearningShortcutReference, LearningStageReference, Stage, StageStars, StudentLearningProgress } from "./types.ts";
import { shortcutBypassStageIds } from "./scoring.ts";
import type { PracticeSession } from "../session/practiceSession.ts";

export const LEARNING_STAGE_SETTINGS = { mode: "fixed", questionCount: 5 } as const;

export function matchesLearningPathSettings(settings: PersistedSession["settings"]): boolean {
  return settings.mode === LEARNING_STAGE_SETTINGS.mode && settings.questionCount === LEARNING_STAGE_SETTINGS.questionCount;
}

export function findLearningStage(paths: readonly LearningPath[], reference: LearningStageReference): Stage | undefined {
  return paths.find((path) => path.id === reference.pathId)?.chapters
    .flatMap((chapter) => chapter.stages).find((stage) => stage.id === reference.stageId);
}

export type LearningSessionContext = {
  readonly kind: "stage" | "shortcut";
  readonly titleHe: string;
  readonly chapterNameHe: string;
  readonly pathNameHe: string;
};

/** Resolve display context without changing the session's atomic Skill scope. */
export function learningSessionContext(paths: readonly LearningPath[], session: Pick<PracticeSession, "learningStage" | "learningShortcut">): LearningSessionContext | undefined {
  if (session.learningStage) {
    const path = paths.find((item) => item.id === session.learningStage?.pathId);
    const chapter = path?.chapters.find((item) => item.stages.some((stage) => stage.id === session.learningStage?.stageId));
    const stage = chapter?.stages.find((item) => item.id === session.learningStage?.stageId);
    if (path && chapter && stage) return { kind: "stage", titleHe: stage.nameHe, chapterNameHe: chapter.nameHe, pathNameHe: path.nameHe };
  }
  if (session.learningShortcut) {
    const path = paths.find((item) => item.id === session.learningShortcut?.pathId);
    const chapter = path?.chapters.find((item) => item.id === session.learningShortcut?.chapterId && item.shortcutTest?.id === session.learningShortcut?.shortcutId);
    if (path && chapter) return { kind: "shortcut", titleHe: "בדיקת קיצור", chapterNameHe: chapter.nameHe, pathNameHe: path.nameHe };
  }
  return undefined;
}

export function findLearningShortcut(paths: readonly LearningPath[], reference: LearningShortcutReference): Chapter | undefined {
  const chapter = paths.find((path) => path.id === reference.pathId)?.chapters.find((item) => item.id === reference.chapterId);
  return chapter?.shortcutTest?.id === reference.shortcutId ? chapter : undefined;
}

export function matchesStageSkills(stage: Pick<Stage, "skillIds">, skillIds: readonly string[]): boolean {
  return stage.skillIds.length === skillIds.length && stage.skillIds.every((id) => skillIds.includes(id));
}

/**
 * Saved session outcomes restore the student's path without another persistence
 * store. Old stage sessions without a score retain their historical one star.
 */
export function progressFromSessions(studentId: string, paths: readonly LearningPath[], sessions: readonly PersistedSession[]): StudentLearningProgress {
  const bestStarsByStage: Partial<Record<string, StageStars>> = {};
  const bypassedStageIds = new Set<string>();
  const passedShortcutIds = new Set<string>();
  for (const session of sessions) {
    if (session.studentId !== studentId || session.status !== "completed"
      || session.endReason !== "completed" || !matchesLearningPathSettings(session.settings)
      || session.questionCount < LEARNING_STAGE_SETTINGS.questionCount) continue;
    if (session.learningStage) {
      const stage = findLearningStage(paths, session.learningStage);
      if (stage && matchesStageSkills(stage, session.selectedSkillIds)) {
        const stars = session.stageStars ?? 1;
        if (Number.isInteger(stars) && stars >= 0 && stars <= 3) {
          const previous = bestStarsByStage[stage.id] ?? 0;
          if (stars > previous) bestStarsByStage[stage.id] = stars;
        }
      }
    }
    if (session.learningShortcut && session.shortcutPassed === true) {
      const chapter = findLearningShortcut(paths, session.learningShortcut);
      if (chapter?.shortcutTest && matchesStageSkills(chapter.shortcutTest, session.selectedSkillIds)) {
        passedShortcutIds.add(chapter.shortcutTest.id);
        for (const stageId of shortcutBypassStageIds(chapter)) bypassedStageIds.add(stageId);
      }
    }
  }
  return {
    studentId,
    bestStarsByStage,
    ...(bypassedStageIds.size ? { bypassedStageIds: [...bypassedStageIds] } : {}),
    ...(passedShortcutIds.size ? { passedShortcutIds: [...passedShortcutIds] } : {}),
  };
}
