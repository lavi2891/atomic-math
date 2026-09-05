import { useEffect, useMemo, useRef, useState } from "react";
import type { LearningPath, LearningShortcutReference, LearningStageReference, Stage, StageType, StudentLearningProgress } from "../../domain/learningPath/types.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import type { PersonalBestRepository } from "../../domain/personalBests/types.ts";
import { derivePathProgress } from "../../domain/learningPath/progression.ts";
import { contentBackedCatalog } from "../../domain/studentHome/contentAvailability.ts";
import { DOMAINS, SKILLS } from "../../content/catalog/index.ts";
import { PathNodeIcon, StageStars } from "./PathNodeIcon.tsx";
import { StageSheet } from "./StageSheet.tsx";
import { ShortcutSheet } from "./ShortcutSheet.tsx";
import "./learningPath.css";

type Props = {
  path: LearningPath;
  progress: StudentLearningProgress | undefined;
  definitions: readonly SkillQuestionDefinition[];
  personalBests: Pick<PersonalBestRepository, "get">;
  starting?: boolean;
  error?: string;
  onBack: () => void;
  onPractice: (reference: LearningStageReference, skillIds: string[]) => void;
  onShortcut: (reference: LearningShortcutReference, skillIds: string[]) => void;
};
const typeLabels: Record<StageType, string> = { normal: "שלב", review: "חזרה", checkpoint: "אתגר", bonus: "בונוס · לבחירה" };

export function LearningPathScreen({ path, progress, definitions, personalBests, starting = false, error, onBack, onPractice, onShortcut }: Props) {
  const [selectedStageId, setSelectedStageId] = useState<string>();
  const [selectedChapterId, setSelectedChapterId] = useState<string>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLLIElement>(null);
  const stages = path.chapters.flatMap((chapter) => chapter.stages);
  const states = new Map(progress ? derivePathProgress(path, progress).map((state) => [state.stageId, state]) : []);
  const currentStage = stages.find((stage) => stage.type !== "bonus" && states.get(stage.id)?.status === "available");
  const focusStageId = currentStage?.id ?? [...stages].reverse().find((stage) => stage.type !== "bonus" && states.get(stage.id)?.status === "completed")?.id;
  const available = useMemo(() => new Set(contentBackedCatalog(DOMAINS, SKILLS, definitions)
    .flatMap(({ skills }) => skills.filter((skill) => skill.modes.fixed).map((skill) => skill.id))), [definitions]);
  const selectedStage = stages.find((stage) => stage.id === selectedStageId);
  const selectedState = selectedStage && states.get(selectedStage.id);
  const selectedChapter = path.chapters.find((chapter) => chapter.id === selectedChapterId);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const scroller = scrollRef.current;
      const current = currentRef.current;
      if (scroller && current) {
        const top = current.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
        scroller.scrollTo({ top: top - (scroller.clientHeight - current.clientHeight) / 2, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
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
        {status === "completed" || status === "locked" ? <span className="path-node-status"><PathNodeIcon kind={status === "completed" ? "check" : "lock"} /></span> : null}
      </button>
      <div className="path-node-label"><span className="path-type-label">{current ? "כאן ממשיכים" : bypassed ? "הושלם בבדיקת קיצור" : typeLabels[stage.type]}</span><span>{stage.nameHe}</span>{state && state.stars > 0 ? <StageStars stars={state.stars} /> : null}</div>
    </li>;
  }

  // Reverse DOM order as well as visual order: later stages are physically above.
  const rows = path.chapters.flatMap((chapter, index) => {
    const main = chapter.stages.filter((stage) => stage.type !== "bonus");
    const completed = main.length > 0 && main.every((stage) => states.get(stage.id)?.status === "completed");
    const current = chapter.stages.some((stage) => stage.id === currentStage?.id);
    const status = completed ? "completed" : current ? "available" : "locked";
    const shortcutAvailable = !!chapter.shortcutTest && status !== "locked";
    return [<li key={chapter.id} className="path-row path-chapter-row" data-kind="chapter" data-status={status}>
      {shortcutAvailable ? <button type="button" className="path-chapter-node" aria-haspopup="dialog" aria-label={`פרק ${index + 1}: ${chapter.nameHe} · בדיקת קיצור`} disabled={starting} onClick={() => setSelectedChapterId(chapter.id)}><PathNodeIcon kind={completed ? "check" : "chapter"} /><span>{index + 1}</span><small>בדיקת קיצור</small></button>
        : <div className="path-chapter-node" aria-hidden="true"><PathNodeIcon kind={completed ? "check" : current ? "chapter" : "lock"} /><span>{index + 1}</span></div>}
      <h2 className="path-node-label"><small>פרק {index + 1}{completed ? " · הושלם" : ""}</small>{chapter.nameHe}</h2>
    </li>, ...chapter.stages.map(stageNode)];
  }).reverse();

  return <section className="learning-path-screen">
    <header className="path-screen-header"><button type="button" className="quiet-button" disabled={starting} onClick={onBack}>חזרה לבית</button><div><h1>{path.nameHe}</h1><p>מתקדמים למעלה, שלב אחרי שלב ↑</p></div></header>
    {!progress ? <p role="status">לא ניתן לטעון את ההתקדמות כרגע</p> : !stages.length ? <p role="status">המסלול ייפתח בקרוב</p> :
      <div ref={scrollRef} className="path-scroll" role="region" aria-label="מפת המסלול, מתקדמים מלמטה למעלה" tabIndex={0}>
        <ol className="path-route" aria-label="פרקים ושלבים, מהיעד אל ההתחלה">{rows}</ol>
      </div>}
    {selectedStage && selectedState && selectedState.status !== "locked" && progress ? <StageSheet key={selectedStage.id} stage={selectedStage} stars={selectedState.stars} bypassed={selectedState.stars === 0 && progress.bypassedStageIds?.includes(selectedStage.id)} studentId={progress.studentId}
      canPractice={selectedStage.skillIds.every((id) => available.has(id))} starting={starting} error={error} personalBests={personalBests}
      onClose={() => setSelectedStageId(undefined)} onPractice={() => onPractice({ pathId: path.id, stageId: selectedStage.id }, [...selectedStage.skillIds])} /> : null}
    {selectedChapter?.shortcutTest && progress ? <ShortcutSheet key={selectedChapter.id} chapter={selectedChapter} passed={progress.passedShortcutIds?.includes(selectedChapter.shortcutTest.id) === true}
      canPractice={selectedChapter.shortcutTest.skillIds.every((id) => available.has(id))} starting={starting} error={error}
      onClose={() => setSelectedChapterId(undefined)} onPractice={() => onShortcut({ pathId: path.id, chapterId: selectedChapter.id, shortcutId: selectedChapter.shortcutTest!.id }, [...selectedChapter.shortcutTest!.skillIds])} /> : null}
  </section>;
}
