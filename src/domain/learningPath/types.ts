import type { SkillId } from "../../content/catalog/types.ts";

export type LearningPathId = "NUMBERS_ALGEBRA" | "GEOMETRY";
export type StageType = "normal" | "review" | "checkpoint" | "bonus";
/** Zero means unearned; one to three stars complete a stage. */
export type StageStars = 0 | 1 | 2 | 3;
export type StageSkillIds = readonly [SkillId, ...SkillId[]];

export interface LearningStageReference {
  readonly pathId: LearningPathId;
  readonly stageId: string;
}

/** Presentation content only. Skills and their evidence policies remain atomic. */
export interface Stage {
  /** Stable and unique across paths, including student-specific inserted stages. */
  readonly id: string;
  readonly nameHe: string;
  readonly type: StageType;
  readonly skillIds: StageSkillIds;
}

/** Assessment metadata only; passing/skip behavior belongs to a future feature. */
export interface ChapterShortcutTest {
  readonly id: string;
  readonly skillIds: StageSkillIds;
}

export interface Chapter {
  readonly id: string;
  readonly nameHe: string;
  /** Array order is progression order; there is no fixed stage count. */
  readonly stages: readonly Stage[];
  readonly shortcutTest?: ChapterShortcutTest;
}

export interface LearningPath {
  readonly id: LearningPathId;
  readonly nameHe: string;
  /** Array order is progression order. Each path starts independently. */
  readonly chapters: readonly Chapter[];
}

/** One student's UX rewards, separate from definitions, Attempts, and Mastery. */
export interface StudentLearningProgress {
  readonly studentId: string;
  /** Missing entries mean zero stars. Keep only the best reward from replays. */
  readonly bestStarsByStage: Readonly<Partial<Record<string, StageStars>>>;
}

/** A derived view, never stored on a Stage or used as Skill mastery evidence. */
export interface StageProgress {
  readonly chapterId: string;
  readonly stageId: string;
  readonly stars: StageStars;
  readonly status: "locked" | "available" | "completed";
}
