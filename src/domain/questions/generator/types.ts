import type { ChoiceOption, LiteracyDemand, NumericAnswerSemantics, NumericInputFormat, OptionContent, QuestionAuthoringMode } from "../types.ts";
import type { QuestionCategory } from "../categories.ts";
import type { DifficultyBand, SkillId } from "../../../content/catalog/types.ts";
import type { LearningMedia } from "../../media/types.ts";

export type IntegerLikeParamSpec = {
  type: "integer" | "natural";
  min: number;
  max: number;
  exclude?: number[];
};

export type DecimalParamSpec = {
  type: "decimal";
  min: number;
  max: number;
  step: number;
  exclude?: number[];
};

export type RationalEndpointSpec = {
  type?: "integer" | "natural";
  min: number;
  max: number;
  exclude?: number[];
};

export type RationalParamSpec = {
  type: "rational";
  numerator: RationalEndpointSpec;
  denominator: {
    min: number;
    max: number;
    exclude?: number[];
  };
  simplify?: boolean;
  excludeZero?: boolean;
};

export type ParamSpec =
  | IntegerLikeParamSpec
  | DecimalParamSpec
  | RationalParamSpec;

export type ParamsSpec = Record<string, ParamSpec>;

export type GeneratedQuestionMetadata = {
  difficulty?: number;
  subtopic?: string;
  source?: string;
  [key: string]: string | number | boolean | null | undefined;
};

export type SampledParamValue = {
  type: ParamSpec["type"];
  expr: string;
  display: string;
  value: {
    num: bigint;
    den: bigint;
  };
};

export type SampledParams = Record<string, SampledParamValue>;

export type DifficultyModel = (sampledParams: SampledParams) => number;

export type GeneratedChoiceDraft =
  | { type: "singleChoice"; prompt: OptionContent[]; options: ChoiceOption[]; correctOptionId: string }
  | { type: "multiChoice"; prompt: OptionContent[]; options: ChoiceOption[]; correctOptionIds: string[] };

export type GeneratedChoiceBuilder = (sampledParams: SampledParams) => GeneratedChoiceDraft;

export interface GeneratedQuestionDefinition {
  id: string;
  topicId: string;
  /** New content identity. Optional only while legacy generators are migrated. */
  skillId?: string;
  kind: "generated";
  /** Explicit for active authored content; optional only for legacy generators. */
  authoringMode?: Extract<QuestionAuthoringMode, "generated">;
  /** Stable pedagogical family for audits and future review tooling. */
  contentFamily?: string;
  /** Optional only for backwards-compatible content; omitted values migrate to calculation. */
  category?: QuestionCategory;
  /** Explicit author classification; optional only for inactive legacy generators. */
  literacyDemand?: LiteracyDemand;
  difficultyBand?: DifficultyBand;
  exprTemplate: string;
  promptTemplate: OptionContent[];
  media?: LearningMedia;
  params: ParamsSpec;
  constraints?: string[];
  /** Symbols intentionally shown as symbols to the student; these are not sampled generator parameters. */
  studentFacingSymbols?: string[];
  /** Mathematical conditions on intentional student-facing symbols, such as b != 0. */
  symbolicConditions?: string[];
  /** Additional knowledge needed to interpret or solve this family; diagnostic only, not an access gate. */
  supportingSkills?: SkillId[];
  hintsTemplate?: OptionContent[][];
  misconceptions?: string[];
  tags?: string[];
  version?: number;
  metadata?: GeneratedQuestionMetadata;
  structureKey?: string;
  variantGroup?: string;
  difficultyModel?: DifficultyModel;
  acceptedInputFormats?: NumericInputFormat[];
  answerSemantics?: NumericAnswerSemantics;
  /** Optional executable authoring path for generated conceptual choice questions. */
  choiceBuilder?: GeneratedChoiceBuilder;
  /** Generated output type; numeric remains the backwards-compatible default. */
  generatedType?: "singleChoice" | "multiChoice";
  input?: {
    allowMinus?: boolean;
    allowDecimal?: boolean;
  };
}
