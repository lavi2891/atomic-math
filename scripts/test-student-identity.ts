import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { LocalStudentIdentityStorage, STUDENT_IDENTITY_STORAGE_KEY, normalizeStudentCode, resolveStudentIdentity } from "../src/domain/studentIdentity/studentIdentity.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import { DurableAttemptRepository, DurableSessionRepository, DurableSyncMetadataRepository } from "../src/infrastructure/persistence/DurableRepositories.ts";
import { AppsScriptClient } from "../src/infrastructure/sync/AppsScriptClient.ts";
import { SyncCoordinator } from "../src/infrastructure/sync/SyncCoordinator.ts";
import type { Attempt } from "../src/domain/attempts/types.ts";

async function run(name: string, fn: () => void | Promise<void>) { await fn(); process.stdout.write(`PASS ${name}\n`); }

class MapStorage {
  readonly values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

function attempt(attemptId: string, studentId: string): Attempt {
  return { attemptId, sessionId: `SESSION-${studentId}`, studentId, questionId: "Q", skillId: "AR_PLACE_VALUE", difficulty: 0.3, literacyDemand: "none", submittedAnswer: { questionType: "numeric", data: { value: "1" } }, correct: true, supportLevel: "independent", scoreValue: 1, responseTimeMs: 500, submittedAt: "2026-09-06T00:00:00.000Z", sequenceNumber: 1 };
}

await run("no remembered identity and no explicit fallback requires code entry", () => {
  assert.equal(resolveStudentIdentity(new LocalStudentIdentityStorage(new MapStorage()), null), null);
  assert.doesNotMatch(readFileSync(new URL("../src/config/runtime.ts", import.meta.url), "utf8"), /"local-student"/);
});

await run("remembered identity survives storage recreation and wins over fallback", () => {
  const raw = new MapStorage();
  new LocalStudentIdentityStorage(raw).remember(" m8-241 ");
  assert.equal(raw.getItem(STUDENT_IDENTITY_STORAGE_KEY), "M8-241");
  assert.deepEqual(resolveStudentIdentity(new LocalStudentIdentityStorage(raw), "DEV-ONLY"), { studentId: "M8-241", source: "remembered" });
});

await run("explicit fallback is used only when no runtime identity exists", () => {
  const storage = new LocalStudentIdentityStorage(new MapStorage());
  assert.deepEqual(resolveStudentIdentity(storage, "test-42"), { studentId: "TEST-42", source: "fallback" });
  assert.equal(normalizeStudentCode(" m8-583 "), "M8-583");
});

await run("switching student clears identity without deleting either student's evidence", async () => {
  const raw = new MapStorage(); const identity = new LocalStudentIdentityStorage(raw);
  const driver = new MemoryPersistenceDriver(); const attempts = new DurableAttemptRepository(driver);
  identity.remember("M8-241");
  await attempts.saveAttempt(attempt("A-241", "M8-241"));
  await attempts.saveAttempt(attempt("A-583", "M8-583"));
  identity.clear();
  assert.equal(identity.read(), null);
  assert.equal((await attempts.getAttemptsForSkill("M8-241", "AR_PLACE_VALUE")).length, 1);
  assert.equal((await attempts.getAttemptsForSkill("M8-583", "AR_PLACE_VALUE")).length, 1);
});

await run("pending evidence retains its originating student identity", async () => {
  const driver = new MemoryPersistenceDriver(); const attempts = new DurableAttemptRepository(driver);
  await attempts.saveAttempt(attempt("A-241", "M8-241"));
  await attempts.saveAttempt(attempt("A-583", "M8-583"));
  assert.deepEqual((await attempts.getPendingAttempts()).map((item) => item.studentId), ["M8-241", "M8-583"]);
  const coordinator = new SyncCoordinator(attempts, new DurableSessionRepository(driver), new DurableSyncMetadataRepository(driver), null);
  assert.equal(await coordinator.pendingCount("M8-241"), 1);
  assert.equal(await coordinator.pendingCount("M8-583"), 1);
});

await run("offline answer syncs immediately after reconnect and remains idempotent", async () => {
  const driver = new MemoryPersistenceDriver(); const attempts = new DurableAttemptRepository(driver); const metadata = new DurableSyncMetadataRepository(driver);
  await attempts.saveAttempt(attempt("A-OFFLINE", "M8-241"));
  let online = false; let uploads = 0;
  const client = new AppsScriptClient("https://example.test/exec", async (_input, init) => {
    if (!online) throw new Error("offline");
    uploads += 1;
    const request = JSON.parse(String(init?.body)) as { requestId: string; payload: { attempts: Attempt[] } };
    assert.equal(request.payload.attempts[0]?.studentId, "M8-241");
    return new Response(JSON.stringify({ ok: true, requestId: request.requestId, serverTime: "now", data: { acceptedAttemptIds: uploads === 1 ? ["A-OFFLINE"] : [], duplicateAttemptIds: uploads === 1 ? [] : ["A-OFFLINE"] } }));
  });
  const coordinator = new SyncCoordinator(attempts, new DurableSessionRepository(driver), metadata, client);
  await coordinator.flush();
  assert.equal((await attempts.getPendingAttempts()).length, 1);
  assert.ok((await metadata.getSyncMetadata()).nextRetryAt);
  online = true;
  await coordinator.reconnect();
  assert.equal((await attempts.getPendingAttempts()).length, 0);
  assert.equal(uploads, 1);
  await coordinator.flush();
  assert.equal(uploads, 1);
});
