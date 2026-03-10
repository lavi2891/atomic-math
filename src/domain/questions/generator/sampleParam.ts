import {
  add,
  fromInteger,
  fromNumber,
  gcdBigInt,
  isInteger,
  mul,
  reduce,
  sub,
  toAnswerString,
  type Rational,
} from "../../expr-gen/core/rational.ts";
import type {
  DecimalParamSpec,
  IntegerLikeParamSpec,
  ParamSpec,
  RationalEndpointSpec,
  RationalParamSpec,
  SampledParamValue,
} from "./types.ts";

type RandomFn = () => number;

function assertFiniteInteger(value: number, label: string): number {
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new Error(`${label} must be a finite integer`);
  }
  return value;
}

function pickOne<T>(items: T[], rng: RandomFn): T {
  if (items.length === 0) {
    throw new Error("Cannot sample from an empty set");
  }
  const index = Math.floor(rng() * items.length);
  return items[index] as T;
}

function serializeRational(value: Rational): string {
  const reduced = reduce(value);
  return `${reduced.num.toString()}/${reduced.den.toString()}`;
}

function excludedSet(exclude: number[] | undefined): Set<number> {
  return new Set(exclude ?? []);
}

function buildIntegerCandidates(spec: IntegerLikeParamSpec): number[] {
  const min = assertFiniteInteger(spec.min, `${spec.type}.min`);
  const max = assertFiniteInteger(spec.max, `${spec.type}.max`);
  const start = spec.type === "natural" ? Math.max(1, min) : min;
  if (start > max) {
    throw new Error(`Invalid ${spec.type} range: ${start}..${max}`);
  }
  const blocked = excludedSet(spec.exclude);
  const values: number[] = [];
  for (let current = start; current <= max; current += 1) {
    if (!blocked.has(current)) {
      values.push(current);
    }
  }
  return values;
}

function decimalPlaces(value: number): number {
  const text = value.toString().toLowerCase();
  if (text.includes("e")) {
    const [base, exponentText] = text.split("e");
    const exponent = Number(exponentText);
    const normalizedBase = base ?? "0";
    const basePlaces = normalizedBase.includes(".")
      ? normalizedBase.length - normalizedBase.indexOf(".") - 1
      : 0;
    return Math.max(0, basePlaces - exponent);
  }
  return text.includes(".") ? text.length - text.indexOf(".") - 1 : 0;
}

function toDecimalString(value: Rational, placesHint: number): string {
  const normalized = reduce(value);
  if (normalized.den === 1n) {
    return normalized.num.toString();
  }

  const sign = normalized.num < 0n ? "-" : "";
  const absNum = normalized.num < 0n ? -normalized.num : normalized.num;
  const integerPart = absNum / normalized.den;
  let remainder = absNum % normalized.den;
  const digits: string[] = [];
  const maxDigits = Math.max(placesHint, 1);

  for (let index = 0; index < maxDigits && remainder !== 0n; index += 1) {
    remainder *= 10n;
    digits.push((remainder / normalized.den).toString());
    remainder %= normalized.den;
  }

  const trimmed = digits.join("").replace(/0+$/, "");
  return trimmed.length > 0 ? `${sign}${integerPart.toString()}.${trimmed}` : `${sign}${integerPart.toString()}`;
}

function sampleIntegerLike(spec: IntegerLikeParamSpec, rng: RandomFn): SampledParamValue {
  const choice = pickOne(buildIntegerCandidates(spec), rng);
  const rational = fromInteger(choice);
  const text = choice.toString();
  return {
    type: spec.type,
    expr: text,
    display: text,
    value: rational,
  };
}

function sampleDecimal(spec: DecimalParamSpec, rng: RandomFn): SampledParamValue {
  if (!(spec.step > 0)) {
    throw new Error("decimal.step must be > 0");
  }

  const min = fromNumber(spec.min);
  const max = fromNumber(spec.max);
  const step = fromNumber(spec.step);
  const stepCount = sub(max, min);
  const rawSteps = reduce({
    num: stepCount.num * step.den,
    den: stepCount.den * step.num,
  });

  if (rawSteps.num < 0n || !isInteger(rawSteps)) {
    throw new Error("decimal range must align with step");
  }

  const blocked = new Set((spec.exclude ?? []).map((value) => serializeRational(fromNumber(value))));
  const placesHint = Math.max(
    decimalPlaces(spec.min),
    decimalPlaces(spec.max),
    decimalPlaces(spec.step),
  );

  const candidates: Rational[] = [];
  for (let index = 0n; index <= rawSteps.num; index += 1n) {
    const value = add(min, mul(step, fromInteger(index)));
    if (!blocked.has(serializeRational(value))) {
      candidates.push(value);
    }
  }

  const choice = pickOne(candidates, rng);
  const text = toDecimalString(choice, placesHint);

  return {
    type: "decimal",
    expr: text,
    display: text,
    value: choice,
  };
}

function buildRationalEndpointCandidates(
  spec: RationalEndpointSpec,
  fallbackType: "integer" | "natural",
): number[] {
  return buildIntegerCandidates({
    type: spec.type ?? fallbackType,
    min: spec.min,
    max: spec.max,
    exclude: spec.exclude,
  });
}

function sampleRational(spec: RationalParamSpec, rng: RandomFn): SampledParamValue {
  const numerators = buildRationalEndpointCandidates(spec.numerator, "integer");
  const denominators = buildRationalEndpointCandidates(
    {
      type: "natural",
      min: spec.denominator.min,
      max: spec.denominator.max,
      exclude: [...(spec.denominator.exclude ?? []), 0],
    },
    "natural",
  );

  const pairs: Array<{ numerator: number; denominator: number }> = [];
  for (const numerator of numerators) {
    for (const denominator of denominators) {
      if (denominator === 0) continue;
      if (spec.excludeZero && numerator === 0) continue;
      pairs.push({ numerator, denominator });
    }
  }

  const choice = pickOne(pairs, rng);
  const displayGcd = gcdBigInt(BigInt(choice.numerator), BigInt(choice.denominator));
  const displayNum = spec.simplify
    ? BigInt(choice.numerator) / displayGcd
    : BigInt(choice.numerator);
  const displayDen = spec.simplify
    ? BigInt(choice.denominator) / displayGcd
    : BigInt(choice.denominator);
  const reducedValue = reduce({
    num: BigInt(choice.numerator),
    den: BigInt(choice.denominator),
  });

  const absDisplayNum = displayNum < 0n ? -displayNum : displayNum;
  const expr = `${displayNum.toString()}/${displayDen.toString()}`;
  const display = displayNum < 0n
    ? `-\\frac{${absDisplayNum.toString()}}{${displayDen.toString()}}`
    : `\\frac{${displayNum.toString()}}{${displayDen.toString()}}`;

  return {
    type: "rational",
    expr,
    display,
    value: reducedValue,
  };
}

export function sampleParam(spec: ParamSpec, rng: RandomFn = Math.random): SampledParamValue {
  switch (spec.type) {
    case "integer":
    case "natural":
      return sampleIntegerLike(spec, rng);
    case "decimal":
      return sampleDecimal(spec, rng);
    case "rational":
      return sampleRational(spec, rng);
    default:
      throw new Error(`Unsupported param type: ${(spec as { type?: string }).type ?? "unknown"}`);
  }
}

export function sampledParamEqualsNumber(
  sampled: SampledParamValue,
  value: number,
): boolean {
  return serializeRational(sampled.value) === serializeRational(fromNumber(value));
}

export function sampledParamToAnswerString(sampled: SampledParamValue): string {
  return toAnswerString(sampled.value);
}
