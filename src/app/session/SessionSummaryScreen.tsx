import { useState } from "react";
import type { MasterySnapshot } from "../../domain/mastery/projectMastery.ts";
import { isSuccessfulSessionCompletion, type PracticeSessionState } from "../../domain/session/practiceSession.ts";
import type { PersonalBestUpdate } from "../../domain/personalBests/types.ts";
import { activePracticeScopeLabel, personalBestResultLabel, practiceScopeLabel, sessionModeLabels, sessionResultLabel, sessionReviewResults } from "../../domain/session/studentSessionUx.ts";
import { QuestionView } from "../questions/QuestionView.tsx";
import { colors, radius, spacing } from "../../ui/tokens.ts";
import type { StageStars } from "../../domain/learningPath/types.ts";
import { learningSessionContext } from "../../domain/learningPath/sessionProgress.ts";
import { LEARNING_PATHS } from "../../content/learningPaths.ts";
import { StageCompletionScreen } from "./StageCompletionScreen.tsx";
import { StageStars as StageStarsDisplay } from "../learningPath/PathNodeIcon.tsx";
import { ShortcutCompletionScreen } from "./ShortcutCompletionScreen.tsx";

type Props = { completed: PracticeSessionState; masteryBefore: Record<string, MasterySnapshot>; masteryAfter: Record<string, MasterySnapshot>; personalBestUpdate: PersonalBestUpdate | null; stageStars?: StageStars; previousStageBestStars?: StageStars; totalStarsBefore?: number; shortcutPassed?: boolean; homeLabel?: string; onHome: () => void; onRepeat: () => void };

const starLabels = ["כמעט שם — עוד סיבוב קצר וננסה שוב.", "עברת את השלב", "תוצאה חזקה", "מצוין"] as const;

export function SessionSummaryScreen({ completed, masteryBefore, masteryAfter, personalBestUpdate, stageStars, previousStageBestStars = 0, totalStarsBefore = 0, shortcutPassed, homeLabel = "מסך ראשי", onHome, onRepeat }: Props) {
  const [reviewing, setReviewing] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [details, setDetails] = useState(false);
  const reviewResults = sessionReviewResults(completed.results, showAll);
  const pathContext = learningSessionContext(LEARNING_PATHS, completed.session);
  const contextTitle = pathContext?.titleHe ?? activePracticeScopeLabel(completed.session.selectedSkillIds);

  if (pathContext?.kind === "stage" && stageStars !== undefined) {
    if (!reviewing) return <StageCompletionScreen stageName={pathContext.titleHe} chapterName={pathContext.chapterNameHe} stars={stageStars} previousBestStars={previousStageBestStars} totalStarsBefore={totalStarsBefore} personalBestUpdate={personalBestUpdate} onContinue={onHome} onRepeat={onRepeat} onSummary={() => setReviewing(true)} />;
    return <section className="stage-summary">
      <header><div><p>{pathContext.chapterNameHe}</p><h2>סיכום שלב</h2></div><button type="button" onClick={() => setReviewing(false)}>חזרה לתוצאה</button></header>
      <h3>{pathContext.titleHe}</h3>
      <dl className="stage-summary__facts">
        <div><dt>תוצאה</dt><dd>{sessionResultLabel(completed)}</dd></div>
        <div><dt>כוכבים</dt><dd><StageStarsDisplay stars={stageStars} /></dd></div>
        <div><dt>שאלות שנענו</dt><dd>{completed.results.length}</dd></div>
      </dl>
      <label className="stage-summary__all"><input type="checkbox" checked={showAll} onChange={(event) => setShowAll(event.target.checked)} />כל השאלות</label>
      {!reviewResults.length ? <p>{completed.results.length ? "כל הכבוד, אין תשובות שגויות!" : "לא נענו שאלות בתרגול הזה."}</p> : null}
      <div className="stage-summary__questions">
        {reviewResults.map((result, index) => <article key={`${index}:${result.questionId}`}>
          {result.questionSnapshot ? <QuestionView question={result.questionSnapshot} mode="review" review={{ rawAnswer: result.rawAnswer as NonNullable<Parameters<typeof QuestionView>[0]["review"]>["rawAnswer"], isCorrect: result.isCorrect, tone: "neutral" }} /> : <p>השאלה אינה זמינה להצגה.</p>}
          {/* A future “הסבר לי את הטעות” action belongs here, beside one reviewed answer. */}
        </article>)}
      </div>
    </section>;
  }

  if (pathContext?.kind === "shortcut" && shortcutPassed !== undefined) {
    if (!reviewing) return <ShortcutCompletionScreen chapterName={pathContext.chapterNameHe} passed={shortcutPassed}
      correctCount={completed.results.filter((result) => result.isCorrect).length} questionCount={completed.results.length}
      onCourse={onHome} onRepeat={onRepeat} onSummary={() => setReviewing(true)} />;
    return <section className="stage-summary shortcut-summary">
      <header><div><p>{pathContext.chapterNameHe}</p><h2>סיכום מבחן</h2></div><button type="button" onClick={() => setReviewing(false)}>חזרה לתוצאה</button></header>
      <label className="stage-summary__all"><input type="checkbox" checked={showAll} onChange={(event) => setShowAll(event.target.checked)} />כל השאלות</label>
      {!reviewResults.length ? <p>{completed.results.length ? "לא היו תשובות שגויות." : "לא נענו שאלות בבדיקה הזו."}</p> : null}
      <div className="stage-summary__questions">
        {reviewResults.map((result, index) => <article key={`${index}:${result.questionId}`}>
          {result.questionSnapshot ? <QuestionView question={result.questionSnapshot} mode="review" review={{ rawAnswer: result.rawAnswer as NonNullable<Parameters<typeof QuestionView>[0]["review"]>["rawAnswer"], isCorrect: result.isCorrect, tone: "neutral" }} /> : <p>השאלה אינה זמינה להצגה.</p>}
        </article>)}
      </div>
    </section>;
  }

  return <section style={{ display: "grid", gap: spacing.md }}>
    <h2 style={{ margin: 0 }}>{reviewing ? "חזרה על התרגול" : completed.endReason === "stopped" ? "התרגול הסתיים" : isSuccessfulSessionCompletion(completed) ? "סיימת את התרגול!" : "התרגול הופסק עקב תקלה"}</h2>
    <div><strong>{contextTitle}</strong>{pathContext ? <div>{pathContext.chapterNameHe}</div> : null}<div>{sessionModeLabels[completed.session.settings.mode]}</div></div>
    {!reviewing ? <>
      <p style={{ fontSize: "1.4rem", margin: 0 }}>{sessionResultLabel(completed)}</p>
      {stageStars !== undefined ? <div aria-label={`${stageStars} מתוך 3 כוכבים`}><strong style={{ color: "#f4ca5d", fontSize: "1.5rem" }}>{"★".repeat(stageStars)}{"☆".repeat(3 - stageStars)}</strong><p style={{ margin: "4px 0 0" }}>{starLabels[stageStars]}</p></div> : null}
      {personalBestUpdate?.best ? <strong>{personalBestUpdate.isNewRecord ? "שיא אישי חדש" : "השיא האישי שלך"}: {personalBestResultLabel(personalBestUpdate.best)}</strong> : null}
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
