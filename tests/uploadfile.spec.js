const { test, expect } = require('@playwright/test');

test('Upload manual.txt file and verify submission', async ({ page }) => {
    // Navigate to the upload page
    await page.goto('https://practice.expandtesting.com/upload');
    
    // Upload the specific file
    await page.setInputFiles('#fileUpload', 'C:\\Users\\Christy Henitha\\Documents\\manual.txt');
    
    // Submit the form
    await page.click('#uploadButton');
    
    // Wait for success message and verify it's visible
    await expect(page.locator('.alert-success')).toBeVisible();
    console.log('✅ File uploaded successfully!');
    
    // Verify success message text
    const successMessage = await page.locator('.alert-success').textContent();
    expect(successMessage).toContain('successfully');
    
    // Show upload details
    const details = await page.$$eval('p', elements => 
        elements.map(el => el.textContent.trim())
    );
    
    details.forEach(detail => console.log(detail));
    
    // Additional assertions
    await expect(page.locator('p:has-text("File Name:")')).toBeVisible();
    await expect(page.locator('p:has-text("File Size:")')).toBeVisible();
    await expect(page.locator('p:has-text("File Type:")')).toBeVisible();
    
    // Verify the file name contains manual.txt
    const fileName = await page.locator('p:has-text("File Name:")').textContent();
    expect(fileName).toContain('manual.txt');
});