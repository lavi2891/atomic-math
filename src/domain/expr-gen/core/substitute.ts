import { toAnswerString } from "./rational.ts";
import type { ExprAst, SampledValue, SampledValues } from "./types.ts";

interface RenderedNode {
  latex: string;
  prec: number;
}

const PREC_ATOM = 4;
const PREC_POWER = 3;
const PREC_UNARY = 3;
const PREC_MUL_DIV = 2;
const PREC_ADD_SUB = 1;

function isWrappedOnce(text: string): boolean {
  if (!(text.startsWith("(") && text.endsWith(")"))) return false;
  let depth = 0;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i]!;
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (depth === 0 && i < text.length - 1) return false;
  }
  return depth === 0;
}

function isWrappedLeftRight(text: string): boolean {
  return text.startsWith("\\left(") && text.endsWith("\\right)");
}

function wrapOnce(text: string): string {
  return isWrappedOnce(text) ? text : `(${text})`;
}

function wrapLeftRightOnce(text: string): string {
  if (isWrappedLeftRight(text)) return text;
  return `\\left(${text}\\right)`;
}

function wrapIfNeeded(child: RenderedNode, parentPrec: number): string {
  return child.prec < parentPrec ? wrapOnce(child.latex) : child.latex;
}

function toPlainNumberString(raw: string): string {
  if (!raw.includes(".")) return raw;
  return raw.replace(/\.?0+$/, "");
}

function renderSampledValueLatex(value: SampledValue): RenderedNode {
  if (value.displayFraction) {
    const absNum = value.displayFraction.num < 0n ? -value.displayFraction.num : value.displayFraction.num;
    const frac = `\\frac{${absNum.toString()}}{${value.displayFraction.den.toString()}}`;
    return {
      latex: value.displayFraction.num < 0n ? `-${frac}` : frac,
      prec: PREC_ATOM,
    };
  }

  if (value.renderAsDecimal) {
    const numeric = Number(value.rational.num) / Number(value.rational.den);
    return {
      latex: numeric.toFixed(10).replace(/\.?0+$/, ""),
      prec: PREC_ATOM,
    };
  }

  return {
    latex: toAnswerString(value.rational),
    prec: PREC_ATOM,
  };
}

function renderNode(node: ExprAst, values: SampledValues): RenderedNode {
  if (node.kind === "number") {
    return { latex: toPlainNumberString(node.raw), prec: PREC_ATOM };
  }
  if (node.kind === "rational") {
    return { latex: toAnswerString(node.value), prec: PREC_ATOM };
  }
  if (node.kind === "var") {
    const value = values[node.name];
    if (!value) throw new Error(`Missing value for variable "${node.name}"`);
    return renderSampledValueLatex(value);
  }
  if (node.kind === "unaryMinus") {
    if (node.expr.kind === "unaryMinus") {
      return renderNode(node.expr.expr, values);
    }
    const child = renderNode(node.expr, values);
    if (child.prec === PREC_ATOM) {
      return { latex: `-${child.latex}`, prec: PREC_UNARY };
    }
    return { latex: `-${wrapLeftRightOnce(child.latex)}`, prec: PREC_UNARY };
  }

  const left = renderNode(node.left, values);
  const right = renderNode(node.right, values);

  if (node.op === "^") {
    let leftLatex: string;
    const baseLooksLikeFraction = left.latex.includes("\\frac");
    if ((node.left.kind === "binary" && node.left.op === "/") || baseLooksLikeFraction) {
      leftLatex = wrapLeftRightOnce(left.latex);
    } else {
      leftLatex = wrapIfNeeded(left, PREC_POWER);
    }
    return {
      latex: `${leftLatex}^{${wrapIfNeeded(right, PREC_POWER)}}`,
      prec: PREC_POWER,
    };
  }

  if (node.op === "/") {
    return {
      latex: `\\frac{${left.latex}}{${right.latex}}`,
      prec: PREC_MUL_DIV,
    };
  }

  if (node.op === "*") {
    return {
      latex: `${wrapIfNeeded(left, PREC_MUL_DIV)}\\times${wrapIfNeeded(right, PREC_MUL_DIV)}`,
      prec: PREC_MUL_DIV,
    };
  }

  if (node.op === "+" || node.op === "-") {
    const baseLatex = `${wrapIfNeeded(left, PREC_ADD_SUB)}${node.op}${wrapIfNeeded(right, PREC_ADD_SUB)}`;
    if ((node.op === "+" || node.op === "-") && right.latex.startsWith("-")) {
      const leftLatex = wrapIfNeeded(left, PREC_ADD_SUB);
      return {
        latex: `${leftLatex}${node.op}${wrapOnce(right.latex)}`,
        prec: PREC_ADD_SUB,
      };
    }
    return { latex: baseLatex, prec: PREC_ADD_SUB };
  }

  return { latex: "", prec: PREC_ADD_SUB };
}

function substituteNumeric(ast: ExprAst, values: SampledValues): ExprAst {
  if (ast.kind === "number" || ast.kind === "rational") return ast;
  if (ast.kind === "var") {
    const value = values[ast.name];
    if (!value) {
      throw new Error(`Missing value for variable "${ast.name}"`);
    }
    return {
      kind: "rational",
      value: value.rational,
    };
  }
  if (ast.kind === "unaryMinus") {
    return {
      kind: "unaryMinus",
      expr: substituteNumeric(ast.expr, values),
    };
  }
  return {
    kind: "binary",
    op: ast.op,
    left: substituteNumeric(ast.left, values),
    right: substituteNumeric(ast.right, values),
  };
}

export function substitute(
  ast: ExprAst,
  values: SampledValues,
): { numericAst: ExprAst; latexRendered: string } {
  return {
    numericAst: substituteNumeric(ast, values),
    latexRendered: renderNode(ast, values).latex,
  };
}
