import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  await page.locator('frame').first().contentFrame().getByRole('textbox').click();
  await page.locator('frame').first().contentFrame().getByRole('textbox').fill('alexa');
  await page.locator('frame').first().contentFrame().locator('html').click();
  await page.locator('frame').nth(1).contentFrame().getByRole('textbox').click();
  await page.locator('frame').nth(1).contentFrame().getByRole('textbox').fill('basix');
  await page.locator('frame').nth(1).contentFrame().locator('body').click();
  await page.locator('frame').nth(2).contentFrame().getByRole('textbox').click();
  await page.locator('frame').nth(2).contentFrame().getByRole('textbox').fill('hello');
  await page.locator('frame').nth(3).contentFrame().getByRole('textbox').click();
  await page.locator('frame').nth(3).contentFrame().getByRole('textbox').fill('testing');
  await page.locator('frame').nth(2).contentFrame().getByText('iframe inside frame: Loading').click();
  await expect(page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().getByRole('list', { name: 'How do you plan to use the' })).toBeVisible();

  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().locator('form div').filter({ hasText: 'Form Filling Demo PageForm-' }).nth(3).click();
  await page.locator('frame').nth(2).contentFrame().locator('html').click();
  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().locator('form div').filter({ hasText: 'Form Filling Demo PageForm-' }).nth(3).click();
  await page.locator('frame').nth(2).contentFrame().getByText('Loading...').contentFrame().locator('div').filter({ hasText: /^Hi, I am the UI\.Vision IDE$/ }).first().click();
  await page.locator('frame').first().contentFrame().getByRole('textbox').click();
  await page.locator('frame').first().contentFrame().getByRole('textbox').fill('hello');
  await page.locator('frame').first().contentFrame().locator('body').click();
  await expect(page.locator('frame').first().contentFrame().getByRole('textbox')).toHaveValue('hello');
  await expect(page.locator('frame').first().contentFrame().getByRole('textbox')).toHaveValue('hello');
  await expect(page.locator('frame').nth(1).contentFrame().getByRole('textbox')).toBeEmpty();
  await page.locator('frame').nth(1).contentFrame().getByRole('textbox').click();
  await page.locator('frame').nth(1).contentFrame().getByRole('textbox').fill('TESTING');
  await page.locator('frame').nth(1).contentFrame().locator('body').click();
  await expect(page.locator('frame').nth(1).contentFrame().getByRole('textbox')).toHaveValue('TESTING');
});
