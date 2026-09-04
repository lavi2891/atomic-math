import type { EvidencePolicy } from "./types.ts";

export const EVIDENCE_POLICIES = {
  FACT_FLUENCY_V1: {
    id: "FACT_FLUENCY", version: 1, minimumAttempts: 12,
    requiredCategoryEvidence: { calculation: 8, conceptual: 2 },
    requiredBandEvidence: { A: 4, B: 4 },
    fluencyEvidence: { minimumFluentAttempts: 6, maximumMedianMs: 5_000 },
  },
  ROUTINE_PLUS_CONCEPT_V1: {
    id: "ROUTINE_PLUS_CONCEPT", version: 1, minimumAttempts: 10,
    requiredCategoryEvidence: { calculation: 6, conceptual: 2 },
    requiredBandEvidence: { A: 2, B: 3, C: 2 },
  },
  DECIMAL_STRUCTURE_V1: {
    id: "DECIMAL_STRUCTURE", version: 1, minimumAttempts: 10,
    requiredCategoryEvidence: { representation: 10 },
    requiredBandEvidence: { A: 3, B: 3, C: 2 },
  },
  CONCEPT_REP_V1: {
    id: "CONCEPT_REP", version: 1, minimumAttempts: 10,
    requiredCategoryEvidence: { conceptual: 4, representation: 3 },
    requiredBandEvidence: { A: 3, B: 3 },
  },
  REASONING_OPERATION_V1: {
    id: "REASONING_OPERATION", version: 1, minimumAttempts: 10,
    requiredCategoryEvidence: { conceptual: 3, reasoning: 3 },
    requiredBandEvidence: { A: 2, B: 3, C: 1 },
  },
} as const satisfies Record<string, EvidencePolicy>;

export function validateEvidencePolicy(policy: EvidencePolicy): string[] {
  const issues: string[] = [];
  if (!policy.id || !Number.isInteger(policy.version) || policy.version < 1) issues.push("policy identity/version is invalid");
  if (!Number.isInteger(policy.minimumAttempts) || policy.minimumAttempts < 1) issues.push("minimumAttempts must be positive");
  for (const [key, value] of [...Object.entries(policy.requiredCategoryEvidence), ...Object.entries(policy.requiredBandEvidence)]) {
    if (!Number.isInteger(value) || value < 0) issues.push(`${key} evidence count is invalid`);
  }
  if (policy.fluencyEvidence && (policy.fluencyEvidence.minimumFluentAttempts < 1 || policy.fluencyEvidence.maximumMedianMs <= 0)) issues.push("fluency evidence is invalid");
  return issues;
}
