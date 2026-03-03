import type { NumericQuestion, OptionContent } from "../../questions/types.ts";
import type { Rational } from "./rational.ts";

export type VarType = "natural" | "integer" | "decimal1" | "simpleFraction";

export interface VarSpec {
  type?: VarType;
  min: number;
  max: number;
  notZero?: boolean;
  forceSign?: "positive" | "negative" | "nonNegative" | "nonPositive";
  multipleOf?: number;
  preferNegative?: number;
  preferZero?: number;
  denominators?: number[];
  maxNumerator?: number;
  allowNonReduced?: boolean;
  allowNegative?: boolean;
}

export type VarsSpec = Record<string, VarSpec>;

export type ConstraintSpec =
  | { kind: "avoidResult"; value: number }
  | { kind: "resultAbsMax"; value: number }
  | { kind: "varNotEqual"; a: string; b: string }
  | { kind: "varAbsMax"; var: string; value: number }
  | { kind: "avoidNoOp" }
  | { kind: "avoidRenderedEqualsAnswer" };

export interface ExprSpec {
  topicId: string;
  templateId: string;
  subtopic?: string;
  latex: string;
  vars: VarsSpec;
  constraints?: ConstraintSpec[];
  tags?: string[];
  misconceptions?: string[];
  promptTemplate?: OptionContent[];
  hintsTemplate?: OptionContent[][];
}

export type ExprAst =
  | { kind: "number"; value: number; raw: string }
  | { kind: "rational"; value: Rational }
  | { kind: "var"; name: string }
  | { kind: "unaryMinus"; expr: ExprAst }
  | { kind: "binary"; op: "+" | "-" | "*" | "/" | "^"; left: ExprAst; right: ExprAst };

export interface DisplayFraction {
  num: bigint;
  den: bigint;
}

export interface SampledValue {
  rational: Rational;
  displayFraction?: DisplayFraction;
  renderAsDecimal?: boolean;
}

export type SampledValues = Record<string, SampledValue>;

export interface ExprAnalysis {
  varCount: number;
  uniqueOps: Array<"+" | "-" | "*" | "/" | "^">;
  termCount: number;
  maxAbsValue: number;
  maxDenominator: number;
  resultAbs: number;
  cancelScore: number;
  hasParenNegation: boolean;
  maxExponent: number;
  hasDecimal: boolean;
  hasFraction: boolean;
  hasExponent: boolean;
  hasNegative: boolean;
  hasZero: boolean;
  tags: string[];
}

export interface GenerateExprNumericQuestionInput {
  id: string;
  exprSpec: ExprSpec;
  seedNumber: number;
  seedKey?: string;
  difficultyTarget?: number;
}

export type GenerateExprNumericQuestion = (
  input: GenerateExprNumericQuestionInput,
) => NumericQuestion;
