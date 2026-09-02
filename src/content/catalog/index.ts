import { DOMAINS } from "./domains.ts";
import { SKILLS } from "./skills.ts";
import { assertValidCatalog } from "./validateCatalog.ts";
import type { Domain, DomainId, Skill, SkillId } from "./types.ts";

assertValidCatalog(DOMAINS, SKILLS);

export { DOMAINS, SKILLS };
export type { Domain, DomainId, Skill, SkillId };

export function listDomains(): Domain[] {
  return [...DOMAINS].sort((left, right) => left.order - right.order);
}

export function listSkillsByDomain(domainId: DomainId): Skill[] {
  return SKILLS.filter((skill) => skill.domainId === domainId).sort((left, right) => left.order - right.order);
}

export function getSkillById(skillId: SkillId): Skill | undefined {
  return SKILLS.find((skill) => skill.id === skillId);
}
