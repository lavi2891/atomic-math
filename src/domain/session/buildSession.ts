import type { Question } from "@domain/questions/types";
import { clamp01 } from "@shared/math";
import { pickNextQuestion, type PickConfig } from "./questionPicker";

type BuildSessionInput = {
  topicId: string;
  questions: Question[];
  length: number;
  skill01?: number;
  rated: boolean;
  pickConfig?: Partial<PickConfig>;
};

type BuildSessionOutput = {
  questions: Question[];
  initialTargetDifficulty: number;
};

type BuildSessionQuestionsInput = {
  topicQuestions: Question[];
  targetDifficulty: number;
  count: number;
  config?: Partial<PickConfig>;
};

export function buildSessionQuestions(
  input: BuildSessionQuestionsInput,
): Question[] {
  const desiredCount = Math.max(0, Math.floor(input.count));
  const remaining = [...input.topicQuestions];
  const selected: Question[] = [];
  const history = {
    questionIds: [] as string[],
    subtopics: [] as Array<string | undefined>,
  };

  while (selected.length < desiredCount && remaining.length > 0) {
    const next = pickNextQuestion({
      questions: remaining,
      targetDifficulty: input.targetDifficulty,
      history,
      config: input.config,
    });
    selected.push(next);
    history.questionIds.push(next.id);
    history.subtopics.push(next.subtopic);

    const index = remaining.findIndex((question) => question.id === next.id);
    if (index >= 0) {
      remaining.splice(index, 1);
    }
  }

  return selected;
}

export function buildSession(input: BuildSessionInput): BuildSessionOutput {
  void input.rated;
  const target = clamp01(input.skill01 ?? 0);

  const candidateQuestions = input.questions.filter(
    (question) => question.topicId === input.topicId,
  );

  return {
    questions: buildSessionQuestions({
      topicQuestions: candidateQuestions,
      targetDifficulty: target,
      count: input.length,
      config: input.pickConfig,
    }),
    initialTargetDifficulty: target,
  };
}
