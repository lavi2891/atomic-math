import type { Domain, Skill } from "../../content/catalog/types.ts";
import type { SkillQuestionDefinition } from "../session/skillQuestionSelector.ts";
import { readySkillIds } from "../../content/readiness.ts";

export function contentBackedCatalog(
  domains: readonly Domain[],
  skills: readonly Skill[],
  definitions: readonly SkillQuestionDefinition[],
): Array<{ domain: Domain; skills: Skill[] }> {
  const ready = readySkillIds(definitions);
  const available = new Set(definitions.map((definition) => definition.skillId).filter((id) => ready.has(id)));
  return domains.map((domain) => ({
    domain,
    skills: skills.filter((skill) => skill.domainId === domain.id && available.has(skill.id) && skill.active),
  })).filter((entry) => entry.domain.active && entry.skills.length > 0);
}
