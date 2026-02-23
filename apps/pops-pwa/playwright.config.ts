import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for POPS PWA E2E tests
 *
 * Two modes:
 *   Mocked tests (transactions.spec.ts, import-wizard.spec.ts):
 *     All API calls are intercepted via page.route() — fast, no real backend needed.
 *     The API webServer is still started but irrelevant for these tests.
 *
 *   Integration tests (*-integration.spec.ts):
 *     Real API calls route through Vite proxy → finance-api → 'e2e' named environment.
 *     globalSetup creates the seeded env before tests; globalTeardown deletes it after.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  globalSetup: './e2e/global-setup.ts',
  globalTeardown: './e2e/global-teardown.ts',

  use: {
    baseURL: 'http://localhost:5566',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: [
    // Vite dev server (PWA) — proxies /trpc to the API below
    {
      command: 'yarn dev',
      url: 'http://localhost:5566',
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
      // Disable React Query DevTools in E2E — its SVG logo renders at full intrinsic
      // size (r=316.5px circle) and intercepts pointer events on popover buttons.
      env: { VITE_E2E: 'true' },
    },
    // Finance API — required for integration tests; mocked tests don't use it but starting
    // it is harmless and ensures the proxy target is always available.
    {
      command: 'yarn dev',
      url: 'http://localhost:3000/health',
      cwd: '../finance-api',
      reuseExistingServer: !process.env.CI,
      timeout: 60000,
    },
  ],
});
