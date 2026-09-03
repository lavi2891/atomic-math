import type { MasterySnapshot } from "../../domain/mastery/projectMastery.ts";
import { countIncorrect, type PracticeSessionState } from "../../domain/session/practiceSession.ts";
import type { PersonalBestUpdate } from "../../domain/personalBests/types.ts";
import { getSkillById } from "../../content/catalog/index.ts";
import { colors, radius, spacing } from "../../ui/tokens.ts";

type Props = { completed: PracticeSessionState; masteryBefore: Record<string, MasterySnapshot>; masteryAfter: Record<string, MasterySnapshot>; personalBestUpdate: PersonalBestUpdate | null; onHome: () => void; onRepeat: () => void };

export function SessionSummaryScreen({ completed, masteryBefore, masteryAfter, personalBestUpdate, onHome, onRepeat }: Props) {
  const results = completed.results; const correct = results.filter((result) => result.isCorrect).length; const incorrect = countIncorrect(results); const accuracy = results.length ? Math.round((correct / results.length) * 100) : 0;
  return <section style={{ display: "grid", gap: spacing.md }}>
    <h2 style={{ margin: 0 }}>סיכום התרגול</h2>
    <div style={{ border: `1px solid ${colors.borderSubtle}`, borderRadius: radius.md, padding: spacing.md, background: colors.bgSubtle, display: "grid", gap: spacing.sm }}><div>שאלות שנענו: {results.length}</div><div>נכונות: {correct}</div><div>שגויות: {incorrect}</div><div>דיוק: {accuracy}%</div></div>
    {personalBestUpdate ? <div className="personal-best-result"><strong>{personalBestUpdate.isNewRecord ? `שיא חדש: ${personalBestUpdate.best?.bestScore ?? correct}!` : completed.session.settings.mode === "survival" ? `הגעת ל-${correct}` : `${correct} נכונות`}</strong>{!personalBestUpdate.isNewRecord ? <span>השיא שלך: {personalBestUpdate.best?.bestScore}</span> : null}<small>דיוק: {accuracy}% · השיא הוא שלך בלבד</small></div> : null}
    <section style={{ display: "grid", gap: spacing.sm }}><h3 style={{ margin: 0 }}>התקדמות לפי מיומנות</h3>{completed.session.selectedSkillIds.map((skillId) => { const before = masteryBefore[skillId]; const after = masteryAfter[skillId]; if (!before || !after) return null; const evidence = after.evidenceLevel === "established" ? "הערכה מבוססת" : after.evidenceLevel === "emerging" ? "ההערכה עדיין מתגבשת" : "עדיין אין מספיק תרגול לקביעה יציבה"; return <article key={skillId} style={{ border: `1px solid ${colors.borderSubtle}`, borderRadius: radius.md, padding: spacing.md, background: colors.bgSubtle }}><strong>{getSkillById(skillId)?.nameHe ?? skillId}</strong><div dir="ltr" style={{ textAlign: "right" }}>{Math.round(before.mastery)}% → {Math.round(after.mastery)}%</div><small>{evidence} · {after.attemptCount} ניסיונות</small></article>; })}</section>
    <div className="responsive-actions" style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}><button type="button" onClick={onHome}>חזרה לעמוד הבית</button><button type="button" onClick={onRepeat} style={{ border: 0, background: colors.topicGreen, color: "#08130b", fontWeight: 700 }}>תרגול נוסף באותן מיומנויות</button></div>
  </section>;
}
