import assert from "node:assert/strict";
import { DurableAttemptRepository, DurableRiddleSubmissionRepository, DurableSessionRepository, DurableSyncMetadataRepository } from "../src/infrastructure/persistence/DurableRepositories.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import { AppsScriptClient } from "../src/infrastructure/sync/AppsScriptClient.ts";
import { SyncCoordinator } from "../src/infrastructure/sync/SyncCoordinator.ts";
import type { Attempt } from "../src/domain/attempts/types.ts";
import type { PersistedSession } from "../src/domain/sync/types.ts";
import { createRiddleSubmission, type RiddleDefinition } from "../src/domain/optionalLearningContent/types.ts";

async function run(name: string, fn: () => void | Promise<void>) { await fn(); process.stdout.write(`PASS ${name}\n`); }
function attempt(id: string): Attempt { return { attemptId:id,sessionId:"S",studentId:"STUDENT",questionId:"Q",skillId:"SKILL",difficulty:0.5,literacyDemand:"moderate",submittedAnswer:{questionType:"numeric",data:{value:"1"}},correct:true,supportLevel:"independent",scoreValue:1,responseTimeMs:1000,submittedAt:"2026-01-01T00:00:00.000Z",sequenceNumber:Number(id.replace(/\D/g,""))||1 }; }
function session(): PersistedSession { return { id:"S",studentId:"STUDENT",selectedSkillIds:["SKILL"],settings:{mode:"fixed",questionCount:5},startedAt:1,source:"freePractice",strategy:"balanced",status:"active",questionCount:0,correctCount:0,incorrectCount:0,accuracy:0 }; }
const riddle: RiddleDefinition = { id:"RIDDLE",type:"riddle",titleHe:"חידה",promptHe:"הסבירו",difficulty:"medium" };

await run("attempt is durable across repository recreation and pending before sync", async () => {
  const driver = new MemoryPersistenceDriver();
  await new DurableAttemptRepository(driver).saveAttempt(attempt("A1"));
  const recreated = new DurableAttemptRepository(driver);
  assert.equal((await recreated.getPendingAttempts()).length, 1);
  assert.equal((await recreated.getAttemptsForSkill("STUDENT","SKILL")).length, 1);
  assert.equal((await recreated.getPendingAttempts())[0]?.literacyDemand, "moderate");
});

await run("open riddle responses persist offline with resubmission history", async () => {
  const driver = new MemoryPersistenceDriver(); const repo = new DurableRiddleSubmissionRepository(driver);
  await repo.save(createRiddleSubmission({ riddle, studentId:"STUDENT", responseText:"פתרון ראשון", submissionId:"R1", now:"2026-01-01T00:00:00.000Z" }));
  await repo.save(createRiddleSubmission({ riddle, studentId:"STUDENT", responseText:"פתרון משופר", submissionId:"R2", now:"2026-01-02T00:00:00.000Z" }));
  const recreated = new DurableRiddleSubmissionRepository(driver); const history = await recreated.listForRiddle("STUDENT","RIDDLE");
  assert.deepEqual(history.map((item) => item.responseText), ["פתרון ראשון","פתרון משופר"]);
  assert.equal((await recreated.getPending()).length, 2);
});

await run("riddle response sync uses its own payload and never becomes an Attempt", async () => {
  const driver = new MemoryPersistenceDriver(); const riddles = new DurableRiddleSubmissionRepository(driver);
  await riddles.save(createRiddleSubmission({ riddle, studentId:"STUDENT", responseText:"הסבר", submissionId:"R1", now:"2026-01-01T00:00:00.000Z" }));
  const client = new AppsScriptClient("https://example.test", async (_input, init) => {
    const request = JSON.parse(String(init?.body)) as { action:string; requestId:string; payload:{submissions:Array<{submissionId:string}>} };
    assert.equal(request.action,"submitRiddleResponses"); assert.equal(request.payload.submissions[0]?.submissionId,"R1");
    return new Response(JSON.stringify({ok:true,requestId:request.requestId,serverTime:"x",data:{acceptedSubmissionIds:["R1"],duplicateSubmissionIds:[]}}),{status:200});
  });
  await new SyncCoordinator(new DurableAttemptRepository(driver),new DurableSessionRepository(driver),new DurableSyncMetadataRepository(driver),client,riddles).flush();
  assert.equal((await riddles.getPending()).length,0); assert.equal(driver.attempts.size,0);
});

await run("marking synced clears pending without deleting history", async () => {
  const driver = new MemoryPersistenceDriver(); const repo = new DurableAttemptRepository(driver);
  await repo.saveAttempt(attempt("A1")); await repo.markAttemptsSynced(["A1"]);
  assert.equal((await repo.getPendingAttempts()).length, 0);
  assert.equal((await repo.getAttemptsForSkill("STUDENT","SKILL")).length, 1);
});

await run("duplicate local save is idempotent and batch limits are respected", async () => {
  const repo = new DurableAttemptRepository(new MemoryPersistenceDriver());
  await repo.saveAttempt(attempt("A1")); await repo.saveAttempt(attempt("A1"));
  for (let index=2;index<=8;index+=1) await repo.saveAttempt(attempt(`A${index}`));
  assert.equal((await repo.getAttemptsForSkill("STUDENT","SKILL")).length, 8);
  assert.equal((await repo.getPendingAttempts(5)).length, 5);
});

await run("sessions persist and retain history after sync", async () => {
  const driver = new MemoryPersistenceDriver(); const repo = new DurableSessionRepository(driver);
  await repo.saveSession(session()); assert.equal((await repo.getSession("S"))?.status,"active");
  await repo.markSessionsSynced(["S"]); assert.equal((await repo.getPendingSessions()).length,0); assert.ok(await repo.getSession("S"));
});

await run("offline coordinator leaves queue pending", async () => {
  const driver=new MemoryPersistenceDriver();const attempts=new DurableAttemptRepository(driver);await attempts.saveAttempt(attempt("A1"));
  const coordinator=new SyncCoordinator(attempts,new DurableSessionRepository(driver),new DurableSyncMetadataRepository(driver),null);
  await coordinator.flush();assert.equal((await attempts.getPendingAttempts()).length,1);
});

await run("sync sees locally saved data, uploads it, and marks it synced", async () => {
  const driver=new MemoryPersistenceDriver();const attempts=new DurableAttemptRepository(driver);const sessions=new DurableSessionRepository(driver);await attempts.saveAttempt(attempt("A1"));
  let observedLocal=false;
  const client=new AppsScriptClient("https://example.test", async (_input, init) => {
    observedLocal=(await attempts.getPendingAttempts()).length===1;
    const request=JSON.parse(String(init?.body)) as {requestId:string;payload:{attempts:Attempt[]}};
    assert.equal(request.payload.attempts[0]?.literacyDemand, "moderate");
    return new Response(JSON.stringify({ok:true,requestId:request.requestId,serverTime:"x",data:{acceptedAttemptIds:["A1"],duplicateAttemptIds:[]}}),{status:200});
  });
  await new SyncCoordinator(attempts,sessions,new DurableSyncMetadataRepository(driver),client).flush();
  assert.equal(observedLocal,true);assert.equal((await attempts.getPendingAttempts()).length,0);
});

await run("network failure remains queued and records backoff", async () => {
  const driver=new MemoryPersistenceDriver();const attempts=new DurableAttemptRepository(driver);await attempts.saveAttempt(attempt("A1"));
  const client=new AppsScriptClient("https://example.test", async () => { throw new Error("offline"); });
  const metadata=new DurableSyncMetadataRepository(driver);
  await new SyncCoordinator(attempts,new DurableSessionRepository(driver),metadata,client).flush();
  assert.equal((await attempts.getPendingAttempts()).length,1);assert.equal((await metadata.getSyncMetadata()).retryCount,1);assert.ok((await metadata.getSyncMetadata()).nextRetryAt);
});

await run("non-retryable attempt rejection isolates the failed batch and preserves later valid work", async () => {
  const driver = new MemoryPersistenceDriver(); const attempts = new DurableAttemptRepository(driver);
  await attempts.saveAttempt(attempt("A1"));
  await attempts.saveAttempt({ ...attempt("A2"), sessionId: "S2" });
  let submissions = 0;
  const client = new AppsScriptClient("https://example.test", async (_input, init) => {
    const request = JSON.parse(String(init?.body)) as { requestId: string; action: string };
    submissions += 1;
    return submissions === 1
      ? new Response(JSON.stringify({ ok: false, requestId: request.requestId, error: { code: "INVALID_ATTEMPT", message: "bad row", retryable: false } }), { status: 200 })
      : new Response(JSON.stringify({ ok: true, requestId: request.requestId, serverTime: "x", data: { acceptedAttemptIds: ["A2"], duplicateAttemptIds: [] } }), { status: 200 });
  });
  const coordinator = new SyncCoordinator(attempts, new DurableSessionRepository(driver), new DurableSyncMetadataRepository(driver), client);
  await coordinator.flush();
  assert.equal(driver.attempts.get("A1")?.syncState, "invalid");
  assert.equal(driver.attempts.get("A2")?.syncState, "pending");
  await coordinator.flush();
  assert.equal(driver.attempts.get("A2")?.syncState, "synced");
});
