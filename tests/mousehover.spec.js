import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  await expect(page.getByRole('img', { name: 'Fork me on GitHub' })).toBeVisible();

  const a=await page.getByRole('img', { name: 'User Avatar' }).first();
  await a.hover();
  await page.waitForTimeout(9000);
  await expect(page.locator('#content')).toContainText('name: user1');
});