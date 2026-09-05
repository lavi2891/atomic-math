import { useEffect, useState } from "react";
import type { StageStars } from "../../domain/learningPath/types.ts";
import { StageStars as StageStarsDisplay } from "../learningPath/PathNodeIcon.tsx";
import { playEarnedStarSound, STAR_REVEAL_INTERVAL_MS } from "../learningPath/stageCompletionFeedback.ts";

type Props = {
  chapterName: string;
  passed: boolean;
  correctCount: number;
  questionCount: number;
  onCourse: () => void;
  onRepeat: () => void;
  onSummary: () => void;
};

function shortcutCompletionStars(passed: boolean, correctCount: number, questionCount: number): StageStars {
  if (!passed || questionCount <= 0) return 0;
  const accuracy = correctCount / questionCount;
  return accuracy >= 0.9 ? 3 : accuracy >= 0.8 ? 2 : 1;
}

export function ShortcutCompletionScreen({ chapterName, passed, correctCount, questionCount, onCourse, onRepeat, onSummary }: Props) {
  const stars = shortcutCompletionStars(passed, correctCount, questionCount);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [revealedStars, setRevealedStars] = useState<StageStars>(reducedMotion ? stars : 0);

  useEffect(() => {
    if (reducedMotion) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let star = 1; star <= stars; star++) {
      timers.push(setTimeout(() => {
        setRevealedStars(star as StageStars);
        playEarnedStarSound(star);
      }, (star - 1) * STAR_REVEAL_INTERVAL_MS));
    }
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion, stars]);

  return <section className="stage-completion shortcut-completion" data-passed={passed}>
    <p className="stage-completion__context">בדיקת קיצור · {chapterName}</p>
    <div className="stage-completion__stars"><StageStarsDisplay stars={revealedStars} labelStars={stars} /></div>
    <div className="stage-completion__message">
      <h2>{passed ? "יפה!" : "כמעט"}</h2>
      <p>{passed ? "דילגת על הפרק" : "אפשר להמשיך במסלול הרגיל"}</p>
    </div>
    <div className="stage-completion__actions">
      <button type="button" className="stage-completion__primary" onClick={onCourse}>{passed ? "המשך במסלול" : "חזרה למסלול"}</button>
      <button type="button" onClick={onRepeat}>נסה שוב</button>
      <button type="button" className="stage-completion__summary" onClick={onSummary}>סיכום מבחן</button>
    </div>
  </section>;
}
