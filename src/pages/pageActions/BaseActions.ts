import { Page } from '@playwright/test';
import {fixture} from '../../util/fixture'
import { Webactions } from '../../util/webActions';
export class BaseActions{
    readonly page: Page;
    readonly actions: Webactions;
    constructor(){
        this.page =  fixture.page;
        this.actions = new Webactions(this.page);
    }
}