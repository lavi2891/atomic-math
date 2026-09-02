import type { Skill } from "./types.ts";

export const SKILLS = [
  { id: "INT_ADD", domainId: "INTEGERS", nameHe: "חיבור מספרים מכוונים", order: 10, prerequisites: [], masteryTarget: 85, active: true },
  { id: "INT_SUB", domainId: "INTEGERS", nameHe: "חיסור מספרים מכוונים", order: 20, prerequisites: ["INT_ADD"], masteryTarget: 85, active: true },
  { id: "INT_MUL", domainId: "INTEGERS", nameHe: "כפל מספרים מכוונים", order: 30, prerequisites: [], masteryTarget: 85, active: true },
  { id: "INT_ORDER_OPS", domainId: "INTEGERS", nameHe: "סדר פעולות במספרים מכוונים", order: 40, prerequisites: ["INT_ADD", "INT_SUB", "INT_MUL"], masteryTarget: 85, active: true },
  { id: "INT_DECIMAL_OPS", domainId: "INTEGERS", nameHe: "פעולות עם מספרים עשרוניים מכוונים", order: 50, prerequisites: ["INT_ADD", "INT_SUB"], masteryTarget: 85, active: true },
  { id: "INT_RATIONAL_OPS", domainId: "INTEGERS", nameHe: "פעולות עם מספרים רציונליים מכוונים", order: 60, prerequisites: ["INT_ADD", "INT_SUB"], masteryTarget: 85, active: true },
  { id: "INT_NEGATION", domainId: "INTEGERS", nameHe: "מינוס וסוגריים", order: 70, prerequisites: ["INT_SUB"], masteryTarget: 85, active: true },
  { id: "INT_DISTRIBUTIVE", domainId: "INTEGERS", nameHe: "חוק הפילוג במספרים מכוונים", order: 80, prerequisites: ["INT_MUL", "INT_NEGATION"], masteryTarget: 85, active: true },
  { id: "INT_POWERS", domainId: "INTEGERS", nameHe: "חזקות וסימנים", order: 90, prerequisites: ["INT_MUL", "INT_NEGATION"], masteryTarget: 85, active: true },
] as const satisfies readonly Skill[];
