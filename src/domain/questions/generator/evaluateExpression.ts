import { evalAst } from "../../expr-gen/core/evalAst.ts";
import { parseLatex } from "../../expr-gen/core/parseLatex.ts";
import {
  reduce,
  toAnswerString,
  type Rational,
} from "../../expr-gen/core/rational.ts";

function hasOnlyFactorsOfTwoAndFive(value: bigint): boolean {
  let current = value < 0n ? -value : value;
  if (current === 0n) return true;
  while (current % 2n === 0n) current /= 2n;
  while (current % 5n === 0n) current /= 5n;
  return current === 1n;
}

export function toTerminatingDecimalString(value: Rational): string | null {
  const reduced = reduce(value);
  if (!hasOnlyFactorsOfTwoAndFive(reduced.den)) {
    return null;
  }

  const sign = reduced.num < 0n ? "-" : "";
  const absNum = reduced.num < 0n ? -reduced.num : reduced.num;
  const integerPart = absNum / reduced.den;
  let remainder = absNum % reduced.den;

  if (remainder === 0n) {
    return `${sign}${integerPart.toString()}`;
  }

  const digits: string[] = [];
  while (remainder !== 0n) {
    remainder *= 10n;
    digits.push((remainder / reduced.den).toString());
    remainder %= reduced.den;
  }

  return `${sign}${integerPart.toString()}.${digits.join("")}`;
}

export function roundRationalToDecimal(value: Rational, decimalPlaces: number): string {
  if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0 || decimalPlaces > 12) {
    throw new Error(`Invalid rounding precision: ${decimalPlaces}`);
  }
  const reduced = reduce(value);
  const scale = 10n ** BigInt(decimalPlaces);
  const negative = reduced.num < 0n;
  const numerator = (negative ? -reduced.num : reduced.num) * scale;
  let rounded = numerator / reduced.den;
  if ((numerator % reduced.den) * 2n >= reduced.den) rounded += 1n;
  const sign = negative && rounded !== 0n ? "-" : "";
  if (decimalPlaces === 0) return `${sign}${rounded}`;
  const digits = rounded.toString().padStart(decimalPlaces + 1, "0");
  return `${sign}${digits.slice(0, -decimalPlaces)}.${digits.slice(-decimalPlaces)}`;
}

export function evaluateExpression(expression: string): Rational {
  return evalAst(parseLatex(expression));
}

export function toComputedAnswer(
  value: Rational,
  options: { preferDecimal?: boolean } = {},
): string {
  if (options.preferDecimal) {
    const decimal = toTerminatingDecimalString(value);
    if (decimal) {
      return decimal;
    }
  }
  return toAnswerString(value);
}
