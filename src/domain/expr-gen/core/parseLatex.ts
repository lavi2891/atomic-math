import type { ExprAst } from "./types.ts";

type Token =
  | { kind: "number"; value: number; raw: string }
  | { kind: "var"; name: string }
  | { kind: "op"; value: "+" | "-" | "*" | "/" | "^" }
  | { kind: "lparen"; value: "(" | "{" }
  | { kind: "rparen"; value: ")" | "}" }
  | { kind: "pipe" }
  | { kind: "command"; value: "frac" };

function isDigit(char: string): boolean {
  return char >= "0" && char <= "9";
}

function isLetter(char: string): boolean {
  return /[a-z]/i.test(char);
}

function tokenize(latex: string): Token[] {
  const normalized = latex
    .replace(/\\left/g, "")
    .replace(/\\right/g, "")
    .replace(/\\times/g, "*")
    .replace(/\\cdot/g, "*")
    .replace(/\\div/g, "/")
    .replace(/\s+/g, "");

  const tokens: Token[] = [];
  let i = 0;
  while (i < normalized.length) {
    const ch = normalized[i]!;

    if (ch === "\\") {
      let j = i + 1;
      while (j < normalized.length && isLetter(normalized[j]!)) j += 1;
      const cmd = normalized.slice(i + 1, j);
      if (cmd === "frac") {
        tokens.push({ kind: "command", value: "frac" });
      } else {
        throw new Error(`Unsupported LaTeX command: \\${cmd}`);
      }
      i = j;
      continue;
    }

    if (isDigit(ch) || ch === ".") {
      let j = i + 1;
      while (j < normalized.length && (isDigit(normalized[j]!) || normalized[j] === ".")) {
        j += 1;
      }
      const raw = normalized.slice(i, j);
      const value = Number(raw);
      if (!Number.isFinite(value)) {
        throw new Error(`Invalid number token: ${raw}`);
      }
      tokens.push({ kind: "number", value, raw });
      i = j;
      continue;
    }

    if (isLetter(ch)) {
      tokens.push({ kind: "var", name: ch });
      i += 1;
      continue;
    }

    if (ch === "(" || ch === "{") {
      tokens.push({ kind: "lparen", value: ch });
      i += 1;
      continue;
    }
    if (ch === "|") {
      tokens.push({ kind: "pipe" });
      i += 1;
      continue;
    }
    if (ch === ")" || ch === "}") {
      tokens.push({ kind: "rparen", value: ch });
      i += 1;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^") {
      tokens.push({ kind: "op", value: ch });
      i += 1;
      continue;
    }

    throw new Error(`Unsupported token in LaTeX expression: ${ch}`);
  }

  return tokens;
}

function canEndImplicitMul(token: Token): boolean {
  return token.kind === "number" || token.kind === "var" || token.kind === "rparen";
}

function canStartImplicitMul(token: Token): boolean {
  return (
    token.kind === "number" ||
    token.kind === "var" ||
    token.kind === "lparen" ||
    token.kind === "command"
  );
}

function injectImplicitMultiplication(tokens: Token[]): Token[] {
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const current = tokens[i]!;
    out.push(current);
    const next = tokens[i + 1];
    if (!next) continue;
    if (!canEndImplicitMul(current) || !canStartImplicitMul(next)) continue;
    out.push({ kind: "op", value: "*" });
  }
  return out;
}

class Parser {
  private readonly tokens: Token[];

  private index = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  parse(): ExprAst {
    const ast = this.parseAddSub();
    if (this.peek() !== undefined) {
      throw new Error("Unexpected trailing tokens in LaTeX expression");
    }
    return ast;
  }

  private peek(): Token | undefined {
    return this.tokens[this.index];
  }

  private consume(): Token {
    const token = this.tokens[this.index];
    if (!token) {
      throw new Error("Unexpected end of expression");
    }
    this.index += 1;
    return token;
  }

  private parseAddSub(): ExprAst {
    let node = this.parseMulDiv();
    while (true) {
      const token = this.peek();
      if (token?.kind === "op" && (token.value === "+" || token.value === "-")) {
        this.consume();
        const right = this.parseMulDiv();
        node = { kind: "binary", op: token.value, left: node, right };
        continue;
      }
      break;
    }
    return node;
  }

  private parseMulDiv(): ExprAst {
    let node = this.parseUnary();
    while (true) {
      const token = this.peek();
      if (token?.kind === "op" && (token.value === "*" || token.value === "/")) {
        this.consume();
        const right = this.parseUnary();
        node = { kind: "binary", op: token.value, left: node, right };
        continue;
      }
      break;
    }
    return node;
  }

  private parseUnary(): ExprAst {
    const token = this.peek();
    if (token?.kind === "op" && token.value === "-") {
      this.consume();
      return { kind: "unaryMinus", expr: this.parseUnary() };
    }
    return this.parsePow();
  }

  private parsePow(): ExprAst {
    const primary = this.parsePrimaryWithMeta();
    let node = primary.ast;
    const token = this.peek();
    if (token?.kind === "op" && token.value === "^") {
      this.consume();
      const right = this.parsePow();
      if (primary.bareFraction && node.kind === "binary" && node.op === "/") {
        node = {
          kind: "binary",
          op: "/",
          left: { kind: "binary", op: "^", left: node.left, right },
          right: node.right,
        };
      } else {
        node = { kind: "binary", op: "^", left: node, right };
      }
    }
    return node;
  }

  private parsePrimaryWithMeta(): { ast: ExprAst; bareFraction: boolean } {
    const token = this.consume();

    if (token.kind === "number") {
      return { ast: { kind: "number", value: token.value, raw: token.raw }, bareFraction: false };
    }
    if (token.kind === "var") {
      return { ast: { kind: "var", name: token.name }, bareFraction: false };
    }
    if (token.kind === "lparen") {
      const expr = this.parseAddSub();
      this.expectClosing(token.value);
      return { ast: expr, bareFraction: false };
    }
    if (token.kind === "pipe") {
      const expr = this.parseAddSub();
      const closing = this.consume();
      if (closing.kind !== "pipe") {
        throw new Error("Expected closing absolute-value bar");
      }
      return { ast: { kind: "abs", expr }, bareFraction: false };
    }
    if (token.kind === "command" && token.value === "frac") {
      const numerator = this.parseGroupedExpression();
      const maybeImplicit = this.peek();
      if (maybeImplicit?.kind === "op" && maybeImplicit.value === "*") {
        const after = this.tokens[this.index + 1];
        if (after?.kind === "lparen") {
          this.consume();
        }
      }
      const denominator = this.parseGroupedExpression();
      return {
        ast: {
          kind: "binary",
          op: "/",
          left: numerator,
          right: denominator,
        },
        bareFraction: true,
      };
    }

    throw new Error("Invalid expression");
  }

  private parseGroupedExpression(): ExprAst {
    const token = this.peek();
    if (token?.kind !== "lparen") {
      throw new Error("Expected grouped expression");
    }
    this.consume();
    const expr = this.parseAddSub();
    this.expectClosing(token.value);
    return expr;
  }

  private expectClosing(opening: "(" | "{"): void {
    const expected = opening === "(" ? ")" : "}";
    const token = this.consume();
    if (token.kind !== "rparen" || token.value !== expected) {
      throw new Error(`Expected closing bracket ${expected}`);
    }
  }
}

export function parseLatex(latex: string): ExprAst {
  const tokens = injectImplicitMultiplication(tokenize(latex));
  if (tokens.length === 0) {
    throw new Error("Expression is empty");
  }
  return new Parser(tokens).parse();
}
