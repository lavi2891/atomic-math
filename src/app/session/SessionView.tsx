import { useEffect, useId, useRef, useState } from "react";
import type { AnswerResult } from "@domain/results/types";
import type { Question } from "@domain/questions/types";
import { clamp01 } from "@shared/math";
import { QuestionView } from "../questions/QuestionView";

type Props = {
  questions: Question[];
  initialTargetDifficulty?: number;
  onSessionEnd: (results: AnswerResult[]) => void;
};

function getQuestionDifficulty(question: Question): number {
  return clamp01(question.difficulty ?? 0.5);
}

function pickClosestByDifficulty(
  questions: Question[],
  targetDifficulty: number,
): Question | null {
  if (questions.length === 0) return null;

  const sorted = [...questions].sort((a, b) => {
    const distanceA = Math.abs(getQuestionDifficulty(a) - targetDifficulty);
    const distanceB = Math.abs(getQuestionDifficulty(b) - targetDifficulty);
    return distanceA - distanceB;
  });

  return sorted[0] ?? null;
}

export function SessionView({
  questions,
  initialTargetDifficulty = 0.5,
  onSessionEnd,
}: Props) {
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [askedQuestionIds, setAskedQuestionIds] = useState<string[]>([]);
  const [targetDifficulty, setTargetDifficulty] = useState(
    clamp01(initialTargetDifficulty),
  );
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    questions[0]?.id ?? null,
  );
  const didEndRef = useRef(false);
  const sessionId = `sess-${useId()}`;

  useEffect(() => {
    setResults([]);
    setAskedQuestionIds([]);
    setTargetDifficulty(clamp01(initialTargetDifficulty));
    setCurrentQuestionId(questions[0]?.id ?? null);
    didEndRef.current = false;
  }, [initialTargetDifficulty, questions]);

  const question = currentQuestionId
    ? questions.find((item) => item.id === currentQuestionId) ?? null
    : null;
  const isEnded = !question;

  useEffect(() => {
    if (!isEnded) return;
    if (didEndRef.current) return;
    didEndRef.current = true;
    onSessionEnd(results);
  }, [isEnded, onSessionEnd, results]);

  if (isEnded) return <div>מסיים…</div>;

  function handleNext(result: AnswerResult) {
    setResults((prev) => [...prev, { ...result, sessionId }]);

    const nextTarget = clamp01(
      targetDifficulty + (result.isCorrect ? 0.05 : -0.05),
    );
    setTargetDifficulty(nextTarget);

    const nextAskedIds = [...askedQuestionIds, result.questionId];
    setAskedQuestionIds(nextAskedIds);

    const remainingQuestions = questions.filter(
      (item) => !nextAskedIds.includes(item.id),
    );
    const nextQuestion = pickClosestByDifficulty(remainingQuestions, nextTarget);
    setCurrentQuestionId(nextQuestion?.id ?? null);
  }

  return (
    <QuestionView
      key={question.id}
      question={question}
      rated
      onNext={handleNext}
    />
  );
}
