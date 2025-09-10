const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  
  // CI optimizations
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  
  // Reporters
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],
  
  use: {
    // No baseURL needed since tests use direct URLs
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry' // Optional: record videos on retry
  }
});