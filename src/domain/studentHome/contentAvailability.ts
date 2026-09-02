import type { Domain, Skill } from "../../content/catalog/types.ts";
import type { SkillQuestionDefinition } from "../session/skillQuestionSelector.ts";

export function contentBackedCatalog(
  domains: readonly Domain[],
  skills: readonly Skill[],
  definitions: readonly SkillQuestionDefinition[],
): Array<{ domain: Domain; skills: Skill[] }> {
  const available = new Set(definitions.map((definition) => definition.skillId));
  return domains.map((domain) => ({
    domain,
    skills: skills.filter((skill) => skill.domainId === domain.id && available.has(skill.id) && skill.active),
  })).filter((entry) => entry.domain.active && entry.skills.length > 0);
}
