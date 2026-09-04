import { useEffect, useMemo, useRef, useState } from "react";
import { SessionSetupScreen } from "@app/session/SessionSetupScreen";
import { SessionView } from "@app/session/SessionView";
import { SessionSummaryScreen } from "@app/session/SessionSummaryScreen";
import { studentPracticeService } from "@app/session/studentPracticeServiceInstance";
import { StudentHomeScreen } from "@app/studentHome/StudentHomeScreen";
import { FreePracticeScreen } from "./studentHome/FreePracticeScreen.tsx";
import { studentHomeService } from "@app/studentHome/studentHomeServiceInstance";
import type { PracticeSession, PracticeSessionState, SessionSettings } from "@domain/session/practiceSession";
import type { MasterySnapshot } from "@domain/mastery/projectMastery";
import type { StudentHomeData } from "@domain/studentHome/types";
import type { LearningStageReference } from "../domain/learningPath/types.ts";
import { studentIdentityProvider } from "../config/runtime.ts";
import { selectQuestionPool } from "@app/questionPools";
import { syncCoordinator } from "@app/syncInstance";
import { syncConfig } from "../infrastructure/sync/config.ts";
import { styles } from "@ui/styles";
import { theme } from "../theme/theme";
import type { PersonalBest, PersonalBestUpdate } from "@domain/personalBests/types";

import { repeatSessionConfig } from "../domain/session/studentSessionUx.ts";

type Screen = "home" | "freePractice" | "setup" | "session" | "summary";

export default function StudentApp() {
  const definitions = useMemo(() => selectQuestionPool("SIGNED_NUMBERS"), []);
  const [screen, setScreen] = useState<Screen>("home");
  const [activeDomainId, setActiveDomainId] = useState<string>();
  const [homeData, setHomeData] = useState<StudentHomeData>();
  const [session, setSession] = useState<PracticeSession>();
  const [completed, setCompleted] = useState<PracticeSessionState>();
  const [masteryBefore, setMasteryBefore] = useState<Record<string, MasterySnapshot>>({});
  const [masteryAfter, setMasteryAfter] = useState<Record<string, MasterySnapshot>>({});
  const [operationError, setOperationError] = useState<string>();
  const [previousBest, setPreviousBest] = useState<PersonalBest | null>(null);
  const [personalBestUpdate, setPersonalBestUpdate] = useState<PersonalBestUpdate | null>(null);
  const [starting, setStarting] = useState(false);
  const startingRef = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [screen]);

  async function refreshHome() {
    try { setHomeData(await studentHomeService.load(studentIdentityProvider.getStudentId())); setOperationError(undefined); }
    catch { setOperationError("לא ניתן לטעון כרגע את נתוני הבית. אפשר לנסות שוב."); }
  }

  useEffect(() => {
    queueMicrotask(() => { void refreshHome(); void syncCoordinator.flush(); });
    const interval = window.setInterval(() => void syncCoordinator.flush(), syncConfig.flushIntervalMs);
    const online = () => { void syncCoordinator.flush(); void refreshHome(); };
    window.addEventListener("online", online);
    return () => { window.clearInterval(interval); window.removeEventListener("online", online); };
  }, []);

  async function startSession(skillIds: string[], settings: SessionSettings, assignmentId?: string, learningStage?: LearningStageReference) {
    if (startingRef.current) return;
    startingRef.current = true;
    setStarting(true);
    try {
      const started = await studentPracticeService.start({ studentId: studentIdentityProvider.getStudentId(), skillIds, settings, assignmentId, learningStage });
      setOperationError(undefined); setSession(started.session); setCompleted(undefined); setPreviousBest(started.previousBest); setPersonalBestUpdate(null); setMasteryBefore(started.masteryBefore); setMasteryAfter(started.masteryBefore); setScreen("session");
    } catch { setOperationError("לא ניתן להתחיל את התרגול. נסו שוב."); }
    finally { startingRef.current = false; setStarting(false); }
  }

  async function finishSession(state: PracticeSessionState) {
    const finished = await studentPracticeService.finish(state); setMasteryAfter(finished.masteryAfter); setPersonalBestUpdate(finished.personalBest);
    setCompleted(state); setScreen("summary"); await refreshHome();
  }

  async function returnHome() { await refreshHome(); setSession(undefined); setScreen("home"); }

  return <div className="page" style={styles.page} dir="rtl"><div className="phone" style={{ ...styles.phone, color: theme.colors.text }}><main className="student-main" ref={mainRef} tabIndex={-1} style={styles.content}>
    {operationError ? <p role="alert">{operationError}</p> : null}
    {screen === "home" ? homeData ? <StudentHomeScreen data={homeData} definitions={definitions} starting={starting} onContinue={(stage, skillIds) => void startSession(skillIds, { mode: "fixed", questionCount: 5 }, undefined, stage)} onStartQuick={(skillIds) => void startSession(skillIds, { mode: "fixed", questionCount: 5 })} onFreePractice={() => setScreen("freePractice")} /> : <p role="status" aria-live="polite">טוען את המסלולים שלך…</p> : null}
    {screen === "freePractice" ? <FreePracticeScreen definitions={definitions} onBack={() => setScreen("home")} onOpenDomain={(domainId) => { setActiveDomainId(domainId); setScreen("setup"); }} /> : null}
    {screen === "setup" && activeDomainId ? <SessionSetupScreen studentId={studentIdentityProvider.getStudentId()} domainId={activeDomainId} definitions={definitions} onBack={() => setScreen("freePractice")} onStart={(skillIds, settings) => void startSession(skillIds, settings)} /> : null}
    {screen === "session" && session ? <SessionView session={session} definitions={definitions} previousBest={previousBest} onSessionEnd={(state) => void finishSession(state)} /> : null}
    {screen === "summary" && completed ? <SessionSummaryScreen completed={completed} masteryBefore={masteryBefore} masteryAfter={masteryAfter} personalBestUpdate={personalBestUpdate} onHome={() => void returnHome()} onRepeat={() => { const config = repeatSessionConfig(completed.session); void startSession(config.skillIds, config.settings, config.assignmentId, config.learningStage); }} /> : null}
  </main></div></div>;
}
