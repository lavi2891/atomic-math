import {
  fromString,
  reduce,
  toAnswerString,
  type Rational,
} from "../../domain/expr-gen/core/rational.ts";
import type { ExactNumericParseResult } from "./types.ts";
import { normalizeMathInput } from "./normalize.ts";

const INTEGER_PATTERN = /^-?\d+$/;
const DECIMAL_PATTERN = /^-?(?:\d+\.\d*|\.\d+)$/;
const FRACTION_PATTERN = /^(-?\d+)\/(\d+)$/;

function parseFraction(normalized: string): Rational | null {
  const fractionMatch = normalized.match(FRACTION_PATTERN);
  if (!fractionMatch) {
    return null;
  }

  const numerator = BigInt(fractionMatch[1] ?? "0");
  const denominator = BigInt(fractionMatch[2] ?? "0");
  if (denominator === 0n) {
    return null;
  }

  return reduce({ num: numerator, den: denominator });
}

export function parseExactNumericInput(raw: string): ExactNumericParseResult {
  const normalizedRaw = normalizeMathInput(raw);
  if (/\d\s+\d/.test(normalizedRaw)) {
    return { ok: false, normalized: normalizedRaw };
  }

  const normalized = normalizedRaw.replace(/\s+/g, "");
  if (normalized.length === 0) {
    return { ok: false, normalized };
  }

  if (INTEGER_PATTERN.test(normalized)) {
    const rational = fromString(normalized);
    return {
      ok: true,
      normalized,
      format: "integer",
      value: rational,
      canonical: toAnswerString(rational),
    };
  }

  if (DECIMAL_PATTERN.test(normalized)) {
    const decimalText = normalized.startsWith(".") ? `0${normalized}` : normalized;
    const rational = fromString(decimalText);
    return {
      ok: true,
      normalized,
      format: "decimal",
      value: rational,
      canonical: toAnswerString(rational),
    };
  }

  const fraction = parseFraction(normalized);
  if (fraction) {
    return {
      ok: true,
      normalized,
      format: "fraction",
      value: fraction,
      canonical: toAnswerString(fraction),
    };
  }

  return { ok: false, normalized };
}

export function exactNumericEquals(left: Rational, right: Rational): boolean {
  const a = reduce(left);
  const b = reduce(right);
  return a.num === b.num && a.den === b.den;
}
