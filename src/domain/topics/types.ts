import type { TopicIconName } from "@ui/icons";

export type TopicId =
  | "SIGNED_NUMBERS"
  | "ALGEBRA_EXPRESSIONS"
  | "LINEAR_EQUATIONS"
  | "TRIANGLES";

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
