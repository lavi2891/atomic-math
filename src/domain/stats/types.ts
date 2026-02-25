export const STATS_STORAGE_KEY = "atomicMath.stats.v1";
export const STATS_SCHEMA_VERSION = 1;
export const STATS_EVENTS_LIMIT = 1000;

export type StatsEvent = {
  ts: number;
  questionId: string;
  topicId: string;
  correct: boolean;
  timeMs: number;
  rated: boolean;
};

export type StatsAggregate = {
  attempts: number;
  correct: number;
  avgTimeMs: number;
};

export type StatsSchemaV1 = {
  version: 1;
  events: StatsEvent[];
  questionAgg: Record<string, StatsAggregate>;
  topicAgg: Record<string, StatsAggregate>;
  skillByTopic: Record<string, number>;
};

export type RecordAttemptInput = {
  questionId: string;
  topicId: string;
  correct: boolean;
  timeMs: number;
  rated: boolean;
};

export function createEmptyStats(): StatsSchemaV1 {
  return {
    version: STATS_SCHEMA_VERSION,
    events: [],
    questionAgg: {},
    topicAgg: {},
    skillByTopic: {},
  };
}
