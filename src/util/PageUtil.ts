import { SMALL_TIMEOUT } from "../TestData/Timeouts";
import { Page } from "@playwright/test";

export class PageUtil {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Returns the current Page.
   * @returns {Page} The current Page.
   */
  getPage(): Page {
    return this.page;
  }

  /**
   * Sets the current Page.
   * @param {Page} pageInstance - The Page instance to set as the current Page.
   */
  setPage(pageInstance: Page): void {
    this.page = pageInstance;
  }

  /**
   * Switches to a different page by its index (1-based).
   * If the desired page isn't immediately available, this function will wait and retry for up to 'SMALL_TIMEOUT' seconds.
   * @param {number} winNum - The index of the page to switch to.
   * @throws {Error} If the desired page isn't found within 'SMALL_TIMEOUT' seconds.
   */
  async switchPage(winNum: number): Promise<void> {
    const startTime = Date.now();
    while (
      this.page.context().pages().length < winNum &&
      Date.now() - startTime < SMALL_TIMEOUT
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (this.page.context().pages().length < winNum) {
      throw new Error(
        `Page number ${winNum} not found after ${SMALL_TIMEOUT} seconds`
      );
    }
    const pageInstance = this.page.context().pages()[winNum - 1];
    await pageInstance.waitForLoadState();
    this.setPage(pageInstance);
  }

  /**
   * Switches back to the default page (the first one).
   */
  async switchToDefaultPage(): Promise<void> {
    const pageInstance = this.page.context().pages()[0];
    if (pageInstance) {
      await pageInstance.bringToFront();
      this.setPage(pageInstance);
    }
  }

  /**
   * Closes a page by its index (1-based).
   * If no index is provided, the current page is closed.
   * If there are other pages open, it will switch back to the default page.
   * @param {number} winNum - The index of the page to close.
   */
  async closePage(winNum: number): Promise<void> {
    if (!winNum) {
      await this.page.close();
      return;
    }
    const noOfWindows = this.page.context().pages().length;
    const pageInstance = this.page.context().pages()[winNum - 1];
    await pageInstance.close();
    if (noOfWindows > 1) {
      await this.switchToDefaultPage();
    }
  }

  /**
   * This will use the same page present in the page object of this class and create new page in same context
   * @returns {Page}
   */
  async createNewPageInSameContext(): Promise<Page> {
    return await this.getPage().context().newPage();
  }

  /**
   * This will use the same page present in the page object of this class and create new page in the incognitive mode
   * @returns { page or undefined }
   */
  async createNewPageIncognitiveContext(): Promise<Page | undefined> {
    return await (
      await this.getPage().context().browser()?.newContext()
    )?.newPage();
  }
}
