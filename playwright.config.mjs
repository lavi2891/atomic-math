import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './scripts', testMatch: ['mobile-practice.spec.mjs', 'student-home.spec.mjs'], workers: 1, use: { channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true }, reporter: 'list' });
