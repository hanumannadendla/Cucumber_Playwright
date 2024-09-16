import {Given, Then} from "@cucumber/cucumber";
import {fixture} from '../../util/fixture';
import { expect } from "@playwright/test";

Given('I request list of users', async function () {
    const res = await fixture.req.get("https://reqres.in/api/users?page=2");
    fixture.api.setreponse(res);
});
Then('Response status code should be {int}', async function (int) {
   expect(fixture.api.getres().status()).toBe(200);
});