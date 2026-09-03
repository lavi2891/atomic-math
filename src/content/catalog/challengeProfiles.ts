import type { DifficultyBand, QuestionCategory } from "./types.ts";

export interface ChallengeProfile {
  id: string;
  version: number;
  mode: "timed" | "survival";
  allowedCategories: QuestionCategory[];
  allowedBands: DifficultyBand[];
  progression: DifficultyBand[];
  shortItemsOnly: true;
}

export const CHALLENGE_PROFILES = [
  { id: "TIMED_FLUENCY", version: 1, mode: "timed", allowedCategories: ["calculation"], allowedBands: ["A", "B"], progression: ["A", "A", "B"], shortItemsOnly: true },
  { id: "SURVIVAL_CORE", version: 1, mode: "survival", allowedCategories: ["calculation", "conceptual"], allowedBands: ["A", "B", "C", "D"], progression: ["A", "A", "B", "B", "C", "C", "D"], shortItemsOnly: true },
] as const satisfies readonly ChallengeProfile[];

export function getChallengeProfile(id: string | undefined): ChallengeProfile | undefined {
  return CHALLENGE_PROFILES.find((profile) => profile.id === id);
}
