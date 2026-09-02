import type { AttemptRepository } from "./AttemptRepository.ts";
import type { Attempt, SupportLevel } from "./types.ts";

export const ATTEMPTS_STORAGE_KEY = "atomicMath.attempts.v1";
type StoredAttempts = { version: 1; attempts: Attempt[] };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSupportLevel(value: unknown): value is SupportLevel {
  return value === "independent" || value === "hint" || value === "guided";
}

function isAttempt(value: unknown): value is Attempt {
  if (!isObject(value)) return false;
  return (
    typeof value.attemptId === "string" &&
    typeof value.sessionId === "string" &&
    typeof value.studentId === "string" &&
    typeof value.questionId === "string" &&
    typeof value.skillId === "string" &&
    typeof value.difficulty === "number" &&
    typeof value.correct === "boolean" &&
    isSupportLevel(value.supportLevel) &&
    typeof value.scoreValue === "number" &&
    typeof value.responseTimeMs === "number" &&
    typeof value.submittedAt === "string" &&
    typeof value.sequenceNumber === "number" &&
    isObject(value.submittedAnswer)
  );
}

export class LocalAttemptRepository implements AttemptRepository {
  private readonly storage: Storage | null;
  private readonly key: string;

  constructor(storage?: Storage, key = ATTEMPTS_STORAGE_KEY) {
    this.storage = storage ?? (typeof window !== "undefined" ? window.localStorage : null);
    this.key = key;
  }

  async saveAttempt(attempt: Attempt): Promise<void> {
    const stored = this.read();
    if (stored.attempts.some((item) => item.attemptId === attempt.attemptId)) return;
    stored.attempts.push(attempt);
    this.write(stored);
  }

  async getAttemptsForSkill(studentId: string, skillId: string): Promise<Attempt[]> {
    return this.read().attempts
      .filter((attempt) => attempt.studentId === studentId && attempt.skillId === skillId)
      .sort((left, right) => left.submittedAt.localeCompare(right.submittedAt) || left.sequenceNumber - right.sequenceNumber);
  }

  async getRecentAttemptsForSkill(studentId: string, skillId: string, limit: number): Promise<Attempt[]> {
    const attempts = await this.getAttemptsForSkill(studentId, skillId);
    return attempts.slice(-Math.max(0, Math.floor(limit)));
  }

  async getPendingAttempts(limit = 25): Promise<Attempt[]> {
    return this.read().attempts.slice(0, Math.max(0, Math.floor(limit)));
  }

  async markAttemptsSynced(_attemptIds: string[]): Promise<void> {
    void _attemptIds;
  }
  async markAttemptsInvalid(_attemptIds: string[]): Promise<void> { void _attemptIds; }

  private read(): StoredAttempts {
    if (!this.storage) return { version: 1, attempts: [] };
    try {
      const parsed: unknown = JSON.parse(this.storage.getItem(this.key) ?? "null");
      if (!isObject(parsed) || parsed.version !== 1 || !Array.isArray(parsed.attempts)) {
        return { version: 1, attempts: [] };
      }
      return { version: 1, attempts: parsed.attempts.filter(isAttempt) };
    } catch {
      return { version: 1, attempts: [] };
    }
  }

  private write(value: StoredAttempts): void {
    if (!this.storage) return;
    try {
      this.storage.setItem(this.key, JSON.stringify(value));
    } catch {
      // Keep practice usable if local storage is unavailable or full.
    }
  }
}
