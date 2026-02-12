export type TopicId = string;

export interface Topic {
  id: TopicId;
  title: string;
  description?: string;
  order: number;
  icon: string;
  colorToken: string;
  parentId?: TopicId;
  grades?: number[];
  prerequisites?: TopicId[];
}
