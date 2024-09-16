import { Page } from '@playwright/test';
import {fixture} from '../../util/fixture'
import { Webactions } from '../../util/webActions';

export class BaseLocators{
    readonly page: Page;
    readonly actions: Webactions;
    constructor(){
        this.page =  fixture.page;
    }
    

}