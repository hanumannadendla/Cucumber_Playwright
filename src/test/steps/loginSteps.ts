import {Given, Then, When, setDefaultTimeout} from "@cucumber/cucumber";
import {fixture} from '../../util/fixture';
import { expect } from "@playwright/test";

Given('Launch salesforce', async function () {
    await fixture.page.goto("https://login.salesforce.com/",{"waitUntil":"networkidle"});
});

Given('Enter Username {string}', async function (username: string) {
    await fixture.app_pages.loginPage().fill_username(username);
});


Given('Enter Password {string}', async function (password: string) {
    await fixture.app_pages.loginPage().fill_password(password);
});

When('Click on login button', async function () {
    await fixture.app_pages.loginPage().click_login();
    await fixture.app_pages.loginPage().page.waitForLoadState('load');
    await fixture.app_pages.loginPage().page.waitForLoadState('domcontentloaded');
    await fixture.app_pages.loginPage().page.waitForTimeout(5000);
});

Then('It should navigate to home page', async function () {
    expect(await fixture.app_pages.loginPage().page.title()).toBe("Home | Salesforce");
    
});
Then('Error message should be displayed', async function () {
    await expect(fixture.page.getByText("Please check your username and password. If you still can't log in, contact your Salesforce administrator.")).toBeVisible();
});