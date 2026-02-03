import type { RawAnswer } from "@domain/questions/types";

export function buildRawAnswer(
  questionType: RawAnswer["questionType"],
  data: RawAnswer["data"],
): RawAnswer {
  return { questionType, data };
}
