import assert from "node:assert/strict";

import { DOMAINS, SKILLS, getSkillById, listDomains, listSkillsByDomain } from "../src/content/catalog/index.ts";
import type { Domain, Skill } from "../src/content/catalog/types.ts";
import { validateCatalog } from "../src/content/catalog/validateCatalog.ts";
import { adaptSignedNumbersQuestion, adaptSignedNumbersQuestions } from "../src/content/legacy/signedNumbersAdapter.ts";
import { SIGNED_NUMBERS_GENERATED_QUESTIONS } from "../src/domain/questions/bank/SIGNED_NUMBERS.generated.ts";
import { SIGNED_NUMBERS_SAMPLE_QUESTIONS } from "../src/domain/questions/samples/SIGNED_NUMBERS.samples.ts";
import { resolveQuestionDefinition } from "../src/domain/questions/generator/resolveQuestionDefinition.ts";
import type { Question } from "../src/domain/questions/types.ts";

function run(name: string, testFn: () => void): void {
  testFn();
  process.stdout.write(`PASS ${name}\n`);
}

run("production catalog is valid and queryable", () => {
  assert.deepEqual(validateCatalog(DOMAINS, SKILLS), []);
  assert.equal(listDomains()[0]?.id, "INTEGERS");
  assert.equal(listSkillsByDomain("INTEGERS").length, 9);
  assert.equal(getSkillById("INT_ADD")?.domainId, "INTEGERS");
});

run("catalog validation reports structural errors", () => {
  const domains: Domain[] = [
    { id: "D", nameHe: "דומיין", order: 1, icon: "x", colorToken: "x", active: true },
    { id: "D", nameHe: "כפול", order: 2, icon: "x", colorToken: "x", active: true },
  ];
  const skills: Skill[] = [
    { id: "A", domainId: "MISSING", nameHe: "א", order: 1, prerequisites: ["B"], masteryTarget: 101, active: true },
    { id: "B", domainId: "D", nameHe: "ב", order: 2, prerequisites: ["UNKNOWN"], masteryTarget: 85, active: true },
    { id: "B", domainId: "D", nameHe: "כפול", order: 3, prerequisites: ["A"], masteryTarget: 85, active: true },
  ];
  const codes = new Set(validateCatalog(domains, skills).map((issue) => issue.code));
  assert.equal(codes.has("DUPLICATE_DOMAIN_ID"), true);
  assert.equal(codes.has("DUPLICATE_SKILL_ID"), true);
  assert.equal(codes.has("UNKNOWN_DOMAIN"), true);
  assert.equal(codes.has("UNKNOWN_PREREQUISITE"), true);
  assert.equal(codes.has("INVALID_MASTERY_TARGET"), true);
  assert.equal(codes.has("PREREQUISITE_CYCLE"), true);
});

run("all signed-number content maps to registered skills", () => {
  const adapted = adaptSignedNumbersQuestions([
    ...SIGNED_NUMBERS_GENERATED_QUESTIONS,
    ...SIGNED_NUMBERS_SAMPLE_QUESTIONS,
  ]);
  assert.equal(adapted.length, SIGNED_NUMBERS_GENERATED_QUESTIONS.length + SIGNED_NUMBERS_SAMPLE_QUESTIONS.length);
  for (const definition of adapted) {
    assert.ok(getSkillById(definition.skillId), `unknown skill for ${definition.id}`);
  }
});

run("generated questions retain the adapted skill identity", () => {
  const adapted = adaptSignedNumbersQuestion(SIGNED_NUMBERS_GENERATED_QUESTIONS[0]!);
  const resolved = resolveQuestionDefinition(adapted);
  assert.equal(resolved.skillId, adapted.skillId);
});

run("adapter rejects unknown legacy subtopics", () => {
  const legacyQuestion: Question = {
    id: "UNMAPPED",
    topicId: "SIGNED_NUMBERS",
    subtopic: "not_registered",
    type: "numeric",
    prompt: [{ kind: "text", value: "?" }],
    correctAnswers: ["1"],
  };
  assert.throws(() => adaptSignedNumbersQuestion(legacyQuestion), /no valid skill mapping/);
});
