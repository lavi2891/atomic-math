import type { Attempt } from "./types.ts";

export interface AttemptRepository {
  saveAttempt(attempt: Attempt): Promise<void>;
  getAttemptsForSkill(studentId: string, skillId: string): Promise<Attempt[]>;
  getRecentAttemptsForSkill(studentId: string, skillId: string, limit: number): Promise<Attempt[]>;
  getPendingAttempts(limit?: number): Promise<Attempt[]>;
  markAttemptsSynced(attemptIds: string[]): Promise<void>;
  markAttemptsInvalid(attemptIds: string[]): Promise<void>;
}
