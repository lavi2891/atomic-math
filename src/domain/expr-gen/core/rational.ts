export type Rational = { num: bigint; den: bigint };

function absBigInt(value: bigint): bigint {
  return value < 0n ? -value : value;
}

export function normalizeSign(value: Rational): Rational {
  if (value.den === 0n) {
    throw new Error("Rational denominator cannot be zero");
  }
  if (value.den < 0n) {
    return { num: -value.num, den: -value.den };
  }
  return value;
}

export function gcdBigInt(a: bigint, b: bigint): bigint {
  let x = absBigInt(a);
  let y = absBigInt(b);
  while (y !== 0n) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x === 0n ? 1n : x;
}

export function reduce(value: Rational): Rational {
  const normalized = normalizeSign(value);
  if (normalized.num === 0n) return { num: 0n, den: 1n };
  const gcd = gcdBigInt(normalized.num, normalized.den);
  return {
    num: normalized.num / gcd,
    den: normalized.den / gcd,
  };
}

export function fromInteger(value: number | bigint): Rational {
  if (typeof value === "number") {
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      throw new Error(`Cannot create integer rational from ${value}`);
    }
    return { num: BigInt(value), den: 1n };
  }
  return { num: value, den: 1n };
}

function parseDecimalToRational(text: string): Rational {
  const sign = text.startsWith("-") ? -1n : 1n;
  const unsigned = text.startsWith("-") ? text.slice(1) : text;
  const parts = unsigned.split(".");
  if (parts.length === 1) {
    return fromInteger(sign * BigInt(parts[0] || "0"));
  }
  const whole = BigInt(parts[0] || "0");
  const fracText = parts[1] || "0";
  const den = 10n ** BigInt(fracText.length);
  const frac = BigInt(fracText);
  const num = sign * (whole * den + frac);
  return reduce({ num, den });
}

export function fromNumber(value: number): Rational {
  if (!Number.isFinite(value)) {
    throw new Error("Cannot convert non-finite number to rational");
  }
  if (Number.isInteger(value)) return fromInteger(value);
  return parseDecimalToRational(value.toString());
}

export function fromString(text: string): Rational {
  if (!/^-?(?:\d+|\d+\.\d+|\.\d+)$/.test(text)) {
    throw new Error(`Unsupported numeric literal "${text}"`);
  }
  return parseDecimalToRational(text.startsWith(".") ? `0${text}` : text);
}

export function add(a: Rational, b: Rational): Rational {
  return reduce({
    num: a.num * b.den + b.num * a.den,
    den: a.den * b.den,
  });
}

export function sub(a: Rational, b: Rational): Rational {
  return reduce({
    num: a.num * b.den - b.num * a.den,
    den: a.den * b.den,
  });
}

export function mul(a: Rational, b: Rational): Rational {
  return reduce({
    num: a.num * b.num,
    den: a.den * b.den,
  });
}

export function div(a: Rational, b: Rational): Rational {
  if (b.num === 0n) {
    throw new Error("Division by zero rational");
  }
  return reduce({
    num: a.num * b.den,
    den: a.den * b.num,
  });
}

export function pow(base: Rational, exp: number): Rational {
  if (!Number.isInteger(exp) || exp < 0) {
    throw new Error("Rational exponent must be a natural integer");
  }
  if (exp === 0) return fromInteger(1);
  let num = 1n;
  let den = 1n;
  for (let i = 0; i < exp; i += 1) {
    num *= base.num;
    den *= base.den;
  }
  return reduce({ num, den });
}

export function negate(value: Rational): Rational {
  return { num: -value.num, den: value.den };
}

export function isInteger(value: Rational): boolean {
  return value.den === 1n;
}

export function toNumber(value: Rational): number {
  return Number(value.num) / Number(value.den);
}

export function toAnswerString(value: Rational): string {
  const reduced = reduce(value);
  if (reduced.den === 1n) return `${reduced.num.toString()}`;
  return `${reduced.num.toString()}/${reduced.den.toString()}`;
}
