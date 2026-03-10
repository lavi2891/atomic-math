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

function toTerminatingDecimalString(value: Rational): string | null {
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
