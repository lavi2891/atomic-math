import { useMemo, useState } from "react";
import { listSkillsByDomain } from "../../content/catalog/index.ts";
import type { SessionMode, SessionSettings } from "@domain/session/practiceSession";
import { FIXED_QUESTION_COUNTS } from "@domain/session/practiceSession";
import type { SkillQuestionDefinition } from "@domain/session/skillQuestionSelector";
import { borders, colors, icons, radius, spacing } from "@ui/tokens";
import { isSkillSelected, toggleSkillSelection } from "@domain/studentHome/sessionLaunch";
import { sessionDefaults } from "@domain/session/config";

type Props = {
  domainId: string;
  definitions: readonly SkillQuestionDefinition[];
  onBack: () => void;
  onStart: (skillIds: string[], settings: SessionSettings) => void;
};

const MODES: Array<{ id: SessionMode; title: string; description: string }> = [
  { id: "fixed", title: "מספר שאלות", description: "ברירת מחדל: 10" },
  { id: "survival", title: "הישרדות", description: "3 חיים" },
  { id: "timed", title: "נגד השעון", description: "3 דקות" },
  { id: "practice", title: "תרגול", description: "ללא הגבלה" },
];

export function SessionSetupScreen({ domainId, definitions, onBack, onStart }: Props) {
  const availableSkillIds = useMemo(() => new Set(definitions.map((definition) => definition.skillId)), [definitions]);
  const skills = listSkillsByDomain(domainId).filter((skill) => availableSkillIds.has(skill.id));
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [mode, setMode] = useState<SessionMode>("fixed");
  const [questionCount, setQuestionCount] = useState<5 | 10 | 15 | 20>(sessionDefaults.fixedQuestionCount);

  function toggleSkill(skillId: string): void {
    setSelectedSkillIds((current) => toggleSkillSelection(current, skillId));
  }

  function start(): void {
    if (selectedSkillIds.length === 0) return;
    const settings: SessionSettings = mode === "fixed"
      ? { mode, questionCount }
      : mode === "survival"
        ? { mode, maxErrors: sessionDefaults.survivalMaxErrors }
        : mode === "timed"
          ? { mode, durationSeconds: sessionDefaults.timedDurationSeconds }
          : { mode: "practice" };
    onStart(selectedSkillIds, settings);
  }

  return (
    <section style={{ display: "grid", gap: spacing.md }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: spacing.sm }}>
        <button type="button" onClick={onBack} style={{ border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: `${spacing.xs}px ${spacing.md}px`, background: colors.bgSubtle, color: colors.text }}>חזרה</button>
        <h2 style={{ margin: 0 }}>בחירת מיומנויות</h2>
      </header>

      <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: spacing.sm }}>
        {skills.map((skill) => {
          const selected = isSkillSelected(selectedSkillIds, skill.id);
          return (
            <button
              key={skill.id}
              className="responsive-card"
              type="button"
              aria-pressed={selected}
              onClick={() => toggleSkill(skill.id)}
              style={{ minHeight: 84, textAlign: "start", border: `${selected ? borders.strongPx : borders.normalPx}px solid ${selected ? colors.topicGreen : colors.border}`, borderRadius: radius.md, padding: spacing.md, background: selected ? colors.bgSelected : colors.bgSubtle, color: colors.text, cursor: "pointer" }}
            >
              <span style={{ display: "block", minHeight: 24, color: colors.topicGreen }}>{selected ? icons.check : ""}</span>
              <strong>{skill.nameHe}</strong>
            </button>
          );
        })}
      </div>

      {skills.length > 1 ? (
        <button type="button" onClick={() => setSelectedSkillIds(skills.map((skill) => skill.id))} style={{ justifySelf: "start", border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: `${spacing.xs}px ${spacing.md}px`, background: colors.bgSubtle, color: colors.text, cursor: "pointer" }}>
          בחר את כל המיומנויות
        </button>
      ) : null}

      <h2 style={{ margin: 0 }}>בחירת מצב</h2>
      <div className="responsive-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: spacing.sm }}>
        {MODES.map((item) => (
          <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => setMode(item.id)} style={{ textAlign: "start", border: `${mode === item.id ? borders.strongPx : borders.normalPx}px solid ${mode === item.id ? colors.topicGreen : colors.border}`, borderRadius: radius.md, padding: spacing.md, background: mode === item.id ? colors.bgSelected : colors.bgSubtle, color: colors.text, cursor: "pointer" }}>
            <strong style={{ display: "block" }}>{item.title}</strong>
            <small>{item.description}</small>
          </button>
        ))}
      </div>

      {mode === "fixed" ? (
        <label style={{ display: "grid", gap: spacing.xs }}>
          מספר שאלות
          <select value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value) as 5 | 10 | 15 | 20)} style={{ padding: spacing.sm, borderRadius: radius.md }}>
            {FIXED_QUESTION_COUNTS.map((count) => <option key={count} value={count}>{count}</option>)}
          </select>
        </label>
      ) : null}

      <button type="button" disabled={selectedSkillIds.length === 0} onClick={start} style={{ padding: spacing.md, border: 0, borderRadius: radius.md, background: colors.topicGreen, color: "#08130b", fontWeight: 700, cursor: selectedSkillIds.length === 0 ? "not-allowed" : "pointer", opacity: selectedSkillIds.length === 0 ? 0.5 : 1 }}>
        התחלת תרגול
      </button>
    </section>
  );
}
