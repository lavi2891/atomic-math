import type { ExprSpec } from "../../core/types.ts";

export interface CompareSpec {
  topicId: "SIGNED_NUMBERS";
  family: "compareAB";
  subtopic: string;
  sourceExprSpecs: ExprSpec[];
  maxEqualRate: number;
  tags?: string[];
  misconceptions?: string[];
}
