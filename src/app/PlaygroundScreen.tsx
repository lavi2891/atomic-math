import { useState } from "react";
import type { Question } from "domain/questions/types";
import type { AnswerResult } from "domain/results/types";
import { QuestionView } from "./questions/QuestionView";

const demo: Question[] = [
  {
    id: "q1",
    topicId: "A1",
    type: "numeric",
    prompt: [
      { kind: "text", value: "חשב: " },
      { kind: "math", latex: "-3 + 7" },
    ],
    answer: 4,
  },
  {
    id: "q2",
    topicId: "A2",
    type: "singleChoice",
    prompt: [
      { kind: "text", value: "מהו הערך של " },
      { kind: "math", latex: "2x", display: false },
      { kind: "text", value: " כאשר " },
      { kind: "math", latex: "x=3" },
    ],
    options: [
      { id: "a", content: [{ kind: "math", latex: "5" }] },
      { id: "b", content: [{ kind: "math", latex: "6" }] },
      { id: "c", content: [{ kind: "math", latex: "8" }] },
    ],
    correctOptionId: "b",
  },
  {
    id: "q3",
    topicId: "A3",
    type: "multiChoice",
    prompt: [{ kind: "text", value: "בחר את כל המספרים השליליים: " }],
    options: [
      { id: "a", content: [{ kind: "math", latex: "-2" }] },
      { id: "b", content: [{ kind: "math", latex: "0" }] },
      { id: "c", content: [{ kind: "math", latex: "3" }] },
      { id: "d", content: [{ kind: "math", latex: "-7" }] },
    ],
    correctOptionIds: ["a", "d"],
  },
  {
    id: "q4",
    topicId: "A3",
    type: "multiChoice",
    prompt: [
      { kind: "text", value: "מצא את ערכי x במשוואה הבאה: " },
      { kind: "math", latex: "x^2 - 4 = 0 ", display: false },
    ],
    options: [
      { id: "a", content: [{ kind: "math", latex: "-2" }] },
      { id: "b", content: [{ kind: "math", latex: "2" }] },
      { id: "c", content: [{ kind: "math", latex: "0" }] },
      { id: "d", content: [{ kind: "text", value: "אין אף ערך x מתאים" }] },
    ],
    correctOptionIds: ["a", "b"],
  },
  {
    id: "q5",
    topicId: "A3",
    type: "singleChoice",
    prompt: [
      { kind: "text", value: " מהו ערך הביטוי " },
      { kind: "math", latex: " x:\\frac{1}{2} " },
      { kind: "text", value: " כאשר " },
      { kind: "math", latex: "x=8 " },
    ],
    options: [
      { id: "a", content: [{ kind: "math", latex: "16" }] },
      { id: "b", content: [{ kind: "math", latex: "4" }] },
      { id: "c", content: [{ kind: "math", latex: "8" }] },
      { id: "d", content: [{ kind: "text", value: "בחמ" }] },
    ],
    correctOptionId: "a",
  },
];

export function PlaygroundScreen() {
  const [i, setI] = useState(0);
  const [last, setLast] = useState<AnswerResult | null>(null);

  const q = demo[i];

  if (!q) {
    return <div>אין שאלות</div>;
  }

  function next(r: AnswerResult) {
    setLast(r);
    setI((x) => (x + 1) % demo.length);
  }

  return (
    <div style={{ padding: 16, display: "grid", gap: 12 }}>
      <div style={{ opacity: 0.7, fontSize: 12 }}>
        topic: {q.topicId} • q: {q.id}
      </div>

      <QuestionView question={q} onNext={next} key={q.id} />

      {last ? (
        <pre style={{ fontSize: 12, opacity: 0.7, whiteSpace: "pre-wrap" }}>
          {JSON.stringify(last, null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
