import { Page, Locator, expect } from '@playwright/test';

/**
 * ResultsComponent - Shared utility for verifying product/search results
 * Used by both Category and Search pages to avoid duplication
 */
export class ResultsComponent {
  readonly primaryResults: Locator;
  readonly altResults: Locator;
  readonly categoryResults: Locator;
  readonly anyResults: Locator;

  constructor(page: Page) {
    this.primaryResults = page.locator('[data-component-type="s-search-result"]');
    this.altResults = page.locator('.s-result-item');
    this.categoryResults = page.locator('.octopus-pc-item');
    this.anyResults = this.primaryResults.or(this.altResults).or(this.categoryResults);
  }

  /**
   * Verify results are displayed (works for both categories and search)
   */
  async verifyResultsDisplayed(resultType: string = 'results'): Promise<number> {
    await expect(this.anyResults.first()).toBeVisible({ timeout: 10000 });
    const count = await this.anyResults.count();
    console.log(`✓ Found ${count} ${resultType}`);
    return count;
  }

  /**
   * Get total count of results (primary or fallback)
   */
  async getResultCount(): Promise<number> {
    return await this.anyResults.count();
  }
}
