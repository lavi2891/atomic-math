export type ChallengeScope =
  | { type: "skill"; skillId: string }
  | { type: "domain"; domainId: string; scopeVersion: string };

export type ChallengeSignature =
  | { mode: "timed"; durationSeconds: number; scope: ChallengeScope }
  | { mode: "survival"; maxErrors: number; scope: ChallengeScope };

export interface PersonalBestMetrics {
  attempted: number;
  correct: number;
  incorrect: number;
  accuracy: number;
}

export interface PersonalBest {
  key: string;
  studentId: string;
  signature: ChallengeSignature;
  bestScore: number;
  achievedAt: string;
  sessionId: string;
  metrics: PersonalBestMetrics;
}

export interface PersonalBestUpdate {
  best: PersonalBest | null;
  isNewRecord: boolean;
  previousBest: PersonalBest | null;
}

export interface PersonalBestRepository {
  get(studentId: string, signature: ChallengeSignature): Promise<PersonalBest | null>;
  record(candidate: Omit<PersonalBest, "key">): Promise<PersonalBestUpdate>;
}
