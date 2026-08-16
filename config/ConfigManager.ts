import * as fs from 'fs';
import * as path from 'path';

/**
 * Configuration manager to read and provide access to configuration values
 */
class ConfigManager {
  private config: any;

  constructor() {
    const configPath = path.join(__dirname, '..', 'config.json');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    this.config = JSON.parse(configContent);
  }

  /**
   * Get base URL for Amazon
   */
  getAmazonBaseUrl(): string {
    return this.config.baseUrls.amazonHome;
  }

  /**
   * Get base URL for the Petstore API
   */
  getPetstoreApiBaseUrl(): string {
    return this.config.baseUrls.petstoreApi;
  }

  /**
   * Get timeout value by key
   */
  getTimeout(key: string): number {
    return this.config.timeouts[key] || 5000;
  }

  /**
   * Get screenshot output directory
   */
  getScreenshotDir(): string {
    return this.config.screenshots.outputDir;
  }

  /**
   * Get specific screenshot filename
   */
  getScreenshotPath(screenshotKey: string): string {
    const dir = this.getScreenshotDir();
    const filename = this.config.screenshots[screenshotKey];
    return `${dir}/${filename}`;
  }

  /**
   * Get entire config object
   */
  getConfig(): any {
    return this.config;
  }
}

// Export singleton instance
export const config = new ConfigManager();
