import type { OptionContent } from "../../domain/questions/types.ts";

/**
 * Authoring boundary for RTL student content:
 * - A number used only as a prose quantity (for example, "יש 4 שקיות") stays text.
 * - A value or expression being inspected, compared, solved, or selected is wrapped in [[...]]
 *   and becomes a math segment rendered by ContentRenderer/KaTeX.
 */

const AUTHORED_MATH_MARKER = /\[\[([^\]]+)\]\]/gu;
const PURE_NUMERIC_OR_RELATION = /^(?:[-−]?\d+(?:\.\d+)?(?:\/[-−]?\d+(?:\.\d+)?)?|[<>=])$/u;
const PURE_SYMBOLIC_EXPRESSION = /^(?=.*(?:\d|[□()+−×÷*/.=-]))[\dA-Za-z□()\s+−×÷*/.=-]+$/u;
const SINGLE_VARIABLE = /^[A-Za-z]$/u;

export function studentMathLatex(value: string): string {
  return value
    .trim()
    .replaceAll("−", "-")
    .replaceAll("×", "\\times ")
    .replaceAll("÷", "\\div ")
    .replaceAll("□", "\\square ");
}

export function authoredStudentContent(value: string): OptionContent[] {
  const content: OptionContent[] = [];
  let cursor = 0;
  for (const match of value.matchAll(AUTHORED_MATH_MARKER)) {
    const index = match.index;
    if (index > cursor) content.push({ kind: "text", value: value.slice(cursor, index) });
    content.push({ kind: "math", latex: studentMathLatex(match[1]!) });
    cursor = index + match[0].length;
  }
  if (cursor < value.length) content.push({ kind: "text", value: value.slice(cursor) });
  return content.length ? content : [{ kind: "text", value }];
}

export function authoredChoiceContent(value: string): OptionContent[] {
  const trimmed = value.trim();
  return PURE_NUMERIC_OR_RELATION.test(trimmed) || PURE_SYMBOLIC_EXPRESSION.test(trimmed) || SINGLE_VARIABLE.test(trimmed)
    ? [{ kind: "math", latex: studentMathLatex(value) }]
    : authoredStudentContent(value);
}

/** Obvious math left in an RTL text segment is a blocking authoring error. */
export function mathLookingText(value: string): boolean {
  const text = value.trim();
  if (!text) return false;
  if (/^[-−]?\d+(?:\.\d+)?(?:\/[-−]?\d+(?:\.\d+)?)?$/u.test(text)) return true;
  if (/^[<>=]$/u.test(text)) return true;
  if (/(?:^|\s)[-−]\d/u.test(text)) return true;
  if (/\d+\/\d+/u.test(text)) return true;
  if (/\b[A-Za-z]\b/u.test(text) || /\d+[A-Za-z]/u.test(text)) return true;
  return /(?:\d|[A-Za-z□)])\s*(?:\+|−|-|×|÷|\*|=|<|>)\s*(?:[-−]?\d|[A-Za-z□(])/u.test(text);
}
