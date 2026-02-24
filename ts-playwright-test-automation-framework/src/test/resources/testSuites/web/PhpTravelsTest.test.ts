import { test } from '@playwright/test';
import { PhpTravelsTest } from '../../../code/tests/web/PhpTravelsTest';

test.describe('My Example Tests', () => {
    let baseTest: PhpTravelsTest;

    test.beforeAll(async () => {
        baseTest = new PhpTravelsTest();
        await baseTest.beforeSuite();
    });

    test.beforeEach(async () => {
        baseTest = new PhpTravelsTest();
        await baseTest.beforeMethod();
    });

    test.afterEach(async () => {
        await baseTest.afterMethod();
    });

    test('Web. Search for visa via landing page search bar', async () => {
        await baseTest.searchForVisa();
    });

    test('Web. Search for flights via landing page search bar', async () => {
        await baseTest.searchForFlights();
    });
});