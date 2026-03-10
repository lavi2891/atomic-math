import { isGeneratedQuestionInstance, type Question } from "@domain/questions/types";
import { clamp01 } from "@shared/math";

export type PickConfig = {
  baseDelta: number;
  maxDelta: number;
  minCandidates: number;
  sigma: number;
  epsilonBase: number;
  epsilonMax: number;
  historyWindow: number;
  repeatQuestionPenalty: number;
  repeatExpressionPenalty: number;
  repeatSubtopicPenalty: number;
  repeatStructurePenalty: number;
  repeatVariantPenalty: number;
  maxSameSubtopicStreak: number;
  deltaGrowFactor: number;
};

type PickHistory = {
  questionIds: string[];
  subtopics: Array<string | undefined>;
  renderedExpressions?: string[];
  structureKeys?: string[];
  variantGroups?: string[];
};

type PickParams = {
  questions: Question[];
  targetDifficulty: number;
  history: PickHistory;
  config?: Partial<PickConfig>;
};

const DEFAULT_CONFIG: PickConfig = {
  baseDelta: 0.12,
  maxDelta: 0.4,
  minCandidates: 8,
  sigma: 0.06,
  epsilonBase: 0.15,
  epsilonMax: 0.45,
  historyWindow: 12,
  repeatQuestionPenalty: 0.1,
  repeatExpressionPenalty: 0.08,
  repeatSubtopicPenalty: 0.5,
  repeatStructurePenalty: 0.45,
  repeatVariantPenalty: 0.65,
  maxSameSubtopicStreak: 2,
  deltaGrowFactor: 1.5,
};

function normalizeDifficulty(question: Question): number {
  return clamp01(question.difficulty ?? 0.5);
}

function clampPositive(value: number, fallback: number): number {
  if (!Number.isFinite(value) || value <= 0) return fallback;
  return value;
}

function resolveConfig(config?: Partial<PickConfig>): PickConfig {
  return {
    baseDelta: clampPositive(config?.baseDelta ?? DEFAULT_CONFIG.baseDelta, 0.12),
    maxDelta: clampPositive(config?.maxDelta ?? DEFAULT_CONFIG.maxDelta, 0.4),
    minCandidates: Math.max(
      1,
      Math.floor(config?.minCandidates ?? DEFAULT_CONFIG.minCandidates),
    ),
    sigma: clampPositive(config?.sigma ?? DEFAULT_CONFIG.sigma, 0.06),
    epsilonBase: clamp01(config?.epsilonBase ?? DEFAULT_CONFIG.epsilonBase),
    epsilonMax: clamp01(config?.epsilonMax ?? DEFAULT_CONFIG.epsilonMax),
    historyWindow: Math.max(
      1,
      Math.floor(config?.historyWindow ?? DEFAULT_CONFIG.historyWindow),
    ),
    repeatQuestionPenalty: Math.max(
      0,
      config?.repeatQuestionPenalty ?? DEFAULT_CONFIG.repeatQuestionPenalty,
    ),
    repeatExpressionPenalty: Math.max(
      0,
      config?.repeatExpressionPenalty ?? DEFAULT_CONFIG.repeatExpressionPenalty,
    ),
    repeatSubtopicPenalty: Math.max(
      0,
      config?.repeatSubtopicPenalty ?? DEFAULT_CONFIG.repeatSubtopicPenalty,
    ),
    repeatStructurePenalty: Math.max(
      0,
      config?.repeatStructurePenalty ?? DEFAULT_CONFIG.repeatStructurePenalty,
    ),
    repeatVariantPenalty: Math.max(
      0,
      config?.repeatVariantPenalty ?? DEFAULT_CONFIG.repeatVariantPenalty,
    ),
    maxSameSubtopicStreak: Math.max(
      1,
      Math.floor(
        config?.maxSameSubtopicStreak ?? DEFAULT_CONFIG.maxSameSubtopicStreak,
      ),
    ),
    deltaGrowFactor: clampPositive(
      config?.deltaGrowFactor ?? DEFAULT_CONFIG.deltaGrowFactor,
      1.5,
    ),
  };
}

function hasDuplicate(ids: string[]): boolean {
  const seen = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) return true;
    seen.add(id);
  }
  return false;
}

function hasSubtopicConcentration(
  subtopics: Array<string | undefined>,
  threshold: number,
): boolean {
  const counts = new Map<string, number>();
  for (const subtopic of subtopics) {
    if (!subtopic) continue;
    counts.set(subtopic, (counts.get(subtopic) ?? 0) + 1);
    if ((counts.get(subtopic) ?? 0) >= threshold) return true;
  }
  return false;
}

function getRecentWindow<T>(items: T[], windowSize: number): T[] {
  return items.slice(Math.max(0, items.length - windowSize));
}

function getSubtopicStreak(subtopics: Array<string | undefined>): {
  subtopic: string | undefined;
  streak: number;
} {
  const last = subtopics[subtopics.length - 1];
  if (!last) return { subtopic: undefined, streak: 0 };

  let streak = 0;
  for (let i = subtopics.length - 1; i >= 0; i -= 1) {
    if (subtopics[i] !== last) break;
    streak += 1;
  }

  return { subtopic: last, streak };
}

function weightedPick<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  if (total <= 0) {
    return items[Math.floor(Math.random() * items.length)] as T;
  }

  const threshold = Math.random() * total;
  let cumulative = 0;

  for (let i = 0; i < items.length; i += 1) {
    cumulative += weights[i] ?? 0;
    if (cumulative >= threshold) {
      return items[i] as T;
    }
  }

  return items[items.length - 1] as T;
}

function getRenderedExpression(question: Question): string | undefined {
  return isGeneratedQuestionInstance(question) ? question.renderedExpression : undefined;
}

function getStructureKey(question: Question): string | undefined {
  return isGeneratedQuestionInstance(question) ? question.structureKey : undefined;
}

function getVariantGroup(question: Question): string | undefined {
  return isGeneratedQuestionInstance(question) ? question.variantGroup : undefined;
}

export function pickNextQuestion(params: PickParams): Question {
  const { questions, history, targetDifficulty } = params;
  if (questions.length === 0) {
    throw new Error("pickNextQuestion requires at least one question");
  }

  const config = resolveConfig(params.config);
  const target = clamp01(targetDifficulty);

  const recentQuestionIds = getRecentWindow(history.questionIds, config.historyWindow);
  const recentSubtopics = getRecentWindow(history.subtopics, config.historyWindow);
  const recentExpressions = getRecentWindow(
    history.renderedExpressions ?? [],
    config.historyWindow,
  );
  const recentStructureKeys = getRecentWindow(
    history.structureKeys ?? [],
    config.historyWindow,
  );
  const recentVariantGroups = getRecentWindow(
    history.variantGroups ?? [],
    config.historyWindow,
  );

  let epsilon = config.epsilonBase;
  let deltaStart = config.baseDelta;

  if (hasDuplicate(recentQuestionIds)) {
    epsilon = Math.min(config.epsilonMax, epsilon + 0.15);
    deltaStart *= 1.5;
  }

  const concentrationThreshold = Math.ceil(config.historyWindow * 0.5);
  if (hasSubtopicConcentration(recentSubtopics, concentrationThreshold)) {
    epsilon = Math.min(config.epsilonMax, epsilon + 0.1);
    deltaStart *= 1.5;
  }

  const explore = Math.random() < epsilon;
  if (explore) {
    deltaStart *= 2;
  }

  let delta = Math.min(config.maxDelta, deltaStart);
  let candidates = questions.filter(
    (question) => Math.abs(normalizeDifficulty(question) - target) <= delta,
  );

  while (candidates.length < config.minCandidates && delta < config.maxDelta) {
    delta = Math.min(config.maxDelta, delta * config.deltaGrowFactor);
    candidates = questions.filter(
      (question) => Math.abs(normalizeDifficulty(question) - target) <= delta,
    );
  }

  if (candidates.length === 0) {
    candidates = [...questions];
  }

  if (candidates.length < config.minCandidates) {
    const fallbackCount = Math.min(config.minCandidates, questions.length);
    candidates = [...questions]
      .sort(
        (a, b) =>
          Math.abs(normalizeDifficulty(a) - target) -
          Math.abs(normalizeDifficulty(b) - target),
      )
      .slice(0, fallbackCount);
  }

  const questionIdSet = new Set(recentQuestionIds);
  const subtopicSet = new Set(recentSubtopics.filter((item): item is string => !!item));
  const renderedExpressionSet = new Set(recentExpressions);
  const structureKeySet = new Set(recentStructureKeys);
  const variantGroupSet = new Set(recentVariantGroups);
  const { subtopic: lastSubtopic, streak } = getSubtopicStreak(recentSubtopics);

  if (lastSubtopic && streak >= config.maxSameSubtopicStreak) {
    const alternatives = candidates.filter((item) => item.subtopic !== lastSubtopic);
    if (alternatives.length > 0) {
      candidates = alternatives;
    }
  }

  const sigmaScale = explore ? 2 : 1;
  const sigma = Math.max(0.0001, config.sigma * sigmaScale);

  const weights = candidates.map((question) => {
    const distance = Math.abs(normalizeDifficulty(question) - target);
    let weight = Math.exp(-(distance * distance) / (2 * sigma * sigma));

    if (questionIdSet.has(question.id)) {
      weight *= config.repeatQuestionPenalty;
    }

    const renderedExpression = getRenderedExpression(question);
    if (renderedExpression && renderedExpressionSet.has(renderedExpression)) {
      weight *= config.repeatExpressionPenalty;
    }

    if (question.subtopic && subtopicSet.has(question.subtopic)) {
      weight *= config.repeatSubtopicPenalty;
    }

    const structureKey = getStructureKey(question);
    if (structureKey && structureKeySet.has(structureKey)) {
      weight *= config.repeatStructurePenalty;
    }

    const variantGroup = getVariantGroup(question);
    if (variantGroup && variantGroupSet.has(variantGroup)) {
      weight *= config.repeatVariantPenalty;
    }

    if (
      lastSubtopic &&
      streak >= config.maxSameSubtopicStreak &&
      question.subtopic === lastSubtopic
    ) {
      weight *= 0.05;
    }

    return weight;
  });

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (totalWeight <= 0) {
    return candidates[Math.floor(Math.random() * candidates.length)] as Question;
  }

  return weightedPick(candidates, weights);
}
