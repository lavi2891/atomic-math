export type DomainId = string;
export type SkillId = string;
export type SkillGroupId = string;
export type DifficultyBand = "A" | "B" | "C" | "D";
export type QuestionCategory = "calculation" | "conceptual" | "reasoning" | "representation";

export interface EvidencePolicy {
  id: string;
  version: number;
  minimumAttempts: number;
  requiredCategoryEvidence: Partial<Record<QuestionCategory, number>>;
  requiredBandEvidence: Partial<Record<DifficultyBand, number>>;
  fluencyEvidence?: { minimumFluentAttempts: number; maximumMedianMs: number };
}

export interface SkillModes {
  quickPractice: boolean;
  fixed: boolean;
  timedProfileId?: string;
  survivalProfileId?: string;
}

export interface SkillGroup {
  id: SkillGroupId;
  domainId: DomainId;
  nameHe: string;
  descriptionHe?: string;
  order: number;
  skillIds: SkillId[];
  active: boolean;
}

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
  /** Concise student-facing label; nameHe remains the stable pedagogical label. */
  shortNameHe?: string;
  descriptionHe?: string;
  order: number;
  prerequisites: SkillId[];
  supportingSkills?: SkillId[];
  masteryTarget: number;
  fluency?: { enabled: boolean; targetMedianMs?: number };
  curriculum?: { grades?: number[]; tags?: string[] };
  evidencePolicy: EvidencePolicy;
  modes: SkillModes;
  active: boolean;
}
