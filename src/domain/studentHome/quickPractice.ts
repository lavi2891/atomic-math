import type { Domain, Skill } from "../../content/catalog/types.ts";
import type { SkillQuestionDefinition } from "../session/skillQuestionSelector.ts";
import type { Assignment, StudentHomeData } from "./types.ts";
import { readySkillIds } from "../../content/readiness.ts";

export type QuickPracticeReason = "assignments" | "learning" | "foundations" | "no_content";
export type QuickPracticeScope = { skillIds: string[]; reason: QuickPracticeReason };

export function resolveQuickPracticeScope(input: {
  assignments: readonly Assignment[];
  masteryBySkill: StudentHomeData["masteryBySkill"];
  domains: readonly Domain[];
  skills: readonly Skill[];
  definitions: readonly SkillQuestionDefinition[];
}): QuickPracticeScope {
  const ready = readySkillIds(input.definitions);
  const backed = new Set(input.definitions.map((item) => item.skillId).filter((id) => ready.has(id)));
  const available = input.skills.filter((skill) => skill.active && skill.modes.quickPractice && backed.has(skill.id) && input.domains.some((domain) => domain.active && domain.id === skill.domainId)).sort((a, b) => a.order - b.order);
  if (!available.length) return { skillIds: [], reason: "no_content" };
  const availableIds = new Set(available.map((skill) => skill.id));
  const assigned = [...new Set(input.assignments.filter((item) => item.active && availableIds.has(item.skillId)).sort((a, b) => a.priority - b.priority).map((item) => item.skillId))];
  if (assigned.length) return { skillIds: assigned, reason: "assignments" };
  const learning = available.filter((skill) => { const snapshot = input.masteryBySkill[skill.id]; return snapshot && snapshot.attemptCount > 0 && (snapshot.mastery < skill.masteryTarget || snapshot.evidenceLevel !== "established"); }).map((skill) => skill.id);
  if (learning.length) return { skillIds: learning, reason: "learning" };
  const foundations = available.filter((skill) => skill.prerequisites.length === 0).map((skill) => skill.id);
  return { skillIds: foundations.length ? foundations : [available[0]!.id], reason: "foundations" };
}
