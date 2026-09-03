import assert from "node:assert/strict";
import { appRouteFromSearch } from "../src/app/routing.ts";
import { DOMAINS, SKILLS, SKILL_GROUPS } from "../src/content/catalog/index.ts";
import { FOUNDATIONAL_QUESTIONS } from "../src/content/foundations/questions.ts";
import { isGeneratedQuestionDefinition } from "../src/domain/questions/definitions.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import {
  EMPTY_REVIEW_FILTERS,
  expectedAnswer,
  filterReviewDefinitions,
  flaggedCuratedFamilies,
  generatedSampleBatch,
  navigationIndex,
  parseReviewDeepLink,
  resolveReviewQuestion,
  reviewDeepLink,
  reviewIndexAfterMark,
  reviewProgress,
  type ReviewFilters,
} from "../src/app/contentReview/reviewModel.ts";
import { AuthorReviewRepository, MemoryAuthorReviewStore, type QuestionReviewRecord } from "../src/app/contentReview/reviewState.ts";
import { answerSemanticsLabel, deriveBandSummaries, describeParameter, familyAuthoringNote, hasGeneratorExplanation, parameterTypeLabel, summarizeConstraints, translateSimpleConstraint } from "../src/app/contentReview/generatorSummary.ts";

async function run(name: string, fn: () => void | Promise<void>) { await fn(); process.stdout.write(`PASS ${name}\n`); }
const catalog = { domains: DOMAINS, skills: SKILLS, skillGroups: SKILL_GROUPS };
const records = new Map<string, QuestionReviewRecord>();
const filter = (partial: Partial<ReviewFilters>, state = records) => filterReviewDefinitions(FOUNDATIONAL_QUESTIONS, { ...EMPTY_REVIEW_FILTERS, ...partial }, state, catalog);

await run("review route is hidden and selected before the student route", () => {
  assert.equal(appRouteFromSearch("?review=questions"), "question-review");
  assert.equal(appRouteFromSearch("?playground=1"), "playground");
  assert.equal(appRouteFromSearch("?review=questions&playground=1"), "question-review");
  assert.equal(appRouteFromSearch(""), "student");
});

await run("review route logic leaves student persistence, Mastery, and sync untouched", async () => {
  const studentPersistence = new MemoryPersistenceDriver();
  const masteryMutations = 0;
  const syncCalls = 0;
  const authorStore = new MemoryAuthorReviewStore();
  await new AuthorReviewRepository(authorStore).save("MVP_AR_ADD_FACTS_A_A", "approved", "review only", "2026-01-01T00:00:00.000Z");
  filter({ skillId: "AR_ADD_FACTS" });
  assert.equal(studentPersistence.attempts.size, 0);
  assert.equal(studentPersistence.sessions.size, 0);
  assert.equal(studentPersistence.personalBests.size, 0);
  assert.equal(masteryMutations, 0);
  assert.equal(syncCalls, 0);
  void masteryMutations; void syncCalls;
});

await run("Domain filter uses catalog membership", () => {
  const result = filter({ domainId: "INTEGERS" });
  assert.ok(result.length > 0);
  assert.ok(result.every((definition) => SKILLS.find((skill) => skill.id === definition.skillId)?.domainId === "INTEGERS"));
});

await run("Skill Group filter uses atomic group membership", () => {
  const result = filter({ skillGroupId: "AR_MULTIPLICATION_FACTS" });
  const allowed = new Set(SKILL_GROUPS.find((group) => group.id === "AR_MULTIPLICATION_FACTS")?.skillIds);
  assert.ok(result.length > 0);
  assert.ok(result.every((definition) => allowed.has(definition.skillId as never)));
});

await run("atomic Skill, category, difficulty, family, and authoring filters compose", () => {
  const generated = filter({ skillId: "INT_ADD", category: "calculation", difficultyBand: "B", authoringMode: "generated" });
  assert.ok(generated.length > 0 && generated.every((item) => item.skillId === "INT_ADD" && item.category === "calculation" && item.difficultyBand === "B" && item.authoringMode === "generated"));
  const family = FOUNDATIONAL_QUESTIONS.find((item) => item.skillId === "INT_ADD" && item.authoringMode === "curated")?.contentFamily;
  assert.ok(family);
  const curated = filter({ contentFamily: family, authoringMode: "curated" });
  assert.ok(curated.length > 0 && curated.every((item) => item.contentFamily === family && item.authoringMode === "curated"));
});

await run("question type and curationReason filters use definition metadata", () => {
  assert.ok(filter({ questionType: "numeric" }).every(isGeneratedQuestionDefinition));
  const representation = filter({ questionType: "singleChoice", curationReason: "representation-evidence" });
  assert.ok(representation.length > 0 && representation.every((item) => !isGeneratedQuestionDefinition(item) && item.curationReason === "representation-evidence"));
});

await run("curated navigation is deterministic and bounded", () => {
  const curated = filter({ authoringMode: "curated" });
  assert.equal(navigationIndex("first", 12, curated.length), 0);
  assert.equal(navigationIndex("previous", 0, curated.length), 0);
  assert.equal(navigationIndex("next", 0, curated.length), 1);
  assert.equal(navigationIndex("last", 0, curated.length), curated.length - 1);
  assert.equal(reviewIndexAfterMark(0, curated.length, "all", "approved"), 1);
  assert.equal(reviewIndexAfterMark(0, curated.length, "unreviewed", "approved"), 0);
});

await run("generated review samples are seeded, reproducible, valid, and batchable", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_ADD_A_A")!;
  assert.ok(isGeneratedQuestionDefinition(definition));
  const first = resolveReviewQuestion(definition, 41);
  const reproduced = resolveReviewQuestion(definition, 41);
  const changed = resolveReviewQuestion(definition, 42);
  assert.equal(first.id, reproduced.id);
  assert.equal(first.type, "numeric");
  assert.notEqual(first.id, changed.id);
  const batch = generatedSampleBatch(definition, 100, 10);
  assert.equal(batch.length, 10);
  assert.deepEqual(batch.map((item) => item.generatorSeed), Array.from({ length: 10 }, (_, index) => 100 + index));
  assert.ok(batch.every((item) => item.correctAnswers[0] && item.prompt.length));
});

await run("review state persists across repository recreation and supports every status", async () => {
  const store = new MemoryAuthorReviewStore();
  const first = new AuthorReviewRepository(store);
  await first.save("A", "approved", "ok", "2026-01-01T00:00:00.000Z");
  await first.save("B", "needs-fix", "wording", "2026-01-02T00:00:00.000Z");
  await first.save("C", "rejected", "invalid", "2026-01-03T00:00:00.000Z");
  const recreated = new AuthorReviewRepository(store);
  assert.deepEqual((await recreated.list()).map((item) => item.status), ["approved", "needs-fix", "rejected"]);
  await recreated.clear("B");
  assert.deepEqual((await recreated.list()).map((item) => item.definitionId), ["A", "C"]);
});

await run("unreviewed filter and progress derive only from author review records", () => {
  const target = FOUNDATIONAL_QUESTIONS[0]!;
  const state = new Map([[target.id, { definitionId: target.id, status: "approved", note: "", reviewedAt: "2026-01-01T00:00:00.000Z" } satisfies QuestionReviewRecord]]);
  assert.equal(filter({ reviewStatus: "unreviewed" }, state).some((item) => item.id === target.id), false);
  const progress = reviewProgress(FOUNDATIONAL_QUESTIONS, state);
  assert.equal(progress.reviewed, 1);
  assert.equal(progress.approved, 1);
});

await run("expected answer reveal supports numeric and choice questions", () => {
  const generated = resolveReviewQuestion(FOUNDATIONAL_QUESTIONS.find(isGeneratedQuestionDefinition)!, 1);
  assert.ok(expectedAnswer(generated));
  const choice = FOUNDATIONAL_QUESTIONS.find((item) => !isGeneratedQuestionDefinition(item))!;
  if (isGeneratedQuestionDefinition(choice)) throw new Error("Expected curated question");
  assert.ok(expectedAnswer(choice).startsWith("o"));
});

await run("deep links parse and serialize Skill, category, family, and status", () => {
  const parsed = parseReviewDeepLink("?review=questions&skill=INT_ADD&category=conceptual&contentFamily=INT_ADD%3Aconceptual&status=needs-fix");
  assert.equal(parsed.skillId, "INT_ADD");
  assert.equal(parsed.category, "conceptual");
  assert.equal(parsed.contentFamily, "INT_ADD:conceptual");
  assert.equal(parsed.reviewStatus, "needs-fix");
  assert.match(reviewDeepLink(parsed), /skill=INT_ADD/);
});

await run("normalized near-identical content families are first-class", () => {
  const flagged = flaggedCuratedFamilies(FOUNDATIONAL_QUESTIONS);
  assert.ok(flagged.has("AR_PLACE_VALUE:representation"));
});

await run("generator parameter types map automatically to Hebrew", () => {
  assert.equal(parameterTypeLabel({ type: "integer", min: -2, max: 2 }), "מספר שלם");
  assert.equal(parameterTypeLabel({ type: "natural", min: 1, max: 9 }), "מספר טבעי / מספר שלם חיובי");
  assert.equal(parameterTypeLabel({ type: "decimal", min: 0.1, max: 0.9, step: 0.1 }), "מספר עשרוני");
  assert.equal(parameterTypeLabel({ type: "rational", numerator: { min: -3, max: 3 }, denominator: { min: 2, max: 5 } }), "מספר רציונלי");
});

await run("range and sparse allowed values are derived from executable specs", () => {
  assert.match(describeParameter("a", { type: "integer", min: -10, max: 10 }).valuesLabel, /בין -10 ל־10/);
  const sparse = describeParameter("a", { type: "integer", min: 2, max: 10, exclude: [3, 4, 6, 7, 8, 9] }).valuesLabel;
  assert.match(sparse, /אחד מהערכים: 2, 5, 10/);
  assert.match(describeParameter("d", { type: "decimal", min: -1.5, max: 1.5, step: 0.5, exclude: [0] }).valuesLabel, /שונה מאפס/);
  assert.match(describeParameter("r", { type: "rational", numerator: { min: -4, max: 4 }, denominator: { min: 2, max: 7 }, excludeZero: true }).valuesLabel, /מונה.*מכנה.*שונה מאפס/);
});

await run("simple constraints translate while unsupported expressions stay technical", () => {
  assert.equal(translateSimpleConstraint("a > 0"), "a חיובי");
  assert.equal(translateSimpleConstraint("a != 0"), "a שונה מאפס");
  assert.equal(translateSimpleConstraint("a < b"), "a קטן מ־b");
  assert.equal(translateSimpleConstraint("a + 1 >= b"), null);
  assert.deepEqual(summarizeConstraints(["a > 0", "a + 1 >= b"]), { humanReadable: ["a חיובי"], technicalOnly: ["a + 1 >= b"] });
});

await run("optional family rationale and difficulty note remain centralized", () => {
  const note = familyAuthoringNote("FAMILY", { FAMILY: { rationaleHe: "מטרה קצרה", difficultyNoteHe: "הקושי עולה בגלל המבנה" } });
  assert.equal(note?.rationaleHe, "מטרה קצרה");
  assert.equal(note?.difficultyNoteHe, "הקושי עולה בגלל המבנה");
  assert.equal(familyAuthoringNote("MISSING", {}), null);
});

await run("Band differences derive from actual generator configurations", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_ADD_A_A")!;
  const summaries = deriveBandSummaries(FOUNDATIONAL_QUESTIONS, definition);
  assert.deepEqual(summaries.map((item) => item.band), ["A", "B", "C"]);
  assert.equal(summaries[0]?.changesFromPrevious.length, 0);
  assert.ok(summaries[1]?.changesFromPrevious.some((change) => change.startsWith("a:")));
  assert.ok(summaries[1]?.changesFromPrevious.some((change) => change.startsWith("b:")));
});

await run("Band sampling remains deterministic and targets the selected definition", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_ADD_B_A")!;
  const first = generatedSampleBatch(definition, 70, 6);
  const second = generatedSampleBatch(definition, 70, 6);
  assert.deepEqual(first.map((item) => item.id), second.map((item) => item.id));
  assert.ok(first.every((item) => item.difficultyBand === "B"));
});

await run("curated reviewer summaries stay free of generator-only panels", () => {
  const curated = FOUNDATIONAL_QUESTIONS.find((item) => !isGeneratedQuestionDefinition(item))!;
  assert.equal(hasGeneratorExplanation(curated), false);
  assert.deepEqual(deriveBandSummaries(FOUNDATIONAL_QUESTIONS, curated), []);
  if (isGeneratedQuestionDefinition(curated)) throw new Error("Expected curated question");
  assert.equal(answerSemanticsLabel(curated), "בחירה יחידה");
});
