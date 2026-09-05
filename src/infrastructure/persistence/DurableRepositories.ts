import type { AttemptRepository } from "../../domain/attempts/AttemptRepository.ts";
import type { Attempt } from "../../domain/attempts/types.ts";
import type { SessionRepository, SyncMetadata, SyncMetadataRepository, PersistedSession } from "../../domain/sync/types.ts";
import type { PersistenceDriver } from "./driver.ts";
import type { RiddleSubmissionRepository } from "../../domain/optionalLearningContent/RiddleSubmissionRepository.ts";
import type { RiddleSubmission } from "../../domain/optionalLearningContent/types.ts";

export class DurableAttemptRepository implements AttemptRepository {
  constructor(privateDriver: PersistenceDriver) { this.driver = privateDriver; }
  private readonly driver: PersistenceDriver;

  async saveAttempt(attempt: Attempt) { await this.driver.putAttempt({ value: attempt, syncState: "pending" }); }
  async getAttemptsForSkill(studentId: string, skillId: string) {
    return (await this.driver.listAttempts()).map((record) => record.value)
      .filter((attempt) => attempt.studentId === studentId && attempt.skillId === skillId)
      .sort((a, b) => a.submittedAt.localeCompare(b.submittedAt) || a.sequenceNumber - b.sequenceNumber);
  }
  async getRecentAttemptsForSkill(studentId: string, skillId: string, limit: number) {
    return (await this.getAttemptsForSkill(studentId, skillId)).slice(-Math.max(0, Math.floor(limit)));
  }
  async getPendingAttempts(limit = 25) {
    return (await this.driver.listAttempts()).filter((record) => record.syncState === "pending")
      .map((record) => record.value).slice(0, Math.max(0, Math.floor(limit)));
  }
  async markAttemptsSynced(attemptIds: string[]) { await this.driver.updateAttemptSyncState(attemptIds, "synced"); }
  async markAttemptsInvalid(attemptIds: string[]) { await this.driver.updateAttemptSyncState(attemptIds, "invalid"); }
}

export class DurableSessionRepository implements SessionRepository {
  constructor(privateDriver: PersistenceDriver) { this.driver = privateDriver; }
  private readonly driver: PersistenceDriver;
  async saveSession(session: PersistedSession) { await this.driver.putSession({ value: session, syncState: "pending" }); }
  async getSession(sessionId: string) { return (await this.driver.getSession(sessionId))?.value ?? null; }
  async getPendingSessions(limit = 25) {
    return (await this.driver.listSessions()).filter((record) => record.syncState === "pending")
      .map((record) => record.value).slice(0, Math.max(0, Math.floor(limit)));
  }
  async markSessionsSynced(sessionIds: string[]) { await this.driver.updateSessionSyncState(sessionIds, "synced"); }
  async markSessionsInvalid(sessionIds: string[]) { await this.driver.updateSessionSyncState(sessionIds, "invalid"); }
}

export class DurableRiddleSubmissionRepository implements RiddleSubmissionRepository {
  constructor(privateDriver: PersistenceDriver) { this.driver = privateDriver; }
  private readonly driver: PersistenceDriver;
  async save(submission: RiddleSubmission) { await this.driver.putRiddleSubmission({ value: submission, syncState: "pending" }); }
  async listForRiddle(studentId: string, riddleId: string) {
    return (await this.driver.listRiddleSubmissions()).map((record) => record.value)
      .filter((submission) => submission.studentId === studentId && submission.riddleId === riddleId)
      .sort((left, right) => left.submittedAt.localeCompare(right.submittedAt));
  }
  async getPending(limit = 25) { return (await this.driver.listRiddleSubmissions()).filter((record) => record.syncState === "pending").map((record) => record.value).slice(0, Math.max(0, Math.floor(limit))); }
  async markSynced(ids: readonly string[]) { await this.driver.updateRiddleSubmissionSyncState(ids, "synced"); }
  async markInvalid(ids: readonly string[]) { await this.driver.updateRiddleSubmissionSyncState(ids, "invalid"); }
}

export class DurableSyncMetadataRepository implements SyncMetadataRepository {
  constructor(privateDriver: PersistenceDriver) { this.driver = privateDriver; }
  private readonly driver: PersistenceDriver;
  async getSyncMetadata(): Promise<SyncMetadata> { return this.driver.getMetadata(); }
  async saveSyncMetadata(metadata: SyncMetadata) { await this.driver.putMetadata(metadata); }
}
