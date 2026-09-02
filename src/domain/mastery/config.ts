import type { SupportLevel } from "../attempts/types.ts";

export const attemptScoreConfig: Readonly<Record<SupportLevel, number> & { incorrect: number }> = {
  independent: 1,
  hint: 0.6,
  guided: 0.3,
  incorrect: 0,
};

export interface MasteryConfig {
  recentWindow: number;
  historyWindow: number;
  recentWeight: number;
  historyWeight: number;
  evidence: { emergingAt: number; establishedAt: number };
  fluencyRecentWindow: number;
}

export const masteryConfig: MasteryConfig = {
  recentWindow: 10,
  historyWindow: 50,
  recentWeight: 0.85,
  historyWeight: 0.15,
  evidence: {
    emergingAt: 5,
    establishedAt: 10,
  },
  fluencyRecentWindow: 10,
};

export function validateMasteryConfig(config = masteryConfig): void {
  const weightTotal = config.recentWeight + config.historyWeight;
  if (Math.abs(weightTotal - 1) > 1e-9) {
    throw new Error(`Mastery weights must total 1; received ${weightTotal}`);
  }
  if (config.recentWindow <= 0 || config.historyWindow < config.recentWindow) {
    throw new Error("Mastery windows must be positive and history must include recent attempts");
  }
}

validateMasteryConfig();
