import type {
  BinaryOp,
  EquationNode,
  ExprNode,
  InequalityNode,
  InequalityOp,
  ParseErr,
  Token,
  UnaryOp,
} from "./types";
import { tokenize } from "./tokenize";

interface ParseExpressionOk {
  ast: ExprNode;
}

interface ParseFail {
  error: ParseErr;
}

type ParseExpressionResult = ParseExpressionOk | ParseFail;

class TokenStream {
  private cursor = 0;
  private readonly tokens: Token[];

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  peek(offset = 0): Token {
    const token = this.tokens[this.cursor + offset];
    if (token) {
      return token;
    }
    const last = this.tokens[this.tokens.length - 1];
    if (last) {
      return last;
    }
    return { kind: "eof", text: "", index: 0 };
  }

  consume(): Token {
    const token = this.peek();
    this.cursor += 1;
    return token;
  }

  isEof(): boolean {
    return this.peek().kind === "eof";
  }
}

function err(code: ParseErr["code"], message: string, token?: Token): ParseFail {
  return { error: { code, message, index: token?.index } };
}

function getInfixBindingPower(op: BinaryOp): { left: number; right: number } {
  switch (op) {
    case "+":
    case "-":
      return { left: 10, right: 11 };
    case "*":
    case "/":
      return { left: 20, right: 21 };
    case "^":
      return { left: 40, right: 40 };
  }
}

function parsePrefix(stream: TokenStream): ParseExpressionResult {
  const token = stream.peek();

  if (token.kind === "number") {
    stream.consume();
    const value = Number(token.text);
    if (!Number.isFinite(value)) {
      return err("INVALID_NUMBER", "Invalid number value", token);
    }
    return {
      ast: {
        type: "number",
        raw: token.text,
        value,
      },
    };
  }

  if (token.kind === "identifier") {
    stream.consume();
    if (token.text === "sqrt") {
      const next = stream.peek();
      if (next.kind !== "lparen") {
        return err("INVALID_TOKEN", "sqrt must be followed by parentheses", next);
      }
      stream.consume();
      const argParsed = parseExpression(stream, 0);
      if ("error" in argParsed) {
        return argParsed;
      }
      const close = stream.peek();
      if (close.kind !== "rparen") {
        return err("MISMATCHED_PAREN", 'Missing ")" after sqrt argument', close);
      }
      stream.consume();
      return {
        ast: {
          type: "sqrt",
          arg: argParsed.ast,
        },
      };
    }

    return {
      ast: {
        type: "identifier",
        name: token.text,
      },
    };
  }

  if (token.kind === "op" && (token.text === "+" || token.text === "-")) {
    stream.consume();
    const op = token.text as UnaryOp;
    const parsedArg = parseExpression(stream, 35);
    if ("error" in parsedArg) {
      return parsedArg;
    }
    return {
      ast: {
        type: "unary",
        op,
        arg: parsedArg.ast,
      },
    };
  }

  if (token.kind === "lparen") {
    stream.consume();
    const inside = parseExpression(stream, 0);
    if ("error" in inside) {
      return inside;
    }
    const close = stream.peek();
    if (close.kind !== "rparen") {
      return err("MISMATCHED_PAREN", 'Missing ")"', close);
    }
    stream.consume();
    return inside;
  }

  if (token.kind === "eof") {
    return err("UNEXPECTED_END", "Unexpected end of input", token);
  }

  return err("UNEXPECTED_TOKEN", `Unexpected token "${token.text}"`, token);
}

function parseExpression(stream: TokenStream, minBindingPower: number): ParseExpressionResult {
  const prefix = parsePrefix(stream);
  if ("error" in prefix) {
    return prefix;
  }
  let left = prefix.ast;

  while (true) {
    const token = stream.peek();
    if (token.kind !== "op") {
      break;
    }
    if (
      token.text !== "+" &&
      token.text !== "-" &&
      token.text !== "*" &&
      token.text !== "/" &&
      token.text !== "^"
    ) {
      break;
    }

    const op = token.text as BinaryOp;
    const bp = getInfixBindingPower(op);
    if (bp.left < minBindingPower) {
      break;
    }
    stream.consume();

    const rightResult = parseExpression(stream, bp.right);
    if ("error" in rightResult) {
      return rightResult;
    }

    left = {
      type: "binary",
      op,
      left,
      right: rightResult.ast,
    };
  }

  return { ast: left };
}

function parseExpressionFromTokens(tokens: Token[]): ParseExpressionResult {
  const stream = new TokenStream(tokens);
  const parsed = parseExpression(stream, 0);
  if ("error" in parsed) {
    return parsed;
  }

  const next = stream.peek();
  if (!stream.isEof()) {
    if (next.kind === "rparen") {
      return err("MISMATCHED_PAREN", 'Unexpected ")"', next);
    }
    return err("UNEXPECTED_TOKEN", `Unexpected token "${next.text}"`, next);
  }

  return parsed;
}

function splitTopLevel(tokens: Token[]): { parts: [Token[], Token[]]; op: Token } | ParseFail {
  let depth = 0;
  let splitIndex = -1;

  for (const [i, token] of tokens.entries()) {
    if (token.kind === "lparen") {
      depth += 1;
      continue;
    }
    if (token.kind === "rparen") {
      depth -= 1;
      if (depth < 0) {
        return err("MISMATCHED_PAREN", 'Unexpected ")"', token);
      }
      continue;
    }
    if (depth === 0 && (token.kind === "equal" || token.kind === "relop")) {
      if (splitIndex >= 0) {
        const currentOp = tokens[splitIndex];
        if (!currentOp) {
          return err("MISSING_OPERATOR", "Missing top-level comparison operator", token);
        }
        if (currentOp.kind === "equal") {
          return err("INVALID_EQUATION", 'Equation must contain exactly one "="', token);
        }
        return err("INVALID_INEQUALITY", "Inequality must contain exactly one top-level operator", token);
      }
      splitIndex = i;
    }
  }

  if (depth !== 0) {
    const eof = tokens[tokens.length - 1];
    return err("MISMATCHED_PAREN", "Unclosed parenthesis", eof ?? { kind: "eof", text: "", index: 0 });
  }
  if (splitIndex < 0) {
    const eof = tokens[tokens.length - 1];
    return err(
      "MISSING_OPERATOR",
      "Missing top-level comparison operator",
      eof ?? { kind: "eof", text: "", index: 0 },
    );
  }

  const op = tokens[splitIndex];
  if (!op) {
    return err("MISSING_OPERATOR", "Missing top-level comparison operator");
  }
  const left = tokens.slice(0, splitIndex);
  const right = tokens.slice(splitIndex + 1);
  return { parts: [left, right], op };
}

function finalizeExpressionTokens(tokens: Token[]): Token[] {
  const cloned = tokens.slice();
  const last = tokens[tokens.length - 1];
  const index = last ? last.index + 1 : 0;
  cloned.push({ kind: "eof", text: "", index });
  return cloned;
}

function parseExpressionNoRelations(input: string): ParseExpressionResult {
  const tokenized = tokenize(input);
  if ("error" in tokenized) {
    return tokenized;
  }
  const nonEof = tokenized.tokens.filter((t) => t.kind !== "eof");
  for (const t of nonEof) {
    if (t.kind === "equal" || t.kind === "relop" || t.kind === "comma") {
      return err("UNEXPECTED_TOKEN", `Unexpected token "${t.text}" in expression`, t);
    }
  }
  return parseExpressionFromTokens(tokenized.tokens);
}

export function parseExpressionInput(input: string): ParseExpressionResult {
  return parseExpressionNoRelations(input);
}

export function parseEquationInput(input: string): { ast: EquationNode } | ParseFail {
  const tokenized = tokenize(input);
  if ("error" in tokenized) {
    return tokenized;
  }
  const nonEof = tokenized.tokens.filter((t) => t.kind !== "eof" && t.kind !== "comma");
  const split = splitTopLevel(nonEof);
  if ("error" in split) {
    return split;
  }
  if (split.op.kind !== "equal") {
    return err("INVALID_EQUATION", 'Equation must use "=" as top-level operator', split.op);
  }

  const [leftTokens, rightTokens] = split.parts;
  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return err("INVALID_EQUATION", "Both sides of equation are required", split.op);
  }

  const leftParsed = parseExpressionFromTokens(finalizeExpressionTokens(leftTokens));
  if ("error" in leftParsed) {
    return leftParsed;
  }
  const rightParsed = parseExpressionFromTokens(finalizeExpressionTokens(rightTokens));
  if ("error" in rightParsed) {
    return rightParsed;
  }

  return {
    ast: {
      type: "equation",
      left: leftParsed.ast,
      right: rightParsed.ast,
    },
  };
}

export function parseInequalityInput(input: string): { ast: InequalityNode } | ParseFail {
  const tokenized = tokenize(input);
  if ("error" in tokenized) {
    return tokenized;
  }
  const nonEof = tokenized.tokens.filter((t) => t.kind !== "eof" && t.kind !== "comma");
  const split = splitTopLevel(nonEof);
  if ("error" in split) {
    return split;
  }
  if (split.op.kind !== "relop") {
    return err(
      "INVALID_INEQUALITY",
      "Inequality must contain exactly one top-level operator: <, >, <=, >=",
      split.op,
    );
  }

  const opText = split.op.text;
  if (opText !== "<" && opText !== ">" && opText !== "<=" && opText !== ">=") {
    return err("INVALID_INEQUALITY", "Unsupported inequality operator", split.op);
  }

  const [leftTokens, rightTokens] = split.parts;
  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return err("INVALID_INEQUALITY", "Both sides of inequality are required", split.op);
  }

  const leftParsed = parseExpressionFromTokens(finalizeExpressionTokens(leftTokens));
  if ("error" in leftParsed) {
    return leftParsed;
  }
  const rightParsed = parseExpressionFromTokens(finalizeExpressionTokens(rightTokens));
  if ("error" in rightParsed) {
    return rightParsed;
  }

  return {
    ast: {
      type: "inequality",
      op: opText as InequalityOp,
      left: leftParsed.ast,
      right: rightParsed.ast,
    },
  };
}
