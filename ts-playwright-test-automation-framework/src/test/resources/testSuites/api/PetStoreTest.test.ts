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

    test('API. Send GET request to /user/login endpoint and check status code', async () => {
        await baseTest.sendGetRequestUserLoginAndCheckStatusCode();
    });

    test('API. Send POST request to /user endpoint and check response', async () => {
        await baseTest.sendPostRequestUserAndCheckResponse();
    });

    test('API. Send GET request to /user/{userName} endpoint and check response', async () => {
        await baseTest.sendGetRequestUserAndCheckResponse();
    });

    test('API. Send PUT request to /user/{userName} endpoint and check status code', async () => {
        await baseTest.sendPutRequestUserAndCheckStatusCode();
    });

    test('API. Send DELETE request to /user/{userName} endpoint and check status code', async () => {
        await baseTest.sendDeleteRequestUserAndCheckStatusCode();
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

    test('API. Send GET request to /store/inventory endpoint and check status code', async () => {
        await baseTest.sendGetRequestStoreInventoryAndCheckStatusCode();
    });

    test('API. Send POST request to /store/order endpoint and check status code', async () => {
        await baseTest.sendPostRequestStoreOrderAndCheckStatusCode();
    });

    test('API. Send GET request to /store/order/{orderId} endpoint and check response', async () => {
        await baseTest.sendGetRequestStoreOrderAndCheckResponse();
    });

    test('API. Send DELETE request to /store/order/{orderId} endpoint and check status code', async () => {
        await baseTest.sendDeleteRequestStoreOrderAndCheckStatusCode();
    });

    test('API. Send GET request to /user/logout endpoint and check status code', async () => {
        await baseTest.sendGetRequestUserLogoutAndCheckStatusCode();
    });
});