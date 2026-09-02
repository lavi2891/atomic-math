import type { AttemptRepository } from "../../domain/attempts/AttemptRepository.ts";
import type { SessionRepository, SyncMetadataRepository } from "../../domain/sync/types.ts";
import { AppsScriptClient, RemoteApiError } from "./AppsScriptClient.ts";
import { syncConfig } from "./config.ts";
import { log } from "../../shared/logger.ts";

export class SyncCoordinator {
  private activeFlush: Promise<void> | null = null;

  constructor(
    privateAttempts: AttemptRepository,
    privateSessions: SessionRepository,
    privateMetadata: SyncMetadataRepository,
    privateClient: AppsScriptClient | null,
  ) {
    this.attempts = privateAttempts;
    this.sessions = privateSessions;
    this.metadata = privateMetadata;
    this.client = privateClient;
  }
  private readonly attempts: AttemptRepository;
  private readonly sessions: SessionRepository;
  private readonly metadata: SyncMetadataRepository;
  private readonly client: AppsScriptClient | null;

  async notifyAttemptSaved(): Promise<void> {
    const pending = await this.attempts.getPendingAttempts(syncConfig.attemptFlushThreshold);
    if (pending.length >= syncConfig.attemptFlushThreshold) void this.flush();
  }

  flush(): Promise<void> {
    if (!this.client) return Promise.resolve();
    if (this.activeFlush) return this.activeFlush;
    this.activeFlush = this.runFlush().finally(() => { this.activeFlush = null; });
    return this.activeFlush;
  }

  private async runFlush(): Promise<void> {
    const metadata = await this.metadata.getSyncMetadata();
    if (metadata.nextRetryAt && Date.parse(metadata.nextRetryAt) > Date.now()) return;
    try {
      const sessions = await this.sessions.getPendingSessions(syncConfig.maxBatchSize);
      for (const session of sessions) {
        try {
          await this.client!.syncSession(session);
          await this.sessions.markSessionsSynced([session.id]);
        } catch (error) {
          if (!(error instanceof RemoteApiError) || error.retryable) throw error;
          await this.sessions.markSessionsInvalid([session.id]);
          log.warn("sync", "Session rejected permanently and retained locally", { sessionId: session.id, code: error.code });
        }
      }

      const pending = await this.attempts.getPendingAttempts(syncConfig.maxBatchSize);
      if (pending.length > 0) {
        const first = pending[0]!;
        const batch = pending.filter((attempt) => attempt.sessionId === first.sessionId && attempt.studentId === first.studentId);
        try {
          const result = await this.client!.submitAttempts(first.sessionId, first.studentId, batch);
          await this.attempts.markAttemptsSynced([...result.acceptedAttemptIds, ...result.duplicateAttemptIds]);
        } catch (error) {
          if (!(error instanceof RemoteApiError) || error.retryable) throw error;
          await this.attempts.markAttemptsInvalid(batch.map((attempt) => attempt.attemptId));
          log.warn("sync", "Attempt batch rejected permanently and retained locally", { attemptIds: batch.map((attempt) => attempt.attemptId), code: error.code });
        }
      }
      await this.metadata.saveSyncMetadata({ retryCount: 0, lastSuccessfulSync: new Date().toISOString() });
    } catch (error) {
      const retryable = !(error instanceof RemoteApiError) || error.retryable;
      const retryCount = retryable ? metadata.retryCount + 1 : metadata.retryCount;
      const delay = Math.min(syncConfig.maxBackoffMs, syncConfig.initialBackoffMs * 2 ** Math.max(0, retryCount - 1));
      await this.metadata.saveSyncMetadata({
        retryCount,
        lastError: error instanceof Error ? error.message : "Unknown sync error",
        nextRetryAt: retryable ? new Date(Date.now() + delay).toISOString() : undefined,
        lastSuccessfulSync: metadata.lastSuccessfulSync,
      });
      log.warn("sync", "Synchronization deferred", { retryable, error: error instanceof Error ? error.message : error });
    }
  }
}
