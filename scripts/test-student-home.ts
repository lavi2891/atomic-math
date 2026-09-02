import assert from "node:assert/strict";
import type { AttemptRepository } from "../src/domain/attempts/AttemptRepository.ts";
import type { MasterySnapshot } from "../src/domain/mastery/projectMastery.ts";
import { contentBackedCatalog } from "../src/domain/studentHome/contentAvailability.ts";
import { chooseFresherMastery, deriveSkillDisplayState, fluencyLabel, isAssignmentComplete, sortAssignments } from "../src/domain/studentHome/deriveStudentHome.ts";
import { assignmentSessionLaunch, isSkillSelected, toggleSkillSelection } from "../src/domain/studentHome/sessionLaunch.ts";
import type { Assignment, CachedStudentHome } from "../src/domain/studentHome/types.ts";
import { StudentHomeService } from "../src/app/studentHome/StudentHomeService.ts";
import { DOMAINS, SKILLS } from "../src/content/catalog/index.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import { AppsScriptClient } from "../src/infrastructure/sync/AppsScriptClient.ts";

async function run(name: string, testFn: () => void | Promise<void>) { await testFn(); process.stdout.write(`PASS ${name}\n`); }
const snapshot = (mastery: number, evidenceLevel: MasterySnapshot["evidenceLevel"], attemptCount = 12, lastAttemptAt = "2026-01-01T00:00:00.000Z"): MasterySnapshot => ({ studentId: "student", skillId: "INT_ADD", mastery, accuracy: mastery, attemptCount, recentAverage: mastery / 100, historyAverage: mastery / 100, evidenceLevel, lastAttemptAt, calculatedAt: lastAttemptAt });
const assignment = (overrides: Partial<Assignment> = {}): Assignment => ({ assignmentId: "A", studentId: "student", skillId: "INT_ADD", targetMastery: 85, priority: 1, active: true, ...overrides });
const emptyAttempts = { getAttemptsForSkill: async () => [] } as unknown as AttemptRepository;

await run("assignments sort by priority and omit inactive rows", () => {
  assert.deepEqual(sortAssignments([assignment({ assignmentId: "late", priority: 8 }), assignment({ assignmentId: "off", active: false }), assignment({ assignmentId: "first", priority: 1 })]).map((item) => item.assignmentId), ["first", "late"]);
});

await run("assignment completion requires both target mastery and established evidence", () => {
  assert.equal(isAssignmentComplete(assignment(), snapshot(90, "emerging")), false);
  assert.equal(isAssignmentComplete(assignment(), snapshot(84, "established")), false);
  assert.equal(isAssignmentComplete(assignment(), snapshot(90, "established")), true);
});

await run("skill states and fluency remain separate dimensions", () => {
  assert.equal(deriveSkillDisplayState(undefined), "not_started");
  assert.equal(deriveSkillDisplayState(snapshot(95, "emerging", 4)), "starting");
  assert.equal(deriveSkillDisplayState(snapshot(35, "established")), "needs_support");
  assert.equal(deriveSkillDisplayState(snapshot(72, "established")), "nearly_there");
  assert.equal(deriveSkillDisplayState(snapshot(90, "established")), "mastered");
  assert.equal(fluencyLabel({ ...snapshot(90, "established"), fluencyMedianMs: 3000 }), "שטף: יציב");
});

await run("assignment starts exactly its skill in a fixed ten-question session", () => {
  assert.deepEqual(assignmentSessionLaunch("INT_SUB"), { skillIds: ["INT_SUB"], settings: { mode: "fixed", questionCount: 10 } });
});

await run("free-practice selection supports multiple skills and observable selection state", () => {
  const selected = ["INT_ADD", "INT_SUB"];
  assert.equal(isSkillSelected(selected, "INT_ADD"), true);
  assert.equal(isSkillSelected(selected, "INT_MUL"), false);
});

await run("free-practice selection supports selecting and deselecting exactly one skill", () => {
  const selected = toggleSkillSelection([], "INT_ADD");
  assert.deepEqual(selected, ["INT_ADD"]);
  assert.equal(isSkillSelected(selected, "INT_ADD"), true);
  assert.deepEqual(toggleSkillSelection(selected, "INT_ADD"), []);
});

await run("only domains with active question-backed skills appear", () => {
  const catalog = contentBackedCatalog(DOMAINS, SKILLS, [{ skillId: "INT_ADD" }] as never);
  assert.equal(catalog.length, 1); assert.deepEqual(catalog[0]?.skills.map((skill) => skill.id), ["INT_ADD"]);
  assert.equal(contentBackedCatalog(DOMAINS, SKILLS, [] as never).length, 0);
});

await run("newer local mastery wins over stale remote mastery", () => {
  assert.equal(chooseFresherMastery(snapshot(40, "established", 10), snapshot(80, "established", 11)).mastery, 80);
  assert.equal(chooseFresherMastery(snapshot(40, "established", 12, "2026-02-01T00:00:00.000Z"), snapshot(80, "established", 11, "2026-01-01T00:00:00.000Z")).mastery, 40);
});

await run("unconfigured startup remains usable with local mastery and no assignments", async () => {
  const home = await new StudentHomeService(emptyAttempts, new MemoryPersistenceDriver(), null).load("student");
  assert.equal(home.connection, "unconfigured"); assert.equal(home.source, "local"); assert.deepEqual(home.assignments, []);
  assert.equal(Object.keys(home.masteryBySkill).length, SKILLS.length);
});

await run("offline startup falls back to the durable student-home cache", async () => {
  const persistence = new MemoryPersistenceDriver();
  const cached: CachedStudentHome = { studentId: "student", student: { studentId: "student", displayName: "Dana", active: true }, assignments: [assignment()], masteryBySkill: { INT_ADD: snapshot(70, "established") }, cachedAt: "2026-01-01T00:00:00.000Z" };
  await persistence.putStudentHome(cached);
  const failingFetch = (async () => { throw new Error("offline"); }) as typeof fetch;
  const home = await new StudentHomeService(emptyAttempts, persistence, new AppsScriptClient("https://example.invalid", failingFetch)).load("student");
  assert.equal(home.source, "cache"); assert.equal(home.connection, "offline"); assert.equal(home.student?.displayName, "Dana"); assert.equal(home.assignments.length, 1);
});

await run("malformed optional cache collections degrade to an empty usable home", async () => {
  const persistence = new MemoryPersistenceDriver();
  persistence.homes.set("student", { studentId: "student", student: null, assignments: null, masteryBySkill: null, cachedAt: 7 } as unknown as CachedStudentHome);
  const home = await new StudentHomeService(emptyAttempts, persistence, null).load("student");
  assert.deepEqual(home.assignments, []);
  assert.equal(Object.keys(home.masteryBySkill).length, SKILLS.length);
});
