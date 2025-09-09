import { test, expect } from '@playwright/test';

test('test123', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  await page.locator('frame').first().contentFrame().getByText('Frame Test Page Frame1').click();
  await page.locator('frame').first().contentFrame().getByRole('textbox').click();
  await page.locator('frame').first().contentFrame().getByRole('textbox').click();
  await page.locator('frame').first().contentFrame().getByRole('textbox').fill('hello world');
  await page.locator('frame').first().contentFrame().locator('body').click();
  await page.locator('frame').nth(1).contentFrame().getByRole('textbox').click();
  await page.locator('frame').nth(1).contentFrame().getByRole('textbox').fill('hello testing');
  await page.locator('frame').nth(2).contentFrame().getByRole('textbox').click();
  await page.locator('frame').nth(2).contentFrame().getByRole('textbox').fill('hello playwright');
  await page.locator('frame').nth(2).contentFrame().getByText('Frame3 iframe inside frame:').click();
  await expect(page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByRole('list', { name: 'How do you plan to use the' })).toBeVisible();

  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByText('Form-filling and web testing').click();
  await page.locator('frame').nth(3).contentFrame().getByRole('textbox').click();
  await page.locator('frame').nth(3).contentFrame().getByRole('textbox').fill('hello india');
  await page.locator('frame').nth(2).contentFrame().getByText('Frame3 iframe inside frame:').click();
  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByText('Hi, I am the UI.Vision IDE').click();
  await expect(page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByRole('button', { name: 'Clear selection' })).toBeVisible();

  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByText('Choose').click();
  await expect(page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByRole('option', { name: 'Yes' })).toBeVisible();

  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByRole('option', { name: 'Well, now I know :-)' }).locator('span').click();
  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().locator('div').filter({ hasText: /^Page 1 of 2$/ }).first().click();
});