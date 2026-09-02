import type { MasterySnapshot } from "../mastery/projectMastery.ts";
import type { Assignment, SkillDisplayState } from "./types.ts";

export function sortAssignments(assignments: readonly Assignment[]): Assignment[] {
  return [...assignments].filter((assignment) => assignment.active).sort(
    (left, right) => left.priority - right.priority || (left.createdAt ?? "").localeCompare(right.createdAt ?? ""),
  );
}

export function isAssignmentComplete(assignment: Assignment, snapshot: MasterySnapshot | undefined): boolean {
  return !!snapshot && snapshot.evidenceLevel === "established" && snapshot.mastery >= assignment.targetMastery;
}

export function deriveSkillDisplayState(snapshot: MasterySnapshot | undefined): SkillDisplayState {
  if (!snapshot || snapshot.attemptCount === 0) return "not_started";
  if (snapshot.evidenceLevel !== "established") return "starting";
  if (snapshot.mastery < 40) return "needs_support";
  if (snapshot.mastery < 70) return "developing";
  if (snapshot.mastery < 85) return "nearly_there";
  return "mastered";
}

export const skillDisplayLabels: Readonly<Record<SkillDisplayState, string>> = {
  not_started: "לא תרגלתי עדיין",
  starting: "מתחיל",
  needs_support: "צריך חיזוק",
  developing: "בתהליך",
  nearly_there: "כמעט שם",
  mastered: "שולט",
};

export const evidenceLabels = {
  insufficient: "עדיין אין מספיק תרגול",
  emerging: "מתחילים לראות תמונה",
  established: "המדידה יציבה יותר",
} as const;

export function chooseFresherMastery(
  remote: MasterySnapshot | undefined,
  local: MasterySnapshot,
): MasterySnapshot {
  // This intentionally selects one complete projection; it does not merge cross-device histories.
  // Any local attempts (including unsynced attempts) win when their count or latest timestamp shows
  // evidence newer than the cached/server projection.
  if (!remote) return local;
  if (local.attemptCount === 0) return remote;
  if (local.attemptCount >= remote.attemptCount) return local;
  const localTime = local.lastAttemptAt ? Date.parse(local.lastAttemptAt) : 0;
  const remoteTime = remote.lastAttemptAt ? Date.parse(remote.lastAttemptAt) : 0;
  return localTime > remoteTime ? local : remote;
}

export function fluencyLabel(snapshot: MasterySnapshot | undefined): string | null {
  if (!snapshot || snapshot.fluencyMedianMs === undefined) return null;
  if (snapshot.evidenceLevel !== "established") return "שטף: בתרגול";
  return snapshot.fluencyMedianMs <= 5_000 ? "שטף: יציב" : "שטף: בתרגול";
}
