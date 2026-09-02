import { useEffect, useMemo, useState } from "react";
import { PlaygroundScreen } from "@app/PlaygroundScreen";
import { SessionSetupScreen } from "@app/session/SessionSetupScreen";
import { SessionView } from "@app/session/SessionView";
import { SessionSummaryScreen } from "@app/session/SessionSummaryScreen";
import { studentPracticeService } from "@app/session/studentPracticeServiceInstance";
import { StudentHomeScreen } from "@app/studentHome/StudentHomeScreen";
import { studentHomeService } from "@app/studentHome/studentHomeServiceInstance";
import type { PracticeSession, PracticeSessionState, SessionSettings } from "@domain/session/practiceSession";
import type { MasterySnapshot } from "@domain/mastery/projectMastery";
import type { StudentHomeData } from "@domain/studentHome/types";
import { assignmentSessionLaunch } from "@domain/studentHome/sessionLaunch";
import { studentIdentityProvider } from "./config/runtime.ts";
import { selectQuestionPool } from "@app/questionPools";
import { syncCoordinator } from "@app/syncInstance";
import { syncConfig } from "./infrastructure/sync/config.ts";
import { styles } from "@ui/styles";
import { theme } from "./theme/theme";

type Screen = "home" | "setup" | "session" | "summary";

export default function App() {
  const showPlayground = useMemo(() => new URLSearchParams(window.location.search).get("playground") === "1", []);
  const definitions = useMemo(() => selectQuestionPool("SIGNED_NUMBERS"), []);
  const [screen, setScreen] = useState<Screen>("home");
  const [activeDomainId, setActiveDomainId] = useState<string>();
  const [homeData, setHomeData] = useState<StudentHomeData>();
  const [session, setSession] = useState<PracticeSession>();
  const [completed, setCompleted] = useState<PracticeSessionState>();
  const [masteryBefore, setMasteryBefore] = useState<Record<string, MasterySnapshot>>({});
  const [masteryAfter, setMasteryAfter] = useState<Record<string, MasterySnapshot>>({});
  const [operationError, setOperationError] = useState<string>();

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

  if (showPlayground) return <PlaygroundScreen />;

  async function startSession(skillIds: string[], settings: SessionSettings, assignmentId?: string) {
    try {
      const started = await studentPracticeService.start({ studentId: studentIdentityProvider.getStudentId(), skillIds, settings, assignmentId });
      setOperationError(undefined); setSession(started.session); setCompleted(undefined); setMasteryBefore(started.masteryBefore); setMasteryAfter(started.masteryBefore); setScreen("session");
    } catch { setOperationError("לא ניתן להתחיל את התרגול. נסו שוב."); }
  }

  async function finishSession(state: PracticeSessionState) {
    setMasteryAfter(await studentPracticeService.finish(state));
    setCompleted(state); setScreen("summary"); await refreshHome();
  }

  async function returnHome() { await refreshHome(); setSession(undefined); setScreen("home"); }

  return <div className="page" style={styles.page} dir="rtl"><div className="phone" style={{ ...styles.phone, color: theme.colors.text }}><main style={styles.content}>
    {operationError ? <p role="alert">{operationError}</p> : null}
    {screen === "home" ? homeData ? <StudentHomeScreen data={homeData} definitions={definitions} onOpenDomain={(domainId) => { setActiveDomainId(domainId); setScreen("setup"); }} onStartAssignment={(skillId, assignmentId) => { const launch = assignmentSessionLaunch(skillId); void startSession(launch.skillIds, launch.settings, assignmentId); }} /> : <p role="status" aria-live="polite">טוען את העבודה שלך…</p> : null}
    {screen === "setup" && activeDomainId ? <SessionSetupScreen domainId={activeDomainId} definitions={definitions} onBack={() => setScreen("home")} onStart={(skillIds, settings) => void startSession(skillIds, settings)} /> : null}
    {screen === "session" && session ? <SessionView session={session} definitions={definitions} onSessionEnd={(state) => void finishSession(state)} /> : null}
    {screen === "summary" && completed ? <SessionSummaryScreen completed={completed} masteryBefore={masteryBefore} masteryAfter={masteryAfter} onHome={() => void returnHome()} onRepeat={() => void startSession(completed.session.selectedSkillIds, completed.session.settings, completed.session.assignmentId)} /> : null}
  </main></div></div>;
}
