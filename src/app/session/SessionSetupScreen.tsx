import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { DOMAINS, SKILLS, listSkillsByDomain } from "../../content/catalog/index.ts";
import type { SessionMode, SessionSettings } from "@domain/session/practiceSession";
import { FIXED_QUESTION_COUNTS } from "@domain/session/practiceSession";
import type { SkillQuestionDefinition } from "@domain/session/skillQuestionSelector";
import { colors } from "@ui/tokens";
import { selectionState, toggleChild, toggleParent } from "@domain/studentHome/treeSelection";
import { sessionDefaults, TIMED_DURATION_PRESETS_SECONDS, type TimedDurationSeconds } from "@domain/session/config";
import { TopicIcon } from "@ui/icons/TopicIcon";
import type { TopicIconName } from "@ui/icons/types";
import { createChallengeSignature } from "@domain/personalBests/challengeSignature";
import { personalBestRepository } from "@app/persistenceInstances";

type Props = { studentId: string; domainId: string; definitions: readonly SkillQuestionDefinition[]; onBack: () => void; onStart: (skillIds: string[], settings: SessionSettings) => void };
const MODES: Array<{ id: SessionMode; icon: string; title: string; description: string }> = [
  { id: "fixed", icon: "#", title: "מספר שאלות", description: "בוחרים כמה לפתור" },
  { id: "survival", icon: "♡", title: "הישרדות", description: `${sessionDefaults.survivalMaxErrors} פסילות` },
  { id: "timed", icon: "◷", title: "נגד השעון", description: "בוחרים זמן" },
  { id: "practice", icon: "∞", title: "תרגול חופשי", description: "בלי הגבלה" },
];

export function SessionSetupScreen({ studentId, domainId, definitions, onBack, onStart }: Props) {
  const available = useMemo(() => new Set(definitions.map((item) => item.skillId)), [definitions]);
  const skills = listSkillsByDomain(domainId).filter((skill) => available.has(skill.id));
  const domain = DOMAINS.find((item) => item.id === domainId); const childIds = skills.map((skill) => skill.id);
  const [selected, setSelected] = useState<string[]>([]); const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<SessionMode>("fixed"); const [questionCount, setQuestionCount] = useState<5 | 10 | 15 | 20>(sessionDefaults.fixedQuestionCount);
  const [timedDuration, setTimedDuration] = useState<TimedDurationSeconds>(sessionDefaults.timedDurationSeconds); const [bestScore, setBestScore] = useState<number | null>(null);
  const parentState = selectionState(selected, childIds); const accent = domain ? colors[domain.colorToken as keyof typeof colors] ?? colors.topicBlue : colors.topicBlue;
  const settings = useMemo<SessionSettings>(() => mode === "fixed" ? { mode, questionCount } : mode === "survival" ? { mode, maxErrors: sessionDefaults.survivalMaxErrors } : mode === "timed" ? { mode, durationSeconds: timedDuration } : { mode: "practice" }, [mode, questionCount, timedDuration]);
  const challengeSignature = useMemo(() => createChallengeSignature(settings, selected, DOMAINS, SKILLS), [selected, settings]);

  useEffect(() => {
    if (!challengeSignature) { queueMicrotask(() => setBestScore(null)); return; }
    let active = true; void personalBestRepository.get(studentId, challengeSignature).then((best) => { if (active) setBestScore(best?.bestScore ?? null); });
    return () => { active = false; };
  }, [challengeSignature, studentId]);

  return <section className="setup-screen">
    <header className="section-header"><button type="button" onClick={onBack} className="quiet-button">חזרה</button><h1>תרגול חופשי</h1></header>
    <section className="domain-tree" style={{ "--domain-accent": accent } as CSSProperties}>
      <div className="domain-tree__header"><span className="domain-icon" aria-hidden="true">{domain ? <TopicIcon name={domain.icon as TopicIconName} size={28} /> : null}</span><span className="domain-tree__title"><strong>{domain?.nameHe ?? domainId}</strong><small>{selected.length} מתוך {skills.length} מיומנויות נבחרו</small></span>
        <button type="button" className="tree-select" aria-pressed={parentState === "all"} data-partial={parentState === "partial"} onClick={() => setSelected((current) => toggleParent(current, childIds))}>{parentState === "all" ? "נבחר הכל" : parentState === "partial" ? "נבחר חלקית" : "בחר הכל"}</button>
        <button type="button" className="tree-expand" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "סגור" : "פתח"} <span aria-hidden="true">{expanded ? "⌃" : "⌄"}</span></button></div>
      {expanded ? <div className="domain-tree__children">{skills.map((skill) => { const isSelected = selected.includes(skill.id); return <button key={skill.id} type="button" className="skill-row" aria-pressed={isSelected} onClick={() => setSelected((current) => toggleChild(current, skill.id))}><span className="selection-mark" aria-hidden="true">{isSelected ? "✓" : ""}</span><span><strong>{skill.shortNameHe ?? skill.nameHe}</strong>{skill.shortNameHe ? <small>{skill.nameHe}</small> : null}</span></button>; })}</div> : null}
    </section>
    <h2>איך מתרגלים?</h2><div className="mode-grid">{MODES.map((item) => <button key={item.id} type="button" className="mode-card" aria-pressed={mode === item.id} onClick={() => setMode(item.id)}><span className="mode-card__icon" aria-hidden="true">{item.icon}</span><span><strong>{item.title}</strong><small>{item.description}</small></span></button>)}</div>
    {mode === "timed" ? <fieldset className="timed-presets"><legend>משך האתגר</legend>{TIMED_DURATION_PRESETS_SECONDS.map((seconds) => <button key={seconds} type="button" aria-pressed={timedDuration === seconds} onClick={() => setTimedDuration(seconds)}>{seconds < 60 ? `${seconds} שניות` : `${seconds / 60} דקות`}</button>)}<small>{!challengeSignature ? "השיא נשמר בבחירת מיומנות אחת או תחום מלא" : bestScore === null ? "עוד אין שיא אישי לאתגר הזה" : `השיא שלך: ${bestScore} תשובות נכונות`}</small></fieldset> : null}
    {mode === "survival" ? <div className="personal-best-preview"><strong>הישרדות · {sessionDefaults.survivalMaxErrors} פסילות</strong><small>{!challengeSignature ? "השיא נשמר בבחירת מיומנות אחת או תחום מלא" : bestScore === null ? "עוד אין שיא אישי לאתגר הזה" : `השיא שלך: ${bestScore}`}</small></div> : null}
    {mode === "fixed" ? <label className="question-count">מספר שאלות<select value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value) as 5 | 10 | 15 | 20)}>{FIXED_QUESTION_COUNTS.map((count) => <option key={count}>{count}</option>)}</select></label> : null}
    <button type="button" className="primary-action" disabled={!selected.length} onClick={() => selected.length && onStart(selected, settings)}>התחלת תרגול</button>
  </section>;
}
