import type { OptionContent, SingleChoiceQuestion } from "../../../questions/types.ts";
import { generateEvaluatedExprAttempt } from "../../core/generateNumericQuestion.ts";
import { evalAst } from "../../core/evalAst.ts";
import { parseLatex } from "../../core/parseLatex.ts";
import type { Rational } from "../../core/rational.ts";
import { toAnswerString } from "../../core/rational.ts";
import { createRandom, fnv1a32 } from "../../core/rng.ts";
import { signatureForEquivalent } from "../../core/signatures.ts";
import type { ExprSpec, GenerateExprNumericQuestionInput } from "../../core/types.ts";

import type { EquivalentSpec } from "./equivalentSpec.ts";

const MAX_ATTEMPTS = 140;

interface GenerateEquivalentQuestionInput {
  id: string;
  seedNumber: number;
  difficultyTarget?: number;
  spec: EquivalentSpec;
  seenSignatures?: Set<string>;
}

function dedupeTags(tags: string[]): string[] {
  return [...new Set(tags)];
}

function equalsRational(a: Rational, b: Rational): boolean {
  return a.num === b.num && a.den === b.den;
}

function evaluateLatex(latex: string): Rational | undefined {
  try {
    return evalAst(parseLatex(latex));
  } catch {
    return undefined;
  }
}

function applySubtractNegativeMistake(latex: string): string | undefined {
  const direct = latex.replace(/-\(-([^()]+)\)/, "-$1");
  if (direct !== latex) return direct;
  const withLeftRight = latex.replace(
    /-\\left\(-([^()]+)\\right\)/,
    (_, inner: string) => `-${inner}`,
  );
  return withLeftRight !== latex ? withLeftRight : undefined;
}

function applyDistributeMinusMistake(latex: string): string | undefined {
  const direct = latex.replace(/^-\(([^()]+)-([^()]+)\)$/, "-$1-$2");
  if (direct !== latex) return direct;
  const withLeftRight = latex.replace(
    /^-\\left\(([^()]+)-([^()]+)\\right\)$/,
    "-$1-$2",
  );
  return withLeftRight !== latex ? withLeftRight : undefined;
}

function applyPowerParenthesesMistake(latex: string): string | undefined {
  const fractionBase = latex.replace(
    /^-(\\frac\{[^{}]+\}\{[^{}]+\})\^\{([^{}]+)\}$/,
    "(-$1)^{$2}",
  );
  if (fractionBase !== latex) return fractionBase;
  const scalarBase = latex.replace(/^-(\d+)\^\{([^{}]+)\}$/, "(-$1)^{$2}");
  return scalarBase !== latex ? scalarBase : undefined;
}

function applyFractionPowerFormattingMistake(latex: string): string | undefined {
  const transformed = latex.replace(
    /\\left\(\\frac\{([^{}]+)\}\{([^{}]+)\}\\right\)\^\{([^{}]+)\}/,
    "\\frac{$1^{$3}}{$2}",
  );
  return transformed !== latex ? transformed : undefined;
}

function buildOptions(answerLatex: string, distractors: string[], seed: number): {
  options: SingleChoiceQuestion["options"];
  correctOptionId: string;
} {
  const rng = createRandom(seed);
  const optionIds = ["A", "B", "C", "D"] as const;
  const correctIndex = rng.nextInt(0, optionIds.length - 1);
  const incorrectPool = [...distractors];
  const mathContent = (latex: string): OptionContent => ({
    kind: "math",
    latex,
    display: true,
  });
  const options = optionIds.map((id, index) => {
    if (index === correctIndex) {
      return {
        id,
        content: [mathContent(answerLatex)],
      };
    }
    const latex = incorrectPool.shift();
    if (!latex) {
      throw new Error("Missing equivalent distractor while building options");
    }
    return {
      id,
      content: [mathContent(latex)],
    };
  });

  return { options, correctOptionId: optionIds[correctIndex]! };
}

function pickSpec(sourceExprSpecs: ExprSpec[], seed: number): ExprSpec {
  const rng = createRandom(seed);
  const index = rng.nextInt(0, sourceExprSpecs.length - 1);
  return sourceExprSpecs[index]!;
}

export function generateSignedNumbersEquivalentQuestion(
  input: GenerateEquivalentQuestionInput,
): SingleChoiceQuestion {
  if (input.spec.sourceExprSpecs.length === 0) {
    throw new Error("Equivalent generator requires at least one source expression spec");
  }

  const parsedByTemplate = new Map<string, ReturnType<typeof parseLatex>>();
  for (const exprSpec of input.spec.sourceExprSpecs) {
    parsedByTemplate.set(exprSpec.templateId, parseLatex(exprSpec.latex));
  }

  let bestQuestion: SingleChoiceQuestion | undefined;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    const attemptSeed = fnv1a32(`${input.seedNumber}|equivalent|${attempt}`);
    const exprSpec = pickSpec(input.spec.sourceExprSpecs, attemptSeed);
    const parsedAst = parsedByTemplate.get(exprSpec.templateId);
    if (!parsedAst) {
      throw new Error("Missing parsed expression spec for equivalent generation");
    }

    let target: ReturnType<typeof generateEvaluatedExprAttempt>;
    try {
      const attemptInput: GenerateExprNumericQuestionInput = {
        id: `${input.id}_E`,
        exprSpec,
        seedNumber: attemptSeed,
        difficultyTarget: input.difficultyTarget,
      };
      target = generateEvaluatedExprAttempt(attemptInput, parsedAst, attempt);
    } catch {
      continue;
    }

    const distractorCandidates = [
      applySubtractNegativeMistake(target.latexRendered),
      applyDistributeMinusMistake(target.latexRendered),
      applyPowerParenthesesMistake(target.latexRendered),
      applyFractionPowerFormattingMistake(target.latexRendered),
    ];

    const validDistractors: string[] = [];
    const seenLatex = new Set<string>();
    for (const candidate of distractorCandidates) {
      if (!candidate || seenLatex.has(candidate) || candidate === target.latexRendered) {
        continue;
      }
      const evaluated = evaluateLatex(candidate);
      if (!evaluated || equalsRational(evaluated, target.result)) {
        continue;
      }
      seenLatex.add(candidate);
      validDistractors.push(candidate);
      if (validDistractors.length === 3) break;
    }
    if (validDistractors.length < 3) {
      continue;
    }

    const answerLatex = toAnswerString(target.result);
    const answerEval = evaluateLatex(answerLatex);
    if (!answerEval || !equalsRational(answerEval, target.result)) {
      continue;
    }
    if (validDistractors.some((distractor) => distractor === answerLatex)) {
      continue;
    }

    const optionSeed = fnv1a32(`${attemptSeed}|options`);
    const { options, correctOptionId } = buildOptions(answerLatex, validDistractors, optionSeed);
    const signature = signatureForEquivalent(
      input.spec.topicId,
      target.latexRendered,
      options,
      correctOptionId,
    );
    if (input.seenSignatures?.has(signature)) {
      continue;
    }

    const distanceToTarget =
      input.difficultyTarget === undefined
        ? 0
        : Math.abs(target.difficulty.normalized - input.difficultyTarget);
    const question: SingleChoiceQuestion = {
      id: input.id,
      topicId: input.spec.topicId,
      type: "singleChoice",
      subtopic: input.spec.subtopic,
      prompt: [
        { kind: "text", value: "איזה מהביטויים הבאים שווה בערכו לביטוי?" },
        { kind: "math", latex: target.latexRendered, display: true },
      ],
      options,
      correctOptionId,
      difficulty: target.difficulty.normalized,
      tags: dedupeTags([...target.tags, ...(input.spec.tags ?? []), "family:equivalent"]),
      misconceptions: input.spec.misconceptions ?? [],
      seeds: {
        difficulty: target.difficulty.normalized,
      },
    };

    if (input.seenSignatures) input.seenSignatures.add(signature);
    if (input.difficultyTarget === undefined || distanceToTarget <= 0.1) {
      return question;
    }
    if (distanceToTarget < bestDistance) {
      bestDistance = distanceToTarget;
      bestQuestion = question;
    }
  }

  if (bestQuestion) {
    return bestQuestion;
  }
  throw new Error(`Failed to generate equivalent question ${input.id} after ${MAX_ATTEMPTS} attempts`);
}
