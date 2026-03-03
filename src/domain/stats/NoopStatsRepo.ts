/**
 * NoopStatsRepo is used in DEV mode when stats writes are disabled.
 * All write operations are intentionally ignored.
 */

import type { StatsRepo } from "./StatsRepo";
import { createEmptyStats } from "./types";
import type {
  RecordAttemptInput,
  StatsAggregate,
  StatsSchemaV1,
} from "./types";

export class NoopStatsRepo implements StatsRepo {
  recordAttempt(_input: RecordAttemptInput): void {
    void _input;
  }

  getQuestionAgg(_questionId: string): StatsAggregate | null {
    void _questionId;
    return null;
  }

  getTopicAgg(_topicId: string): StatsAggregate | null {
    void _topicId;
    return null;
  }

  getTopicSkill(_topicId: string): number {
    void _topicId;
    return 0;
  }

  getAllTopicSkills(): Record<string, number> {
    return {};
  }

  getAll(): StatsSchemaV1 {
    return createEmptyStats();
  }

  reset(): void {}
}
