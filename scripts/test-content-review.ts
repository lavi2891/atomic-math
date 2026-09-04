import assert from "node:assert/strict";
import { appRouteFromSearch } from "../src/app/routing.ts";
import { DOMAINS, SKILLS, SKILL_GROUPS } from "../src/content/catalog/index.ts";
import { FOUNDATIONAL_QUESTIONS } from "../src/content/foundations/questions.ts";
import { isGeneratedQuestionDefinition } from "../src/domain/questions/definitions.ts";
import { MemoryPersistenceDriver } from "../src/infrastructure/persistence/MemoryPersistenceDriver.ts";
import {
  buildReviewUnits,
  effectiveReviewRecord,
  EMPTY_REVIEW_FILTERS,
  expectedAnswer,
  filterReviewDefinitions,
  flaggedCuratedFamilies,
  generatedSampleBatch,
  initialReviewNavigationState,
  isReviewUnitFullyApproved,
  navigationIndex,
  parseReviewDeepLink,
  resolveReviewQuestion,
  reviewDeepLink,
  reviewIndexAfterMark,
  reviewNavigationReducer,
  reviewUnitBandCoverage,
  reviewUnitNavigation,
  reviewUnitStatus,
  reviewProgress,
  type ReviewFilters,
  type ReviewNavigationAction,
  type ReviewUnit,
} from "../src/app/contentReview/reviewModel.ts";
import { AuthorReviewRepository, MemoryAuthorReviewStore, type QuestionReviewRecord } from "../src/app/contentReview/reviewState.ts";
import { answerSemanticsLabel, deriveBandSummaries, describeParameter, familyAuthoringNote, generatorStructureSummary, generatorTemplateLatex, hasGeneratorExplanation, parameterTypeLabel, summarizeConstraints, translateSimpleConstraint } from "../src/app/contentReview/generatorSummary.ts";

async function run(name: string, fn: () => void | Promise<void>) { await fn(); process.stdout.write(`PASS ${name}\n`); }
const catalog = { domains: DOMAINS, skills: SKILLS, skillGroups: SKILL_GROUPS };
const records = new Map<string, QuestionReviewRecord>();
const filter = (partial: Partial<ReviewFilters>, state = records) => filterReviewDefinitions(FOUNDATIONAL_QUESTIONS, { ...EMPTY_REVIEW_FILTERS, ...partial }, state, catalog);
const generatedUnit = (skillId: string, contentFamily: string): ReviewUnit => {
  const definitions = FOUNDATIONAL_QUESTIONS.filter((item) => item.skillId === skillId && item.contentFamily === contentFamily);
  assert.ok(definitions.length > 0 && definitions.every(isGeneratedQuestionDefinition));
  return { key: `generated:${skillId}:${contentFamily}`, definitions, generated: true };
};

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
  const family = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED")?.contentFamily;
  assert.ok(family);
  const curated = filter({ contentFamily: family, authoringMode: "curated" });
  assert.ok(curated.length > 0 && curated.every((item) => item.contentFamily === family && item.authoringMode === "curated"));
});

await run("question type and curationReason filters use definition metadata", () => {
  assert.ok(filter({ questionType: "numeric" }).every(isGeneratedQuestionDefinition));
  const deliberate = filter({ questionType: "singleChoice", curationReason: "deliberate-example" });
  assert.ok(deliberate.length > 0 && deliberate.every((item) => !isGeneratedQuestionDefinition(item) && item.curationReason === "deliberate-example"));
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
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_ADD_NEG_NEG_A")!;
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
  assert.ok(batch.every((item) => item.type === "numeric" && item.correctAnswers[0] && item.prompt.length));
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

await run("approved content changed under global rules is surfaced for re-review", async () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_EQ_ADD_A")!;
  assert.ok(definition.tags?.includes("requires-rereview") && definition.version);
  const stale = {
    definitionId: definition.id,
    definitionVersion: definition.version! - 1,
    status: "approved" as const,
    note: "אושר לפני שינוי התוכן",
    reviewedAt: "2026-09-03T00:00:00.000Z",
  } satisfies QuestionReviewRecord;
  const staleState = new Map([[definition.id, stale]]);
  assert.equal(effectiveReviewRecord(definition, stale), undefined);
  assert.ok(filter({ skillId: definition.skillId, reviewStatus: "unreviewed" }, staleState).some((item) => item.id === definition.id));
  assert.equal(reviewProgress([definition], staleState).reviewed, 0);

  const store = new MemoryAuthorReviewStore();
  const repository = new AuthorReviewRepository(store);
  await repository.save(definition.id, "approved", "נבדק מחדש", "2026-09-04T00:00:00.000Z", definition.version);
  const persisted = (await new AuthorReviewRepository(store).list())[0]!;
  assert.equal(persisted.definitionVersion, definition.version);
  assert.equal(effectiveReviewRecord(definition, persisted)?.status, "approved");
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

await run("deep link initializes filter ownership once", () => {
  const state = initialReviewNavigationState("?review=questions&skill=INT_ADD&category=conceptual");
  assert.equal(state.filters.skillId, "INT_ADD");
  assert.equal(state.filters.category, "conceptual");
  assert.equal(state.index, 0);
  assert.equal(state.previewDefinitionId, null);
});

await run("first, previous, next, last, and random navigation preserve filters", () => {
  const initial = initialReviewNavigationState("?review=questions&skill=AR_ADD_FACTS&category=calculation&contentFamily=AR_ADD_FACTS%3Arelated-three-addend-sum");
  const filters = initial.filters;
  let state = reviewNavigationReducer(initial, { type: "navigate", index: 3 });
  assert.strictEqual(state.filters, filters);
  state = reviewNavigationReducer(state, { type: "navigate", index: 2 });
  assert.strictEqual(state.filters, filters);
  state = reviewNavigationReducer(state, { type: "navigate", index: 0 });
  assert.strictEqual(state.filters, filters);
  state = reviewNavigationReducer(state, { type: "navigate", index: 8 });
  assert.strictEqual(state.filters, filters);
  state = reviewNavigationReducer(state, { type: "increment-random-nonce" });
  assert.strictEqual(state.filters, filters);
});

await run("Band A and Band B previews preserve filters and do not set difficulty scope", () => {
  const initial = initialReviewNavigationState("?review=questions&skill=AR_ADD_FACTS&category=calculation");
  const filters = initial.filters;
  const bandA = reviewNavigationReducer(initial, { type: "preview-band", definitionId: "MVP_AR_ADD_FACTS_A_B" });
  assert.strictEqual(bandA.filters, filters);
  assert.equal(bandA.filters.difficultyBand, "");
  assert.equal(bandA.previewDefinitionId, "MVP_AR_ADD_FACTS_A_B");
  const bandB = reviewNavigationReducer(bandA, { type: "preview-band", definitionId: "MVP_AR_ADD_FACTS_B_B" });
  assert.strictEqual(bandB.filters, filters);
  assert.equal(bandB.filters.difficultyBand, "");
  assert.equal(bandB.previewDefinitionId, "MVP_AR_ADD_FACTS_B_B");
});

await run("Next walks A, B, C, D before the next definition", () => {
  const base = generatedUnit("AR_PLACE_VALUE", "AR_PLACE_VALUE:identify-digit-value");
  const bandD = { ...base.definitions.at(-1)!, id: "TEST_PLACE_VALUE_D", difficultyBand: "D" as const };
  const fourBands: ReviewUnit = { ...base, definitions: [...base.definitions, bandD] };
  const next = generatedUnit("INT_COMPARE", "INT_COMPARE:signed-comparison");
  const units = [fourBands, next];
  let location = reviewUnitNavigation("first", units, 0, null);
  assert.equal(location.definitionId, fourBands.definitions[0]!.id);
  location = reviewUnitNavigation("next", units, location.index, location.definitionId);
  assert.equal(location.definitionId, fourBands.definitions[1]!.id);
  location = reviewUnitNavigation("next", units, location.index, location.definitionId);
  assert.equal(location.definitionId, fourBands.definitions[2]!.id);
  location = reviewUnitNavigation("next", units, location.index, location.definitionId);
  assert.equal(location.definitionId, "TEST_PLACE_VALUE_D");
  location = reviewUnitNavigation("next", units, location.index, location.definitionId);
  assert.deepEqual(location, { index: 1, definitionId: next.definitions[0]!.id });
});

await run("A/B families advance directly from B to the next definition", () => {
  const twoBands = generatedUnit("AR_ADD_FACTS", "AR_ADD_FACTS:two-addend-sum");
  assert.deepEqual(twoBands.definitions.map((item) => item.difficultyBand), ["A", "B"]);
  const next = generatedUnit("INT_COMPARE", "INT_COMPARE:signed-comparison");
  const afterA = reviewUnitNavigation("next", [twoBands, next], 0, twoBands.definitions[0]!.id);
  assert.deepEqual(afterA, { index: 0, definitionId: twoBands.definitions[1]!.id });
  assert.deepEqual(reviewUnitNavigation("next", [twoBands, next], afterA.index, afterA.definitionId), { index: 1, definitionId: next.definitions[0]!.id });
});

await run("Previous reverses across Band and definition boundaries", () => {
  const previous = generatedUnit("AR_ADD_FACTS", "AR_ADD_FACTS:two-addend-sum");
  const current = generatedUnit("INT_COMPARE", "INT_COMPARE:signed-comparison");
  const across = reviewUnitNavigation("previous", [previous, current], 1, current.definitions[0]!.id);
  assert.deepEqual(across, { index: 0, definitionId: previous.definitions.at(-1)!.id });
  const within = reviewUnitNavigation("previous", [previous, current], 0, previous.definitions[1]!.id);
  assert.deepEqual(within, { index: 0, definitionId: previous.definitions[0]!.id });
  assert.deepEqual(reviewUnitNavigation("previous", [previous], 0, previous.definitions[0]!.id), { index: 0, definitionId: previous.definitions[0]!.id });
  assert.deepEqual(reviewUnitNavigation("next", [previous], 0, previous.definitions.at(-1)!.id), { index: 0, definitionId: previous.definitions.at(-1)!.id });
});

await run("curated items behave as one review unit before the next definition", () => {
  const curated = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED")!;
  const curatedUnit: ReviewUnit = { key: `curated:${curated.id}`, definitions: [curated], generated: false };
  const next = generatedUnit("INT_COMPARE", "INT_COMPARE:signed-comparison");
  assert.deepEqual(reviewUnitNavigation("next", [curatedUnit, next], 0, curated.id), { index: 1, definitionId: next.definitions[0]!.id });
});

await run("Band sequence navigation leaves the explicit Difficulty filter unchanged", () => {
  const state = initialReviewNavigationState("?review=questions&skill=AR_ADD_FACTS&band=B");
  const location = reviewUnitNavigation("next", [generatedUnit("AR_ADD_FACTS", "AR_ADD_FACTS:two-addend-sum")], 0, "MVP_AR_ADD_FACTS_A_A");
  const navigated = reviewNavigationReducer(state, { type: "navigate", index: location.index, definitionId: location.definitionId });
  assert.strictEqual(navigated.filters, state.filters);
  assert.equal(navigated.filters.difficultyBand, "B");
});

await run("generated family approval requires every supported Band", () => {
  const unit = generatedUnit("AR_PLACE_VALUE", "AR_PLACE_VALUE:identify-digit-value");
  const reviewedAt = "2026-09-04T00:00:00.000Z";
  const oneBand = new Map([[unit.definitions[0]!.id, { definitionId: unit.definitions[0]!.id, definitionVersion: unit.definitions[0]!.version, status: "approved", note: "", reviewedAt } satisfies QuestionReviewRecord]]);
  assert.equal(isReviewUnitFullyApproved(unit, oneBand), false);
  assert.equal(reviewUnitStatus(unit, oneBand), undefined);
  assert.deepEqual(reviewUnitBandCoverage(unit, oneBand).map((item) => item.status), ["approved", undefined, undefined]);
  const allBands = new Map<string, QuestionReviewRecord>(unit.definitions.map((definition) => [definition.id, { definitionId: definition.id, definitionVersion: definition.version, status: "approved", note: "", reviewedAt }]));
  assert.equal(isReviewUnitFullyApproved(unit, allBands), true);
  assert.equal(reviewUnitStatus(unit, allBands), "approved");
  allBands.set(unit.definitions[1]!.id, { definitionId: unit.definitions[1]!.id, definitionVersion: unit.definitions[1]!.version, status: "needs-fix", note: "", reviewedAt });
  assert.equal(isReviewUnitFullyApproved(unit, allBands), false);
  assert.equal(reviewUnitStatus(unit, allBands), "needs-fix");
});

await run("review-unit construction groups generated Bands but keeps curated items singular", () => {
  const units = buildReviewUnits(FOUNDATIONAL_QUESTIONS, { ...EMPTY_REVIEW_FILTERS, skillId: "AR_ADD_FACTS" }, new Map(), catalog);
  const twoAddends = units.find((unit) => unit.key.includes("two-addend-sum"));
  assert.deepEqual(twoAddends?.definitions.map((item) => item.difficultyBand), ["A", "B"]);
  assert.ok(units.every((unit) => unit.generated));
  const bandFiltered = buildReviewUnits(FOUNDATIONAL_QUESTIONS, { ...EMPTY_REVIEW_FILTERS, skillId: "AR_ADD_FACTS", difficultyBand: "B" }, new Map(), catalog);
  assert.deepEqual(bandFiltered.find((unit) => unit.key.includes("two-addend-sum"))?.definitions.map((item) => item.difficultyBand), ["A", "B"]);
});

await run("generated sample and batch actions preserve the active filter scope", () => {
  const initial = initialReviewNavigationState("?review=questions&skill=INT_ADD&authoringMode=generated");
  const filters = initial.filters;
  let state = reviewNavigationReducer(initial, { type: "new-sample" });
  state = reviewNavigationReducer(state, { type: "reproduce-sample" });
  state = reviewNavigationReducer(state, { type: "toggle-batch" });
  state = reviewNavigationReducer(state, { type: "select-batch-sample", seed: 17 });
  state = reviewNavigationReducer(state, { type: "toggle-details", show: false });
  state = reviewNavigationReducer(state, { type: "toggle-expected" });
  assert.strictEqual(state.filters, filters);
  assert.equal(state.seed, 17);
  assert.equal(state.showBatch, false);
});

await run("leaving a Band batch resumes normal navigation at the next Band", () => {
  const unit = generatedUnit("AR_ADD_FACTS", "AR_ADD_FACTS:two-addend-sum");
  const initial = initialReviewNavigationState("?review=questions&skill=AR_ADD_FACTS");
  const filters = initial.filters;
  let state = reviewNavigationReducer(initial, { type: "preview-band", definitionId: unit.definitions[0]!.id });
  state = reviewNavigationReducer(state, { type: "toggle-batch" });
  state = reviewNavigationReducer(state, { type: "select-batch-sample", seed: 31 });
  const next = reviewUnitNavigation("next", [unit], 0, unit.definitions[0]!.id);
  state = reviewNavigationReducer(state, { type: "navigate", index: next.index, definitionId: next.definitionId });
  assert.equal(state.previewDefinitionId, unit.definitions[1]!.id);
  assert.equal(state.showBatch, false);
  assert.strictEqual(state.filters, filters);
});

await run("review status navigation preserves filters and cannot create a new scope", () => {
  const initial = initialReviewNavigationState("?review=questions&skill=INT_ADD&category=calculation&status=unreviewed");
  const filters = initial.filters;
  const url = reviewDeepLink(filters);
  const afterApproval = reviewNavigationReducer(initial, { type: "navigate", index: reviewIndexAfterMark(0, 5, filters.reviewStatus, "approved") });
  const afterNeedsFix = reviewNavigationReducer(afterApproval, { type: "navigate", index: reviewIndexAfterMark(0, 5, filters.reviewStatus, "needs-fix") });
  const afterReject = reviewNavigationReducer(afterNeedsFix, { type: "navigate", index: reviewIndexAfterMark(0, 5, filters.reviewStatus, "rejected") });
  assert.strictEqual(afterReject.filters, filters);
  assert.equal(reviewDeepLink(afterReject.filters), url);
});

await run("only explicit Skill and category changes update filter state and URL", () => {
  const initial = initialReviewNavigationState("?review=questions&skill=INT_ADD");
  const skillChanged = reviewNavigationReducer(initial, { type: "set-filter", key: "skillId", value: "AR_ADD_FACTS" });
  assert.notStrictEqual(skillChanged.filters, initial.filters);
  assert.match(reviewDeepLink(skillChanged.filters), /skill=AR_ADD_FACTS/);
  const categoryChanged = reviewNavigationReducer(skillChanged, { type: "set-filter", key: "category", value: "calculation" });
  assert.match(reviewDeepLink(categoryChanged.filters), /category=calculation/);
});

await run("normal navigation never reparses or replaces URL-derived filters", () => {
  const initial = initialReviewNavigationState("?review=questions&skill=INT_ADD&category=conceptual");
  const filters = initial.filters;
  const actions: ReviewNavigationAction[] = [
    { type: "navigate", index: 1 },
    { type: "preview-band", definitionId: "MVP_INT_ADD_NEG_NEG_B" },
    { type: "new-sample" },
    { type: "toggle-batch" },
  ];
  const navigated = actions.reduce(reviewNavigationReducer, initial);
  assert.strictEqual(navigated.filters, filters);
  assert.equal(reviewDeepLink(navigated.filters), "?review=questions&skill=INT_ADD&category=conceptual");
});

await run("global conversion leaves no near-identical curated families", () => {
  const flagged = flaggedCuratedFamilies(FOUNDATIONAL_QUESTIONS);
  assert.equal(flagged.size, 0);
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
  assert.equal(translateSimpleConstraint("a + 1 >= b"), "a ועוד 1 גדול או שווה ל־b");
  assert.deepEqual(summarizeConstraints(["a > 0", "a + 1 >= b", "Math.abs(a) > b"]), { humanReadable: ["a חיובי", "a ועוד 1 גדול או שווה ל־b"], technicalOnly: ["Math.abs(a) > b"] });
});

await run("generated structure keeps the executable template separate from its current instance", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_AR_ADD_FACTS_A_B")!;
  assert.ok(isGeneratedQuestionDefinition(definition));
  const question = resolveReviewQuestion(definition, 19);
  const structure = generatorStructureSummary(definition, question);
  assert.equal(structure?.template, "{a}+{b}+1");
  assert.ok(structure?.instantiated && !structure.instantiated.includes("{a}"));
  assert.notEqual(structure?.template, structure?.instantiated);
  assert.equal(structure?.structuralLabel, "שלושה מחוברים — שני משתנים וקבוע 1");
  assert.deepEqual(structure?.constraints.humanReadable, []);
  assert.ok(structure?.sampledValues.some((item) => item.name === "a"));
  assert.equal(structure?.instanceMatchesDefinition, true);
});

await run("review summary explains the signed family, magnitudes, and fixed sign structure", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_ADD_NEG_POS_POSITIVE_B")!;
  assert.ok(isGeneratedQuestionDefinition(definition));
  const summary = generatorStructureSummary(definition, resolveReviewQuestion(definition, 42));
  assert.equal(summary?.template, "(-{m})+{n}");
  assert.deepEqual(summary?.sampledValues.map((item) => item.name).sort(), ["m", "n"]);
  assert.equal(summary?.signPattern, "negative+positive; positive magnitude larger");
  assert.equal(summary?.signPatternLabel, "שלילי + חיובי; הגודל החיובי גדול יותר");
  assert.equal(summary?.skillInvariant, "signed-addition");
  assert.equal(summary?.instanceMatchesDefinition, true);
});

await run("review summary distinguishes sampled parameters from intentional student symbols", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_EQ_MUL_C")!;
  assert.ok(isGeneratedQuestionDefinition(definition));
  const summary = generatorStructureSummary(definition, resolveReviewQuestion(definition, 42));
  assert.deepEqual(summary?.sampledValues.map((item) => item.name), ["n"]);
  assert.deepEqual(summary?.studentFacingSymbols, ["x", "a", "b"]);
  assert.deepEqual(summary?.symbolicConditions.humanReadable, ["a שונה מאפס"]);
  const bands = deriveBandSummaries(FOUNDATIONAL_QUESTIONS, definition);
  assert.deepEqual(bands.map((item) => item.studentFacingSymbols), [[], ["x"], ["x", "a", "b"]]);
  assert.ok(bands[1]?.changesFromPrevious.some((change) => change.includes("סמלים שנשארים")));
});

await run("review math display is derived from the executable template", () => {
  assert.equal(generatorTemplateLatex("{a}*{b}"), "{a}\\cdot {b}");
  assert.equal(generatorTemplateLatex("\\frac{-{a}}{{b}}+{c}"), "\\frac{-{a}}{{b}}+{c}");
});

await run("generated structure exposes simple definition constraints alongside the template", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_AR_SUB_FACTS_A_B")!;
  assert.ok(isGeneratedQuestionDefinition(definition));
  const structure = generatorStructureSummary(definition, resolveReviewQuestion(definition, 4));
  assert.equal(structure?.template, "{a}+1-{b}");
  assert.deepEqual(structure?.constraints.humanReadable, ["a ועוד 1 גדול או שווה ל־b"]);
});

await run("every foundational generated family has a recoverable executable structure", () => {
  const generatedCount = FOUNDATIONAL_QUESTIONS.filter(isGeneratedQuestionDefinition).length;
  const missing = FOUNDATIONAL_QUESTIONS.flatMap((definition) => isGeneratedQuestionDefinition(definition) && !definition.exprTemplate.trim() ? [definition.id] : []);
  assert.ok(generatedCount > 0);
  assert.deepEqual(missing, []);
});

await run("optional family rationale and difficulty note remain centralized", () => {
  const note = familyAuthoringNote("FAMILY", { FAMILY: { rationaleHe: "מטרה קצרה", difficultyNoteHe: "הקושי עולה בגלל המבנה" } });
  assert.equal(note?.rationaleHe, "מטרה קצרה");
  assert.equal(note?.difficultyNoteHe, "הקושי עולה בגלל המבנה");
  assert.equal(familyAuthoringNote("MISSING", {}), null);
});

await run("Band differences derive from actual generator configurations", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_ADD_NEG_POS_POSITIVE_A")!;
  const summaries = deriveBandSummaries(FOUNDATIONAL_QUESTIONS, definition);
  assert.deepEqual(summaries.map((item) => item.band), ["A", "B", "C"]);
  assert.equal(summaries[0]?.changesFromPrevious.length, 0);
  assert.ok(summaries[1]?.changesFromPrevious.some((change) => change.startsWith("m:")));
  assert.ok(summaries[1]?.changesFromPrevious.some((change) => change.startsWith("n:")));
  assert.equal(summaries[0]?.template, "(-{m})+{n}");
  assert.equal(summaries[1]?.templateChangedFromPrevious, false);
});

await run("Band sampling remains deterministic and targets the selected definition", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_ADD_NEG_POS_POSITIVE_B")!;
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
  assert.equal(generatorStructureSummary(curated, curated), null);
  assert.equal(answerSemanticsLabel(curated), "בחירה יחידה");
  assert.equal(curated.curationReason, "deliberate-example");
  assert.ok(curated.curationJustificationHe);
});
