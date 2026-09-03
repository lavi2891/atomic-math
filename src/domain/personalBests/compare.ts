import type { PersonalBest } from "./types.ts";

export function isBetterPersonalBest(candidate: PersonalBest, current: PersonalBest | null): boolean {
  if (!current) return true;
  if (candidate.signature.mode === "fixed") return candidate.bestScore < current.bestScore;
  if (candidate.bestScore !== current.bestScore) return candidate.bestScore > current.bestScore;
  return candidate.metrics.accuracy > current.metrics.accuracy;
}
