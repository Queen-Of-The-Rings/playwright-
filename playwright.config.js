const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
//  testDir: './tests/specs',
  timeout: 60000,
  expect: {
    // `workers` is not a valid option for `expect`. It has been removed.
    timeout: 10000,
  },
  fullyParallel: true,
    workers: 3,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporters: [
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
  
  // Define projects for each browser in the top-level `projects` array.
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], // Use the standard `devices` helper for consistency
        // Additional Chromium-specific settings
        launchOptions: {
          slowMo: 500,
          args: ['--start-maximized']
        },
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Webkit'], // Use the correct device name for WebKit
      },
    },
  ]
});