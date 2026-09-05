import type { LearningPath } from "../domain/learningPath/types.ts";

/** Presentation sequences are authored independently of Domain/Skill ordering. */
export const LEARNING_PATHS = [
  {
    id: "NUMBERS_ALGEBRA",
    nameHe: "מספרים ואלגברה",
    chapters: [
      {
        id: "NA_DECIMAL_ARITHMETIC",
        nameHe: "מספרים ופעולות בסיסיות",
        shortcutTest: { id: "NA_DECIMAL_SHORTCUT", skillIds: ["AR_PLACE_VALUE", "AR_ADD_FACTS", "AR_SUB_FACTS"] },
        stages: [
          { id: "NA_PLACE_VALUE", nameHe: "מבנה המספר", type: "normal", skillIds: ["AR_PLACE_VALUE"] },
          { id: "NA_ADD_SUBTRACT", nameHe: "חיבור וחיסור", type: "normal", skillIds: ["AR_ADD_FACTS", "AR_SUB_FACTS"] },
          { id: "NA_DECIMAL_REVIEW", nameHe: "חוזרים על היסודות", type: "review", skillIds: ["AR_PLACE_VALUE", "AR_ADD_FACTS", "AR_SUB_FACTS"] },
          { id: "NA_DECIMAL_CHECKPOINT", nameHe: "בודקים את היסודות", type: "checkpoint", skillIds: ["AR_PLACE_VALUE", "AR_ADD_FACTS", "AR_SUB_FACTS"], scoring: { thresholds: { passed: 0.6, strong: 0.8, excellent: 0.9 } } },
        ],
      },
      {
        id: "NA_MULTIPLICATION_DIVISION",
        nameHe: "כפל וחילוק",
        stages: [
          { id: "NA_FACTS_2_5_10", nameHe: "כפל וחילוק ב־2, 5 ו־10", type: "normal", skillIds: ["AR_MUL_F_2_5_10", "AR_DIV_F_2_5_10"] },
          { id: "NA_FACTS_3_4", nameHe: "כפל וחילוק ב־3 וב־4", type: "normal", skillIds: ["AR_MUL_F_3_4", "AR_DIV_F_3_4"] },
          { id: "NA_FACTS_6_7", nameHe: "כפל וחילוק ב־6 וב־7", type: "normal", skillIds: ["AR_MUL_F_6_7", "AR_DIV_F_6_7"] },
          { id: "NA_FACTS_8_9", nameHe: "כפל וחילוק ב־8 וב־9", type: "normal", skillIds: ["AR_MUL_F_8_9", "AR_DIV_F_8_9"] },
          { id: "NA_FACTORS_BONUS", nameHe: "בונוס: גורמים וכפולות", type: "bonus", skillIds: ["AR_FACTORS_MULTIPLES"] },
        ],
      },
      {
        id: "NA_OPERATION_ORDER",
        nameHe: "סדר פעולות",
        stages: [
          { id: "NA_OPERATION_ORDER_BASIC", nameHe: "סדר פעולות בסיסי", type: "normal", skillIds: ["OPS_ORDER_BASIC"] },
        ],
      },
      {
        id: "NA_INTEGERS",
        nameHe: "מספרים מכוונים",
        shortcutTest: { id: "NA_INTEGERS_SHORTCUT", skillIds: ["INT_COMPARE", "INT_SUB", "INT_DIV"] },
        stages: [
          { id: "NA_NUMBER_LINE", nameHe: "ציר המספרים", type: "normal", skillIds: ["INT_NUMBER_LINE"] },
          { id: "NA_COMPARE_NEGATE", nameHe: "השוואה ומספר נגדי", type: "normal", skillIds: ["INT_COMPARE", "INT_NEGATION"] },
          { id: "NA_INTEGER_ADD_SUBTRACT", nameHe: "חיבור וחיסור מכוונים", type: "normal", skillIds: ["INT_ADD", "INT_SUB"] },
          { id: "NA_INTEGER_MULTIPLY_DIVIDE", nameHe: "כפל וחילוק מכוונים", type: "normal", skillIds: ["INT_MUL", "INT_DIV"] },
          { id: "NA_INTEGERS_CHECKPOINT", nameHe: "בודקים מספרים מכוונים", type: "checkpoint", skillIds: ["INT_COMPARE", "INT_SUB", "INT_DIV"] },
        ],
      },
      {
        id: "NA_FRACTIONS",
        nameHe: "שברים",
        stages: [
          { id: "NA_FRACTION_MEANING", nameHe: "משמעות השבר", type: "normal", skillIds: ["FRAC_MEANING"] },
          { id: "NA_EQUIVALENT_FRACTIONS", nameHe: "שברים שווי ערך", type: "normal", skillIds: ["FRAC_EQUIV"] },
        ],
      },
      {
        id: "NA_ALGEBRA",
        nameHe: "יסודות האלגברה",
        stages: [
          { id: "NA_EQUALITY", nameHe: "משמעות השוויון", type: "normal", skillIds: ["ALG_EQUALITY"] },
          { id: "NA_VARIABLE", nameHe: "משמעות המשתנה", type: "normal", skillIds: ["ALG_VARIABLE"] },
          { id: "NA_SUBSTITUTION", nameHe: "הצבה בביטוי", type: "normal", skillIds: ["ALG_SUBSTITUTE"] },
        ],
      },
      {
        id: "NA_EQUATIONS",
        nameHe: "משוואות",
        stages: [
          { id: "NA_ADDITIVE_EQUATIONS", nameHe: "משוואות חיבור וחיסור", type: "normal", skillIds: ["EQ_ADD"] },
          { id: "NA_MULTIPLICATIVE_EQUATIONS", nameHe: "משוואות כפל וחילוק", type: "normal", skillIds: ["EQ_MUL"] },
          { id: "NA_EQUATIONS_CHECKPOINT", nameHe: "בודקים משוואות", type: "checkpoint", skillIds: ["EQ_ADD", "EQ_MUL"] },
        ],
      },
    ],
  },
  {
    id: "GEOMETRY",
    nameHe: "גיאומטריה",
    // No atomic Geometry Skills exist yet. Add chapters when those Skills exist.
    chapters: [],
  },
] as const satisfies readonly LearningPath[];
