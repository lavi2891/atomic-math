import React from "react";
import { createRoot } from "react-dom/client";
import StudentApp from "../../src/app/StudentApp.tsx";
import { LEARNING_PATHS } from "../../src/content/learningPaths.ts";
import { sessionRepository } from "../../src/app/persistenceInstances.ts";
import { studentIdentityProvider } from "../../src/config/runtime.ts";
import "../../src/app.css";
import "../../src/index.css";

const completed = new URLSearchParams(location.search).get("completed");
const firstChapter = LEARNING_PATHS[0].chapters[0];
const stages = completed === "chapter" ? firstChapter.stages : completed === "first" ? firstChapter.stages.slice(0, 1) : [];
for (const stage of stages) {
  await sessionRepository.saveSession({
    id: `fixture-${stage.id}`, studentId: studentIdentityProvider.getStudentId(),
    selectedSkillIds: [...stage.skillIds], settings: { mode: "fixed", questionCount: 5 },
    learningStage: { pathId: "NUMBERS_ALGEBRA", stageId: stage.id },
    startedAt: 0, endedAt: 5000, source: "freePractice", strategy: "balanced", status: "completed", endReason: "completed",
    questionCount: 5, correctCount: 5, incorrectCount: 0, accuracy: 1,
  });
}
createRoot(document.getElementById("root")!).render(<StudentApp />);
