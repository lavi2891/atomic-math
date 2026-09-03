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

function run(name: string, fn: () => void) { fn(); process.stdout.write(`PASS ${name}\n`); }
const skill = (id: string) => SKILLS.find((item) => item.id === id)!;

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
