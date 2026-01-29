export type QuestionType = "numeric" | "singleChoice" | "multiChoice"; // TODO: expression, drag & drop, desmos?, geometry?

export type OptionContent =
  | { kind: "text"; value: string; key?: string }
  | { kind: "math"; latex: string; display?: boolean; key?: string };

export interface QuestionSeeds {
  difficulty?: number;
  timeMs?: number;
}

export interface BaseQuestion {
  id: string;
  topicId: string;
  type: QuestionType;
  prompt: OptionContent[]; // what the student sees
  version?: number;
  tags?: string[];
  seeds?: QuestionSeeds;
  hints?: OptionContent[][];
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  answer: number;
  tolerance?: number;
  input?: { allowMinus?: boolean; allowDecimal?: boolean }; // future-proof UX hints
}

export interface ChoiceOption {
  id: string;
  content: OptionContent[];
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "singleChoice";
  options: ChoiceOption[];
  correctOptionId: string;
}

export interface MultiChoiceQuestion extends BaseQuestion {
  type: "multiChoice";
  options: ChoiceOption[];
  correctOptionIds: string[]; // order irrelevant
}

export type Question =
  | NumericQuestion
  | SingleChoiceQuestion
  | MultiChoiceQuestion;

export type RawAnswerByType = {
  numeric: { value: string };
  singleChoice: { optionId: string };
  multiChoice: { optionIds: string[] };
};

export type RawAnswer<T extends QuestionType = QuestionType> = {
  questionType: T;
  data: RawAnswerByType[T];
};
