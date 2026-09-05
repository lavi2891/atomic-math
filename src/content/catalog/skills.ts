import { EVIDENCE_POLICIES as P } from "./policies.ts";
import type { EvidencePolicy, Skill, SkillModes } from "./types.ts";

const quick: SkillModes = { quickPractice: true, fixed: true, survivalProfileId: "SURVIVAL_CORE" };
const fluent: SkillModes = { ...quick, timedProfileId: "TIMED_FLUENCY" };
const fact = P.FACT_FLUENCY_V1 as EvidencePolicy;
const routine = P.ROUTINE_PLUS_CONCEPT_V1 as EvidencePolicy;
const concept = P.CONCEPT_REP_V1 as EvidencePolicy;
const reasoning = P.REASONING_OPERATION_V1 as EvidencePolicy;
const s = (id: string, domainId: string, nameHe: string, order: number, prerequisites: string[], masteryTarget: number, evidencePolicy: EvidencePolicy, modes: SkillModes, options: Partial<Skill> = {}): Skill => ({ id, domainId, nameHe, order, prerequisites, masteryTarget, evidencePolicy, modes, active: true, ...options });

export const SKILLS = [
  s("AR_PLACE_VALUE", "ARITHMETIC", "מבנה המספר העשרוני", 10, [], 85, P.DECIMAL_STRUCTURE_V1, quick, { descriptionHe: "הרכבה ופירוק של מספרים שלמים בבסיס עשרוני, כולל אפסים שומרי מקום וספרות חוזרות." }),
  s("AR_ADD_FACTS", "ARITHMETIC", "חיבור מהיר", 20, [], 90, fact, fluent, { fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_SUB_FACTS", "ARITHMETIC", "חיסור מהיר", 30, [], 90, fact, fluent, { supportingSkills: ["AR_ADD_FACTS"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_MUL_F_2_5_10", "ARITHMETIC", "כפל ב־2, 5 ו־10", 41, [], 95, fact, fluent, { supportingSkills: ["AR_ADD_FACTS"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_MUL_F_3_4", "ARITHMETIC", "כפל ב־3 וב־4", 42, [], 95, fact, fluent, { supportingSkills: ["AR_MUL_F_2_5_10"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_MUL_F_6_7", "ARITHMETIC", "כפל ב־6 וב־7", 43, [], 95, fact, fluent, { supportingSkills: ["AR_MUL_F_3_4"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_MUL_F_8_9", "ARITHMETIC", "כפל ב־8 וב־9", 44, [], 95, fact, fluent, { supportingSkills: ["AR_MUL_F_2_5_10"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_DIV_F_2_5_10", "ARITHMETIC", "חילוק ב־2, 5 ו־10", 51, ["AR_MUL_F_2_5_10"], 90, fact, fluent, { fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_DIV_F_3_4", "ARITHMETIC", "חילוק ב־3 וב־4", 52, ["AR_MUL_F_3_4"], 90, fact, fluent, { fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_DIV_F_6_7", "ARITHMETIC", "חילוק ב־6 וב־7", 53, ["AR_MUL_F_6_7"], 90, fact, fluent, { fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_DIV_F_8_9", "ARITHMETIC", "חילוק ב־8 וב־9", 54, ["AR_MUL_F_8_9"], 90, fact, fluent, { fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("AR_FACTORS_MULTIPLES", "ARITHMETIC", "גורמים וכפולות", 60, [], 85, reasoning, quick, { supportingSkills: ["AR_MUL_F_2_5_10", "AR_DIV_F_2_5_10"] }),
  s("OPS_ORDER_BASIC", "ORDER_OF_OPERATIONS", "סדר פעולות בסיסי", 10, [], 85, routine, quick, { supportingSkills: ["AR_ADD_FACTS", "AR_MUL_F_2_5_10"] }),
  s("INT_NUMBER_LINE", "INTEGERS", "ציר המספרים", 10, [], 85, concept, quick),
  s("INT_COMPARE", "INTEGERS", "השוואת מספרים מכוונים", 20, ["INT_NUMBER_LINE"], 85, reasoning, quick),
  s("INT_NEGATION", "INTEGERS", "מספר נגדי", 30, ["INT_NUMBER_LINE"], 85, reasoning, quick),
  s("INT_ADD", "INTEGERS", "חיבור מספרים מכוונים", 40, ["INT_NUMBER_LINE"], 85, routine, fluent, { supportingSkills: ["AR_ADD_FACTS"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("INT_SUB", "INTEGERS", "חיסור מספרים מכוונים", 50, ["INT_NEGATION"], 85, routine, fluent, { supportingSkills: ["INT_ADD", "AR_SUB_FACTS"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("INT_MUL", "INTEGERS", "כפל מספרים מכוונים", 60, [], 85, routine, fluent, { supportingSkills: ["INT_NUMBER_LINE", "AR_MUL_F_2_5_10"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("INT_DIV", "INTEGERS", "חילוק מספרים מכוונים", 70, [], 85, routine, fluent, { supportingSkills: ["INT_MUL", "AR_DIV_F_2_5_10"], fluency: { enabled: true, targetMedianMs: 5_000 } }),
  s("FRAC_MEANING", "FRACTIONS", "משמעות השבר", 10, [], 85, concept, quick, { supportingSkills: ["AR_PLACE_VALUE"] }),
  s("FRAC_EQUIV", "FRACTIONS", "שברים שווי ערך", 20, ["FRAC_MEANING"], 85, concept, quick, { supportingSkills: ["AR_MUL_F_2_5_10"] }),
  s("ALG_EQUALITY", "ALGEBRA_FOUNDATIONS", "משמעות השוויון", 10, [], 85, reasoning, quick, { supportingSkills: ["AR_ADD_FACTS"] }),
  s("ALG_VARIABLE", "ALGEBRA_FOUNDATIONS", "משמעות המשתנה", 20, ["ALG_EQUALITY"], 85, concept, quick),
  s("ALG_SUBSTITUTE", "ALGEBRA_FOUNDATIONS", "הצבה בביטוי", 30, ["ALG_VARIABLE"], 85, routine, quick, { supportingSkills: ["OPS_ORDER_BASIC", "INT_ADD"] }),
  s("EQ_ADD", "EQUATIONS", "משוואות חיבור וחיסור", 10, ["ALG_EQUALITY", "ALG_VARIABLE"], 85, reasoning, quick, { supportingSkills: ["AR_ADD_FACTS", "INT_ADD"] }),
  s("EQ_MUL", "EQUATIONS", "משוואות כפל וחילוק", 20, ["ALG_EQUALITY", "ALG_VARIABLE"], 85, reasoning, quick, { supportingSkills: ["AR_MUL_F_2_5_10", "AR_DIV_F_2_5_10"] }),
] satisfies readonly Skill[];
