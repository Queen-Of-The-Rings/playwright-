const { test, expect } = require('@playwright/test');

test('Drag and Drop test for Guru99', async ({ page }) => {
  await page.goto('https://demo.guru99.com/test/drag_drop.html');
  
  // Define the source and target elements
  const bankSource = page.locator('#credit2 a');
  const debitAccountTarget = page.locator('#bank li');
  
  const salesSource = page.locator('#credit1 a'); 
  const creditAccountTarget = page.locator('#loan li');
  
  const amount5000Source = page.locator('#fourth a').nth(0);
  const debitAmountTarget = page.locator('#amt7 li');
  
  const amount5000Source2 = page.locator('#fourth a').nth(1);
  const creditAmountTarget = page.locator('#amt8 li');
  
  // Perform drag and drop operations
  await bankSource.dragTo(debitAccountTarget);
  await salesSource.dragTo(creditAccountTarget);
  await amount5000Source.dragTo(debitAmountTarget);
  await amount5000Source2.dragTo(creditAmountTarget);
  
  
  console.log('✅ Drag and drop completed successfully!');
});