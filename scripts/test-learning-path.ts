import assert from "node:assert/strict";
import { SKILLS, getSkillById } from "../src/content/catalog/index.ts";
import { LEARNING_PATHS } from "../src/content/learningPaths.ts";
import { derivePathProgress, recordStageResult, totalEarnedStars } from "../src/domain/learningPath/progression.ts";
import type { Chapter, LearningPath, Stage, StageStars, StudentLearningProgress } from "../src/domain/learningPath/types.ts";
import { projectMastery } from "../src/domain/mastery/projectMastery.ts";
import { createPracticeSession } from "../src/domain/session/practiceSession.ts";
import { createRiddleSubmission, safeExternalResourceUrl, type RiddleDefinition } from "../src/domain/optionalLearningContent/types.ts";
import { mediaValidationIssues } from "../src/domain/media/types.ts";

function run(name: string, fn: () => void): void {
  fn();
  process.stdout.write(`PASS ${name}\n`);
}

const stage = (id: string, type: Stage["type"] = "normal", skillIds: Stage["skillIds"] = ["AR_PLACE_VALUE"]): Stage => ({ id, nameHe: id, type, skillIds });
const chapter = (id: string, stages: readonly Stage[]): Chapter => ({ id, nameHe: id, stages });
const path = (chapters: readonly Chapter[], id: LearningPath["id"] = "NUMBERS_ALGEBRA"): LearningPath => ({ id, nameHe: id, chapters });
const fresh = (studentId = "student-a"): StudentLearningProgress => ({ studentId, bestStarsByStage: {} });
const sequence = path([
  chapter("first", [stage("normal"), stage("bonus", "bonus"), stage("review", "review")]),
  chapter("second", [stage("checkpoint", "checkpoint"), stage("last")]),
]);
const states = (definition: LearningPath, progress: StudentLearningProgress) => derivePathProgress(definition, progress).map((entry) => [entry.stageId, entry.status, entry.stars]);

run("the two authored paths use unique identities and existing atomic Skills", () => {
  assert.deepEqual(LEARNING_PATHS.map((entry) => entry.id), ["NUMBERS_ALGEBRA", "GEOMETRY"]);
  const ids = new Set<string>();
  const coveredSkills = new Set<string>();
  const stageTypes = new Set<string>();
  function unique(id: string) {
    assert.ok(id.trim());
    assert.equal(ids.has(id), false, `Duplicate learning-path identity: ${id}`);
    ids.add(id);
  }
  for (const definition of LEARNING_PATHS as readonly LearningPath[]) {
    unique(definition.id);
    for (const entry of definition.chapters) {
      unique(entry.id);
      for (const optional of entry.optionalNodes ?? []) {
        unique(optional.id);
        if (optional.type === "riddle") assert.ok(["easy", "medium", "hard"].includes(optional.difficulty));
        else assert.equal(optional.opensExternally, true);
      }
      for (const item of entry.stages) {
        unique(item.id);
        assert.ok(item.skillIds.length >= 1);
        assert.equal(new Set(item.skillIds).size, item.skillIds.length);
        for (const skillId of item.skillIds) {
          assert.ok(getSkillById(skillId), `${item.id}: unknown atomic Skill ${skillId}`);
          coveredSkills.add(skillId);
        }
        stageTypes.add(item.type);
      }
      if (entry.shortcutTest) {
        unique(entry.shortcutTest.id);
        assert.ok(entry.shortcutTest.skillIds.length >= 1);
        const chapterSkills = new Set(entry.stages.flatMap((item) => item.skillIds));
        for (const skillId of entry.shortcutTest.skillIds) {
          assert.ok(getSkillById(skillId));
          assert.ok(chapterSkills.has(skillId));
        }
      }
    }
  }
  assert.deepEqual([...stageTypes].sort(), ["bonus", "checkpoint", "normal", "review"]);
  assert.deepEqual([...coveredSkills].sort(), SKILLS.map((skill) => skill.id).sort());
});

run("riddles and side resources are optional and leave normal Stage progression unchanged", () => {
  const riddle: RiddleDefinition = { id: "riddle", type: "riddle", titleHe: "חידה", promptHe: "הסבירו", difficulty: "medium" };
  const plain = path([chapter("chapter", [stage("one"), stage("two")])]);
  const optional = path([{ ...plain.chapters[0]!, optionalNodes: [riddle, { id: "tool", type: "tool", titleHe: "כלי", url: "https://example.com/tool", opensExternally: true }] }]);
  assert.deepEqual(derivePathProgress(optional, fresh()), derivePathProgress(plain, fresh()));
  const after = recordStageResult(optional, fresh(), "one", 1);
  assert.equal(derivePathProgress(optional, after).find((entry) => entry.stageId === "two")?.status, "available");
  assert.equal(totalEarnedStars([optional], after), 1);
});

run("riddle submissions stay separate from Mastery and media and URLs validate safely", () => {
  const riddle: RiddleDefinition = { id: "riddle", type: "riddle", titleHe: "חידה", promptHe: "הסבירו", difficulty: "hard", finalAnswer: { acceptedAnswers: ["42"] } };
  const submission = createRiddleSubmission({ riddle, studentId: "student", responseText: "כך פתרתי", finalAnswerText: "42", submissionId: "submission", now: "2026-01-01T00:00:00.000Z" });
  assert.equal(submission.status, "submitted"); assert.equal(submission.finalAnswerCorrect, true); assert.equal("skillId" in submission, false);
  assert.deepEqual(projectMastery({ studentId: "student", skillId: "AR_PLACE_VALUE", attempts: [], calculatedAt: "x" }).attemptCount, 0);
  assert.ok(mediaValidationIssues({ type: "image", src: "diagram.svg", alt: "", role: "instructional" }).length);
  assert.deepEqual(mediaValidationIssues({ type: "image", src: "diagram.svg", alt: "תרשים", role: "instructional" }), []);
  assert.equal(safeExternalResourceUrl("javascript:alert(1)"), null);
  assert.equal(safeExternalResourceUrl("https://example.com/resource"), "https://example.com/resource");
});

run("a new student can start only the first main stage", () => {
  assert.deepEqual(states(sequence, fresh()), [
    ["normal", "available", 0], ["bonus", "locked", 0], ["review", "locked", 0],
    ["checkpoint", "locked", 0], ["last", "locked", 0],
  ]);
});

run("zero stars leave a stage incomplete and the next main stage locked", () => {
  const progress = recordStageResult(sequence, fresh(), "normal", 0);
  assert.deepEqual(states(sequence, progress), states(sequence, fresh()));
});

run("each reward from one to three stars completes and unlocks the next main stage", () => {
  for (const stars of [1, 2, 3] as const) {
    const progress = recordStageResult(sequence, fresh(), "normal", stars);
    assert.deepEqual(states(sequence, progress), [
      ["normal", "completed", stars], ["bonus", "available", 0], ["review", "available", 0],
      ["checkpoint", "locked", 0], ["last", "locked", 0],
    ]);
  }
});

run("a one-star path unlock leaves attempt-based Skill mastery authoritative", () => {
  const progress = recordStageResult(sequence, fresh(), "normal", 1);
  assert.equal(derivePathProgress(sequence, progress).find((entry) => entry.stageId === "review")?.status, "available");
  const mastery = projectMastery({ studentId: progress.studentId, skillId: "AR_PLACE_VALUE", attempts: [], evidencePolicy: getSkillById("AR_PLACE_VALUE")!.evidencePolicy });
  assert.equal(mastery.attemptCount, 0);
  assert.equal(mastery.mastery, 0);
  assert.equal(mastery.evidenceLevel, "insufficient");
});

run("replays preserve the best stars and cannot revoke an unlock", () => {
  let progress = recordStageResult(sequence, fresh(), "normal", 1);
  progress = recordStageResult(sequence, progress, "normal", 2);
  assert.equal(progress.bestStarsByStage.normal, 2);
  for (const stars of [0, 1, 2] as const) progress = recordStageResult(sequence, progress, "normal", stars);
  assert.equal(progress.bestStarsByStage.normal, 2);
  progress = recordStageResult(sequence, progress, "normal", 3);
  progress = recordStageResult(sequence, progress, "normal", 0);
  assert.equal(progress.bestStarsByStage.normal, 3);
  assert.equal(derivePathProgress(sequence, progress).find((entry) => entry.stageId === "review")?.status, "available");
});

run("total stars sum authored bests once and a two-to-three replay adds only one", () => {
  let progress = recordStageResult(sequence, fresh(), "normal", 2);
  progress = recordStageResult(sequence, progress, "bonus", 3);
  const before = totalEarnedStars([sequence], { ...progress, bestStarsByStage: { ...progress.bestStarsByStage, staleStage: 3 } });
  assert.equal(before, 5, "unknown stale stage IDs are not visible rewards");
  progress = recordStageResult(sequence, progress, "normal", 3);
  assert.equal(totalEarnedStars([sequence], progress) - before, 1);
  progress = recordStageResult(sequence, progress, "normal", 1);
  assert.equal(totalEarnedStars([sequence], progress), 6, "a worse replay cannot reduce the total");
});

run("review and checkpoint stages gate progression across chapter boundaries", () => {
  let progress = recordStageResult(sequence, fresh(), "normal", 1);
  assert.throws(() => recordStageResult(sequence, progress, "checkpoint", 3), /locked/);
  progress = recordStageResult(sequence, progress, "review", 1);
  assert.deepEqual(derivePathProgress(sequence, progress).find((entry) => entry.stageId === "checkpoint"), {
    chapterId: "second", stageId: "checkpoint", stars: 0, status: "available",
  });
  assert.throws(() => recordStageResult(sequence, progress, "last", 1), /locked/);
  progress = recordStageResult(sequence, progress, "checkpoint", 1);
  progress = recordStageResult(sequence, progress, "last", 1);
  assert.equal(progress.bestStarsByStage.last, 1);
  assert.equal(progress.bestStarsByStage.bonus, undefined);
});

run("bonus rewards never substitute for a missing main-stage reward", () => {
  let progress = recordStageResult(sequence, fresh(), "normal", 1);
  progress = recordStageResult(sequence, progress, "bonus", 3);
  assert.throws(() => recordStageResult(sequence, progress, "checkpoint", 1), /locked/);
  assert.equal(derivePathProgress(sequence, progress).find((entry) => entry.stageId === "review")?.status, "available");
});

run("leading, consecutive, and trailing bonus stages never block the main path", () => {
  const definition = path([
    chapter("optional", [stage("lead", "bonus")]),
    chapter("main", [stage("one"), stage("extra-a", "bonus"), stage("extra-b", "bonus"), stage("two"), stage("tail", "bonus")]),
  ]);
  assert.equal(derivePathProgress(definition, fresh()).find((entry) => entry.stageId === "one")?.status, "available");
  let progress = recordStageResult(definition, fresh(), "one", 1);
  progress = recordStageResult(definition, progress, "two", 1);
  assert.ok(derivePathProgress(definition, progress).every((entry) => entry.status !== "locked"));
});

run("empty chapters and the unpopulated Geometry path are safe", () => {
  assert.deepEqual(derivePathProgress(LEARNING_PATHS[1], fresh()), []);
  const definition = path([chapter("empty-a", []), chapter("one", [stage("a")]), chapter("empty-b", []), chapter("two", [stage("b")])]);
  const progress = recordStageResult(definition, fresh(), "a", 1);
  assert.deepEqual(states(definition, progress), [["a", "completed", 1], ["b", "available", 0]]);
  assert.throws(() => recordStageResult(LEARNING_PATHS[1], fresh(), "missing", 1), /Unknown stage/);
});

run("paths start independently and student rewards do not leak to another student", () => {
  const geometryFixture = path([chapter("geometry", [stage("geometry-start")])], "GEOMETRY");
  const firstStudent = recordStageResult(sequence, fresh(), "normal", 3);
  assert.equal(derivePathProgress(geometryFixture, firstStudent)[0]?.status, "available");
  const bothPaths = recordStageResult(geometryFixture, firstStudent, "geometry-start", 1);
  assert.equal(bothPaths.bestStarsByStage.normal, 3);
  assert.equal(bothPaths.studentId, "student-a");
  assert.deepEqual(states(sequence, fresh("student-b")), states(sequence, fresh()));
});

run("a review can be inserted at a stable ID without fixed chapter sizes", () => {
  const original = path([chapter("chapter", [stage("a"), stage("b"), stage("c")])]);
  let progress = recordStageResult(original, fresh(), "a", 2);
  progress = recordStageResult(original, progress, "b", 1);
  const adapted = path([chapter("chapter", [stage("a"), stage("inserted-review", "review"), stage("b"), stage("c")])]);
  assert.deepEqual(states(adapted, progress), [
    ["a", "completed", 2], ["inserted-review", "available", 0], ["b", "completed", 1], ["c", "locked", 0],
  ]);
  progress = recordStageResult(adapted, progress, "b", 3);
  assert.throws(() => recordStageResult(adapted, progress, "c", 1), /locked/);
  progress = recordStageResult(adapted, progress, "inserted-review", 1);
  assert.equal(derivePathProgress(adapted, progress).at(-1)?.status, "available");
});

run("inserting an optional bonus preserves the next main-stage unlock", () => {
  const original = path([chapter("chapter", [stage("a"), stage("b")])]);
  const progress = recordStageResult(original, fresh(), "a", 1);
  const adapted = path([chapter("chapter", [stage("a"), stage("inserted-bonus", "bonus"), stage("b")])]);
  assert.deepEqual(states(adapted, progress), [["a", "completed", 1], ["inserted-bonus", "available", 0], ["b", "available", 0]]);
});

run("Skill prerequisites stay advisory and direct Skill practice is independent", () => {
  assert.ok(getSkillById("EQ_ADD")!.prerequisites.length > 0);
  const definition = path([chapter("equations", [stage("equations", "normal", ["EQ_ADD"]), stage("later", "normal", ["EQ_MUL"])])]);
  assert.equal(derivePathProgress(definition, fresh())[0]?.status, "available");
  assert.equal(recordStageResult(definition, fresh(), "equations", 1).bestStarsByStage.equations, 1);
  const session = createPracticeSession({ id: "practice", studentId: "student-a", selectedSkillIds: ["EQ_MUL"], settings: { mode: "practice" }, startedAt: 0 });
  assert.deepEqual(session.selectedSkillIds, ["EQ_MUL"]);
});

run("cluster rewards do not complete other stages or create atomic mastery evidence", () => {
  const definition = path([chapter("cluster", [stage("cluster", "normal", ["AR_ADD_FACTS", "AR_SUB_FACTS"]), stage("same-skill", "review", ["AR_ADD_FACTS"])])]);
  const progress = recordStageResult(definition, fresh(), "cluster", 3);
  assert.deepEqual(states(definition, progress), [["cluster", "completed", 3], ["same-skill", "available", 0]]);
  for (const skillId of ["AR_ADD_FACTS", "AR_SUB_FACTS"]) {
    const mastery = projectMastery({ studentId: progress.studentId, skillId, attempts: [], evidencePolicy: getSkillById(skillId)!.evidencePolicy });
    assert.equal(mastery.attemptCount, 0);
    assert.equal(mastery.mastery, 0);
    assert.equal(mastery.evidenceLevel, "insufficient");
  }
});

run("shortcut metadata has no implicit award or unlock effect", () => {
  const base = chapter("chapter", [stage("a"), stage("b")]);
  const shortcut = { ...base, shortcutTest: { id: "shortcut", skillIds: ["AR_PLACE_VALUE"] as const } };
  assert.deepEqual(derivePathProgress(path([shortcut]), fresh()), derivePathProgress(path([base]), fresh()));
  assert.throws(() => recordStageResult(path([shortcut]), fresh(), "shortcut", 3), /Unknown stage/);
});

run("results reject unknown or locked stages and invalid star values", () => {
  assert.throws(() => recordStageResult(sequence, fresh(), "missing", 1), /Unknown stage/);
  assert.throws(() => recordStageResult(sequence, fresh(), "review", 1), /locked/);
  for (const stars of [-1, 4, 1.5, NaN, Infinity, -Infinity, "1", null, undefined]) {
    assert.throws(() => recordStageResult(sequence, fresh(), "normal", stars as StageStars), /integer from 0 to 3/);
  }
});

run("derivation and recording leave definitions and previous rewards unchanged", () => {
  const definition = path([chapter("chapter", [Object.freeze(stage("a")), Object.freeze(stage("b"))])]);
  Object.freeze(definition.chapters[0]!.stages);
  Object.freeze(definition.chapters[0]);
  Object.freeze(definition.chapters);
  Object.freeze(definition);
  const progress = Object.freeze({ studentId: "student-a", bestStarsByStage: Object.freeze({ unrelated: 2 as const }) });
  const before = JSON.stringify(definition);
  derivePathProgress(definition, progress);
  const updated = recordStageResult(definition, progress, "a", 1);
  assert.deepEqual(progress.bestStarsByStage, { unrelated: 2 });
  assert.deepEqual(updated.bestStarsByStage, { unrelated: 2, a: 1 });
  assert.equal(JSON.stringify(definition), before);
});
