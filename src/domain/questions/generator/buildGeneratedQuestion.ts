import { clamp01 } from "../../../shared/math.ts";
import type { GeneratedQuestionInstance, NumericQuestion } from "../types.ts";
import {
  DEFAULT_ANTI_REPETITION_CONFIG,
  shouldRejectByRecentHistory,
  type AntiRepetitionConfig,
  type GeneratedQuestionRecentHistory,
} from "./antiRepetition.ts";
import type { GeneratedQuestionDefinition, SampledParams } from "./types.ts";
import { evaluateConstraint } from "./constraints.ts";
import { evaluateExpression, toComputedAnswer } from "./evaluateExpression.ts";
import {
  renderExpressionTemplate,
  renderHintsTemplate,
  renderPromptTemplate,
} from "./renderTemplate.ts";
import { sampleParam } from "./sampleParam.ts";

type BuildGeneratedQuestionOptions = {
  rng?: () => number;
  seed?: number;
  maxAttempts?: number;
  recentHistory?: GeneratedQuestionRecentHistory;
  antiRepetitionConfig?: Partial<AntiRepetitionConfig>;
};

const DEFAULT_MAX_ATTEMPTS = 50;

function createSeededRng(seed: number): () => number {
  let state = Math.trunc(seed) >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

function sampleParams(
  definition: GeneratedQuestionDefinition,
  rng: () => number,
): SampledParams {
  return Object.fromEntries(
    Object.entries(definition.params).map(([name, spec]) => [name, sampleParam(spec, rng)]),
  );
}

function serializeParams(params: SampledParams): string {
  return Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value.expr}`)
    .join("|");
}

function hashString32(input: string): string {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return (hash >>> 0).toString(16);
}

function shouldAllowDecimal(
  definition: GeneratedQuestionDefinition,
  renderedExpression: string,
): boolean {
  return (
    definition.input?.allowDecimal ??
    (renderedExpression.includes(".") ||
      renderedExpression.includes("/") ||
      Object.values(definition.params).some(
        (spec) => spec.type === "decimal" || spec.type === "rational",
      ))
  );
}

function constraintsSatisfied(
  definition: GeneratedQuestionDefinition,
  sampledParams: SampledParams,
): boolean {
  return (definition.constraints ?? []).every((constraint) =>
    evaluateConstraint(constraint, sampledParams),
  );
}

function computeDifficulty(
  definition: GeneratedQuestionDefinition,
  sampledParams: SampledParams,
): number | undefined {
  if (definition.difficultyModel) {
    return clamp01(definition.difficultyModel(sampledParams));
  }
  if (typeof definition.metadata?.difficulty === "number") {
    return clamp01(definition.metadata.difficulty);
  }
  return undefined;
}

export function buildGeneratedQuestion(
  definition: GeneratedQuestionDefinition,
  options: BuildGeneratedQuestionOptions = {},
): GeneratedQuestionInstance {
  const rng = options.rng ?? (options.seed === undefined ? Math.random : createSeededRng(options.seed));
  const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  const antiRepetitionConfig = {
    ...DEFAULT_ANTI_REPETITION_CONFIG,
    ...options.antiRepetitionConfig,
  };

  for (let pass = 0; pass < 2; pass += 1) {
    const enforceRecentHistory = pass === 0 && !!options.recentHistory;
    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      const sampledParams = sampleParams(definition, rng);
      if (!constraintsSatisfied(definition, sampledParams)) {
        continue;
      }

      try {
        const renderedExpression = renderExpressionTemplate(
          definition.exprTemplate,
          sampledParams,
        );
        const result = evaluateExpression(renderedExpression);
        const prompt = renderPromptTemplate(definition.promptTemplate, sampledParams);
        const hints = renderHintsTemplate(definition.hintsTemplate, sampledParams);
        const preferDecimal = Object.values(sampledParams).some(
          (param) => param.type === "decimal",
        );
        const correctAnswer = toComputedAnswer(result, { preferDecimal });
        const computedDifficulty = computeDifficulty(definition, sampledParams);
        const concrete: NumericQuestion = {
          id: `${definition.id}__${hashString32(serializeParams(sampledParams))}`,
          topicId: definition.topicId,
          type: "numeric",
          prompt,
          hints,
          correctAnswers: [correctAnswer],
          difficulty: computedDifficulty ?? definition.metadata?.difficulty,
          subtopic: definition.metadata?.subtopic,
          misconceptions: definition.misconceptions,
          version: definition.version,
          tags: [...new Set([...(definition.tags ?? []), "source:generator"])],
          input: {
            allowMinus: definition.input?.allowMinus ?? true,
            allowDecimal: shouldAllowDecimal(definition, renderedExpression),
          },
        };

        const generatedQuestion: GeneratedQuestionInstance = {
          ...concrete,
          baseId: definition.id,
          templateId: definition.id,
          renderedExpression,
          sampledParams: Object.fromEntries(
            Object.entries(sampledParams).map(([name, value]) => [name, value.expr]),
          ),
          computedDifficulty,
          structureKey: definition.structureKey,
          variantGroup: definition.variantGroup,
          metadata: {
            ...definition.metadata,
            source: definition.metadata?.source ?? "generator",
          },
        };

        if (
          enforceRecentHistory &&
          options.recentHistory &&
          shouldRejectByRecentHistory(
            generatedQuestion,
            options.recentHistory,
            antiRepetitionConfig,
          )
        ) {
          continue;
        }

        return generatedQuestion;
      } catch {
        continue;
      }
    }
  }

  throw new Error(
    `Failed to build generated question ${definition.id} after ${maxAttempts} attempts`,
  );
}
