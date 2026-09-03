import assert from "node:assert/strict";
import { DOMAINS, SKILLS } from "../src/content/catalog/index.ts";
import { challengeSignatureKey, createChallengeSignature } from "../src/domain/personalBests/challengeSignature.ts";
import type { ChallengeSignature, PersonalBest } from "../src/domain/personalBests/types.ts";
import { sessionDefaults, TIMED_DURATION_PRESETS_SECONDS } from "../src/domain/session/config.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import { DurablePersonalBestRepository } from "../src/infrastructure/persistence/DurablePersonalBestRepository.ts";
import { DurableAttemptRepository, DurableSessionRepository, DurableSyncMetadataRepository } from "../src/infrastructure/persistence/DurableRepositories.ts";
import { SyncCoordinator } from "../src/infrastructure/sync/SyncCoordinator.ts";
import { StudentPracticeService } from "../src/app/session/StudentPracticeService.ts";
import { createInitialSessionState, createPracticeSession, practiceSessionReducer } from "../src/domain/session/practiceSession.ts";

async function run(name: string, fn: () => void | Promise<void>) { await fn(); process.stdout.write(`PASS ${name}\n`); }
const timed = (durationSeconds: 30 | 60 | 120 | 180 = 60) => createChallengeSignature({ mode: "timed", durationSeconds }, ["INT_ADD"], DOMAINS, SKILLS)!;
const candidate = (signature: ChallengeSignature, score: number, studentId = "STUDENT", sessionId = `S${score}`): Omit<PersonalBest, "key"> => ({ studentId, signature, bestScore: score, achievedAt: "2026-09-03T00:00:00.000Z", sessionId, metrics: { attempted: score + 2, correct: score, incorrect: 2, accuracy: score / (score + 2) } });

await run("timed presets and default are centralized", () => { assert.deepEqual(TIMED_DURATION_PRESETS_SECONDS, [30, 60, 120, 180]); assert.equal(sessionDefaults.timedDurationSeconds, 60); });
await run("timed duration is retained in session settings and signature", () => { const signature = timed(); assert.equal(signature.mode, "timed"); if (signature.mode === "timed") assert.equal(signature.durationSeconds, 60); });
await run("same skill and duration match while different durations do not", () => { assert.equal(challengeSignatureKey("S", timed(60)), challengeSignatureKey("S", timed(60))); assert.notEqual(challengeSignatureKey("S", timed(30)), challengeSignatureKey("S", timed(60))); });
await run("full domain has a versioned domain signature", () => { const ids = SKILLS.filter((skill) => skill.domainId === "INTEGERS" && skill.active).map((skill) => skill.id); const signature = createChallengeSignature({ mode: "survival", maxErrors: 3 }, ids, DOMAINS, SKILLS)!; assert.equal(signature.scope.type, "domain"); if (signature.scope.type === "domain") { assert.equal(signature.scope.domainId, "INTEGERS"); assert.ok(signature.scope.scopeVersion.includes("INT_ADD")); } });
await run("arbitrary partial multi-skill challenges are ineligible", () => { assert.equal(createChallengeSignature({ mode: "timed", durationSeconds: 60 }, ["INT_ADD", "INT_SUB"], DOMAINS, SKILLS), null); });
await run("first result creates, lower does not replace, and higher replaces", async () => { const repo = new DurablePersonalBestRepository(new MemoryPersistenceDriver()); assert.equal((await repo.record(candidate(timed(), 10))).isNewRecord, true); assert.equal((await repo.record(candidate(timed(), 8))).best?.bestScore, 10); const higher = await repo.record(candidate(timed(), 12)); assert.equal(higher.isNewRecord, true); assert.equal(higher.best?.bestScore, 12); });
await run("timed and survival records remain separate", async () => { const repo = new DurablePersonalBestRepository(new MemoryPersistenceDriver()); const survival = createChallengeSignature({ mode: "survival", maxErrors: 3 }, ["INT_ADD"], DOMAINS, SKILLS)!; await repo.record(candidate(timed(), 9)); await repo.record(candidate(survival, 4)); assert.equal((await repo.get("STUDENT", timed()))?.bestScore, 9); assert.equal((await repo.get("STUDENT", survival))?.bestScore, 4); });
await run("offline records persist across repository recreation", async () => { const driver = new MemoryPersistenceDriver(); await new DurablePersonalBestRepository(driver).record(candidate(timed(), 7)); assert.equal((await new DurablePersonalBestRepository(driver).get("STUDENT", timed()))?.bestScore, 7); });
await run("personal bests isolate students", async () => { const repo = new DurablePersonalBestRepository(new MemoryPersistenceDriver()); await repo.record(candidate(timed(), 5, "A")); await repo.record(candidate(timed(), 11, "B")); assert.equal((await repo.get("A", timed()))?.bestScore, 5); assert.equal((await repo.get("B", timed()))?.bestScore, 11); });
await run("an offline completed result updates the personal best immediately", async () => {
  const driver = new MemoryPersistenceDriver(); const bests = new DurablePersonalBestRepository(driver); const attempts = new DurableAttemptRepository(driver); const sessions = new DurableSessionRepository(driver);
  const service = new StudentPracticeService(attempts, sessions, bests, new SyncCoordinator(attempts, sessions, new DurableSyncMetadataRepository(driver), null));
  const session = createPracticeSession({ id: "OFFLINE", studentId: "STUDENT", selectedSkillIds: ["INT_ADD"], settings: { mode: "timed", durationSeconds: 60 }, startedAt: 0 });
  let state = practiceSessionReducer(createInitialSessionState(session), { type: "START", questionId: "Q", skillId: "INT_ADD" });
  state = practiceSessionReducer(state, { type: "ANSWER_SUBMITTED", result: { questionId: "Q", topicId: "SIGNED_NUMBERS", attemptIndex: 0, isCorrect: true, rawAnswer: { questionType: "numeric", data: { value: "1" } }, responseTimeMs: 100, timestamp: 100 } });
  state = practiceSessionReducer(state, { type: "TIMER_EXPIRED", at: 60_000 });
  const finished = await service.finish(state); assert.equal(finished.personalBest?.best?.bestScore, 1); assert.equal((await bests.get("STUDENT", timed()))?.sessionId, "OFFLINE");
});
