import { test } from '@playwright/test';
import { MyTest } from '../../../code/tests/web/PhpTravelsTest';

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