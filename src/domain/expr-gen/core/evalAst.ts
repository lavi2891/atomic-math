import {
  add,
  div,
  fromString,
  isInteger,
  mul,
  negate,
  pow,
  sub,
  toNumber,
  type Rational,
} from "./rational.ts";
import type { ExprAst } from "./types.ts";

export const DEFAULT_MAX_ABS_RESULT = 1_000_000;
const MAX_EXPONENT = 3;

export class ExprEvalError extends Error {
  readonly code:
    | "DIVISION_BY_ZERO"
    | "INVALID_EXPONENT"
    | "NON_FINITE"
    | "RESULT_ABS_TOO_LARGE";

  constructor(
    code: "DIVISION_BY_ZERO" | "INVALID_EXPONENT" | "NON_FINITE" | "RESULT_ABS_TOO_LARGE",
    message: string,
  ) {
    super(message);
    this.code = code;
  }
}

interface EvalOptions {
  maxAbsResult?: number;
}

function guardFinite(value: Rational): void {
  const numeric = toNumber(value);
  if (!Number.isFinite(numeric)) {
    throw new ExprEvalError("NON_FINITE", "Encountered non-finite result");
  }
}

function evalNode(ast: ExprAst): Rational {
  if (ast.kind === "number") {
    return fromString(ast.raw);
  }
  if (ast.kind === "rational") {
    return ast.value;
  }
  if (ast.kind === "var") {
    throw new Error("evalAst received unresolved variable node");
  }
  if (ast.kind === "unaryMinus") {
    return negate(evalNode(ast.expr));
  }

  const left = evalNode(ast.left);
  const right = evalNode(ast.right);

  let value: Rational;
  switch (ast.op) {
    case "+":
      value = add(left, right);
      break;
    case "-":
      value = sub(left, right);
      break;
    case "*":
      value = mul(left, right);
      break;
    case "/":
      if (right.num === 0n) {
        throw new ExprEvalError("DIVISION_BY_ZERO", "Division by zero");
      }
      value = div(left, right);
      break;
    case "^": {
      if (!isInteger(right) || right.num < 0n) {
        throw new ExprEvalError("INVALID_EXPONENT", "Exponent must be a natural integer");
      }
      const exponent = Number(right.num);
      if (!Number.isInteger(exponent) || exponent > MAX_EXPONENT) {
        throw new ExprEvalError("INVALID_EXPONENT", `Exponent must be <= ${MAX_EXPONENT}`);
      }
      value = pow(left, exponent);
      break;
    }
    default:
      throw new Error("Unsupported operation");
  }

  guardFinite(value);
  return value;
}

export function evalAst(ast: ExprAst, options: EvalOptions = {}): Rational {
  const maxAbsResult = options.maxAbsResult ?? DEFAULT_MAX_ABS_RESULT;
  const result = evalNode(ast);
  if (Math.abs(toNumber(result)) > maxAbsResult) {
    throw new ExprEvalError(
      "RESULT_ABS_TOO_LARGE",
      `Result exceeds max abs threshold (${maxAbsResult})`,
    );
  }
  return result;
}
