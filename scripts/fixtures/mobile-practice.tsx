import React, { useState } from "react";
import { SessionSummaryScreen } from "../../src/app/session/SessionSummaryScreen.tsx";
import { createRoot } from "react-dom/client";
import { SessionView } from "../../src/app/session/SessionView.tsx";
import { SKILLS } from "../../src/content/catalog/index.ts";
import { attemptRepository } from "../../src/app/persistenceInstances.ts";
import type { SessionSettings, PracticeSessionState } from "../../src/domain/session/practiceSession.ts";
import { styles } from "../../src/ui/styles.ts";
import "../../src/app.css";
import "../../src/index.css";

const params = new URLSearchParams(location.search);
const mode = params.get("mode") ?? "fixed";
const completion = params.get("completion");
const shortcutCompletion = params.get("shortcutCompletion");
const settings: SessionSettings = mode === "timed" ? { mode, durationSeconds: params.has("missing") ? 30 : 60 } : mode === "survival" ? { mode, maxErrors: 3 } : { mode: "fixed", questionCount: 5 };
const skill = params.has("stage") ? SKILLS.find(item => item.id === "AR_PLACE_VALUE")! : SKILLS.find(item => item.active && item.modes.timedProfileId && item.modes.survivalProfileId)!;
const skills = params.has("missing") ? ["AR_ADD_FACTS", "AR_SUB_FACTS", "INT_ADD"].map(id => SKILLS.find(item => item.id === id)!) : params.has("multi") ? SKILLS.filter(item => item.domainId === skill.domainId && item.active).slice(0, 5) : [skill];
const definitions = skills.filter(item => !params.has("missing") || item.id !== "INT_ADD").map(item => ({ id: item.id + "-fixture", topicId: "FOUNDATIONS", skillId: item.id, type: "numeric" as const, difficultyBand: "A" as const, tags: ["short-item"], prompt: [{ kind: "text" as const, value: params.has("long") ? "שאלה ארוכה לבדיקה. ".repeat(100) : "חשבו: " }, { kind: "math" as const, latex: "1 + 1" }], correctAnswers: ["2"] as [string], acceptedInputFormats: ["integer" as const] }));
Object.assign(window, { savedAttempts: () => attemptRepository.getAttemptsForSkill("mobile-test", skill.id) });
export function Fixture() {
  const [session] = useState(() => ({ id: crypto.randomUUID(), studentId: "mobile-test", selectedSkillIds: skills.map(item => item.id), settings, startedAt: Date.now() - (params.has("missing") ? 24000 : 0), ...(shortcutCompletion ? { learningShortcut: { pathId: "NUMBERS_ALGEBRA" as const, chapterId: "NA_DECIMAL_ARITHMETIC", shortcutId: "NA_DECIMAL_SHORTCUT" } } : params.has("stage") || completion ? { learningStage: { pathId: "NUMBERS_ALGEBRA" as const, stageId: "NA_PLACE_VALUE" } } : {}) }));
  const [completed, setCompleted] = useState<PracticeSessionState | undefined>(() => completion || shortcutCompletion ? {
    session, status: "ended", endReason: "completed", endedAt: Date.now(), currentQuestionId: null, currentSkillId: null,
    askedQuestionIds: [], askedSkillIds: [], targetDifficulty: 0,
    results: Array.from({ length: 5 }, (_, index) => ({ questionId: `summary-${index}`, topicId: "FOUNDATIONS", attemptIndex: 0, isCorrect: completion === "passed" || shortcutCompletion === "passed" && index < 4 || !shortcutCompletion && index < 2, rawAnswer: { questionType: "numeric" as const, data: { value: completion === "passed" || shortcutCompletion === "passed" && index < 4 ? "2" : "0" } }, responseTimeMs: 1000, timestamp: Date.now(), questionSnapshot: { ...definitions[0]!, id: `summary-${index}` } })),
  } : undefined);
  return <div className="page" dir="rtl" style={styles.page}><div className="phone" style={styles.phone}>
    {completed ? <SessionSummaryScreen completed={completed} masteryBefore={{}} masteryAfter={{}} personalBestUpdate={null} stageStars={completion === "passed" ? 3 : completion === "retry" ? 0 : undefined} shortcutPassed={shortcutCompletion ? shortcutCompletion === "passed" : undefined} previousStageBestStars={0} totalStarsBefore={34} onHome={() => {}} onRepeat={() => {}} /> :
      <SessionView session={session} definitions={definitions} onSessionEnd={state => { Object.assign(window, { finishedSession: state }); setCompleted(state); }} />}
  </div></div>;
}
createRoot(document.getElementById("root")!).render(<Fixture />);
