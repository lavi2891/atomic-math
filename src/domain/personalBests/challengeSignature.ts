import type { Domain, Skill } from "../../content/catalog/types.ts";
import type { SessionSettings } from "../session/practiceSession.ts";
import type { ChallengeScope, ChallengeSignature } from "./types.ts";

function sameIds(left: readonly string[], right: readonly string[]): boolean {
  const a = [...new Set(left)].sort(); const b = [...new Set(right)].sort();
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

export function domainScopeVersion(skillIds: readonly string[]): string {
  return [...new Set(skillIds)].sort().join("+");
}

export function eligibleChallengeScope(selectedSkillIds: readonly string[], domains: readonly Domain[], skills: readonly Skill[]): ChallengeScope | null {
  const selected = [...new Set(selectedSkillIds)];
  if (selected.length === 1) return { type: "skill", skillId: selected[0]! };
  for (const domain of domains.filter((item) => item.active)) {
    const domainSkillIds = skills.filter((skill) => skill.active && skill.domainId === domain.id).map((skill) => skill.id);
    if (domainSkillIds.length > 0 && sameIds(selected, domainSkillIds)) return { type: "domain", domainId: domain.id, scopeVersion: domainScopeVersion(domainSkillIds) };
  }
  return null;
}

export function createChallengeSignature(settings: SessionSettings, selectedSkillIds: readonly string[], domains: readonly Domain[], skills: readonly Skill[]): ChallengeSignature | null {
  if (settings.mode !== "timed" && settings.mode !== "survival") return null;
  const scope = eligibleChallengeScope(selectedSkillIds, domains, skills); if (!scope) return null;
  return settings.mode === "timed" ? { mode: "timed", durationSeconds: settings.durationSeconds, scope } : { mode: "survival", maxErrors: settings.maxErrors, scope };
}

export function challengeSignatureKey(studentId: string, signature: ChallengeSignature): string {
  const modeValue = signature.mode === "timed" ? `duration:${signature.durationSeconds}` : `errors:${signature.maxErrors}`;
  const scopeValue = signature.scope.type === "skill" ? `skill:${signature.scope.skillId}` : `domain:${signature.scope.domainId}:v:${signature.scope.scopeVersion}`;
  return `${studentId}|${signature.mode}|${modeValue}|${scopeValue}`;
}
