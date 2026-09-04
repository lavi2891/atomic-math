import { DOMAINS, SKILL_GROUPS, getSkillById } from "../../content/catalog/index.ts";
import type { AnswerResult } from "../results/types.ts";
import type { PracticeSession, PracticeSessionState, SessionMode } from "./practiceSession.ts";

export function repeatSessionConfig(session: PracticeSession) {
  return { skillIds: [...session.selectedSkillIds], settings: { ...session.settings }, assignmentId: session.assignmentId };
}

export const sessionModeLabels: Record<SessionMode, string> = {
  fixed: "מספר שאלות", timed: "נגד השעון", survival: "הישרדות", practice: "תרגול חופשי",
};

export function feedbackDelayMs(mode: SessionMode): number | null {
  return mode === "timed" || mode === "survival" ? 450 : null;
}

export function practiceScopeLabel(skillIds: readonly string[]): string {
  return [...new Set(skillIds.map((id) => getSkillById(id)?.nameHe).filter(Boolean))].join(" · ") || "תרגול מתמטיקה";
}

export function activePracticeScopeLabel(skillIds: readonly string[]): string {
  const ids = [...new Set(skillIds)];
  if (ids.length === 1) return practiceScopeLabel(ids);
  const group = SKILL_GROUPS.find((item) => item.active && ids.every((id) => item.skillIds.some((skillId) => skillId === id)));
  const domainIds = new Set(ids.map((id) => getSkillById(id)?.domainId));
  const domain = domainIds.size === 1 ? DOMAINS.find((item) => item.id === [...domainIds][0]) : undefined;
  return `${group?.nameHe ?? domain?.nameHe ?? "מתמטיקה"} · ${ids.length} מיומנויות`;
}

/** Each result carries the original instance and answer for future explanation actions. */
export function sessionReviewResults(results: readonly AnswerResult[], showAll = false): AnswerResult[] {
  return results.filter((result) => showAll || !result.isCorrect);
}

export function sessionResultLabel(completed: PracticeSessionState): string {
  const correct = completed.results.filter((result) => result.isCorrect).length;
  const settings = completed.session.settings;
  if (settings.mode === "timed") {
    const seconds = completed.endReason === "timer_expired" ? settings.durationSeconds
      : Math.round(Math.max(0, (completed.endedAt ?? completed.session.startedAt) - completed.session.startedAt) / 1000);
    return `${correct} נכונות ב־${seconds} שניות`;
  }
  if (settings.mode === "survival") return `${correct} נכונות לפני ${completed.results.length - correct} טעויות`;
  return `${correct} מתוך ${completed.results.length} נכונות`;
}
