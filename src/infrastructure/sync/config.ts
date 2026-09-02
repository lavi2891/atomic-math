export const syncConfig = {
  attemptFlushThreshold: 5,
  flushIntervalMs: 25_000,
  maxBatchSize: 25,
  initialBackoffMs: 5_000,
  maxBackoffMs: 5 * 60_000,
} as const;
