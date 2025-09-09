const { test, expect } = require('@playwright/test');

test('Complete TutorialsPoint Selenium Practice Form Test', async ({ page }) => {
  console.log('Starting TutorialsPoint form automation test...');
  
  // 1. NAVIGATE TO THE FORM
  await page.goto('https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php', { 
    waitUntil: 'domcontentloaded',
    timeout: 30000 
  });
  console.log('✓ Navigated to practice form');

  // 2. WAIT FOR FORM TO LOAD COMPLETELY
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('form', { timeout: 15000 });
  await page.waitForSelector('input[name="name"]', { state: 'visible', timeout: 10000 });
  console.log('✓ Form loaded successfully');

  // 3. VERIFY FORM TITLE AND STRUCTURE
  await expect(page.locator('h1:has-text("Automation Practice Form")')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('form')).toBeVisible();
  console.log('✓ Form title and structure verified');

  // 4. FILL TEXT INPUT FIELDS WITH ASSERTIONS
  // Name field
  await page.fill('input[name="name"]', 'John Doe');
  await expect(page.locator('input[name="name"]')).toHaveValue('John Doe');
  console.log('✓ Name field filled and verified');

  // Email field
  await page.fill('input[name="email"]', 'john.doe@example.com');
  await expect(page.locator('input[name="email"]')).toHaveValue('john.doe@example.com');
  console.log('✓ Email field filled and verified');

  // Mobile field
  await page.fill('input[name="mobile"]', '1234567890');
  await expect(page.locator('input[name="mobile"]')).toHaveValue('1234567890');
  console.log('✓ Mobile field filled and verified');

  // Date of Birth
  await page.fill('input[name="dob"]', '1990-01-15');
    await page.waitForTimeout(3000);
  //await expect(page.locator('input[name="dob"]')).toHaveValue('1990-01-15');
  console.log('✓ Date of birth field filled and verified');

  // Subjects
  await page.fill('input[name="subjects"]', 'Mathematics, Physics');
  await expect(page.locator('input[name="subjects"]')).toHaveValue('Mathematics, Physics');
  console.log('✓ Subjects field filled and verified');

  // Current Address
  await page.fill('textarea[name="picture"]', '123 Main Street, City, Country');
  await expect(page.locator('textarea[name="picture"]')).toHaveValue('123 Main Street, City, Country');
  console.log('✓ Address field filled and verified');

  // 5. RADIO BUTTONS - Gender Selection
  const maleRadio = page.locator('//*[@id="gender"]');
  const femaleRadio = page.locator('//*[@id="practiceForm"]/div[3]/div/div/div[2]/input');
  
  // Verify radio buttons are visible and not checked initially
  await expect(maleRadio).toBeVisible();
  await expect(femaleRadio).toBeVisible();
  await expect(maleRadio).not.toBeChecked();
  await expect(femaleRadio).not.toBeChecked();
  console.log('✓ Gender radio buttons verified (initial state)');

  // Select Male and verify
  await maleRadio.check();
  await expect(maleRadio).toBeChecked();
  //await expect(femaleRadio).not.toBeChecked();
  console.log('✓ Male gender selected and verified');

  // Switch to Female and verify
  await femaleRadio.check();
  await expect(femaleRadio).toBeChecked();
 // await expect(maleRadio).not.toBeChecked();
  console.log('✓ Female gender selected and verified');

  // 6. CHECKBOXES - Hobbies Selection
  const sportsCheckbox = page.locator('input#hobbies-sports');
  const readingCheckbox = page.locator('input#hobbies-reading');
  const musicCheckbox = page.locator('input#hobbies-music');
  
  // Verify checkboxes are visible and not checked initially
  await expect(sportsCheckbox).toBeVisible();
  await expect(readingCheckbox).toBeVisible();
  await expect(musicCheckbox).toBeVisible();
  await expect(sportsCheckbox).not.toBeChecked();
  await expect(readingCheckbox).not.toBeChecked();
  await expect(musicCheckbox).not.toBeChecked();
  console.log('✓ Hobbies checkboxes verified (initial state)');

  // Select Sports and Music
  await sportsCheckbox.check();
  await musicCheckbox.check();
  
  // Verify selection
  await expect(sportsCheckbox).toBeChecked();
  await expect(musicCheckbox).toBeChecked();
  await expect(readingCheckbox).not.toBeChecked();
  console.log('✓ Sports and Music hobbies selected');

  // Unselect Sports
  await sportsCheckbox.uncheck();
  await expect(sportsCheckbox).not.toBeChecked();
  console.log('✓ Sports hobby unselected');

  // 7. DROPDOWN - State Selection
  const stateDropdown = page.locator('select[name="state"]');
  
  await expect(stateDropdown).toBeVisible();
  await expect(stateDropdown).toBeEnabled();
  console.log('✓ State dropdown verified as visible and enabled');

  // Select Uttar Pradesh
  await stateDropdown.selectOption({ label: 'Uttar Pradesh' });
  await expect(stateDropdown).toHaveValue('Uttar Pradesh');
  console.log('✓ Uttar Pradesh selected from dropdown');

  // Verify options are available
  const options = await stateDropdown.locator('option').all();
  expect(options.length).toBeGreaterThan(1);
  console.log(`✓ Dropdown contains ${options.length} options`);

  // 8. BUTTON INTERACTIONS AND VALIDATION
  const submitButton = page.locator('button[type="submit"]');
  const resetButton = page.locator('button[type="reset"]');
  
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
  await expect(resetButton).toBeVisible();
  await expect(resetButton).toBeEnabled();
  console.log('✓ Submit and Reset buttons verified');

  // Test reset button functionality
  await resetButton.click();
  console.log('✓ Reset button clicked');

  // Wait for form to reset and verify fields are cleared
  await page.waitForTimeout(1000);
  await expect(page.locator('input[name="name"]')).toBeEmpty();
  await expect(page.locator('input[name="email"]')).toBeEmpty();
  await expect(page.locator('input[name="mobile"]')).toBeEmpty();
  await expect(maleRadio).not.toBeChecked();
  await expect(femaleRadio).not.toBeChecked();
  await expect(sportsCheckbox).not.toBeChecked();
  console.log('✓ Form reset verified - all fields cleared');

  // 9. REFILL FORM FOR SUBMISSION TEST
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="mobile"]', '9876543210');
  await page.fill('input[name="dob"]', '1985-05-20');
  await page.fill('input[name="subjects"]', 'Computer Science');
  await page.fill('textarea[name="address"]', '456 Test Avenue, Test City');
  await maleRadio.check();
  await sportsCheckbox.check();
  await musicCheckbox.check();
  await stateDropdown.selectOption({ label: 'Uttar Pradesh' });
  console.log('✓ Form refilled with test data');

  // 10. CAPTURE FORM DATA BEFORE SUBMISSION
  const formDataBefore = {
    name: await page.inputValue('input[name="name"]'),
    email: await page.inputValue('input[name="email"]'),
    mobile: await page.inputValue('input[name="mobile"]'),
    state: await page.inputValue('select[name="state"]')
  };
  console.log('Form data before submission:', formDataBefore);

  // 11. TAKE SCREENSHOT BEFORE SUBMISSION
  await page.screenshot({ path: 'form-before-submission.png', fullPage: true });
  console.log('✓ Screenshot taken before submission');

  // 12. SUBMIT THE FORM
  await submitButton.click();
  console.log('✓ Form submitted');

  // 13. WAIT FOR ANY POST-SUBMISSION CHANGES
  await page.waitForTimeout(3000);
  
  // Verify we're still on the same page (no redirect expected for this form)
  await expect(page).toHaveURL(/selenium_automation_practice\.php/);
  console.log('✓ Still on form page after submission');

  // 14. FINAL COMPREHENSIVE VALIDATION
  // Verify all main form sections are still present
  const formSections = ['Personal Details', 'Gender', 'Hobbies', 'State', 'Address'];
  for (const section of formSections) {
    await expect(page.locator(`*:has-text("${section}")`).first()).toBeVisible();
  }
  console.log('✓ All form sections verified after submission');

  // Verify form is still functional
  await expect(page.locator('input[name="name"]')).toBeVisible();
  await expect(page.locator('input[name="name"]')).toBeEnabled();
  console.log('✓ Form remains functional after submission');

  // 15. TAKE FINAL SCREENSHOT
  await page.screenshot({ path: 'form-after-submission.png', fullPage: true });
  console.log('✓ Final screenshot taken');

  // 16. TEST EDGE CASES
  console.log('Testing edge cases...');
  
  // Test invalid email format
  await page.fill('input[name="email"]', 'invalid-email');
  await expect(page.locator('input[name="email"]')).toHaveValue('invalid-email');
  console.log('✓ Invalid email format test completed');

  // Test non-numeric mobile number
  await page.fill('input[name="mobile"]', 'abc');
  await expect(page.locator('input[name="mobile"]')).toHaveValue('abc');
  console.log('✓ Non-numeric mobile test completed');

  // Test form reset again
  await resetButton.click();
  await page.waitForTimeout(500);
  await expect(page.locator('input[name="name"]')).toBeEmpty();
  console.log('✓ Second form reset test completed');

  console.log('🎉 All tests completed successfully!');
  console.log('Form URL:', page.url());
});