import type { OptionContent } from "../types.ts";

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

export interface GeneratedQuestionDefinition {
  id: string;
  topicId: string;
  kind: "generated";
  exprTemplate: string;
  promptTemplate: OptionContent[];
  params: ParamsSpec;
  constraints?: string[];
  hintsTemplate?: OptionContent[][];
  misconceptions?: string[];
  tags?: string[];
  version?: number;
  metadata?: GeneratedQuestionMetadata;
  structureKey?: string;
  variantGroup?: string;
  difficultyModel?: DifficultyModel;
  input?: {
    allowMinus?: boolean;
    allowDecimal?: boolean;
  };
}
