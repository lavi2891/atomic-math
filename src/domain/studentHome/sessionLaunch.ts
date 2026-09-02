import type { SessionSettings } from "../session/practiceSession.ts";
import { sessionDefaults } from "../session/config.ts";

export type SessionLaunch = { skillIds: string[]; settings: SessionSettings };

export function assignmentSessionLaunch(skillId: string): SessionLaunch {
  return { skillIds: [skillId], settings: { mode: "fixed", questionCount: sessionDefaults.fixedQuestionCount } };
}

export function isSkillSelected(selectedSkillIds: readonly string[], skillId: string): boolean {
  return selectedSkillIds.includes(skillId);
}
