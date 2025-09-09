import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php');
  await expect(page.getByRole('heading', { name: 'Widgets' })).toBeVisible();

  await page.getByRole('heading', { name: 'Selenium - Automation' }).click();
  await page.getByRole('heading', { name: 'Selenium - Automation' }).click();
  await expect(page.getByRole('banner')).toContainText('Selenium - Automation Practice Form');
});