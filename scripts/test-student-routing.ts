import assert from "node:assert/strict";
import { githubPagesSpaRoute, isStudentHistoryState, restoreGithubPagesRoute, studentHistoryState, studentRouteFromPathname, studentRoutePath } from "../src/app/studentRouting.ts";

const base = "/atomic-math/";

assert.deepEqual(studentRouteFromPathname("/atomic-math/", base), { kind: "home" });
assert.deepEqual(studentRouteFromPathname("/atomic-math", base), { kind: "home" });
assert.equal(studentRoutePath({ kind: "home" }, base), "/atomic-math/");
process.stdout.write("PASS direct Home route uses the configured base path\n");

assert.deepEqual(studentRouteFromPathname("/atomic-math/course/numbers-algebra", base), { kind: "course", pathId: "NUMBERS_ALGEBRA" });
assert.equal(studentRoutePath({ kind: "course", pathId: "NUMBERS_ALGEBRA" }, base), "/atomic-math/course/numbers-algebra");
process.stdout.write("PASS Numbers and Algebra has a stable direct route\n");

assert.deepEqual(studentRouteFromPathname("/atomic-math/course/geometry", base), { kind: "course", pathId: "GEOMETRY" });
assert.equal(studentRoutePath({ kind: "course", pathId: "GEOMETRY" }, base), "/atomic-math/course/geometry");
assert.equal(studentRouteFromPathname("/atomic-math/course/unknown", base), undefined);
process.stdout.write("PASS Geometry has a stable direct route and unknown courses stay invalid\n");

const encoded = "?__spa=%2Fcourse%2Fnumbers-algebra%3Ffrom%3Ddirect%23current";
assert.equal(githubPagesSpaRoute(encoded, base), "/atomic-math/course/numbers-algebra?from=direct#current");
let replaced = "";
const history = { state: { preserved: true }, replaceState(_state: unknown, _unused: string, url?: string | URL | null) { replaced = String(url); } };
assert.equal(restoreGithubPagesRoute({ search: encoded }, history, base), true);
assert.equal(replaced, "/atomic-math/course/numbers-algebra?from=direct#current");
assert.equal(githubPagesSpaRoute("?__spa=https%3A%2F%2Fevil.example", base), undefined);
process.stdout.write("PASS GitHub Pages fallback restores a clean base-path course URL\n");

assert.equal(isStudentHistoryState(studentHistoryState("home")), true);
assert.deepEqual(studentHistoryState("course", "NUMBERS_ALGEBRA"), { atomicMathStudent: true, view: "course", pathId: "NUMBERS_ALGEBRA" });
assert.deepEqual(studentHistoryState("session", "GEOMETRY"), { atomicMathStudent: true, view: "session", pathId: "GEOMETRY" });
assert.equal(isStudentHistoryState({ view: "course" }), false);
process.stdout.write("PASS course and session history entries retain their route context\n");
