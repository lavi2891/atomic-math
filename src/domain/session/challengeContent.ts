import type { Skill } from "../../content/catalog/types.ts";
import { getChallengeProfile } from "../../content/catalog/challengeProfiles.ts";
import { questionCategory } from "../questions/categories.ts";
import type { SessionSettings } from "./practiceSession.ts";
import type { SkillQuestionDefinition } from "./skillQuestionSelector.ts";

export function modeEligible(skill: Skill, settings: SessionSettings): boolean {
  if (settings.mode === "practice") return true;
  if (settings.mode === "fixed") return skill.modes.fixed;
  return settings.mode === "timed" ? !!skill.modes.timedProfileId : !!skill.modes.survivalProfileId;
}

export function filterChallengeContent(settings: SessionSettings, skills: readonly Skill[], definitions: readonly SkillQuestionDefinition[]): SkillQuestionDefinition[] {
  if (settings.mode === "practice" || settings.mode === "fixed") return [...definitions];
  const selectedProfileIds = new Set(skills.map((skill) => settings.mode === "timed" ? skill.modes.timedProfileId : skill.modes.survivalProfileId));
  if (selectedProfileIds.size !== 1) return [];
  const profile = getChallengeProfile([...selectedProfileIds][0]);
  if (!profile || profile.mode !== settings.mode) return [];
  return definitions.filter((definition) => profile.allowedCategories.includes(questionCategory(definition)) && !!definition.difficultyBand && profile.allowedBands.includes(definition.difficultyBand) && (!profile.shortItemsOnly || definition.tags?.includes("short-item")));
}

export function challengeTargetDifficulty(settings: SessionSettings, skills: readonly Skill[], questionIndex: number, fallback: number): number {
  if (settings.mode !== "timed" && settings.mode !== "survival") return fallback;
  const profileId = settings.mode === "timed" ? skills[0]?.modes.timedProfileId : skills[0]?.modes.survivalProfileId;
  const profile = getChallengeProfile(profileId);
  const band = profile?.progression[Math.min(questionIndex, (profile?.progression.length ?? 1) - 1)];
  return band ? { A: .12, B: .38, C: .65, D: .9 }[band] : fallback;
}
