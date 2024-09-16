import { LoginPageLocators } from "../locators/loginLocators";
import { BaseActions } from "./BaseActions";

export class LoginPageActions extends BaseActions {
    readonly login_locators:LoginPageLocators;
    
    constructor(){
        super();
        this.login_locators = new LoginPageLocators();
    }
    /**
     * 
     * @param username 
     */
    async fill_username(username:string){
        await this.actions.fill(this.login_locators.username_textbox(),username);
    }
    async fill_password(pwd:string){
        await this.actions.fill(this.login_locators.password_textbox(),pwd);
    }

    async click_login() {
        await this.actions.click(this.login_locators.login_button());
    }

}