import type { PersistenceDriver, StoredAttempt, StoredSession, SyncState } from "./driver.ts";
import type { SyncMetadata } from "../../domain/sync/types.ts";
import type { CachedStudentHome } from "../../domain/studentHome/types.ts";

export class MemoryPersistenceDriver implements PersistenceDriver {
  readonly attempts = new Map<string, StoredAttempt>();
  readonly sessions = new Map<string, StoredSession>();
  metadata: SyncMetadata = { retryCount: 0 };
  readonly homes = new Map<string, CachedStudentHome>();

  async putAttempt(record: StoredAttempt): Promise<void> {
    if (!this.attempts.has(record.value.attemptId)) this.attempts.set(record.value.attemptId, structuredClone(record));
  }
  async listAttempts() { return [...this.attempts.values()].map((value) => structuredClone(value)); }
  async updateAttemptSyncState(ids: readonly string[], state: SyncState) {
    for (const id of ids) { const record = this.attempts.get(id); if (record) record.syncState = state; }
  }
  async putSession(record: StoredSession) { this.sessions.set(record.value.id, structuredClone(record)); }
  async getSession(id: string) { const value = this.sessions.get(id); return value ? structuredClone(value) : null; }
  async listSessions() { return [...this.sessions.values()].map((value) => structuredClone(value)); }
  async updateSessionSyncState(ids: readonly string[], state: SyncState) {
    for (const id of ids) { const record = this.sessions.get(id); if (record) record.syncState = state; }
  }
  async getMetadata() { return structuredClone(this.metadata); }
  async putMetadata(metadata: SyncMetadata) { this.metadata = structuredClone(metadata); }
  async getStudentHome(studentId: string) { const value = this.homes.get(studentId); return value ? structuredClone(value) : null; }
  async putStudentHome(home: CachedStudentHome) { this.homes.set(home.studentId, structuredClone(home)); }
}
