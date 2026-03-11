import type { Question } from "@domain/questions/types";

type Props = {
  question: Question;
};

export function DevQuestionDebug({ question }: Props) {
  void question;

  if (!import.meta.env.DEV) {
    return null;
  }

  return null;
}
