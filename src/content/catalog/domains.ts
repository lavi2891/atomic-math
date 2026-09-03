import type { Domain } from "./types.ts";

export const DOMAINS = [
  { id: "ARITHMETIC", nameHe: "חשבון בסיסי", order: 10, icon: "algebraExpressions", colorToken: "topicTeal", active: true },
  { id: "ORDER_OF_OPERATIONS", nameHe: "סדר פעולות", order: 20, icon: "algebraExpressions", colorToken: "topicPurple", active: true },
  { id: "INTEGERS", nameHe: "מספרים מכוונים", order: 30, icon: "signedNumbers", colorToken: "topicBlue", active: true },
  { id: "FRACTIONS", nameHe: "שברים", order: 40, icon: "algebraExpressions", colorToken: "topicOrange", active: true },
  { id: "ALGEBRA_FOUNDATIONS", nameHe: "יסודות האלגברה", order: 50, icon: "algebraExpressions", colorToken: "topicPurple", active: true },
  { id: "EQUATIONS", nameHe: "משוואות", order: 60, icon: "linearEquations", colorToken: "topicTeal", active: true },
] as const satisfies readonly Domain[];
