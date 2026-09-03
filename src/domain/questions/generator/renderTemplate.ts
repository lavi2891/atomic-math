import type { OptionContent } from "../types.ts";
import type { SampledParams } from "./types.ts";

const PLACEHOLDER_PATTERN = /\{([a-zA-Z_]\w*)\}/g;
const NEGATIVE_OPERAND_PATTERN = /([+−*×/÷-])\s*([-−]\s*(?:\d+(?:\.\d+)?|\\frac\{[^}]+\}\{[^}]+\}))/gu;

/** Keep a negative operand visually distinct from the binary operation before it. */
export function formatStudentMathExpression(value: string): string {
  return value.replace(NEGATIVE_OPERAND_PATTERN, (_match, operator: string, operand: string) =>
    `${operator} (${operand.replace(/\s+/gu, "")})`,
  );
}

export function extractTemplatePlaceholders(
  template: string,
  paramNames: Iterable<string>,
): string[] {
  const allowed = new Set(paramNames);
  const seen = new Set<string>();

  template.replaceAll(PLACEHOLDER_PATTERN, (_match, name: string) => {
    if (allowed.has(name)) {
      seen.add(name);
    }
    return _match;
  });

  return [...seen];
}

function replaceTemplatePlaceholders(
  template: string,
  sampledParams: SampledParams,
  mode: "expr" | "display",
): string {
  return template.replaceAll(PLACEHOLDER_PATTERN, (match, name: string) => {
    const sampled = sampledParams[name];
    if (!sampled) {
      return match;
    }
    return mode === "expr" ? sampled.expr : sampled.display;
  });
}

export function renderExpressionTemplate(
  template: string,
  sampledParams: SampledParams,
): string {
  return replaceTemplatePlaceholders(template, sampledParams, "expr");
}

export function renderDisplayTemplate(
  template: string,
  sampledParams: SampledParams,
): string {
  return formatStudentMathExpression(replaceTemplatePlaceholders(template, sampledParams, "display"));
}

export function renderPromptTemplate(
  promptTemplate: OptionContent[],
  sampledParams: SampledParams,
): OptionContent[] {
  return promptTemplate.map((segment) =>
    segment.kind === "text"
      ? { ...segment, value: renderDisplayTemplate(segment.value, sampledParams) }
      : { ...segment, latex: renderDisplayTemplate(segment.latex, sampledParams) },
  );
}

export function renderHintsTemplate(
  hintsTemplate: OptionContent[][] | undefined,
  sampledParams: SampledParams,
): OptionContent[][] | undefined {
  if (!hintsTemplate) return undefined;
  return hintsTemplate.map((hint) => renderPromptTemplate(hint, sampledParams));
}
