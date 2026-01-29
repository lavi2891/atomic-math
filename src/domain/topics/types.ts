export interface Topic {
  id: string;
  title: string; // Hebrew UI label
  description?: string;
  order?: number;
  gradeBand?: "foundations" | "g7";
}
