import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import type { LearningPathId, LearningShortcutReference, LearningStageReference, StageStars } from "../domain/learningPath/types.ts";
import { LearningPathScreen } from "./learningPath/LearningPathScreen.tsx";
import { LEARNING_PATHS } from "../content/learningPaths.ts";
import { LEARNING_STAGE_SETTINGS } from "../domain/learningPath/sessionProgress.ts";
import { personalBestRepository, riddleSubmissionRepository } from "./persistenceInstances.ts";
import { backendConfigured, runtimeConfig } from "../config/runtime.ts";
import { resolveStudentIdentity, type ResolvedStudentIdentity } from "../domain/studentIdentity/studentIdentity.ts";
import { studentIdentityStorage } from "./studentIdentity/identityStorageInstance.ts";
import { StudentCodeEntryScreen } from "./studentIdentity/StudentCodeEntryScreen.tsx";
import { selectQuestionPool } from "@app/questionPools";
import { appsScriptClient, syncCoordinator } from "@app/syncInstance";
import { syncConfig } from "../infrastructure/sync/config.ts";
import { styles } from "@ui/styles";
import { theme } from "../theme/theme";
import type { PersonalBest, PersonalBestUpdate } from "@domain/personalBests/types";

import { repeatSessionConfig } from "../domain/session/studentSessionUx.ts";
import { totalEarnedStars } from "../domain/learningPath/progression.ts";
import { isStudentHistoryState, studentHistoryState, studentRouteFromPathname, studentRoutePath, type StudentRoute } from "./studentRouting.ts";

type Screen = "home" | "path" | "freePractice" | "setup" | "session" | "summary";
const BASE_PATH = import.meta.env.BASE_URL;

export default function StudentApp() {
  const initialRoute = studentRouteFromPathname(window.location.pathname, BASE_PATH);
  const definitions = useMemo(() => selectQuestionPool("SIGNED_NUMBERS"), []);
  const [identity, setIdentity] = useState<ResolvedStudentIdentity | null>(() => resolveStudentIdentity(studentIdentityStorage, runtimeConfig.fallbackStudentId));
  const studentId = identity?.studentId;
  const [identityError, setIdentityError] = useState<string>();
  const [checkingIdentity, setCheckingIdentity] = useState(false);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [screen, setScreen] = useState<Screen>(() => initialRoute?.kind === "course" ? "path" : "home");
  const [activeDomainId, setActiveDomainId] = useState<string>();
  const [activePathId, setActivePathId] = useState<LearningPathId | undefined>(() => initialRoute?.kind === "course" ? initialRoute.pathId : undefined);
  const activePath = LEARNING_PATHS.find((path) => path.id === activePathId);
  const [homeData, setHomeData] = useState<StudentHomeData>();
  const [session, setSession] = useState<PracticeSession>();
  const [completed, setCompleted] = useState<PracticeSessionState>();
  const [masteryBefore, setMasteryBefore] = useState<Record<string, MasterySnapshot>>({});
  const [masteryAfter, setMasteryAfter] = useState<Record<string, MasterySnapshot>>({});
  const [operationError, setOperationError] = useState<string>();
  const [previousBest, setPreviousBest] = useState<PersonalBest | null>(null);
  const [personalBestUpdate, setPersonalBestUpdate] = useState<PersonalBestUpdate | null>(null);
  const [stageStars, setStageStars] = useState<StageStars>();
  const [previousStageBestStars, setPreviousStageBestStars] = useState<StageStars>(0);
  const [totalStarsBefore, setTotalStarsBefore] = useState(0);
  const [shortcutPassed, setShortcutPassed] = useState<boolean>();
  const [starting, setStarting] = useState(false);
  const startingRef = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  function showRoute(route: StudentRoute, mode: "push" | "replace" = "push") {
    window.history[mode === "push" ? "pushState" : "replaceState"](
      studentHistoryState(route.kind, route.kind === "course" ? route.pathId : undefined),
      "",
      studentRoutePath(route, BASE_PATH),
    );
    setOperationError(undefined);
    if (route.kind === "course") { setActivePathId(route.pathId); setScreen("path"); }
    else setScreen("home");
  }

  function backFromCourse() {
    if (isStudentHistoryState(window.history.state) && window.history.state.view === "course") window.history.back();
    else showRoute({ kind: "home" });
  }

  useEffect(() => {
    const route = studentRouteFromPathname(window.location.pathname, BASE_PATH);
    if (!route) return;
    const directUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (route.kind === "course" && !isStudentHistoryState(window.history.state)) {
      window.history.replaceState(studentHistoryState("home"), "", studentRoutePath({ kind: "home" }, BASE_PATH));
      window.history.pushState(studentHistoryState("course", route.pathId), "", directUrl);
    } else {
      window.history.replaceState(studentHistoryState(route.kind, route.kind === "course" ? route.pathId : undefined), "");
    }
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const state = window.history.state;
      const route = studentRouteFromPathname(window.location.pathname, BASE_PATH);
      if (isStudentHistoryState(state) && state.view === "session" && session) {
        if (state.pathId) setActivePathId(state.pathId);
        setScreen(completed ? "summary" : "session");
      } else if (route?.kind === "course") {
        setActivePathId(route.pathId);
        setScreen("path");
      } else {
        setScreen("home");
      }
      setOperationError(undefined);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [completed, session]);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [screen]);

  const refreshHome = useCallback(async (id = studentId) => {
    if (!id) return undefined;
    try {
      const data = await studentHomeService.load(id);
      if (data.connection === "online" && data.identityStatus !== "active") {
        if (identity?.source === "remembered") studentIdentityStorage.clear();
        setIdentity(null); setHomeData(undefined); setIdentityError("קוד לא נמצא. בדקו את הקוד ונסו שוב.");
        return undefined;
      }
      setHomeData(data); setOperationError(undefined);
      setPendingSyncCount(await syncCoordinator.pendingCount(id));
      return data;
    }
    catch { setOperationError("לא ניתן לטעון כרגע את נתוני הבית. אפשר לנסות שוב."); }
  }, [identity?.source, studentId]);

  useEffect(() => {
    if (!studentId) return;
    queueMicrotask(() => { void refreshHome(); void syncCoordinator.flush(); });
    const interval = window.setInterval(() => { void syncCoordinator.flush().then(() => syncCoordinator.pendingCount(studentId).then(setPendingSyncCount)); }, syncConfig.flushIntervalMs);
    const online = () => { void syncCoordinator.reconnect().then(() => refreshHome(studentId)); };
    window.addEventListener("online", online);
    return () => { window.clearInterval(interval); window.removeEventListener("online", online); };
  }, [refreshHome, studentId]);

  async function submitStudentCode(candidate: string) {
    setCheckingIdentity(true); setIdentityError(undefined); setOperationError(undefined);
    try {
      if (!appsScriptClient) throw new Error("Backend is not configured");
      const remote = await appsScriptClient.getStudentHome(candidate);
      const active = remote.studentStatus === "active"
        || (!remote.studentStatus && !!remote.student && (remote.student.active === true || String(remote.student.active).toUpperCase() === "TRUE"));
      if (!active) {
        setIdentityError("קוד לא נמצא. בדקו את הקוד ונסו שוב.");
        return;
      }
      studentIdentityStorage.remember(candidate);
      setIdentity({ studentId: candidate, source: "remembered" });
      setHomeData(undefined);
    } catch {
      setIdentityError("לא ניתן לבדוק את הקוד כרגע. בדקו את החיבור ונסו שוב.");
    } finally {
      setCheckingIdentity(false);
    }
  }

  function changeStudent() {
    studentIdentityStorage.clear();
    setIdentity(null); setHomeData(undefined); setSession(undefined); setCompleted(undefined); setOperationError(undefined); setIdentityError(undefined); setPendingSyncCount(0);
    showRoute({ kind: "home" }, "replace");
  }

  async function startSession(skillIds: string[], settings: SessionSettings, assignmentId?: string, learningStage?: LearningStageReference, learningShortcut?: LearningShortcutReference, replaceHistory = false) {
    if (startingRef.current || !studentId) return;
    startingRef.current = true;
    setStarting(true);
    setOperationError(undefined);
    const progress = homeData?.learningProgress;
    setPreviousStageBestStars(learningStage ? progress?.bestStarsByStage[learningStage.stageId] ?? 0 : 0);
    setTotalStarsBefore(totalEarnedStars(LEARNING_PATHS, progress));
    try {
      const started = await studentPracticeService.start({ studentId, skillIds, settings, assignmentId, learningStage, learningShortcut });
      const pathId = learningStage?.pathId ?? learningShortcut?.pathId;
      const destination = pathId ? studentRoutePath({ kind: "course", pathId }, BASE_PATH) : studentRoutePath({ kind: "home" }, BASE_PATH);
      window.history[replaceHistory ? "replaceState" : "pushState"](studentHistoryState("session", pathId), "", destination);
      if (pathId) setActivePathId(pathId);
      setOperationError(undefined); setSession(started.session); setCompleted(undefined); setPreviousBest(started.previousBest); setPersonalBestUpdate(null); setStageStars(undefined); setShortcutPassed(undefined); setMasteryBefore(started.masteryBefore); setMasteryAfter(started.masteryBefore); setScreen("session");
    } catch { setOperationError("לא ניתן להתחיל את התרגול. נסו שוב."); }
    finally { startingRef.current = false; setStarting(false); }
  }

  async function finishSession(state: PracticeSessionState) {
    const finished = await studentPracticeService.finish(state); setMasteryAfter(finished.masteryAfter); setPersonalBestUpdate(finished.personalBest); setStageStars(finished.stageStars); setShortcutPassed(finished.shortcutPassed);
    await refreshHome(); setCompleted(state); setScreen("summary");
  }

  async function returnFromSession() {
    await refreshHome();
    const pathContext = completed?.session.learningStage ?? completed?.session.learningShortcut;
    if (isStudentHistoryState(window.history.state) && window.history.state.view === "session") {
      window.history.back();
    } else if (pathContext) {
      showRoute({ kind: "course", pathId: pathContext.pathId }, "replace");
    } else {
      showRoute({ kind: "home" }, "replace");
    }
  }

  return <div className="page" style={styles.page} dir="rtl"><div className="phone" style={{ ...styles.phone, color: theme.colors.text }}><main className="student-main" ref={mainRef} tabIndex={-1} style={styles.content}>
    {!studentId ? <StudentCodeEntryScreen checking={checkingIdentity} backendConfigured={backendConfigured} error={identityError} onSubmit={(code) => void submitStudentCode(code)} /> : <>
    {screen !== "session" && screen !== "summary" ? <div className="student-identity-bar"><span dir="ltr">{studentId}</span><button type="button" onClick={changeStudent}>החלפת תלמיד</button></div> : null}
    {operationError && screen !== "path" ? <p className="student-state student-state--error" role="alert">{operationError}</p> : null}
    {screen === "home" ? homeData ? <StudentHomeScreen data={homeData} definitions={definitions} starting={starting} onOpenPath={(pathId) => showRoute({ kind: "course", pathId })} onStartQuick={(skillIds) => void startSession(skillIds, { mode: "fixed", questionCount: 5 })} onFreePractice={() => setScreen("freePractice")} /> : <p className="student-state" role="status" aria-live="polite">טוען את המסלולים שלך…</p> : null}
    {screen === "path" ? activePath && homeData ? <LearningPathScreen key={activePath.id} path={activePath} progress={homeData.learningProgress} totalStars={totalEarnedStars(LEARNING_PATHS, homeData.learningProgress)} definitions={definitions} personalBests={personalBestRepository} riddleSubmissions={riddleSubmissionRepository} onRiddleSubmitted={() => void syncCoordinator.notifyRiddleSubmissionSaved()} starting={starting} error={operationError} onBack={backFromCourse} onPractice={(stage, skillIds) => void startSession(skillIds, LEARNING_STAGE_SETTINGS, undefined, stage)} onShortcut={(shortcut, skillIds) => void startSession(skillIds, LEARNING_STAGE_SETTINGS, undefined, undefined, shortcut)} /> : <p className="student-state" role="status" aria-live="polite">טוען את המסלול…</p> : null}
    {screen === "freePractice" ? <FreePracticeScreen definitions={definitions} onBack={() => setScreen("home")} onOpenDomain={(domainId) => { setActiveDomainId(domainId); setScreen("setup"); }} /> : null}
    {screen === "setup" && activeDomainId ? <SessionSetupScreen studentId={studentId} domainId={activeDomainId} definitions={definitions} onBack={() => setScreen("freePractice")} onStart={(skillIds, settings) => void startSession(skillIds, settings)} /> : null}
    {screen === "session" && session ? <SessionView session={session} definitions={definitions} previousBest={previousBest} onSessionEnd={(state) => void finishSession(state)} /> : null}
    {screen === "summary" && completed ? <SessionSummaryScreen completed={completed} masteryBefore={masteryBefore} masteryAfter={masteryAfter} personalBestUpdate={personalBestUpdate} stageStars={stageStars} previousStageBestStars={previousStageBestStars} totalStarsBefore={totalStarsBefore} shortcutPassed={shortcutPassed} homeLabel={completed.session.learningStage || completed.session.learningShortcut ? "חזרה למסלול" : undefined} onHome={() => void returnFromSession()} onRepeat={() => { const config = repeatSessionConfig(completed.session); void startSession(config.skillIds, config.settings, config.assignmentId, config.learningStage, config.learningShortcut, true); }} /> : null}
    {import.meta.env.DEV ? <details className="student-sync-diagnostic"><summary>מצב חיבור</summary><dl><div><dt>תלמיד</dt><dd dir="ltr">{studentId}</dd></div><div><dt>שרת</dt><dd>{backendConfigured ? "מוגדר" : "לא מוגדר"}</dd></div><div><dt>ממתינים לסנכרון</dt><dd>{pendingSyncCount}</dd></div></dl></details> : null}
    </>}
  </main></div></div>;
}
