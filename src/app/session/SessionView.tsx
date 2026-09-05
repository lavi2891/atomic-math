import { useEffect, useRef } from "react";
import type { PracticeSession, PracticeSessionState } from "@domain/session/practiceSession";
import { countIncorrect } from "@domain/session/practiceSession";
import type { SkillQuestionDefinition } from "@domain/session/skillQuestionSelector";
import type { AnswerResult } from "@domain/results/types";
import { createAttemptFromAnswer } from "@domain/attempts/createAttempt";
import { attemptRepository } from "@app/persistenceInstances";
import { syncCoordinator } from "@app/syncInstance";
import { colors, radius, spacing } from "@ui/tokens";
import { QuestionView } from "../questions/QuestionView";
import { useSessionEngine } from "./useSessionEngine";
import type { PersonalBest } from "@domain/personalBests/types";

import { activePracticeScopeLabel, personalBestResultLabel, sessionModeLabels } from "../../domain/session/studentSessionUx.ts";
import { learningSessionContext } from "../../domain/learningPath/sessionProgress.ts";
import { LEARNING_PATHS } from "../../content/learningPaths.ts";

import { usePracticeViewport } from "./usePracticeViewport.ts";

type Props = {
  session: PracticeSession;
  definitions: readonly SkillQuestionDefinition[];
  initialTargetDifficulty?: number;
  onSessionEnd: (state: PracticeSessionState) => void;
  previousBest?: PersonalBest | null;
};

function SessionStatus({ state, remainingSeconds }: { state: PracticeSessionState; remainingSeconds?: number }) {
  const settings = state.session.settings;
  if (settings.mode === "fixed") return <strong dir="ltr">{state.results.length + 1} / {settings.questionCount}</strong>;
  if (settings.mode === "survival") {
    const remaining = Math.max(0, settings.maxErrors - countIncorrect(state.results));
    return <strong aria-label="remaining-lives">{"❤️".repeat(remaining)}{"○".repeat(settings.maxErrors - remaining)}</strong>;
  }
  if (settings.mode === "timed") {
    const seconds = remainingSeconds ?? settings.durationSeconds;
    return <strong dir="ltr">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</strong>;
  }
  return <strong>תרגול ללא הגבלה</strong>;
}

export function SessionView({ session, definitions, initialTargetDifficulty = 0, onSessionEnd, previousBest }: Props) {
  const { sessionRef, viewport } = usePracticeViewport();
  const engine = useSessionEngine(session, definitions, initialTargetDifficulty);
  const pendingSaves = useRef<Promise<void>[]>([]);
  const didEndRef = useRef(false);
  const remainingSeconds = engine.remainingSeconds;
  const correctCount = engine.state.results.filter((result) => result.isCorrect).length;
  const pathContext = learningSessionContext(LEARNING_PATHS, session);
  const contextTitle = pathContext?.titleHe ?? activePracticeScopeLabel(session.selectedSkillIds);

  useEffect(() => {
    if (engine.state.status !== "ended" || didEndRef.current) return;
    didEndRef.current = true;
    void Promise.all(pendingSaves.current).then(() => onSessionEnd(engine.state));
  }, [engine.state, onSessionEnd]);

  if (engine.state.status === "ended" || !engine.state.currentQuestion) {
    return <div className="student-state" role="status" aria-live="polite">מסיים…</div>;
  }

  async function saveAttempt(result: AnswerResult): Promise<void> {
    const question = engine.state.currentQuestion;
    if (!question) throw new Error("Cannot create an attempt without the presented question");
    const attempt = createAttemptFromAnswer({
      session: engine.state.session,
      question,
      result,
      sequenceNumber: engine.state.results.length + 1,
      supportLevel: "independent",
    });
    await attemptRepository.saveAttempt(attempt);
    await syncCoordinator.notifyAttemptSaved();
  }

  return (
    <section ref={sessionRef} className={`practice-session${viewport.keyboardOpen ? " practice-session--keyboard" : ""}`} style={{ display: "grid", gap: viewport.keyboardOpen ? spacing.xs : spacing.md, ...(viewport.keyboardOpen ? {
      position: "fixed", top: viewport.top, left: viewport.left, width: viewport.width, height: viewport.height,
      zIndex: 30, padding: 8, boxSizing: "border-box", background: colors.bgSubtle,
      gridTemplateRows: "auto minmax(0, 1fr)",
    } : {}) }}>
      {!viewport.keyboardOpen ? <div className="practice-context"><strong title={contextTitle}>{contextTitle}</strong><small>{pathContext?.chapterNameHe ?? sessionModeLabels[session.settings.mode]}</small></div> : null}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: spacing.sm }}>
        <span className="practice-status"><SessionStatus state={engine.state} remainingSeconds={remainingSeconds} />{session.settings.mode === "timed" && !viewport.keyboardOpen ? <small style={{ display: "block", color: colors.textMuted }}>נכונות עכשיו: {correctCount}{previousBest ? ` · השיא שלך: ${personalBestResultLabel(previousBest)}` : ""}</small> : null}</span>
        {!viewport.keyboardOpen ? <button
          type="button"
          onClick={engine.actions.stopSession}
          style={{ border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: `${spacing.xs}px ${spacing.sm}px`, background: colors.bgSubtle, color: colors.text, cursor: "pointer" }}
        >
          סיום תרגול
        </button> : null}
      </header>
      <QuestionView
        key={`${engine.state.results.length}:${engine.state.currentQuestion.id}`}
        question={engine.state.currentQuestion}
        sessionMode={session.settings.mode}
        viewport={viewport}
        onEvaluated={(result) => {
          if (!engine.actions.rememberAnswer(result)) return;
          pendingSaves.current.push(saveAttempt(result));
        }}
        onNext={engine.actions.submitAnswer}
      />
    </section>
  );
}
