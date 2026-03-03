import type { ChoiceOption, OptionContent, Question } from "../../questions/types.ts";

export function normalizeLatexForSig(latex: string): string {
  return latex
    .replace(/\\left/g, "")
    .replace(/\\right/g, "")
    .replace(/\s+/g, "")
    .replace(/\\cdot/g, "\\times")
    .trim();
}

function optionMathLatex(option: ChoiceOption): string {
  const mathParts = option.content
    .filter((item): item is Extract<OptionContent, { kind: "math" }> => item.kind === "math")
    .map((item) => normalizeLatexForSig(item.latex));
  return mathParts.join("~");
}

export function signatureForNumeric(
  topicId: string,
  exprLatex: string,
  answer: string,
): string {
  return `${topicId}||numeric||${normalizeLatexForSig(exprLatex)}||${answer}`;
}

export function signatureForCompare(
  topicId: string,
  latexA: string,
  latexB: string,
  correct: string,
): string {
  return `${topicId}||compare||A=${normalizeLatexForSig(latexA)}||B=${normalizeLatexForSig(latexB)}||${correct}`;
}

export function signatureForSign(
  topicId: string,
  exprLatex: string,
  correct: string,
): string {
  return `${topicId}||sign||${normalizeLatexForSig(exprLatex)}||${correct}`;
}

export function signatureForEquivalent(
  topicId: string,
  targetLatex: string,
  options: ChoiceOption[],
  correctId: string,
): string {
  const normalizedOptions = options
    .map((option) => `${option.id}:${optionMathLatex(option)}`)
    .join("|");
  return `${topicId}||equiv||target=${normalizeLatexForSig(targetLatex)}||opts=${normalizedOptions}||${correctId}`;
}

export function signatureForQuestion(question: Question): string {
  const mathPrompt = question.prompt
    .filter((item): item is Extract<OptionContent, { kind: "math" }> => item.kind === "math")
    .map((item) => item.latex);

  if (question.type === "numeric") {
    return signatureForNumeric(
      question.topicId,
      mathPrompt[0] ?? "",
      question.correctAnswers[0] ?? "",
    );
  }

  if (question.type === "singleChoice" && question.tags?.includes("family:compare")) {
    return signatureForCompare(
      question.topicId,
      mathPrompt[0] ?? "",
      mathPrompt[1] ?? "",
      question.correctOptionId,
    );
  }

  if (question.type === "singleChoice" && question.tags?.includes("family:sign")) {
    return signatureForSign(
      question.topicId,
      mathPrompt[0] ?? "",
      question.correctOptionId,
    );
  }

  if (question.type === "singleChoice" && question.tags?.includes("family:equivalent")) {
    return signatureForEquivalent(
      question.topicId,
      mathPrompt[0] ?? "",
      question.options,
      question.correctOptionId,
    );
  }

  if (question.type === "singleChoice") {
    const optionSig = question.options
      .map((option) => `${option.id}:${optionMathLatex(option)}`)
      .join("|");
    return `${question.topicId}||singleChoice||${mathPrompt.join("~")}||${optionSig}||${question.correctOptionId}`;
  }

  const optionSig = question.options
    .map((option) => `${option.id}:${optionMathLatex(option)}`)
    .join("|");
  return `${question.topicId}||multiChoice||${mathPrompt.join("~")}||${optionSig}||${question.correctOptionIds.join(",")}`;
}
