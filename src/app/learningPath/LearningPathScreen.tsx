import { useEffect, useMemo, useRef, useState } from "react";
import type { LearningPath, LearningShortcutReference, LearningStageReference, Stage, StageType, StudentLearningProgress } from "../../domain/learningPath/types.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import type { PersonalBestRepository } from "../../domain/personalBests/types.ts";
import { derivePathProgress, totalEarnedStars } from "../../domain/learningPath/progression.ts";
import { contentBackedCatalog } from "../../domain/studentHome/contentAvailability.ts";
import { DOMAINS, SKILLS } from "../../content/catalog/index.ts";
import { PathNodeIcon, StageStars } from "./PathNodeIcon.tsx";
import { StageSheet } from "./StageSheet.tsx";
import { ShortcutSheet } from "./ShortcutSheet.tsx";
import { TotalStars } from "./TotalStars.tsx";
import { DEFAULT_PAST_STAGE_COUNT, derivePathViewport } from "./pathViewport.ts";
import type { RiddleSubmissionRepository } from "../../domain/optionalLearningContent/RiddleSubmissionRepository.ts";
import type { OptionalLearningNode } from "../../domain/optionalLearningContent/types.ts";
import { RiddleDifficultyBadge, RiddleSheet } from "./RiddleSheet.tsx";
import { ResourceSheet } from "./ResourceSheet.tsx";
import "./learningPath.css";

type Props = {
  path: LearningPath;
  progress: StudentLearningProgress | undefined;
  totalStars?: number;
  definitions: readonly SkillQuestionDefinition[];
  personalBests: Pick<PersonalBestRepository, "get">;
  starting?: boolean;
  error?: string;
  onBack: () => void;
  onPractice: (reference: LearningStageReference, skillIds: string[]) => void;
  onShortcut: (reference: LearningShortcutReference, skillIds: string[]) => void;
  riddleSubmissions: RiddleSubmissionRepository;
  onRiddleSubmitted?: () => void;
};
const typeLabels: Record<StageType, string> = { normal: "שלב", review: "חזרה", checkpoint: "אתגר", bonus: "בונוס · לבחירה" };

export function LearningPathScreen({ path, progress, totalStars, definitions, personalBests, starting = false, error, onBack, onPractice, onShortcut, riddleSubmissions, onRiddleSubmitted }: Props) {
  const [selectedStageId, setSelectedStageId] = useState<string>();
  const [selectedChapterId, setSelectedChapterId] = useState<string>();
  const [selectedOptionalId, setSelectedOptionalId] = useState<string>();
  const [historyWindow, setHistoryWindow] = useState<{ focusStageId?: string; count: number }>({ count: DEFAULT_PAST_STAGE_COUNT });
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLLIElement>(null);
  const stages = path.chapters.flatMap((chapter) => chapter.stages);
  const states = new Map(progress ? derivePathProgress(path, progress).map((state) => [state.stageId, state]) : []);
  const currentStage = stages.find((stage) => stage.type !== "bonus" && states.get(stage.id)?.status === "available");
  const focusStageId = currentStage?.id ?? [...stages].reverse().find((stage) => stage.type !== "bonus" && states.get(stage.id)?.status === "completed")?.id;
  const pastStageCount = historyWindow.focusStageId === focusStageId ? historyWindow.count : DEFAULT_PAST_STAGE_COUNT;
  const viewport = derivePathViewport(path, focusStageId, pastStageCount);
  const available = useMemo(() => new Set(contentBackedCatalog(DOMAINS, SKILLS, definitions)
    .flatMap(({ skills }) => skills.filter((skill) => skill.modes.fixed).map((skill) => skill.id))), [definitions]);
  const selectedStage = stages.find((stage) => stage.id === selectedStageId);
  const selectedState = selectedStage && states.get(selectedStage.id);
  const selectedChapter = path.chapters.find((chapter) => chapter.id === selectedChapterId);
  const optionalNodes = path.chapters.flatMap((chapter) => chapter.optionalNodes ?? []);
  const selectedOptional = optionalNodes.find((node) => node.id === selectedOptionalId);
  const firstLockedMainStageId = stages.find((stage) => stage.type !== "bonus" && states.get(stage.id)?.status === "locked")?.id;
  const firstLockedChapterId = path.chapters.find((chapter) => {
    const main = chapter.stages.filter((stage) => stage.type !== "bonus");
    return main.length > 0 && main.every((stage) => states.get(stage.id)?.status === "locked");
  })?.id;

  useEffect(() => {
    if (typeof window === "undefined") return;
    let frame = 0;
    const centerCurrent = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scroller = scrollRef.current;
        const current = currentRef.current;
        if (scroller && current) {
          const top = current.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
          const centered = top - (scroller.clientHeight - current.clientHeight) / 2;
          scroller.scrollTo({ top: Math.max(0, Math.min(centered, scroller.scrollHeight - scroller.clientHeight)), behavior: "instant" });
        }
      });
    };
    centerCurrent();
    window.addEventListener("resize", centerCurrent);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", centerCurrent); };
  }, [path.id, focusStageId]);

  function stageNode(stage: Stage) {
    const state = states.get(stage.id);
    const status = state?.status ?? "locked";
    const current = stage.id === currentStage?.id;
    const bypassed = status === "completed" && state?.stars === 0 && progress?.bypassedStageIds?.includes(stage.id) === true;
    const label = `${stage.nameHe} · ${typeLabels[stage.type]} · ${current ? "כאן ממשיכים" : bypassed ? "הושלם בבדיקת קיצור" : status === "completed" ? "הושלם" : status === "locked" ? "בהמשך" : "זמין"}`;
    return <li key={stage.id} ref={stage.id === focusStageId ? currentRef : undefined} className="path-row" data-kind={stage.type} data-status={status} data-current={current} data-stage-id={stage.id}>
      {stage.type === "bonus" ? <span className="path-branch" aria-hidden="true" /> : null}
      <button type="button" className="path-stage-node" aria-label={label} aria-current={current ? "step" : undefined} aria-haspopup="dialog" disabled={starting || status === "locked"} onClick={() => setSelectedStageId(stage.id)}>
        <span className="path-node-shape"><PathNodeIcon kind={stage.type} /></span>
        {status === "completed" || stage.id === firstLockedMainStageId ? <span className="path-node-status"><PathNodeIcon kind={status === "completed" ? "check" : "lock"} /></span> : null}
      </button>
      <div className="path-node-label"><span className="path-type-label">{current ? "כאן ממשיכים" : bypassed ? "הושלם בבדיקת קיצור" : typeLabels[stage.type]}</span><span>{stage.nameHe}</span>{state && state.stars > 0 ? <StageStars stars={state.stars} /> : null}</div>
    </li>;
  }

  function optionalNode(node: OptionalLearningNode) {
    const riddle = node.type === "riddle";
    const typeLabel = riddle ? "חידה" : node.type === "video" ? "סרטון" : node.type === "tool" ? "כלי" : node.type === "article" ? "מאמר" : "קישור";
    return <li key={node.id} className="path-row path-optional-row" data-kind={node.type} data-optional-id={node.id}>
      <span className="path-optional-branch" aria-hidden="true" />
      <button type="button" className="path-optional-node" aria-haspopup="dialog" aria-label={`${typeLabel} לבחירה: ${node.titleHe}`} onClick={() => setSelectedOptionalId(node.id)}>
        <span className="path-optional-icon"><PathNodeIcon kind={node.type} /></span>
      </button>
      <div className="path-optional-label"><small>{typeLabel} · לבחירה</small><span>{node.titleHe}</span>{riddle ? <RiddleDifficultyBadge difficulty={node.difficulty} /> : null}</div>
    </li>;
  }

  // Reverse DOM order as well as visual order: later stages are physically above.
  const pathRows = path.chapters.flatMap((chapter, index) => {
    const visibleStages = chapter.stages.filter((stage) => viewport.visibleStageIds.has(stage.id));
    if (visibleStages.length === 0) return [];
    const main = chapter.stages.filter((stage) => stage.type !== "bonus");
    const completed = main.length > 0 && main.every((stage) => states.get(stage.id)?.status === "completed");
    const current = chapter.stages.some((stage) => stage.id === currentStage?.id);
    const status = completed ? "completed" : current ? "available" : "locked";
    const shortcutAvailable = !!chapter.shortcutTest && status !== "locked";
    const shortcutPassed = chapter.shortcutTest ? progress?.passedShortcutIds?.includes(chapter.shortcutTest.id) === true : false;
    const showsChapterBoundary = main[0] ? viewport.visibleStageIds.has(main[0].id) : false;
    const chapterRow = <li key={chapter.id} className="path-row path-chapter-row" data-kind="chapter" data-status={status}>
      {shortcutAvailable ? <><span className="path-shortcut-branch" aria-hidden="true" /><button type="button" className="path-shortcut-node" data-passed={shortcutPassed} aria-haspopup="dialog" aria-label={`בדיקת קיצור לבחירה לפרק ${index + 1}: ${chapter.nameHe}`} disabled={starting} onClick={() => setSelectedChapterId(chapter.id)}><span className="path-shortcut-icon"><PathNodeIcon kind="key" /></span><span><strong>{shortcutPassed ? "הקיצור פתוח" : "כבר מכיר?"}</strong><small>{shortcutPassed ? "אפשר לנסות שוב" : "בדיקה קצרה לדילוג"}</small></span></button></> : null}
      <div className="path-chapter-node" aria-hidden="true"><PathNodeIcon kind={completed ? "check" : "chapter"} /><span>{index + 1}</span>{chapter.id === firstLockedChapterId ? <span className="path-node-status"><PathNodeIcon kind="lock" /></span> : null}</div>
      <h2 className="path-node-label"><small>פרק {index + 1}{completed ? " · הושלם" : ""}</small>{chapter.nameHe}</h2>
    </li>;
    return [...(showsChapterBoundary ? [chapterRow] : []), ...(chapter.optionalNodes ?? []).map(optionalNode), ...visibleStages.map(stageNode)];
  });
  const rows = [
    ...(viewport.hasOlderRequiredStages ? [<li key="older" className="path-row path-history-row">
      <button type="button" className="path-history-node" onClick={() => setHistoryWindow({ focusStageId, count: pastStageCount + DEFAULT_PAST_STAGE_COUNT })}>
        <span aria-hidden="true">•••</span><span>שלבים קודמים</span>
      </button>
    </li>] : []),
    ...pathRows,
    ...(viewport.hasFutureRequiredStages ? [<li key="continuation" className="path-row path-continuation-row" aria-label="המסלול ממשיך">
      <div className="path-continuation-node" role="img" aria-label="עוד בדרך"><span /><span /><span /></div>
      <span className="path-continuation-label" aria-hidden="true">עוד בדרך</span>
    </li>] : []),
  ].reverse();

  return <section className="learning-path-screen">
    <header className="path-screen-header"><button type="button" className="quiet-button" disabled={starting} onClick={onBack}>חזרה לבית</button><div><h1>{path.nameHe}</h1><p>מתקדמים למעלה, שלב אחרי שלב ↑</p></div>{progress ? <TotalStars count={totalStars ?? totalEarnedStars([path], progress)} /> : null}</header>
    {!progress ? <p className="student-state student-state--error" role="status">לא ניתן לטעון את ההתקדמות כרגע</p> : !stages.length ? <p className="student-state" role="status">המסלול ייפתח בקרוב</p> :
      <div ref={scrollRef} className="path-scroll" role="region" aria-label="מפת המסלול, מתקדמים מלמטה למעלה" tabIndex={0}>
        <ol className="path-route" aria-label="פרקים ושלבים, מהיעד אל ההתחלה">{rows}</ol>
      </div>}
    {selectedStage && selectedState && selectedState.status !== "locked" && progress ? <StageSheet key={selectedStage.id} stage={selectedStage} stars={selectedState.stars} bypassed={selectedState.stars === 0 && progress.bypassedStageIds?.includes(selectedStage.id)} studentId={progress.studentId}
      canPractice={selectedStage.skillIds.every((id) => available.has(id))} starting={starting} error={error} personalBests={personalBests}
      onClose={() => setSelectedStageId(undefined)} onPractice={() => onPractice({ pathId: path.id, stageId: selectedStage.id }, [...selectedStage.skillIds])} /> : null}
    {selectedChapter?.shortcutTest && progress ? <ShortcutSheet key={selectedChapter.id} chapter={selectedChapter} passed={progress.passedShortcutIds?.includes(selectedChapter.shortcutTest.id) === true}
      canPractice={selectedChapter.shortcutTest.skillIds.every((id) => available.has(id))} starting={starting} error={error}
      onClose={() => setSelectedChapterId(undefined)} onPractice={() => onShortcut({ pathId: path.id, chapterId: selectedChapter.id, shortcutId: selectedChapter.shortcutTest!.id }, [...selectedChapter.shortcutTest!.skillIds])} /> : null}
    {selectedOptional?.type === "riddle" && progress ? <RiddleSheet key={selectedOptional.id} riddle={selectedOptional} studentId={progress.studentId} submissions={riddleSubmissions} onSubmitted={onRiddleSubmitted} onClose={() => setSelectedOptionalId(undefined)} /> : null}
    {selectedOptional && selectedOptional.type !== "riddle" ? <ResourceSheet key={selectedOptional.id} resource={selectedOptional} onClose={() => setSelectedOptionalId(undefined)} /> : null}
  </section>;
}
