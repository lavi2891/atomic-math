import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { Question } from "@domain/questions/types";
import type { AnswerResult } from "@domain/results/types";
import { createInitialSessionState, practiceSessionReducer, type PracticeSession, type PracticeSessionState } from "@domain/session/practiceSession";
import { buildBalancedSkillPlan } from "@domain/session/balancedSkills";
import { SkillQuestionSelector, type SkillQuestionDefinition } from "@domain/session/skillQuestionSelector";
import { challengeTargetDifficulty, filterChallengeContent } from "@domain/session/challengeContent";
import { supplySessionQuestion } from "../../domain/session/questionSupply.ts";
import { createSessionClock } from "../../domain/session/sessionClock.ts";
import { SKILLS } from "../../content/catalog/index.ts";

export type SessionEngine = {
  state: PracticeSessionState & { currentQuestion: Question | null };
  remainingSeconds?: number;
  actions: {
    rememberAnswer: (result: AnswerResult) => boolean;
    submitAnswer: (result: AnswerResult) => void;
    timerExpired: () => void;
    stopSession: () => void;
  };
};

export function useSessionEngine(inputSession: PracticeSession, definitions: readonly SkillQuestionDefinition[], initialTargetDifficulty = 0): SessionEngine {
  const [session] = useState(() => ({ ...inputSession, selectedSkillIds: [...inputSession.selectedSkillIds], settings: { ...inputSession.settings } }));
  const pendingAnswer = useRef<AnswerResult | null>(null);
  const selectedSkills = SKILLS.filter((skill) => session.selectedSkillIds.includes(skill.id));
  const [selector] = useState(() => new SkillQuestionSelector(filterChallengeContent(session.settings, selectedSkills, definitions)));
  const [questionsById] = useState(() => new Map<string, Question>());
  const [fixedPlan] = useState(() => session.settings.mode === "fixed" ? buildBalancedSkillPlan(session.selectedSkillIds, session.settings.questionCount) : null);

  function chooseQuestion(state: PracticeSessionState): { question: Question; skillId: string } {
    const targetDifficulty = challengeTargetDifficulty(session.settings, selectedSkills, state.results.length, state.targetDifficulty);
    const chosen = supplySessionQuestion({
      selector, targetDifficulty,
      skillIds: fixedPlan ? [fixedPlan[state.results.length]!] : session.selectedSkillIds,
      askedSkillIds: state.askedSkillIds,
      cachedQuestions: [...questionsById.values()],
      lastQuestionId: state.results.at(-1)?.questionId,
    });
    questionsById.set(chosen.question.id, chosen.question);
    return chosen;
  }

  const [initial] = useState(() => {
    const initialState = createInitialSessionState(session, initialTargetDifficulty);
    const { question, skillId } = chooseQuestion(initialState);
    const clock = createSessionClock();
    const state = practiceSessionReducer({ ...initialState, session: { ...session, startedAt: clock.startedAt } }, { type: "START", questionId: question.id, skillId });
    return { state, clock };
  });
  const [state, dispatch] = useReducer(practiceSessionReducer, initial.state);
  const [elapsedMs, setElapsedMs] = useState(0);
  const durationMs = session.settings.mode === "timed" ? session.settings.durationSeconds * 1000 : undefined;
  const clock = initial.clock;

  // Only this deadline (or an explicit stop) terminates a running timed session.
  useEffect(() => {
    if (durationMs === undefined || state.status !== "active") return;
    const tick = () => {
      const elapsed = clock.elapsedMs();
      setElapsedMs(elapsed);
      if (elapsed < durationMs) return;
      if (pendingAnswer.current) dispatch({ type: "ANSWER_SUBMITTED", result: pendingAnswer.current });
      pendingAnswer.current = null;
      dispatch({ type: "TIMER_EXPIRED", at: clock.timestamp(), elapsedMs: elapsed });
    };
    const timer = window.setInterval(tick, 100);
    window.addEventListener("pageshow", tick);
    if (typeof document !== "undefined") document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("pageshow", tick);
      if (typeof document !== "undefined") document.removeEventListener("visibilitychange", tick);
    };
  }, [clock, durationMs, state.status]);

  const currentQuestion = useMemo(() => state.currentQuestionId ? questionsById.get(state.currentQuestionId) ?? null : null, [questionsById, state.currentQuestionId]);

  function timerExpired(): void {
    const elapsed = clock.elapsedMs();
    if (durationMs === undefined || elapsed < durationMs) return;
    if (pendingAnswer.current) dispatch({ type: "ANSWER_SUBMITTED", result: pendingAnswer.current });
    pendingAnswer.current = null;
    dispatch({ type: "TIMER_EXPIRED", at: clock.timestamp(), elapsedMs: elapsed });
  }

  function submitAnswer(result: AnswerResult): void {
    if (durationMs !== undefined && clock.elapsedMs() >= durationMs) { timerExpired(); return; }
    const action = { type: "ANSWER_SUBMITTED" as const, result: pendingAnswer.current ?? result, elapsedMs: clock.elapsedMs() };
    pendingAnswer.current = null;
    const answered = practiceSessionReducer(state, action);
    if (answered === state) return;
    // Supply never reports successful completion. If selecting fails, reuse a
    // known valid question from the same scope; unrecoverable errors reach UI.
    const next = answered.status === "active" ? chooseQuestion(answered) : null;
    dispatch(action);
    if (next) dispatch({ type: "NEXT_QUESTION", questionId: next.question.id, skillId: next.skillId });
  }

  return {
    state: { ...state, currentQuestion },
    remainingSeconds: durationMs === undefined ? undefined : Math.max(0, Math.ceil((durationMs - elapsedMs) / 1000)),
    actions: {
      rememberAnswer: (result) => {
        if (state.status !== "active" || pendingAnswer.current) return false;
        if (durationMs !== undefined && clock.elapsedMs() >= durationMs) { timerExpired(); return false; }
        pendingAnswer.current = { ...result, timestamp: clock.timestamp(), questionSnapshot: currentQuestion ?? undefined };
        return true;
      },
      submitAnswer,
      timerExpired,
      stopSession: () => {
        if (pendingAnswer.current) dispatch({ type: "ANSWER_SUBMITTED", result: pendingAnswer.current });
        pendingAnswer.current = null;
        dispatch({ type: "STOP_SESSION", at: clock.timestamp(), elapsedMs: clock.elapsedMs() });
      },
    },
  };
}
