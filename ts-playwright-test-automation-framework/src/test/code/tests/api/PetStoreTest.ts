import { BaseTest } from '../../baseTest/BaseTest';
import { APIResponse } from "playwright"
import { EndpointPet } from '../../../../main/code/models/api/controllerPet/EndpointPet';
import { expect } from 'playwright/test';
import { POJOPet } from '../../../../main/code/models/api/pojo/POJOPet';
import { PetStoreModel } from '../../../../main/code/dataProviders/dataProvidersModels/api/PetStoreModel';
import { EndpointStore } from '../../../../main/code/models/api/controllerStore/EndpointStore';
import { EndpointUser } from '../../../../main/code/models/api/controllerUser/EndpointUser';
import { POJOOrder } from '../../../../main/code/models/api/pojo/POJOOrder';
import { POJOUser } from '../../../../main/code/models/api/pojo/POJOUser';
import { POJOApiResponse } from '../../../../main/code/models/api/pojo/POJOApiResponse';

export class PetStoreTest extends BaseTest {
    public async sendGetRequestUserLoginAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendGetRequestUserLoginAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointUser().sendGetRequestUserLogin(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendPostRequestUserAndCheckResponse(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendPostRequestUserAndCheckResponse');

        let actualResponse: POJOApiResponse = (await new EndpointUser().sendPostRequestUser(model)).getPOJOApiResponse();
        let expectedResponse: POJOApiResponse = POJOApiResponse.fromFile(model.apiResponseBodyPath!);
        expect(actualResponse).toMatchObject(JSON.parse(JSON.stringify(expectedResponse)));
    }

    public async sendGetRequestUserAndCheckResponse(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendGetRequestUserAndCheckResponse');

        let actualResponse: POJOUser = (await new EndpointUser().sendGetRequestUser(model)).getPOJOUser();
        let expectedResponse: POJOUser = POJOUser.fromFile(model.apiResponseBodyPath!);
        expect(actualResponse).toMatchObject(JSON.parse(JSON.stringify(expectedResponse)));
    }

    public async sendPutRequestUserAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendPutRequestUserAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointUser().sendPutRequestUser(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendDeleteRequestUserAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendDeleteRequestUserAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointUser().sendDeleteRequestUser(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendPostRequestPetAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendPostRequestPetAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointPet().sendPostRequestPet(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendGetRequestPetFindByStatusAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendGetRequestPetFindByStatusAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointPet().sendGetRequestPetFindByStatus(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendGetRequestPetFindByIdAndCheckResponse(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendGetRequestPetFindByIdAndCheckResponse');

        let actualResponse: POJOPet = (await new EndpointPet().sendGetRequestPetFindById(model)).getPOJOPet();
        let expectedResponse: POJOPet = POJOPet.fromFile(model.apiResponseBodyPath!);
        expect(actualResponse).toMatchObject(JSON.parse(JSON.stringify(expectedResponse)));
    }

    public async sendPutRequestPetAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendPutRequestPetAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointPet().sendPutRequestPet(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendDeleteRequestPetAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendDeleteRequestPetAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointPet().sendDeleteRequestPet(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendGetRequestStoreInventoryAndCheckStatusCode(): Promise<void> {
        let actualResponse: APIResponse = (await new EndpointStore().sendGetRequestStoreInventory()).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendPostRequestStoreOrderAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendPostRequestStoreOrderAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointStore().sendPostRequestStoreOrder(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendGetRequestStoreOrderAndCheckResponse(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendGetRequestStoreOrderAndCheckResponse');

        let actualResponse: POJOOrder = (await new EndpointStore().sendGetRequestStoreOrder(model)).getPOJOOrder();
        let expectedResponse: POJOOrder = POJOOrder.fromFile(model.apiResponseBodyPath!);
        expect(actualResponse).toMatchObject(JSON.parse(JSON.stringify(expectedResponse)));
    }

    public async sendDeleteRequestStoreOrderAndCheckStatusCode(): Promise<void> {
        const model = this.getModel<PetStoreModel>('sendDeleteRequestStoreOrderAndCheckStatusCode');

        let actualResponse: APIResponse = (await new EndpointStore().sendDeleteRequestStoreOrder(model)).getResponse();
        expect(actualResponse.status()).toBe(200)
    }

    public async sendGetRequestUserLogoutAndCheckStatusCode(): Promise<void> {
        let actualResponse: APIResponse = (await new EndpointUser().sendGetRequestUserLogout()).getResponse();
        expect(actualResponse.status()).toBe(200)
    }
}