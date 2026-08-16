import { Page, Locator } from '@playwright/test';

/**
 * BasePage class containing common methods and properties
 * All page classes should extend this class
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Take a screenshot and save to specified path
   */
  async takeScreenshot(path: string) {
    await this.page.screenshot({ path, fullPage: true });
    console.log(`✓ Screenshot captured: ${path}`);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string | null> {
    return await this.page.title();
  }

  /**
   * Get page URL
   */
  getPageUrl(): string {
    return this.page.url();
  }

  /**
   * Get full page text content
   */
  async getPageContent(): Promise<string | null> {
    return await this.page.locator('body').textContent();
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for a specific timeout
   */
  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}
