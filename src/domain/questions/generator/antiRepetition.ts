import type { GeneratedQuestionInstance } from "../types.ts";

export type GeneratedQuestionRecentHistory = {
  renderedExpressions: string[];
  structureKeys: string[];
  variantGroups: string[];
};

export type AntiRepetitionConfig = {
  expressionWindow: number;
  structureWindow: number;
  maxSameStructureInWindow: number;
  variantWindow: number;
  maxSameVariantInWindow: number;
};

export const DEFAULT_ANTI_REPETITION_CONFIG: AntiRepetitionConfig = {
  expressionWindow: 6,
  structureWindow: 5,
  maxSameStructureInWindow: 2,
  variantWindow: 6,
  maxSameVariantInWindow: 3,
};

function getRecentWindow<T>(items: T[], size: number): T[] {
  return items.slice(Math.max(0, items.length - size));
}

function countRecentMatches(items: string[], target: string): number {
  let count = 0;
  for (const item of items) {
    if (item === target) {
      count += 1;
    }
  }
  return count;
}

export function createRecentHistory(): GeneratedQuestionRecentHistory {
  return {
    renderedExpressions: [],
    structureKeys: [],
    variantGroups: [],
  };
}

export function cloneRecentHistory(
  history: GeneratedQuestionRecentHistory,
): GeneratedQuestionRecentHistory {
  return {
    renderedExpressions: [...history.renderedExpressions],
    structureKeys: [...history.structureKeys],
    variantGroups: [...history.variantGroups],
  };
}

export function shouldRejectByRecentHistory(
  question: Pick<
    GeneratedQuestionInstance,
    "renderedExpression" | "structureKey" | "variantGroup"
  >,
  history: GeneratedQuestionRecentHistory,
  config: AntiRepetitionConfig = DEFAULT_ANTI_REPETITION_CONFIG,
): boolean {
  const recentExpressions = getRecentWindow(
    history.renderedExpressions,
    config.expressionWindow,
  );
  if (recentExpressions.includes(question.renderedExpression)) {
    return true;
  }

  if (question.structureKey) {
    const recentStructures = getRecentWindow(
      history.structureKeys,
      config.structureWindow,
    );
    if (
      countRecentMatches(recentStructures, question.structureKey) >=
      config.maxSameStructureInWindow
    ) {
      return true;
    }
  }

  if (question.variantGroup) {
    const recentVariants = getRecentWindow(
      history.variantGroups,
      config.variantWindow,
    );
    if (
      countRecentMatches(recentVariants, question.variantGroup) >=
      config.maxSameVariantInWindow
    ) {
      return true;
    }
  }

  return false;
}

export function recordGeneratedQuestionHistory(
  history: GeneratedQuestionRecentHistory,
  question: Pick<
    GeneratedQuestionInstance,
    "renderedExpression" | "structureKey" | "variantGroup"
  >,
): void {
  history.renderedExpressions.push(question.renderedExpression);
  if (question.structureKey) {
    history.structureKeys.push(question.structureKey);
  }
  if (question.variantGroup) {
    history.variantGroups.push(question.variantGroup);
  }
}
