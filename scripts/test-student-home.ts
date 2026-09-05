import assert from "node:assert/strict";
import type { AttemptRepository } from "../src/domain/attempts/AttemptRepository.ts";
import type { MasterySnapshot } from "../src/domain/mastery/projectMastery.ts";
import { contentBackedCatalog } from "../src/domain/studentHome/contentAvailability.ts";
import { chooseFresherMastery, deriveSkillDisplayState, fluencyLabel, isAssignmentComplete, sortAssignments } from "../src/domain/studentHome/deriveStudentHome.ts";
import { assignmentSessionLaunch, isSkillSelected, toggleSkillSelection } from "../src/domain/studentHome/sessionLaunch.ts";
import { selectionState, toggleChild, toggleParent } from "../src/domain/studentHome/treeSelection.ts";
import type { Assignment, CachedStudentHome } from "../src/domain/studentHome/types.ts";
import { StudentHomeService } from "../src/app/studentHome/StudentHomeService.ts";
import { DOMAINS, SKILLS } from "../src/content/catalog/index.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import { AppsScriptClient } from "../src/infrastructure/sync/AppsScriptClient.ts";
import { resolveQuickPracticeScope } from "../src/domain/studentHome/quickPractice.ts";
import { FOUNDATIONAL_QUESTIONS } from "../src/content/foundations/questions.ts";
import { LEARNING_PATHS } from "../src/content/learningPaths.ts";
import { learningPathCards } from "../src/domain/studentHome/learningPathCards.ts";
import { progressFromSessions } from "../src/domain/learningPath/sessionProgress.ts";
import type { LearningPath } from "../src/domain/learningPath/types.ts";
import type { PersistedSession } from "../src/domain/sync/types.ts";
import { StudentPracticeService } from "../src/app/session/StudentPracticeService.ts";
import { DurableSessionRepository } from "../src/infrastructure/persistence/DurableRepositories.ts";
import { DurablePersonalBestRepository } from "../src/infrastructure/persistence/DurablePersonalBestRepository.ts";
import type { SyncCoordinator } from "../src/infrastructure/sync/SyncCoordinator.ts";
import { createInitialSessionState } from "../src/domain/session/practiceSession.ts";
import { repeatSessionConfig } from "../src/domain/session/studentSessionUx.ts";

async function run(name: string, testFn: () => void | Promise<void>) { await testFn(); process.stdout.write(`PASS ${name}\n`); }
const snapshot = (mastery: number, evidenceLevel: MasterySnapshot["evidenceLevel"], attemptCount = 12, lastAttemptAt = "2026-01-01T00:00:00.000Z"): MasterySnapshot => ({ studentId: "student", skillId: "INT_ADD", mastery, accuracy: mastery, attemptCount, recentAverage: mastery / 100, historyAverage: mastery / 100, evidenceLevel, evidenceCoverage: { categories: {}, bands: {}, sufficient: true }, lastAttemptAt, calculatedAt: lastAttemptAt });
const assignment = (overrides: Partial<Assignment> = {}): Assignment => ({ assignmentId: "A", studentId: "student", skillId: "INT_ADD", targetMastery: 85, priority: 1, active: true, ...overrides });
const emptyAttempts = { getAttemptsForSkill: async () => [] } as unknown as AttemptRepository;
const allSkillIds = new Set(SKILLS.map((skill) => skill.id));
const freshProgress = { studentId: "student", bestStarsByStage: {} };
const stageSession = (overrides: Partial<PersistedSession> = {}): PersistedSession => ({
  id: "stage-session", studentId: "student", selectedSkillIds: ["AR_PLACE_VALUE"], settings: { mode: "fixed", questionCount: 5 },
  learningStage: { pathId: "NUMBERS_ALGEBRA", stageId: "NA_PLACE_VALUE" }, startedAt: 0, endedAt: 1000,
  source: "freePractice", strategy: "balanced", status: "completed", endReason: "completed", questionCount: 5,
  correctCount: 0, incorrectCount: 5, accuracy: 0, ...overrides,
});

await run("home cards start at the first stage and keep Geometry visibly unavailable", () => {
  const cards = learningPathCards(LEARNING_PATHS, freshProgress, allSkillIds);
  assert.equal(cards[0]!.stage?.id, "NA_PLACE_VALUE");
  assert.equal(cards[0]!.chapter?.id, "NA_DECIMAL_ARITHMETIC");
  assert.equal(cards[0]!.availability, "ready");
  assert.equal(cards[0]!.completedStages, 0);
  assert.equal(cards[0]!.totalStages, 4);
  assert.equal(cards[1]!.availability, "coming_soon");
});

await run("home resumes by stars, skips bonus stages, and advances chapters", () => {
  const numbers: LearningPath = LEARNING_PATHS[0];
  const beforeBonus = numbers.chapters.slice(0, 2).flatMap((chapter) => chapter.stages).filter((stage) => stage.type !== "bonus");
  const progress = { studentId: "student", bestStarsByStage: Object.fromEntries(beforeBonus.map((stage) => [stage.id, 1 as const])) };
  const card = learningPathCards(LEARNING_PATHS, progress, allSkillIds)[0]!;
  assert.equal(card.chapter?.id, "NA_OPERATION_ORDER");
  assert.equal(card.stage?.id, "NA_OPERATION_ORDER_BASIC");
  assert.equal(card.completedStages, 0);
  assert.equal(card.totalStages, 1);
});

await run("home never skips an unavailable stage or launches a partial Skill cluster", () => {
  const progress = { studentId: "student", bestStarsByStage: { NA_PLACE_VALUE: 1 as const } };
  const card = learningPathCards(LEARNING_PATHS, progress, new Set(["AR_ADD_FACTS"]))[0]!;
  assert.equal(card.stage?.id, "NA_ADD_SUBTRACT");
  assert.equal(card.availability, "content_unavailable");
  assert.equal(learningPathCards(LEARNING_PATHS, undefined, allSkillIds)[0]!.availability, "progress_unavailable");
});

await run("completed paths offer a replay with full chapter progress", () => {
  const stages = (LEARNING_PATHS as readonly LearningPath[]).flatMap((path) => path.chapters.flatMap((chapter) => chapter.stages));
  const progress = { studentId: "student", bestStarsByStage: Object.fromEntries(stages.filter((stage) => stage.type !== "bonus").map((stage) => [stage.id, 1 as const])) };
  const card = learningPathCards(LEARNING_PATHS, progress, allSkillIds)[0]!;
  assert.equal(card.pathCompleted, true);
  assert.equal(card.stage?.id, "NA_EQUATIONS_CHECKPOINT");
  assert.equal(card.completedStages, card.totalStages);
  assert.equal(card.availability, "ready");
});

await run("only completed fixed stage sessions restore a one-star completion reward", () => {
  const invalid = [
    stageSession({ status: "active" }), stageSession({ status: "abandoned", endReason: "stopped" }),
    stageSession({ studentId: "other" }), stageSession({ questionCount: 4 }), stageSession({ learningStage: undefined }),
    stageSession({ selectedSkillIds: ["AR_ADD_FACTS"] }), stageSession({ settings: { mode: "practice" } }),
    stageSession({ learningStage: { pathId: "GEOMETRY", stageId: "NA_PLACE_VALUE" } }),
  ];
  assert.deepEqual(progressFromSessions("student", LEARNING_PATHS, invalid), freshProgress);
  const completed = progressFromSessions("student", LEARNING_PATHS, [...invalid, stageSession(), stageSession()]);
  assert.deepEqual(completed.bestStarsByStage, { NA_PLACE_VALUE: 1 });
});

await run("Continue sessions persist stage identity, advance Home, and preserve atomic mastery", async () => {
  const persistence = new MemoryPersistenceDriver();
  const sessions = new DurableSessionRepository(persistence);
  const practice = new StudentPracticeService(emptyAttempts, sessions, new DurablePersonalBestRepository(persistence), { flush: async () => {} } as unknown as SyncCoordinator);
  const home = () => new StudentHomeService(emptyAttempts, persistence, null).load("student");
  const started = await practice.start({ studentId: "student", skillIds: ["AR_PLACE_VALUE"], settings: { mode: "fixed", questionCount: 5 }, learningStage: { pathId: "NUMBERS_ALGEBRA", stageId: "NA_PLACE_VALUE" } });
  assert.deepEqual((await sessions.getSession(started.session.id))?.learningStage, started.session.learningStage);
  assert.deepEqual((await home()).learningProgress, freshProgress);
  const results = Array.from({ length: 5 }, (_, i) => ({ questionId: `q-${i}`, topicId: "FOUNDATIONS", attemptIndex: 0, isCorrect: i < 4, rawAnswer: { questionType: "numeric" as const, data: { value: "0" } }, responseTimeMs: 1000, timestamp: i * 1000 }));
  const endedAt = Date.now() + 5000;
  await practice.finish({ ...createInitialSessionState(started.session), status: "ended", endReason: "completed", endedAt, results });
  const persisted = await sessions.getSession(started.session.id);
  assert.equal(persisted?.learningStage?.stageId, "NA_PLACE_VALUE");
  assert.equal(persisted?.stageStars, 2);
  assert.equal(persisted?.status, "completed");
  assert.equal(persisted?.endedAt, endedAt);
  const restored = await home();
  assert.equal(learningPathCards(LEARNING_PATHS, restored.learningProgress, allSkillIds)[0]!.stage?.id, "NA_ADD_SUBTRACT");
  assert.equal(restored.masteryBySkill.AR_PLACE_VALUE!.attemptCount, 0);
  assert.deepEqual(repeatSessionConfig(started.session).learningStage, started.session.learningStage);
  await assert.rejects(() => practice.start({ studentId: "student", skillIds: ["AR_ADD_FACTS"], settings: { mode: "fixed", questionCount: 5 }, learningStage: started.session.learningStage }), /Invalid learning-stage/);
});

await run("Home leaves progress unavailable when local session history cannot load", async () => {
  const persistence = new MemoryPersistenceDriver();
  persistence.listSessions = async () => { throw new Error("unavailable"); };
  const data = await new StudentHomeService(emptyAttempts, persistence, null).load("student");
  assert.equal(data.learningProgress, undefined);
  assert.equal(learningPathCards(LEARNING_PATHS, data.learningProgress, allSkillIds)[0]!.availability, "progress_unavailable");
});

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

await run("tree parent selection selects and clears every child", () => {
  assert.deepEqual(toggleParent([], ["A", "B"]), ["A", "B"]);
  assert.deepEqual(toggleParent(["A", "B", "OUTSIDE"], ["A", "B"]), ["OUTSIDE"]);
});

await run("tree selection exposes partial, all, and single-child states", () => {
  assert.equal(selectionState(["A"], ["A", "B"]), "partial");
  assert.equal(selectionState(["A", "B"], ["A", "B"]), "all");
  assert.equal(selectionState(toggleChild([], "A"), ["A"]), "all");
});

await run("collapse-independent tree state retains selected children", () => {
  const selected = toggleChild([], "A");
  let expanded = true; expanded = !expanded; expanded = !expanded;
  assert.equal(expanded, true); assert.deepEqual(selected, ["A"]);
});

await run("student labels preserve stable atomic skill identity", () => {
  const skill = SKILLS.find((item) => item.id === "INT_ADD")!;
  assert.equal(skill.id, "INT_ADD"); assert.equal(skill.nameHe, "חיבור מספרים מכוונים");
});

await run("only domains with active question-backed skills appear", () => {
  const catalog = contentBackedCatalog(DOMAINS, SKILLS, FOUNDATIONAL_QUESTIONS);
  assert.equal(catalog.length, 6); assert.ok(catalog.some((entry) => entry.skills.some((skill) => skill.id === "INT_ADD")));
  assert.equal(contentBackedCatalog(DOMAINS, SKILLS, [] as never).length, 0);
});

await run("quick practice prefers usable active assignments", () => {
  const result = resolveQuickPracticeScope({ assignments: [assignment({ skillId: "INT_SUB" })], masteryBySkill: {}, domains: DOMAINS, skills: SKILLS, definitions: FOUNDATIONAL_QUESTIONS });
  assert.deepEqual(result, { skillIds: ["INT_SUB"], reason: "assignments" });
});

await run("quick practice falls back to non-mastered evidence then foundations", () => {
  const learning = resolveQuickPracticeScope({ assignments: [], masteryBySkill: { INT_SUB: snapshot(60, "established") }, domains: DOMAINS, skills: SKILLS, definitions: FOUNDATIONAL_QUESTIONS });
  assert.deepEqual(learning, { skillIds: ["INT_SUB"], reason: "learning" });
  const fresh = resolveQuickPracticeScope({ assignments: [], masteryBySkill: {}, domains: DOMAINS, skills: SKILLS, definitions: FOUNDATIONAL_QUESTIONS });
  assert.equal(fresh.reason, "foundations"); assert.ok(fresh.skillIds.includes("AR_PLACE_VALUE"));
});

await run("quick practice filters unbacked content and handles no content offline", () => {
  const result = resolveQuickPracticeScope({ assignments: [assignment({ skillId: "NOT_READY" })], masteryBySkill: {}, domains: DOMAINS, skills: SKILLS, definitions: FOUNDATIONAL_QUESTIONS });
  assert.equal(result.reason, "foundations"); assert.equal(result.skillIds.includes("NOT_READY"), false);
  assert.deepEqual(resolveQuickPracticeScope({ assignments: [], masteryBySkill: {}, domains: DOMAINS, skills: SKILLS, definitions: [] as never }), { skillIds: [], reason: "no_content" });
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
