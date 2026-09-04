import React from "react";
import { createRoot } from "react-dom/client";
import { SessionView } from "../../src/app/session/SessionView.tsx";
import { SKILLS } from "../../src/content/catalog/index.ts";
import { attemptRepository } from "../../src/app/persistenceInstances.ts";
import type { SessionSettings } from "../../src/domain/session/practiceSession.ts";
import { styles } from "../../src/ui/styles.ts";
import "../../src/app.css";
import "../../src/index.css";

const params = new URLSearchParams(location.search);
const mode = params.get("mode") ?? "fixed";
const settings: SessionSettings = mode === "timed" ? { mode, durationSeconds: 60 } : mode === "survival" ? { mode, maxErrors: 3 } : { mode: "fixed", questionCount: 5 };
const skill = SKILLS.find(item => item.active && item.modes.timedProfileId && item.modes.survivalProfileId)!;
const skills = params.has("multi") ? SKILLS.filter(item => item.domainId === skill.domainId && item.active).slice(0, 5) : [skill];
const definitions = skills.map(item => ({ id: item.id + "-fixture", topicId: "FOUNDATIONS", skillId: item.id, type: "numeric" as const, difficultyBand: "A" as const, tags: ["short-item"], prompt: [{ kind: "text" as const, value: params.has("long") ? "שאלה ארוכה לבדיקה. ".repeat(100) : "חשבו: " }, { kind: "math" as const, latex: "1 + 1" }], correctAnswers: ["2"] as [string], acceptedInputFormats: ["integer" as const] }));
Object.assign(window, { savedAttempts: () => attemptRepository.getAttemptsForSkill("mobile-test", skill.id) });
createRoot(document.getElementById("root")!).render(<div className="page" dir="rtl" style={styles.page}><div className="phone" style={styles.phone}>
  <SessionView session={{ id: crypto.randomUUID(), studentId: "mobile-test", selectedSkillIds: skills.map(item => item.id), settings, startedAt: Date.now() }} definitions={definitions} onSessionEnd={() => {}} />
</div></div>);
