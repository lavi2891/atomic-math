import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { DOMAINS, SKILLS, listSkillsByDomain } from "../../content/catalog/index.ts";
import type { SessionMode, SessionSettings } from "@domain/session/practiceSession";
import { FIXED_QUESTION_COUNTS } from "@domain/session/practiceSession";
import type { SkillQuestionDefinition } from "@domain/session/skillQuestionSelector";
import { colors } from "@ui/tokens";
import { selectionState, toggleParent } from "@domain/studentHome/treeSelection";
import { sessionDefaults, TIMED_DURATION_PRESETS_SECONDS, type TimedDurationSeconds } from "@domain/session/config";
import { TopicIcon } from "@ui/icons/TopicIcon";
import type { TopicIconName } from "@ui/icons/types";
import { createChallengeSignature } from "@domain/personalBests/challengeSignature";
import { personalBestRepository } from "@app/persistenceInstances";
import { presentationItems } from "../../content/catalog/skillGroups.ts";
import { modeEligible } from "@domain/session/challengeContent";

type Props = { studentId: string; domainId: string; definitions: readonly SkillQuestionDefinition[]; onBack: () => void; onStart: (skillIds: string[], settings: SessionSettings) => void };
const MODES: Array<{ id: SessionMode; icon: string; title: string; description: string }> = [
  { id: "fixed", icon: "#", title: "מספר שאלות", description: "בוחרים כמה לפתור" },
  { id: "survival", icon: "♡", title: "הישרדות", description: `${sessionDefaults.survivalMaxErrors} פסילות` },
  { id: "timed", icon: "◷", title: "נגד השעון", description: "בוחרים זמן" },
  { id: "practice", icon: "∞", title: "תרגול חופשי", description: "בלי הגבלה" },
];

export function SessionSetupScreen({ studentId, domainId, definitions, onBack, onStart }: Props) {
  const available = useMemo(() => new Set(definitions.map((item) => item.skillId)), [definitions]);
  const [selected, setSelected] = useState<string[]>([]); const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<SessionMode>("fixed"); const [questionCount, setQuestionCount] = useState<5 | 10 | 15 | 20>(sessionDefaults.fixedQuestionCount);
  const [timedDuration, setTimedDuration] = useState<TimedDurationSeconds>(sessionDefaults.timedDurationSeconds); const [bestScore, setBestScore] = useState<number | null>(null);
  const settings = useMemo<SessionSettings>(() => mode === "fixed" ? { mode, questionCount } : mode === "survival" ? { mode, maxErrors: sessionDefaults.survivalMaxErrors } : mode === "timed" ? { mode, durationSeconds: timedDuration } : { mode: "practice" }, [mode, questionCount, timedDuration]);
  const skills = useMemo(() => listSkillsByDomain(domainId).filter((skill) => available.has(skill.id) && modeEligible(skill, settings)), [available, domainId, settings]);
  const domain = DOMAINS.find((item) => item.id === domainId); const childIds = useMemo(() => skills.map((skill) => skill.id), [skills]);
  const items = useMemo(() => presentationItems(domainId, childIds, skills), [childIds, domainId, skills]);
  const validSelected = useMemo(() => selected.filter((id) => childIds.includes(id)), [childIds, selected]);
  const parentState = selectionState(validSelected, childIds); const accent = domain ? colors[domain.colorToken as keyof typeof colors] ?? colors.topicBlue : colors.topicBlue;
  const challengeSignature = useMemo(() => createChallengeSignature(settings, validSelected, DOMAINS, SKILLS), [validSelected, settings]);

  useEffect(() => {
    if (!challengeSignature) { queueMicrotask(() => setBestScore(null)); return; }
    let active = true; void personalBestRepository.get(studentId, challengeSignature).then((best) => { if (active) setBestScore(best?.bestScore ?? null); });
    return () => { active = false; };
  }, [challengeSignature, studentId]);

  return <section className="setup-screen">
    <header className="section-header"><button type="button" onClick={onBack} className="quiet-button">חזרה</button><h1>תרגול חופשי</h1></header>
    <section className="domain-tree" style={{ "--domain-accent": accent } as CSSProperties}>
      <div className="domain-tree__header"><span className="domain-icon" aria-hidden="true">{domain ? <TopicIcon name={domain.icon as TopicIconName} size={28} /> : null}</span><span className="domain-tree__title"><strong>{domain?.nameHe ?? domainId}</strong><small>{validSelected.length} מתוך {skills.length} מיומנויות נבחרו</small></span>
        <button type="button" className="tree-select" aria-pressed={parentState === "all"} data-partial={parentState === "partial"} onClick={() => setSelected((current) => toggleParent(current, childIds))}>{parentState === "all" ? "נבחר הכל" : parentState === "partial" ? "נבחר חלקית" : "בחר הכל"}</button>
        <button type="button" className="tree-expand" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "סגור" : "פתח"} <span aria-hidden="true">{expanded ? "⌃" : "⌄"}</span></button></div>
      {expanded ? <div className="domain-tree__children">{items.map((item) => { const state = selectionState(validSelected, item.skillIds); const isSelected = state === "all"; return <button key={item.id} type="button" className="skill-row" aria-pressed={isSelected} data-partial={state === "partial"} onClick={() => setSelected((current) => toggleParent(current, item.skillIds))}><span className="selection-mark" aria-hidden="true">{isSelected ? "✓" : state === "partial" ? "–" : ""}</span><span><strong>{item.nameHe}</strong>{item.descriptionHe ? <small>{item.descriptionHe}</small> : null}</span></button>; })}</div> : null}
    </section>
    <h2>איך מתרגלים?</h2><div className="mode-grid">{MODES.map((item) => <button key={item.id} type="button" className="mode-card" aria-pressed={mode === item.id} onClick={() => setMode(item.id)}><span className="mode-card__icon" aria-hidden="true">{item.icon}</span><span><strong>{item.title}</strong><small>{item.description}</small></span></button>)}</div>
    {mode === "timed" ? <fieldset className="timed-presets"><legend>משך האתגר</legend>{TIMED_DURATION_PRESETS_SECONDS.map((seconds) => <button key={seconds} type="button" aria-pressed={timedDuration === seconds} onClick={() => setTimedDuration(seconds)}>{seconds < 60 ? `${seconds} שניות` : `${seconds / 60} דקות`}</button>)}<small>{!challengeSignature ? "השיא נשמר בבחירת מיומנות אחת או תחום מלא" : bestScore === null ? "עוד אין שיא אישי לאתגר הזה" : `השיא שלך: ${bestScore} תשובות נכונות`}</small></fieldset> : null}
    {mode === "survival" ? <div className="personal-best-preview"><strong>הישרדות · {sessionDefaults.survivalMaxErrors} פסילות</strong><small>{!challengeSignature ? "השיא נשמר בבחירת מיומנות אחת או תחום מלא" : bestScore === null ? "עוד אין שיא אישי לאתגר הזה" : `השיא שלך: ${bestScore}`}</small></div> : null}
    {mode === "fixed" ? <><fieldset className="timed-presets"><legend>מספר שאלות</legend>{FIXED_QUESTION_COUNTS.map((count) => <button key={count} type="button" aria-pressed={questionCount === count} onClick={() => setQuestionCount(count)}>{count}</button>)}<small>{!challengeSignature ? "השיא נשמר בבחירת מיומנות אחת או תחום מלא" : bestScore === null ? "90% דיוק לפחות יקבע שיא זמן" : `השיא שלך: ${Math.round(bestScore / 1000)} שניות`}</small></fieldset></> : null}
    <button type="button" className="primary-action" disabled={!validSelected.length} onClick={() => validSelected.length && onStart(validSelected, settings)}>התחלת תרגול</button>
  </section>;
}
