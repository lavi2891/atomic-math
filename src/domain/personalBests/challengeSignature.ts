import type { Domain, Skill } from "../../content/catalog/types.ts";
import type { SessionSettings } from "../session/practiceSession.ts";
import type { ChallengeScope, ChallengeSignature } from "./types.ts";
import { getChallengeProfile } from "../../content/catalog/challengeProfiles.ts";

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
  if (settings.mode === "practice") return null;
  const selected = [...new Set(selectedSkillIds)];
  const scope = eligibleChallengeScope(selectedSkillIds, domains, skills); if (!scope) return null;
  if (settings.mode === "fixed") return { mode: "fixed", questionCount: settings.questionCount, scope };
  const profileId = settings.mode === "timed"
    ? selected.every((id) => skills.find((skill) => skill.id === id)?.modes.timedProfileId === "TIMED_FLUENCY") ? "TIMED_FLUENCY" : undefined
    : selected.every((id) => skills.find((skill) => skill.id === id)?.modes.survivalProfileId === "SURVIVAL_CORE") ? "SURVIVAL_CORE" : undefined;
  const profile = getChallengeProfile(profileId);
  if (!profile) return null;
  const profileIdentity = { id: profile.id, version: profile.version };
  return settings.mode === "timed" ? { mode: "timed", durationSeconds: settings.durationSeconds, scope, profile: profileIdentity } : { mode: "survival", maxErrors: settings.maxErrors, scope, profile: profileIdentity };
}

export function challengeSignatureKey(studentId: string, signature: ChallengeSignature): string {
  const modeValue = signature.mode === "fixed" ? `questions:${signature.questionCount}` : signature.mode === "timed" ? `duration:${signature.durationSeconds}` : `errors:${signature.maxErrors}`;
  const scopeValue = signature.scope.type === "skill" ? `skill:${signature.scope.skillId}` : `domain:${signature.scope.domainId}:v:${signature.scope.scopeVersion}`;
  const profileValue = signature.mode === "fixed" ? "" : `|profile:${signature.profile.id}:v${signature.profile.version}`;
  return `${studentId}|${signature.mode}|${modeValue}|${scopeValue}${profileValue}`;
}
