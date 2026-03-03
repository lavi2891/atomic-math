import { clamp01 } from "../../../shared/math.ts";

import { fromInteger, reduce, toNumber, type Rational } from "./rational.ts";
import type { RandomSource } from "./rng.ts";
import type { SampledValue, VarSpec, VarType, VarsSpec } from "./types.ts";

const EPSILON = 1e-9;

interface Candidate {
  sampled: SampledValue;
  numericValue: number;
}

function getVarType(spec: VarSpec): VarType {
  return spec.type ?? "natural";
}

function normalizeBounds(spec: VarSpec): { min: number; max: number } {
  let min = Math.min(spec.min, spec.max);
  let max = Math.max(spec.min, spec.max);
  if (getVarType(spec) === "natural") {
    min = Math.max(0, min);
  }
  return { min, max };
}

function toRationalFromScaledInteger(scaledValue: number, scale: number): Rational {
  return reduce({
    num: BigInt(scaledValue),
    den: BigInt(scale),
  });
}

function passesHardConstraints(numericValue: number, spec: VarSpec): boolean {
  if (spec.notZero && Math.abs(numericValue) < EPSILON) return false;

  if (spec.forceSign === "positive" && !(numericValue > 0)) return false;
  if (spec.forceSign === "negative" && !(numericValue < 0)) return false;
  if (spec.forceSign === "nonNegative" && numericValue < 0) return false;
  if (spec.forceSign === "nonPositive" && numericValue > 0) return false;

  if (spec.allowNegative === false && numericValue < 0) return false;

  if (spec.multipleOf !== undefined) {
    const ratio = numericValue / spec.multipleOf;
    if (Math.abs(ratio - Math.round(ratio)) > EPSILON) return false;
  }

  return true;
}

function computeSoftBounds(spec: VarSpec, difficultyTarget?: number): { min: number; max: number } {
  const hard = normalizeBounds(spec);
  if (difficultyTarget === undefined) return hard;

  const t = clamp01(difficultyTarget);
  const spread = 0.3 + 0.7 * t;
  const { min, max } = hard;

  if (min < 0 && max > 0) {
    const abs = Math.max(-min, max) * spread;
    return { min: Math.max(min, -abs), max: Math.min(max, abs) };
  }
  if (min >= 0) {
    return { min, max: min + (max - min) * spread };
  }
  return { min: max - (max - min) * spread, max };
}

function weightCandidate(numericValue: number, spec: VarSpec, soft: { min: number; max: number }): number {
  let weight = 1;
  if (numericValue < soft.min - EPSILON || numericValue > soft.max + EPSILON) {
    weight *= 0.25;
  }

  const preferZero = clamp01(spec.preferZero ?? 0);
  if (Math.abs(numericValue) < EPSILON) {
    weight *= 1 + preferZero * 4;
  } else {
    weight *= 1 + (1 - preferZero) * 0.1;
  }

  const preferNegative = clamp01(spec.preferNegative ?? 0);
  if (numericValue < 0) {
    weight *= 1 + preferNegative * 2;
  } else if (numericValue > 0) {
    weight *= 1 + (1 - preferNegative) * 0.2;
  }

  return Math.max(1e-6, weight);
}

function weightedPick(candidates: Candidate[], weights: number[], rng: RandomSource): Candidate {
  let total = 0;
  for (const weight of weights) total += weight;
  let threshold = rng.nextFloat() * total;
  for (let i = 0; i < candidates.length; i += 1) {
    threshold -= weights[i]!;
    if (threshold <= 0) return candidates[i]!;
  }
  return candidates[candidates.length - 1]!;
}

function buildDiscreteCandidates(spec: VarSpec): Candidate[] {
  const { min, max } = normalizeBounds(spec);
  const type = getVarType(spec);
  const scale = type === "decimal1" ? 10 : 1;
  const start = Math.ceil(min * scale);
  const end = Math.floor(max * scale);

  const out: Candidate[] = [];
  for (let i = start; i <= end; i += 1) {
    const numericValue = i / scale;
    if (!passesHardConstraints(numericValue, spec)) continue;
    out.push({
      numericValue,
      sampled: {
        rational: toRationalFromScaledInteger(i, scale),
        renderAsDecimal: type === "decimal1",
      },
    });
  }

  return out;
}

function buildSimpleFractionCandidates(spec: VarSpec): Candidate[] {
  const { min, max } = normalizeBounds(spec);
  const denominators = spec.denominators && spec.denominators.length > 0 ? spec.denominators : [2, 4, 5, 8, 10];
  const maxNumerator = spec.maxNumerator ?? 9;
  const allowNonReduced = spec.allowNonReduced ?? true;
  const signOptions: number[] = spec.allowNegative === false ? [1] : [1, -1];
  const multiplierOptions = allowNonReduced ? [1, 2, 3] : [1];

  const out: Candidate[] = [];
  for (const den of denominators) {
    if (!Number.isInteger(den) || den <= 0) continue;
    const numeratorMax = Math.min(maxNumerator, den - 1);
    for (let num = 1; num <= numeratorMax; num += 1) {
      for (const sign of signOptions) {
        const signedNum = sign * num;
        const value = signedNum / den;
        if (value < min - EPSILON || value > max + EPSILON) continue;
        if (!passesHardConstraints(value, spec)) continue;

        for (const mult of multiplierOptions) {
          const displayNum = signedNum * mult;
          const displayDen = den * mult;
          const rational = reduce({
            num: BigInt(displayNum),
            den: BigInt(displayDen),
          });
          out.push({
            numericValue: toNumber(rational),
            sampled: {
              rational,
              displayFraction: {
                num: BigInt(displayNum),
                den: BigInt(displayDen),
              },
            },
          });
        }
      }
    }
  }

  return out;
}

function buildCandidatesForSpec(spec: VarSpec): Candidate[] {
  if (getVarType(spec) === "simpleFraction") {
    return buildSimpleFractionCandidates(spec);
  }
  return buildDiscreteCandidates(spec);
}

export function sampleVars(
  varsSpec: VarsSpec,
  rng: RandomSource,
  difficultyTarget?: number,
): Record<string, SampledValue> {
  const values: Record<string, SampledValue> = {};
  const entries = Object.entries(varsSpec).sort(([a], [b]) => a.localeCompare(b));

  for (const [name, spec] of entries) {
    const candidates = buildCandidatesForSpec(spec);
    if (candidates.length === 0) {
      throw new Error(`No valid samples for variable "${name}"`);
    }

    const softBounds = computeSoftBounds(spec, difficultyTarget);
    const weights = candidates.map((candidate) => weightCandidate(candidate.numericValue, spec, softBounds));
    values[name] = weightedPick(candidates, weights, rng).sampled;
  }

  return values;
}

export function sampledValueToNumber(value: SampledValue): number {
  return toNumber(value.rational);
}

export function sampledValueEquals(a: SampledValue, b: SampledValue): boolean {
  return a.rational.num === b.rational.num && a.rational.den === b.rational.den;
}

export function sampledValueAbs(value: SampledValue): Rational {
  if (value.rational.num < 0n) {
    return { num: -value.rational.num, den: value.rational.den };
  }
  return value.rational;
}

export function sampledValueIsZero(value: SampledValue): boolean {
  return value.rational.num === 0n;
}

export function sampledValueIsNegative(value: SampledValue): boolean {
  return value.rational.num < 0n;
}

export function sampledValueIsInteger(value: SampledValue): boolean {
  return value.rational.den === 1n;
}

export function sampledValueFromInteger(value: number): SampledValue {
  return { rational: fromInteger(value) };
}
