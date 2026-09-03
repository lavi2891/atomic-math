import assert from "node:assert/strict";
import { DOMAINS, SKILLS, SKILL_GROUPS, getSkillById, listDomains, listSkillsByDomain } from "../src/content/catalog/index.ts";
import type { Domain, Skill } from "../src/content/catalog/types.ts";
import { EVIDENCE_POLICIES } from "../src/content/catalog/policies.ts";
import { validateCatalog } from "../src/content/catalog/validateCatalog.ts";

function run(name: string, fn: () => void) { fn(); process.stdout.write(`PASS ${name}\n`); }

run("production atomic catalog is valid and queryable", () => {
  assert.deepEqual(validateCatalog(DOMAINS, SKILLS), []);
  assert.equal(listDomains()[0]?.id, "ARITHMETIC");
  assert.equal(SKILLS.length, 27);
  assert.equal(listSkillsByDomain("INTEGERS").length, 7);
  assert.equal(getSkillById("ALG_EQUALITY")?.domainId, "ALGEBRA_FOUNDATIONS");
});

run("presentation groups reference atomic catalog skills", () => {
  for (const group of SKILL_GROUPS) for (const skillId of group.skillIds) assert.ok(getSkillById(skillId), `${group.id}: ${skillId}`);
});

run("catalog validation reports structural and policy errors", () => {
  const domains: Domain[] = [
    { id: "D", nameHe: "דומיין", order: 1, icon: "x", colorToken: "x", active: true },
    { id: "D", nameHe: "כפול", order: 2, icon: "x", colorToken: "x", active: true },
  ];
  const base = { evidencePolicy: EVIDENCE_POLICIES.ROUTINE_PLUS_CONCEPT_V1, modes: { quickPractice: true, fixed: true } };
  const skills: Skill[] = [
    { ...base, id: "A", domainId: "MISSING", nameHe: "א", order: 1, prerequisites: ["B"], masteryTarget: 101, active: true },
    { ...base, id: "B", domainId: "D", nameHe: "ב", order: 2, prerequisites: ["UNKNOWN"], masteryTarget: 85, active: true },
    { ...base, id: "B", domainId: "D", nameHe: "כפול", order: 3, prerequisites: ["A"], masteryTarget: 85, active: true },
  ];
  const codes = new Set(validateCatalog(domains, skills).map((issue) => issue.code));
  for (const code of ["DUPLICATE_DOMAIN_ID", "DUPLICATE_SKILL_ID", "UNKNOWN_DOMAIN", "UNKNOWN_PREREQUISITE", "INVALID_MASTERY_TARGET", "PREREQUISITE_CYCLE"]) assert.equal(codes.has(code as never), true, code);
});
