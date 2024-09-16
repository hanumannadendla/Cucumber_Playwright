import { Dialog, Locator, Page, Response } from '@playwright/test';
import {
  CheckOptions,
  ClearOptions,
  ClickOptions,
  DoubleClickOptions,
  DragOptions,
  FillOptions,
  GotoOptions,
  HoverOptions,
  NavigationOptions,
  SelectOptions,
  TimeoutOption,
  TypeOptions,
  UploadOptions,
  UploadValues,
  WaitForLoadStateOptions,
} from '../setup/OptionalParameters';
import { STANDARD_TIMEOUT } from '../TestData/Timeouts';
import { Locatorsutil } from './LocatorsUtil';
import { PageLoadState } from '../TestData/PageLoadState';
import { Roles } from '../TestData/Roles';

export class Webactions {
  page: Page;
  locatorUtil: Locatorsutil;
  constructor(page: Page) {
    this.page = page;
    this.locatorUtil = new Locatorsutil(page);
  }
  /**
   * Navigates to the specified URL.
   * @param {string} path - The URL to navigate to.
   * @param {GotoOptions} options - The navigation options.
   * @returns {Promise<null | Response>} - The navigation response or null if no response.
   */
  async gotoURL(path: string, options: GotoOptions = { waitUntil: PageLoadState.LOAD }): Promise<null | Response> {
    return await this.page.goto(path, options);
  }

  /**
   * Waits for a specific page load state.
   * @param {NavigationOptions} options - The navigation options.
   */
  async waitForPageLoadState(options?: NavigationOptions): Promise<void> {
    let waitUntil: WaitForLoadStateOptions = PageLoadState.LOAD;

    if (options?.waitUntil && options.waitUntil !== PageLoadState.COMMIT) {
      waitUntil = options.waitUntil;
    }

    await this.page.waitForLoadState(waitUntil);
  }

  /**
   * Reloads the current page.
   * @param {NavigationOptions} options - The navigation options.
   */
  async reloadPage(options?: NavigationOptions): Promise<void> {
    await Promise.all([this.page.reload(options), this.page.waitForEvent('framenavigated')]);
    await this.waitForPageLoadState(options);
  }

  /**
   * Navigates back to the previous page.
   * @param {NavigationOptions} options - The navigation options.
   */
  async goBack(options?: NavigationOptions): Promise<void> {
    await Promise.all([this.page.goBack(options), this.page.waitForEvent('framenavigated')]);
    await this.waitForPageLoadState(options);
  }

  /**
   * Waits for a specified amount of time.
   * @param {number} ms - The amount of time to wait in milliseconds.
   */
  async wait(ms: number): Promise<void> {
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(ms);
  }
  /**
   * generate random number.
   * @param {number} mx - The amount of time to wait in milliseconds.
   */
  async generateRandomNumber(mx: number,mn:number): Promise<number>{
    // eslint-disable-next-line playwright/no-wait-for-timeout
    return Math.floor(Math.random()*(mx-mn)+mn);
  }



  /**
   * Clicks on a specified element.
   * @param {string | Locator} input - The element to click on.
   * @param {ClickOptions} options - The click options.
   */
  async click(input: string | Locator, options?: ClickOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.click(options);
  }

  /**
   * Clicks on a specified element and waits for navigation.
   * @param {string | Locator} input - The element to click on.
   * @param {ClickOptions} options - The click options.
   */
  async clickAndNavigate(input: string | Locator, options?: ClickOptions): Promise<void> {
    const timeout = options?.timeout || STANDARD_TIMEOUT;
    await Promise.all([this.click(input, options), this.page.waitForEvent('framenavigated', { timeout: timeout })]);
    await this.page.waitForLoadState(options?.loadState || 'load', {
      timeout: timeout,
    });
  }

  /**
   * Get Record ID from URL
   */
  async getRecordIDFromURL(): Promise<string> {
    let url = await this.page.url();
    let spliturl = url.split('/');
    let isrecordid = spliturl.includes("r");
    let accountId = "";
    if(isrecordid){
      accountId = spliturl[spliturl.length-2];
    }
    return accountId;
  }

  /**
   * Fills a specified element with a value.
   * @param {string | Locator} input - The element to fill.
   * @param {string} value - The value to fill the element with.
   * @param {FillOptions} options - The fill options.
   */
  async fill(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.fill(value, options);
  }

  /**
   * Fills a specified element with a value and press Enter.
   * @param {string | Locator} input - The element to fill.
   * @param {string} value - The value to fill the element with.
   * @param {FillOptions} options - The fill options.
   */
  async fillAndEnter(input: string | Locator, value: string, options?: FillOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.fill(value, options);
    await locator.press('Enter');
  }

  /**
   * Types a value into a specified element.
   * @param {string | Locator} input - The element to type into.
   * @param {string} value - The value to type.
   * @param {TypeOptions} options - The type options.
   */
  async type(input: string | Locator, value: string, options?: TypeOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.type(value, options);
  }

  /**
   * Clears the value of a specified element.
   * @param {string | Locator} input - The element to clear.
   * @param {ClearOptions} options - The clear options.
   */
  async clear(input: string | Locator, options?: ClearOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.clear(options);
  }

  /**
   * Checks a specified checkbox or radio button.
   * @param {string | Locator} input - The checkbox or radio button to check.
   * @param {CheckOptions} options - The check options.
   */
  async check(input: string | Locator, options?: CheckOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.check(options);
  }

  /**
   * Unchecks a specified checkbox or radio button.
   * @param {string | Locator} input - The checkbox or radio button to uncheck.
   * @param {CheckOptions} options - The uncheck options.
   */
  async uncheck(input: string | Locator, options?: CheckOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.uncheck(options);
  }

  /**
   * Selects an option in a dropdown by its value.
   * @param {string | Locator} input - The dropdown to select an option in.
   * @param {string} value - The value of the option to select.
   * @param {SelectOptions} options - The select options.
   */
  async selectByValue(input: string | Locator, value: string, options?: SelectOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.selectOption({ value: value }, options);
  }

  /**
   * Selects options in a dropdown by their values (multi select).
   * @param {string | Locator} input - The dropdown to select options in.
   * @param {Array<string>} value - The values of the options to select.
   * @param {SelectOptions} options - The select options.
   */
  async selectByValues(
    input: string | Locator,
    value: Array<string>,
    options?: SelectOptions,
  ): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.selectOption(value, options);
  }

  /**
   * Selects an option in a dropdown by its text.
   * @param {string | Locator} input - The dropdown to select an option in.
   * @param {string} text - The text of the option to select.
   * @param {SelectOptions} options - The select options.
   */
  async selectByText(input: string | Locator, text: string, options?: SelectOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.selectOption({ label: text }, options);
  }

  /**
   * Selects an option in a dropdown by its index.
   * @param {string | Locator} input - The dropdown to select an option in.
   * @param {number} index - The index of the option to select.
   * @param {SelectOptions} options - The select options.
   */
  async selectByIndex(input: string | Locator, index: number, options?: SelectOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.selectOption({ index: index }, options);
  }


  /**
   * Accepts an alert dialog.
   * @param {string | Locator} input - The element to click to trigger the alert.
   * @param {string} promptText - The text to enter into a prompt dialog.
   * @returns {Promise<string>} - The message of the dialog.
   */
  async acceptAlert(input: string | Locator, promptText?: string): Promise<string> {
    const locator = this.locatorUtil.getLocator(input);
    let dialogMessage = '';
    this.page.once('dialog', dialog => {
      dialogMessage = dialog.message();
      dialog.accept(promptText).catch(e => console.error('Error accepting dialog:', e));
    });
    await locator.click();
    // temporary fix to alerts - Need to be fixed
    // await this.page.waitForEvent('dialog');
    return dialogMessage;
  }

  /**
   * Dismisses an alert dialog.
   * @param {string | Locator} input - The element to click to trigger the alert.
   * @returns {Promise<string>} - The message of the dialog.
   */
  async dismissAlert(input: string | Locator): Promise<string> {
    const locator = this.locatorUtil.getLocator(input);
    let dialogMessage = '';
    this.page.once('dialog', dialog => {
      dialogMessage = dialog.message();
      dialog.dismiss().catch(e => console.error('Error dismissing dialog:', e));
    });
    await locator.click({ noWaitAfter: true });
    // temporary fix for alerts - Need to be fixed
    // await this.page.waitForEvent('dialog');
    return dialogMessage;
  }

  /**
   * Gets the text of an alert dialog.
   * @param {string | Locator} input - The element to click to trigger the alert.
   * @returns {Promise<string>} - The message of the dialog.
   */
  async getAlertText(input: string | Locator): Promise<string> {
    const locator = this.locatorUtil.getLocator(input);
    let dialogMessage = '';
    const dialogHandler = (dialog: Dialog) => {
      dialogMessage = dialog.message();
    };
    this.page.once('dialog', dialogHandler);
    await locator.click();
    await this.page.waitForEvent('dialog');
    this.page.off('dialog', dialogHandler);
    return dialogMessage;
  }

  /**
   * Hovers over a specified element.
   * @param {string | Locator} input - The element to hover over.
   * @param {HoverOptions} options - The hover options.
   */
  async hover(input: string | Locator, options?: HoverOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.hover(options);
  }

  /**
   * Focuses on a specified element.
   * @param {string | Locator} input - The element to focus on.
   * @param {TimeoutOption} options - The timeout options.
   */
  async focus(input: string | Locator, options?: TimeoutOption): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.focus(options);
  }

  /**
   * Drags and drops a specified element to a destination.
   * @param {string | Locator} input - The element to drag.
   * @param {string | Locator} dest - The destination to drop the element at.
   * @param {DragOptions} options - The drag options.
   */
  async dragAndDrop(
    input: string | Locator,
    dest: string | Locator,
    options?: DragOptions,
  ): Promise<void> {
    const drag = this.locatorUtil.getLocator(input);
    const drop = this.locatorUtil.getLocator(dest);
    await drag.dragTo(drop, options);
  }

  /**
   * Double clicks on a specified element.
   * @param {string | Locator} input - The element to double click on.
   * @param {DoubleClickOptions} options - The double click options.
   */
  async doubleClick(input: string | Locator, options?: DoubleClickOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.dblclick(options);
  }

  /**
   * Downloads a file from a specified element.
   * @param {string | Locator} input - The element to download the file from.
   * @param {string} path - The path to save the downloaded file to.
   */
  async downloadFile(input: string | Locator, path: string): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    const downloadPromise = this.page.waitForEvent('download');
    await this.click(locator);
    const download = await downloadPromise;
    // Wait for the download process to complete
    console.log(await download.path());
    // Save downloaded file somewhere
    await download.saveAs(path);
  }

  /**
   * Uploads files to a specified element.
   * @param {string | Locator} input - The element to upload files to.
   * @param {UploadValues} path - The files to upload.
   * @param {UploadOptions} options - The upload options.
   */
  async uploadFiles(input: string | Locator, path: UploadValues, options?: UploadOptions): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.setInputFiles(path, options);
  }

  /**
   * Scrolls a specified element into view.
   * @param {string | Locator} input - The element to scroll into view.
   * @param {TimeoutOption} options - The timeout options.
   */
  async scrollLocatorIntoView(input: string | Locator, options?: TimeoutOption): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.scrollIntoViewIfNeeded(options);
  }

  /**
   *  This method will work in salesforce objects only. This method need to updated based on salesforce version upgrades
   * @param label pass the dropdown label name
   * @param option option to select
   */
  async selectDropdownOptionByLabel(label: string, option: string): Promise<void>{
    const label_locator = this.locatorUtil.getLocatorByLabel(label+" - Current Selection:");
    const option_locator = this.locatorUtil.getLocatorByRole(Roles.OPTION, {name: option, exact:true});
    await this.click(label_locator);
    await this.click(option_locator);
  }
   /**
   *  This method designed to handle drowdown based on dropdown locator and option locator
   * @param label pass the dropdown locator
   * @param option option Locator to select
   */
   async selectDropdownOptionByLocator(dropdown: Locator, option: Locator): Promise<void>{
    await this.click(dropdown);
    await this.locatorUtil.getLocator(option).waitFor({state: "visible"});
    await this.click(option);
  }


  /**
   * Clicks on a specified element using JavaScript.
   * @param {string | Locator} input - The element to click on.
   * @param {TimeoutOption} options - The timeout options.
   */
  async clickByJS(input: string | Locator, options?: TimeoutOption): Promise<void> {
    const locator = this.locatorUtil.getLocator(input);
    await locator.evaluate('el => el.click()', options);
  }

   /**
   * Get Text from Element
   * @param {Locator} locator - The element  to get text 
   */
   async getLocatorText(locator: Locator): Promise<string> {
    return await locator.textContent()??'';
  }
}
