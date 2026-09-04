import { useState } from "react";
import type { MasterySnapshot } from "../../domain/mastery/projectMastery.ts";
import { isSuccessfulSessionCompletion, type PracticeSessionState } from "../../domain/session/practiceSession.ts";
import type { PersonalBestUpdate } from "../../domain/personalBests/types.ts";
import { practiceScopeLabel, sessionModeLabels, sessionResultLabel, sessionReviewResults } from "../../domain/session/studentSessionUx.ts";
import { QuestionView } from "../questions/QuestionView.tsx";
import { colors, radius, spacing } from "../../ui/tokens.ts";

type Props = { completed: PracticeSessionState; masteryBefore: Record<string, MasterySnapshot>; masteryAfter: Record<string, MasterySnapshot>; personalBestUpdate: PersonalBestUpdate | null; homeLabel?: string; onHome: () => void; onRepeat: () => void };

export function SessionSummaryScreen({ completed, masteryBefore, masteryAfter, personalBestUpdate, homeLabel = "מסך ראשי", onHome, onRepeat }: Props) {
  const [reviewing, setReviewing] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [details, setDetails] = useState(false);
  const reviewResults = sessionReviewResults(completed.results, showAll);
  return <section style={{ display: "grid", gap: spacing.md }}>
    <h2 style={{ margin: 0 }}>{reviewing ? "חזרה על התרגול" : completed.endReason === "stopped" ? "התרגול הסתיים" : isSuccessfulSessionCompletion(completed) ? "סיימת את התרגול!" : "התרגול הופסק עקב תקלה"}</h2>
    <div><strong>{practiceScopeLabel(completed.session.selectedSkillIds)}</strong><div>{sessionModeLabels[completed.session.settings.mode]}</div></div>
    {!reviewing ? <>
      <p style={{ fontSize: "1.4rem", margin: 0 }}>{sessionResultLabel(completed)}</p>
      {personalBestUpdate?.isNewRecord ? <strong>שיא אישי חדש!</strong> : null}
      <div className="responsive-actions" style={{ display: "flex", gap: spacing.sm, flexWrap: "wrap" }}>
        <button type="button" onClick={onRepeat} style={{ border: 0, background: colors.topicGreen, color: "#08130b", fontWeight: 700 }}>שחק שוב</button>
        <button type="button" onClick={() => setReviewing(true)}>ראה מה טעיתי</button>
        <button type="button" onClick={onHome}>{homeLabel}</button>
      </div>
      <button type="button" aria-expanded={details} onClick={() => setDetails(!details)} style={{ justifySelf: "start", background: "none", border: 0, color: colors.textMuted, textDecoration: "underline" }}>דוח מפורט</button>
      {details ? <section><h3>התקדמות לפי מיומנות</h3>{completed.session.selectedSkillIds.map((id) => {
        const before = masteryBefore[id]; const after = masteryAfter[id];
        return before && after ? <p key={id}>{practiceScopeLabel([id])}: {Math.round(before.mastery)}% ← {Math.round(after.mastery)}% · {after.attemptCount} ניסיונות</p> : null;
      })}</section> : null}
    </> : <>
      <button type="button" onClick={() => setReviewing(false)}>חזרה לסיכום</button>
      <label><input type="checkbox" checked={showAll} onChange={(event) => setShowAll(event.target.checked)} />הצג את כל השאלות</label>
      {!reviewResults.length ? <p>{completed.results.length ? "כל הכבוד, אין תשובות שגויות!" : "לא נענו שאלות בתרגול הזה."}</p> : null}
      {reviewResults.map((result, index) => <article key={`${index}:${result.questionId}`} style={{ border: `1px solid ${colors.borderSubtle}`, borderRadius: radius.md, padding: spacing.md }}>
        {result.questionSnapshot ? <QuestionView question={result.questionSnapshot} mode="review" review={{ rawAnswer: result.rawAnswer as NonNullable<Parameters<typeof QuestionView>[0]["review"]>["rawAnswer"], isCorrect: result.isCorrect }} /> : <p>השאלה אינה זמינה להצגה.</p>}
      </article>)}
    </>}
  </section>;
}
