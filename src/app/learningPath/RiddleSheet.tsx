import { useEffect, useRef, useState } from "react";
import type { RiddleSubmissionRepository } from "../../domain/optionalLearningContent/RiddleSubmissionRepository.ts";
import { createRiddleSubmission, type RiddleDefinition, type RiddleDifficulty } from "../../domain/optionalLearningContent/types.ts";
import { ResponsiveMedia } from "../../ui/ResponsiveMedia.tsx";
import { PathNodeIcon } from "./PathNodeIcon.tsx";

const difficultyLabels: Record<RiddleDifficulty, string> = { easy: "קל", medium: "בינוני", hard: "קשה" };
const difficultyDots: Record<RiddleDifficulty, number> = { easy: 1, medium: 2, hard: 3 };

export function RiddleDifficultyBadge({ difficulty }: { difficulty: RiddleDifficulty }) {
  return <span className="riddle-difficulty" data-difficulty={difficulty} aria-label={`רמת חשיבה: ${difficultyLabels[difficulty]}`}>
    <span aria-hidden="true">{"●".repeat(difficultyDots[difficulty])}</span> {difficultyLabels[difficulty]}
  </span>;
}

export function RiddleSheet({ riddle, studentId, submissions, onSubmitted, onClose }: {
  riddle: RiddleDefinition;
  studentId: string;
  submissions: RiddleSubmissionRepository;
  onSubmitted?: () => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [response, setResponse] = useState("");
  const [finalAnswer, setFinalAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current; const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow; dialog?.showModal(); document.body.style.overflow = "hidden";
    let active = true;
    void submissions.listForRiddle(studentId, riddle.id).then((history) => {
      const latest = history.at(-1); if (active && latest) { setResponse(latest.responseText); setFinalAnswer(latest.finalAnswerText ?? ""); }
    });
    return () => { active = false; dialog?.close(); document.body.style.overflow = overflow; if (opener?.isConnected) opener.focus({ preventScroll: true }); };
  }, [riddle.id, studentId, submissions]);

  async function submit() {
    if (!response.trim() || saving) return;
    setSaving(true); setMessage("");
    try {
      const submission = createRiddleSubmission({ riddle, studentId, responseText: response, finalAnswerText: finalAnswer });
      await submissions.save(submission);
      setMessage(submission.finalAnswerCorrect === false ? "הפתרון נשמר. אפשר לבדוק שוב את התשובה הסופית." : "הפתרון נשמר");
      onSubmitted?.();
    } catch {
      setMessage("לא הצלחנו לשמור כרגע");
    } finally { setSaving(false); }
  }

  return <dialog ref={dialogRef} className="path-stage-sheet riddle-sheet" aria-labelledby="riddle-sheet-title" onCancel={(event) => { event.preventDefault(); if (!saving) onClose(); }}>
    <div className="path-stage-sheet__content">
      <header><div className="optional-sheet-title"><PathNodeIcon kind="riddle" /><div><small>חידה · לבחירה</small><h2 id="riddle-sheet-title">{riddle.titleHe}</h2></div></div><button type="button" className="path-sheet-close" aria-label="סגירה" disabled={saving} onClick={onClose}>×</button></header>
      <RiddleDifficultyBadge difficulty={riddle.difficulty} />
      {riddle.media ? <ResponsiveMedia media={riddle.media} /> : null}
      <p className="riddle-prompt">{riddle.promptHe}</p>
      <label className="riddle-response">הפתרון שלך<textarea rows={5} value={response} onChange={(event) => { setResponse(event.target.value); setMessage(""); }} placeholder="כתבו כאן איך חשבתם…" /></label>
      {riddle.finalAnswer ? <label className="riddle-final-answer">תשובה סופית <input value={finalAnswer} onChange={(event) => { setFinalAnswer(event.target.value); setMessage(""); }} /></label> : null}
      {message ? <p role="status" aria-live="polite">{message}</p> : null}
      <button type="button" className="primary-action" disabled={saving || !response.trim()} onClick={() => void submit()}>{saving ? "שומרים…" : "הגשה"}</button>
    </div>
  </dialog>;
}
