import { useEffect, useState } from "react";
import type { StageStars } from "../../domain/learningPath/types.ts";
import type { PersonalBestUpdate } from "../../domain/personalBests/types.ts";
import { personalBestResultLabel } from "../../domain/session/studentSessionUx.ts";
import { StageStars as StageStarsDisplay } from "../learningPath/PathNodeIcon.tsx";
import { TotalStars } from "../learningPath/TotalStars.tsx";
import { playEarnedStarSound, STAR_REVEAL_INTERVAL_MS } from "../learningPath/stageCompletionFeedback.ts";

type Props = {
  stageName: string;
  chapterName: string;
  stars: StageStars;
  previousBestStars: StageStars;
  totalStarsBefore: number;
  personalBestUpdate: PersonalBestUpdate | null;
  onContinue: () => void;
  onRepeat: () => void;
  onSummary: () => void;
};

export function StageCompletionScreen({ stageName, chapterName, stars, previousBestStars, totalStarsBefore, personalBestUpdate, onContinue, onRepeat, onSummary }: Props) {
  const improvedBy = Math.max(0, stars - previousBestStars);
  const totalStarsAfter = totalStarsBefore + improvedBy;
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [revealedStars, setRevealedStars] = useState<StageStars>(reducedMotion ? stars : 0);
  const [shownTotal, setShownTotal] = useState(reducedMotion ? totalStarsAfter : totalStarsBefore);
  const [shownDelta, setShownDelta] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let star = 1; star <= stars; star++) {
      timers.push(setTimeout(() => {
        setRevealedStars(star as StageStars);
        playEarnedStarSound(star);
      }, (star - 1) * STAR_REVEAL_INTERVAL_MS));
    }
    const totalDelay = Math.max(1, stars) * STAR_REVEAL_INTERVAL_MS;
    if (improvedBy > 0) {
      timers.push(setTimeout(() => setShownDelta(improvedBy), totalDelay));
      timers.push(setTimeout(() => setShownTotal(totalStarsAfter), totalDelay + 180));
      timers.push(setTimeout(() => setShownDelta(0), totalDelay + 650));
    }
    return () => timers.forEach(clearTimeout);
  }, [improvedBy, reducedMotion, stars, totalStarsAfter]);

  const passed = stars >= 1;
  const improvementMessage = previousBestStars > 0
    ? improvedBy > 0 ? "שיפרת את התוצאה בשלב" : "השלב נשאר פתוח לתרגול"
    : "פתחת את השלב הבא";

  return <section className="stage-completion" data-passed={passed}>
    <TotalStars count={shownTotal} delta={shownDelta} className="stage-completion__total" />
    <p className="stage-completion__context">{chapterName} · {stageName}</p>
    <div className="stage-completion__stars">
      <StageStarsDisplay stars={revealedStars} labelStars={stars} />
    </div>
    <div className="stage-completion__message">
      <h2>{passed ? "יפה מאוד!" : "עוד קצת ונעבור"}</h2>
      <p>{passed ? improvementMessage : "השלב הבא עדיין מחכה"}</p>
    </div>
    <div className="stage-completion__actions">
      {passed ? <>
        <button type="button" className="stage-completion__primary" onClick={onContinue}>המשך</button>
        <button type="button" onClick={onRepeat}>נסה שוב</button>
      </> : <>
        <button type="button" className="stage-completion__primary" onClick={onRepeat}>ניסיון נוסף</button>
        <button type="button" onClick={onContinue}>חזרה למסלול</button>
      </>}
      <button type="button" className="stage-completion__summary" onClick={onSummary}>סיכום שלב</button>
    </div>
    {personalBestUpdate?.best ? <small className="stage-completion__best">{personalBestUpdate.isNewRecord ? "שיא אישי חדש" : "השיא האישי שלך"}: {personalBestResultLabel(personalBestUpdate.best)}</small> : null}
  </section>;
}
