import type { AnswerResult } from "../results/types.ts";
import type { TimedDurationSeconds } from "./config.ts";

export const FIXED_QUESTION_COUNTS = [5, 10, 15, 20] as const;
export type FixedQuestionCount = (typeof FIXED_QUESTION_COUNTS)[number];
export type SessionMode = "fixed" | "survival" | "timed" | "practice";
export type SessionEndReason = "completed" | "errors_exhausted" | "timer_expired" | "stopped" | "no_questions";

export type SessionSettings =
  | { mode: "fixed"; questionCount: FixedQuestionCount }
  | { mode: "survival"; maxErrors: number }
  | { mode: "timed"; durationSeconds: TimedDurationSeconds }
  | { mode: "practice" };

export interface PracticeSession {
  id: string;
  studentId: string;
  selectedSkillIds: string[];
  settings: SessionSettings;
  startedAt: number;
  source?: "freePractice" | "assignment";
  assignmentId?: string;
}

export type PracticeSessionState = {
  session: PracticeSession;
  status: "idle" | "active" | "ended";
  results: AnswerResult[];
  currentQuestionId: string | null;
  currentSkillId: string | null;
  askedQuestionIds: string[];
  askedSkillIds: string[];
  targetDifficulty: number;
  endedAt?: number;
  /** Monotonic elapsed time captured by the active client; background time counts. */
  elapsedDurationMs?: number;
  endReason?: SessionEndReason;
};

export type PracticeSessionAction =
  | { type: "START"; questionId: string; skillId: string }
  | { type: "ANSWER_SUBMITTED"; result: AnswerResult; elapsedMs?: number }
  | { type: "NEXT_QUESTION"; questionId: string; skillId: string }
  | { type: "TIMER_EXPIRED"; at: number; elapsedMs?: number }
  | { type: "STOP_SESSION"; at: number; elapsedMs?: number; reason?: "stopped" };

export function validateSelectedSkills(skillIds: readonly string[]): string[] {
  const normalized = [...new Set(skillIds.filter((id) => id.trim().length > 0))];
  if (normalized.length === 0) throw new Error("At least one skill must be selected");
  return normalized;
}

export function createPracticeSession(input: Omit<PracticeSession, "selectedSkillIds"> & { selectedSkillIds: readonly string[] }): PracticeSession {
  return { ...input, selectedSkillIds: validateSelectedSkills(input.selectedSkillIds) };
}

export function createInitialSessionState(session: PracticeSession, targetDifficulty = 0): PracticeSessionState {
  return {
    session,
    status: "idle",
    results: [],
    currentQuestionId: null,
    currentSkillId: null,
    askedQuestionIds: [],
    askedSkillIds: [],
    targetDifficulty: Math.max(0, Math.min(1, targetDifficulty)),
  };
}

export function countIncorrect(results: readonly AnswerResult[]): number {
  return results.reduce((count, result) => count + (result.isCorrect ? 0 : 1), 0);
}

export function isSessionComplete(settings: SessionSettings, results: readonly AnswerResult[]): boolean {
  if (settings.mode === "fixed") return results.length >= settings.questionCount;
  if (settings.mode === "survival") return countIncorrect(results) >= settings.maxErrors;
  return false;
}

function completionReason(settings: SessionSettings): SessionEndReason {
  return settings.mode === "survival" ? "errors_exhausted" : "completed";
}

export function practiceSessionReducer(state: PracticeSessionState, action: PracticeSessionAction): PracticeSessionState {
  if (state.status === "ended") return state;
  switch (action.type) {
    case "START":
      if (state.status !== "idle") return state;
      return { ...state, status: "active", currentQuestionId: action.questionId, currentSkillId: action.skillId };
    case "ANSWER_SUBMITTED": {
      if (state.status !== "active" || state.currentQuestionId !== action.result.questionId) return state;
      if (state.session.settings.mode === "timed" && action.result.timestamp >= state.session.startedAt + state.session.settings.durationSeconds * 1000) return state;
      const result = { ...action.result, sessionId: state.session.id };
      const results = [...state.results, result];
      const answeredState: PracticeSessionState = {
        ...state,
        results,
        askedQuestionIds: [...state.askedQuestionIds, action.result.questionId],
        askedSkillIds: state.currentSkillId ? [...state.askedSkillIds, state.currentSkillId] : state.askedSkillIds,
        currentQuestionId: null,
        currentSkillId: null,
        targetDifficulty: Math.max(0, Math.min(1, state.targetDifficulty + (result.isCorrect ? 0.05 : -0.05))),
      };
      return isSessionComplete(state.session.settings, results)
        ? { ...answeredState, status: "ended", endedAt: result.timestamp, elapsedDurationMs: action.elapsedMs, endReason: completionReason(state.session.settings) }
        : answeredState;
    }
    case "NEXT_QUESTION":
      if (state.status !== "active" || state.currentQuestionId !== null) return state;
      return { ...state, currentQuestionId: action.questionId, currentSkillId: action.skillId };
    case "TIMER_EXPIRED":
      return state.status === "active" && state.session.settings.mode === "timed" && (action.elapsedMs ?? action.at - state.session.startedAt) >= state.session.settings.durationSeconds * 1000
        ? { ...state, status: "ended", currentQuestionId: null, currentSkillId: null, endedAt: action.at, elapsedDurationMs: action.elapsedMs ?? action.at - state.session.startedAt, endReason: "timer_expired" }
        : state;
    case "STOP_SESSION":
      // Reject legacy/internal completion reasons even across an untyped boundary.
      if (action.reason !== undefined && action.reason !== "stopped") return state;
      return { ...state, status: "ended", currentQuestionId: null, currentSkillId: null, endedAt: action.at, elapsedDurationMs: action.elapsedMs, endReason: "stopped" };
  }
}

export function isSuccessfulSessionCompletion(state: PracticeSessionState): boolean {
  if (state.status !== "ended") return false;
  const settings = state.session.settings;
  if (settings.mode === "timed") return state.endReason === "timer_expired"
    && (state.elapsedDurationMs ?? (state.endedAt ?? state.session.startedAt) - state.session.startedAt) >= settings.durationSeconds * 1000;
  if (settings.mode === "fixed") return state.endReason === "completed" && state.results.length >= settings.questionCount;
  if (settings.mode === "survival") return state.endReason === "errors_exhausted" && countIncorrect(state.results) >= settings.maxErrors;
  return false;
}
