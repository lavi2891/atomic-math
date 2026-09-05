import type { PracticeSession, SessionEndReason } from "../session/practiceSession.ts";
import type { StageStars } from "../learningPath/types.ts";

export type PersistedSessionStatus = "active" | "completed" | "abandoned";

export interface PersistedSession extends PracticeSession {
  source: "freePractice" | "assignment";
  assignmentId?: string;
  strategy: "balanced";
  endedAt?: number;
  endReason?: SessionEndReason;
  status: PersistedSessionStatus;
  questionCount: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  durationMs?: number;
  gameScore?: number;
  stageStars?: StageStars;
  shortcutPassed?: boolean;
}

export interface SyncMetadata {
  lastSuccessfulSync?: string;
  retryCount: number;
  lastError?: string;
  nextRetryAt?: string;
}

export interface SessionRepository {
  saveSession(session: PersistedSession): Promise<void>;
  getSession(sessionId: string): Promise<PersistedSession | null>;
  getPendingSessions(limit?: number): Promise<PersistedSession[]>;
  markSessionsSynced(sessionIds: string[]): Promise<void>;
  markSessionsInvalid(sessionIds: string[]): Promise<void>;
}

export interface SyncMetadataRepository {
  getSyncMetadata(): Promise<SyncMetadata>;
  saveSyncMetadata(metadata: SyncMetadata): Promise<void>;
}
