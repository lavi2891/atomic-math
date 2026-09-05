import { test, expect } from '@playwright/test';
import { createServer } from 'vite';

let server;
let url;
test.beforeAll(async () => {
  server = await createServer({ envFile: false, define: { 'import.meta.env.VITE_APPS_SCRIPT_URL': JSON.stringify(''), 'import.meta.env.VITE_STUDENT_ID': JSON.stringify('home-test') }, server: { port: 0, host: '127.0.0.1' }, plugins: [{ name: 'home-test-page', configureServer(vite) {
    vite.middlewares.use(async (req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      if (!['/atomic-math/', '/atomic-math/course/numbers-algebra', '/atomic-math/course/geometry'].includes(pathname)) return next();
      const html = await vite.transformIndexHtml(pathname, '<!doctype html><html lang="he" dir="rtl"><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="/scripts/fixtures/student-home.tsx"></script></body></html>');
      res.setHeader('Content-Type', 'text/html'); res.end(html);
    });
  } }] });
  await server.listen();
  url = `http://127.0.0.1:${server.httpServer.address().port}/atomic-math/`;
});
test.afterAll(async () => { await server?.close(); });
const numbers = page => page.getByRole('article', { name: 'מספרים ואלגברה' });
const geometry = page => page.getByRole('article', { name: 'גיאומטריה' });
async function open(page, query = '') {
  await page.goto(url + query);
  await expect(page.getByRole('heading', { level: 1, name: 'המשך במסלול' })).toBeVisible();
  await expect(numbers(page).getByRole('button')).toBeEnabled();
}

test('direct Home URL survives refresh', async ({ page }) => {
  await page.goto(url);
  await expect(page).toHaveURL(/\/atomic-math\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'המשך במסלול' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { level: 1, name: 'המשך במסלול' })).toBeVisible();
});

test('direct Numbers and Algebra URL restores the current stage after refresh', async ({ page }) => {
  await page.goto(`${url}course/numbers-algebra`);
  await expect(page.getByRole('heading', { level: 1, name: 'מספרים ואלגברה' })).toBeVisible();
  await expect(page.locator('[aria-current="step"]')).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL(/\/atomic-math\/course\/numbers-algebra$/);
  await expect(page.locator('[aria-current="step"]')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/atomic-math\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'המשך במסלול' })).toBeVisible();
});

test('direct Geometry URL survives refresh', async ({ page }) => {
  await page.goto(`${url}course/geometry`);
  await expect(page.getByRole('heading', { level: 1, name: 'גיאומטריה' })).toBeVisible();
  await expect(page.getByText('המסלול ייפתח בקרוב')).toBeVisible();
  await page.reload();
  await expect(page).toHaveURL(/\/atomic-math\/course\/geometry$/);
  await expect(page.getByRole('heading', { level: 1, name: 'גיאומטריה' })).toBeVisible();
});

test('browser Back returns from a course to Home', async ({ page }) => {
  await open(page);
  await numbers(page).getByRole('button').click();
  await expect(page).toHaveURL(/\/atomic-math\/course\/numbers-algebra$/);
  await page.goBack();
  await expect(page).toHaveURL(/\/atomic-math\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'המשך במסלול' })).toBeVisible();
});

test('browser Back from a course session restores its originating course', async ({ page }) => {
  await open(page);
  await numbers(page).getByRole('button').click();
  await page.locator('[aria-current="step"]').click();
  await page.getByRole('dialog').getByRole('button', { name: 'התחלת תרגול' }).click();
  await expect(page.locator('.practice-status')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/atomic-math\/course\/numbers-algebra$/);
  await expect(page.getByRole('heading', { level: 1, name: 'מספרים ואלגברה' })).toBeVisible();
  await expect(page.locator('[aria-current="step"]')).toBeVisible();
});

for (const width of [320, 360, 390]) test(`Home at ${width}px has a clear vertical hierarchy and large touch targets`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await open(page);
  await expect(page.locator('.learning-path-card')).toHaveCount(2);
  await expect(numbers(page)).toContainText('השלב הבא: מבנה המספר');
  await expect(numbers(page).getByRole('progressbar')).toHaveAttribute('value', '0');
  await expect(page.getByRole('status', { name: '0 כוכבים בסך הכול' })).toBeVisible();
  await expect(geometry(page)).toContainText('המסלול ייפתח בקרוב');
  await expect(geometry(page).getByRole('button')).toBeDisabled();
  await expect(page.locator('.domain-tree, table, .mastery-row, .assignment-card, .quick-presets')).toHaveCount(0);
  await expect(page.locator('.student-home')).not.toContainText(/שליטה|מיומנויות|שיאים|ראיות/);
  const blocks = [numbers(page), geometry(page), page.getByRole('region', { name: 'בדיקה מהירה' }), page.getByRole('button', { name: 'תרגול חופשי' })];
  let bottom = 0;
  for (const block of blocks) {
    const box = await block.boundingBox();
    expect(box.y).toBeGreaterThanOrEqual(bottom);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    bottom = box.y + box.height;
  }
  for (const button of await page.locator('.student-home button').all()) expect((await button.boundingBox()).height).toBeGreaterThanOrEqual(48);
  const phonePadding = await page.locator('.phone').evaluate(el => ({
    inlineStart: parseFloat(getComputedStyle(el).paddingInlineStart),
    inlineEnd: parseFloat(getComputedStyle(el).paddingInlineEnd),
    top: parseFloat(getComputedStyle(el).paddingTop),
    bottom: parseFloat(getComputedStyle(el).paddingBottom),
  }));
  expect(phonePadding.inlineStart).toBeGreaterThanOrEqual(10);
  expect(phonePadding.inlineEnd).toBeGreaterThanOrEqual(10);
  expect(phonePadding.top).toBeGreaterThanOrEqual(14);
  expect(phonePadding.bottom).toBeGreaterThanOrEqual(16);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.screenshot({ path: `test-results/student-home-${width}.png`, fullPage: true });
});

test('Continue opens the map and its current stage; stopping does not advance it', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  await numbers(page).getByRole('button').click();
  await page.locator('[aria-current="step"]').click();
  await page.getByRole('dialog').getByRole('button', { name: 'התחלת תרגול' }).click();
  await expect(page.locator('.practice-status')).toHaveText('1 / 5');
  await expect(page.locator('.practice-context')).toContainText('מבנה המספר');
  await expect(page.locator('.practice-context')).toContainText('מספרים ופעולות בסיסיות');
  await page.getByRole('button', { name: 'סיום תרגול', exact: true }).click();
  await page.getByRole('button', { name: 'חזרה למסלול', exact: true }).click();
  await page.getByRole('button', { name: 'חזרה לבית', exact: true }).click();
  await expect(numbers(page)).toContainText('השלב הבא: מבנה המספר');
  await page.reload();
  await expect(numbers(page).getByRole('progressbar')).toHaveAttribute('value', '0');
});

test('saved completion restores the next cluster and chapter progress after reload', async ({ page }) => {
  await open(page, '?completed=first');
  await expect(numbers(page)).toContainText('השלב הבא: חיבור וחיסור');
  await expect(numbers(page)).toContainText('1 מתוך 4 שלבים בפרק');
  await expect(page.getByRole('status', { name: '1 כוכבים בסך הכול' })).toBeVisible();
  await page.reload();
  await expect(numbers(page)).toContainText('השלב הבא: חיבור וחיסור');
  await numbers(page).getByRole('button').click();
  await page.locator('[aria-current="step"]').click();
  await page.getByRole('dialog').getByRole('button', { name: 'התחלת תרגול' }).click();
  await expect(page.locator('.practice-context')).toContainText('חיבור וחיסור');
});

test('a finished chapter advances the card to the next chapter', async ({ page }) => {
  await open(page, '?completed=chapter');
  await expect(numbers(page)).toContainText('כפל וחילוק');
  await expect(numbers(page)).toContainText('0 מתוך 4 שלבים בפרק');
  await expect(numbers(page)).not.toContainText('בודקים את היסודות');
});

test('quick check starts five questions and free practice retains its Skill tree and back navigation', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await open(page);
  await page.getByRole('button', { name: 'התחל בדיקה', exact: true }).click();
  await expect(page.locator('.practice-status')).toHaveText('1 / 5');
  await page.getByRole('button', { name: 'סיום תרגול', exact: true }).click();
  await page.getByRole('button', { name: 'מסך ראשי', exact: true }).click();
  await page.getByRole('button', { name: 'תרגול חופשי' }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'תרגול חופשי' })).toBeVisible();
  await page.getByRole('button', { name: 'חשבון בסיסי' }).click();
  await page.getByRole('button', { name: /פתח/ }).click();
  await expect(page.locator('.skill-row').first()).toBeVisible();
  await page.getByRole('button', { name: 'חזרה', exact: true }).click();
  await page.getByRole('button', { name: 'חזרה לבית', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'המשך במסלול' })).toBeVisible();
  await expect(page.locator('.domain-tree')).toHaveCount(0);
});

async function openMap(page, query = '?completed=first') {
  await open(page, query);
  await numbers(page).getByRole('button').click();
  await expect(page.locator('[aria-current="step"]')).toBeInViewport();
}
const stageNode = (page, id) => page.locator(`[data-stage-id="${id}"] button`);

for (const width of [320, 360, 390]) test(`upward map at ${width}px centers current stage without horizontal overflow`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await openMap(page);
  await expect(page.getByRole('status', { name: '1 כוכבים בסך הכול' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'עוד בדרך' })).toBeVisible();
  const current = page.locator('[aria-current="step"]');
  const previous = stageNode(page, 'NA_PLACE_VALUE');
  const next = stageNode(page, 'NA_DECIMAL_REVIEW');
  const currentBox = await current.boundingBox();
  expect((await previous.boundingBox()).y).toBeGreaterThan(currentBox.y);
  expect((await next.boundingBox()).y).toBeLessThan(currentBox.y);
  expect(currentBox.width).toBeGreaterThan((await next.boundingBox()).width);
  expect((await page.locator('.path-chapter-node').first().boundingBox()).width).toBeGreaterThan(currentBox.width);
  await expect(previous.locator('[data-icon="check"]')).toBeVisible();
  await expect(next).toBeDisabled();
  expect(await page.locator('.path-row[data-status="locked"] .path-node-status').count()).toBeLessThanOrEqual(2);
  await next.evaluate(button => button.click());
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(await page.locator('.path-scroll').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  const continuation = await page.locator('.path-continuation-node').boundingBox();
  expect(continuation.x).toBeGreaterThanOrEqual(0);
  expect(continuation.x + continuation.width).toBeLessThanOrEqual(width);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  for (const node of await page.locator('.path-stage-node').all()) {
    const box = await node.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(48);
    expect(box.height).toBeGreaterThanOrEqual(48);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
  }
  await page.setViewportSize({ width, height: 640 });
  await expect(current).toBeInViewport();
  await page.screenshot({ path: `test-results/learning-path-${width}.png` });
  const oldScroll = await page.locator('.path-scroll').evaluate(el => el.scrollTop);
  await page.locator('.path-scroll').evaluate(el => { el.scrollTop -= 320; });
  expect(await page.locator('.path-scroll').evaluate(el => el.scrollTop)).toBeLessThan(oldScroll);
  await expect(page.getByRole('button', { name: 'חזרה לבית' })).toBeInViewport();
});

test('bottom sheet fits narrow and short viewports, traps focus, and restores the tapped node', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await openMap(page);
  const current = page.locator('[aria-current="step"]');
  await current.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('חיבור וחיסור');
  await expect(dialog.getByRole('img', { name: '0 מתוך 3 כוכבים' })).toBeVisible();
  await expect(dialog).not.toContainText('השיא שלך');
  const box = await dialog.boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(320);
  expect(box.y + box.height).toBeCloseTo(568, 0);
  await expect(dialog.getByRole('button', { name: 'התחלת תרגול' })).toBeInViewport();
  expect((await dialog.getByRole('button', { name: 'התחלת תרגול' }).boundingBox()).height).toBeGreaterThanOrEqual(48);
  expect((await dialog.getByRole('button', { name: 'סגירה' }).boundingBox()).height).toBeGreaterThanOrEqual(48);
  expect(parseFloat(await dialog.locator('.path-stars').evaluate(el => getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(30);
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await page.screenshot({ path: 'test-results/learning-path-sheet-320.png' });
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(current).toBeFocused();
  await current.click();
  await page.getByRole('button', { name: 'סגירה', exact: true }).click();
  await expect(current).toBeFocused();
  await current.click();
  await page.mouse.click(4, 100);
  await expect(dialog).toHaveCount(0);
  await expect(current).toBeFocused();
});

test('completed nodes offer stars, relevant best, replay, and a return to the map', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openMap(page, '?completed=first&best');
  await stageNode(page, 'NA_PLACE_VALUE').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('img', { name: '1 מתוך 3 כוכבים' })).toBeVisible();
  const starColors = await dialog.locator('.path-stars > span').evaluateAll(stars => stars.map(star => getComputedStyle(star).color));
  expect(starColors[0]).not.toBe(starColors[1]);
  await expect(dialog).toContainText('השיא שלך: 10 שניות');
  await page.screenshot({ path: 'test-results/learning-path-replay-sheet.png' });
  await dialog.getByRole('button', { name: 'תרגול חוזר' }).click();
  await expect(page.locator('.practice-status')).toHaveText('1 / 5');
  await page.getByRole('button', { name: 'סיום תרגול', exact: true }).click();
  await page.getByRole('button', { name: 'חזרה למסלול', exact: true }).click();
  await expect(stageNode(page, 'NA_ADD_SUBTRACT')).toHaveAttribute('aria-current', 'step');
  await expect(stageNode(page, 'NA_ADD_SUBTRACT')).toBeInViewport();
});

test('desktop fallback keeps the student hierarchy centered and the path vertically usable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await open(page, '?completed=first');
  const phone = await page.locator('.phone').boundingBox();
  expect(phone.width).toBeLessThanOrEqual(760);
  expect(phone.x).toBeGreaterThan(0);
  expect(phone.x + phone.width).toBeLessThan(1280);
  const firstCard = await numbers(page).boundingBox();
  const secondCard = await geometry(page).boundingBox();
  expect(secondCard.y).toBeGreaterThanOrEqual(firstCard.y + firstCard.height);
  await numbers(page).getByRole('button').click();
  await expect(page.locator('[aria-current="step"]')).toBeInViewport();
  expect(await page.locator('.path-scroll').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1280);
  await page.screenshot({ path: 'test-results/student-path-desktop.png' });
});

test('bonus uses a short side branch while the main stage stays current', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await openMap(page, '?completed=multiplication');
  const current = page.locator('[aria-current="step"]');
  await expect(stageNode(page, 'NA_OPERATION_ORDER_BASIC')).toHaveAttribute('aria-current', 'step');
  const bonus = stageNode(page, 'NA_FACTORS_BONUS');
  await expect(bonus).toBeEnabled();
  const bonusBox = await bonus.boundingBox();
  const currentBox = await current.boundingBox();
  expect(currentBox.x + currentBox.width / 2 - bonusBox.x - bonusBox.width / 2).toBeCloseTo(72, 0);
  expect((await page.locator('.path-branch').boundingBox()).width).toBeLessThanOrEqual(80);
  await expect(bonus).toHaveAccessibleName(/לבחירה/);
  await page.screenshot({ path: 'test-results/learning-path-bonus-320.png' });
  await bonus.click();
  await expect(page.getByRole('dialog')).toContainText('גורמים וכפולות');
  await page.getByRole('button', { name: 'התחלת תרגול', exact: true }).click();
  await expect(page.locator('.practice-context')).toContainText('גורמים וכפולות');
});

test('current checkpoint uses a challenge shape and icon with the current-stage emphasis', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openMap(page, '?completed=review');
  const checkpoint = stageNode(page, 'NA_DECIMAL_CHECKPOINT');
  await expect(checkpoint).toHaveAttribute('aria-current', 'step');
  await expect(checkpoint.locator('[data-icon="checkpoint"]')).toBeVisible();
  expect(await checkpoint.locator('.path-node-shape').evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  expect(await checkpoint.locator('.path-node-shape').evaluate(el => getComputedStyle(el).boxShadow)).not.toBe('none');
  expect(await checkpoint.evaluate(el => getComputedStyle(el).animationName)).toBe('path-unlock');
  const shape = await checkpoint.locator('.path-node-shape').boundingBox();
  const label = await page.locator('[data-stage-id="NA_DECIMAL_CHECKPOINT"] .path-node-label > span').last().boundingBox();
  expect(label.x - shape.x - shape.width).toBeGreaterThanOrEqual(12);
  await page.screenshot({ path: 'test-results/learning-path-checkpoint.png' });
  await checkpoint.click();
  await expect(page.getByRole('dialog')).toContainText('בודקים את היסודות');
});

test('chapter shortcut is touch friendly and launches its five-question atomic Skill cluster', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await openMap(page, '');
  const shortcut = page.getByRole('button', { name: /בדיקת קיצור לבחירה.*פרק 1/ });
  await expect(shortcut).toBeEnabled();
  const box = await shortcut.boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(48);
  expect(box.height).toBeGreaterThanOrEqual(48);
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(320);
  const mainNodeBox = await shortcut.locator('xpath=..').locator('.path-chapter-node').boundingBox();
  expect(Math.abs((box.x + box.width / 2) - (mainNodeBox.x + mainNodeBox.width / 2))).toBeGreaterThanOrEqual(48);
  await expect(shortcut.locator('[data-icon="key"]')).toBeVisible();
  await expect(shortcut.locator('xpath=..').locator('.path-shortcut-branch')).toBeVisible();
  await expect(page.locator('button.path-chapter-node')).toHaveCount(0);
  await shortcut.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('5 שאלות קצרות');
  await expect(dialog).toContainText('הבדיקה לבחירה');
  await expect(dialog).not.toContainText('%');
  await page.screenshot({ path: 'test-results/learning-path-shortcut-320.png' });
  await dialog.getByRole('button', { name: 'התחלת בדיקה' }).click();
  await expect(page.locator('.practice-status')).toHaveText('1 / 5');
  await expect(page.locator('.practice-context')).toContainText('בדיקת קיצור');
  await expect(page.locator('.practice-context')).toContainText('מספרים ופעולות בסיסיות');
});

test('passed shortcut restores bypassed stages as accessible and opens the checkpoint', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openMap(page, '?shortcut=passed');
  const first = stageNode(page, 'NA_PLACE_VALUE');
  await expect(first).toBeEnabled();
  await expect(first).toHaveAccessibleName(/הושלם בבדיקת קיצור/);
  await expect(stageNode(page, 'NA_DECIMAL_CHECKPOINT')).toHaveAttribute('aria-current', 'step');
  await page.screenshot({ path: 'test-results/learning-path-shortcut-bypass-390.png' });
  await first.click();
  await expect(page.getByRole('dialog')).toContainText('השלב הושלם דרך בדיקת קיצור');
  await expect(page.getByRole('img', { name: '0 מתוך 3 כוכבים' })).toBeVisible();
});
