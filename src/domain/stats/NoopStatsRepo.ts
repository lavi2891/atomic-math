import type { StatsRepo } from "./StatsRepo";
import { createEmptyStats } from "./types";
import type {
  RecordAttemptInput,
  StatsAggregate,
  StatsSchemaV1,
} from "./types";

export class NoopStatsRepo implements StatsRepo {
  recordAttempt(_input: RecordAttemptInput): void {}

  getQuestionAgg(_questionId: string): StatsAggregate | null {
    return null;
  }

  getTopicAgg(_topicId: string): StatsAggregate | null {
    return null;
  }

  getAll(): StatsSchemaV1 {
    return createEmptyStats();
  }

  reset(): void {}
}
