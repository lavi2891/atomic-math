import { validateSelectedSkills } from "./practiceSession.ts";

export type RandomSource = () => number;

export function shuffle<T>(values: readonly T[], rng: RandomSource = Math.random): T[] {
  const shuffled = [...values];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex]!, shuffled[index]!];
  }
  return shuffled;
}

export function buildBalancedSkillPlan(skillIds: readonly string[], questionCount: number, rng: RandomSource = Math.random): string[] {
  const skills = validateSelectedSkills(skillIds);
  const count = Math.max(0, Math.floor(questionCount));
  const plan = Array.from({ length: count }, (_, index) => skills[index % skills.length]!);
  return shuffle(plan, rng);
}

export function pickBalancedSkill(skillIds: readonly string[], askedSkillIds: readonly string[], rng: RandomSource = Math.random): string {
  const skills = validateSelectedSkills(skillIds);
  const counts = new Map(skills.map((skillId) => [skillId, 0]));
  for (const skillId of askedSkillIds) {
    if (counts.has(skillId)) counts.set(skillId, (counts.get(skillId) ?? 0) + 1);
  }
  const minimum = Math.min(...counts.values());
  const candidates = skills.filter((skillId) => counts.get(skillId) === minimum);
  return candidates[Math.floor(rng() * candidates.length)]!;
}
