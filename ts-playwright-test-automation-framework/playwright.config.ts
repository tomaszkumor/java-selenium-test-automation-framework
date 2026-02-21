import { defineConfig, devices } from '@playwright/test';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

export default defineConfig(
  {
    reporter: [
      ['list'],
      ['html', { outputFolder: `playwright-report/playwright-${timestamp}`, open: 'never' }],
      ['json', { outputFile: `playwright-report/playwright-${timestamp}/test-results.json` }]
    ],
    testDir: './src/test/resources/testSuites',
    timeout: 30 * 1000,
    expect: {
      timeout: 15000,
    },
    fullyParallel: false,
    retries: 0,
  });
