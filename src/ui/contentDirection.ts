import type { OptionContent } from "../domain/questions/types.ts";

export const DEFAULT_CONTENT_DIRECTION = "rtl" as const;

/** Math is isolated LTR even when the surrounding Hebrew content is RTL. */
export function contentSegmentDirection(segment: OptionContent): "ltr" | undefined {
  return segment.kind === "math" ? "ltr" : undefined;
}

/** Keep adjacent inline math in one LTR run; RTL must not reverse its operands. */
export function groupInlineMath(content: readonly OptionContent[]): OptionContent[][] {
  const runs: OptionContent[][] = [];
  for (let index = 0; index < content.length; index += 1) {
    const segment = content[index]!;
    const run = [segment];
    if (segment.kind === "math" && !segment.display) {
      while (index + 1 < content.length) {
        const next = content[index + 1]!;
        if (next.kind === "math" && !next.display) {
          run.push(next);
          index += 1;
        } else if (next.kind === "text" && /^\s*$/.test(next.value)) {
          const afterSpace = content[index + 2];
          if (afterSpace?.kind !== "math" || afterSpace.display) break;
          run.push(next, afterSpace);
          index += 2;
        } else break;
      }
    }
    runs.push(run);
  }
  return runs;
}
