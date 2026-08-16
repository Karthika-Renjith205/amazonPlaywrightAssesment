import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ResultsComponent } from './ResultsComponent';

/**
 * Amazon Search Results Page Object Model
 * Contains all locators and methods for search results page interactions
 */
export class AmazonSearchPage extends BasePage {
  // Locators
  readonly searchBox: Locator;
  readonly resultHeading: Locator;
  readonly resultsComponent: ResultsComponent;

  constructor(page: Page) {
    super(page);
    // Initialize locators
    this.searchBox = page.getByRole('searchbox', { name: /search amazon/i });
    this.resultHeading = page.getByText(/results for/i);
    this.resultsComponent = new ResultsComponent(page);
  }

  /**
   * Verify search results page displays correctly
   */
  async verifySearchResultsPageDisplays(searchTerm: string) {
    // Verify we're on the search results page for this specific search term (k=<term> query param)
    await expect(this.page).toHaveURL(new RegExp(`[?&]k=${encodeURIComponent(searchTerm)}`, 'i'));
    console.log('✓ Verified we are on the search results page');

    // Verify result heading is visible
    await expect(this.resultHeading).toBeVisible({ timeout: 5000 });
    console.log('✓ Search results heading is visible');

    // Verify search term appears in results
    await this.verifySearchTermInResults(searchTerm);

    // Verify results are populated using shared component
    await this.resultsComponent.verifyResultsDisplayed('search results');
  }

  /**
   * Verify search term appears in page content
   */
  async verifySearchTermInResults(searchTerm: string) {
    const pageContent = await this.getPageContent();
    expect(pageContent).toContain(searchTerm);
    console.log(`✓ Verified search term "${searchTerm}" appears in results`);
  }

  /**
   * Verify search box contains search term
   */
  async verifySearchBoxContains(expectedTerm: string) {
    const searchBoxValue = await this.searchBox.inputValue();
    expect(searchBoxValue).toBe(expectedTerm);
    console.log(`✓ Verified search box contains "${expectedTerm}"`);
  }

  /**
   * Get count of search results
   */
  async getSearchResultCount(): Promise<number> {
    return await this.resultsComponent.getResultCount();
  }
}
