export type MathInputKind =
  | "NATURAL"
  | "INTEGER"
  | "NUMERIC"
  // Legacy alias kept for backward compatibility; prefer "NUMERIC".
  | "RATIONAL"
  | "EXPRESSION"
  | "EQUATION"
  | "INEQUALITY";

export type ParseErrCode =
  | "EMPTY_INPUT"
  | "INVALID_CHAR"
  | "INVALID_TOKEN"
  | "UNEXPECTED_TOKEN"
  | "UNEXPECTED_END"
  | "MISMATCHED_PAREN"
  | "MISSING_OPERATOR"
  | "INVALID_NUMBER"
  | "DIVIDE_BY_ZERO"
  | "INVALID_NATURAL"
  | "INVALID_INTEGER"
  | "IDENTIFIERS_NOT_ALLOWED"
  | "INVALID_RATIONAL"
  | "INVALID_EQUATION"
  | "INVALID_INEQUALITY";

export interface ParseErr {
  code: ParseErrCode;
  message: string;
  index?: number;
}

export type BinaryOp = "+" | "-" | "*" | "/" | "^";
export type UnaryOp = "+" | "-";
export type InequalityOp = "<" | ">" | "<=" | ">=";

export interface NumberNode {
  type: "number";
  raw: string;
  value: number;
}

export interface IdentifierNode {
  type: "identifier";
  name: string;
}

export interface UnaryNode {
  type: "unary";
  op: UnaryOp;
  arg: ExprNode;
}

export interface BinaryNode {
  type: "binary";
  op: BinaryOp;
  left: ExprNode;
  right: ExprNode;
}

export interface SqrtNode {
  type: "sqrt";
  arg: ExprNode;
}

export type ExprNode =
  | NumberNode
  | IdentifierNode
  | UnaryNode
  | BinaryNode
  | SqrtNode;

export interface EquationNode {
  type: "equation";
  left: ExprNode;
  right: ExprNode;
}

export interface InequalityNode {
  type: "inequality";
  op: InequalityOp;
  left: ExprNode;
  right: ExprNode;
}

export interface ParseOkNatural {
  ok: true;
  kind: "NATURAL";
  normalized: string;
  ast: ExprNode;
  latexPreview: string;
  value: number;
}

export interface ParseOkInteger {
  ok: true;
  kind: "INTEGER";
  normalized: string;
  ast: ExprNode;
  latexPreview: string;
  value: number;
}

export interface ParseOkRational {
  ok: true;
  kind: "RATIONAL";
  normalized: string;
  ast: ExprNode;
  latexPreview: string;
  value: number;
}

export interface ParseOkNumeric {
  ok: true;
  kind: "NUMERIC";
  normalized: string;
  ast: ExprNode;
  latexPreview: string;
  value: number;
}

export interface ParseOkExpression {
  ok: true;
  kind: "EXPRESSION";
  normalized: string;
  ast: ExprNode;
  latexPreview: string;
  value?: number;
}

export interface ParseOkEquation {
  ok: true;
  kind: "EQUATION";
  normalized: string;
  ast: EquationNode;
  latexPreview: string;
}

export interface ParseOkInequality {
  ok: true;
  kind: "INEQUALITY";
  normalized: string;
  ast: InequalityNode;
  latexPreview: string;
}

export type ParseMathInputOk =
  | ParseOkNatural
  | ParseOkInteger
  | ParseOkNumeric
  | ParseOkRational
  | ParseOkExpression
  | ParseOkEquation
  | ParseOkInequality;

export interface ParseMathInputFail {
  ok: false;
  kind: MathInputKind;
  normalized: string;
  error: ParseErr;
}

export type ParseMathInputResult = ParseMathInputOk | ParseMathInputFail;

export type TokenKind =
  | "number"
  | "identifier"
  | "op"
  | "lparen"
  | "rparen"
  | "relop"
  | "equal"
  | "comma"
  | "eof";

export interface Token {
  kind: TokenKind;
  text: string;
  index: number;
}
