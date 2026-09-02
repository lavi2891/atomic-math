import { useEffect, useRef, useState } from "react";
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

type Props = {
  session: PracticeSession;
  definitions: readonly SkillQuestionDefinition[];
  initialTargetDifficulty?: number;
  onSessionEnd: (state: PracticeSessionState) => void;
};

function SessionStatus({ state, remainingSeconds }: { state: PracticeSessionState; remainingSeconds?: number }) {
  const settings = state.session.settings;
  if (settings.mode === "fixed") return <strong>{state.results.length + 1} / {settings.questionCount}</strong>;
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

export function SessionView({ session, definitions, initialTargetDifficulty = 0, onSessionEnd }: Props) {
  const engine = useSessionEngine(session, definitions, initialTargetDifficulty);
  const didEndRef = useRef(false);
  const [now, setNow] = useState(() => Date.now());
  const durationSeconds = session.settings.mode === "timed" ? session.settings.durationSeconds : undefined;
  const remainingSeconds = durationSeconds === undefined
    ? undefined
    : Math.max(0, durationSeconds - Math.floor((now - session.startedAt) / 1000));

  useEffect(() => {
    if (durationSeconds === undefined || engine.state.status === "ended") return;
    const timer = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [durationSeconds, engine.state.status]);

  useEffect(() => {
    if (remainingSeconds !== 0 || engine.state.status === "ended") return;
    engine.actions.timerExpired();
  }, [engine.actions, engine.state.status, remainingSeconds]);

  useEffect(() => {
    if (engine.state.status !== "ended" || didEndRef.current) return;
    didEndRef.current = true;
    onSessionEnd(engine.state);
  }, [engine.state, onSessionEnd]);

  if (engine.state.status === "ended" || !engine.state.currentQuestion) {
    return <div>מסיים…</div>;
  }

  async function saveAttempt(result: AnswerResult): Promise<void> {
    const question = engine.state.currentQuestion;
    if (!question) throw new Error("Cannot create an attempt without the presented question");
    const attempt = createAttemptFromAnswer({
      session,
      question,
      result,
      sequenceNumber: engine.state.results.length + 1,
      supportLevel: "independent",
    });
    await attemptRepository.saveAttempt(attempt);
    await syncCoordinator.notifyAttemptSaved();
  }

  return (
    <section style={{ display: "grid", gap: spacing.md }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: spacing.sm }}>
        <SessionStatus state={engine.state} remainingSeconds={remainingSeconds} />
        <button
          type="button"
          onClick={engine.actions.stopSession}
          style={{ border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: `${spacing.xs}px ${spacing.sm}px`, background: colors.bgSubtle, color: colors.text, cursor: "pointer" }}
        >
          סיום תרגול
        </button>
      </header>
      <QuestionView
        key={engine.state.currentQuestion.id}
        question={engine.state.currentQuestion}
        onEvaluated={(result) => void saveAttempt(result)}
        onNext={engine.actions.submitAnswer}
      />
    </section>
  );
}
