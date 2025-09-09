const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
   workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 2 : 0,
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
      ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
        ['junit', { outputFile: 'test-results/junit-results.xml' }],

    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],
    use: {
    trace: 'on-first-retry',
    video: 'on-first-retry',
    screenshot: 'on',
  },
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