import { test, expect } from '@playwright/test';
import { createServer } from 'vite';

let server;
let url;
test.beforeAll(async () => {
  server = await createServer({ envFile: false, define: { 'import.meta.env.VITE_APPS_SCRIPT_URL': JSON.stringify('/atomic-math/api'), 'import.meta.env.VITE_STUDENT_ID': JSON.stringify('') }, server: { port: 0, host: '127.0.0.1' }, plugins: [{ name: 'identity-test-page', configureServer(vite) {
    vite.middlewares.use(async (req, res, next) => {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      if (pathname.endsWith('/api') && req.method === 'POST') {
        let raw = '';
        req.setEncoding('utf8');
        req.on('data', chunk => { raw += chunk; });
        req.on('end', () => {
          const request = JSON.parse(raw || '{}');
          let data = {};
          if (request.action === 'getStudentHome') {
            const id = request.payload.studentId;
            const active = id === 'M8-241' || id === 'M8-583';
            data = { student: active ? { studentId: id, displayName: id, active: true } : null, studentStatus: active ? 'active' : 'unknown', activeAssignments: [], masterySnapshots: [] };
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, requestId: request.requestId, serverTime: 'now', data }));
        });
        return;
      }
      if (!['/atomic-math/', '/atomic-math/course/numbers-algebra'].includes(pathname)) return next();
      const html = await vite.transformIndexHtml(pathname, '<!doctype html><html lang="he" dir="rtl"><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body><div id="root"></div><script type="module" src="/scripts/fixtures/student-identity.tsx"></script></body></html>');
      res.setHeader('Content-Type', 'text/html'); res.end(html);
    });
  } }] });
  await server.listen();
  url = `http://127.0.0.1:${server.httpServer.address().port}/atomic-math/`;
});
test.afterAll(async () => { await server?.close(); });

test('missing identity shows code entry; invalid remains there; valid opens Home and survives reload', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto(url);
  const probe = await page.evaluate(async () => {
    const response = await fetch('/atomic-math/api', { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'getStudentHome', requestId: 'probe', clientVersion: '1', payload: { studentId: 'M8-241' } }) });
    return response.json();
  });
  expect(probe.data.studentStatus).toBe('active');
  expect(await page.evaluate(() => window.identityFixture.clientProbe('M8-241'))).toMatchObject({ data: { studentStatus: 'active' } });
  await expect(page.getByRole('heading', { name: 'קוד תלמיד' })).toBeVisible();
  await page.getByRole('textbox', { name: 'קוד תלמיד' }).fill('M8-999');
  await page.getByRole('button', { name: 'המשך' }).click();
  await expect(page.getByRole('alert')).toHaveText('קוד לא נמצא. בדקו את הקוד ונסו שוב.');
  await expect(page.getByRole('heading', { name: 'קוד תלמיד' })).toBeVisible();
  await page.getByRole('textbox', { name: 'קוד תלמיד' }).fill('m8-241');
  await page.getByRole('button', { name: 'המשך' }).click();
  await expect(page.getByRole('heading', { name: 'המשך במסלול' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'המשך במסלול' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'החלפת תלמיד' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

test('switching identity preserves isolated local evidence', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('textbox', { name: 'קוד תלמיד' }).fill('M8-241');
  await page.getByRole('button', { name: 'המשך' }).click();
  await expect(page.getByRole('heading', { name: 'המשך במסלול' })).toBeVisible();
  await page.evaluate(() => window.identityFixture.saveAttempt('M8-241'));
  await page.getByRole('button', { name: 'החלפת תלמיד' }).click();
  await expect(page.getByRole('heading', { name: 'קוד תלמיד' })).toBeVisible();
  await page.getByRole('textbox', { name: 'קוד תלמיד' }).fill('M8-583');
  await page.getByRole('button', { name: 'המשך' }).click();
  await expect(page.getByRole('heading', { name: 'המשך במסלול' })).toBeVisible();
  expect(await page.evaluate(() => window.identityFixture.count('M8-241'))).toBe(1);
  expect(await page.evaluate(() => window.identityFixture.count('M8-583'))).toBe(0);
});

test('direct course URL validates identity and then retains course context', async ({ page }) => {
  await page.goto(`${url}course/numbers-algebra`);
  await expect(page.getByRole('heading', { name: 'קוד תלמיד' })).toBeVisible();
  await page.getByRole('textbox', { name: 'קוד תלמיד' }).fill('M8-241');
  await page.getByRole('button', { name: 'המשך' }).click();
  await expect(page.getByRole('heading', { name: 'מספרים ואלגברה' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'מספרים ואלגברה' })).toBeVisible();
});
