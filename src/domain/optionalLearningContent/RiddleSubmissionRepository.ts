import type { RiddleSubmission } from "./types.ts";

export interface RiddleSubmissionRepository {
  save(submission: RiddleSubmission): Promise<void>;
  listForRiddle(studentId: string, riddleId: string): Promise<RiddleSubmission[]>;
  getPending(limit?: number): Promise<RiddleSubmission[]>;
  markSynced(ids: readonly string[]): Promise<void>;
  markInvalid(ids: readonly string[]): Promise<void>;
}
