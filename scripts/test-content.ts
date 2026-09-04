import assert from "node:assert/strict";
import { DOMAINS, SKILLS } from "../src/content/catalog/index.ts";
import { groupAtomicSkillIds, presentationItems } from "../src/content/catalog/skillGroups.ts";
import { validateEvidencePolicy } from "../src/content/catalog/policies.ts";
import { FOUNDATIONAL_QUESTIONS } from "../src/content/foundations/questions.ts";
import { CONTENT_READINESS, readinessIssues, readySkillIds } from "../src/content/readiness.ts";
import { buildGeneratedQuestion } from "../src/domain/questions/generator/buildGeneratedQuestion.ts";
import { isGeneratedQuestionDefinition } from "../src/domain/questions/definitions.ts";
import { projectMastery } from "../src/domain/mastery/projectMastery.ts";
import type { Attempt } from "../src/domain/attempts/types.ts";
import { isAssignmentComplete } from "../src/domain/studentHome/deriveStudentHome.ts";
import { createChallengeSignature, challengeSignatureKey } from "../src/domain/personalBests/challengeSignature.ts";
import { resolveQuickPracticeScope } from "../src/domain/studentHome/quickPractice.ts";
import { auditFoundationalContent, curatedNumericLiteralIssues, curatedNumericLiteralItems, factorMultipleSemanticIssues, generatedInstanceMetadataIssues, magnitudeBandProgressionIssues, pedagogicalTargetingIssues, questionCategorySemanticsIssues, signedMultiplicationLoadIssues, structuralBandProgressionIssues, studentFacingVariableSupportIssues, studentMathContentIssues, studentMathContentWarnings, supportingSkillMetadataIssues, symbolicAuthoringIssues, validateFoundationalContent } from "../src/content/validateContent.ts";
import { atomicSkillIdentityIssues } from "../src/content/foundations/skillScope.ts";
import { signedGeneratedInstanceIssues, signedSkillDefinitionIssues } from "../src/content/foundations/skillScope.ts";
import type { GeneratedQuestionInstance, OptionContent } from "../src/domain/questions/types.ts";
import type { GeneratedQuestionDefinition } from "../src/domain/questions/generator/types.ts";
import type { SkillQuestionDefinition } from "../src/domain/session/skillQuestionSelector.ts";
import { authoredChoiceContent, authoredStudentContent } from "../src/content/foundations/studentMathContent.ts";
import { contentSegmentDirection, DEFAULT_CONTENT_DIRECTION } from "../src/ui/contentDirection.ts";

function run(name: string, fn: () => void) { fn(); process.stdout.write(`PASS ${name}\n`); }
const skill = (id: string) => SKILLS.find((item) => item.id === id)!;
const generatedDefinition = (id: string): GeneratedQuestionDefinition & { skillId: string } => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === id);
  if (!definition || !isGeneratedQuestionDefinition(definition)) throw new Error(`Missing generator ${id}`);
  return definition;
};
const renderedText = (content: OptionContent[]) => content.map((segment) => segment.kind === "text" ? segment.value : segment.latex).join("");
const optionTexts = (question: GeneratedQuestionInstance) => question.type === "numeric" ? [] : question.options.map((option) => renderedText(option.content));
const correctOptionTexts = (question: GeneratedQuestionInstance) => {
  if (question.type === "numeric") return question.correctAnswers;
  const ids = question.type === "singleChoice" ? [question.correctOptionId] : question.correctOptionIds;
  return question.options.filter((option) => ids.includes(option.id)).map((option) => renderedText(option.content));
};

run("Skill Group selection maps to atomic fact-family IDs", () => {
  assert.deepEqual(groupAtomicSkillIds("AR_MULTIPLICATION_FACTS"), ["AR_MUL_F_2_5_10", "AR_MUL_F_3_4", "AR_MUL_F_6_7", "AR_MUL_F_8_9"]);
  const items = presentationItems("ARITHMETIC", SKILLS.filter((item) => item.domainId === "ARITHMETIC").map((item) => item.id), SKILLS);
  assert.equal(items.find((item) => item.id === "AR_MULTIPLICATION_FACTS")?.isGroup, true);
});

run("atomic mastery remains separate inside a presentation group", () => {
  const attempts = [attempt("AR_MUL_F_2_5_10", 0), attempt("AR_MUL_F_2_5_10", 1)];
  assert.equal(projectMastery({ studentId: "S", skillId: "AR_MUL_F_2_5_10", attempts }).attemptCount, 2);
  assert.equal(projectMastery({ studentId: "S", skillId: "AR_MUL_F_3_4", attempts }).attemptCount, 0);
});

run("readiness hides incomplete skills and requires explicit human review", () => {
  const entry = CONTENT_READINESS[0]!;
  assert.ok(readinessIssues({ ...entry, humanReviewed: false }, FOUNDATIONAL_QUESTIONS).some((issue) => issue.includes("human review")));
  assert.equal(readySkillIds(FOUNDATIONAL_QUESTIONS).size, 27);
  assert.equal(readySkillIds(FOUNDATIONAL_QUESTIONS.filter((item) => item.skillId !== entry.skillId)).has(entry.skillId), false);
});

run("multiplication and division fact families remain distinct", () => {
  for (const prefix of ["AR_MUL_F_", "AR_DIV_F_"]) {
    const family = FOUNDATIONAL_QUESTIONS.find((item) => item.skillId === `${prefix}2_5_10` && isGeneratedQuestionDefinition(item));
    assert.ok(family && isGeneratedQuestionDefinition(family));
    if (family && isGeneratedQuestionDefinition(family)) for (let seed = 1; seed <= 30; seed += 1) assert.ok([2, 5, 10].includes(Number(buildGeneratedQuestion(family, { seed }).sampledParams.a)));
  }
});

run("every generated Band preserves its atomic fact-family identity", () => {
  assert.deepEqual(atomicSkillIdentityIssues(FOUNDATIONAL_QUESTIONS), []);
  const valid = generatedDefinition("MVP_AR_MUL_F_2_5_10_B_A");
  const drifted = { ...valid, id: "TEST_DRIFT", params: { ...valid.params, a: { type: "natural" as const, min: 2, max: 10 } } };
  assert.ok(atomicSkillIdentityIssues([drifted]).some((issue) => issue.includes("drifts outside")));
});

run("conceptual banks cover equality, fractions, and integers", () => {
  const categories = (id: string) => new Set(FOUNDATIONAL_QUESTIONS.filter((item) => item.skillId === id).map((item) => item.category));
  assert.ok(categories("ALG_EQUALITY").has("conceptual") && categories("ALG_EQUALITY").has("reasoning"));
  assert.ok(categories("FRAC_MEANING").has("representation") && categories("FRAC_EQUIV").has("reasoning"));
  assert.ok(categories("INT_NUMBER_LINE").has("representation") && categories("INT_COMPARE").has("reasoning") && categories("INT_NEGATION").has("conceptual"));
});

run("every ready definition carries category and meaningful band metadata", () => {
  for (const definition of FOUNDATIONAL_QUESTIONS) { assert.ok(definition.category); assert.ok(definition.difficultyBand); }
  for (const entry of CONTENT_READINESS) assert.deepEqual(readinessIssues(entry, FOUNDATIONAL_QUESTIONS), []);
});

run("QuestionCategory follows the cognitive task instead of Band alternation", () => {
  assert.deepEqual(questionCategorySemanticsIssues(FOUNDATIONAL_QUESTIONS), []);
  const magnitude = generatedDefinition("MVP_FRAC_MEANING_PARTS_A");
  const recategorizedBand = { ...generatedDefinition("MVP_FRAC_MEANING_PARTS_B"), category: "reasoning" as const };
  assert.ok(questionCategorySemanticsIssues([magnitude, recategorizedBand]).some((issue) => issue.includes("must not alternate")));
  const representation = generatedDefinition("MVP_FRAC_MEANING_NUMBER_LINE_B");
  assert.ok(questionCategorySemanticsIssues([{ ...representation, metadata: { ...representation.metadata, representationKind: undefined } }]).some((issue) => issue.includes("representationKind")));
});

run("fraction meaning covers components, sets, and a genuine number-line representation", () => {
  for (const id of ["MVP_FRAC_MEANING_NUMERATOR_A", "MVP_FRAC_MEANING_DENOMINATOR_A", "MVP_FRAC_MEANING_SET_B"]) {
    assert.equal(generatedDefinition(id).category, "conceptual", id);
  }
  const numberLineDefinition = generatedDefinition("MVP_FRAC_MEANING_NUMBER_LINE_B");
  const numberLine = buildGeneratedQuestion(numberLineDefinition, { seed: 13 });
  assert.equal(numberLineDefinition.category, "representation");
  assert.equal(numberLineDefinition.metadata?.representationKind, "number-line-to-fraction");
  assert.ok(numberLine.prompt.some((part) => part.kind === "math" && part.display));
});

run("new foundational bridge families cover same precedence and signed comparison/subtraction", () => {
  for (const id of ["MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_ADDSUB_A", "MVP_OPS_ORDER_BASIC_LEFT_TO_RIGHT_DIVMUL_B"]) {
    assert.equal(generatedDefinition(id).contentFamily, "OPS_ORDER_BASIC:same-precedence-left-to-right");
  }
  const bridge = buildGeneratedQuestion(generatedDefinition("MVP_INT_SUB_POS_MINUS_LARGER_POS_A"), { seed: 8 });
  assert.equal(bridge.type, "numeric");
  assert.ok(Number(bridge.correctAnswers[0]) < 0);
  const comparison = buildGeneratedQuestion(generatedDefinition("MVP_INT_COMPARE_NEGATIVE_POSITIVE_A"), { seed: 8 });
  assert.deepEqual(correctOptionTexts(comparison), ["<"]);
});

run("zero is retained as an explicitly justified negation edge case", () => {
  const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_INT_NEGATION_ZERO_CURATED");
  assert.ok(definition && !isGeneratedQuestionDefinition(definition) && definition.type === "singleChoice");
  assert.equal(definition.curationReason, "edge-case");
  assert.match(definition.curationJustificationHe ?? "", /אפס|0/u);
  assert.deepEqual(renderedText(definition.options.find((option) => option.id === definition.correctOptionId)!.content), "0");
});

run("equality evidence targets both sides rather than arithmetic laws", () => {
  const families = ["MVP_ALG_EQUALITY_A", "MVP_ALG_EQUALITY_B", "MVP_ALG_EQUALITY_C"].map((id) => generatedDefinition(id).contentFamily);
  assert.deepEqual(families, ["ALG_EQUALITY:noncanonical-equality", "ALG_EQUALITY:missing-value-both-sides", "ALG_EQUALITY:equal-expression-relation"]);
  for (const id of ["MVP_ALG_EQUALITY_A", "MVP_ALG_EQUALITY_B", "MVP_ALG_EQUALITY_C"]) {
    const question = buildGeneratedQuestion(generatedDefinition(id), { seed: 29 });
    assert.equal(new Set(optionTexts(question)).size, optionTexts(question).length, id);
  }
});

run("active distractors contain specific rationales and no author-review fallback", () => {
  for (const definition of FOUNDATIONAL_QUESTIONS) {
    const question = isGeneratedQuestionDefinition(definition) ? buildGeneratedQuestion(definition, { seed: 7 }) : definition;
    if (question.type === "numeric") continue;
    const correctIds = question.type === "singleChoice" ? [question.correctOptionId] : question.correctOptionIds;
    for (const option of question.options.filter((item) => !correctIds.includes(item.id))) {
      assert.ok(option.misconceptionId, `${definition.id}:${option.id}`);
      assert.ok(option.misconceptionRationale, `${definition.id}:${option.id}:rationale`);
      assert.doesNotMatch(option.misconceptionRationale ?? "", /requiring author review/iu, `${definition.id}:${option.id}:fallback`);
    }
  }
});

run("foundational authoring intent and normalized inventory stay explicit", () => {
  const audit = auditFoundationalContent();
  assert.deepEqual({ total: audit.total, generated: audit.generated, curatedFixed: audit.curatedFixed, fixedNumeric: audit.fixedNumeric }, { total: 179, generated: 176, curatedFixed: 3, fixedNumeric: 0 });
  for (const definition of FOUNDATIONAL_QUESTIONS) {
    assert.ok(definition.contentFamily, definition.id);
    if (isGeneratedQuestionDefinition(definition)) {
      assert.equal(definition.authoringMode, "generated", definition.id);
      if (!definition.choiceBuilder) assert.deepEqual(definition.answerSemantics, { kind: "exact" }, definition.id);
    } else {
      assert.equal(definition.authoringMode, "curated", definition.id);
      assert.ok(definition.curationReason, definition.id);
      if (definition.type === "singleChoice") {
        for (const option of definition.options) {
          assert.equal(!!option.misconceptionId, option.id !== definition.correctOptionId, `${definition.id}:${option.id}`);
          assert.equal(!!option.misconceptionRationale, option.id !== definition.correctOptionId, `${definition.id}:${option.id}:rationale`);
        }
      }
    }
  }
});

run("foundational generators cover exact edge cases deterministically", () => {
  const generated = (id: string) => {
    const definition = FOUNDATIONAL_QUESTIONS.find((item) => item.id === id);
    assert.ok(definition && isGeneratedQuestionDefinition(definition), id);
    return definition;
  };
  const sequence = (values: number[]) => { let index = 0; return () => values[index++] ?? values.at(-1) ?? 0; };
  const addWithZero = buildGeneratedQuestion(generated("MVP_AR_ADD_FACTS_A_A"), { rng: sequence([0, 0]) });
  assert.equal(addWithZero.type, "numeric");
  assert.deepEqual(addWithZero.sampledParams, { a: "0", b: "1" });
  assert.equal(addWithZero.correctAnswers[0], "1");
  const oppositeSigns = buildGeneratedQuestion(generated("MVP_INT_ADD_OPPOSITES_A"), { rng: sequence([0, 0]) });
  assert.equal(oppositeSigns.type, "singleChoice");
  assert.equal(oppositeSigns.renderedExpression, "(-2)+2");
  assert.deepEqual(correctOptionTexts(oppositeSigns), ["0"]);
  const negativeOne = buildGeneratedQuestion(generated("MVP_INT_MUL_NEG_POS_A"), { rng: sequence([0, 0]) });
  assert.equal(negativeOne.type, "numeric");
  assert.equal(negativeOne.correctAnswers[0], "-1");
  const exactNegativeDivision = buildGeneratedQuestion(generated("MVP_INT_DIV_NEG_POS_A"), { rng: sequence([0, 0]) });
  assert.equal(exactNegativeDivision.type, "numeric");
  assert.equal(exactNegativeDivision.correctAnswers[0], "-1");
});

run("full content validation checks configured samples and reports review families", () => {
  const report = validateFoundationalContent(20);
  assert.deepEqual(report.issues, []);
  assert.equal(report.generatedSamples, 176 * 20);
  assert.deepEqual(report.warnings, []);
});

run("every generated singleChoice sample has exactly one marked correct option", () => {
  const definitions = FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && !!item.choiceBuilder);
  for (const definition of definitions) for (let seed = 1; seed <= 5; seed += 1) {
    const question = buildGeneratedQuestion(definition, { seed });
    if (question.type !== "singleChoice") continue;
    assert.equal(question.options.filter((option) => option.id === question.correctOptionId).length, 1, `${definition.id}:${seed}`);
  }
});

run("fixed numeric literals are exceptional and require explicit pedagogical justification", () => {
  assert.deepEqual(curatedNumericLiteralItems(FOUNDATIONAL_QUESTIONS).map((item) => item.definitionId), ["MVP_INT_NEGATION_ZERO_CURATED", "MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED"]);
  assert.deepEqual(curatedNumericLiteralIssues(FOUNDATIONAL_QUESTIONS), []);
  const base: SkillQuestionDefinition = {
    id: "TEST_FIXED_7", topicId: "FOUNDATIONS", skillId: "INT_COMPARE", type: "singleChoice", authoringMode: "curated", contentFamily: "test:fixed", category: "conceptual", difficultyBand: "A", difficulty: 0.1,
    prompt: [{ kind: "text", value: "איזה מספר גדול מ־7?" }], options: [{ id: "o0", content: [{ kind: "text", value: "8" }] }, { id: "o1", content: [{ kind: "text", value: "6" }] }], correctOptionId: "o0",
  };
  assert.match(curatedNumericLiteralIssues([base])[0]!, /curationReason/);
  assert.match(curatedNumericLiteralIssues([{ ...base, curationReason: "edge-case" }])[0]!, /curationJustificationHe/);
  assert.deepEqual(curatedNumericLiteralIssues([{ ...base, curationReason: "edge-case", curationJustificationHe: "הערך המדויק מפעיל מקרה קצה שנבדק במפורש." }]), []);
  assert.match(curatedNumericLiteralIssues([{ ...base, curationReason: "other", curationJustificationHe: "סיבה כללית." }])[0]!, /approved curationReason/);
  assert.ok(curatedNumericLiteralIssues([{ ...base, curationReason: "deliberate-example", curationJustificationHe: "דוגמה נוחה" }]).length > 0);
});

run("all globally audited routine numeric concept families are generated", () => {
  const convertedSkills = ["INT_COMPARE", "INT_NEGATION", "INT_ADD", "INT_SUB", "INT_MUL", "INT_DIV", "ALG_EQUALITY", "ALG_VARIABLE", "ALG_SUBSTITUTE", "EQ_ADD", "EQ_MUL"];
  for (const skillId of convertedSkills) {
    assert.ok(FOUNDATIONAL_QUESTIONS.some((item) => item.skillId === skillId && isGeneratedQuestionDefinition(item) && !!item.choiceBuilder), skillId);
    assert.equal(FOUNDATIONAL_QUESTIONS.some((item) => item.skillId === skillId && item.id.startsWith(`MVP_${skillId}_CONCEPT_`)), false, skillId);
  }
  const retained = FOUNDATIONAL_QUESTIONS.filter((item) => !isGeneratedQuestionDefinition(item));
  assert.deepEqual(retained.map((item) => item.id), ["MVP_INT_NEGATION_ZERO_CURATED", "MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED", "MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED"]);
  const retainedItem = retained[1]!;
  if (isGeneratedQuestionDefinition(retainedItem)) throw new Error("Expected curated wording item");
  assert.equal(retainedItem.curationReason, "deliberate-example");
  assert.ok(retainedItem.curationJustificationHe);
});

run("reviewed place-value and fraction-meaning repetitions are generated", () => {
  const place = buildGeneratedQuestion(generatedDefinition("MVP_AR_PLACE_VALUE_GEN_A"), { seed: 41 });
  assert.equal(place.type, "singleChoice");
  assert.match(renderedText(place.prompt), /מה הערך של ספרת/);
  assert.equal(place.skillId, "AR_PLACE_VALUE");
  const fraction = buildGeneratedQuestion(generatedDefinition("MVP_FRAC_MEANING_PARTS_B"), { seed: 41 });
  assert.equal(fraction.type, "singleChoice");
  const denominator = fraction.sampledParams.a; const numerator = fraction.sampledParams.b;
  assert.deepEqual(correctOptionTexts(fraction), [`${numerator}/${denominator}`]);
  assert.match(renderedText(fraction.prompt), /חלקים שווים/);
});

run("equivalent-fraction generators cover expansion and reverse simplification", () => {
  for (const id of ["MVP_FRAC_EQUIV_FORWARD_B", "MVP_FRAC_EQUIV_REVERSE_B"]) {
    const question = buildGeneratedQuestion(generatedDefinition(id), { seed: 27 });
    assert.equal(question.type, "singleChoice");
    const answers = correctOptionTexts(question); assert.equal(answers.length, 1);
    const expected = id.includes("FORWARD") ? Number(question.sampledParams.a) * Number(question.sampledParams.c) : Number(question.sampledParams.b);
    assert.deepEqual(answers, [`${expected}`], id);
    assert.match(renderedText(question.prompt), /שוויון|צמצום/u);
  }
  assert.deepEqual(["A", "B", "C"].map((band) => generatedDefinition(`MVP_FRAC_EQUIV_FORWARD_${band}`).metadata?.structuralStage), ["recognize-simple-scaling", "complete-missing-numerator", "detect-unstated-common-scale"]);
  assert.deepEqual(["A", "B", "C"].map((band) => generatedDefinition(`MVP_FRAC_EQUIV_REVERSE_${band}`).metadata?.structuralStage), ["recognize-simple-simplification", "complete-missing-denominator", "fully-simplify-without-supplied-factor"]);
});

run("fraction-equivalence Band C requires detecting an unstated simplification factor", () => {
  const forward = generatedDefinition("MVP_FRAC_EQUIV_FORWARD_C");
  const reverse = generatedDefinition("MVP_FRAC_EQUIV_REVERSE_C");
  assert.equal(forward.version, 6);
  assert.equal(reverse.version, 6);
  for (let seed = 1; seed <= 50; seed += 1) {
    const forwardQuestion = buildGeneratedQuestion(forward, { seed });
    const reverseQuestion = buildGeneratedQuestion(reverse, { seed });
    assert.doesNotMatch(renderedText(forwardQuestion.prompt), /גורם משותף|הוכפלו באותו מספר/u);
    assert.match(renderedText(reverseQuestion.prompt), /הצמצום המלא ביותר/u);
    assert.doesNotMatch(renderedText(reverseQuestion.prompt), /גורם משותף|מחלקים.*ב־/u);
    const a = Number(reverseQuestion.sampledParams.a); const b = Number(reverseQuestion.sampledParams.b);
    let left = a; let right = b;
    while (right !== 0) [left, right] = [right, left % right];
    assert.equal(left, 1, `${reverse.id}:${seed}: fully reduced target`);
  }
});

run("multiplication generators use concrete contexts without ambiguous addition", () => {
  for (const skillId of ["AR_MUL_F_2_5_10", "AR_MUL_F_3_4", "AR_MUL_F_6_7", "AR_MUL_F_8_9"]) {
    const definition = generatedDefinition(`MVP_${skillId}_CONTEXT_A`);
    for (let seed = 1; seed <= 100; seed += 1) {
      const question = buildGeneratedQuestion(definition, { seed });
      const a = Number(question.sampledParams.a); const b = Number(question.sampledParams.b);
      assert.notEqual(a + b, a * b, `${skillId}:${seed}`);
      assert.match(renderedText(question.prompt), /(שקיות|קופסאות|מדפים|צלחות).+(כדורים|קלפים|ספרים|עוגיות).+\?/);
      assert.equal(new Set(optionTexts(question)).size, optionTexts(question).length);
    }
  }
});

run("division generators preserve equal-sharing and grouping meanings", () => {
  const sharing = buildGeneratedQuestion(generatedDefinition("MVP_AR_DIV_F_3_4_SHARING_A"), { seed: 12 });
  const grouping = buildGeneratedQuestion(generatedDefinition("MVP_AR_DIV_F_3_4_GROUPING_A"), { seed: 12 });
  assert.match(renderedText(sharing.prompt), /מחלקים.+שווה בשווה.+כמה (כדורים|ספרים|עוגיות|תפוחים)/);
  assert.match(renderedText(grouping.prompt), /כמה (שקיות|מדפים|צלחות|סלים) צריך/);
  assert.equal(sharing.skillId, "AR_DIV_F_3_4");
  assert.equal(grouping.skillId, "AR_DIV_F_3_4");
});

run("factors and multiples generator uses multiChoice with exactly the valid multiples", () => {
  const definition = generatedDefinition("MVP_AR_FACTORS_MULTIPLES_MULTI_B");
  for (let seed = 1; seed <= 100; seed += 1) {
    const question = buildGeneratedQuestion(definition, { seed });
    assert.equal(question.type, "multiChoice");
    const divisor = Number(question.sampledParams.a);
    assert.equal(correctOptionTexts(question).length, 2);
    for (const value of correctOptionTexts(question)) assert.equal(Number(value) % divisor, 0);
    for (const value of optionTexts(question).filter((value) => !correctOptionTexts(question).includes(value))) assert.notEqual(Number(value) % divisor, 0);
    assert.deepEqual(factorMultipleSemanticIssues(definition, question, seed), []);
    assert.match(renderedText(question.prompt), /^איזה מהמספרים הבאים/);
  }
});

run("factor identification is explicit multiChoice evidence", () => {
  for (const band of ["A", "B", "C"]) {
    const definition = generatedDefinition(`MVP_AR_FACTORS_MULTIPLES_FACTORS_${band}`);
    for (let seed = 1; seed <= 100; seed += 1) {
      const question = buildGeneratedQuestion(definition, { seed });
      assert.equal(question.type, "multiChoice");
      const product = Number(question.sampledParams.a) * Number(question.sampledParams.b);
      assert.match(renderedText(question.prompt), new RegExp(`גורמים של ${product}`));
      assert.equal(correctOptionTexts(question).length, 2);
      for (const value of correctOptionTexts(question)) assert.equal(product % Number(value), 0);
      for (const value of optionTexts(question).filter((value) => !correctOptionTexts(question).includes(value))) assert.notEqual(product % Number(value), 0);
      assert.deepEqual(factorMultipleSemanticIssues(definition, question, seed), []);
    }
  }
});

run("place-value progression covers repeated digits, zero placeholders, non-leftmost places, and composition", () => {
  const easy = generatedDefinition("MVP_AR_PLACE_VALUE_GEN_A");
  const intermediate = generatedDefinition("MVP_AR_PLACE_VALUE_GEN_B");
  const composition = generatedDefinition("MVP_AR_PLACE_VALUE_GEN_C");
  assert.equal(easy.metadata?.structuralStage, "two-digit-distinct-nonzero");
  const intermediateSamples = Array.from({ length: 200 }, (_, index) => buildGeneratedQuestion(intermediate, { seed: index + 1 }));
  assert.ok(intermediateSamples.some((question) => Object.values(question.sampledParams).includes("0")), "zero placeholder");
  assert.ok(intermediateSamples.some((question) => {
    const { a, b, c } = question.sampledParams;
    return a === b || a === c || b === c;
  }), "repeated digit");
  assert.ok(intermediateSamples.every((question) => /האחדות|העשרות/u.test(renderedText(question.prompt))), "non-leftmost position");
  const composed = buildGeneratedQuestion(composition, { seed: 41 });
  assert.equal(composition.category, "representation");
  assert.equal(composition.metadata?.representationKind, "expanded-to-standard-form");
  assert.match(renderedText(composed.prompt), /פירוק/u);
  const reverse = generatedDefinition("MVP_AR_PLACE_VALUE_STANDARD_TO_EXPANDED_C");
  const decomposed = buildGeneratedQuestion(reverse, { seed: 41 });
  assert.equal(reverse.category, "representation");
  assert.equal(reverse.metadata?.representationKind, "standard-to-expanded-form");
  assert.match(renderedText(decomposed.prompt), /פירוק מורחב/u);
  assert.match(correctOptionTexts(decomposed)[0]!, /0 \\times\s+100/u);
  const expectedNumber = 1010 * Number(decomposed.sampledParams.a) + Number(decomposed.sampledParams.d);
  assert.match(renderedText(decomposed.prompt), new RegExp(String(expectedNumber)));
  assert.equal(new Set(optionTexts(decomposed)).size, 4);
});

run("direct equality misconception item treats equals as a relation", () => {
  const definition = generatedDefinition("MVP_ALG_EQUALITY_EQUALS_RELATION_A");
  const question = buildGeneratedQuestion(definition, { seed: 7 });
  assert.equal(question.type, "singleChoice");
  assert.equal(definition.category, "conceptual");
  assert.match(renderedText(question.prompt), /\d+ = \d+ \+ \d+/u);
  const misconception = question.options.find((option) => option.misconceptionId === "ALG_EQUALITY:treats-equals-as-next-answer");
  assert.ok(misconception?.misconceptionRationale);
  assert.ok(definition.tags?.includes("requires-rereview"));
  assert.equal(definition.version, 5);
});

run("algebra-dominated symbolic extensions are removed or replaced by clean target-Skill evidence", () => {
  for (const retired of [
    "MVP_AR_ADD_FACTS_COMMUTE_C",
    "MVP_FRAC_MEANING_PARTS_D",
    "MVP_INT_SUB_NEGATIVE_REWRITE_B",
    "MVP_INT_DIV_NEG_POS_B",
    "MVP_INT_DIV_POS_NEG_B",
    "MVP_INT_DIV_NEG_NEG_B",
  ]) assert.equal(FOUNDATIONAL_QUESTIONS.some((item) => item.id === retired), false, retired);
  for (const id of ["MVP_INT_ADD_OPPOSITES_B", "MVP_INT_NUMBER_LINE_LEFT_C"]) {
    const definition = generatedDefinition(id);
    assert.deepEqual(definition.studentFacingSymbols ?? [], [], id);
    assert.ok(definition.tags?.includes("requires-rereview"), id);
  }
  assert.equal(generatedDefinition("MVP_INT_NUMBER_LINE_LEFT_C").metadata?.structuralStage, "multi-step-crosses-zero");
  const opposites = generatedDefinition("MVP_INT_ADD_OPPOSITES_B");
  assert.equal(opposites.version, 6);
  assert.equal(opposites.metadata?.diagnosticStructure, "cancel-additive-opposites-then-retain-middle-addend");
  assert.equal(opposites.metadata?.remainingAddendSign, "positive-or-negative");
  assert.match(String(opposites.metadata?.signPattern), /remaining addend may be positive or negative/u);
});

run("number-line and subtraction generators use clarified purposeful wording", () => {
  const numberLine = buildGeneratedQuestion(generatedDefinition("MVP_INT_NUMBER_LINE_LEFT_A"), { seed: 8 });
  assert.match(renderedText(numberLine.prompt), /משמאל.*(?:אפס|0).*ישר המספרים/u);
  assert.equal(FOUNDATIONAL_QUESTIONS.some((item) => item.id.startsWith("MVP_AR_SUB_FACTS_CONCEPT_")), false);
  const removal = buildGeneratedQuestion(generatedDefinition("MVP_AR_SUB_FACTS_REMOVE_A"), { seed: 8 });
  assert.match(renderedText(removal.prompt), /\?/);
  assert.equal(removal.skillId, "AR_SUB_FACTS");
  assert.equal(FOUNDATIONAL_QUESTIONS.some((item) => item.id.startsWith("MVP_AR_SUB_FACTS_INVERSE_")), false);
  const crossZero = generatedDefinition("MVP_INT_NUMBER_LINE_LEFT_C");
  assert.deepEqual(crossZero.constraints, ["steps > start"]);
  for (let seed = 1; seed <= 100; seed += 1) {
    const question = buildGeneratedQuestion(crossZero, { seed });
    assert.ok(Number(question.sampledParams.steps) > Number(question.sampledParams.start));
    assert.deepEqual(correctOptionTexts(question), [`${Number(question.sampledParams.start) - Number(question.sampledParams.steps)}`]);
    assert.doesNotMatch(renderedText(question.prompt), /\bn\b/u);
  }
});

run("magnitude-driven Bands progress monotonically", () => {
  assert.deepEqual(magnitudeBandProgressionIssues(FOUNDATIONAL_QUESTIONS), []);
  const easier = generatedDefinition("MVP_AR_ADD_FACTS_A_A").params.a;
  const harder = generatedDefinition("MVP_AR_ADD_FACTS_B_A").params.a;
  assert.ok(easier.type !== "rational" && harder.type !== "rational" && harder.min >= easier.max);
});

run("student-facing mathematical objects use math content instead of RTL text", () => {
  const comparison = buildGeneratedQuestion(generatedDefinition("MVP_INT_COMPARE_SIGNED_A"), { seed: 19 });
  assert.equal(comparison.prompt.filter((part) => part.kind === "math").length, 3);
  assert.deepEqual(studentMathContentIssues(comparison.templateId, comparison, "test"), []);
  assert.ok(comparison.type !== "numeric" && comparison.options.filter((option) => option.content.some((part) => part.kind === "math")).length >= 3);

  const signed = buildGeneratedQuestion(generatedDefinition("MVP_INT_SUB_NEGATIVE_REWRITE_A"), { seed: 19 });
  assert.ok(signed.prompt.some((part) => part.kind === "math" && part.latex.includes("-")));
  assert.deepEqual(studentMathContentIssues(signed.templateId, signed, "test"), []);

  const invalid = { ...comparison, prompt: [{ kind: "text" as const, value: "השוו בין -3 לבין -4" }] };
  assert.ok(studentMathContentIssues("TEST_PLAIN_TEXT_MATH", invalid).length > 0);
  assert.ok(studentMathContentIssues("TEST_CONSECUTIVE_SIGNS", { ...comparison, prompt: [{ kind: "math", latex: "5+-3" }] }).some((issue) => issue.includes("consecutive operators")));
  assert.ok(studentMathContentIssues("TEST_MALFORMED_FRACTION", { ...comparison, prompt: [{ kind: "math", latex: "3/" }] }).some((issue) => issue.includes("malformed fraction")));
});

run("mathematical data inside word problems is emitted as inline math", () => {
  const cases = [
    ["MVP_AR_SUB_FACTS_REMOVE_A", 2],
    ["MVP_AR_MUL_F_3_4_CONTEXT_A", 2],
    ["MVP_AR_DIV_F_3_4_SHARING_A", 2],
    ["MVP_INT_NUMBER_LINE_LEFT_A", 1],
    ["MVP_FRAC_MEANING_PARTS_A", 2],
  ] as const;
  for (const [id, minimumMathSegments] of cases) {
    const question = buildGeneratedQuestion(generatedDefinition(id), { seed: 23 });
    assert.ok(question.prompt.filter((part) => part.kind === "math").length >= minimumMathSegments, id);
    assert.deepEqual(studentMathContentWarnings(id, question, "test"), [], id);
  }
  const question = buildGeneratedQuestion(generatedDefinition("MVP_AR_SUB_FACTS_REMOVE_A"), { seed: 23 });
  assert.ok(studentMathContentWarnings("TEST_PROSE_DATA", { ...question, prompt: [{ kind: "text", value: "יש 12 כדורים" }] }).some((warning) => warning.includes("prose number")));
});

run("Skill-targeting checks reject arithmetic-only substitutes for algebra and equation evidence", () => {
  for (const id of ["MVP_ALG_SUBSTITUTE_A", "MVP_EQ_ADD_A", "MVP_EQ_MUL_A", "MVP_AR_FACTORS_MULTIPLES_A_A"]) {
    const definition = generatedDefinition(id);
    assert.deepEqual(pedagogicalTargetingIssues(definition, buildGeneratedQuestion(definition, { seed: 17 }), 17), [], id);
  }
  const equationDefinition = generatedDefinition("MVP_EQ_ADD_A");
  const equation = buildGeneratedQuestion(equationDefinition, { seed: 17 });
  assert.deepEqual(correctOptionTexts(equation), [equation.sampledParams.a]);
  assert.ok(pedagogicalTargetingIssues(equationDefinition, { ...equation, prompt: authoredStudentContent("חשבו את הסכום.") }, 17).some((issue) => issue.includes("equation")));
  const variableDefinition = generatedDefinition("MVP_ALG_VARIABLE_A");
  const variable = buildGeneratedQuestion(variableDefinition, { seed: 17 });
  assert.ok(pedagogicalTargetingIssues(variableDefinition, { ...variable, prompt: authoredStudentContent("[[x]] הוא מספר.") }, 17).some((issue) => issue.includes("imprecisely")));
  for (const retired of ["MVP_ALG_SUBSTITUTE_A_A", "MVP_EQ_ADD_A_A", "MVP_EQ_MUL_A_A"]) assert.equal(FOUNDATIONAL_QUESTIONS.some((item) => item.id === retired), false, retired);
});

run("algebra and equation Bands use deterministic structural progression", () => {
  assert.deepEqual(structuralBandProgressionIssues(FOUNDATIONAL_QUESTIONS), []);
  for (const skillId of ["ALG_EQUALITY", "ALG_VARIABLE", "ALG_SUBSTITUTE", "EQ_ADD", "EQ_MUL"]) {
    const definitions = FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && item.skillId === skillId && !!item.choiceBuilder);
    assert.deepEqual([...new Set(definitions.map((item) => item.difficultyBand))].sort(), ["A", "B", "C"]);
    assert.ok(definitions.every((item) => item.metadata?.difficultyFeature === "structure"));
    for (const family of new Set(definitions.map((item) => item.contentFamily))) {
      const members = definitions.filter((item) => item.contentFamily === family);
      if (members.length > 1) assert.equal(new Set(members.map((item) => item.metadata?.structuralStage)).size, members.length, `${skillId}:${family}`);
    }
  }
  for (const skillId of ["EQ_ADD", "EQ_MUL"]) {
    for (const definition of FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && item.skillId === skillId && !!item.choiceBuilder)) {
      assert.ok(Object.values(definition.params).every((spec) => spec.type === "rational" || spec.min >= 1));
    }
  }
});

run("structural and magnitude Bands progress deterministically", () => {
  for (const ids of [
    ["MVP_OPS_ORDER_BASIC_FIRST_A", "MVP_OPS_ORDER_BASIC_FIRST_B", "MVP_OPS_ORDER_BASIC_FIRST_C"],
    ["MVP_INT_COMPARE_SIGNED_A", "MVP_INT_COMPARE_SIGNED_B", "MVP_INT_COMPARE_SIGNED_C"],
  ]) {
    const definitions = ids.map(generatedDefinition);
    assert.equal(new Set(definitions.map((item) => item.exprTemplate)).size, definitions.length);
    assert.equal(new Set(definitions.map((item) => item.metadata?.structuralStage)).size, definitions.length);
    assert.ok(definitions.every((item) => item.metadata?.difficultyFeature === "structure"));
  }
  assert.deepEqual([...new Set(FOUNDATIONAL_QUESTIONS.filter((item) => item.skillId === "INT_NEGATION").map((item) => item.difficultyBand))].sort(), ["A", "B"]);
  assert.deepEqual(magnitudeBandProgressionIssues(FOUNDATIONAL_QUESTIONS), []);
});

run("algebra terminology distinguishes variable, coefficient, and expression value", () => {
  const variableA = buildGeneratedQuestion(generatedDefinition("MVP_ALG_VARIABLE_A"), { seed: 6 });
  const variableB = buildGeneratedQuestion(generatedDefinition("MVP_ALG_VARIABLE_B"), { seed: 6 });
  const variableC = buildGeneratedQuestion(generatedDefinition("MVP_ALG_VARIABLE_C"), { seed: 6 });
  assert.match(renderedText(variableA.prompt), /תפקידה של x/u);
  assert.deepEqual(correctOptionTexts(variableA), ["משתנה; האות x מייצגת ערך מספרי"]);
  assert.match(renderedText(variableB.prompt), /המקדם של x/u);
  assert.deepEqual(correctOptionTexts(variableB), [variableB.sampledParams.n]);
  assert.deepEqual(correctOptionTexts(variableC), ["ערך הביטוי"]);
});

run("substitution distractors represent common student misconceptions", () => {
  const question = buildGeneratedQuestion(generatedDefinition("MVP_ALG_SUBSTITUTE_A"), { seed: 12 });
  assert.equal(question.type, "singleChoice");
  const concatenation = `${question.sampledParams.a}${question.sampledParams.x}`;
  const distractor = question.options.find((option) => renderedText(option.content) === concatenation);
  assert.equal(distractor?.misconceptionId, "ALG_SUBSTITUTE:concatenates-coefficient-and-value");
  assert.equal(generatedDefinition("MVP_ALG_SUBSTITUTE_A").version, 5);
});

run("curated variable meaning uses the two requested contextual questions", () => {
  const basic = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED");
  const reasoning = FOUNDATIONAL_QUESTIONS.find((item) => item.id === "MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED");
  assert.ok(basic && !isGeneratedQuestionDefinition(basic) && basic.type === "singleChoice");
  assert.ok(reasoning && !isGeneratedQuestionDefinition(reasoning) && reasoning.type === "singleChoice");
  assert.equal(basic.category, "conceptual");
  assert.equal(reasoning.category, "reasoning");
  assert.deepEqual(basic.options.find((option) => option.id === basic.correctOptionId)?.content, [{ kind: "text", value: "מספר התלמידים בקבוצה" }]);
  assert.match(renderedText(reasoning.prompt), /18.*25/u);
  assert.ok(reasoning.prompt.filter((part) => part.kind === "math").length >= 4);
  assert.match(renderedText(reasoning.options.find((option) => option.id === reasoning.correctOptionId)!.content), /יכול להשתנות/u);
});

run("algebra and equation difficulty uses explicit cognitive structures rather than arbitrary magnitude", () => {
  for (const skillId of ["ALG_EQUALITY", "ALG_SUBSTITUTE", "EQ_ADD", "EQ_MUL"]) {
    const definitions = FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && item.skillId === skillId && !!item.choiceBuilder);
    assert.ok(definitions.every((item) => item.metadata?.difficultyFeature === "structure"));
    assert.ok(definitions.every((item) => typeof item.metadata?.structuralStage === "string"));
  }
  assert.equal(generatedDefinition("MVP_ALG_EQUALITY_A").contentFamily, "ALG_EQUALITY:noncanonical-equality");
  assert.equal(generatedDefinition("MVP_ALG_EQUALITY_C").contentFamily, "ALG_EQUALITY:equal-expression-relation");
  const substituteB = buildGeneratedQuestion(generatedDefinition("MVP_ALG_SUBSTITUTE_B"), { seed: 15 });
  const substituteC = buildGeneratedQuestion(generatedDefinition("MVP_ALG_SUBSTITUTE_C"), { seed: 15 });
  assert.ok(correctOptionTexts(substituteB)[0]?.includes("a"));
  assert.ok(correctOptionTexts(substituteC)[0]?.includes("a") && correctOptionTexts(substituteC)[0]?.includes("b"));
  const symbolic = generatedDefinition("MVP_EQ_MUL_C");
  assert.deepEqual(symbolicAuthoringIssues(symbolic), []);
  assert.ok(symbolicAuthoringIssues({ ...symbolic, studentFacingSymbols: ["n"] }).some((issue) => issue.includes("both a sampled parameter")));
});

run("choice and prompt content preserve mixed math rendering and RTL isolation semantics", () => {
  const negativeChoice = authoredChoiceContent("-3");
  const algebraChoice = authoredChoiceContent("a + 2x");
  const fractionMultiChoice = { id: "fraction", content: authoredChoiceContent("3/4") };
  const mixedPrompt = authoredStudentContent("השוו בין [[-4]] לבין [[-7]].");
  assert.equal(DEFAULT_CONTENT_DIRECTION, "rtl");
  for (const content of [negativeChoice, algebraChoice, fractionMultiChoice.content]) {
    assert.equal(content.length, 1);
    assert.equal(content[0]?.kind, "math");
    assert.equal(contentSegmentDirection(content[0]!), "ltr");
  }
  assert.deepEqual(mixedPrompt.map((part) => part.kind), ["text", "math", "text", "math", "text"]);
  assert.ok(mixedPrompt.filter((part) => part.kind === "math").every((part) => contentSegmentDirection(part) === "ltr"));
});

run("negative and opposite-number content remains math-rendered in prompts and choices", () => {
  const positive = buildGeneratedQuestion(generatedDefinition("MVP_INT_NEGATION_POSITIVE_A"), { seed: 11 });
  const negative = buildGeneratedQuestion(generatedDefinition("MVP_INT_NEGATION_NEGATIVE_B"), { seed: 11 });
  for (const question of [positive, negative]) {
    assert.ok(question.prompt.some((part) => part.kind === "math"));
    assert.ok(question.type !== "numeric" && question.options.some((option) => option.content.some((part) => part.kind === "math" && part.latex.includes("-"))));
  }
  assert.match(generatedDefinition("MVP_INT_NEGATION_POSITIVE_A").exprTemplate, /^-\(/u);
  assert.match(generatedDefinition("MVP_INT_NEGATION_NEGATIVE_B").exprTemplate, /^-\(-/u);
});

run("every generated Band documents its actual difficulty feature", () => {
  for (const definition of FOUNDATIONAL_QUESTIONS) {
    if (!isGeneratedQuestionDefinition(definition)) continue;
    assert.ok(["magnitude", "structure", "mixed"].includes(String(definition.metadata?.difficultyFeature)), definition.id);
  }
});

run("signed-operation families use explicit positive magnitudes and stable sign metadata", () => {
  assert.deepEqual(signedSkillDefinitionIssues(FOUNDATIONAL_QUESTIONS), []);
  for (const definition of FOUNDATIONAL_QUESTIONS) {
    if (!isGeneratedQuestionDefinition(definition) || !["INT_ADD", "INT_SUB", "INT_MUL", "INT_DIV"].includes(definition.skillId ?? "")) continue;
    for (let seed = 1; seed <= 100; seed += 1) {
      const question = buildGeneratedQuestion(definition, { seed });
      assert.deepEqual(signedGeneratedInstanceIssues(definition, question), [], `${definition.id}:${seed}`);
      assert.deepEqual(generatedInstanceMetadataIssues(definition, question), [], `${definition.id}:${seed}`);
    }
    if (definition.category === "calculation") {
      assert.ok(Object.values(definition.params).every((spec) => spec.type === "natural"), definition.id);
      assert.equal(typeof definition.metadata?.signPattern, "string", definition.id);
    }
  }
});

run("signed multiplication and division never produce ordinary positive-only operands", () => {
  for (const skillId of ["INT_MUL", "INT_DIV"]) {
    const definitions = FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && item.skillId === skillId && item.category === "calculation");
    assert.ok(definitions.some((item) => String(item.metadata?.signPattern).startsWith("negative")));
    assert.ok(definitions.some((item) => String(item.metadata?.signPattern).includes("negative×negative") || String(item.metadata?.signPattern).includes("negative÷negative")));
    for (const definition of definitions) for (let seed = 1; seed <= 50; seed += 1) {
      assert.match(buildGeneratedQuestion(definition, { seed }).renderedExpression, /\(-/u, `${definition.id}:${seed}`);
    }
  }
});

run("signed multiplication avoids arbitrary two-digit by two-digit load", () => {
  const calculations = FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && item.skillId === "INT_MUL" && item.category === "calculation");
  assert.deepEqual([...new Set(calculations.map((item) => item.difficultyBand))].sort(), ["A", "B"]);
  for (const definition of calculations.filter((item) => item.difficultyBand === "B")) for (let seed = 1; seed <= 50; seed += 1) {
    const question = buildGeneratedQuestion(definition, { seed });
    assert.ok([10, 11, 20, 30].includes(Number(question.sampledParams.m)), `${definition.id}:${seed}`);
    assert.ok(Number(question.sampledParams.n) <= 10, `${definition.id}:${seed}`);
  }
  assert.equal(calculations.some((item) => item.difficultyBand === "C"), false);
  assert.deepEqual(signedMultiplicationLoadIssues(FOUNDATIONAL_QUESTIONS), []);
  const valid = generatedDefinition("MVP_INT_MUL_NEG_POS_B");
  const overloaded = { ...valid, id: "TEST_OVERLOADED_SIGNED_MUL", params: { ...valid.params, n: { type: "natural" as const, min: 11, max: 30 } } };
  assert.match(signedMultiplicationLoadIssues([overloaded])[0]!, /two-digit by two-digit/);
});

run("signed division keeps concrete calculation and small-magnitude sign reasoning", () => {
  for (const family of ["NEG_POS", "POS_NEG", "NEG_NEG"]) {
    const concrete = buildGeneratedQuestion(generatedDefinition(`MVP_INT_DIV_${family}_A`), { seed: 23 });
    assert.equal(concrete.type, "numeric");
    assert.equal(FOUNDATIONAL_QUESTIONS.some((item) => item.id === `MVP_INT_DIV_${family}_B`), false);
  }
  for (const band of ["A", "B"]) {
    const sign = generatedDefinition(`MVP_INT_DIV_SIGN_${band}`);
    assert.ok(Object.values(sign.params).every((spec) => spec.type === "rational" || spec.max <= 9));
    assert.equal(sign.category, "conceptual");
  }
});

run("definition-level supporting Skills remain available without masking target-Skill drift", () => {
  const algebraSource = generatedDefinition("MVP_ALG_VARIABLE_A");
  const annotated = { ...algebraSource, id: "TEST_SYMBOLIC_INT_ADD", skillId: "INT_ADD", supportingSkills: ["ALG_VARIABLE"] };
  assert.deepEqual(supportingSkillMetadataIssues(annotated), []);
  const unannotated = { ...annotated, supportingSkills: undefined };
  assert.ok(supportingSkillMetadataIssues(unannotated).some((issue) => issue.includes("ALG_VARIABLE")));
  assert.ok(studentFacingVariableSupportIssues(unannotated, buildGeneratedQuestion(unannotated, { seed: 1 })).some((issue) => issue.includes("student-facing algebraic variables")));
});

run("supporting Skill metadata rejects invalid identity and does not turn equality into equation solving", () => {
  const definition = { ...generatedDefinition("MVP_ALG_VARIABLE_A"), id: "TEST_SYMBOLIC_INT_ADD", skillId: "INT_ADD", supportingSkills: ["ALG_VARIABLE"] };
  assert.ok(supportingSkillMetadataIssues({ ...definition, supportingSkills: ["MISSING"] }).some((issue) => issue.includes("unknown supporting Skill")));
  assert.ok(supportingSkillMetadataIssues({ ...definition, supportingSkills: ["INT_ADD"] }).some((issue) => issue.includes("target Skill")));
  assert.ok(supportingSkillMetadataIssues({ ...definition, supportingSkills: ["ALG_VARIABLE", "ALG_VARIABLE"] }).some((issue) => issue.includes("duplicates")));
  const equationSupporting = FOUNDATIONAL_QUESTIONS.filter((item) => item.supportingSkills?.some((skillId) => skillId.startsWith("EQ_")));
  assert.deepEqual(equationSupporting, []);
});

run("sign and comparison prompts state the mathematical target explicitly", () => {
  assert.match(renderedText(buildGeneratedQuestion(generatedDefinition("MVP_INT_MUL_SIGN_A"), { seed: 9 }).prompt), /הסימן של המכפלה/);
  assert.match(renderedText(buildGeneratedQuestion(generatedDefinition("MVP_INT_DIV_SIGN_A"), { seed: 9 }).prompt), /הסימן של המנה/);
  for (const band of ["A", "B", "C"]) {
    const comparison = buildGeneratedQuestion(generatedDefinition(`MVP_INT_COMPARE_SIGNED_${band}`), { seed: 9 });
    assert.match(renderedText(comparison.prompt), /ההשוואה/);
    assert.ok(comparison.prompt.some((part) => part.kind === "math" && part.latex.includes("\\square")));
  }
});

run("signed Skill invariants reject positive-only ordinary arithmetic", () => {
  const cases = [
    ["MVP_INT_ADD_NEG_NEG_A", "{m}+{n}"],
    ["MVP_INT_SUB_NEG_MINUS_POS_A", "{m}-{n}"],
    ["MVP_INT_MUL_NEG_POS_A", "{m}*{n}"],
    ["MVP_INT_DIV_NEG_POS_A", "({m}*{n})/{m}"],
  ] as const;
  for (const [id, exprTemplate] of cases) {
    const valid = generatedDefinition(id);
    const invalid = { ...valid, id: `TEST_UNSIGNED_${valid.skillId}`, exprTemplate };
    const question = buildGeneratedQuestion(invalid, { seed: 9 });
    assert.ok(signedGeneratedInstanceIssues(invalid, question).some((issue) => issue.includes("does not contain")), id);
  }
});

run("explicit signed families include negative-positive and negative-negative structures", () => {
  for (const id of ["MVP_INT_MUL_NEG_POS_A", "MVP_INT_MUL_NEG_NEG_A", "MVP_INT_DIV_NEG_POS_A", "MVP_INT_DIV_NEG_NEG_A"]) {
    const definition = generatedDefinition(id);
    const first = buildGeneratedQuestion(definition, { seed: 73 });
    const repeat = buildGeneratedQuestion(definition, { seed: 73 });
    assert.equal(first.id, repeat.id, id);
    assert.equal(first.renderedExpression, repeat.renderedExpression, id);
    assert.match(String(definition.metadata?.signPattern), /negative/u, id);
  }
});

run("zero signed-operation results occur only in an explicit family", () => {
  const definitions = FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && ["INT_ADD", "INT_SUB", "INT_MUL", "INT_DIV"].includes(item.skillId ?? "") && item.category === "calculation");
  for (const definition of definitions) for (let seed = 1; seed <= 50; seed += 1) {
    const question = buildGeneratedQuestion(definition, { seed });
    if (question.type === "numeric" && question.correctAnswers.includes("0")) assert.match(String(definition.metadata?.signPattern), /zero/u, definition.id);
  }
});

run("reviewed conceptual generators preserve attribution, determinism, and unique options", () => {
  const reviewedSkills = new Set(["AR_PLACE_VALUE", "AR_ADD_FACTS", "AR_SUB_FACTS", "AR_FACTORS_MULTIPLES", "OPS_ORDER_BASIC", "INT_NUMBER_LINE", "FRAC_MEANING", "FRAC_EQUIV"]);
  const definitions = FOUNDATIONAL_QUESTIONS.filter((item): item is GeneratedQuestionDefinition & { skillId: string } => isGeneratedQuestionDefinition(item) && !!item.choiceBuilder && (reviewedSkills.has(item.skillId) || item.skillId.startsWith("AR_MUL_F_") || item.skillId.startsWith("AR_DIV_F_")));
  assert.equal(definitions.length, 62);
  for (const definition of definitions) {
    const first = buildGeneratedQuestion(definition, { seed: 73 }); const repeat = buildGeneratedQuestion(definition, { seed: 73 });
    assert.equal(first.id, repeat.id, definition.id);
    assert.equal(renderedText(first.prompt), renderedText(repeat.prompt), definition.id);
    assert.equal(first.skillId, definition.skillId, definition.id);
    assert.notEqual(first.category, "calculation", definition.id);
    assert.equal(new Set(optionTexts(first)).size, optionTexts(first).length, definition.id);
  }
});

run("approved non-signed content remains stable while invalid signed definitions are retired", () => {
  const snapshots = { MVP_OPS_ORDER_BASIC_A_A: ["4+2*2", "8"] } as const;
  for (const [id, expected] of Object.entries(snapshots)) {
    const question = buildGeneratedQuestion(generatedDefinition(id), { seed: 42 });
    assert.equal(question.type, "numeric");
    assert.deepEqual([question.renderedExpression, question.correctAnswers[0]], expected, id);
  }
  assert.equal(FOUNDATIONAL_QUESTIONS.some((item) => ["MVP_INT_ADD_B_A", "MVP_INT_ADD_C_A", "MVP_INT_MUL_A_A", "MVP_INT_MUL_A_B", "MVP_AR_SUB_FACTS_INVERSE_A"].includes(item.id)), false);
  assert.deepEqual(["A", "B", "C"].map((band) => generatedDefinition(`MVP_OPS_ORDER_BASIC_FIRST_${band}`).metadata?.structuralStage), ["two-operations", "three-operations", "parenthesized-priority"]);
});

run("Evidence Policies validate and assignment completion requires coverage and fluency", () => {
  for (const item of SKILLS) assert.deepEqual(validateEvidencePolicy(item.evidencePolicy), []);
  const factSkill = skill("AR_ADD_FACTS");
  const covered = Array.from({ length: 12 }, (_, index) => attempt("AR_ADD_FACTS", index, index < 8 ? "calculation" : "conceptual", index % 2 ? "A" : "B", 2_000));
  const complete = projectMastery({ studentId: "S", skillId: factSkill.id, attempts: covered, fluencyEnabled: true, evidencePolicy: factSkill.evidencePolicy });
  assert.equal(complete.evidenceCoverage?.sufficient, true);
  assert.equal(isAssignmentComplete({ assignmentId: "A", studentId: "S", skillId: factSkill.id, targetMastery: 90, priority: 1, active: true }, complete), true);
  const slow = projectMastery({ studentId: "S", skillId: factSkill.id, attempts: covered.map((item) => ({ ...item, responseTimeMs: 8_000 })), fluencyEnabled: true, evidencePolicy: factSkill.evidencePolicy });
  assert.equal(slow.evidenceCoverage?.sufficient, false);
});

run("challenge profile and version participate in personal-best signatures", () => {
  const signature = createChallengeSignature({ mode: "timed", durationSeconds: 60 }, ["AR_ADD_FACTS"], DOMAINS, SKILLS)!;
  assert.deepEqual(signature.mode === "timed" ? signature.profile : null, { id: "TIMED_FLUENCY", version: 1 });
  if (signature.mode === "timed") assert.notEqual(challengeSignatureKey("S", signature), challengeSignatureKey("S", { ...signature, profile: { ...signature.profile, version: 2 } }));
});

run("Quick Practice excludes incomplete and ineligible content", () => {
  const incomplete = FOUNDATIONAL_QUESTIONS.filter((item) => item.skillId === "AR_ADD_FACTS").slice(0, 1);
  assert.deepEqual(resolveQuickPracticeScope({ assignments: [], masteryBySkill: {}, domains: DOMAINS, skills: SKILLS, definitions: incomplete }), { skillIds: [], reason: "no_content" });
});

function attempt(skillId: string, sequenceNumber: number, category: Attempt["category"] = "calculation", difficultyBand: Attempt["difficultyBand"] = "A", responseTimeMs = 2_000): Attempt {
  return { attemptId: `${skillId}-${sequenceNumber}`, sessionId: "SESSION", studentId: "S", questionId: `Q${sequenceNumber}`, skillId, difficulty: difficultyBand === "A" ? .1 : .4, difficultyBand, category, submittedAnswer: { questionType: "numeric", data: { value: "1" } }, correct: true, supportLevel: "independent", scoreValue: 1, responseTimeMs, submittedAt: new Date(sequenceNumber * 1000).toISOString(), sequenceNumber };
}
