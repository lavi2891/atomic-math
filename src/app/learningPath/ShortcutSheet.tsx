import { useEffect, useRef } from "react";
import type { Chapter } from "../../domain/learningPath/types.ts";
import { DEFAULT_SHORTCUT_PASSING_ACCURACY } from "../../domain/learningPath/scoring.ts";
import { LEARNING_STAGE_SETTINGS } from "../../domain/learningPath/sessionProgress.ts";

type Props = {
  chapter: Chapter;
  passed: boolean;
  canPractice: boolean;
  starting: boolean;
  error?: string;
  onClose: () => void;
  onPractice: () => void;
};

export function ShortcutSheet({ chapter, passed, canPractice, starting, error, onClose, onPractice }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const target = chapter.shortcutTest?.passingAccuracy ?? DEFAULT_SHORTCUT_PASSING_ACCURACY;

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

  return <dialog ref={dialogRef} className="path-stage-sheet" tabIndex={-1} aria-labelledby="shortcut-sheet-title" aria-describedby="shortcut-sheet-description" aria-busy={starting}
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
      <header><h2 id="shortcut-sheet-title">בדיקת קיצור: {chapter.nameHe}</h2><button type="button" className="path-sheet-close" aria-label="סגירה" disabled={starting} onClick={onClose}>×</button></header>
      <p id="shortcut-sheet-description">{LEARNING_STAGE_SETTINGS.questionCount} שאלות קצרות · {Math.round(target * 100)}% מספיקים למעבר</p>
      <p>{passed ? "כבר עברת את הבדיקה. השלבים הקודמים נשארו פתוחים לתרגול." : "אם החומר כבר מוכר, אפשר להגיע ישר לאתגר הפרק."}</p>
      {!canPractice ? <p role="status">השאלות לבדיקה הזאת אינן זמינות כרגע</p> : null}
      {error ? <p className="path-launch-error" role="alert">{error}</p> : null}
      <button type="button" className="primary-action" disabled={starting || !canPractice} onClick={onPractice}>{starting ? "מתחילים…" : passed ? "בדיקה חוזרת" : "התחלת בדיקה"}</button>
    </div>
  </dialog>;
}
