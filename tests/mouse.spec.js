import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.guru99.com/test/newtours/');
  await expect(page.getByRole('row', { name: 'Mercury Tours Home Flights Hotels Car Rentals Cruises Destinations Vacations Use Java Version SIGN-ON REGISTER SUPPORT CONTACT Featured Destination: Aruba Specials Atlanta to Las Vegas $398 Boston to San Francisco $513 Los Angeles to Chicago $168 New York to Chicago $198 Phoenix to San Francisco $213 Tour Tips Tip#93 Always carry a travel first aid kit with bandages, antacids, aspirin, bee sting wipes, and other basic necessities.         Jul 6, 2017 Find a Flight Registered users can sign-in here to find the lowest fare on participating airlines. User Name: Password:   Submit Desinations Find detailed information about your destination. vacations Read about our featured vacation destinations. Register Register here to join Mercury Tours! Links Business Travel @ About.com Salon Travel   © 2005, Mercury Interactive (v. 011003-1.01-058)', exact: true })).toBeVisible();

  await page.getByRole('row', { name: 'Home', exact: true }).getByRole('cell').first().click();
  await page.getByRole('cell', { name: 'SIGN-ON REGISTER SUPPORT CONTACT', exact: true }).click({
    button: 'right'
  });
  await page.getByRole('cell', { name: 'SIGN-ON REGISTER SUPPORT CONTACT', exact: true }).click();
  await expect(page.getByRole('row', { name: 'Mercury Tours Home Flights Hotels Car Rentals Cruises Destinations Vacations Use Java Version SIGN-ON REGISTER SUPPORT CONTACT Welcome back to Mercury Tours! Enter your user information to access the member-only areas of this site. If you don\'t have a log-in, please fill out the registration form. User Name: Password:    Submit   © 2005, Mercury Interactive (v. 011003-1.01-058)', exact: true })).toBeVisible();

  await page.getByRole('row', { name: 'User Name:', exact: true }).getByRole('cell').nth(1).click();
  await page.locator('input[name="userName"]').click();
  await page.locator('input[name="userName"]').fill('testing');
  await page.locator('input[name="userName"]').dblclick();

  await page.mouse.move(100, 100);
await page.mouse.down();
await page.mouse.move(200, 100);
await page.mouse.move(200, 200);
await page.mouse.move(100, 200);
await page.mouse.move(100, 100);
await page.mouse.up();
// Mouse wheel scrolling
await page.mouse.wheel(0, 500);
  await page.locator('div').filter({ hasText: 'Home Flights Hotels Car' }).click();
});