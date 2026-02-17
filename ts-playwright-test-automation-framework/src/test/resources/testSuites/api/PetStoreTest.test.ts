import { test } from '@playwright/test';
import { PetStoreTest } from '../../../code/tests/api/PetStoreTest';

test.describe.serial('Pet Store', () => {
    let baseTest: PetStoreTest;

    test.beforeAll(async () => {
        baseTest = new PetStoreTest();
        await baseTest.beforeSuite();
    });

    test.beforeEach(async () => {
        baseTest = new PetStoreTest();
        await baseTest.beforeMethod();
    });

    test.afterEach(async () => {
        await baseTest.afterMethod();
    });

    test('API. Send POST request to /pet endpoint and check status code', async () => {
        await baseTest.sendPostRequestPetAndCheckStatusCode();
    });

    test('API. Send GET request to /pet/findByStatus endpoint and check status code', async () => {
        await baseTest.sendGetRequestPetFindByStatusAndCheckStatusCode();
    });

    test('API. Send GET request to /pet/{petId} endpoint and check response', async () => {
        await baseTest.sendGetRequestPetFindByIdAndCheckResponse();
    });

    test('API. Send PUT request to /pet endpoint and check status code', async () => {
        await baseTest.sendPutRequestPetAndCheckStatusCode();
    });

    test('API. Send DELETE request to /pet/{petId} endpoint and check status code', async () => {
        await baseTest.sendDeleteRequestPetAndCheckStatusCode();
    });
});