import type {
  RecordAttemptInput,
  StatsAggregate,
  StatsSchemaV1,
} from "./types";

export interface StatsRepo {
  recordAttempt(input: RecordAttemptInput): void;
  getQuestionAgg(questionId: string): StatsAggregate | null;
  getTopicAgg(topicId: string): StatsAggregate | null;
  getAll(): StatsSchemaV1;
  reset(): void;
}
