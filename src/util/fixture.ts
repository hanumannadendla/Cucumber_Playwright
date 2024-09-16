import {  Page, APIRequestContext, APIResponse } from "@playwright/test";
import { WelcomePageLocators } from "../pages/locators/WelcomPageLocators";
import { LoginPageActions } from "../pages/pageActions/LoginPageActions";
import { Logger } from "winston";

export const fixture = {
    page: undefined as Page,
    logger: undefined as Logger,
    app_pages: undefined as Pages,
    req: undefined as APIRequestContext,
    api: undefined as Apis
}
export class Pages{
    private login_page: LoginPageActions;
    private page: Page;
    private welcome_page: WelcomePageLocators;

    constructor(page: Page){
            this.page = page;
    }
    public loginPage(): LoginPageActions{
        if(this.login_page==undefined){
            this.login_page =new LoginPageActions();
        }
        return this.login_page;
    }
    public welcomePage(): WelcomePageLocators{
        if(this.welcome_page==undefined){
            this.welcome_page =new WelcomePageLocators();
        }
        return this.welcome_page;
    }
}

export class Apis{
    readonly request: APIRequestContext;
    private response: APIResponse;
    constructor(req: APIRequestContext){
        this.request = req;
    }
    public setreponse(res:APIResponse){
        this.response = res;
    }
    public getres(){
        return this.response;
    }
}