import type { Question } from "../questions/types.ts";
import { pickBalancedSkill } from "./balancedSkills.ts";
import type { SkillQuestionSelector } from "./skillQuestionSelector.ts";

/** Selection failure is recoverable, never a session-completion signal. */
export function supplySessionQuestion(input: {
  selector: Pick<SkillQuestionSelector, "pick">;
  skillIds: readonly string[];
  askedSkillIds: readonly string[];
  targetDifficulty: number;
  cachedQuestions: readonly Question[];
  lastQuestionId?: string;
}): { question: Question; skillId: string } {
  const remaining = [...input.skillIds];
  while (remaining.length) {
    const skillId = pickBalancedSkill(remaining, [...input.askedSkillIds]);
    remaining.splice(remaining.indexOf(skillId), 1);
    try {
      const question = input.selector.pick(skillId, input.targetDifficulty);
      return { question, skillId };
    } catch {
      // Try another skill inside the exact selected scope before reusing an instance.
    }
  }
  const cached = input.cachedQuestions.filter((question) => question.skillId && input.skillIds.includes(question.skillId));
  const question = cached.find((item) => item.id !== input.lastQuestionId) ?? cached[0];
  if (question?.skillId) return { question, skillId: question.skillId };
  // No valid instance has ever existed: the error boundary shows an application
  // error, rather than turning an unavailable question into a normal summary.
  throw new Error("Unable to prepare any question in the selected session scope");
}
