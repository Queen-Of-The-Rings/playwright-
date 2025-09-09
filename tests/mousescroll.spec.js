import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.guru99.com/test/newtours/');
  await expect(page.getByRole('row', { name: 'Mercury Tours Home Flights Hotels Car Rentals Cruises Destinations Vacations Use Java Version SIGN-ON REGISTER SUPPORT CONTACT Featured Destination: Aruba Specials Atlanta to Las Vegas $398 Boston to San Francisco $513 Los Angeles to Chicago $168 New York to Chicago $198 Phoenix to San Francisco $213 Tour Tips Tip#93 Always carry a travel first aid kit with bandages, antacids, aspirin, bee sting wipes, and other basic necessities.         Jul 6, 2017 Find a Flight Registered users can sign-in here to find the lowest fare on participating airlines. User Name: Password:   Submit Desinations Find detailed information about your destination. vacations Read about our featured vacation destinations. Register Register here to join Mercury Tours! Links Business Travel @ About.com Salon Travel   © 2005, Mercury Interactive (v. 011003-1.01-058)', exact: true })).toBeVisible();

  await page.locator('div').filter({ hasText: 'Home Flights Hotels Car' }).click();
  await page.waitForTimeout(4000);
 await page.mouse.wheel(0, 800);
    await page.waitForTimeout(4000);
 await page.mouse.wheel(500, 0);
    await page.waitForTimeout(4000);

  //await page.locator('body').press('ArrowDown');
});