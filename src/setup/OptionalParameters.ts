/**
 * This module contain optional parameters for each action in the playwright. It will be utilised in utility methods
 */

import { APIRequestContext, Locator, Page } from '@playwright/test';

/**
 * Navigation methods optional parameters 
 */
export type GotoOptions = Parameters<Page['goto']>[1];
export type NavigationOptions = Parameters<Page['reload']>[0]; // Same for GoBack, GoForward
export type WaitForLoadStateOptions = Parameters<Page['waitForLoadState']>[0];

/**
 * Different action optional parameters
 */
export type ClickOptions = Parameters<Locator['click']>[0] & {
  loadState?: WaitForLoadStateOptions;
};
export type FillOptions = Parameters<Locator['fill']>[1];
export type TypeOptions = Parameters<Locator['type']>[1];
export type ClearOptions = Parameters<Locator['clear']>[0];
export type SelectValues = Parameters<Locator['selectOption']>[0];
export type SelectOptions = Parameters<Locator['selectOption']>[1];
export type CheckOptions = Parameters<Locator['check']>[0];
export type HoverOptions = Parameters<Locator['hover']>[0];
export type UploadValues = Parameters<Locator['setInputFiles']>[0];
export type UploadOptions = Parameters<Locator['setInputFiles']>[1];
export type DragOptions = Parameters<Locator['dragTo']>[1];
export type DoubleClickOptions = Parameters<Locator['dblclick']>[0];

/**
 * Expect options used in assertions and timeout option
 */
export type TimeoutOption = { timeout?: number };
export type SoftOption = { soft?: boolean };
export type MessageOrOptions = string | { message?: string };
export type ExpectOptions = TimeoutOption & SoftOption & MessageOrOptions;
export type ExpectTextOptions = {
  ignoreCase?: boolean;
  useInnerText?: boolean;
};

/**
 *  Playwright locator stratgies and optional parameters
 */
export type LocatorOptions = Parameters<Page['locator']>[1];
export type GetByTextOptions = Parameters<Locator['getByText']>[1];
export type GetByRoleTypes = Parameters<Locator['getByRole']>[0];
export type GetByRoleOptions = Parameters<Locator['getByRole']>[1];
export type GetByLabelOptions = Parameters<Locator['getByLabel']>[1];
export type GetByPlaceholderOptions = Parameters<Locator['getByPlaceholder']>[1];

/**
 * Playwright api parameters
 */
export type GetOptions = Parameters<APIRequestContext['get']>[1];
export type PutOptions = Parameters<APIRequestContext['put']>[1];
export type POSTOptions = Parameters<APIRequestContext['post']>[1];
export type DeleteOptions = Parameters<APIRequestContext['delete']>[1];
export type PatchOptions = Parameters<APIRequestContext['patch']>[1];
