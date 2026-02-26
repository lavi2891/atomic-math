import type { StatsRepo } from "./StatsRepo";
import {
  createEmptyStats,
  STATS_EVENTS_LIMIT,
  STATS_SCHEMA_VERSION,
  STATS_STORAGE_KEY,
} from "./types";
import type {
  RecordAttemptInput,
  StatsAggregate,
  StatsSchemaV1,
} from "./types";
import { clamp, clamp01 } from "@shared/math";

const INITIAL_SKILL = 0.5;
const SKILL_K = 0.05;
const SKILL_MAX_STEP = 0.02;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function sanitizeTimeMs(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.round(value));
}

function updateAggregate(
  map: Record<string, StatsAggregate>,
  key: string,
  correct: boolean,
  timeMs: number,
) {
  const prev = map[key] ?? { attempts: 0, correct: 0, avgTimeMs: 0 };
  const attempts = prev.attempts + 1;
  const nextAvg = prev.avgTimeMs + (timeMs - prev.avgTimeMs) / attempts;

  map[key] = {
    attempts,
    correct: prev.correct + (correct ? 1 : 0),
    avgTimeMs: nextAvg,
  };
}

export class LocalStatsRepo implements StatsRepo {
  private readonly storage: Storage | null;
  private readonly key: string;

  constructor(storage?: Storage, key = STATS_STORAGE_KEY) {
    this.storage =
      storage ?? (typeof window !== "undefined" ? window.localStorage : null);
    this.key = key;
  }

  recordAttempt(input: RecordAttemptInput): void {
    const stats = this.read();
    const timeMs = sanitizeTimeMs(input.timeMs);

    stats.events.push({
      ts: Date.now(),
      questionId: input.questionId,
      topicId: input.topicId,
      correct: input.correct,
      timeMs,
      rated: input.rated,
    });

    if (stats.events.length > STATS_EVENTS_LIMIT) {
      stats.events = stats.events.slice(-STATS_EVENTS_LIMIT);
    }

    updateAggregate(stats.questionAgg, input.questionId, input.correct, timeMs);
    updateAggregate(stats.topicAgg, input.topicId, input.correct, timeMs);
    if (input.rated) {
      const currentSkill = stats.skillByTopic[input.topicId] ?? INITIAL_SKILL;
      const attemptsForTopic = stats.topicAgg[input.topicId]?.attempts ?? 0;
      // Keep skill progression smoother as practice data accumulates.
      const effectiveK = SKILL_K / Math.sqrt(1 + attemptsForTopic / 10);
      const target = input.correct ? 1 : 0;
      const rawDelta = effectiveK * (target - currentSkill);
      const delta = clamp(rawDelta, -SKILL_MAX_STEP, SKILL_MAX_STEP);
      stats.skillByTopic[input.topicId] = clamp01(currentSkill + delta);
    }

    this.write(stats);
  }

  getQuestionAgg(questionId: string): StatsAggregate | null {
    const agg = this.read().questionAgg[questionId];
    return agg ?? null;
  }

  getTopicAgg(topicId: string): StatsAggregate | null {
    const agg = this.read().topicAgg[topicId];
    return agg ?? null;
  }

  getAll(): StatsSchemaV1 {
    return this.read();
  }

  getTopicSkill(topicId: string): number {
    return this.read().skillByTopic[topicId] ?? INITIAL_SKILL;
  }

  getAllTopicSkills(): Record<string, number> {
    return { ...this.read().skillByTopic };
  }

  reset(): void {
    this.write(createEmptyStats());
  }

  private read(): StatsSchemaV1 {
    if (!this.storage) return createEmptyStats();

    try {
      const raw = this.storage.getItem(this.key);
      if (!raw) return createEmptyStats();
      const parsed: unknown = JSON.parse(raw);
      return this.toValidSchema(parsed);
    } catch {
      return createEmptyStats();
    }
  }

  private write(stats: StatsSchemaV1): void {
    if (!this.storage) return;

    try {
      this.storage.setItem(this.key, JSON.stringify(stats));
    } catch {
      // Ignore storage errors to avoid breaking question flow.
    }
  }

  private toValidSchema(value: unknown): StatsSchemaV1 {
    if (!isObject(value)) return createEmptyStats();
    if (value.version !== STATS_SCHEMA_VERSION) return createEmptyStats();

    const events = Array.isArray(value.events)
      ? value.events.filter(
          (event): event is StatsSchemaV1["events"][number] => {
            if (!isObject(event)) return false;
            return (
              typeof event.ts === "number" &&
              typeof event.questionId === "string" &&
              typeof event.topicId === "string" &&
              typeof event.correct === "boolean" &&
              typeof event.timeMs === "number" &&
              typeof event.rated === "boolean"
            );
          },
        )
      : [];

    const questionAgg = this.toAggMap(value.questionAgg);
    const topicAgg = this.toAggMap(value.topicAgg);
    const skillByTopic = this.toSkillMap(value.skillByTopic);

    return {
      version: STATS_SCHEMA_VERSION,
      events: events.slice(-STATS_EVENTS_LIMIT),
      questionAgg,
      topicAgg,
      skillByTopic,
    };
  }

  private toAggMap(value: unknown): Record<string, StatsAggregate> {
    if (!isObject(value)) return {};

    const map: Record<string, StatsAggregate> = {};
    for (const [key, agg] of Object.entries(value)) {
      if (!isObject(agg)) continue;

      const attempts = agg.attempts;
      const correct = agg.correct;
      const avgTimeMs = agg.avgTimeMs;

      if (
        typeof attempts !== "number" ||
        typeof correct !== "number" ||
        typeof avgTimeMs !== "number"
      ) {
        continue;
      }

      map[key] = { attempts, correct, avgTimeMs };
    }

    return map;
  }

  private toSkillMap(value: unknown): Record<string, number> {
    if (!isObject(value)) return {};

    const map: Record<string, number> = {};
    for (const [key, skill] of Object.entries(value)) {
      if (typeof skill !== "number" || !Number.isFinite(skill)) continue;
      map[key] = clamp01(skill);
    }

    return map;
  }
}
