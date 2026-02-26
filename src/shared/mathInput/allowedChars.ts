import type { ParseErr } from "./types";

function isAsciiLetter(ch: string): boolean {
  return (
    (ch >= "a" && ch <= "z") ||
    (ch >= "A" && ch <= "Z")
  );
}

function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

export function validateAllowedChars(input: string): ParseErr | null {
  for (let i = 0; i < input.length; i += 1) {
    const ch = input.charAt(i);
    if (
      isAsciiLetter(ch) ||
      isDigit(ch) ||
      ch === " " ||
      ch === "\t" ||
      ch === "\n" ||
      ch === "\r" ||
      ch === "+" ||
      ch === "-" ||
      ch === "*" ||
      ch === "/" ||
      ch === "\\" ||
      ch === "^" ||
      ch === "(" ||
      ch === ")" ||
      ch === "," ||
      ch === "." ||
      ch === "=" ||
      ch === "<" ||
      ch === ">" ||
      ch === "×" ||
      ch === "·"
    ) {
      continue;
    }

    return {
      code: "INVALID_CHAR",
      message: `Invalid character "${ch}"`,
      index: i,
    };
  }

  return null;
}
