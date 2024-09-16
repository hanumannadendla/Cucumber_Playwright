import { BaseLocators } from "./BaseLocators";

export class LoginPageLocators extends BaseLocators{

    constructor(){
        super();
    }
    username_textbox =()=> this.page.locator('#username');
    password_textbox =()=> this.page.locator('#password');
    login_button =() => this.page.locator('#Login');
    error_message =()=> this.page.getByText("Please check your username and password. If you still can't log in, contact your Salesforce administrator."); 
}