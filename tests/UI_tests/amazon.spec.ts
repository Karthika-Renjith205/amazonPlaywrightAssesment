import { test } from '@playwright/test';
import { AmazonHomePage } from '../../pages/AmazonHomePage';
import { AmazonCategoryPage } from '../../pages/AmazonCategoryPage';
import { AmazonSearchPage } from '../../pages/AmazonSearchPage';
import { config } from '../../config/ConfigManager';

// Test 1: Home Page Verification
test('Home Page Verification - Assert key navigation elements are present', async ({ page }) => {
  // Initialize home page object
  const homePage = new AmazonHomePage(page);
  
  // Navigate to Amazon home page using config
  await homePage.navigateToHome(config.getAmazonBaseUrl());
  
  // Verify all key navigation elements are present
  await homePage.verifyKeyNavigationElements();
  
  // Capture full-page screenshot using config path
  await homePage.takeScreenshot(config.getScreenshotPath('homePageVerification'));
});

// Test 2: Category Navigation
test('Category Navigation - Navigate to sub-category and verify page load', async ({ page }) => {
  // Initialize home page object
  const homePage = new AmazonHomePage(page);
  
  // Navigate to Amazon home page using config
  await homePage.navigateToHome(config.getAmazonBaseUrl());
  
  // Open navigation menu
  await homePage.openNavigationMenu();
  
  // Navigate to Electronics category
  await homePage.navigateToCategory('Electronics');
  
  // Initialize category page object
  const categoryPage = new AmazonCategoryPage(page);
  
  // Verify the category page loaded correctly
  await categoryPage.verifyCategoryPageLoaded();
  
  // Capture screenshot of category page using config path
  await categoryPage.takeScreenshot(config.getScreenshotPath('categoryNavigation'));
});

// Test 3: Search Functionality
test('Search Functionality - Perform product search and verify results', async ({ page }) => {
  // Initialize home page object
  const homePage = new AmazonHomePage(page);
  
  // Navigate to Amazon home page using config
  await homePage.navigateToHome(config.getAmazonBaseUrl());
  
  const searchTerm = 'laptop';
  
  // Perform product search
  await homePage.searchProduct(searchTerm);
  
  // Initialize search results page object
  const searchPage = new AmazonSearchPage(page);
  
  // Verify search results page displays correctly
  await searchPage.verifySearchResultsPageDisplays(searchTerm);
  
  // Verify search box contains the search term
  await searchPage.verifySearchBoxContains(searchTerm);
  
  // Capture screenshot of search results page using config path
  await searchPage.takeScreenshot(config.getScreenshotPath('searchResults'));
  
  console.log(`✓ Successfully searched for "${searchTerm}" and verified results page`);
});
