import type { ExprSpec } from "../../core/types.ts";

export interface EquivalentSpec {
  topicId: "SIGNED_NUMBERS";
  family: "equivalentValue";
  subtopic: string;
  sourceExprSpecs: ExprSpec[];
  tags?: string[];
  misconceptions?: string[];
}
