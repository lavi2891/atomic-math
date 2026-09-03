import { useMemo, useReducer, useState } from "react";
import type { Question } from "@domain/questions/types";
import type { AnswerResult } from "@domain/results/types";
import {
  createInitialSessionState,
  practiceSessionReducer,
  type PracticeSession,
  type PracticeSessionState,
} from "@domain/session/practiceSession";
import { buildBalancedSkillPlan, pickBalancedSkill } from "@domain/session/balancedSkills";
import {
  SkillQuestionSelector,
  type SkillQuestionDefinition,
} from "@domain/session/skillQuestionSelector";
import { challengeTargetDifficulty, filterChallengeContent } from "@domain/session/challengeContent";
import { SKILLS } from "../../content/catalog/index.ts";

export type SessionEngine = {
  state: PracticeSessionState & { currentQuestion: Question | null };
  actions: {
    submitAnswer: (result: AnswerResult) => void;
    timerExpired: () => void;
    stopSession: () => void;
  };
};

export function useSessionEngine(
  session: PracticeSession,
  definitions: readonly SkillQuestionDefinition[],
  initialTargetDifficulty = 0,
): SessionEngine {
  const [selector] = useState(() => {
    const selected = SKILLS.filter((skill) => session.selectedSkillIds.includes(skill.id));
    return new SkillQuestionSelector(filterChallengeContent(session.settings, selected, definitions));
  });
  const selectedSkills = SKILLS.filter((skill) => session.selectedSkillIds.includes(skill.id));
  const [monotonicStartedAt] = useState(() => performance.now());
  const [questionsById] = useState(() => new Map<string, Question>());
  const [fixedPlan] = useState(() =>
    session.settings.mode === "fixed"
      ? buildBalancedSkillPlan(session.selectedSkillIds, session.settings.questionCount)
      : null,
  );

  function chooseQuestion(state: PracticeSessionState): { question: Question; skillId: string } {
    const skillId = fixedPlan
      ? fixedPlan[state.results.length]!
      : pickBalancedSkill(session.selectedSkillIds, state.askedSkillIds);
    const targetDifficulty = challengeTargetDifficulty(session.settings, selectedSkills, state.results.length, state.targetDifficulty);
    const question = selector.pick(skillId, targetDifficulty);
    questionsById.set(question.id, question);
    return { question, skillId };
  }

  const [state, dispatch] = useReducer(
    practiceSessionReducer,
    undefined,
    (): PracticeSessionState => {
      const initial = createInitialSessionState(session, initialTargetDifficulty);
      const { question, skillId } = chooseQuestion(initial);
      return practiceSessionReducer(initial, {
        type: "START",
        questionId: question.id,
        skillId,
      });
    },
  );

  const currentQuestion = useMemo(
    () => (state.currentQuestionId ? questionsById.get(state.currentQuestionId) ?? null : null),
    [questionsById, state.currentQuestionId],
  );

  function submitAnswer(result: AnswerResult): void {
    const action = { type: "ANSWER_SUBMITTED" as const, result, elapsedMs: Math.max(0, performance.now() - monotonicStartedAt) };
    const answered = practiceSessionReducer(state, action);
    dispatch(action);
    if (answered.status !== "active") return;
    try {
      const { question, skillId } = chooseQuestion(answered);
      dispatch({ type: "NEXT_QUESTION", questionId: question.id, skillId });
    } catch {
      dispatch({ type: "STOP_SESSION", at: Date.now(), reason: "no_questions" });
    }
  }

  return {
    state: { ...state, currentQuestion },
    actions: {
      submitAnswer,
      timerExpired: () => dispatch({ type: "TIMER_EXPIRED", at: Date.now() }),
      stopSession: () => dispatch({ type: "STOP_SESSION", at: Date.now() }),
    },
  };
}
