import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page.getByLabel('Sorted List:')).toBeVisible();

  await page.getByRole('textbox', { name: 'Enter Name' }).click();
  await page.getByRole('textbox', { name: 'Enter Name' }).fill('john doe');
  await page.getByRole('textbox', { name: 'Enter EMail' }).click();
  await page.getByRole('textbox', { name: 'Enter EMail' }).fill('john@deo.com');
  await page.locator('.fauxborder-left.main-fauxborder-left').click();
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.getByRole('textbox', { name: 'Enter Phone' }).click();
  await page.getByRole('textbox', { name: 'Enter Phone' }).fill('89765432');
  await page.getByRole('textbox', { name: 'Address:' }).click();
  await page.getByRole('textbox', { name: 'Address:' }).fill('Bangalore');
  await page.getByRole('textbox', { name: 'Enter Phone' }).click();
  await expect(page.getByRole('textbox', { name: 'Address:' })).toHaveValue('Bangalore');
  await page.getByRole('heading', { name: 'Alerts & Popups' }).click();
  await page.getByText('Gender:').click();
  await page.getByText('Address:').click();
  await expect(page.getByText('Address:')).toBeVisible();
  await page.getByRole('heading', { name: 'Alerts & Popups' }).click();
  await page.getByRole('heading', { name: 'Alerts & Popups' }).click();
});