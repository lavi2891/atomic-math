import { test, expect } from '@playwright/test';
import { createServer } from 'vite';

let server;
let url;
test.beforeAll(async () => {
  server = await createServer({ envFile: false, define: { 'import.meta.env.VITE_APPS_SCRIPT_URL': JSON.stringify(''), 'import.meta.env.VITE_STUDENT_ID': JSON.stringify('home-test') }, server: { port: 0, host: '127.0.0.1' }, plugins: [{ name: 'home-test-page', configureServer(vite) {
    vite.middlewares.use('/atomic-math/__home-test', async (_req, res) => {
      const html = await vite.transformIndexHtml('/atomic-math/__home-test', '<!doctype html><html lang="he" dir="rtl"><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="/scripts/fixtures/student-home.tsx"></script></body></html>');
      res.setHeader('Content-Type', 'text/html'); res.end(html);
    });
  } }] });
  await server.listen();
  url = `http://127.0.0.1:${server.httpServer.address().port}/atomic-math/__home-test`;
});
test.afterAll(async () => { await server?.close(); });
const numbers = page => page.getByRole('article', { name: 'מספרים ואלגברה' });
const geometry = page => page.getByRole('article', { name: 'גיאומטריה' });
async function open(page, query = '') {
  await page.goto(url + query);
  await expect(page.getByRole('heading', { level: 1, name: 'המשך במסלול' })).toBeVisible();
  await expect(numbers(page).getByRole('button')).toBeEnabled();
}

for (const width of [320, 390]) test(`Home at ${width}px has a clear vertical hierarchy and large touch targets`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  await open(page);
  await expect(page.locator('.learning-path-card')).toHaveCount(2);
  await expect(numbers(page)).toContainText('השלב הבא: מבנה המספר');
  await expect(numbers(page).getByRole('progressbar')).toHaveAttribute('value', '0');
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
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.screenshot({ path: `test-results/student-home-${width}.png`, fullPage: true });
});

test('Continue launches the current stage directly; stopping does not advance it', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  await numbers(page).getByRole('button').click();
  await expect(page.locator('.practice-status')).toHaveText('1 / 5');
  await expect(page.locator('.practice-context')).toContainText('מבנה המספר העשרוני');
  await page.getByRole('button', { name: 'סיום תרגול', exact: true }).click();
  await page.getByRole('button', { name: 'מסך ראשי', exact: true }).click();
  await expect(numbers(page)).toContainText('השלב הבא: מבנה המספר');
  await page.reload();
  await expect(numbers(page).getByRole('progressbar')).toHaveAttribute('value', '0');
});

test('saved completion restores the next cluster and chapter progress after reload', async ({ page }) => {
  await open(page, '?completed=first');
  await expect(numbers(page)).toContainText('השלב הבא: חיבור וחיסור');
  await expect(numbers(page)).toContainText('1 מתוך 4 שלבים בפרק');
  await page.reload();
  await expect(numbers(page)).toContainText('השלב הבא: חיבור וחיסור');
  await numbers(page).getByRole('button').click();
  await expect(page.locator('.practice-context')).toContainText('2 מיומנויות');
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
