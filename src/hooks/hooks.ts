import { After, AfterAll, Before,  BeforeAll,  setDefaultTimeout, Status } from '@cucumber/cucumber';
import {Browser, BrowserContext, chromium, request} from '@playwright/test';
import {Apis, fixture, Pages} from '../util/fixture'
import { invokeBrowser } from '../browsers/browserManager';
import { createLogger } from 'winston';
import { options } from '../setup/logger';
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
BeforeAll(async function () {
    browser = await invokeBrowser();
});
 export async function createPage(scenarioNameAndId: string, scenario_description: string ){
    
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
    await context.tracing.start({
        name: scenarioNameAndId,
        title: scenario_description,
        sources: true,
        screenshots: true, snapshots: true
    });
     const page  = await context.newPage();
     //await page.pause();
     return page;
 }
 
 export async function createRequest(){
    const req = await request.newContext();
    return req;
}

 setDefaultTimeout(80 * 1000);
 Before({tags: "not @api"},async function ({ pickle: scenario }) {
    const scenarioName = scenario.name + scenario.id;
    fixture.page = await createPage(scenarioName, scenario.name);
    fixture.app_pages = new Pages(fixture.page);
    fixture.logger = createLogger(options(scenarioName));
});
Before({tags: "@api"},async function () {
    fixture.req = await createRequest();
    fixture.api = new Apis(fixture.req);
});
After({tags: "not @api"},async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;
    if (result?.status == Status.PASSED) {
        img = await fixture.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await fixture.page.video().path();
    }
    await context.tracing.stop({ path: path });
    await fixture.page.close();
    await context.close();
    if (result?.status == Status.PASSED) {
        await this.attach(
            img, "image/png"
        );
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        await this.attach(`Trace file: ${traceFileLink}`, 'text/html');

    }

});

AfterAll(async function () {
    if(browser!=undefined){
        await browser.close();
    }
})


 
