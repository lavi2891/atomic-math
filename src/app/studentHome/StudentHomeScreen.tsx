import { useMemo } from "react";
import { DOMAINS, SKILLS } from "../../content/catalog/index.ts";
import { LEARNING_PATHS } from "../../content/learningPaths.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import type { StudentHomeData } from "../../domain/studentHome/types.ts";
import type { LearningPathId } from "../../domain/learningPath/types.ts";
import { contentBackedCatalog } from "../../domain/studentHome/contentAvailability.ts";
import { resolveQuickPracticeScope } from "../../domain/studentHome/quickPractice.ts";
import { learningPathCards } from "../../domain/studentHome/learningPathCards.ts";

type Props = {
  data: StudentHomeData;
  definitions: readonly SkillQuestionDefinition[];
  starting?: boolean;
  onOpenPath: (pathId: LearningPathId) => void;
  onStartQuick: (skillIds: string[]) => void;
  onFreePractice: () => void;
};

export function StudentHomeScreen({ data, definitions, starting = false, onOpenPath, onStartQuick, onFreePractice }: Props) {
  const available = useMemo(() => new Set(contentBackedCatalog(DOMAINS, SKILLS, definitions)
    .flatMap(({ skills }) => skills.filter((skill) => skill.modes.fixed).map((skill) => skill.id))), [definitions]);
  const cards = learningPathCards(LEARNING_PATHS, data.learningProgress, available);
  const quick = useMemo(() => resolveQuickPracticeScope({ assignments: data.assignments, masteryBySkill: data.masteryBySkill, domains: DOMAINS, skills: SKILLS, definitions }), [data.assignments, data.masteryBySkill, definitions]);
  const quickIds = quick.skillIds.filter((id) => available.has(id));

  return <section className="home-screen student-home" aria-busy={starting}>
    <h1>המשך במסלול</h1>
    <div className="learning-path-cards">
      {cards.map((card) => <article key={card.path.id} className="learning-path-card" data-path={card.path.id} aria-labelledby={`path-${card.path.id}`}>
        <h2 id={`path-${card.path.id}`}>{card.path.nameHe}</h2>
        <div className="learning-path-position">
          {card.chapter && card.stage ? <><p>{card.chapter.nameHe}</p><p className="learning-path-stage">{card.pathCompleted ? "המסלול הושלם · " : "השלב הבא: "}{card.stage.nameHe}</p></> :
            <p>{card.availability === "progress_unavailable" ? "לא ניתן לטעון את ההתקדמות כרגע" : "המסלול ייפתח בקרוב"}</p>}
          {card.availability === "content_unavailable" ? <small>השלב יהיה זמין בקרוב</small> : null}
        </div>
        <div className="learning-path-progress">
          <progress value={card.availability === "progress_unavailable" ? undefined : card.completedStages} max={card.totalStages || 1} aria-label={`התקדמות בפרק במסלול ${card.path.nameHe}`} />
          {card.totalStages > 0 ? <small>{card.completedStages} מתוך {card.totalStages} שלבים בפרק</small> : null}
        </div>
        <button type="button" className="primary-action" aria-label={`${card.pathCompleted ? "תרגול נוסף" : "המשך"} במסלול ${card.path.nameHe}`} disabled={starting || card.availability !== "ready"} onClick={() => {
          if (card.availability === "ready") onOpenPath(card.path.id);
        }}>{card.pathCompleted ? "תרגול נוסף" : "המשך"}</button>
      </article>)}
    </div>
    <section className="home-secondary-action" aria-labelledby="quick-check-title">
      <h2 id="quick-check-title">בדיקה מהירה</h2>
      <p>{quickIds.length ? "5 שאלות לתרגול קצר" : "אין כרגע שאלות זמינות"}</p>
      <button type="button" className="quiet-button" disabled={starting || !quickIds.length} onClick={() => onStartQuick(quickIds)}>התחל בדיקה</button>
    </section>
    <button type="button" className="home-free-practice quiet-button" disabled={starting} onClick={onFreePractice}>תרגול חופשי <span aria-hidden="true">←</span></button>
    {data.connection === "offline" ? <small className="home-connection" role="status">אפשר להמשיך ללמוד גם ללא חיבור</small> : null}
  </section>;
}
