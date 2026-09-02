import assert from "node:assert/strict";
import { buildBalancedSkillPlan, pickBalancedSkill } from "../src/domain/session/balancedSkills.ts";
import {
  createInitialSessionState,
  createPracticeSession,
  practiceSessionReducer,
  type PracticeSessionState,
  type SessionSettings,
} from "../src/domain/session/practiceSession.ts";
import { SkillQuestionSelector, type SkillQuestionDefinition } from "../src/domain/session/skillQuestionSelector.ts";
import type { AnswerResult } from "../src/domain/results/types.ts";

function run(name: string, testFn: () => void): void {
  testFn();
  process.stdout.write(`PASS ${name}\n`);
}

function result(questionId: string, isCorrect: boolean, timestamp = 100): AnswerResult {
  return {
    questionId,
    topicId: "SIGNED_NUMBERS",
    attemptIndex: 0,
    isCorrect,
    rawAnswer: { questionType: "numeric", data: { value: isCorrect ? "1" : "0" } },
    responseTimeMs: 1000,
    timestamp,
  };
}

function started(settings: SessionSettings): PracticeSessionState {
  const session = createPracticeSession({ id: "S", studentId: "local", selectedSkillIds: ["A"], settings, startedAt: 0 });
  return practiceSessionReducer(createInitialSessionState(session, 0.5), { type: "START", questionId: "Q0", skillId: "A" });
}

function answerAndAdvance(state: PracticeSessionState, isCorrect: boolean, index: number): PracticeSessionState {
  const answered = practiceSessionReducer(state, { type: "ANSWER_SUBMITTED", result: result(state.currentQuestionId!, isCorrect, index) });
  return answered.status === "active"
    ? practiceSessionReducer(answered, { type: "NEXT_QUESTION", questionId: `Q${index + 1}`, skillId: "A" })
    : answered;
}

run("fixed session ends exactly at its configured count", () => {
  let state = started({ mode: "fixed", questionCount: 5 });
  for (let index = 0; index < 4; index += 1) state = answerAndAdvance(state, true, index);
  assert.equal(state.status, "active");
  state = answerAndAdvance(state, true, 4);
  assert.equal(state.status, "ended");
  assert.equal(state.results.length, 5);
});

run("survival ends at the configured incorrect count and correct answers preserve lives", () => {
  let state = started({ mode: "survival", maxErrors: 3 });
  state = answerAndAdvance(state, false, 0);
  state = answerAndAdvance(state, true, 1);
  state = answerAndAdvance(state, false, 2);
  assert.equal(state.status, "active");
  state = answerAndAdvance(state, true, 3);
  assert.equal(state.status, "active");
  state = answerAndAdvance(state, false, 4);
  assert.equal(state.status, "ended");
  assert.equal(state.results.filter((item) => !item.isCorrect).length, 3);
});

run("timed session terminates only on timer expiry", () => {
  let state = started({ mode: "timed", durationSeconds: 180 });
  state = answerAndAdvance(state, true, 0);
  assert.equal(state.status, "active");
  state = practiceSessionReducer(state, { type: "TIMER_EXPIRED", at: 180_000 });
  assert.equal(state.status, "ended");
  assert.equal(state.endReason, "timer_expired");
});

run("practice never auto-terminates", () => {
  let state = started({ mode: "practice" });
  for (let index = 0; index < 50; index += 1) state = answerAndAdvance(state, false, index);
  assert.equal(state.status, "active");
  state = practiceSessionReducer(state, { type: "STOP_SESSION", at: 500 });
  assert.equal(state.status, "ended");
});

run("balanced plans distribute across two three and four skills", () => {
  for (const skills of [["A", "B"], ["A", "B", "C"], ["A", "B", "C", "D"]]) {
    const plan = buildBalancedSkillPlan(skills, 17, () => 0.5);
    const counts = skills.map((skill) => plan.filter((item) => item === skill).length);
    assert.ok(Math.max(...counts) - Math.min(...counts) <= 1);
  }
});

run("ten questions across three skills produce a 3/3/4 distribution", () => {
  const plan = buildBalancedSkillPlan(["A", "B", "C"], 10, () => 0.25);
  assert.deepEqual(plan.reduce<Record<string, number>>((counts, skill) => ({ ...counts, [skill]: (counts[skill] ?? 0) + 1 }), {}), { A: 4, B: 3, C: 3 });
});

run("incremental balancing chooses a least-used skill", () => {
  assert.equal(pickBalancedSkill(["A", "B", "C"], ["A", "A", "B"], () => 0), "C");
});

run("sessions reject an empty skill selection", () => {
  assert.throws(() => createPracticeSession({ id: "S", studentId: "local", selectedSkillIds: [], settings: { mode: "practice" }, startedAt: 0 }), /At least one skill/);
});

run("multi-skill selector preserves skill boundaries and picker anti-repetition", () => {
  const definitions: SkillQuestionDefinition[] = [
    { id: "A1", topicId: "SIGNED_NUMBERS", skillId: "A", type: "numeric", difficulty: 0.5, subtopic: "one", prompt: [], correctAnswers: ["1"] },
    { id: "A2", topicId: "SIGNED_NUMBERS", skillId: "A", type: "numeric", difficulty: 0.5, subtopic: "two", prompt: [], correctAnswers: ["1"] },
    { id: "B1", topicId: "SIGNED_NUMBERS", skillId: "B", type: "numeric", difficulty: 0.5, subtopic: "one", prompt: [], correctAnswers: ["1"] },
  ];
  const originalRandom = Math.random;
  Math.random = () => 0.5;
  try {
    const selector = new SkillQuestionSelector(definitions);
    const first = selector.pick("A", 0.5);
    const second = selector.pick("A", 0.5);
    const otherSkill = selector.pick("B", 0.5);
    assert.equal(first.skillId, "A");
    assert.equal(second.skillId, "A");
    assert.notEqual(second.id, first.id);
    assert.equal(otherSkill.skillId, "B");
  } finally {
    Math.random = originalRandom;
  }
});

run("session reducer transitions are deterministic", () => {
  const initial = started({ mode: "fixed", questionCount: 5 });
  const action = { type: "ANSWER_SUBMITTED" as const, result: result("Q0", true, 10) };
  assert.deepEqual(practiceSessionReducer(initial, action), practiceSessionReducer(initial, action));
});
