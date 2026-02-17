import { BaseTest } from '../../baseTest/BaseTest';
import { PageManager } from '../../../../main/code/playwrightFactory/PageManager';
import { TestStackProperties } from '../../../../main/code/config/TestStackProperties';

export class MyTest extends BaseTest {
    public async testLogin() {
        console.log('Executing testLogin...');
        const page = PageManager.getPage();
        await page.goto(TestStackProperties.getWebUrl());
        await page.waitForTimeout(10000);
    }

    public async testLogout() {
        console.log('Executing testLogout...');
        const page = PageManager.getPage();
        await page.goto(TestStackProperties.getWebUrl());
        await page.waitForTimeout(10000);
    }
}