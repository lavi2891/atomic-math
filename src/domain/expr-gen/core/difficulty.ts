import { clamp01 } from "../../../shared/math.ts";

import type { ExprAnalysis } from "./types.ts";

export interface DifficultyScore {
  raw: number;
  normalized: number;
}

export function scoreDifficulty(analysis: ExprAnalysis): DifficultyScore {
  const syntactic =
    clamp01(Math.max(0, analysis.varCount - 2) / 3) * 0.15 +
    clamp01(Math.max(0, analysis.uniqueOps.length - 1) / 4) * 0.15 +
    (analysis.hasExponent ? 0.05 : 0) +
    (analysis.hasFraction ? 0.05 : 0) +
    (analysis.hasDecimal ? 0.05 : 0);

  const mag = clamp01((analysis.maxAbsValue - 5) / 40);
  const frac = clamp01((analysis.maxDenominator - 3) / 10);
  const chain = clamp01((analysis.termCount - 2) / 3);
  const cancel = analysis.cancelScore;
  const paren = analysis.hasParenNegation ? 1 : 0;
  const exp = clamp01((analysis.maxExponent - 1) / 2);

  const raw =
    0.1 * syntactic +
    0.2 * mag +
    0.2 * frac +
    0.15 * chain +
    0.15 * cancel +
    0.1 * paren +
    0.1 * exp;

  return {
    raw,
    normalized: clamp01(raw),
  };
}
