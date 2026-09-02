export type DomainId = string;
export type SkillId = string;

export interface Domain {
  id: DomainId;
  nameHe: string;
  descriptionHe?: string;
  order: number;
  icon: string;
  colorToken: string;
  active: boolean;
}

export interface Skill {
  id: SkillId;
  domainId: DomainId;
  nameHe: string;
  descriptionHe?: string;
  order: number;
  prerequisites: SkillId[];
  masteryTarget: number;
  fluency?: { enabled: boolean; targetMedianMs?: number };
  curriculum?: { grades?: number[]; tags?: string[] };
  active: boolean;
}
