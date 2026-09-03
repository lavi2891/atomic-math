export const TIMED_DURATION_PRESETS_SECONDS = [30, 60, 120, 180] as const;
export type TimedDurationSeconds = (typeof TIMED_DURATION_PRESETS_SECONDS)[number];

export const sessionDefaults = {
  fixedQuestionCount: 10,
  survivalMaxErrors: 3,
  timedDurationSeconds: 60 as TimedDurationSeconds,
} as const;
