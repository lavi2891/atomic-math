import type { Domain, Skill, SkillGroup } from "../../content/catalog/types.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import { isGeneratedQuestionDefinition } from "../../domain/questions/definitions.ts";
import { buildGeneratedQuestion } from "../../domain/questions/generator/buildGeneratedQuestion.ts";
import type { GeneratedQuestionInstance, Question } from "../../domain/questions/types.ts";
import type { QuestionReviewRecord, ReviewStatus } from "./reviewState.ts";

export type ReviewStatusFilter = "all" | "unreviewed" | ReviewStatus;

export interface ReviewFilters {
  domainId: string;
  skillGroupId: string;
  skillId: string;
  category: string;
  literacyDemand: string;
  questionType: string;
  difficultyBand: string;
  authoringMode: string;
  curationReason: string;
  contentFamily: string;
  reviewStatus: ReviewStatusFilter;
}

export const EMPTY_REVIEW_FILTERS: ReviewFilters = {
  domainId: "", skillGroupId: "", skillId: "", category: "", literacyDemand: "", questionType: "", difficultyBand: "", authoringMode: "", curationReason: "", contentFamily: "", reviewStatus: "all",
};

export interface ReviewNavigationState {
  filters: ReviewFilters;
  index: number;
  seed: number;
  previewDefinitionId: string | null;
  reproduceNonce: number;
  randomNonce: number;
  showDetails: boolean;
  showExpected: boolean;
  showBatch: boolean;
}

export type ReviewNavigationAction =
  | { type: "set-filter"; key: keyof ReviewFilters; value: ReviewFilters[keyof ReviewFilters] }
  | { type: "restore-filters"; filters: ReviewFilters }
  | { type: "reset-filters" }
  | { type: "navigate"; index: number; definitionId?: string | null }
  | { type: "preview-band"; definitionId: string }
  | { type: "set-seed"; seed: number }
  | { type: "new-sample" }
  | { type: "reproduce-sample" }
  | { type: "toggle-batch" }
  | { type: "select-batch-sample"; seed: number }
  | { type: "toggle-details"; show: boolean }
  | { type: "toggle-expected" }
  | { type: "increment-random-nonce" };

export function initialReviewNavigationState(search: string): ReviewNavigationState {
  return {
    filters: parseReviewDeepLink(search),
    index: 0,
    seed: 1,
    previewDefinitionId: null,
    reproduceNonce: 0,
    randomNonce: 0,
    showDetails: true,
    showExpected: false,
    showBatch: false,
  };
}

/** Internal navigation deliberately retains the exact filter object. */
export function reviewNavigationReducer(state: ReviewNavigationState, action: ReviewNavigationAction): ReviewNavigationState {
  if (action.type === "set-filter") {
    return { ...state, filters: { ...state.filters, [action.key]: action.value }, index: 0, previewDefinitionId: null };
  }
  if (action.type === "restore-filters") return { ...state, filters: action.filters, index: 0, previewDefinitionId: null };
  if (action.type === "reset-filters") return { ...state, filters: EMPTY_REVIEW_FILTERS, index: 0, previewDefinitionId: null };
  if (action.type === "navigate") return { ...state, index: action.index, previewDefinitionId: action.definitionId ?? null, seed: action.definitionId ? 1 : state.seed, showBatch: false };
  if (action.type === "preview-band") return { ...state, previewDefinitionId: action.definitionId, seed: 1 };
  if (action.type === "set-seed") return { ...state, seed: action.seed };
  if (action.type === "new-sample") return { ...state, seed: state.seed + 1 };
  if (action.type === "reproduce-sample") return { ...state, reproduceNonce: state.reproduceNonce + 1 };
  if (action.type === "toggle-batch") return { ...state, showBatch: !state.showBatch };
  if (action.type === "select-batch-sample") return { ...state, seed: action.seed, showBatch: false };
  if (action.type === "toggle-details") return { ...state, showDetails: action.show };
  if (action.type === "toggle-expected") return { ...state, showExpected: !state.showExpected };
  return { ...state, randomNonce: state.randomNonce + 1 };
}

export interface ReviewCatalog {
  domains: readonly Domain[];
  skills: readonly Skill[];
  skillGroups: readonly SkillGroup[];
}

export function parseReviewDeepLink(search: string): ReviewFilters {
  const params = new URLSearchParams(search);
  const status = params.get("status");
  const reviewStatus: ReviewStatusFilter = status === "unreviewed" || status === "approved" || status === "needs-fix" || status === "rejected" ? status : "all";
  return {
    ...EMPTY_REVIEW_FILTERS,
    domainId: params.get("domain") ?? "",
    skillGroupId: params.get("group") ?? "",
    skillId: params.get("skill") ?? "",
    category: params.get("category") ?? "",
    literacyDemand: params.get("literacy") ?? "",
    questionType: params.get("type") ?? "",
    difficultyBand: params.get("band") ?? "",
    authoringMode: params.get("authoringMode") ?? "",
    curationReason: params.get("curationReason") ?? "",
    contentFamily: params.get("contentFamily") ?? "",
    reviewStatus,
  };
}

export function reviewDeepLink(filters: ReviewFilters): string {
  const params = new URLSearchParams({ review: "questions" });
  const entries: Array<[string, string]> = [
    ["domain", filters.domainId], ["group", filters.skillGroupId], ["skill", filters.skillId], ["category", filters.category], ["literacy", filters.literacyDemand], ["type", filters.questionType], ["band", filters.difficultyBand], ["authoringMode", filters.authoringMode], ["curationReason", filters.curationReason], ["contentFamily", filters.contentFamily], ["status", filters.reviewStatus === "all" ? "" : filters.reviewStatus],
  ];
  for (const [key, value] of entries) if (value) params.set(key, value);
  return `?${params.toString()}`;
}

function definitionType(definition: SkillQuestionDefinition): Question["type"] {
  return isGeneratedQuestionDefinition(definition) ? definition.generatedType ?? "numeric" : definition.type;
}

/**
 * A definition tagged requires-rereview owns its approval by version. This keeps legacy
 * records readable while preventing an approval for old content from blessing changed content.
 */
export function effectiveReviewRecord(
  definition: SkillQuestionDefinition,
  record: QuestionReviewRecord | undefined,
): QuestionReviewRecord | undefined {
  if (!record || !definition.tags?.includes("requires-rereview")) return record;
  // The version-aware review UI was introduced after the v3 bank had already been
  // reviewed. Preserve those authoritative legacy approvals; v4+ content must carry
  // an explicit matching definitionVersion because it was authored after that point.
  if (record.definitionVersion === undefined) return (definition.version ?? 1) <= 3 ? record : undefined;
  return record.definitionVersion === definition.version ? record : undefined;
}

export function filterReviewDefinitions(
  definitions: readonly SkillQuestionDefinition[],
  filters: ReviewFilters,
  records: ReadonlyMap<string, QuestionReviewRecord>,
  catalog: ReviewCatalog,
): SkillQuestionDefinition[] {
  const groupSkills = filters.skillGroupId ? new Set(catalog.skillGroups.find((group) => group.id === filters.skillGroupId)?.skillIds ?? []) : null;
  const domainSkills = filters.domainId ? new Set(catalog.skills.filter((skill) => skill.domainId === filters.domainId).map((skill) => skill.id)) : null;
  return definitions.filter((definition) => {
    const record = effectiveReviewRecord(definition, records.get(definition.id));
    return (!domainSkills || domainSkills.has(definition.skillId))
      && (!groupSkills || groupSkills.has(definition.skillId))
      && (!filters.skillId || definition.skillId === filters.skillId)
      && (!filters.category || definition.category === filters.category)
      && (!filters.literacyDemand || definition.literacyDemand === filters.literacyDemand)
      && (!filters.questionType || definitionType(definition) === filters.questionType)
      && (!filters.difficultyBand || definition.difficultyBand === filters.difficultyBand)
      && (!filters.authoringMode || definition.authoringMode === filters.authoringMode)
      && (!filters.curationReason || (!isGeneratedQuestionDefinition(definition) && definition.curationReason === filters.curationReason))
      && (!filters.contentFamily || definition.contentFamily === filters.contentFamily)
      && (filters.reviewStatus === "all" || (filters.reviewStatus === "unreviewed" ? !record : record?.status === filters.reviewStatus));
  });
}

const REVIEW_BAND_ORDER = ["A", "B", "C", "D"];

export interface ReviewUnit {
  key: string;
  definitions: SkillQuestionDefinition[];
  generated: boolean;
}

function aggregateStatuses(statuses: Array<ReviewStatus | undefined>): ReviewStatus | undefined {
  if (statuses.includes("rejected")) return "rejected";
  if (statuses.includes("needs-fix")) return "needs-fix";
  if (statuses.length > 0 && statuses.every((status) => status === "approved")) return "approved";
  return undefined;
}

export function reviewUnitStatus(unit: ReviewUnit, records: ReadonlyMap<string, QuestionReviewRecord>): ReviewStatus | undefined {
  return aggregateStatuses(unit.definitions.map((definition) => effectiveReviewRecord(definition, records.get(definition.id))?.status));
}

export function isReviewUnitFullyApproved(unit: ReviewUnit, records: ReadonlyMap<string, QuestionReviewRecord>): boolean {
  return reviewUnitStatus(unit, records) === "approved";
}

export function reviewUnitBandCoverage(unit: ReviewUnit, records: ReadonlyMap<string, QuestionReviewRecord>) {
  if (!unit.generated) return [];
  return unit.definitions.map((definition) => ({
    band: definition.difficultyBand ?? "?",
    definitionId: definition.id,
    status: effectiveReviewRecord(definition, records.get(definition.id))?.status,
  }));
}

export function buildReviewUnits(
  definitions: readonly SkillQuestionDefinition[],
  filters: ReviewFilters,
  records: ReadonlyMap<string, QuestionReviewRecord>,
  catalog: ReviewCatalog,
): ReviewUnit[] {
  const scoped = filterReviewDefinitions(definitions, { ...filters, reviewStatus: "all" }, records, catalog);
  const units = new Map<string, ReviewUnit>();
  for (const definition of scoped) {
    const generated = isGeneratedQuestionDefinition(definition);
    const key = generated ? `generated:${definition.skillId}:${definition.contentFamily}` : `curated:${definition.id}`;
    if (units.has(key)) continue;
    const unitDefinitions = generated
      ? definitions.filter((candidate) => isGeneratedQuestionDefinition(candidate) && candidate.skillId === definition.skillId && candidate.contentFamily === definition.contentFamily)
      : [definition];
    units.set(key, { key, definitions: unitDefinitions, generated });
  }
  const result = [...units.values()];
  for (const unit of result) unit.definitions.sort((left, right) => REVIEW_BAND_ORDER.indexOf(left.difficultyBand ?? "") - REVIEW_BAND_ORDER.indexOf(right.difficultyBand ?? ""));
  return result.filter((unit) => {
    const status = reviewUnitStatus(unit, records);
    return filters.reviewStatus === "all"
      || (filters.reviewStatus === "unreviewed" ? status === undefined : status === filters.reviewStatus);
  });
}

export interface ReviewUnitLocation { index: number; definitionId: string | null }

export function reviewUnitNavigation(
  action: "first" | "previous" | "next" | "last",
  units: readonly ReviewUnit[],
  currentUnitIndex: number,
  currentDefinitionId: string | null,
): ReviewUnitLocation {
  if (!units.length) return { index: 0, definitionId: null };
  if (action === "first") return { index: 0, definitionId: units[0]!.definitions[0]?.id ?? null };
  if (action === "last") {
    const index = units.length - 1;
    return { index, definitionId: units[index]!.definitions.at(-1)?.id ?? null };
  }
  const index = Math.min(Math.max(0, currentUnitIndex), units.length - 1);
  const unit = units[index]!;
  const definitionIndex = Math.max(0, unit.definitions.findIndex((definition) => definition.id === currentDefinitionId));
  if (action === "next") {
    const nextBand = unit.definitions[definitionIndex + 1];
    if (nextBand) return { index, definitionId: nextBand.id };
    if (index === units.length - 1) return { index, definitionId: unit.definitions.at(-1)?.id ?? null };
    const nextIndex = Math.min(units.length - 1, index + 1);
    return { index: nextIndex, definitionId: units[nextIndex]!.definitions[0]?.id ?? null };
  }
  const previousBand = unit.definitions[definitionIndex - 1];
  if (previousBand) return { index, definitionId: previousBand.id };
  if (index === 0) return { index, definitionId: unit.definitions[0]?.id ?? null };
  const previousIndex = Math.max(0, index - 1);
  return { index: previousIndex, definitionId: units[previousIndex]!.definitions.at(-1)?.id ?? null };
}

export function reviewUnitProgress(units: readonly ReviewUnit[], records: ReadonlyMap<string, QuestionReviewRecord>) {
  const statuses: Record<ReviewStatus, number> = { approved: 0, "needs-fix": 0, rejected: 0 };
  let reviewed = 0;
  for (const unit of units) {
    const status = reviewUnitStatus(unit, records);
    if (status) { reviewed += 1; statuses[status] += 1; }
  }
  return { total: units.length, reviewed, ...statuses };
}

export function navigationIndex(action: "first" | "previous" | "next" | "last", current: number, length: number): number {
  if (length <= 0) return 0;
  if (action === "first") return 0;
  if (action === "last") return length - 1;
  if (action === "previous") return Math.max(0, current - 1);
  return Math.min(length - 1, current + 1);
}

export function reviewIndexAfterMark(current: number, length: number, activeFilter: ReviewStatusFilter, markedStatus: ReviewStatus): number {
  const currentWillDisappear = activeFilter === "unreviewed" || (activeFilter !== "all" && activeFilter !== markedStatus);
  return currentWillDisappear ? Math.min(current, Math.max(0, length - 2)) : navigationIndex("next", current, length);
}

export function deterministicRandomIndex(current: number, length: number, nonce: number): number {
  if (length <= 1) return 0;
  const candidate = Math.abs(((current + 1) * 1_664_525 + (nonce + 1) * 1_013_904_223) | 0) % length;
  return candidate === current ? (candidate + 1) % length : candidate;
}

export function resolveReviewQuestion(definition: SkillQuestionDefinition, seed: number): Question {
  return isGeneratedQuestionDefinition(definition) ? buildGeneratedQuestion(definition, { seed }) : definition;
}

export function generatedSampleBatch(definition: SkillQuestionDefinition, firstSeed: number, count = 10): GeneratedQuestionInstance[] {
  if (!isGeneratedQuestionDefinition(definition)) return [];
  return Array.from({ length: count }, (_, index) => buildGeneratedQuestion(definition, { seed: firstSeed + index }));
}

export function expectedAnswer(question: Question): string {
  if (question.type === "numeric") return question.correctAnswers.join(" / ");
  if (question.type === "singleChoice") return question.correctOptionId;
  return question.correctOptionIds.join(", ");
}

export function reviewProgress(definitions: readonly SkillQuestionDefinition[], records: ReadonlyMap<string, QuestionReviewRecord>) {
  const statuses: Record<ReviewStatus, number> = { approved: 0, "needs-fix": 0, rejected: 0 };
  let reviewed = 0;
  for (const definition of definitions) {
    const record = effectiveReviewRecord(definition, records.get(definition.id));
    if (record) { reviewed += 1; statuses[record.status] += 1; }
  }
  return { total: definitions.length, reviewed, ...statuses };
}

function normalizedSurface(value: unknown): string {
  return JSON.stringify(value).replace(/[−-]?\d+(?:[.,/]\d+)*/gu, "#").replace(/\s+/gu, " ");
}

export function flaggedCuratedFamilies(definitions: readonly SkillQuestionDefinition[]): Set<string> {
  const groups = new Map<string, { family: string; count: number }>();
  for (const definition of definitions) {
    if (isGeneratedQuestionDefinition(definition) || !definition.contentFamily) continue;
    const options = definition.type === "numeric" ? [] : definition.options.map((option) => option.content);
    const key = `${definition.skillId}|${definition.contentFamily}|${normalizedSurface(definition.prompt)}|${normalizedSurface(options)}`;
    const previous = groups.get(key);
    groups.set(key, { family: definition.contentFamily, count: (previous?.count ?? 0) + 1 });
  }
  return new Set([...groups.values()].filter((group) => group.count >= 4).map((group) => group.family));
}

export function isEditableEventTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}
