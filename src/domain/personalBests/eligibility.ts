import { challengeConfig } from "../session/config.ts";

export function isFixedPersonalBestEligible(accuracy: number, durationMs: number | undefined): boolean {
  return durationMs !== undefined && Number.isFinite(durationMs) && durationMs >= 0 && accuracy >= challengeConfig.fixedMinimumAccuracy;
}
