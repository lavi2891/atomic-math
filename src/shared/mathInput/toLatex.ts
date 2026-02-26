import type { BinaryOp, EquationNode, ExprNode, InequalityNode } from "./types";

const PRECEDENCE: Record<ExprNode["type"], number> = {
  number: 100,
  identifier: 100,
  sqrt: 90,
  unary: 80,
  binary: 0,
};

const BINARY_PRECEDENCE: Record<BinaryOp, number> = {
  "+": 10,
  "-": 10,
  "*": 20,
  "/": 20,
  "^": 40,
};

function exprPrecedence(ast: ExprNode): number {
  if (ast.type !== "binary") {
    return PRECEDENCE[ast.type];
  }
  return BINARY_PRECEDENCE[ast.op];
}

function wrapIfNeeded(content: string, need: boolean): string {
  return need ? `\\left(${content}\\right)` : content;
}

function toLatexInner(ast: ExprNode, parent: ExprNode | null): string {
  switch (ast.type) {
    case "number":
      return ast.raw;
    case "identifier":
      return ast.name;
    case "sqrt":
      return `\\sqrt{${toLatexInner(ast.arg, ast)}}`;
    case "unary": {
      const child = toLatexInner(ast.arg, ast);
      const childNeedsParen = ast.arg.type === "binary";
      return `${ast.op}${wrapIfNeeded(child, childNeedsParen)}`;
    }
    case "binary": {
      if (ast.op === "/") {
        const left = toLatexInner(ast.left, ast);
        const right = toLatexInner(ast.right, ast);
        return `\\frac{${left}}{${right}}`;
      }

      if (ast.op === "^") {
        const baseRaw = toLatexInner(ast.left, ast);
        const expRaw = toLatexInner(ast.right, ast);
        const baseNeedsParen =
          ast.left.type === "binary" &&
          (ast.left.op === "+" || ast.left.op === "-" || ast.left.op === "*" || ast.left.op === "/");
        const expNeedsParen = ast.right.type === "binary" && ast.right.op !== "^";
        const base = wrapIfNeeded(baseRaw, baseNeedsParen);
        const exp = wrapIfNeeded(expRaw, expNeedsParen);
        return `{${base}}^{${exp}}`;
      }

      const leftRaw = toLatexInner(ast.left, ast);
      const rightRaw = toLatexInner(ast.right, ast);
      const myPrec = exprPrecedence(ast);

      const leftNeedsParen =
        ast.left.type === "binary" && exprPrecedence(ast.left) < myPrec;
      const rightNeedsParen =
        ast.right.type === "binary" &&
        (exprPrecedence(ast.right) < myPrec ||
          (ast.op === "-" && exprPrecedence(ast.right) === myPrec));

      const left = wrapIfNeeded(leftRaw, leftNeedsParen);
      const right = wrapIfNeeded(rightRaw, rightNeedsParen);

      const opLatex = ast.op === "*" ? "\\cdot" : ast.op;
      const rendered = `${left} ${opLatex} ${right}`;

      if (!parent) {
        return rendered;
      }
      if (parent.type !== "binary") {
        return rendered;
      }

      const parentPrec = exprPrecedence(parent);
      const needParen = myPrec < parentPrec;
      return wrapIfNeeded(rendered, needParen);
    }
  }
}

export function toLatexExpression(ast: ExprNode): string {
  return toLatexInner(ast, null);
}

export function toLatexEquation(ast: EquationNode): string {
  return `${toLatexExpression(ast.left)} = ${toLatexExpression(ast.right)}`;
}

export function toLatexInequality(ast: InequalityNode): string {
  return `${toLatexExpression(ast.left)} ${ast.op} ${toLatexExpression(ast.right)}`;
}
