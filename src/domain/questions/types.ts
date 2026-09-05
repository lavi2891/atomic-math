import type { QuestionCategory } from "./categories.ts";
import type { DifficultyBand, SkillId } from "../../content/catalog/types.ts";
import type { LearningMedia } from "../media/types.ts";

export type QuestionType = "numeric" | "singleChoice" | "multiChoice"; // TODO: expression, drag & drop, desmos?, geometry?
export type LiteracyDemand = "none" | "light" | "moderate" | "high";

export type QuestionAuthoringMode = "generated" | "curated";
export type QuestionCurationReason =
  | "misconception"
  | "edge-case"
  | "representation"
  | "regression"
  | "deliberate-example"
  | "other";

export type OptionContent =
  | { kind: "text"; value: string; key?: string }
  | { kind: "math"; latex: string; display?: boolean; key?: string };

export interface QuestionSeeds {
  difficulty?: number;
  difficultyBand?: DifficultyBand;
  timeMs?: number;
}

export interface BaseQuestion {
  id: string;
  topicId: string;
  /** Required at the normal-practice boundary; optional here only for isolated legacy imports and playground content. */
  skillId?: string;
  type: QuestionType;
  /** Optional only for backwards-compatible content; omitted values migrate to calculation. */
  category?: QuestionCategory;
  /** Reading/language demand, independent of mathematical category and difficulty. */
  literacyDemand?: LiteracyDemand;
  difficulty?: number;
  difficultyBand?: DifficultyBand;
  prompt: OptionContent[]; // what the student sees
  media?: LearningMedia;
  subtopic?: string;
  misconceptions?: string[];
  version?: number;
  tags?: string[];
  seeds?: QuestionSeeds;
  hints?: OptionContent[][];
  /** Explicit content-authoring intent; optional only for legacy/playground content. */
  authoringMode?: QuestionAuthoringMode;
  /** Stable pedagogical family for audits and future review tooling. */
  contentFamily?: string;
  /** Additional knowledge needed by this definition; diagnostic only and never an access gate. */
  supportingSkills?: SkillId[];
  /** Required by validation for curated foundational content. */
  curationReason?: QuestionCurationReason;
  /** Explains why fixed values or wording are pedagogically essential. */
  curationJustificationHe?: string;
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  correctAnswers: [string, ...string[]];
  answerSemantics?: NumericAnswerSemantics;
  acceptedInputFormats?: NumericInputFormat[];
  input?: { allowMinus?: boolean; allowDecimal?: boolean }; // future-proof UX hints
}

export type NumericAnswerSemantics =
  | { kind: "exact" }
  | { kind: "exactDecimal" }
  | { kind: "rounded"; decimalPlaces: number };

export type GeneratedQuestionInstance = (NumericQuestion | SingleChoiceQuestion | MultiChoiceQuestion) & {
  baseId: string;
  templateId: string;
  generatorSeed?: number;
  renderedExpression: string;
  sampledParams: Record<string, string>;
  computedDifficulty?: number;
  structureKey?: string;
  variantGroup?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
};

export interface ChoiceOption {
  id: string;
  content: OptionContent[];
  /** Named error pattern represented by this distractor; absent on the correct option. */
  misconceptionId?: string;
  /** Why the distractor is plausible, for author review and future diagnostics. */
  misconceptionRationale?: string;
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

export type NumericInputFormat =
  | "integer"
  | "decimal"
  | "fraction"
  | "mixed";

export function isGeneratedQuestionInstance(
  question: Question,
): question is GeneratedQuestionInstance {
  return "templateId" in question;
}

export type RawAnswerByType = {
  numeric: { value: string };
  singleChoice: { optionId: string };
  multiChoice: { optionIds: string[] };
};

export type RawAnswer<T extends QuestionType = QuestionType> = {
  questionType: T;
  data: RawAnswerByType[T];
};
