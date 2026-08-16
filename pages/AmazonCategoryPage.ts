import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ResultsComponent } from './ResultsComponent';

/**
 * Amazon Category Page Object Model
 * Contains all locators and methods for category page interactions
 */
export class AmazonCategoryPage extends BasePage {
  // Locators
  readonly pageHeading: Locator;
  readonly resultsComponent: ResultsComponent;

  constructor(page: Page) {
    super(page);
    // Initialize locators
    this.pageHeading = page.getByRole('heading').first();
    this.resultsComponent = new ResultsComponent(page);
  }

  /**
   * Verify the category page loaded correctly
   */
  async verifyCategoryPageLoaded() {
    // Verify page heading is visible
    await expect(this.pageHeading).toBeVisible();
    console.log('✓ Category page heading is visible');

    await expect(this.page).toHaveURL(/electronics/i);
    console.log('✓ Verified we are on the electronics category page');
  }

  /**
   * Get count of products displayed
   */
  async getProductCount(): Promise<number> {
    return await this.resultsComponent.getResultCount();
  }
}
