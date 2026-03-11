import { analyzeMathInput } from "./analyze";
import type { MathInputKind, ParseMathInputResult } from "./types";

export function parseMathInput(kind: MathInputKind, rawInput: string): ParseMathInputResult {
  return analyzeMathInput(kind, rawInput);
}

export { normalizeMathInput } from "./normalize";
export { exactNumericEquals, parseExactNumericInput } from "./exactNumeric";
export { tokenize } from "./tokenize";
export {
  parseExpressionInput,
  parseEquationInput,
  parseInequalityInput,
} from "./parse";
export { evaluateNumericExpression, containsIdentifier } from "./evaluate";
export {
  toLatexExpression,
  toLatexEquation,
  toLatexInequality,
} from "./toLatex";
export { analyzeMathInput, MATH_INPUT_EXAMPLES } from "./analyze";
export type {
  BinaryOp,
  EquationNode,
  ExprNode,
  InequalityNode,
  InequalityOp,
  MathInputKind,
  ParseErr,
  ParseErrCode,
  ParseMathInputFail,
  ParseMathInputOk,
  ParseMathInputResult,
  ParseOkNumeric,
  ExactNumericParseResult,
  Token,
  TokenKind,
  UnaryOp,
} from "./types";
