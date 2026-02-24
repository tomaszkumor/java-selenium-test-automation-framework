import { defineConfig, devices } from '@playwright/test';
import { loadConfig } from './src/main/code/config/ConfigManager';

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const appConfig = loadConfig();

export default defineConfig(
  {
    use: {
      browserName: appConfig.web.engine as any,
      headless: appConfig.web.headless,
      trace: appConfig.web.debug ? 'on' : 'off',
    },
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
