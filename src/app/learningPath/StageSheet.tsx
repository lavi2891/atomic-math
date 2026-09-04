import { useEffect, useMemo, useRef, useState } from "react";
import type { Stage, StageStars as Stars } from "../../domain/learningPath/types.ts";
import type { PersonalBest, PersonalBestRepository } from "../../domain/personalBests/types.ts";
import { createChallengeSignature } from "../../domain/personalBests/challengeSignature.ts";
import { DOMAINS, SKILLS } from "../../content/catalog/index.ts";
import { LEARNING_STAGE_SETTINGS } from "../../domain/learningPath/sessionProgress.ts";
import { StageStars } from "./PathNodeIcon.tsx";

type Props = {
  stage: Stage;
  stars: Stars;
  studentId: string;
  canPractice: boolean;
  starting: boolean;
  error?: string;
  personalBests: Pick<PersonalBestRepository, "get">;
  onClose: () => void;
  onPractice: () => void;
};

export function StageSheet({ stage, stars, studentId, canPractice, starting, error, personalBests, onClose, onPractice }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [best, setBest] = useState<PersonalBest | null>(null);
  const signature = useMemo(() => createChallengeSignature(LEARNING_STAGE_SETTINGS, stage.skillIds, DOMAINS, SKILLS), [stage.skillIds]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (signature) void personalBests.get(studentId, signature).then((value) => { if (active) setBest(value); }).catch(() => {
      // A missing personal-best cache must not prevent practice.
    });
    return () => { active = false; };
  }, [personalBests, signature, studentId]);

  return <dialog ref={dialogRef} className="path-stage-sheet" tabIndex={-1} aria-labelledby="stage-sheet-title" aria-describedby="stage-sheet-stars" aria-busy={starting}
    onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
      const first = controls[0]; const last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); event.currentTarget.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}
    onCancel={(event) => { event.preventDefault(); if (!starting) onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget && !starting) onClose(); }}>
    <div className="path-stage-sheet__content">
      <header><h2 id="stage-sheet-title">{stage.nameHe}</h2><button type="button" className="path-sheet-close" aria-label="סגירה" disabled={starting} onClick={onClose}>×</button></header>
      <div id="stage-sheet-stars"><StageStars stars={stars} /><span>{stars ? "כוכבים שהרווחת" : "עוד לא הרווחת כוכבים בשלב הזה"}</span></div>
      {best ? <p className="path-personal-best">השיא שלך: {Math.round(best.bestScore / 100) / 10} שניות · {LEARNING_STAGE_SETTINGS.questionCount} שאלות</p> : null}
      {!canPractice ? <p role="status">השאלות בשלב הזה אינן זמינות כרגע</p> : null}
      {error ? <p className="path-launch-error" role="alert">{error}</p> : null}
      <button type="button" className="primary-action" disabled={starting || !canPractice} onClick={onPractice}>{starting ? "מתחילים…" : stars ? "תרגול חוזר" : "התחלת תרגול"}</button>
    </div>
  </dialog>;
}
