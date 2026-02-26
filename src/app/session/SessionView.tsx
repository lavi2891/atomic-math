import { useEffect, useRef } from "react";
import type { AnswerResult } from "@domain/results/types";
import type { Question } from "@domain/questions/types";
import { statsRepo } from "@app/statsRepoInstance";
import { QuestionView } from "../questions/QuestionView";
import { useSessionEngine } from "./useSessionEngine";

type Props = {
  questions: Question[];
  initialTargetDifficulty?: number;
  onSessionEnd: (results: AnswerResult[]) => void;
};

export function SessionView({
  questions,
  initialTargetDifficulty = 0.5,
  onSessionEnd,
}: Props) {
  const engine = useSessionEngine(questions, initialTargetDifficulty);
  const didEndRef = useRef(false);

  useEffect(() => {
    didEndRef.current = false;
  }, [engine.sessionId]);

  useEffect(() => {
    if (!engine.flags.isEnded) return;
    if (didEndRef.current) return;
    didEndRef.current = true;
    onSessionEnd(engine.state.results);
  }, [engine.flags.isEnded, engine.state.results, onSessionEnd]);

  if (engine.flags.isEnded || !engine.state.currentQuestion) {
    return <div>מסיים…</div>;
  }

  return (
    <QuestionView
      key={engine.state.currentQuestion.id}
      question={engine.state.currentQuestion}
      rated
      onAttempt={(event) => statsRepo.recordAttempt(event)}
      onNext={engine.actions.submitAnswer}
    />
  );
}
