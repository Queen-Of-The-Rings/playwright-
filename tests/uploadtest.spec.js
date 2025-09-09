const { chromium } = require('playwright');
const path = require('path');

async function handleFileUploads() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Navigate to file upload demo page
  await page.goto('https://the-internet.herokuapp.com/upload');
  
  // Create a test file to upload
  const filePath = path.join(__dirname, 'test-file.txt');
  const fs = require('fs');
  fs.writeFileSync(filePath, 'This is a test file content for upload demo');
  
  // Upload single file
  const fileInput = await page.$('#file-upload');
  await fileInput.setInputFiles(filePath);
  
  // Submit the form
  await page.click('#file-submit');
  
  // Verify upload success
  await page.waitForSelector('h3:has-text("File Uploaded!")');
  console.log('File uploaded successfully!');
  
  // Clean up test file
  fs.unlinkSync(filePath);
  
  // Example with multiple files
  await page.goto('https://practice.expandtesting.com/upload');
  
  const file1 = path.join(__dirname, 'file1.txt');
  const file2 = path.join(__dirname, 'file2.txt');
  
  fs.writeFileSync(file1, 'First file content');
  fs.writeFileSync(file2, 'Second file content');
  
  await page.setInputFiles('#fileUpload', [file1, file2]);
  await page.click('#uploadButton');
  
  // Clean up
  fs.unlinkSync(file1);
  fs.unlinkSync(file2);
  
  await page.waitForTimeout(2000);
  await browser.close();
}

handleFileUploads();
