import { test } from '@playwright/test';
import { BaseTest } from '../../baseTest/BaseTest'; // ścieżka do Twojej klasy BaseTest
import { PageManager } from '../../../../main/code/playwrightFactory/PageManager';
import { TestStackProperties } from '../../../../main/code/config/TestStackProperties';

export class MyTest extends BaseTest {
    public async testLogin() {
        console.log('Executing testLogin...');
        const page = PageManager.getPage(); // korzystamy z PageManager
        await page.goto(TestStackProperties.getWebUrl());
        await page.waitForTimeout(10000);
    }

    public async testLogout() {
        console.log('Executing testLogout...');
        const page = PageManager.getPage(); // korzystamy z PageManager
        await page.goto(TestStackProperties.getWebUrl());
        await page.waitForTimeout(10000);
    }
}

test.describe('My Example Tests', () => {
    let baseTest: MyTest;

    test.beforeAll(async () => {
        baseTest = new MyTest();
        await baseTest.beforeSuite();
    });

    test.beforeEach(async () => {
        baseTest = new MyTest();
        await baseTest.beforeMethod();
    });

    test.afterEach(async () => {
        await baseTest.afterMethod();
    });

    test('Test Login Flow', async () => {
        await baseTest.testLogin();
    });

    test('Test Logout Flow', async () => {
        await baseTest.testLogout();
    });
});
