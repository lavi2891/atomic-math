import type { GeneratedQuestionInstance, NumericQuestion } from "../types.ts";
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
  maxAttempts?: number;
};

const DEFAULT_MAX_ATTEMPTS = 50;

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

export function buildGeneratedQuestion(
  definition: GeneratedQuestionDefinition,
  options: BuildGeneratedQuestionOptions = {},
): GeneratedQuestionInstance {
  const rng = options.rng ?? Math.random;
  const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;

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
      const concrete: NumericQuestion = {
        id: `${definition.id}__${hashString32(serializeParams(sampledParams))}`,
        topicId: definition.topicId,
        type: "numeric",
        prompt,
        hints,
        correctAnswers: [correctAnswer],
        difficulty: definition.metadata?.difficulty,
        subtopic: definition.metadata?.subtopic,
        misconceptions: definition.misconceptions,
        version: definition.version,
        tags: [...new Set([...(definition.tags ?? []), "source:generator"])],
        input: {
          allowMinus: definition.input?.allowMinus ?? true,
          allowDecimal: shouldAllowDecimal(definition, renderedExpression),
        },
      };

      return {
        ...concrete,
        baseId: definition.id,
        templateId: definition.id,
        renderedExpression,
        sampledParams: Object.fromEntries(
          Object.entries(sampledParams).map(([name, value]) => [name, value.expr]),
        ),
        metadata: {
          ...definition.metadata,
          source: definition.metadata?.source ?? "generator",
        },
      };
    } catch {
      continue;
    }
  }

  throw new Error(
    `Failed to build generated question ${definition.id} after ${maxAttempts} attempts`,
  );
}
