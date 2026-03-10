import {
  add,
  div,
  fromNumber,
  fromString,
  mul,
  negate,
  sub,
  type Rational,
} from "../../expr-gen/core/rational.ts";
import type { SampledParams } from "./types.ts";

type OperatorToken =
  | "+"
  | "-"
  | "*"
  | "/"
  | "&&"
  | "||"
  | "==="
  | "!=="
  | "=="
  | "!="
  | "<"
  | "<="
  | ">"
  | ">=";

type Token =
  | { kind: "number"; value: string }
  | { kind: "identifier"; value: string }
  | { kind: "op"; value: OperatorToken }
  | { kind: "lparen" }
  | { kind: "rparen" };

const TOKEN_PATTERN =
  /\s*(?:([A-Za-z_]\w*)|(\d+\.?\d*|\.\d+)|(&&|\|\||===|!==|==|!=|<=|>=|[+\-*/()<>]))/y;

function compareRationals(a: Rational, b: Rational): number {
  const left = a.num * b.den;
  const right = b.num * a.den;
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

function tokenizeConstraint(source: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  while (index < source.length) {
    TOKEN_PATTERN.lastIndex = index;
    const match = TOKEN_PATTERN.exec(source);
    if (!match) {
      throw new Error(`Invalid token in constraint: ${source.slice(index)}`);
    }
    index = TOKEN_PATTERN.lastIndex;

    if (match[1]) {
      tokens.push({ kind: "identifier", value: match[1] });
      continue;
    }
    if (match[2]) {
      tokens.push({ kind: "number", value: match[2] });
      continue;
    }

    const operator = match[3];
    if (!operator) continue;
    if (operator === "(") {
      tokens.push({ kind: "lparen" });
    } else if (operator === ")") {
      tokens.push({ kind: "rparen" });
    } else {
      tokens.push({ kind: "op", value: operator as OperatorToken });
    }
  }

  return tokens;
}

class ConstraintParser {
  private index = 0;
  private readonly tokens: Token[];
  private readonly params: SampledParams;

  constructor(tokens: Token[], params: SampledParams) {
    this.tokens = tokens;
    this.params = params;
  }

  parse(): boolean {
    const result = this.parseOr();
    if (this.peek()) {
      throw new Error("Unexpected trailing tokens in constraint");
    }
    return result;
  }

  private peek(): Token | undefined {
    return this.tokens[this.index];
  }

  private consume(): Token {
    const token = this.tokens[this.index];
    if (!token) throw new Error("Unexpected end of constraint");
    this.index += 1;
    return token;
  }

  private consumeOp(): Extract<Token, { kind: "op" }> {
    const token = this.consume();
    if (token.kind !== "op") {
      throw new Error("Expected operator token");
    }
    return token;
  }

  private parseOr(): boolean {
    let value = this.parseAnd();
    while (this.peek()?.kind === "op" && this.peekOpValue() === "||") {
      this.consume();
      const right = this.parseAnd();
      value = value || right;
    }
    return value;
  }

  private parseAnd(): boolean {
    let value = this.parseComparison();
    while (this.peek()?.kind === "op" && this.peekOpValue() === "&&") {
      this.consume();
      const right = this.parseComparison();
      value = value && right;
    }
    return value;
  }

  private parseComparison(): boolean {
    const left = this.parseAddSub();
    const operator = this.peek();
    if (operator?.kind !== "op" || !["==", "!=", "===", "!==", "<", "<=", ">", ">="].includes(operator.value)) {
      return compareRationals(left, fromNumber(0)) !== 0;
    }

    this.consume();
    const right = this.parseAddSub();
    const comparison = compareRationals(left, right);

    switch (operator.value) {
      case "==":
      case "===":
        return comparison === 0;
      case "!=":
      case "!==":
        return comparison !== 0;
      case "<":
        return comparison < 0;
      case "<=":
        return comparison <= 0;
      case ">":
        return comparison > 0;
      case ">=":
        return comparison >= 0;
      default:
        throw new Error(`Unsupported comparison operator: ${operator.value}`);
    }
  }

  private parseAddSub(): Rational {
    let value = this.parseMulDiv();
    while (
      this.peek()?.kind === "op" &&
      (this.peekOpValue() === "+" || this.peekOpValue() === "-")
    ) {
      const operator = this.consumeOp();
      const right = this.parseMulDiv();
      value = operator.value === "+" ? add(value, right) : sub(value, right);
    }
    return value;
  }

  private parseMulDiv(): Rational {
    let value = this.parseUnary();
    while (
      this.peek()?.kind === "op" &&
      (this.peekOpValue() === "*" || this.peekOpValue() === "/")
    ) {
      const operator = this.consumeOp();
      const right = this.parseUnary();
      value = operator.value === "*" ? mul(value, right) : div(value, right);
    }
    return value;
  }

  private parseUnary(): Rational {
    const token = this.peek();
    if (token?.kind === "op" && token.value === "-") {
      this.consume();
      return negate(this.parseUnary());
    }
    return this.parseArithmeticPrimary();
  }

  private peekOpValue(): OperatorToken | null {
    const token = this.peek();
    return token?.kind === "op" ? token.value : null;
  }

  private parseArithmeticPrimary(): Rational {
    const token = this.consume();

    if (token.kind === "number") {
      return fromString(token.value.startsWith(".") ? `0${token.value}` : token.value);
    }

    if (token.kind === "identifier") {
      const sampled = this.params[token.value];
      if (!sampled) {
        throw new Error(`Unknown constraint identifier "${token.value}"`);
      }
      return sampled.value;
    }

    if (token.kind === "lparen") {
      const value = this.parseAddSub();
      const closing = this.consume();
      if (closing.kind !== "rparen") {
        throw new Error("Expected closing parenthesis in arithmetic expression");
      }
      return value;
    }

    throw new Error("Invalid arithmetic expression in constraint");
  }
}

export function evaluateConstraint(
  constraint: string,
  params: SampledParams,
): boolean {
  const parser = new ConstraintParser(tokenizeConstraint(constraint), params);
  return parser.parse();
}
