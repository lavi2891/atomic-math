import { validateAllowedChars } from "./allowedChars";
import { containsIdentifier, evaluateNumericExpression } from "./evaluate";
import { normalizeMathInput } from "./normalize";
import {
  parseEquationInput,
  parseExpressionInput,
  parseInequalityInput,
} from "./parse";
import {
  toLatexEquation,
  toLatexExpression,
  toLatexInequality,
} from "./toLatex";
import type {
  ExprNode,
  MathInputKind,
  ParseErr,
  ParseMathInputResult,
} from "./types";

function fail(
  kind: MathInputKind,
  normalized: string,
  error: ParseErr,
): ParseMathInputResult {
  return { ok: false, kind, normalized, error };
}

function asSignedNumber(node: ExprNode): number | null {
  if (node.type === "number") {
    return node.value;
  }
  if (
    node.type === "unary" &&
    (node.op === "+" || node.op === "-") &&
    node.arg.type === "number"
  ) {
    return node.op === "-" ? -node.arg.value : node.arg.value;
  }
  return null;
}

function asSignedInteger(node: ExprNode): number | null {
  const value = asSignedNumber(node);
  if (value === null || !Number.isInteger(value)) {
    return null;
  }
  return value;
}

function analyzeNatural(normalized: string): ParseMathInputResult {
  const parsed = parseExpressionInput(normalized);
  if ("error" in parsed) {
    return fail("NATURAL", normalized, parsed.error);
  }
  if (parsed.ast.type !== "number") {
    return fail("NATURAL", normalized, {
      code: "INVALID_NATURAL",
      message: "Natural input must be an unsigned integer literal",
    });
  }
  if (!Number.isInteger(parsed.ast.value) || parsed.ast.value < 0) {
    return fail("NATURAL", normalized, {
      code: "INVALID_NATURAL",
      message: "Natural input must be an integer >= 0",
    });
  }

  return {
    ok: true,
    kind: "NATURAL",
    normalized,
    ast: parsed.ast,
    latexPreview: toLatexExpression(parsed.ast),
    value: parsed.ast.value,
  };
}

function analyzeInteger(normalized: string): ParseMathInputResult {
  const parsed = parseExpressionInput(normalized);
  if ("error" in parsed) {
    return fail("INTEGER", normalized, parsed.error);
  }
  const value = asSignedNumber(parsed.ast);
  if (value === null || !Number.isInteger(value)) {
    return fail("INTEGER", normalized, {
      code: "INVALID_INTEGER",
      message: "Integer input must be a single signed integer literal",
    });
  }

  return {
    ok: true,
    kind: "INTEGER",
    normalized,
    ast: parsed.ast,
    latexPreview: toLatexExpression(parsed.ast),
    value,
  };
}

function analyzeRational(normalized: string): ParseMathInputResult {
  if (normalized.includes("(") || normalized.includes(")")) {
    return fail("RATIONAL", normalized, {
      code: "INVALID_RATIONAL",
      message: "Rational input cannot contain parentheses",
    });
  }

  const parsed = parseExpressionInput(normalized);
  if ("error" in parsed) {
    return fail("RATIONAL", normalized, parsed.error);
  }
  if (containsIdentifier(parsed.ast)) {
    return fail("RATIONAL", normalized, {
      code: "IDENTIFIERS_NOT_ALLOWED",
      message: "Rational input cannot contain identifiers",
    });
  }

  const { ast } = parsed;
  let value: number | null = null;

  if (ast.type === "binary" && ast.op === "/") {
    const numerator = asSignedInteger(ast.left);
    if (numerator === null) {
      return fail("RATIONAL", normalized, {
        code: "INVALID_RATIONAL",
        message: "Fraction numerator must be an integer",
      });
    }
    if (ast.right.type !== "number" || !Number.isInteger(ast.right.value)) {
      return fail("RATIONAL", normalized, {
        code: "INVALID_RATIONAL",
        message: "Fraction denominator must be a positive integer",
      });
    }
    if (ast.right.value === 0) {
      return fail("RATIONAL", normalized, {
        code: "DIVIDE_BY_ZERO",
        message: "Cannot divide by zero",
      });
    }
    if (ast.right.value < 0) {
      return fail("RATIONAL", normalized, {
        code: "INVALID_RATIONAL",
        message: "Fraction denominator must be positive",
      });
    }
    value = numerator / ast.right.value;
  } else {
    value = asSignedNumber(ast);
    if (value === null) {
      return fail("RATIONAL", normalized, {
        code: "INVALID_RATIONAL",
        message: "Rational input must be a scalar number or simple fraction",
      });
    }
  }

  return {
    ok: true,
    kind: "RATIONAL",
    normalized,
    ast,
    latexPreview: toLatexExpression(ast),
    value,
  };
}

function analyzeNumeric(
  normalized: string,
  resultKind: "NUMERIC" | "RATIONAL" = "NUMERIC",
): ParseMathInputResult {
  const parsed = parseExpressionInput(normalized);
  if ("error" in parsed) {
    return fail(resultKind, normalized, parsed.error);
  }
  if (containsIdentifier(parsed.ast)) {
    return fail(resultKind, normalized, {
      code: "IDENTIFIERS_NOT_ALLOWED",
      message: "Numeric input cannot contain identifiers",
    });
  }

  const evaluated = evaluateNumericExpression(parsed.ast);
  if ("error" in evaluated) {
    return fail(resultKind, normalized, evaluated.error);
  }
  if (!Number.isFinite(evaluated.value)) {
    return fail(resultKind, normalized, {
      code: "INVALID_NUMBER",
      message: "Numeric result must be finite",
    });
  }

  return {
    ok: true,
    kind: resultKind,
    normalized,
    ast: parsed.ast,
    latexPreview: toLatexExpression(parsed.ast),
    value: evaluated.value,
  };
}

function analyzeExpression(normalized: string): ParseMathInputResult {
  const parsed = parseExpressionInput(normalized);
  if ("error" in parsed) {
    return fail("EXPRESSION", normalized, parsed.error);
  }

  const base = {
    ok: true as const,
    kind: "EXPRESSION" as const,
    normalized,
    ast: parsed.ast,
    latexPreview: toLatexExpression(parsed.ast),
  };
  if (containsIdentifier(parsed.ast)) {
    return base;
  }

  const evaluated = evaluateNumericExpression(parsed.ast);
  if ("error" in evaluated) {
    return fail("EXPRESSION", normalized, evaluated.error);
  }
  return { ...base, value: evaluated.value };
}

function analyzeEquation(normalized: string): ParseMathInputResult {
  const parsed = parseEquationInput(normalized);
  if ("error" in parsed) {
    return fail("EQUATION", normalized, parsed.error);
  }
  return {
    ok: true,
    kind: "EQUATION",
    normalized,
    ast: parsed.ast,
    latexPreview: toLatexEquation(parsed.ast),
  };
}

function analyzeInequality(normalized: string): ParseMathInputResult {
  const parsed = parseInequalityInput(normalized);
  if ("error" in parsed) {
    return fail("INEQUALITY", normalized, parsed.error);
  }
  return {
    ok: true,
    kind: "INEQUALITY",
    normalized,
    ast: parsed.ast,
    latexPreview: toLatexInequality(parsed.ast),
  };
}

export function analyzeMathInput(
  kind: MathInputKind,
  rawInput: string,
): ParseMathInputResult {
  const normalized = normalizeMathInput(rawInput);

  const rawValidation = validateAllowedChars(normalized);
  if (rawValidation) {
    return fail(kind, normalized, rawValidation);
  }

  if (normalized.length === 0) {
    return fail(kind, normalized, {
      code: "EMPTY_INPUT",
      message: "Input is empty",
    });
  }

  switch (kind) {
    case "NATURAL":
      return analyzeNatural(normalized);
    case "INTEGER":
      return analyzeInteger(normalized);
    case "NUMERIC":
      return analyzeNumeric(normalized, "NUMERIC");
    case "RATIONAL":
      return analyzeRational(normalized);
    case "EXPRESSION":
      return analyzeExpression(normalized);
    case "EQUATION":
      return analyzeEquation(normalized);
    case "INEQUALITY":
      return analyzeInequality(normalized);
  }
}

export interface MathInputExample {
  kind: MathInputKind;
  input: string;
  expectedOk: boolean;
  note?: string;
}

// Dev self-test table (can be looped in a local playground or unit test harness).
export const MATH_INPUT_EXAMPLES: readonly MathInputExample[] = [
  { kind: "NATURAL", input: "0", expectedOk: true },
  { kind: "NATURAL", input: "12", expectedOk: true },
  { kind: "INTEGER", input: "-6", expectedOk: true },
  { kind: "INTEGER", input: "+7", expectedOk: true },
  { kind: "NUMERIC", input: "2+sqrt(2)", expectedOk: true },
  { kind: "NUMERIC", input: "(1+2)/3", expectedOk: true },
  { kind: "NUMERIC", input: "2^3^2", expectedOk: true },
  {
    kind: "NUMERIC",
    input: "2x+1",
    expectedOk: false,
    note: "identifiers are not allowed in NUMERIC",
  },
  { kind: "RATIONAL", input: "-3/4", expectedOk: true },
  { kind: "RATIONAL", input: "1.5", expectedOk: true },
  { kind: "RATIONAL", input: "1,5", expectedOk: true },
  { kind: "RATIONAL", input: "(1+2)/3", expectedOk: false },
  { kind: "RATIONAL", input: "2+sqrt(2)", expectedOk: false },
  { kind: "EXPRESSION", input: "2*(x+1)", expectedOk: true },
  { kind: "EXPRESSION", input: "2x+1", expectedOk: true },
  { kind: "EXPRESSION", input: "sqrt(9)", expectedOk: true },
  { kind: "EXPRESSION", input: "(2+1)/3", expectedOk: true },
  { kind: "EXPRESSION", input: "2^3^2", expectedOk: true },
  {
    kind: "EQUATION",
    input: "2x+1=5",
    expectedOk: true,
    note: "implicit multiplication supported",
  },
  { kind: "INEQUALITY", input: "x>=3", expectedOk: true },
  { kind: "INEQUALITY", input: "2*x+1<5", expectedOk: true },
  { kind: "EXPRESSION", input: "", expectedOk: false },
  { kind: "NUMERIC", input: "3//4", expectedOk: false },
  { kind: "EXPRESSION", input: "sqrt9", expectedOk: false },
  { kind: "EQUATION", input: "x=", expectedOk: false },
  { kind: "NUMERIC", input: "1/0", expectedOk: false },
  { kind: "EXPRESSION", input: ")( ", expectedOk: false },
] as const;
