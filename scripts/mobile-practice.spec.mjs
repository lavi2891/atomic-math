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

async function open(page, query = '') {
  await page.goto(url + query);
  await expect(page.locator('.numeric-answer-input')).toBeVisible();
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

test('narrow context stays on one line; visual keyboard collapses header and tracks panning', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page, '?multi');
  await expect(page.locator('.practice-context')).toContainText('5 מיומנויות');
  expect(await page.locator('.practice-context strong').evaluate(el => getComputedStyle(el).whiteSpace)).toBe('nowrap');
  await expectBarAt(page, 844);
  await page.locator('input').focus();
  await visualKeyboard(page, 410, 35);
  await expect(page.locator('.practice-session--keyboard')).toBeVisible();
  await expect(page.locator('.practice-context')).toHaveCount(0);
  await expect(page.locator('.math-input-preview')).toBeHidden();
  await expect(page.getByRole('button', { name: 'סיום תרגול' })).toHaveCount(0);
  await expect(page.locator('.practice-status')).toContainText('1 / 5');
  await expectBarAt(page, 445);
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
  await page.screenshot({ path: 'test-results/mobile-keyboard-closed.png' });
});

for (const mode of ['timed', 'survival']) test(`${mode} preserves essential status and submits once with keyboard Enter`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await open(page, `?mode=${mode}`);
  const input = page.locator('input');
  await input.focus(); await visualKeyboard(page, 380);
  await expect(page.locator('.practice-status')).toBeVisible();
  await expect(page.locator('.practice-context')).toHaveCount(0);
  await expectBarAt(page, 380);
  await input.fill('2');
  await input.press('Enter');
  await expect(page.getByRole('status')).toContainText('✓ נכון');
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
  await page.locator('input').fill('2');
  await expectBarAt(page, 400);
  await page.getByRole('button', { name: 'אישור', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('נכון');
  await expect.poll(() => page.evaluate(async () => (await window.savedAttempts()).length)).toBe(1);
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
  await expect(page.locator('form button[type="submit"]')).toHaveText('אישור');
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
