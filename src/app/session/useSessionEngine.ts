import { useMemo, useState } from "react";
import type { Question } from "@domain/questions/types";
import type { AnswerResult } from "@domain/results/types";
import { pickNextQuestion } from "@domain/session/questionPicker";
import { clamp01 } from "@shared/math";

type EngineState = {
  results: AnswerResult[];
  askedQuestionIds: string[];
  targetDifficulty: number;
  currentQuestionId: string | null;
  isEnded: boolean;
};

export type SessionEngine = {
  state: {
    results: AnswerResult[];
    askedQuestionIds: string[];
    targetDifficulty: number;
    currentQuestion: Question | null;
  };
  actions: {
    submitAnswer: (result: AnswerResult) => void;
    endIfNeeded: () => void;
  };
  flags: {
    isEnded: boolean;
  };
  sessionId: string;
};

function createInitialState(
  questions: Question[],
  initialTargetDifficulty: number,
): EngineState {
  const currentQuestionId = questions[0]?.id ?? null;
  return {
    results: [],
    askedQuestionIds: [],
    targetDifficulty: clamp01(initialTargetDifficulty),
    currentQuestionId,
    isEnded: currentQuestionId === null,
  };
}

function createSessionId(): string {
  return `sess-${Math.random().toString(36).slice(2, 10)}`;
}

export function useSessionEngine(
  questions: Question[],
  initialTargetDifficulty = 0,
): SessionEngine {
  const [sessionId] = useState<string>(createSessionId);
  const [engineState, setEngineState] = useState<EngineState>(() =>
    createInitialState(questions, initialTargetDifficulty),
  );

  const currentQuestion = useMemo(() => {
    if (!engineState.currentQuestionId) return null;
    return (
      questions.find((item) => item.id === engineState.currentQuestionId) ??
      null
    );
  }, [engineState.currentQuestionId, questions]);

  function submitAnswer(result: AnswerResult): void {
    setEngineState((prev) => {
      const nextResults = [...prev.results, { ...result, sessionId }];
      const nextTargetDifficulty = clamp01(
        prev.targetDifficulty + (result.isCorrect ? 0.05 : -0.05),
      );
      const nextAskedQuestionIds = [
        ...prev.askedQuestionIds,
        result.questionId,
      ];
      const questionById = new Map(
        questions.map((question) => [question.id, question]),
      );
      const historySubtopics = nextAskedQuestionIds.map(
        (questionId) => questionById.get(questionId)?.subtopic,
      );
      const remainingQuestions = questions.filter(
        (item) => !nextAskedQuestionIds.includes(item.id),
      );
      const nextQuestion =
        remainingQuestions.length === 0
          ? null
          : pickNextQuestion({
              questions: remainingQuestions,
              targetDifficulty: nextTargetDifficulty,
              history: {
                questionIds: nextAskedQuestionIds,
                subtopics: historySubtopics,
              },
            });

      return {
        results: nextResults,
        askedQuestionIds: nextAskedQuestionIds,
        targetDifficulty: nextTargetDifficulty,
        currentQuestionId: nextQuestion?.id ?? null,
        isEnded: nextQuestion === null,
      };
    });
  }

  function endIfNeeded(): void {
    setEngineState((prev) => {
      if (prev.isEnded) return prev;
      if (currentQuestion !== null) return prev;
      return {
        ...prev,
        isEnded: true,
      };
    });
  }

  return {
    state: {
      results: engineState.results,
      askedQuestionIds: engineState.askedQuestionIds,
      targetDifficulty: engineState.targetDifficulty,
      currentQuestion,
    },
    actions: {
      submitAnswer,
      endIfNeeded,
    },
    flags: {
      isEnded: engineState.isEnded,
    },
    sessionId,
  };
}
