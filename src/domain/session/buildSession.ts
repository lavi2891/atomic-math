import type { Question } from "@domain/questions/types";
import { clamp01 } from "@shared/math";

type BuildSessionInput = {
  topicId: string;
  questions: Question[];
  length: number;
  skill01?: number;
  rated: boolean;
};

type BuildSessionOutput = {
  questions: Question[];
  initialTargetDifficulty: number;
};

function getDifficulty01(question: Question): number {
  return clamp01(question.difficulty ?? 0.5);
}

export function buildSession(input: BuildSessionInput): BuildSessionOutput {
  void input.rated;

  const target = clamp01(input.skill01 ?? 0.5);
  const desiredLength = Math.max(0, Math.floor(input.length));

  const candidateQuestions = input.questions.filter(
    (question) => question.topicId === input.topicId,
  );

  const sorted = [...candidateQuestions].sort((a, b) => {
    const aDistance = Math.abs(getDifficulty01(a) - target);
    const bDistance = Math.abs(getDifficulty01(b) - target);
    return aDistance - bDistance;
  });

  return {
    questions: sorted.slice(0, desiredLength),
    initialTargetDifficulty: target,
  };
}
