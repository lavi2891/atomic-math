export type AppRoute = "student" | "playground" | "question-review";

export function appRouteFromSearch(search: string): AppRoute {
  const params = new URLSearchParams(search);
  if (params.get("review") === "questions") return "question-review";
  if (params.get("playground") === "1") return "playground";
  return "student";
}
