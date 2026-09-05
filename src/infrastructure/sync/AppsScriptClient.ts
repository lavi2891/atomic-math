import type { Attempt } from "../../domain/attempts/types.ts";
import type { PersistedSession } from "../../domain/sync/types.ts";
import type { Assignment, StudentProfile } from "../../domain/studentHome/types.ts";
import type { MasterySnapshot } from "../../domain/mastery/projectMastery.ts";
import type { RiddleSubmission } from "../../domain/optionalLearningContent/types.ts";

export type ApiAction = "health" | "getStudentHome" | "startSession" | "submitAttempts" | "submitRiddleResponses" | "endSession" | "getSyncState" | "upsertAssignments";
export type ApiResponse<T> =
  | { ok: true; requestId: string; serverTime: string; data: T }
  | { ok: false; requestId: string; error: { code: string; message: string; retryable: boolean } };

export class RemoteApiError extends Error {
  readonly retryable: boolean;
  readonly code: string;
  constructor(code: string, message: string, retryable: boolean) {
    super(message); this.code = code; this.retryable = retryable;
  }
}

export class AppsScriptClient {
  constructor(privateUrl: string, privateFetch: typeof fetch = fetch) {
    this.url = privateUrl; this.fetchFn = privateFetch;
  }
  private readonly url: string;
  private readonly fetchFn: typeof fetch;

  async request<T>(action: ApiAction, payload: unknown): Promise<T> {
    const requestId = globalThis.crypto?.randomUUID?.() ?? `req-${Date.now()}`;
    let response: Response;
    try {
      response = await this.fetchFn(this.url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action, requestId, clientVersion: "1", payload }),
      });
    } catch (error) {
      throw new RemoteApiError("NETWORK_ERROR", error instanceof Error ? error.message : "Network request failed", true);
    }
    if (!response.ok) throw new RemoteApiError("HTTP_ERROR", `HTTP ${response.status}`, response.status >= 500);
    const body = await response.json() as ApiResponse<T>;
    if (body.ok === false) throw new RemoteApiError(body.error.code, body.error.message, body.error.retryable);
    return body.data;
  }

  submitAttempts(sessionId: string, studentId: string, attempts: Attempt[]) {
    return this.request<{ acceptedAttemptIds: string[]; duplicateAttemptIds: string[] }>("submitAttempts", { sessionId, studentId, attempts });
  }
  submitRiddleResponses(studentId: string, submissions: RiddleSubmission[]) {
    return this.request<{ acceptedSubmissionIds: string[]; duplicateSubmissionIds: string[] }>("submitRiddleResponses", { studentId, submissions });
  }
  syncSession(session: PersistedSession) {
    return this.request<{ sessionId: string }>(session.status === "active" ? "startSession" : "endSession", { session });
  }
  getStudentHome(studentId: string) {
    return this.request<{ student: StudentProfile | null; activeAssignments: Assignment[]; masterySnapshots: MasterySnapshot[] }>("getStudentHome", { studentId });
  }
}
