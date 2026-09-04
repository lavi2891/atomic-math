import assert from 'node:assert/strict';
import { mock } from 'node:test';
import path from 'node:path';
import React from 'react';
import { create, act } from 'react-test-renderer';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, plugins: [{ name: 'isolated-test-env', enforce: 'pre', transform(code, id) { if (id.includes('/src/')) return code.replaceAll('import.meta', '({ env: { DEV: false } })'); } }], server: { middlewareMode: true }, esbuild: { jsx: 'automatic' }, resolve: { alias: Object.fromEntries(['domain', 'ui', 'app', 'copy', 'shared'].map(name => [`@${name}`, path.resolve('src', name)])) } });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.requestAnimationFrame = () => 0;
globalThis.cancelAnimationFrame = () => {};
const { QuestionView } = await server.ssrLoadModule('/src/app/questions/QuestionView.tsx');
const { SessionView } = await server.ssrLoadModule('/src/app/session/SessionView.tsx');
const { SessionSummaryScreen } = await server.ssrLoadModule('/src/app/session/SessionSummaryScreen.tsx');
const { useSessionEngine } = await server.ssrLoadModule('/src/app/session/useSessionEngine.ts');
const { SKILLS, SKILL_GROUPS, DOMAINS } = await server.ssrLoadModule('/src/content/catalog/index.ts');
const { sessionReviewResults, repeatSessionConfig, activePracticeScopeLabel } = await server.ssrLoadModule('/src/domain/session/studentSessionUx.ts');
const { FOUNDATIONAL_QUESTIONS } = await server.ssrLoadModule('/src/content/foundations/questions.ts');
const { filterChallengeContent } = await server.ssrLoadModule('/src/domain/session/challengeContent.ts');
const skill = SKILLS.find(s => s.active && s.modes.timedProfileId);
const question = { id: 'one', topicId: 'SIGNED_NUMBERS', skillId: skill.id, type: 'numeric', difficultyBand: 'A', tags: ['short-item'], prompt: [{ kind: 'text', value: '1 + 1 = ?' }], correctAnswers: ['2'] };
const text = node => typeof node === 'string' ? node : Array.isArray(node) ? node.map(text).join('') : node?.children ? text(node.children) : '';
const buttons = tree => tree.root.findAllByType('button');
const button = (tree, label) => buttons(tree).find(b => text(b.props.children) === label);
let engine;
function Game({ session, definitions = [question] }) {
  engine = useSessionEngine(session, definitions);
  if (engine.state.status === 'ended') return React.createElement('p', null, 'ended');
  return React.createElement(QuestionView, { key: `${engine.state.results.length}:${engine.state.currentQuestion.id}`, question: engine.state.currentQuestion, sessionMode: session.settings.mode, onEvaluated: engine.actions.rememberAnswer, onNext: engine.actions.submitAnswer });
}
const session = settings => ({ id: 'test', studentId: 'student', selectedSkillIds: [skill.id], settings, startedAt: Date.now() });
async function mount(element) { let tree; await act(() => { tree = create(element); }); return tree; }
async function tick(ms) { await act(() => mock.timers.tick(ms)); }
async function answer(tree, value = '2') {
  await act(() => tree.root.findByType('input').props.onChange({ target: { value } }));
  assert.ok(button(tree, 'אישור'), 'shared student submit label');
  await act(() => tree.root.findByType('form').props.onSubmit({ preventDefault() {} }));
}
async function unmount(tree) { await act(() => tree.unmount()); }
try {
  assert.equal(activePracticeScopeLabel([skill.id]), skill.nameHe);
  const group = SKILL_GROUPS.find(item => item.active && item.skillIds.length > 1);
  assert.equal(activePracticeScopeLabel(group.skillIds), `${group.nameHe} · ${group.skillIds.length} מיומנויות`);
  const domainSkills = SKILLS.filter(item => item.domainId === skill.domainId).map(item => item.id);
  assert.equal(activePracticeScopeLabel(domainSkills), `${DOMAINS.find(item => item.id === skill.domainId).nameHe} · ${domainSkills.length} מיומנויות`);
  console.log('PASS compact active scope uses skill, group, or domain with count');
  mock.timers.enable({ apis: ['setTimeout', 'setInterval', 'Date'], now: 1000 });
  for (const mode of ['timed', 'survival', 'fixed', 'practice']) {
    const settings = mode === 'timed' ? { mode, durationSeconds: 30 } : mode === 'survival' ? { mode, maxErrors: 3 } : mode === 'fixed' ? { mode, questionCount: 5 } : { mode };
    const original = { ...session(settings), assignmentId: 'assignment' };
    const replay = repeatSessionConfig(original);
    assert.deepEqual(replay, { skillIds: original.selectedSkillIds, settings, assignmentId: 'assignment' });
    assert.notEqual(replay.settings, settings);
    const tree = await mount(React.createElement(Game, { session: original }));
    await answer(tree);
    if (mode === 'timed' || mode === 'survival') {
      assert.equal(button(tree, 'הבא'), undefined);
      assert.match(text(tree.toJSON()), /✓ נכון/);
      await tick(449); assert.equal(engine.state.results.length, 0);
      await tick(1); assert.equal(engine.state.results.length, 1);
      assert.ok(button(tree, 'אישור'), 'reused instance is answerable again');
      if (mode === 'timed') {
        for (let i = 0; i < 35; i++) { await answer(tree); await tick(450); }
        assert.equal(engine.state.results.length, 36);
        assert.equal(engine.state.status, 'active');
        await tick(engine.state.session.startedAt + 29999 - Date.now());
        await answer(tree, '0');
        await act(() => engine.actions.timerExpired());
        assert.equal(engine.state.status, 'active', 'early expiry cannot end timed mode');
        await tick(1);
        await act(() => engine.actions.timerExpired());
        assert.equal(engine.state.endReason, 'timer_expired');
        assert.equal(engine.state.results.length, 37, 'answer during feedback survives expiry');
        assert.deepEqual(engine.state.results[36].questionSnapshot, question);
      } else {
        for (let i = 0; i < 3; i++) { await answer(tree, '0'); assert.match(text(tree.toJSON()), /✗ לא נכון/); await tick(450); }
        assert.equal(engine.state.endReason, 'errors_exhausted');
      }
    } else {
      await tick(1000); assert.equal(engine.state.results.length, 0);
      assert.ok(button(tree, 'הבא'));
      await act(() => button(tree, 'הבא').props.onClick());
      assert.equal(engine.state.results.length, 1);
    }
    await unmount(tree);
    console.log(`PASS ${mode} feedback, advancement, and session boundaries`);
  }
  const { authoredStudentContent } = await server.ssrLoadModule('/src/content/foundations/studentMathContent.ts');
  const comparison = { ...question, type: 'singleChoice', prompt: authoredStudentContent('השלימו את ההשוואה: [[-2]] [[\\square]] [[0]]'), correctOptionId: 'less', options: [{ id: 'less', content: [{ kind: 'math', latex: '<' }] }, { id: 'greater', content: [{ kind: 'math', latex: '>' }] }] };
  let comparisonResult;
  const comparisonTree = await mount(React.createElement('div', { dir: 'rtl' }, React.createElement(QuestionView, { question: comparison, onEvaluated(result) { comparisonResult = result; }, onNext() {} })));
  const mathRun = comparisonTree.root.findByProps({ className: 'math-run' });
  assert.equal(mathRun.props.dir, 'ltr');
  assert.equal(mathRun.props.style.unicodeBidi, 'isolate');
  const comparisonHtml = mathRun.findAll(n => n.props.dangerouslySetInnerHTML).map(n => n.props.dangerouslySetInnerHTML.__html);
  assert.equal(comparisonHtml.length, 3);
  assert.match(comparisonHtml[0], /<annotation[^>]*>-2<\/annotation>/);
  assert.match(comparisonHtml[2], /<annotation[^>]*>0<\/annotation>/);
  const lessButton = buttons(comparisonTree).find(b => b.findAll(n => n.props.dangerouslySetInnerHTML?.__html.includes('&lt;')).length);
  await act(() => lessButton.props.onClick());
  await act(() => button(comparisonTree, 'אישור').props.onClick());
  assert.equal(comparisonResult.isCorrect, true);
  await unmount(comparisonTree);
  console.log('PASS RTL comparison preserves -2 before 0 and accepts the displayed less-than choice');
  let finished;
  const timedTree = await mount(React.createElement(SessionView, { session: session({ mode: 'timed', durationSeconds: 30 }), definitions: [question], onSessionEnd(state) { finished = state; } }));
  assert.match(text(timedTree.toJSON()), new RegExp(skill.nameHe));
  await answer(timedTree); await tick(450);
  assert.equal(button(timedTree, 'הבא'), undefined);
  await tick(29400);
  assert.equal(finished, undefined);
  await answer(timedTree, '0');
  await tick(150);
  assert.equal(finished.endReason, 'timer_expired');
  assert.equal(finished.results.length, 2);
  await tick(1000); assert.equal(finished.results.length, 2);
  await unmount(timedTree);
  console.log('PASS real session timer runs during feedback and expires without Next');
  for (const type of ['singleChoice', 'multiChoice']) {
    const tree = await mount(React.createElement(QuestionView, { question: { ...question, type, options: [{ id: 'a', content: [{ kind: 'text', value: 'two' }] }], correctOptionId: 'a', correctOptionIds: ['a'] }, onNext() {} }));
    assert.ok(button(tree, 'אישור')); await unmount(tree);
  }
  const completed = { session: session({ mode: 'timed', durationSeconds: 30 }), status: 'ended', endReason: 'timer_expired', results: [{ questionId: 'one', isCorrect: false, rawAnswer: { questionType: 'numeric', data: { value: '0' } }, questionSnapshot: question }, { questionId: 'two', isCorrect: true, rawAnswer: { questionType: 'numeric', data: { value: '2' } }, questionSnapshot: { ...question, id: 'two' } }] };
  let repeats = 0;
  const tree = await mount(React.createElement(SessionSummaryScreen, { completed, masteryBefore: {}, masteryAfter: {}, personalBestUpdate: null, onHome() {}, onRepeat() { repeats++; } }));
  assert.match(text(tree.toJSON()), new RegExp(skill.nameHe));
  assert.match(text(tree.toJSON()), /1 נכונות ב־30 שניות/);
  assert.doesNotMatch(text(tree.toJSON()), /התקדמות לפי מיומנות|ניסיונות|mastery|evidence/i);
  assert.deepEqual(buttons(tree).map(b => text(b.props.children)), ['שחק שוב', 'ראה מה טעיתי', 'מסך ראשי', 'דוח מפורט']);
  await act(() => button(tree, 'שחק שוב').props.onClick()); assert.equal(repeats, 1);
  await act(() => button(tree, 'ראה מה טעיתי').props.onClick());
  assert.equal(tree.root.findAllByType('article').length, 1);
  assert.match(text(tree.toJSON()), /התשובה שלך:.*התשובה הנכונה:/);
  const mathHtml = tree.root.findAll(n => n.props.dangerouslySetInnerHTML).map(n => n.props.dangerouslySetInnerHTML.__html).join('');
  assert.match(mathHtml, />0</); assert.match(mathHtml, />2</);
  await act(() => tree.root.findAllByType('input').find(i => i.props.type === 'checkbox').props.onChange({ target: { checked: true } }));
  assert.equal(tree.root.findAllByType('article').length, 2);
  assert.equal(sessionReviewResults(completed.results).length, 1);
  await unmount(tree);
  console.log('PASS minimal summary, scope label, actions, and incorrect-only review');
  // Exercise the real eligible generator bank beyond its initial pool size.
  const settings = { mode: 'timed', durationSeconds: 30 };
  const definitions = filterChallengeContent(settings, [skill], FOUNDATIONAL_QUESTIONS).filter(q => q.skillId === skill.id);
  const { SkillQuestionSelector } = await server.ssrLoadModule('/src/domain/session/skillQuestionSelector.ts');
  const selector = new SkillQuestionSelector(definitions, 12345);
  for (let i = 0; i < Math.max(50, definitions.length * 2); i++) assert.equal(selector.pick(skill.id, .38).skillId, skill.id);
  console.log('PASS timed real bank continues beyond initial pool');
  const broken = { id: 'broken', skillId: skill.id, topicId: question.topicId, kind: 'generated', exprTemplate: '1/0', params: {}, promptTemplate: question.prompt };
  const resilient = new SkillQuestionSelector([broken, question], 123);
  for (let i = 0; i < 5; i++) assert.equal(resilient.pick(skill.id, .1).id, question.id);
  const finite = { ...broken, id: 'finite', exprTemplate: '1+1' };
  const reusable = new SkillQuestionSelector([finite], 123);
  const first = reusable.pick(skill.id, .1);
  finite.exprTemplate = '1/0';
  assert.deepEqual(reusable.pick(skill.id, .1), first);
  const alternating = new SkillQuestionSelector([question, { ...question, id: 'alternative' }], 123);
  let last;
  for (let i = 0; i < 20; i++) { const next = alternating.pick(skill.id, .1); assert.notEqual(next.id, last); last = next.id; }
  console.log('PASS failed samples reuse eligible instances and avoid unnecessary immediate repeats');

} finally {
  mock.timers.reset();
  await server.close();
}
