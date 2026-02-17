import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test/code/tests',  // katalog z testami
  timeout: 30 * 1000,                // max czas testu w ms
  expect: {
    timeout: 5000,                   // max czas oczekiwania na expect()
  },
  fullyParallel: true,               // pozwala na uruchamianie testów równolegle
  retries: 0,                        // liczba retry w razie porażki
  reporter: 'list'                   // format raportu w konsoli
});
