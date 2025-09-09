import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  await expect(page.getByRole('img', { name: 'Fork me on GitHub' })).toBeVisible();

  const a=await page.locator('#column-a');
  const b=await page.locator('#column-b');
  await page.waitForTimeout(3000);
  await a.dragTo(b);
    await page.waitForTimeout(3000);

});