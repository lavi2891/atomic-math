import { clamp01 } from "../../../shared/math.ts";

import type { Rational } from "./rational.ts";
import type { ExprAnalysis, ExprAst, ExprSpec, SampledValues } from "./types.ts";

function walkAst(ast: ExprAst, vars: Set<string>, ops: Set<"+" | "-" | "*" | "/" | "^">): void {
  if (ast.kind === "var") {
    vars.add(ast.name);
    return;
  }
  if (ast.kind === "number" || ast.kind === "rational") return;
  if (ast.kind === "abs") {
    walkAst(ast.expr, vars, ops);
    return;
  }
  if (ast.kind === "unaryMinus") {
    walkAst(ast.expr, vars, ops);
    return;
  }
  ops.add(ast.op);
  walkAst(ast.left, vars, ops);
  walkAst(ast.right, vars, ops);
}

export function analyze(
  exprSpec: ExprSpec,
  ast: ExprAst,
  values: SampledValues,
  latexRendered: string,
  result: Rational,
): ExprAnalysis {
  const vars = new Set<string>();
  const ops = new Set<"+" | "-" | "*" | "/" | "^">();
  walkAst(ast, vars, ops);

  const hasDecimal = Object.values(exprSpec.vars).some((v) => (v.type ?? "natural") === "decimal1");
  const hasFraction =
    Object.values(exprSpec.vars).some((v) => (v.type ?? "natural") === "simpleFraction") ||
    latexRendered.includes("\\frac");
  const hasExponent = ops.has("^");
  const sampledValues = Object.values(values);
  const hasNegative = sampledValues.some((value) => value.rational.num < 0n);
  const hasZero = sampledValues.some((value) => value.rational.num === 0n);
  let maxAbsValue = 0;
  let maxDenominator = 1;

  for (const value of sampledValues) {
    const denominator = Number(value.rational.den);
    const absVal = Math.abs(Number(value.rational.num)) / denominator;
    if (absVal > maxAbsValue) maxAbsValue = absVal;
    if (denominator > maxDenominator) maxDenominator = denominator;
  }

  const resultAbs = Math.abs(Number(result.num)) / Number(result.den);
  const cancelScore =
    maxAbsValue <= 0 ? 0 : clamp01((maxAbsValue - resultAbs) / maxAbsValue);

  function countTerms(node: ExprAst): number {
    if (node.kind === "binary" && (node.op === "+" || node.op === "-")) {
      return countTerms(node.left) + countTerms(node.right);
    }
    return 1;
  }

  function findMaxExponent(node: ExprAst): number {
    if (node.kind === "binary") {
      const leftMax = findMaxExponent(node.left);
      const rightMax = findMaxExponent(node.right);
      let currentMax = Math.max(leftMax, rightMax);
      if (node.op === "^") {
        if (node.right.kind === "number") {
          currentMax = Math.max(currentMax, Math.trunc(node.right.value));
        } else if (
          node.right.kind === "rational" &&
          node.right.value.den === 1n
        ) {
          currentMax = Math.max(currentMax, Number(node.right.value.num));
        }
      }
      return currentMax;
    }
    if (node.kind === "abs") {
      return findMaxExponent(node.expr);
    }
    if (node.kind === "unaryMinus") {
      return findMaxExponent(node.expr);
    }
    return 0;
  }

  const termCount = countTerms(ast);
  const maxExponent = findMaxExponent(ast);
  const hasParenNegation =
    latexRendered.includes("-(") ||
    latexRendered.includes("-\\left(") ||
    exprSpec.latex.includes("-(") ||
    exprSpec.latex.includes("-\\left(") ||
    /-[({]|-\\left\(/.test(exprSpec.latex);

  const operationOrder = ["+", "-", "*", "/", "^"] as const;
  const orderedOps: Array<"+" | "-" | "*" | "/" | "^"> = operationOrder.filter((op) => ops.has(op));

  const topicTag = `topic:${exprSpec.topicId.toLowerCase()}`;
  const tags: string[] = [topicTag, `vars:${vars.size}`, ...orderedOps.map((op) => `op:${op}`)];

  if (hasDecimal) tags.push("has:decimal1");
  if (hasFraction) tags.push("has:fraction");
  if (hasNegative) tags.push("has:negative");
  if (hasZero) tags.push("has:zero");

  return {
    varCount: vars.size,
    uniqueOps: orderedOps,
    termCount,
    maxAbsValue,
    maxDenominator,
    resultAbs,
    cancelScore,
    hasParenNegation,
    maxExponent,
    hasDecimal,
    hasFraction,
    hasExponent,
    hasNegative,
    hasZero,
    tags,
  };
}
