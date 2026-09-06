import React from "react";
import { createRoot } from "react-dom/client";
import StudentApp from "../../src/app/StudentApp.tsx";
import { attemptRepository } from "../../src/app/persistenceInstances.ts";
import { appsScriptClient } from "../../src/app/syncInstance.ts";
import type { Attempt } from "../../src/domain/attempts/types.ts";
import "../../src/app.css";
import "../../src/index.css";

Object.assign(window, {
  identityFixture: {
    async clientProbe(studentId: string) {
      try { return { data: await appsScriptClient?.getStudentHome(studentId) }; }
      catch (error) { return { error: error instanceof Error ? error.message : String(error) }; }
    },
    async saveAttempt(studentId: string) {
      const item: Attempt = { attemptId: `fixture-${studentId}`, sessionId: `session-${studentId}`, studentId, questionId: "Q", skillId: "AR_PLACE_VALUE", difficulty: 0.2, literacyDemand: "none", submittedAnswer: { questionType: "numeric", data: { value: "1" } }, correct: true, supportLevel: "independent", scoreValue: 1, responseTimeMs: 500, submittedAt: new Date().toISOString(), sequenceNumber: 1 };
      await attemptRepository.saveAttempt(item);
    },
    async count(studentId: string) { return (await attemptRepository.getAttemptsForSkill(studentId, "AR_PLACE_VALUE")).length; },
  },
});

createRoot(document.getElementById("root")!).render(<StudentApp />);
