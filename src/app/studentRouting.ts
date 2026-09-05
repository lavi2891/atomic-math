import type { LearningPathId } from "../domain/learningPath/types.ts";

export type StudentRoute =
  | { readonly kind: "home" }
  | { readonly kind: "course"; readonly pathId: LearningPathId };

export type StudentHistoryState = {
  readonly atomicMathStudent: true;
  readonly view: "home" | "course" | "session";
  readonly pathId?: LearningPathId;
};

const courseSlugById: Record<LearningPathId, string> = {
  NUMBERS_ALGEBRA: "numbers-algebra",
  GEOMETRY: "geometry",
};

function normalizedBase(basePath: string): string {
  return `/${basePath.split("/").filter(Boolean).join("/")}${basePath === "/" ? "" : "/"}`;
}

export function studentRoutePath(route: StudentRoute, basePath = "/"): string {
  const base = normalizedBase(basePath);
  return route.kind === "home" ? base : `${base}course/${courseSlugById[route.pathId]}`;
}

export function studentRouteFromPathname(pathname: string, basePath = "/"): StudentRoute | undefined {
  const base = normalizedBase(basePath);
  const baseWithoutSlash = base === "/" ? "" : base.slice(0, -1);
  if (pathname === base || pathname === baseWithoutSlash) return { kind: "home" };
  const prefix = `${base}course/`;
  if (!pathname.startsWith(prefix)) return undefined;
  const slug = pathname.slice(prefix.length).replace(/\/$/, "");
  const entry = Object.entries(courseSlugById).find(([, value]) => value === slug);
  return entry ? { kind: "course", pathId: entry[0] as LearningPathId } : undefined;
}

export function studentHistoryState(view: StudentHistoryState["view"], pathId?: LearningPathId): StudentHistoryState {
  return { atomicMathStudent: true, view, ...(pathId ? { pathId } : {}) };
}

export function isStudentHistoryState(value: unknown): value is StudentHistoryState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<StudentHistoryState>;
  return candidate.atomicMathStudent === true && (candidate.view === "home" || candidate.view === "course" || candidate.view === "session");
}

/** Resolve the clean URL encoded by public/404.html for GitHub Pages. */
export function githubPagesSpaRoute(search: string, basePath = "/"): string | undefined {
  const redirected = new URLSearchParams(search).get("__spa");
  if (!redirected || !redirected.startsWith("/") || redirected.startsWith("//")) return undefined;
  const [pathname] = redirected.split(/[?#]/, 1);
  if (!studentRouteFromPathname(`${normalizedBase(basePath).slice(0, -1)}${pathname}`, basePath)) return undefined;
  return `${normalizedBase(basePath).slice(0, -1)}${redirected}`;
}

export function restoreGithubPagesRoute(
  location: Pick<Location, "search">,
  history: Pick<History, "state" | "replaceState">,
  basePath = "/",
): boolean {
  const restored = githubPagesSpaRoute(location.search, basePath);
  if (!restored) return false;
  history.replaceState(history.state, "", restored);
  return true;
}
