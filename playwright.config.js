import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',

  use: {
    baseURL: 'http://localhost:8080',
  },

  webServer: {
    command: 'npm run start:test',
    url: 'http://localhost:8080',
    reuseExistingServer: false,
  },
})