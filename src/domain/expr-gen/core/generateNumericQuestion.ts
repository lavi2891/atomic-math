import type { NumericQuestion, OptionContent } from "../../questions/types.ts";

import { analyze } from "./analyze.ts";
import { scoreDifficulty } from "./difficulty.ts";
import { evalAst } from "./evalAst.ts";
import { parseLatex } from "./parseLatex.ts";
import { fromInteger, toAnswerString, toNumber, type Rational } from "./rational.ts";
import { createRandom } from "./rng.ts";
import { sampleVars, sampledValueEquals, sampledValueToNumber } from "./sampleVars.ts";
import { substitute } from "./substitute.ts";
import type { ConstraintSpec, ExprSpec, GenerateExprNumericQuestionInput, SampledValues } from "./types.ts";

const MAX_ATTEMPTS = 30;
const EPSILON = 1e-9;

interface AttemptResult {
  question: NumericQuestion;
  distanceToTarget: number;
}

function rationalEqualsNumber(value: Rational, expected: number): boolean {
  return Math.abs(toNumber(value) - expected) <= EPSILON;
}

function isConstraintSatisfied(
  constraint: ConstraintSpec,
  values: SampledValues,
  result: Rational,
): boolean {
  switch (constraint.kind) {
    case "avoidResult":
      return !rationalEqualsNumber(result, constraint.value);
    case "resultAbsMax":
      return Math.abs(toNumber(result)) <= constraint.value;
    case "varNotEqual": {
      const a = values[constraint.a];
      const b = values[constraint.b];
      if (!a || !b) return false;
      return !sampledValueEquals(a, b);
    }
    case "varAbsMax": {
      const v = values[constraint.var];
      if (!v) return false;
      return Math.abs(sampledValueToNumber(v)) <= constraint.value;
    }
    default:
      return true;
  }
}

function constraintsSatisfied(exprSpec: ExprSpec, values: SampledValues, result: Rational): boolean {
  const constraints = exprSpec.constraints ?? [];
  return constraints.every((constraint) => isConstraintSatisfied(constraint, values, result));
}

function replaceExprPlaceholder(content: OptionContent, exprLatex: string): OptionContent {
  if (content.kind === "text") {
    return { ...content, value: content.value.replaceAll("{expr}", exprLatex) };
  }
  return { ...content, latex: content.latex.replaceAll("{expr}", exprLatex) };
}

function buildPrompt(exprSpec: ExprSpec, exprLatex: string): OptionContent[] {
  if (!exprSpec.promptTemplate) {
    return [
      { kind: "text", value: "\u05d7\u05e9\u05d1\u05d5:" },
      { kind: "math", latex: exprLatex, display: true },
    ];
  }
  return exprSpec.promptTemplate.map((item) => replaceExprPlaceholder(item, exprLatex));
}

function buildHints(exprSpec: ExprSpec, exprLatex: string): OptionContent[][] | undefined {
  if (!exprSpec.hintsTemplate) return undefined;
  return exprSpec.hintsTemplate.map((hint) =>
    hint.map((item) => replaceExprPlaceholder(item, exprLatex)),
  );
}

function dedupeTags(tags: string[]): string[] {
  return [...new Set(tags)];
}

function runAttempt(
  input: GenerateExprNumericQuestionInput,
  parsedAst: ReturnType<typeof parseLatex>,
  attemptNumber: number,
): AttemptResult {
  const rng = createRandom((input.seedNumber + attemptNumber) >>> 0);
  const values = sampleVars(input.exprSpec.vars, rng, input.difficultyTarget);
  const { latexRendered } = substitute(parsedAst, values);
  const result = evalAst(parseLatex(latexRendered));

  if (!constraintsSatisfied(input.exprSpec, values, result)) {
    throw new Error("Constraints not satisfied");
  }

  const analysis = analyze(
    input.exprSpec,
    parsedAst,
    values,
    latexRendered,
    result,
  );
  const difficulty = scoreDifficulty(analysis);
  const resultIsInteger = result.den === 1n;
  const answerString = toAnswerString(result);
  const prompt = buildPrompt(input.exprSpec, latexRendered);
  const hints = buildHints(input.exprSpec, latexRendered);

  const question: NumericQuestion = {
    id: input.id,
    topicId: input.exprSpec.topicId,
    type: "numeric",
    subtopic: input.exprSpec.subtopic,
    prompt,
    hints,
    correctAnswers: [answerString],
    difficulty: difficulty.normalized,
    tags: dedupeTags([...analysis.tags, ...(input.exprSpec.tags ?? [])]),
    misconceptions: input.exprSpec.misconceptions ?? [],
    seeds: {
      difficulty: difficulty.normalized,
    },
    input: {
      allowMinus: true,
      allowDecimal: !resultIsInteger || analysis.hasFraction || analysis.hasDecimal,
    },
  };

  const distanceToTarget =
    input.difficultyTarget === undefined
      ? 0
      : Math.abs(difficulty.normalized - input.difficultyTarget);

  return { question, distanceToTarget };
}

export function generateExprNumericQuestion(input: GenerateExprNumericQuestionInput): NumericQuestion {
  const parsedAst = parseLatex(input.exprSpec.latex);
  let bestAttempt: AttemptResult | undefined;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    try {
      const current = runAttempt(input, parsedAst, attempt);
      if (!bestAttempt || current.distanceToTarget < bestAttempt.distanceToTarget) {
        bestAttempt = current;
      }
      if (input.difficultyTarget !== undefined && current.distanceToTarget <= 0.1) {
        return current.question;
      }
      if (input.difficultyTarget === undefined) {
        return current.question;
      }
    } catch {
      continue;
    }
  }

  if (bestAttempt) return bestAttempt.question;

  throw new Error(
    `Failed to generate expression question for template ${input.exprSpec.templateId} after ${MAX_ATTEMPTS} attempts`,
  );
}

function runExprGenRuntimeChecks(): void {
  function sampleInt(n: number): SampledValues[string] {
    return { rational: fromInteger(n) };
  }

  function evalTemplateToAnswerString(template: string, values: SampledValues): string {
    const parsed = parseLatex(template);
    const substituted = substitute(parsed, values);
    return toAnswerString(evalAst(substituted.numericAst));
  }

  const precedenceValues: SampledValues = {
    a: sampleInt(3),
  };
  if (evalTemplateToAnswerString("-a^2", precedenceValues) !== "-9") {
    throw new Error("ExprGen check failed: expected -a^2 to evaluate as -(a^2)");
  }
  if (evalTemplateToAnswerString("(-a)^2", precedenceValues) !== "9") {
    throw new Error("ExprGen check failed: expected (-a)^2 to evaluate as positive");
  }
  if (evalTemplateToAnswerString("-(a^2)", precedenceValues) !== "-9") {
    throw new Error("ExprGen check failed: expected -(a^2) to evaluate as negative");
  }

  const fractionPowValues: SampledValues = {
    a: sampleInt(2),
    b: sampleInt(4),
    c: sampleInt(2),
  };
  if (evalTemplateToAnswerString("\\frac{a}{b}^c", fractionPowValues) !== "1") {
    throw new Error("ExprGen check failed: expected \\frac{a}{b}^c to parse as \\frac{a^c}{b}");
  }
  if (evalTemplateToAnswerString("(\\frac{a}{b})^c", fractionPowValues) !== "1/4") {
    throw new Error("ExprGen check failed: expected (\\frac{a}{b})^c to raise whole fraction");
  }
  {
    const parsed = parseLatex("(\\frac{a}{b})^c");
    const rendered = substitute(parsed, fractionPowValues).latexRendered;
    if (!rendered.includes("\\left(\\frac{") || !rendered.includes("\\right)^{")) {
      throw new Error("ExprGen check failed: whole-fraction power must render with parentheses");
    }
  }
  {
    const parsed = parseLatex("\\frac{a}{b}^c");
    const rendered = substitute(parsed, fractionPowValues).latexRendered;
    if (!rendered.startsWith("\\frac{") || rendered.includes("(\\frac{")) {
      throw new Error("ExprGen check failed: numerator-power fraction should render as \\frac{X^c}{Y}");
    }
  }
  {
    const valuesABC: SampledValues = {
      a: sampleInt(3),
      b: sampleInt(6),
      c: sampleInt(2),
    };
    const unwrapped = evalTemplateToAnswerString("-\\frac{a}{b}^c", valuesABC);
    const wrapped = evalTemplateToAnswerString("-(\\frac{a}{b})^c", valuesABC);
    if (unwrapped !== "-3/2") {
      throw new Error(`ExprGen check failed: expected -\\frac{a}{b}^c => -3/2, got ${unwrapped}`);
    }
    if (wrapped !== "-1/4") {
      throw new Error(`ExprGen check failed: expected -(\\frac{a}{b})^c => -1/4, got ${wrapped}`);
    }
  }
  {
    const noVars = {} as SampledValues;
    const unwrappedLiteral = evalTemplateToAnswerString("-\\frac{3}{6}^2", noVars);
    const wrappedLiteral = evalTemplateToAnswerString("-\\left(\\frac{3}{6}\\right)^2", noVars);
    if (unwrappedLiteral !== "-3/2") {
      throw new Error(`ExprGen check failed: expected -\\frac{3}{6}^2 => -3/2, got ${unwrappedLiteral}`);
    }
    if (wrappedLiteral !== "-1/4") {
      throw new Error(
        `ExprGen check failed: expected -\\left(\\frac{3}{6}\\right)^2 => -1/4, got ${wrappedLiteral}`,
      );
    }
    const unwrappedRendered = substitute(parseLatex("-\\frac{3}{6}^2"), noVars).latexRendered;
    const wrappedRendered = substitute(parseLatex("-\\left(\\frac{3}{6}\\right)^2"), noVars).latexRendered;
    if (!unwrappedRendered.includes("\\frac{3^{2}}{6}")) {
      throw new Error(
        `ExprGen check failed: expected numerator-power rendering, got '${unwrappedRendered}'`,
      );
    }
    if (!wrappedRendered.includes("\\left(\\frac{3}{6}\\right)^{2}")) {
      throw new Error(
        `ExprGen check failed: expected whole-fraction-power rendering, got '${wrappedRendered}'`,
      );
    }
  }
  {
    const parsed = parseLatex("-(3-(-5))");
    const rendered = substitute(parsed, {}).latexRendered;
    if (rendered.includes("-((")) {
      throw new Error("ExprGen check failed: renderer produced redundant double parentheses");
    }
    if (rendered !== "-(3-(-5))") {
      throw new Error(`ExprGen check failed: expected '-(3-(-5))', got '${rendered}'`);
    }
  }
  {
    const parsed = parseLatex("a^2");
    const rendered = substitute(parsed, { a: sampleInt(-4) }).latexRendered;
    if (rendered !== "-4^{2}") {
      throw new Error(`ExprGen check failed: expected '-4^{2}', got '${rendered}'`);
    }
    const value = toAnswerString(evalAst(parseLatex(rendered)));
    if (value !== "-16") {
      throw new Error(`ExprGen check failed: expected '-4^{2}' to evaluate to -16, got '${value}'`);
    }
  }

  const ast = parseLatex("(a)^2");
  const values: SampledValues = {
    a: {
      rational: { num: 1n, den: 2n },
      displayFraction: { num: 2n, den: 4n },
    },
  };

  const { numericAst, latexRendered } = substitute(ast, values);
  if (!latexRendered.includes("\\frac{2}{4}")) {
    throw new Error("ExprGen check failed: expected unsimplified fraction display in power");
  }

  const value = evalAst(numericAst);
  const answer = toAnswerString(value);
  if (answer !== "1/4") {
    throw new Error(`ExprGen check failed: expected (2/4)^2 to evaluate to 1/4, got ${answer}`);
  }

  const divisionByZeroAst = parseLatex("\\frac{1}{b}");
  const divisionByZeroValues: SampledValues = {
    b: { rational: { num: 0n, den: 1n } },
  };
  const substituted = substitute(divisionByZeroAst, divisionByZeroValues);
  let threw = false;
  try {
    evalAst(substituted.numericAst);
  } catch {
    threw = true;
  }
  if (!threw) {
    throw new Error("ExprGen check failed: division by zero should throw");
  }
}

if ((import.meta as { env?: { DEV?: boolean } }).env?.DEV) {
  runExprGenRuntimeChecks();
}
