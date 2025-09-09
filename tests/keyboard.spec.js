import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/key_presses');
  await expect(page.getByRole('img', { name: 'Fork me on GitHub' })).toBeVisible();

  await page.locator('#target').click();
 // await page.keyboard.press
 await page.locator('#target').press('H');
  await page.waitForTimeout(4000);
  const v1 =  page.locator('#result');
  await expect(v1).toContainText('You entered: H');
//  await page.locator('#target').click();
  //await page.locator('#target').fill('');
  //await expect(page.locator('#result')).toContainText('You entered: BACK_SPACE');
  //await page.locator('#target').click();
});