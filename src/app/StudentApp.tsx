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
import type { LearningPathId, LearningShortcutReference, LearningStageReference, StageStars } from "../domain/learningPath/types.ts";
import { LearningPathScreen } from "./learningPath/LearningPathScreen.tsx";
import { LEARNING_PATHS } from "../content/learningPaths.ts";
import { LEARNING_STAGE_SETTINGS } from "../domain/learningPath/sessionProgress.ts";
import { personalBestRepository, riddleSubmissionRepository } from "./persistenceInstances.ts";
import { studentIdentityProvider } from "../config/runtime.ts";
import { selectQuestionPool } from "@app/questionPools";
import { syncCoordinator } from "@app/syncInstance";
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

  async function startSession(skillIds: string[], settings: SessionSettings, assignmentId?: string, learningStage?: LearningStageReference, learningShortcut?: LearningShortcutReference, replaceHistory = false) {
    if (startingRef.current) return;
    startingRef.current = true;
    setStarting(true);
    setOperationError(undefined);
    const progress = homeData?.learningProgress;
    setPreviousStageBestStars(learningStage ? progress?.bestStarsByStage[learningStage.stageId] ?? 0 : 0);
    setTotalStarsBefore(totalEarnedStars(LEARNING_PATHS, progress));
    try {
      const started = await studentPracticeService.start({ studentId: studentIdentityProvider.getStudentId(), skillIds, settings, assignmentId, learningStage, learningShortcut });
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
    {operationError && screen !== "path" ? <p className="student-state student-state--error" role="alert">{operationError}</p> : null}
    {screen === "home" ? homeData ? <StudentHomeScreen data={homeData} definitions={definitions} starting={starting} onOpenPath={(pathId) => showRoute({ kind: "course", pathId })} onStartQuick={(skillIds) => void startSession(skillIds, { mode: "fixed", questionCount: 5 })} onFreePractice={() => setScreen("freePractice")} /> : <p className="student-state" role="status" aria-live="polite">טוען את המסלולים שלך…</p> : null}
    {screen === "path" ? activePath && homeData ? <LearningPathScreen key={activePath.id} path={activePath} progress={homeData.learningProgress} totalStars={totalEarnedStars(LEARNING_PATHS, homeData.learningProgress)} definitions={definitions} personalBests={personalBestRepository} riddleSubmissions={riddleSubmissionRepository} onRiddleSubmitted={() => void syncCoordinator.notifyRiddleSubmissionSaved()} starting={starting} error={operationError} onBack={backFromCourse} onPractice={(stage, skillIds) => void startSession(skillIds, LEARNING_STAGE_SETTINGS, undefined, stage)} onShortcut={(shortcut, skillIds) => void startSession(skillIds, LEARNING_STAGE_SETTINGS, undefined, undefined, shortcut)} /> : <p className="student-state" role="status" aria-live="polite">טוען את המסלול…</p> : null}
    {screen === "freePractice" ? <FreePracticeScreen definitions={definitions} onBack={() => setScreen("home")} onOpenDomain={(domainId) => { setActiveDomainId(domainId); setScreen("setup"); }} /> : null}
    {screen === "setup" && activeDomainId ? <SessionSetupScreen studentId={studentIdentityProvider.getStudentId()} domainId={activeDomainId} definitions={definitions} onBack={() => setScreen("freePractice")} onStart={(skillIds, settings) => void startSession(skillIds, settings)} /> : null}
    {screen === "session" && session ? <SessionView session={session} definitions={definitions} previousBest={previousBest} onSessionEnd={(state) => void finishSession(state)} /> : null}
    {screen === "summary" && completed ? <SessionSummaryScreen completed={completed} masteryBefore={masteryBefore} masteryAfter={masteryAfter} personalBestUpdate={personalBestUpdate} stageStars={stageStars} previousStageBestStars={previousStageBestStars} totalStarsBefore={totalStarsBefore} shortcutPassed={shortcutPassed} homeLabel={completed.session.learningStage || completed.session.learningShortcut ? "חזרה למסלול" : undefined} onHome={() => void returnFromSession()} onRepeat={() => { const config = repeatSessionConfig(completed.session); void startSession(config.skillIds, config.settings, config.assignmentId, config.learningStage, config.learningShortcut, true); }} /> : null}
  </main></div></div>;
}
