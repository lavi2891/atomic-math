import type { OptionContent } from "../domain/questions/types.ts";

export const DEFAULT_CONTENT_DIRECTION = "rtl" as const;

/** Math is isolated LTR even when the surrounding Hebrew content is RTL. */
export function contentSegmentDirection(segment: OptionContent): "ltr" | undefined {
  return segment.kind === "math" ? "ltr" : undefined;
}
