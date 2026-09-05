import type { Attempt } from "../../domain/attempts/types.ts";
import type { PersistedSession, SyncMetadata } from "../../domain/sync/types.ts";
import type { CachedStudentHome } from "../../domain/studentHome/types.ts";
import type { PersonalBest } from "../../domain/personalBests/types.ts";
import type { RiddleSubmission } from "../../domain/optionalLearningContent/types.ts";

export type SyncState = "pending" | "synced" | "invalid";
export type StoredAttempt = { value: Attempt; syncState: SyncState };
export type StoredSession = { value: PersistedSession; syncState: SyncState };
export type StoredRiddleSubmission = { value: RiddleSubmission; syncState: SyncState };

export interface PersistenceDriver {
  putAttempt(record: StoredAttempt): Promise<void>;
  listAttempts(): Promise<StoredAttempt[]>;
  updateAttemptSyncState(ids: readonly string[], state: SyncState): Promise<void>;
  putSession(record: StoredSession): Promise<void>;
  getSession(id: string): Promise<StoredSession | null>;
  listSessions(): Promise<StoredSession[]>;
  updateSessionSyncState(ids: readonly string[], state: SyncState): Promise<void>;
  putRiddleSubmission(record: StoredRiddleSubmission): Promise<void>;
  listRiddleSubmissions(): Promise<StoredRiddleSubmission[]>;
  updateRiddleSubmissionSyncState(ids: readonly string[], state: SyncState): Promise<void>;
  getMetadata(): Promise<SyncMetadata>;
  putMetadata(metadata: SyncMetadata): Promise<void>;
  getStudentHome(studentId: string): Promise<CachedStudentHome | null>;
  putStudentHome(home: CachedStudentHome): Promise<void>;
  getPersonalBest(key: string): Promise<PersonalBest | null>;
  putPersonalBestIfHigher(best: PersonalBest): Promise<{ best: PersonalBest; previousBest: PersonalBest | null; updated: boolean }>;
}
