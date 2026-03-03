import type { ExprSpec } from "../../core/types.ts";

export interface SignSpec {
  topicId: "SIGNED_NUMBERS";
  family: "signOfResult";
  subtopic: string;
  sourceExprSpecs: ExprSpec[];
  zeroRate: number;
  tags?: string[];
  misconceptions?: string[];
}
