import assert from 'node:assert/strict';
import path from 'node:path';
import React from 'react';
import { create, act } from 'react-test-renderer';
import { createServer } from 'vite';

const server = await createServer({ configFile: false, server: { middlewareMode: true }, esbuild: { jsx: 'automatic' }, resolve: { alias: Object.fromEntries(['domain', 'ui', 'app', 'copy', 'shared'].map(name => [`@${name}`, path.resolve('src', name)])) } });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.requestAnimationFrame = () => 0;
globalThis.cancelAnimationFrame = () => {};
globalThis.HTMLElement = class {};
globalThis.document = { activeElement: null, body: { style: { overflow: '' } } };
const { LearningPathScreen } = await server.ssrLoadModule('/src/app/learningPath/LearningPathScreen.tsx');
const { FOUNDATIONAL_QUESTIONS } = await server.ssrLoadModule('/src/content/foundations/questions.ts');
const stage = (id, type = 'normal', skillIds = ['AR_PLACE_VALUE']) => ({ id, nameHe: id, type, skillIds });
const definition = { id: 'NUMBERS_ALGEBRA', nameHe: 'מספרים ואלגברה', chapters: [
  { id: 'chapter-a', nameHe: 'ראשון', shortcutTest: { id: 'shortcut-a', skillIds: ['AR_PLACE_VALUE', 'AR_ADD_FACTS', 'AR_SUB_FACTS'], passingAccuracy: 0.8 }, stages: [stage('first'), stage('review', 'review', ['AR_ADD_FACTS', 'AR_SUB_FACTS']), stage('checkpoint', 'checkpoint'), stage('bonus', 'bonus')] },
  { id: 'chapter-b', nameHe: 'שני', stages: [stage('last')] },
] };
const progress = stars => ({ studentId: 'learner', bestStarsByStage: stars });
const text = node => typeof node === 'string' ? node : Array.isArray(node) ? node.map(text).join('') : node?.children ? text(node.children) : '';
const node = (tree, id) => tree.root.findByProps({ 'data-stage-id': id }).findByType('button');
const sheet = tree => tree.root.findByType('dialog');
const action = tree => sheet(tree).findAllByType('button').find(button => button.props.className === 'primary-action');
let launches = [];
let shortcutLaunches = [];
let reads = [];
let modalOpens = 0;
let modalCloses = 0;
const defaults = { path: definition, progress: progress({}), definitions: FOUNDATIONAL_QUESTIONS,
  personalBests: { get: async (studentId, signature) => { reads.push({ studentId, signature }); return { bestScore: 4200 }; } },
  onBack() {}, onPractice: (...args) => launches.push(args),
  onShortcut: (...args) => shortcutLaunches.push(args),
};
async function mount(overrides = {}) {
  let tree;
  await act(async () => { tree = create(React.createElement(LearningPathScreen, { ...defaults, ...overrides }), { createNodeMock: element => element.type === 'dialog' ? { showModal() { modalOpens++; }, close() { modalCloses++; } } : null }); });
  return tree;
}
async function click(button) { await act(async () => { button.props.onClick(); }); }
async function unmount(tree) { await act(() => tree.unmount()); }
async function run(name, fn) { launches = []; shortcutLaunches = []; reads = []; await fn(); console.log(`PASS ${name}`); }

try {
  await run('map reverses chapter/stage DOM order and uses distinct icons and current state', async () => {
    const tree = await mount();
    assert.deepEqual(tree.root.findAllByType('li').map(row => row.props['data-stage-id'] ?? 'chapter'), ['last', 'chapter', 'bonus', 'checkpoint', 'review', 'first', 'chapter']);
    assert.equal(node(tree, 'first').props['aria-current'], 'step');
    assert.equal(node(tree, 'first').props.disabled, false);
    for (const id of ['review', 'checkpoint', 'bonus', 'last']) assert.equal(node(tree, id).props.disabled, true);
    for (const kind of ['normal', 'review', 'checkpoint', 'bonus', 'chapter', 'lock', 'key']) assert.ok(tree.root.findAllByProps({ 'data-icon': kind }).length);
    assert.equal(tree.root.findAllByType('dialog').length, 0);
    await unmount(tree);
  });

  await run('completed stage opens a modal with earned stars, matching personal best, and exact replay scope', async () => {
    const tree = await mount({ progress: progress({ first: 3 }) });
    await click(node(tree, 'first'));
    assert.equal(sheet(tree).props['aria-labelledby'], 'stage-sheet-title');
    assert.ok(sheet(tree).findByProps({ 'aria-label': '3 מתוך 3 כוכבים' }));
    assert.match(text(sheet(tree)), /4.2 שניות/);
    assert.equal(reads[0].studentId, 'learner');
    assert.deepEqual(reads[0].signature, { mode: 'fixed', questionCount: 5, scope: { type: 'skill', skillId: 'AR_PLACE_VALUE' } });
    assert.equal(text(action(tree)), 'תרגול חוזר');
    await click(action(tree));
    assert.deepEqual(launches, [[{ pathId: 'NUMBERS_ALGEBRA', stageId: 'first' }, ['AR_PLACE_VALUE']]]);
    let prevented = false;
    await act(() => sheet(tree).props.onCancel({ preventDefault() { prevented = true; } }));
    assert.equal(prevented, true);
    assert.equal(tree.root.findAllByType('dialog').length, 0);
    await unmount(tree);
  });

  await run('review cluster keeps its review icon and opens without an irrelevant personal best', async () => {
    const tree = await mount({ progress: progress({ first: 1 }) });
    assert.equal(node(tree, 'review').props['aria-current'], 'step');
    assert.ok(node(tree, 'review').findByProps({ 'data-icon': 'review' }));
    await click(node(tree, 'review'));
    assert.ok(sheet(tree).findByProps({ 'aria-label': '0 מתוך 3 כוכבים' }));
    assert.equal(reads.length, 0);
    await click(action(tree));
    assert.deepEqual(launches[0][1], ['AR_ADD_FACTS', 'AR_SUB_FACTS']);
    await unmount(tree);
  });

  await run('optional bonus branch is playable without replacing the next main stage', async () => {
    const tree = await mount({ progress: progress({ first: 1, review: 1, checkpoint: 1 }) });
    assert.equal(node(tree, 'last').props['aria-current'], 'step');
    assert.equal(node(tree, 'bonus').props.disabled, false);
    assert.ok(tree.root.findByProps({ 'data-stage-id': 'bonus' }).findByProps({ className: 'path-branch' }));
    await click(node(tree, 'bonus'));
    await click(action(tree));
    assert.equal(launches[0][0].stageId, 'bonus');
    await unmount(tree);
  });

  await run('current chapter shortcut opens a compact assessment sheet with exact atomic Skill scope', async () => {
    const tree = await mount();
    const shortcutButton = tree.root.findByProps({ className: 'path-shortcut-node' });
    assert.match(shortcutButton.props['aria-label'], /בדיקת קיצור לבחירה/);
    assert.ok(tree.root.findByProps({ className: 'path-shortcut-branch' }));
    assert.equal(tree.root.findAllByProps({ className: 'path-chapter-node' }).some(item => item.type === 'button'), false);
    await click(shortcutButton);
    assert.equal(sheet(tree).props['aria-labelledby'], 'shortcut-sheet-title');
    assert.match(text(sheet(tree)), /5 שאלות קצרות/);
    assert.match(text(sheet(tree)), /לבחירה/);
    assert.doesNotMatch(text(sheet(tree)), /%/);
    await click(action(tree));
    assert.deepEqual(shortcutLaunches, [[{ pathId: 'NUMBERS_ALGEBRA', chapterId: 'chapter-a', shortcutId: 'shortcut-a' }, ['AR_PLACE_VALUE', 'AR_ADD_FACTS', 'AR_SUB_FACTS']]]);
    await unmount(tree);
  });

  await run('shortcut-bypassed stages stay tappable without fabricated earned stars', async () => {
    const bypassed = { studentId: 'learner', bestStarsByStage: {}, bypassedStageIds: ['first', 'review'], passedShortcutIds: ['shortcut-a'] };
    const tree = await mount({ progress: bypassed });
    assert.equal(node(tree, 'first').props.disabled, false);
    assert.equal(node(tree, 'review').props.disabled, false);
    assert.equal(node(tree, 'checkpoint').props['aria-current'], 'step');
    assert.match(node(tree, 'first').props['aria-label'], /הושלם בבדיקת קיצור/);
    await click(node(tree, 'first'));
    assert.ok(sheet(tree).findByProps({ 'aria-label': '0 מתוך 3 כוכבים' }));
    assert.match(text(sheet(tree)), /הושלם דרך בדיקת קיצור/);
    await unmount(tree);
  });

  await run('variable chapter lengths and inserted reviews preserve stable stage identities', async () => {
    const adapted = { ...definition, chapters: [{ ...definition.chapters[0], stages: [stage('first'), stage('inserted', 'review'), stage('review', 'review'), stage('checkpoint', 'checkpoint'), stage('bonus', 'bonus')] }, definition.chapters[1]] };
    const tree = await mount({ path: adapted, progress: progress({ first: 1, review: 2 }) });
    assert.equal(node(tree, 'inserted').props['aria-current'], 'step');
    assert.equal(node(tree, 'review').props.disabled, false);
    assert.equal(node(tree, 'checkpoint').props.disabled, true);
    await unmount(tree);
  });

  await run('missing content disables sheet practice and empty/missing history stays honest', async () => {
    const tree = await mount({ definitions: [] });
    await click(node(tree, 'first'));
    assert.equal(action(tree).props.disabled, true);
    assert.match(text(sheet(tree)), /אינן זמינות/);
    await unmount(tree);
    const empty = await mount({ path: { ...definition, chapters: [] } });
    assert.match(text(empty.toJSON()), /ייפתח בקרוב/);
    assert.equal(empty.root.findByProps({ className: 'student-state' }).props.role, 'status');
    await unmount(empty);
    const missing = await mount({ progress: undefined });
    assert.match(text(missing.toJSON()), /לא ניתן לטעון/);
    assert.equal(missing.root.findByProps({ className: 'student-state student-state--error' }).props.role, 'status');
    assert.equal(missing.root.findAllByType('li').length, 0);
    await unmount(missing);
  });

  await run('cache failures do not block practice; pending launches and transient errors stay inside the sheet', async () => {
    const personalBests = { get: async () => { throw new Error('offline'); } };
    const tree = await mount({ personalBests });
    await click(node(tree, 'first'));
    assert.equal(action(tree).props.disabled, false);
    await act(() => tree.update(React.createElement(LearningPathScreen, { ...defaults, personalBests, starting: true, error: 'לא ניתן להתחיל כרגע' })));
    assert.equal(action(tree).props.disabled, true);
    assert.equal(sheet(tree).props['aria-busy'], true);
    assert.equal(text(sheet(tree).findByProps({ role: 'alert' })), 'לא ניתן להתחיל כרגע');
    await act(() => sheet(tree).props.onCancel({ preventDefault() {} }));
    assert.equal(tree.root.findAllByType('dialog').length, 1);
    await unmount(tree);
  });
  assert.equal(modalOpens, modalCloses);
  assert.equal(document.body.style.overflow, '');
} finally { await server.close(); }
