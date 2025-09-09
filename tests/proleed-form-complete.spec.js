const { test, expect } = require('@playwright/test');

test('Complete Proleed Academy Practice Form Test with All Assertions and Waits', async ({ page }) => {
  console.log('🚀 Starting comprehensive Proleed Academy form automation test...');
  
  // 1. NAVIGATION WITH EXPLICIT WAIT
  console.log('📋 Step 1: Navigating to form...');
  await page.goto('https://proleed.academy/exercises/selenium/automation-practice-form-with-radio-button-check-boxes-and-drop-down.php', {
    waitUntil: 'networkidle',
    timeout: 45000
  });
  console.log('✅ Navigation completed');

  // 2. WAIT FOR PAGE TO LOAD COMPLETELY
  console.log('📋 Step 2: Waiting for page to load completely...');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('form', { state: 'visible', timeout: 15000 });
  console.log('✅ Page loaded successfully');

  // 3. ASSERTION: PAGE TITLE AND URL
  console.log('📋 Step 3: Verifying page title and URL...');
  await expect(page).toHaveTitle('Automation Practice Form with Radio Button, Check boxes & Drop-down Menu | Selenium Exercise');
  await expect(page).toHaveURL(/automation-practice-form-with-radio-button-check-boxes-and-drop-down\.php/);
  console.log('✅ Page title and URL verified');

  // 4. ASSERTION: FORM HEADER VISIBILITY
  console.log('📋 Step 4: Verifying form header...');
  //await expect(page.locator('h1:has-text("Automation Practice Form with Radio Button, Check boxes & Drop-down Menu")')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Automation Practice Form with Radio Button, Check boxes & Drop-down Menu');
  console.log('✅ Form header verified');

  // 5. WAIT AND ASSERT: TEXT INPUT FIELDS
  console.log('📋 Step 5: Testing text input fields...');
  
  // Name field
  const nameInput = page.locator('input[name="name"]');
  //await nameInput.waitFor({ state: 'visible', timeout: 10000 });
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeEnabled();
  await expect(nameInput).toBeEditable();
  await expect(nameInput).toHaveAttribute('type', 'text');
  await page.timeout(3000);
  await nameInput.fill('John Doe');
  await expect(nameInput).toHaveValue('John Doe');
  await expect(nameInput).not.toBeEmpty();
  console.log('✅ Name field tested');

  // Email field
  const emailInput = page.locator('input[name="email"]');
  await emailInput.waitFor({ state: 'attached' });
  await expect(emailInput).toHaveAttribute('type', 'email');
  await emailInput.fill('john.doe@example.com');
  await expect(emailInput).toHaveValue('john.doe@example.com');
  console.log('✅ Email field tested');

  // Phone field
  const phoneInput = page.locator('input[name="phone"]');
  await phoneInput.waitFor({ state: 'visible' });
  await expect(phoneInput).toHaveAttribute('type', 'tel');
  await phoneInput.fill('123-456-7890');
  await expect(phoneInput).toHaveValue('123-456-7890');
  console.log('✅ Phone field tested');

  // 6. WAIT AND ASSERT: TEXTAREA FIELD
  console.log('📋 Step 6: Testing textarea field...');
  const addressTextarea = page.locator('textarea[name="address"]');
  await addressTextarea.waitFor({ state: 'visible' });
  await expect(addressTextarea).toBeVisible();
  await addressTextarea.fill('123 Main Street, City, State, 12345');
  await expect(addressTextarea).toHaveValue('123 Main Street, City, State, 12345');
  console.log('✅ Address textarea tested');

  // 7. EXPLICIT WAIT AND ASSERT: RADIO BUTTONS
  console.log('📋 Step 7: Testing radio buttons...');
  const maleRadio = page.locator('input#male');
  const femaleRadio = page.locator('input#female');
  
  // Wait for radio buttons to be present
  await maleRadio.waitFor({ state: 'attached' });
  await femaleRadio.waitFor({ state: 'attached' });
  
  // Assert initial state
  await expect(maleRadio).not.toBeChecked();
  await expect(femaleRadio).not.toBeChecked();
  await expect(maleRadio).toHaveAttribute('type', 'radio');
  await expect(femaleRadio).toHaveAttribute('type', 'radio');
  
  // Test male radio
  await maleRadio.check();
  await expect(maleRadio).toBeChecked();
  await expect(femaleRadio).not.toBeChecked();
  
  // Test female radio
  await femaleRadio.check();
  await expect(femaleRadio).toBeChecked();
  await expect(maleRadio).not.toBeChecked();
  console.log('✅ Radio buttons tested');

  // 8. WAIT AND ASSERT: CHECKBOXES
  console.log('📋 Step 8: Testing checkboxes...');
  const readingCheckbox = page.locator('input#reading');
  const sportsCheckbox = page.locator('input#sports');
  const musicCheckbox = page.locator('input#music');
  
  // Wait for checkboxes
  await readingCheckbox.waitFor({ state: 'visible' });
  await sportsCheckbox.waitFor({ state: 'visible' });
  await musicCheckbox.waitFor({ state: 'visible' });
  
  // Assert initial state
  await expect(readingCheckbox).not.toBeChecked();
  await expect(sportsCheckbox).not.toBeChecked();
  await expect(musicCheckbox).not.toBeChecked();
  
  // Test reading checkbox
  await readingCheckbox.check();
  await expect(readingCheckbox).toBeChecked();
  
  // Test sports checkbox
  await sportsCheckbox.check();
  await expect(sportsCheckbox).toBeChecked();
  
  // Test music checkbox
  await musicCheckbox.check();
  await expect(musicCheckbox).toBeChecked();
  
  // Uncheck one checkbox
  await sportsCheckbox.uncheck();
  await expect(sportsCheckbox).not.toBeChecked();
  await expect(readingCheckbox).toBeChecked(); // Should remain checked
  await expect(musicCheckbox).toBeChecked();   // Should remain checked
  console.log('✅ Checkboxes tested');

  // 9. WAIT AND ASSERT: DROPDOWN/SELECT
  console.log('📋 Step 9: Testing dropdown...');
  const countryDropdown = page.locator('select[name="country"]');
  
  await countryDropdown.waitFor({ state: 'visible' });
  await expect(countryDropdown).toBeVisible();
  await expect(countryDropdown).toBeEnabled();
  
  // Assert dropdown has options
  const options = await countryDropdown.locator('option').all();
  await expect(options.length).toBeGreaterThan(1);
  
  // Select by value
  await countryDropdown.selectOption({ value: 'usa' });
  await expect(countryDropdown).toHaveValue('usa');
  
  // Select by label
  await countryDropdown.selectOption({ label: 'Canada' });
  await expect(countryDropdown).toHaveValue('canada');
  
  // Select by index
  await countryDropdown.selectOption({ index: 3 }); // Assuming 3rd option exists
  console.log('✅ Dropdown tested');

  // 10. WAIT AND ASSERT: BUTTONS
  console.log('📋 Step 10: Testing buttons...');
  const submitButton = page.locator('button[type="submit"]');
  const resetButton = page.locator('button[type="reset"]');
  
  await submitButton.waitFor({ state: 'visible' });
  await resetButton.waitFor({ state: 'visible' });
  
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
  await expect(submitButton).toHaveText('Submit');
  
  await expect(resetButton).toBeVisible();
  await expect(resetButton).toBeEnabled();
  await expect(resetButton).toHaveText('Reset');
  console.log('✅ Buttons verified');

  // 11. EXPLICIT WAIT: CUSTOM CONDITION
  console.log('📋 Step 11: Testing custom wait conditions...');
  
  // Wait for all form elements to be ready
  await page.waitForFunction(() => {
    const inputs = document.querySelectorAll('input, select, textarea, button');
    return inputs.length >= 10; // Wait for minimum number of elements
  }, { timeout: 10000 });
  console.log('✅ Custom wait condition passed');

  // 12. WAIT FOR FUNCTION: FORM VALIDATION STATE
  console.log('📋 Step 12: Testing form validation state...');
  
  // Wait until form has some values filled
  await page.waitForFunction(() => {
    const filledInputs = Array.from(document.querySelectorAll('input, textarea'))
      .filter(input => input.value.length > 0);
    return filledInputs.length >= 3;
  }, { timeout: 5000 });
  console.log('✅ Form validation state confirmed');

  // 13. SCREENSHOT: BEFORE SUBMISSION
  console.log('📋 Step 13: Taking screenshot before submission...');
  await page.screenshot({ 
    path: 'form-filled-before-submission.png', 
    fullPage: true,
    animations: 'disabled'
  });
  console.log('✅ Screenshot taken');

  // 14. ASSERTION: FORM DATA INTEGRITY BEFORE SUBMISSION
  console.log('📋 Step 14: Verifying form data integrity...');
  await expect(nameInput).toHaveValue('John Doe');
  await expect(emailInput).toHaveValue('john.doe@example.com');
  await expect(phoneInput).toHaveValue('123-456-7890');
  await expect(addressTextarea).toHaveValue('123 Main Street, City, State, 12345');
  await expect(femaleRadio).toBeChecked();
  await expect(readingCheckbox).toBeChecked();
  await expect(sportsCheckbox).not.toBeChecked();
  await expect(musicCheckbox).toBeChecked();
  console.log('✅ Form data integrity verified');

  // 15. TEST RESET BUTTON FUNCTIONALITY
  console.log('📋 Step 15: Testing reset button...');
  await resetButton.click();
  
  // Wait for form to reset
  await page.waitForTimeout(1000);
  
  // Verify all fields are cleared
  await expect(nameInput).toBeEmpty();
  await expect(emailInput).toBeEmpty();
  await expect(phoneInput).toBeEmpty();
  await expect(addressTextarea).toBeEmpty();
  await expect(maleRadio).not.toBeChecked();
  await expect(femaleRadio).not.toBeChecked();
  await expect(readingCheckbox).not.toBeChecked();
  await expect(sportsCheckbox).not.toBeChecked();
  await expect(musicCheckbox).not.toBeChecked();
  console.log('✅ Reset functionality tested');

  // 16. REFILL FORM FOR FINAL SUBMISSION TEST
  console.log('📋 Step 16: Refilling form for submission test...');
  await nameInput.fill('Jane Smith');
  await emailInput.fill('jane.smith@example.com');
  await phoneInput.fill('987-654-3210');
  await addressTextarea.fill('456 Oak Avenue, Town, Province, 67890');
  await femaleRadio.check();
  await readingCheckbox.check();
  await musicCheckbox.check();
  await countryDropdown.selectOption({ value: 'usa' });
  console.log('✅ Form refilled');

  // 17. WAIT FOR NETWORK IDLE BEFORE SUBMISSION
  console.log('📋 Step 17: Waiting for network idle...');
  await page.waitForLoadState('networkidle');
  
  // 18. SUBMIT THE FORM
  console.log('📋 Step 18: Submitting form...');
  await submitButton.click();
  
  // 19. WAIT FOR POST-SUBMISSION STATE
  console.log('📋 Step 19: Waiting for post-submission...');
  await page.waitForTimeout(3000);
  
  // 20. ASSERTION: VERIFY STILL ON FORM PAGE (NO REDIRECT)
  await expect(page).toHaveURL(/automation-practice-form-with-radio-button-check-boxes-and-drop-down\.php/);
  console.log('✅ Form submission handled (no redirect expected)');

  // 21. FINAL COMPREHENSIVE ASSERTIONS
  console.log('📋 Step 20: Final comprehensive assertions...');
  
  // Verify form is still accessible
  await expect(page.locator('form')).toBeVisible();
  await expect(nameInput).toBeVisible();
  await expect(submitButton).toBeEnabled();
  
  // Verify some values persist (browser behavior dependent)
  await expect(nameInput).toHaveValue('Jane Smith');
  console.log('✅ Final assertions completed');

  // 22. SCREENSHOT: AFTER SUBMISSION
  console.log('📋 Step 21: Taking final screenshot...');
  await page.screenshot({ 
    path: 'form-after-submission.png', 
    fullPage: true,
    animations: 'disabled'
  });
  console.log('✅ Final screenshot taken');

  // 23. TEST EDGE CASES WITH VARIOUS WAIT STRATEGIES
  console.log('📋 Step 22: Testing edge cases...');
  
  // Test with waitForTimeout (use sparingly)
  await page.waitForTimeout(1000);
  
  // Test invalid email format
  await emailInput.fill('invalid-email');
  await expect(emailInput).toHaveValue('invalid-email');
  
  // Wait for element state change
  await emailInput.waitFor({ state: 'visible' });
  
  // Test empty submission
  await resetButton.click();
  await page.waitForTimeout(500);
  await submitButton.click();
  await page.waitForTimeout(1000);
  
  // Verify still on page
  await expect(page).toHaveURL(/automation-practice-form-with-radio-button-check-boxes-and-drop-down\.php/);
  console.log('✅ Edge cases tested');

  // 24. WAIT FOR ALL ASYNC OPERATIONS TO COMPLETE
  console.log('📋 Step 23: Final wait for all operations...');
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
  
  console.log('🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
  console.log('📊 Summary:');
  console.log('   - 23 test steps executed');
  console.log('   - Multiple assertion types used');
  console.log('   - Various wait strategies implemented');
  console.log('   - 2 screenshots captured');
  console.log('   - Form URL: ', page.url());
});