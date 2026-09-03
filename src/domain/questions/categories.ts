import { isGeneratedQuestionDefinition, type QuestionDefinition } from "./definitions.ts";

export type QuestionCategory = "calculation" | "conceptual" | "reasoning" | "representation";
export type QuestionCategoryFilter = "all" | QuestionCategory | "conceptualOrReasoning";

export function questionCategory(definition: QuestionDefinition): QuestionCategory {
  if (isGeneratedQuestionDefinition(definition)) return definition.category ?? "calculation";
  return definition.category ?? "calculation";
}

export function filterByQuestionCategory<T extends QuestionDefinition>(
  definitions: readonly T[],
  filter: QuestionCategoryFilter = "all",
): T[] {
  if (filter === "all") return [...definitions];
  return definitions.filter((definition) => {
    const category = questionCategory(definition);
    return filter === "conceptualOrReasoning"
      ? category === "conceptual" || category === "reasoning"
      : category === filter;
  });
}
