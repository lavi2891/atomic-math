import React from "react";
import { createRoot } from "react-dom/client";
import StudentApp from "../../src/app/StudentApp.tsx";
import { LEARNING_PATHS } from "../../src/content/learningPaths.ts";
import { personalBestRepository, sessionRepository } from "../../src/app/persistenceInstances.ts";
import { studentIdentityProvider } from "../../src/config/runtime.ts";
import type { LearningPath } from "../../src/domain/learningPath/types.ts";
import "../../src/app.css";
import "../../src/index.css";

const completed = new URLSearchParams(location.search).get("completed");
const firstChapter = LEARNING_PATHS[0].chapters[0];
const numbers: LearningPath = LEARNING_PATHS[0];
const stages = completed === "multiplication" ? numbers.chapters.slice(0, 2).flatMap((chapter) => chapter.stages).filter((stage) => stage.type !== "bonus") : completed === "chapter" ? firstChapter.stages : completed === "review" ? firstChapter.stages.slice(0, 3) : completed === "first" ? firstChapter.stages.slice(0, 1) : [];
for (const stage of stages) {
  await sessionRepository.saveSession({
    id: `fixture-${stage.id}`, studentId: studentIdentityProvider.getStudentId(),
    selectedSkillIds: [...stage.skillIds], settings: { mode: "fixed", questionCount: 5 },
    learningStage: { pathId: "NUMBERS_ALGEBRA", stageId: stage.id },
    startedAt: 0, endedAt: 5000, source: "freePractice", strategy: "balanced", status: "completed", endReason: "completed",
    questionCount: 5, correctCount: 5, incorrectCount: 0, accuracy: 1,
  });
}
if (new URLSearchParams(location.search).get("shortcut") === "passed" && firstChapter.shortcutTest) {
  await sessionRepository.saveSession({
    id: "fixture-shortcut", studentId: studentIdentityProvider.getStudentId(), selectedSkillIds: [...firstChapter.shortcutTest.skillIds],
    settings: { mode: "fixed", questionCount: 5 }, learningShortcut: { pathId: "NUMBERS_ALGEBRA", chapterId: firstChapter.id, shortcutId: firstChapter.shortcutTest.id },
    startedAt: 0, endedAt: 5000, source: "freePractice", strategy: "balanced", status: "completed", endReason: "completed",
    questionCount: 5, correctCount: 4, incorrectCount: 1, accuracy: 0.8, shortcutPassed: true,
  });
}
if (new URLSearchParams(location.search).has("best")) {
  await personalBestRepository.record({ studentId: studentIdentityProvider.getStudentId(), signature: { mode: "fixed", questionCount: 5, scope: { type: "skill", skillId: "AR_PLACE_VALUE" } }, bestScore: 10_000, achievedAt: new Date().toISOString(), sessionId: "fixture-best", metrics: { attempted: 5, correct: 5, incorrect: 0, accuracy: 1, durationMs: 10_000 } });
}
createRoot(document.getElementById("root")!).render(<StudentApp />);
