import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Amazon Home Page Object Model
 * Contains all locators and methods for home page interactions
 */
export class AmazonHomePage extends BasePage {
  // Locators
  readonly amazonLogo: Locator;
  readonly searchBox: Locator;
  readonly signInLink: Locator;
  readonly cartLink: Locator;
  readonly navButton: Locator;
  readonly searchbutton: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators using getByRole for accessibility
    this.amazonLogo = page.getByRole('link', { name: 'Amazon.com.au' });
    this.searchBox = page.getByRole('searchbox', { name: /search amazon/i });
    this.signInLink = page.locator('#nav-link-accountList');
    this.cartLink = page.getByRole('link', { name: /shopping basket/i });
    this.navButton = page.getByRole('button', { name: 'Open All Categories Menu' });
    this.searchbutton = page.locator('#nav-search-submit-button');
  }

  /**
   * Navigate to Amazon home page
   */
  async navigateToHome(homeUrl: string) {
    await this.navigateTo(homeUrl);
  }

  /**
   * Verify all key navigation elements are present
   */
  async verifyKeyNavigationElements() {
    // Verify Amazon logo
    await expect(this.amazonLogo).toBeVisible();
    console.log('✓ Amazon logo is visible');

    // Verify search box
    await expect(this.searchBox).toBeVisible();
    console.log('✓ Search box is visible');

    // Verify sign in link
    await expect(this.signInLink).toBeVisible({ timeout: 5000 });
    console.log('✓ Sign in link is visible');

    // Verify cart link
    await expect(this.cartLink).toBeVisible();
    console.log('✓ Cart link is visible');

    // Verify navigation menu button
    await expect(this.navButton).toBeVisible({ timeout: 5000 });
    console.log('✓ Navigation menu button is visible');

    // Verify page title
    await expect(this.page).toHaveTitle(/Amazon/);
    console.log('✓ Page title contains "Amazon"');
  }

  /**
   * Open the navigation menu
   */
  async openNavigationMenu() {
    // Wait for the nav JS to hydrate so the hamburger button's click handler is attached
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.navButton).toBeVisible();
    await this.navButton.click();
    console.log('✓ Navigation menu button clicked');
  }

  /**
   * Search for a product
   */
  async searchProduct(searchTerm: string) {
    await this.searchBox.fill(searchTerm);
    await this.searchbutton.click();
    await this.waitForPageLoad();
    console.log(`✓ Searched for "${searchTerm}"`);
  }

  /**
   * Navigate to a category
   */
  async navigateToCategory(categoryName: string) {
  const categoryLink = this.page.getByRole('link', {
    name: categoryName,
    exact: true
  });

  await expect(categoryLink).toBeVisible();
  await categoryLink.click();
    await this.waitForPageLoad();
    console.log(`✓ Navigated to ${categoryName} category`);
  }
}
