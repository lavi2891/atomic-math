import type { TopicIconName } from "@ui/icons";

export type GradeId = "GRADE_7" | "GRADE_8" | "GRADE_9" | "GRADE_10";

export type TopicId =
  | "SIGNED_NUMBERS"
  | "ALGEBRA_EXPRESSIONS"
  | "ALGEBRAIC_EXPRESSION_COMPARISON"
  | "COORDINATE_PLANE"
  | "SUBSTITUTION_IN_EXPRESSIONS"
  | "WORD_PROBLEMS"
  | "EQUATIONS"
  | "LINEAR_FUNCTION"
  | "GRAPH_READING"
  | "INEQUALITIES"
  | "TRIANGLE_CONGRUENCE"
  | "TRIANGLE_MEDIAN"
  | "QUADRATIC_FUNCTION"
  | "IDENTITIES"
  | "QUADRATIC_FORMULA"
  | "PROBABILITY"
  | "QUADRILATERALS"
  | "TRIANGLE_GEOMETRY"
  | "PARABOLA_ANALYSIS"
  | "PARABOLA_WORD_PROBLEMS"
  | "ANALYTIC_GEOMETRY"
  | "TRIGONOMETRY"
  | "PRECALCULUS"
  | "DERIVATIVE_AND_POLYNOMIAL_ANALYSIS";

export interface Topic {
  id: TopicId;
  title: string;
  description?: string;
  order: number;
  icon: TopicIconName;
  colorToken: string;
  parentId?: TopicId;
  grades?: number[];
  prerequisites?: TopicId[];
}
