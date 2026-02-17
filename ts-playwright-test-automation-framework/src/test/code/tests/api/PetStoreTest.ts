import { BaseTest } from '../../baseTest/BaseTest';
import { APIResponse } from "playwright"
import { EndpointPet } from '../../../../main/code/models/api/controllerPet/EndpointPet';
import { expect } from 'playwright/test';
import { POJOPet } from '../../../../main/code/models/api/pojo/POJOPet';

export class PetStoreTest extends BaseTest {
    public async sendPostRequestPetAndCheckStatusCode(): Promise<void> {
        let actualResponse: APIResponse = (await new EndpointPet().sendPostRequestPet()).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendGetRequestPetFindByStatusAndCheckStatusCode(): Promise<void> {
        let actualResponse: APIResponse = (await new EndpointPet().sendGetRequestPetFindByStatus()).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendPutRequestPetAndCheckStatusCode(): Promise<void> {
        let actualResponse: POJOPet = (await new EndpointPet().sendGetRequestPetFindById()).getPOJOPet();
        let expectedResponse: POJOPet = POJOPet.fromFile("src/main/resources/api/env1/request/PutRequestPet_requestBody.json");

        expect(actualResponse).toEqual(expectedResponse);
    }

    public async sendGetRequestPetFindByIdAndCheckResponse(): Promise<void> {
        let actualResponse: APIResponse = (await new EndpointPet().sendPutRequestPet()).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendDeleteRequestPetAndCheckStatusCode(): Promise<void> {
        let actualResponse: APIResponse = (await new EndpointPet().sendDeleteRequestPet()).getResponse();
        expect(actualResponse.status()).toBe(200)
    }
}