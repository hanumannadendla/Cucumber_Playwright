
import { FrameLocator, Locator, Page, selectors } from '@playwright/test';
import {
  GetByPlaceholderOptions,
  GetByRoleOptions,
  GetByRoleTypes,
  GetByTextOptions,
  LocatorOptions,
} from '../setup/OptionalParameters';

export class Locatorsutil  {

  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Returns a Locator object based on the input provided.
   * @param {string | Locator} input - The input to create the Locator from.
   * @param {LocatorOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  getLocator(input: string | Locator, options?: LocatorOptions): Locator {
    return typeof input === 'string' ? this.page.locator(input, options) : input;
  }

  /**
   * Returns a Locator object with a specific testId. The global testId attribute is set in the playwright.config.ts file with default value as 'data-testid' if not set explicitly, but can be overridden by providing an attributeName.
   * @param {string | RegExp} testId - The testId to create the Locator from.
   * @param {string} [attributeName] - Optional attribute name for the testId. If provided, this will override the default 'testId' attribute value set in the playwright.config.ts file only for this instance.
   * @returns {Locator} - The created Locator object.
   */
  getLocatorByTestId(testId: string | RegExp, attributeName?: string): Locator {
    if (attributeName) {
      selectors.setTestIdAttribute(attributeName);
    }
    return this.page.getByTestId(testId);
  }

  /**
   * Returns a Locator object with a specific text.
   * @param {string | RegExp} text - The text to create the Locator from.
   * @param {GetByTextOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  getLocatorByText(text: string | RegExp, options?: GetByTextOptions): Locator {
    return this.page.getByText(text, options);
  }

  /**
   * Returns a Locator object with a specific role.
   * @param {GetByRoleTypes} role - The role to create the Locator from.
   * @param {GetByRoleOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  getLocatorByRole(role: GetByRoleTypes, options?: GetByRoleOptions, locator?:Locator): Locator {
    if(locator !== undefined){
      return locator.getByRole(role, options);
    }
    return this.page.getByRole(role, options);
  }

  /**
   * Returns a Locator object with a specific label.
   * @param {string | RegExp} text - The label text to create the Locator from.
   * @param {GetByRoleOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  getLocatorByLabel(text: string | RegExp, options?: GetByRoleOptions): Locator {
    return this.page.getByLabel(text, options);
  }

  /**
   * Returns a Locator object with a specific placeholder.
   * @param {string | RegExp} text - The place holder text to create the Locator from.
   * @param {GetByPlaceholderOptions} options - Optional parameters for the Locator.
   * @returns {Locator} - The created Locator object.
   */
  getLocatorByPlaceholder(text: string | RegExp, options?: GetByPlaceholderOptions): Locator {
    return this.page.getByPlaceholder(text, options);
  }

  /**
   * Returns all Locator objects based on the input provided.
   * @param {string | Locator} input - The input to create the Locators from.
   * @param {LocatorOptions} options - Optional parameters for the Locators.
   * @returns {Promise<Locator[]>} - The created Locator objects.
   */
  async getAllLocators(input: string | Locator, options?: LocatorOptions): Promise<Locator[]> {
    return typeof input === 'string' ? await this.page.locator(input, options).all() : await input.all();
  }

  /**
   * Returns a FrameLocator object based on the input provided.
   * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
   * @returns {FrameLocator} - The created FrameLocator object.
   */
  getFrameLocator(frameInput: string | FrameLocator): FrameLocator {
    return typeof frameInput === 'string' ? this.page.frameLocator(frameInput) : frameInput;
  }

  /**
   * Returns a Locator object within a specific frame based on the input provided.
   * @param {string | FrameLocator} frameInput - The input to create the FrameLocator from.
   * @param {string | Locator} input - The input to create the Locator from, within the frame.
   * @returns {Locator} - The created Locator object.
   */
  getLocatorInFrame(frameInput: string | FrameLocator, input: string | Locator): Locator {
    return this.getFrameLocator(frameInput).locator(input);
  }

}