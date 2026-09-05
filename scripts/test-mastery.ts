import assert from "node:assert/strict";
import type { Attempt, SupportLevel } from "../src/domain/attempts/types.ts";
import { createAttemptFromAnswer, scoreAttempt } from "../src/domain/attempts/createAttempt.ts";
import { LocalAttemptRepository } from "../src/domain/attempts/LocalAttemptRepository.ts";
import { masteryConfig, validateMasteryConfig } from "../src/domain/mastery/config.ts";
import { evidenceLevelForAttemptCount, projectMastery } from "../src/domain/mastery/projectMastery.ts";
import type { Question, GeneratedQuestionInstance } from "../src/domain/questions/types.ts";
import { createPracticeSession } from "../src/domain/session/practiceSession.ts";

async function run(name: string, testFn: () => void | Promise<void>): Promise<void> {
  await testFn();
  process.stdout.write(`PASS ${name}\n`);
}

function attempt(index: number, options: Partial<Attempt> = {}): Attempt {
  const correct = options.correct ?? true;
  const supportLevel: SupportLevel = options.supportLevel ?? "independent";
  return {
    attemptId: options.attemptId ?? `A${index}`,
    sessionId: "S",
    studentId: options.studentId ?? "student",
    questionId: `Q${index}`,
    skillId: options.skillId ?? "SKILL",
    difficulty: 0.5,
    submittedAnswer: { questionType: "numeric", data: { value: "1" } },
    correct,
    supportLevel,
    scoreValue: options.scoreValue ?? scoreAttempt(correct, supportLevel),
    responseTimeMs: options.responseTimeMs ?? 1000,
    submittedAt: options.submittedAt ?? new Date(index * 1000).toISOString(),
    sequenceNumber: index,
    ...options,
  };
}

function mastery(attempts: Attempt[]) {
  return projectMastery({ studentId: "student", skillId: "SKILL", attempts, calculatedAt: "2026-01-01T00:00:00.000Z" });
}

await run("mastery handles one and fewer than ten attempts without inserted zeroes", () => {
  assert.equal(mastery([attempt(1)]).mastery, 100);
  assert.equal(mastery([attempt(1), attempt(2, { correct: false, scoreValue: 0 })]).mastery, 50);
});

await run("mastery handles exactly ten, between ten and fifty, and exactly fifty", () => {
  assert.equal(mastery(Array.from({ length: 10 }, (_, index) => attempt(index))).mastery, 100);
  assert.equal(mastery(Array.from({ length: 25 }, (_, index) => attempt(index))).attemptCount, 25);
  assert.equal(mastery(Array.from({ length: 50 }, (_, index) => attempt(index))).historyAverage, 1);
});

await run("latest ten overlap latest fifty exactly as configured", () => {
  const attempts = [
    ...Array.from({ length: 40 }, (_, index) => attempt(index, { correct: false, scoreValue: 0 })),
    ...Array.from({ length: 10 }, (_, index) => attempt(index + 40)),
  ];
  const snapshot = mastery(attempts);
  assert.equal(snapshot.recentAverage, 1);
  assert.equal(snapshot.historyAverage, 0.2);
  assert.equal(snapshot.mastery, 88);
});

await run("attempts older than the latest fifty are ignored", () => {
  const attempts = [
    ...Array.from({ length: 20 }, (_, index) => attempt(index, { correct: false, scoreValue: 0 })),
    ...Array.from({ length: 50 }, (_, index) => attempt(index + 20)),
  ];
  assert.equal(mastery(attempts).mastery, 100);
});

await run("support scoring is configurable and incorrect is always zero", () => {
  assert.equal(scoreAttempt(true, "independent"), 1);
  assert.equal(scoreAttempt(true, "hint"), 0.6);
  assert.equal(scoreAttempt(true, "guided"), 0.3);
  assert.equal(scoreAttempt(false, "independent"), 0);
  assert.equal(scoreAttempt(false, "hint"), 0);
  assert.equal(scoreAttempt(false, "guided"), 0);
});

await run("mastery weights total one and invalid weights are rejected", () => {
  assert.equal(masteryConfig.recentWeight + masteryConfig.historyWeight, 1);
  assert.throws(() => validateMasteryConfig({ ...masteryConfig, recentWeight: 0.9 }), /must total 1/);
});

await run("calculation is deterministic", () => {
  const attempts = [attempt(1), attempt(2, { supportLevel: "hint", scoreValue: 0.6 })];
  assert.deepEqual(mastery(attempts), mastery(attempts));
});

await run("evidence thresholds are independent of numerical mastery", () => {
  for (let count = 1; count <= 4; count += 1) assert.equal(evidenceLevelForAttemptCount(count), "insufficient");
  for (let count = 5; count <= 9; count += 1) assert.equal(evidenceLevelForAttemptCount(count), "emerging");
  assert.equal(evidenceLevelForAttemptCount(10), "established");
  assert.equal(mastery([attempt(1), attempt(2)]).evidenceLevel, "insufficient");
  assert.equal(mastery([attempt(1), attempt(2)]).mastery, 100);
});

await run("accuracy uses correctness independently of support score", () => {
  const snapshot = mastery([
    attempt(1, { correct: true, supportLevel: "guided", scoreValue: 0.3 }),
    attempt(2, { correct: false, scoreValue: 0 }),
  ]);
  assert.equal(snapshot.accuracy, 50);
  assert.equal(snapshot.mastery, 15);
});

await run("fluency uses median and ignores incorrect and guided answers", () => {
  const base = [
    attempt(1, { responseTimeMs: 100 }),
    attempt(2, { responseTimeMs: 300 }),
    attempt(3, { responseTimeMs: 5, correct: false, scoreValue: 0 }),
    attempt(4, { responseTimeMs: 10_000, supportLevel: "guided", scoreValue: 0.3 }),
  ];
  const even = projectMastery({ studentId: "student", skillId: "SKILL", attempts: base, fluencyEnabled: true, calculatedAt: "x" });
  assert.equal(even.fluencyMedianMs, 200);
  const odd = projectMastery({ studentId: "student", skillId: "SKILL", attempts: [...base, attempt(5, { responseTimeMs: 500 })], fluencyEnabled: true, calculatedAt: "x" });
  assert.equal(odd.fluencyMedianMs, 300);
});

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

await run("local repository stores authoritative attempts by student and skill", async () => {
  const repository = new LocalAttemptRepository(new MemoryStorage());
  await repository.saveAttempt(attempt(1));
  await repository.saveAttempt(attempt(2));
  await repository.saveAttempt(attempt(3, { skillId: "OTHER" }));
  assert.equal((await repository.getAttemptsForSkill("student", "SKILL")).length, 2);
  assert.equal((await repository.getRecentAttemptsForSkill("student", "SKILL", 1))[0]?.attemptId, "A2");
});

await run("session answer creates an attempt with the actual skill", () => {
  const session = createPracticeSession({ id: "SESSION", studentId: "student", selectedSkillIds: ["A", "B"], settings: { mode: "practice" }, startedAt: 0 });
  const question: Question = { id: "Q", topicId: "SIGNED_NUMBERS", skillId: "B", type: "numeric", category: "calculation", literacyDemand: "none", difficulty: 0.4, prompt: [], correctAnswers: ["1"] };
  const created = createAttemptFromAnswer({ session, question, result: { questionId: "Q", topicId: "SIGNED_NUMBERS", attemptIndex: 0, isCorrect: true, rawAnswer: { questionType: "numeric", data: { value: "1" } }, normalizedAnswer: 1, responseTimeMs: 500, timestamp: 1000 }, sequenceNumber: 1, attemptId: "ATTEMPT" });
  assert.equal(created.skillId, "B");
  assert.equal(created.normalizedAnswer, 1);
  assert.equal(created.literacyDemand, "none");
});

await run("literacy metadata does not change mastery projection", () => {
  const baseline = [attempt(1), attempt(2, { correct: false, scoreValue: 0 }), attempt(3)];
  assert.deepEqual(mastery(baseline.map((item) => ({ ...item, literacyDemand: "high" }))), mastery(baseline));
});

await run("multi-skill session creates attempts under each presented skill", () => {
  const session = createPracticeSession({ id: "SESSION", studentId: "student", selectedSkillIds: ["A", "B"], settings: { mode: "practice" }, startedAt: 0 });
  const answerResult = (id: string) => ({ questionId: id, topicId: "SIGNED_NUMBERS", attemptIndex: 0, isCorrect: true, rawAnswer: { questionType: "numeric" as const, data: { value: "1" } }, responseTimeMs: 500, timestamp: 1000 });
  const questions: Question[] = [
    { id: "QA", topicId: "SIGNED_NUMBERS", skillId: "A", type: "numeric", prompt: [], correctAnswers: ["1"] },
    { id: "QB", topicId: "SIGNED_NUMBERS", skillId: "B", type: "numeric", prompt: [], correctAnswers: ["1"] },
  ];
  const created = questions.map((question, index) => createAttemptFromAnswer({ session, question, result: answerResult(question.id), sequenceNumber: index + 1, attemptId: `ATT${index}` }));
  assert.deepEqual(created.map((item) => item.skillId), ["A", "B"]);
});

await run("generated identity is preserved and missing skill identity fails loudly", () => {
  const session = createPracticeSession({ id: "SESSION", studentId: "student", selectedSkillIds: ["A"], settings: { mode: "practice" }, startedAt: 0 });
  const generated: GeneratedQuestionInstance = { id: "BASE__instance", baseId: "BASE", templateId: "GEN", generatorSeed: 42, renderedExpression: "1+1", sampledParams: {}, topicId: "SIGNED_NUMBERS", skillId: "A", supportingSkills: ["ALG_VARIABLE"], type: "numeric", prompt: [], correctAnswers: ["2"] };
  const result = { questionId: generated.id, topicId: "SIGNED_NUMBERS", attemptIndex: 0, isCorrect: true, rawAnswer: { questionType: "numeric" as const, data: { value: "2" } }, responseTimeMs: 500, timestamp: 1000 };
  const created = createAttemptFromAnswer({ session, question: generated, result, sequenceNumber: 1, attemptId: "A" });
  assert.equal(created.questionId, "BASE");
  assert.equal(created.questionInstanceId, "BASE__instance");
  assert.equal(created.generatorId, "GEN");
  assert.equal(created.generatorSeed, 42);
  assert.deepEqual(created.supportingSkills, ["ALG_VARIABLE"]);
  const legacy = { ...generated, skillId: undefined };
  assert.throws(() => createAttemptFromAnswer({ session, question: legacy, result, sequenceNumber: 1 }), /missing required skillId/);
});
