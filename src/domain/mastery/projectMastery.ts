import type { Attempt } from "../attempts/types.ts";
import { masteryConfig, validateMasteryConfig } from "./config.ts";
import type { EvidencePolicy, QuestionCategory, DifficultyBand } from "../../content/catalog/types.ts";

export type EvidenceLevel = "insufficient" | "emerging" | "established";

export interface MasterySnapshot {
  studentId: string;
  skillId: string;
  mastery: number;
  accuracy: number;
  attemptCount: number;
  recentAverage: number;
  historyAverage: number;
  evidenceLevel: EvidenceLevel;
  evidenceCoverage?: { categories: Partial<Record<QuestionCategory, number>>; bands: Partial<Record<DifficultyBand, number>>; sufficient: boolean };
  fluentAttemptCount?: number;
  fluencyMedianMs?: number;
  lastAttemptAt?: string;
  calculatedAt: string;
}

function average(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function evidenceLevelForAttemptCount(count: number): EvidenceLevel {
  if (count >= masteryConfig.evidence.establishedAt) return "established";
  if (count >= masteryConfig.evidence.emergingAt) return "emerging";
  return "insufficient";
}

export function median(values: readonly number[]): number | undefined {
  if (values.length === 0) return undefined;
  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1
    ? sorted[middle]
    : ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2;
}

export function projectMastery(input: {
  studentId: string;
  skillId: string;
  attempts: readonly Attempt[];
  fluencyEnabled?: boolean;
  evidencePolicy?: EvidencePolicy;
  calculatedAt?: string;
}): MasterySnapshot {
  validateMasteryConfig();
  const attempts = input.attempts
    .filter((attempt) => attempt.studentId === input.studentId && attempt.skillId === input.skillId)
    .sort((left, right) => left.submittedAt.localeCompare(right.submittedAt) || left.sequenceNumber - right.sequenceNumber);
  const recent = attempts.slice(-masteryConfig.recentWindow);
  const history = attempts.slice(-masteryConfig.historyWindow);
  const recentAverage = average(recent.map((attempt) => attempt.scoreValue));
  const historyAverage = average(history.map((attempt) => attempt.scoreValue));
  const mastery = 100 * (
    masteryConfig.recentWeight * recentAverage +
    masteryConfig.historyWeight * historyAverage
  );
  const accuracy = 100 * average(history.map((attempt) => attempt.correct ? 1 : 0));
  const fluencyAttempts = history
    .filter((attempt) => attempt.correct && attempt.supportLevel === "independent")
    .slice(-masteryConfig.fluencyRecentWindow);
  const categories: Partial<Record<QuestionCategory, number>> = {};
  const bands: Partial<Record<DifficultyBand, number>> = {};
  for (const attempt of history) {
    const category = attempt.category ?? "calculation";
    categories[category] = (categories[category] ?? 0) + 1;
    if (attempt.difficultyBand) bands[attempt.difficultyBand] = (bands[attempt.difficultyBand] ?? 0) + 1;
  }
  const policy = input.evidencePolicy;
  const coverageSufficient = !policy || (
    attempts.length >= policy.minimumAttempts &&
    Object.entries(policy.requiredCategoryEvidence).every(([key, count]) => (categories[key as QuestionCategory] ?? 0) >= count) &&
    Object.entries(policy.requiredBandEvidence).every(([key, count]) => (bands[key as DifficultyBand] ?? 0) >= count) &&
    (!policy.fluencyEvidence || (
      fluencyAttempts.length >= policy.fluencyEvidence.minimumFluentAttempts &&
      (median(fluencyAttempts.map((attempt) => attempt.responseTimeMs)) ?? Infinity) <= policy.fluencyEvidence.maximumMedianMs
    ))
  );

  return {
    studentId: input.studentId,
    skillId: input.skillId,
    mastery,
    accuracy,
    attemptCount: attempts.length,
    recentAverage,
    historyAverage,
    evidenceLevel: evidenceLevelForAttemptCount(attempts.length),
    evidenceCoverage: { categories, bands, sufficient: coverageSufficient },
    fluentAttemptCount: fluencyAttempts.length,
    fluencyMedianMs: input.fluencyEnabled
      ? median(fluencyAttempts.map((attempt) => attempt.responseTimeMs))
      : undefined,
    lastAttemptAt: attempts.at(-1)?.submittedAt,
    calculatedAt: input.calculatedAt ?? new Date().toISOString(),
  };
}
