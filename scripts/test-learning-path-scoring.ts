import assert from "node:assert/strict";
import type { AnswerResult } from "../src/domain/results/types.ts";
import type { Chapter, LearningPath, Stage } from "../src/domain/learningPath/types.ts";
import { DEFAULT_STAGE_SCORE_THRESHOLDS, scoreStageResult, shortcutBypassStageIds, shortcutPassed } from "../src/domain/learningPath/scoring.ts";
import { derivePathProgress } from "../src/domain/learningPath/progression.ts";
import { progressFromSessions } from "../src/domain/learningPath/sessionProgress.ts";
import { projectMastery } from "../src/domain/mastery/projectMastery.ts";
import { createAttemptFromAnswer } from "../src/domain/attempts/createAttempt.ts";
import { FOUNDATIONAL_QUESTIONS } from "../src/content/foundations/questions.ts";
import { LEARNING_PATHS } from "../src/content/learningPaths.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import { DurablePersonalBestRepository, } from "../src/infrastructure/persistence/DurablePersonalBestRepository.ts";
import { DurableSessionRepository } from "../src/infrastructure/persistence/DurableRepositories.ts";
import { StudentPracticeService } from "../src/app/session/StudentPracticeService.ts";
import { createInitialSessionState } from "../src/domain/session/practiceSession.ts";
import { SkillQuestionSelector } from "../src/domain/session/skillQuestionSelector.ts";
import type { AttemptRepository } from "../src/domain/attempts/AttemptRepository.ts";
import type { SyncCoordinator } from "../src/infrastructure/sync/SyncCoordinator.ts";

async function run(name: string, test: () => void | Promise<void>) { await test(); process.stdout.write(`PASS ${name}\n`); }
const skillIds = ["AR_PLACE_VALUE"] as const;
const stage = (overrides: Partial<Stage> = {}): Stage => ({ id: "stage", nameHe: "שלב", type: "normal", skillIds, ...overrides });
const results = (correct: number, responseTimeMs = 30_000): AnswerResult[] => Array.from({ length: 10 }, (_, index) => ({
  questionId: `q-${index}`, topicId: "FOUNDATIONS", attemptIndex: 0, isCorrect: index < correct,
  rawAnswer: { questionType: "numeric", data: { value: "0" } }, responseTimeMs, timestamp: index * 1000,
}));

await run("default star thresholds award passed, strong, and excellent results", () => {
  assert.deepEqual(DEFAULT_STAGE_SCORE_THRESHOLDS, { passed: 0.6, strong: 0.8, excellent: 0.9 });
  assert.equal(scoreStageResult(stage(), results(5)), 0);
  assert.equal(scoreStageResult(stage(), results(6)), 1);
  assert.equal(scoreStageResult(stage(), results(8)), 2);
  assert.equal(scoreStageResult(stage(), results(9)), 3);
});

await run("stage thresholds are configurable and checkpoints remain passable with one star", () => {
  const checkpoint = stage({ type: "checkpoint", scoring: { thresholds: { passed: 0.7, strong: 0.85, excellent: 0.95 } } });
  assert.equal(scoreStageResult(checkpoint, results(7)), 1);
  assert.equal(scoreStageResult(checkpoint, results(8)), 1);
  assert.equal(scoreStageResult(checkpoint, results(9)), 2);
  assert.equal(scoreStageResult(checkpoint, results(10)), 3);
});

await run("speed is ignored unless a stage explicitly targets fluency", () => {
  assert.equal(scoreStageResult(stage(), results(10, 120_000)), 3);
  const fluency = stage({ scoring: { fluency: { maximumMedianResponseTimeMs: 5_000, appliesFromStar: 3 } } });
  assert.equal(scoreStageResult(fluency, results(10, 6_000)), 2);
  assert.equal(scoreStageResult(fluency, results(10, 4_000)), 3);
});

await run("bonus stages can earn stars but never gate the main path", () => {
  const definition: LearningPath = { id: "NUMBERS_ALGEBRA", nameHe: "מסלול", chapters: [{ id: "chapter", nameHe: "פרק", stages: [stage({ id: "one" }), stage({ id: "bonus", type: "bonus" }), stage({ id: "two" })] }] };
  const progress = { studentId: "student", bestStarsByStage: { one: 1 as const, bonus: scoreStageResult(stage({ type: "bonus" }), results(9)) } };
  assert.equal(derivePathProgress(definition, progress).find((item) => item.stageId === "two")?.status, "available");
  assert.equal(progress.bestStarsByStage.bonus, 3);
});

await run("a passed shortcut bypasses only the chapter lead-up and preserves earned stars", () => {
  const chapter: Chapter = { id: "chapter", nameHe: "פרק", shortcutTest: { id: "shortcut", skillIds, passingAccuracy: 0.8 }, stages: [stage({ id: "one" }), stage({ id: "bonus", type: "bonus" }), stage({ id: "review", type: "review" }), stage({ id: "checkpoint", type: "checkpoint" }), stage({ id: "after" })] };
  const definition: LearningPath = { id: "NUMBERS_ALGEBRA", nameHe: "מסלול", chapters: [chapter] };
  assert.equal(shortcutPassed(chapter, results(7)), false);
  assert.equal(shortcutPassed(chapter, results(8)), true);
  assert.deepEqual(shortcutBypassStageIds(chapter), ["one", "review"]);
  const progress = { studentId: "student", bestStarsByStage: {}, bypassedStageIds: shortcutBypassStageIds(chapter), passedShortcutIds: ["shortcut"] };
  const states = derivePathProgress(definition, progress);
  assert.deepEqual(states.map((item) => [item.stageId, item.status, item.stars]), [["one", "completed", 0], ["bonus", "available", 0], ["review", "completed", 0], ["checkpoint", "available", 0], ["after", "locked", 0]]);
});

await run("offline session history restores best stars and shortcut bypass independently", () => {
  const base = { studentId: "student", selectedSkillIds: ["AR_PLACE_VALUE"], settings: { mode: "fixed" as const, questionCount: 5 as const }, startedAt: 0, endedAt: 5_000, source: "freePractice" as const, strategy: "balanced" as const, status: "completed" as const, endReason: "completed" as const, questionCount: 5, correctCount: 3, incorrectCount: 2, accuracy: 0.6 };
  const firstChapter = LEARNING_PATHS[0].chapters[0];
  const progress = progressFromSessions("student", LEARNING_PATHS, [
    { ...base, id: "zero", learningStage: { pathId: "NUMBERS_ALGEBRA", stageId: "NA_PLACE_VALUE" }, stageStars: 0 },
    { ...base, id: "two", learningStage: { pathId: "NUMBERS_ALGEBRA", stageId: "NA_PLACE_VALUE" }, stageStars: 2 },
    { ...base, id: "shortcut", selectedSkillIds: [...firstChapter.shortcutTest!.skillIds], learningShortcut: { pathId: "NUMBERS_ALGEBRA", chapterId: firstChapter.id, shortcutId: firstChapter.shortcutTest!.id }, shortcutPassed: true },
  ]);
  assert.equal(progress.bestStarsByStage.NA_PLACE_VALUE, 2);
  assert.deepEqual(progress.bypassedStageIds, ["NA_PLACE_VALUE", "NA_ADD_SUBTRACT", "NA_DECIMAL_REVIEW"]);
  assert.deepEqual(progress.passedShortcutIds, ["NA_DECIMAL_SHORTCUT"]);
});

await run("shortcut sessions persist their result without inventing mastery", async () => {
  const persistence = new MemoryPersistenceDriver();
  const sessions = new DurableSessionRepository(persistence);
  const attempts = { getAttemptsForSkill: async () => [] } as unknown as AttemptRepository;
  const service = new StudentPracticeService(attempts, sessions, new DurablePersonalBestRepository(persistence), { flush: async () => {} } as unknown as SyncCoordinator);
  const chapter = LEARNING_PATHS[0].chapters[0];
  const reference = { pathId: "NUMBERS_ALGEBRA" as const, chapterId: chapter.id, shortcutId: chapter.shortcutTest!.id };
  const started = await service.start({ studentId: "student", skillIds: [...chapter.shortcutTest!.skillIds], settings: { mode: "fixed", questionCount: 5 }, learningShortcut: reference });
  const answers = results(8).slice(0, 5).map((result, index) => ({ ...result, isCorrect: index < 4 }));
  const finished = await service.finish({ ...createInitialSessionState(started.session), status: "ended", endReason: "completed", endedAt: 5_000, results: answers });
  assert.equal(finished.shortcutPassed, true);
  assert.equal((await sessions.getSession(started.session.id))?.shortcutPassed, true);
  const mastery = projectMastery({ studentId: "student", skillId: "AR_PLACE_VALUE", attempts: [] });
  assert.equal(mastery.attemptCount, 0);
  assert.equal(mastery.mastery, 0);
  const question = new SkillQuestionSelector(FOUNDATIONAL_QUESTIONS, 7).pick("AR_PLACE_VALUE", 0.5);
  const attempt = createAttemptFromAnswer({ session: started.session, question, result: answers[0]!, sequenceNumber: 1, attemptId: "attempt" });
  assert.equal(attempt.skillId, "AR_PLACE_VALUE");
  assert.equal(attempt.sessionId, started.session.id);
  await assert.rejects(() => service.start({ studentId: "student", skillIds: ["AR_PLACE_VALUE"], settings: { mode: "fixed", questionCount: 5 }, learningShortcut: reference }), /Invalid learning-shortcut/);
  await assert.rejects(() => service.start({ studentId: "student", skillIds: [...chapter.shortcutTest!.skillIds], settings: { mode: "fixed", questionCount: 10 }, learningShortcut: reference }), /Invalid learning-shortcut/);
});
