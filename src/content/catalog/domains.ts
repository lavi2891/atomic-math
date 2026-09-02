import type { Domain } from "./types.ts";

export const DOMAINS = [
  {
    id: "INTEGERS",
    nameHe: "מספרים מכוונים",
    descriptionHe: "השוואה ופעולות במספרים חיוביים ושליליים",
    order: 10,
    icon: "signedNumbers",
    colorToken: "topicBlue",
    active: true,
  },
] as const satisfies readonly Domain[];
