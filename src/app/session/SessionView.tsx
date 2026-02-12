import { useId, useState } from "react";
import type { AnswerResult } from "@domain/results/types";
import type { Question } from "@domain/questions/types";
import { QuestionView } from "../questions/QuestionView";

type Props = {
  questions: Question[];
  onSessionEnd: (results: AnswerResult[]) => void;
};

export function SessionView({ questions, onSessionEnd }: Props) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const sessionId = `sess-${useId()}`;

  const question = questions[index];

  if (!question) {
    // session finished
    onSessionEnd(results);
    return null;
  }

  function handleNext(result: AnswerResult) {
    setResults((prev) => [...prev, { ...result, sessionId }]);
    setIndex((i) => i + 1);
  }

  return (
    <QuestionView key={question.id} question={question} onNext={handleNext} />
  );
}
