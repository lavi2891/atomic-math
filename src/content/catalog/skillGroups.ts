import type { SkillGroup } from "./types.ts";

export const SKILL_GROUPS = [
  { id: "AR_ADDITION", domainId: "ARITHMETIC", nameHe: "חיבור", order: 20, skillIds: ["AR_ADD_FACTS"], active: true },
  { id: "AR_SUBTRACTION", domainId: "ARITHMETIC", nameHe: "חיסור", order: 30, skillIds: ["AR_SUB_FACTS"], active: true },
  { id: "AR_MULTIPLICATION_FACTS", domainId: "ARITHMETIC", nameHe: "לוח הכפל", descriptionHe: "משפחות 2–10", order: 40, skillIds: ["AR_MUL_F_2_5_10", "AR_MUL_F_3_4", "AR_MUL_F_6_7", "AR_MUL_F_8_9"], active: true },
  { id: "AR_DIVISION_FACTS", domainId: "ARITHMETIC", nameHe: "עובדות חילוק", descriptionHe: "הקשר בין כפל לחילוק", order: 50, skillIds: ["AR_DIV_F_2_5_10", "AR_DIV_F_3_4", "AR_DIV_F_6_7", "AR_DIV_F_8_9"], active: true },
] as const satisfies readonly SkillGroup[];

export function groupAtomicSkillIds(groupId: string): string[] {
  return [...(SKILL_GROUPS.find((group) => group.id === groupId)?.skillIds ?? [])];
}

export type PresentationItem = { id: string; nameHe: string; descriptionHe?: string; skillIds: string[]; isGroup: boolean; order: number };

export function presentationItems(domainId: string, availableSkillIds: readonly string[], skills: readonly { id: string; domainId: string; nameHe: string; shortNameHe?: string; order: number }[]): PresentationItem[] {
  const available = new Set(availableSkillIds);
  const grouped = new Set<string>();
  const groups = SKILL_GROUPS.filter((group) => group.active && group.domainId === domainId).flatMap((group) => {
    const skillIds = group.skillIds.filter((id) => available.has(id));
    if (!skillIds.length) return [];
    skillIds.forEach((id) => grouped.add(id));
    return [{ id: group.id, nameHe: group.nameHe, descriptionHe: "descriptionHe" in group ? group.descriptionHe : undefined, skillIds, isGroup: true, order: group.order }];
  });
  const atomic = skills.filter((skill) => skill.domainId === domainId && available.has(skill.id) && !grouped.has(skill.id)).map((skill) => ({ id: skill.id, nameHe: skill.shortNameHe ?? skill.nameHe, skillIds: [skill.id], isGroup: false, order: skill.order }));
  return [...groups, ...atomic].sort((left, right) => left.order - right.order);
}
