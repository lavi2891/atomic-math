import { test, expect } from '@playwright/test';
import { createServer } from 'vite';

let server;
let url;
test.beforeAll(async () => {
  server = await createServer({ envFile: false, define: { 'import.meta.env.VITE_APPS_SCRIPT_URL': JSON.stringify('') }, server: { port: 0, host: '127.0.0.1' }, plugins: [{ name: 'mobile-test-page', configureServer(vite) {
    vite.middlewares.use('/atomic-math/__mobile-test', async (_req, res) => {
      const html = await vite.transformIndexHtml('/atomic-math/__mobile-test', '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body><div id="root"></div><script type="module" src="/scripts/fixtures/mobile-practice.tsx"></script></body></html>');
      res.setHeader('Content-Type', 'text/html'); res.end(html);
    });
  } }] });
  await server.listen();
  url = `http://127.0.0.1:${server.httpServer.address().port}/atomic-math/__mobile-test`;
});
test.afterAll(async () => { await server?.close(); });

async function open(page, query = '', ready = '.numeric-answer-input') {
  await page.goto(url + query);
  await expect(page.locator(ready).first()).toBeVisible();
}
// Model iOS: the layout viewport stays full-height while the visual viewport
// shrinks and pans. The actual DOM, focus, resize/scroll listeners and geometry run in Chromium.
async function visualKeyboard(page, height, offsetTop = 0) {
  await page.evaluate(({ height, offsetTop }) => {
    Object.defineProperties(window.visualViewport, { height: { configurable: true, value: height }, offsetTop: { configurable: true, value: offsetTop } });
    window.visualViewport.dispatchEvent(new Event('resize'));
    window.visualViewport.dispatchEvent(new Event('scroll'));
  }, { height, offsetTop });
}
async function expectBarAt(page, bottom) {
  const bar = page.locator('.practice-action-bar');
  await expect(bar).toBeVisible();
  await expect.poll(async () => { const rect = await bar.boundingBox(); return Math.abs(rect.y + rect.height - bottom); }).toBeLessThan(2);
  const button = page.getByRole('button', { name: 'אישור', exact: true });
  await expect(button).toBeVisible();
  const rect = await button.boundingBox();
  expect(rect.y).toBeGreaterThanOrEqual(0); expect(rect.y + rect.height).toBeLessThanOrEqual(bottom);
}
async function expectNumericIconOnPhysicalRight(page, state) {
  const input = page.locator('.numeric-answer-input');
  const icon = page.locator(`.numeric-answer-status--${state}`);
  const [inputBox, iconBox, metrics] = await Promise.all([
    input.boundingBox(),
    icon.boundingBox(),
    input.evaluate(el => {
      const style = getComputedStyle(el);
      return { direction: style.direction, paddingRight: Number.parseFloat(style.paddingRight) };
    }),
  ]);
  expect(metrics.direction).toBe('ltr');
  expect(inputBox.x + inputBox.width - (iconBox.x + iconBox.width)).toBeCloseTo(12, 1);
  const textRightEdge = inputBox.x + inputBox.width - metrics.paddingRight;
  expect(textRightEdge).toBeLessThanOrEqual(iconBox.x);
}

test('narrow Android keyboard keeps the core question geometry stable while chrome collapses', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, '?multi');
  await expect(page.locator('.practice-context')).toContainText('5 מיומנויות');
  expect(await page.locator('.practice-context strong').evaluate(el => getComputedStyle(el).whiteSpace)).toBe('nowrap');
  await expectBarAt(page, 844);
  const before = {
    prompt: await page.locator('.practice-question__prompt').boundingBox(),
    card: await page.locator('.math-input-card').boundingBox(),
    input: await page.locator('.numeric-answer-input').boundingBox(),
  };
  await page.locator('input').focus();
  await visualKeyboard(page, 410, 35);
  await expect(page.locator('.practice-session--keyboard')).toBeVisible();
  await expect(page.locator('.practice-context')).toBeHidden();
  await expect(page.locator('.math-input-preview')).toBeVisible();
  await expect(page.getByRole('button', { name: 'סיום תרגול', includeHidden: true })).toBeHidden();
  await expect(page.locator('.practice-status')).toContainText('1 / 5');
  await expectBarAt(page, 445);
  const after = {
    prompt: await page.locator('.practice-question__prompt').boundingBox(),
    card: await page.locator('.math-input-card').boundingBox(),
    input: await page.locator('.numeric-answer-input').boundingBox(),
  };
  for (const part of ['prompt', 'card', 'input']) {
    expect(after[part].x).toBeCloseTo(before[part].x, 1);
    expect(after[part].y).toBeCloseTo(before[part].y, 1);
    expect(after[part].width).toBeCloseTo(before[part].width, 1);
    expect(after[part].height).toBeCloseTo(before[part].height, 1);
  }
  await expect(page.locator('.practice-question .math').first()).toBeInViewport({ ratio: 1 });
  await page.screenshot({ path: 'test-results/mobile-keyboard-open.png' });
  const input = await page.locator('input').boundingBox();
  const bar = await page.locator('.practice-action-bar').boundingBox();
  expect(input.y + input.height).toBeLessThan(bar.y);
  await visualKeyboard(page, 360, 70);
  await expectBarAt(page, 430);
  await visualKeyboard(page, 844);
  await expect(page.locator('.practice-session--keyboard')).toHaveCount(0);
  await expect(page.locator('.practice-context')).toBeVisible();
  const restoredInput = await page.locator('.numeric-answer-input').boundingBox();
  expect(restoredInput.x).toBeCloseTo(before.input.x, 1);
  expect(restoredInput.y).toBeCloseTo(before.input.y, 1);
  expect(restoredInput.width).toBeCloseTo(before.input.width, 1);
  await page.screenshot({ path: 'test-results/mobile-keyboard-closed.png' });
});

test('stage practice shows compact Stage and Chapter context and hides it with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await open(page, '?stage');
  const context = page.locator('.practice-context');
  await expect(context.getByText('מבנה המספר', { exact: true })).toBeVisible();
  await expect(context.getByText('מספרים ופעולות בסיסיות', { exact: true })).toBeVisible();
  await expect(context).not.toContainText('מבנה המספר העשרוני');
  await page.screenshot({ path: 'test-results/mobile-stage-context-320.png' });
  await page.locator('input').focus();
  await visualKeyboard(page, 340);
  await expect(context).toBeHidden();
  await expectBarAt(page, 340);
});

for (const mode of ['timed', 'survival']) test(`${mode} preserves essential status and submits once with keyboard Enter`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await open(page, `?mode=${mode}`);
  const input = page.locator('input');
  await input.focus(); await visualKeyboard(page, 380);
  await expect(page.locator('.practice-status')).toBeVisible();
  await expect(page.locator('.practice-context')).toBeHidden();
  await expectBarAt(page, 380);
  await input.fill('2');
  await input.press('Enter');
  await expect(page.getByRole('status')).toContainText('✓ נכון');
  await expect(page.locator('.numeric-answer-input')).toHaveAttribute('data-answer-state', 'correct');
  await expect(page.getByRole('button', { name: 'הבא', exact: true })).toHaveCount(0);
  await expect(page.locator('.practice-feedback')).toHaveCount(0);
  await expect.poll(() => page.evaluate(async () => (await window.savedAttempts()).length)).toBe(1);
  await expect(page.locator('input')).toHaveValue('');
});

test('invalid Enter cannot submit; repeated submission is guarded; tapping bar retains focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await open(page);
  const input = page.locator('input'); await input.focus(); await visualKeyboard(page, 330);
  await input.fill('1/2'); await input.press('Enter');
  await expect(page.getByRole('button', { name: 'אישור', exact: true })).toBeDisabled();
  expect(await page.evaluate(async () => (await window.savedAttempts()).length)).toBe(0);
  await input.fill('2');
  await page.getByRole('button', { name: 'אישור', exact: true }).dispatchEvent('pointerdown');
  await expect(input).toBeFocused();
  await input.evaluate(el => { el.form.requestSubmit(); el.form?.requestSubmit(); });
  await expect.poll(() => page.evaluate(async () => (await window.savedAttempts()).length)).toBe(1);
});

test('the visible mobile action submits a valid answer by tap', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page); await page.locator('input').focus(); await visualKeyboard(page, 400);
  await expect(page.locator('.page')).toHaveAttribute('dir', 'rtl');
  await page.locator('input').fill('2');
  await expectBarAt(page, 400);
  await page.getByRole('button', { name: 'אישור', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('נכון');
  await expect(page.locator('.numeric-answer-input')).toHaveAttribute('data-answer-state', 'correct');
  expect(await page.locator('.numeric-answer-input').evaluate(el => getComputedStyle(el).borderColor)).toBe('rgb(74, 222, 128)');
  await expectNumericIconOnPhysicalRight(page, 'correct');
  await expect(page.locator('.practice-feedback')).toHaveCount(0);
  await expect.poll(() => page.evaluate(async () => (await window.savedAttempts()).length)).toBe(1);
});

test('wrong numeric answer stays visible, marks the input inline, and reveals the correction compactly', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  const input = page.locator('.numeric-answer-input');
  await input.focus(); await visualKeyboard(page, 400); await input.fill('0');
  const before = await page.locator('.practice-action-bar').boundingBox();
  await page.getByRole('button', { name: 'אישור', exact: true }).click();
  await expect(input).toHaveValue('0');
  await expect(input).toHaveAttribute('data-answer-state', 'incorrect');
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(await input.evaluate(el => getComputedStyle(el).borderColor)).toBe('rgb(248, 113, 113)');
  await expect(page.locator('.numeric-answer-status--incorrect')).toContainText('✗');
  await expectNumericIconOnPhysicalRight(page, 'incorrect');
  await expect(page.locator('.numeric-correct-answer')).toContainText('התשובה הנכונה:');
  await expect(page.locator('.numeric-correct-answer')).toContainText('2');
  await expect(page.locator('.practice-feedback')).toHaveCount(0);
  const after = await page.locator('.practice-action-bar').boundingBox();
  expect(after.x).toBeCloseTo(before.x, 1); expect(after.y).toBeCloseTo(before.y, 1);
  expect(after.width).toBeCloseTo(before.width, 1); expect(after.height).toBeCloseTo(before.height, 1);
});

test('long question can scroll clear of the action bar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, '?long'); await page.locator('input').focus(); await visualKeyboard(page, 400);
  await expect.poll(async () => { const input = await page.locator('input').boundingBox(); const bar = await page.locator('.practice-action-bar').boundingBox(); return input.y + input.height <= bar.y; }).toBe(true);
  const input = await page.locator('input').boundingBox(); const bar = await page.locator('.practice-action-bar').boundingBox();
  expect(input.y + input.height).toBeLessThanOrEqual(bar.y);
  await expect(page.locator('.practice-status')).toBeInViewport();
});

test('resized layout viewport fallback restores on keyboard close', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => Object.defineProperty(window, 'visualViewport', { value: undefined }));
  await open(page); await page.locator('input').focus();
  await page.setViewportSize({ width: 390, height: 400 });
  await expect(page.locator('.practice-session--keyboard')).toBeVisible(); await expectBarAt(page, 400);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.practice-context')).toBeVisible(); await expectBarAt(page, 844);
});

test('desktop keeps inline submit and full header despite focus and resize', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await open(page); await page.locator('input').focus(); await visualKeyboard(page, 450);
  await expect(page.locator('.practice-action-bar')).toHaveCount(0);
  await expect(page.locator('.practice-session--keyboard')).toHaveCount(0);
  await expect(page.locator('.practice-context')).toBeVisible();
  const action = page.locator('.practice-primary-action');
  await expect(action.getByRole('button')).toHaveText('אישור');
  await page.locator('input').fill('2');
  const before = await action.boundingBox();
  await action.getByRole('button').click();
  await expect(action.getByRole('button')).toHaveText('הבא');
  const after = await action.boundingBox();
  expect(after.x).toBeCloseTo(before.x, 1); expect(after.y).toBeCloseTo(before.y, 1);
  expect(after.width).toBeCloseTo(before.width, 1); expect(after.height).toBeCloseTo(before.height, 1);
});

test('mobile action bar does not move when אישור becomes הבא above the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  await page.locator('input').focus();
  await visualKeyboard(page, 400);
  await page.locator('input').fill('2');
  const before = await page.locator('.practice-action-bar').boundingBox();
  await page.getByRole('button', { name: 'אישור', exact: true }).click();
  await expect(page.getByRole('button', { name: 'הבא', exact: true })).toBeVisible();
  const after = await page.locator('.practice-action-bar').boundingBox();
  expect(after.x).toBeCloseTo(before.x, 1);
  expect(after.y).toBeCloseTo(before.y, 1);
  expect(after.width).toBeCloseTo(before.width, 1);
  expect(after.height).toBeCloseTo(before.height, 1);
  expect(after.y + after.height).toBeCloseTo(400, 1);
  await expect(page.locator('input')).toBeDisabled();
});

test('single choice reveals the correct option and selected mistake without moving the primary action', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await open(page, '?choice=single', '[data-option-id]');
  await page.locator('[data-option-id="a"]').click();
  const before = await page.locator('.practice-action-bar').boundingBox();
  await page.getByRole('button', { name: 'אישור', exact: true }).click();
  const correct = page.locator('[data-option-id="b"]');
  const selectedWrong = page.locator('[data-option-id="a"]');
  const neutral = page.locator('[data-option-id="c"]');
  await expect(correct).toHaveAttribute('data-answer-state', 'correct');
  await expect(correct.getByLabel('תשובה נכונה')).toContainText('✓');
  expect(await correct.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(22, 63, 45)');
  await expect(selectedWrong).toHaveAttribute('data-answer-state', 'incorrect');
  await expect(selectedWrong.getByLabel('תשובה שגויה שנבחרה')).toContainText('✕');
  expect(await selectedWrong.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(74, 32, 38)');
  await expect(neutral).toHaveAttribute('data-answer-state', 'neutral');
  await expect(page.locator('.practice-feedback')).toHaveCount(0);
  for (const option of await page.locator('[data-option-id]').all()) await expect(option).toBeDisabled();
  await expect(page.getByRole('button', { name: 'הבא', exact: true })).toBeVisible();
  const after = await page.locator('.practice-action-bar').boundingBox();
  expect(after.x).toBeCloseTo(before.x, 1); expect(after.y).toBeCloseTo(before.y, 1);
  expect(after.width).toBeCloseTo(before.width, 1); expect(after.height).toBeCloseTo(before.height, 1);
});

test('multi choice distinguishes selected correct, missed correct, selected wrong, and neutral options', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await open(page, '?choice=multi', '[data-option-id]');
  for (const id of ['a', 'b', 'd']) await page.locator(`[data-option-id="${id}"]`).click();
  await page.getByRole('button', { name: 'אישור', exact: true }).click();
  const selectedCorrect = page.locator('[data-option-id="a"]');
  await expect(selectedCorrect).toHaveAttribute('data-answer-state', 'correct');
  await expect(selectedCorrect.getByLabel('תשובה נכונה שנבחרה')).toContainText('✓');
  const missedCorrect = page.locator('[data-option-id="c"]');
  await expect(missedCorrect).toHaveAttribute('data-answer-state', 'missed-correct');
  await expect(missedCorrect.getByLabel('תשובה נכונה שלא נבחרה')).toHaveText('גם נכונה');
  await expect(missedCorrect).not.toContainText('✓');
  expect(await missedCorrect.evaluate(el => getComputedStyle(el).borderStyle)).toBe('dashed');
  expect(await missedCorrect.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(await selectedCorrect.evaluate(el => getComputedStyle(el).backgroundColor));
  for (const id of ['b', 'd']) {
    const option = page.locator(`[data-option-id="${id}"]`);
    await expect(option).toHaveAttribute('data-answer-state', 'incorrect');
    await expect(option.getByLabel('תשובה שגויה שנבחרה')).toContainText('✕');
  }
  await expect(page.locator('[data-option-id="a"]')).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-option-id="c"]')).toHaveCSS('opacity', '1');
  for (const option of await page.locator('[data-option-id]').all()) await expect(option).toBeDisabled();
  await expect(page.locator('.practice-feedback')).toHaveCount(0);
});

for (const outcome of ['passed', 'retry']) test(`stage completion ${outcome} keeps its result and actions visible at 320px`, async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(`${url}?completion=${outcome}`);
  const completion = page.locator('.stage-completion');
  await expect(completion).toBeVisible();
  const primaryLabel = outcome === 'passed' ? 'המשך' : 'ניסיון נוסף';
  await expect(page.getByRole('button', { name: primaryLabel, exact: true })).toBeVisible();
  expect(await page.getByRole('button', { name: primaryLabel, exact: true }).evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(34, 197, 94)');
  await expect(page.getByRole('button', { name: 'סיכום שלב', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: `${outcome === 'passed' ? 3 : 0} מתוך 3 כוכבים` })).toBeVisible();
  if (outcome === 'passed') {
    await expect(page.getByText('פתחת את השלב הבא')).toBeVisible();
    await expect.poll(() => page.locator('.stage-completion__stars [data-earned="true"]').count()).toBe(3);
    expect(await page.locator('.stage-completion__stars [data-earned="true"]').first().evaluate(el => getComputedStyle(el).color)).toBe('rgb(255, 212, 95)');
    await expect(page.getByRole('status', { name: '37 כוכבים בסך הכול' })).toBeVisible();
  } else {
    await expect(page.getByText('השלב הבא עדיין מחכה')).toBeVisible();
    await expect(page.getByRole('button', { name: 'חזרה למסלול', exact: true })).toBeVisible();
  }
  for (const action of await page.locator('.stage-completion__actions button').all()) {
    const box = await action.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(48);
    expect(box.y + box.height).toBeLessThanOrEqual(640);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page.screenshot({ path: `test-results/stage-completion-${outcome}-320.png` });
  if (outcome === 'retry') {
    await page.getByRole('button', { name: 'סיכום שלב', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'סיכום שלב', exact: true })).toBeVisible();
    await expect(page.locator('.stage-summary__questions article')).toHaveCount(3);
    await expect(page.locator('.stage-summary')).toContainText('התשובה שלך:');
    await expect(page.locator('.stage-summary')).toContainText('התשובה הנכונה:');
    await expect(page.locator('.stage-summary')).not.toContainText(/mastery|evidence|supportingSkills|contentFamily|difficulty/i);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    await page.screenshot({ path: 'test-results/stage-summary-retry-320.png', fullPage: true });
  }
});

for (const outcome of ['passed', 'retry']) test(`shortcut completion ${outcome} uses the focused mobile result layout`, async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(`${url}?shortcutCompletion=${outcome}`);
  const completion = page.locator('.shortcut-completion');
  await expect(completion).toBeVisible();
  const primaryLabel = outcome === 'passed' ? 'המשך במסלול' : 'חזרה למסלול';
  await expect(page.getByRole('button', { name: primaryLabel, exact: true })).toBeVisible();
  expect(await page.getByRole('button', { name: primaryLabel, exact: true }).evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgb(34, 197, 94)');
  await expect(page.getByRole('button', { name: 'נסה שוב', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'סיכום מבחן', exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: `${outcome === 'passed' ? 2 : 0} מתוך 3 כוכבים` })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  for (const action of await page.locator('.stage-completion__actions button').all()) {
    const box = await action.boundingBox();
    expect(box.height).toBeGreaterThanOrEqual(48);
    expect(box.y + box.height).toBeLessThanOrEqual(640);
  }
  await page.getByRole('button', { name: 'סיכום מבחן', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'סיכום מבחן', exact: true })).toBeVisible();
  await expect(page.locator('.shortcut-summary')).not.toContainText(/mastery|evidence|supportingSkills|contentFamily|difficulty|דוח מפורט/i);
});

test('30-second game survives two answers at six seconds and a missing next skill', async ({ page }) => {
  await page.clock.install();
  await page.clock.pauseAt(new Date(Date.now() + 1000));
  await page.addInitScript(() => { Math.random = () => 0; });
  await open(page, '?mode=timed&missing');
  await expect(page.locator('.practice-status')).toContainText('0:30');
  await page.locator('input').fill('2'); await page.locator('input').press('Enter'); await page.clock.runFor(3000);
  await page.locator('input').fill('2'); await page.locator('input').press('Enter'); await page.clock.runFor(3000);
  await expect(page.locator('.practice-status')).toContainText('0:24');
  await expect(page.locator('input')).toBeVisible();
  expect(await page.evaluate(() => window.finishedSession)).toBeUndefined();
  await page.clock.runFor(23900);
  await expect(page.locator('.practice-status')).toContainText('0:01');
  await page.clock.runFor(100);
  await expect(page.getByRole('heading', { name: 'סיימת את התרגול!' })).toBeVisible();
  await expect(page.getByText('2 נכונות ב־30 שניות')).toBeVisible();
  const ended = await page.evaluate(() => window.finishedSession);
  expect(ended.endReason).toBe('timer_expired'); expect(ended.elapsedDurationMs).toBeGreaterThanOrEqual(30000);
});
