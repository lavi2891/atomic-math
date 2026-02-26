import type { ParseErr, Token } from "./types";

function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function isAsciiLetter(ch: string): boolean {
  return (
    (ch >= "a" && ch <= "z") ||
    (ch >= "A" && ch <= "Z")
  );
}

function canEndImplicitMul(token: Token): boolean {
  return (
    token.kind === "number" ||
    token.kind === "identifier" ||
    token.kind === "rparen"
  );
}

function canStartImplicitMul(token: Token): boolean {
  return (
    token.kind === "number" ||
    token.kind === "identifier" ||
    token.kind === "lparen"
  );
}

function injectImplicitMultiplication(tokens: Token[]): Token[] {
  const result: Token[] = [];

  for (let i = 0; i < tokens.length; i += 1) {
    const current = tokens[i];
    if (!current) {
      continue;
    }
    result.push(current);

    if (current.kind === "eof") {
      continue;
    }

    const next = tokens[i + 1];
    if (!next || next.kind === "eof") {
      continue;
    }

    if (!canEndImplicitMul(current) || !canStartImplicitMul(next)) {
      continue;
    }

    if (current.kind === "identifier" && current.text === "sqrt" && next.kind === "lparen") {
      continue;
    }

    result.push({
      kind: "op",
      text: "*",
      index: next.index,
    });
  }

  return result;
}

export function tokenize(input: string): { tokens: Token[] } | { error: ParseErr } {
  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input.charAt(i);

    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      i += 1;
      continue;
    }

    if (isDigit(ch) || ch === ".") {
      const start = i;
      let dotCount = ch === "." ? 1 : 0;
      i += 1;

      while (i < input.length) {
        const c = input.charAt(i);
        if (isDigit(c)) {
          i += 1;
          continue;
        }
        if (c === ".") {
          dotCount += 1;
          if (dotCount > 1) {
            return {
              error: {
                code: "INVALID_NUMBER",
                message: "Invalid decimal number",
                index: i,
              },
            };
          }
          i += 1;
          continue;
        }
        break;
      }

      const text = input.slice(start, i);
      if (text === ".") {
        return {
          error: {
            code: "INVALID_NUMBER",
            message: "Standalone decimal point is not a valid number",
            index: start,
          },
        };
      }
      if (text.endsWith(".")) {
        return {
          error: {
            code: "INVALID_NUMBER",
            message: "Number cannot end with decimal point",
            index: i - 1,
          },
        };
      }

      tokens.push({ kind: "number", text, index: start });
      continue;
    }

    if (isAsciiLetter(ch)) {
      const start = i;
      i += 1;
      while (i < input.length && isAsciiLetter(input.charAt(i))) {
        i += 1;
      }
      tokens.push({
        kind: "identifier",
        text: input.slice(start, i),
        index: start,
      });
      continue;
    }

    if (ch === "(") {
      tokens.push({ kind: "lparen", text: ch, index: i });
      i += 1;
      continue;
    }
    if (ch === ")") {
      tokens.push({ kind: "rparen", text: ch, index: i });
      i += 1;
      continue;
    }
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/" || ch === "^") {
      tokens.push({ kind: "op", text: ch, index: i });
      i += 1;
      continue;
    }
    if (ch === "=") {
      tokens.push({ kind: "equal", text: ch, index: i });
      i += 1;
      continue;
    }
    if (ch === "<" || ch === ">") {
      const start = i;
      if (i + 1 < input.length && input.charAt(i + 1) === "=") {
        tokens.push({ kind: "relop", text: `${ch}=`, index: start });
        i += 2;
      } else {
        tokens.push({ kind: "relop", text: ch, index: start });
        i += 1;
      }
      continue;
    }
    if (ch === ",") {
      tokens.push({ kind: "comma", text: ch, index: i });
      i += 1;
      continue;
    }

    return {
      error: {
        code: "INVALID_CHAR",
        message: `Invalid character "${ch}"`,
        index: i,
      },
    };
  }

  tokens.push({ kind: "eof", text: "", index: input.length });
  const withImplicit = injectImplicitMultiplication(tokens);
  return { tokens: withImplicit };
}
