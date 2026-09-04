import type { MasterySnapshot } from "../mastery/projectMastery.ts";
import type { StudentLearningProgress } from "../learningPath/types.ts";

export interface StudentProfile {
  studentId: string;
  displayName: string;
  classId?: string;
  groupId?: string;
  active: boolean;
}

export interface Assignment {
  assignmentId: string;
  studentId: string;
  skillId: string;
  targetMastery: number;
  priority: number;
  active: boolean;
  createdAt?: string;
  dueAt?: string;
  completedAt?: string;
}

export interface StudentHomeData {
  /** Undefined means local path history could not be loaded, not zero progress. */
  learningProgress?: StudentLearningProgress;
  student: StudentProfile | null;
  assignments: Assignment[];
  masteryBySkill: Record<string, MasterySnapshot>;
  source: "remote" | "cache" | "local";
  connection: "online" | "offline" | "unconfigured";
  warning?: string;
  cachedAt: string;
}

export interface CachedStudentHome {
  studentId: string;
  student: StudentProfile | null;
  assignments: Assignment[];
  masteryBySkill: Record<string, MasterySnapshot>;
  cachedAt: string;
}

export type SkillDisplayState =
  | "not_started"
  | "starting"
  | "needs_support"
  | "developing"
  | "nearly_there"
  | "mastered";
