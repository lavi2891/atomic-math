import { useState, type FormEvent } from "react";
import { isPlausibleStudentCode, normalizeStudentCode } from "../../domain/studentIdentity/studentIdentity.ts";

type Props = {
  checking: boolean;
  backendConfigured: boolean;
  error?: string;
  onSubmit: (studentId: string) => void;
};

export function StudentCodeEntryScreen({ checking, backendConfigured, error, onSubmit }: Props) {
  const [value, setValue] = useState("");
  const normalized = normalizeStudentCode(value);
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!checking && isPlausibleStudentCode(normalized)) onSubmit(normalized);
  }

  return <section className="student-code-screen" aria-labelledby="student-code-title">
    <header>
      <h1 id="student-code-title">קוד תלמיד</h1>
      <p>הכנס את הקוד שקיבלת מהמורה</p>
    </header>
    <form onSubmit={submit} noValidate>
      <label htmlFor="student-code">קוד תלמיד</label>
      <input id="student-code" name="studentCode" value={value} onChange={(event) => setValue(event.target.value)}
        autoComplete="off" autoCapitalize="characters" spellCheck={false} inputMode="text" dir="ltr" disabled={checking} autoFocus />
      {error ? <p className="student-code-error" role="alert">{error}</p> : null}
      {!backendConfigured ? <p className="student-code-help" role="status">לא הוגדר חיבור לכיתה במכשיר הזה.</p> : null}
      <button type="submit" className="primary-action" disabled={checking || !backendConfigured || !isPlausibleStudentCode(normalized)}>
        {checking ? "בודק…" : "המשך"}
      </button>
    </form>
  </section>;
}
