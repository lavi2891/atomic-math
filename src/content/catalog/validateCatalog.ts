import type { Domain, Skill } from "./types.ts";
import { validateEvidencePolicy } from "./policies.ts";

export type CatalogValidationIssue = {
  code: "DUPLICATE_DOMAIN_ID" | "DUPLICATE_SKILL_ID" | "UNKNOWN_DOMAIN" | "UNKNOWN_PREREQUISITE" | "SELF_PREREQUISITE" | "PREREQUISITE_CYCLE" | "INVALID_MASTERY_TARGET" | "INVALID_EVIDENCE_POLICY" | "UNKNOWN_SUPPORTING_SKILL";
  message: string;
  entityId: string;
};

function duplicates(ids: readonly string[]): Set<string> {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) repeated.add(id);
    seen.add(id);
  }
  return repeated;
}

export function validateCatalog(domains: readonly Domain[], skills: readonly Skill[]): CatalogValidationIssue[] {
  const issues: CatalogValidationIssue[] = [];
  const domainIds = new Set(domains.map((domain) => domain.id));
  const skillIds = new Set(skills.map((skill) => skill.id));

  for (const id of duplicates(domains.map((domain) => domain.id))) {
    issues.push({ code: "DUPLICATE_DOMAIN_ID", entityId: id, message: `Duplicate domain id: ${id}` });
  }
  for (const id of duplicates(skills.map((skill) => skill.id))) {
    issues.push({ code: "DUPLICATE_SKILL_ID", entityId: id, message: `Duplicate skill id: ${id}` });
  }

  for (const skill of skills) {
    if (!domainIds.has(skill.domainId)) {
      issues.push({ code: "UNKNOWN_DOMAIN", entityId: skill.id, message: `Skill ${skill.id} references unknown domain ${skill.domainId}` });
    }
    if (!Number.isFinite(skill.masteryTarget) || skill.masteryTarget < 0 || skill.masteryTarget > 100) {
      issues.push({ code: "INVALID_MASTERY_TARGET", entityId: skill.id, message: `Skill ${skill.id} has invalid mastery target ${skill.masteryTarget}` });
    }
    for (const issue of validateEvidencePolicy(skill.evidencePolicy)) issues.push({ code: "INVALID_EVIDENCE_POLICY", entityId: skill.id, message: `Skill ${skill.id}: ${issue}` });
    for (const prerequisiteId of skill.prerequisites) {
      if (prerequisiteId === skill.id) {
        issues.push({ code: "SELF_PREREQUISITE", entityId: skill.id, message: `Skill ${skill.id} requires itself` });
      } else if (!skillIds.has(prerequisiteId)) {
        issues.push({ code: "UNKNOWN_PREREQUISITE", entityId: skill.id, message: `Skill ${skill.id} references unknown prerequisite ${prerequisiteId}` });
      }
    }
    for (const supportingId of skill.supportingSkills ?? []) if (!skillIds.has(supportingId)) issues.push({ code: "UNKNOWN_SUPPORTING_SKILL", entityId: skill.id, message: `Skill ${skill.id} references unknown supporting skill ${supportingId}` });
  }

  const prerequisites = new Map(skills.map((skill) => [skill.id, skill.prerequisites]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const cyclic = new Set<string>();
  function visit(skillId: string): boolean {
    if (visiting.has(skillId)) return true;
    if (visited.has(skillId)) return cyclic.has(skillId);
    visiting.add(skillId);
    let hasCycle = false;
    for (const prerequisiteId of prerequisites.get(skillId) ?? []) {
      if (skillIds.has(prerequisiteId) && visit(prerequisiteId)) hasCycle = true;
    }
    visiting.delete(skillId);
    visited.add(skillId);
    if (hasCycle) cyclic.add(skillId);
    return hasCycle;
  }
  for (const skill of skills) visit(skill.id);
  for (const skillId of cyclic) {
    issues.push({ code: "PREREQUISITE_CYCLE", entityId: skillId, message: `Skill ${skillId} belongs to a prerequisite cycle` });
  }
  return issues;
}

export function assertValidCatalog(domains: readonly Domain[], skills: readonly Skill[]): void {
  const issues = validateCatalog(domains, skills);
  if (issues.length > 0) {
    throw new Error(`Invalid content catalog:\n${issues.map((issue) => `- ${issue.message}`).join("\n")}`);
  }
}
