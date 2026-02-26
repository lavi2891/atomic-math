import type { ExprNode, ParseErr } from "./types";

export function containsIdentifier(ast: ExprNode): boolean {
  switch (ast.type) {
    case "identifier":
      return true;
    case "number":
      return false;
    case "unary":
      return containsIdentifier(ast.arg);
    case "sqrt":
      return containsIdentifier(ast.arg);
    case "binary":
      return containsIdentifier(ast.left) || containsIdentifier(ast.right);
  }
}

interface EvalOk {
  value: number;
}

interface EvalFail {
  error: ParseErr;
}

export type EvaluateResult = EvalOk | EvalFail;

function err(code: ParseErr["code"], message: string): EvalFail {
  return { error: { code, message } };
}

export function evaluateNumericExpression(ast: ExprNode): EvaluateResult {
  switch (ast.type) {
    case "number":
      return { value: ast.value };
    case "identifier":
      return err("INVALID_TOKEN", `Cannot evaluate identifier "${ast.name}" numerically`);
    case "unary": {
      const inner = evaluateNumericExpression(ast.arg);
      if ("error" in inner) {
        return inner;
      }
      return { value: ast.op === "-" ? -inner.value : inner.value };
    }
    case "sqrt": {
      const arg = evaluateNumericExpression(ast.arg);
      if ("error" in arg) {
        return arg;
      }
      if (arg.value < 0) {
        return err("INVALID_NUMBER", "sqrt argument must be non-negative");
      }
      return { value: Math.sqrt(arg.value) };
    }
    case "binary": {
      const left = evaluateNumericExpression(ast.left);
      if ("error" in left) {
        return left;
      }
      const right = evaluateNumericExpression(ast.right);
      if ("error" in right) {
        return right;
      }

      switch (ast.op) {
        case "+":
          return { value: left.value + right.value };
        case "-":
          return { value: left.value - right.value };
        case "*":
          return { value: left.value * right.value };
        case "/":
          if (right.value === 0) {
            return err("DIVIDE_BY_ZERO", "Division by zero");
          }
          return { value: left.value / right.value };
        case "^":
          return { value: left.value ** right.value };
      }
    }
  }
}
