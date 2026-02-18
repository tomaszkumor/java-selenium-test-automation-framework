import { APIResponse, APIRequestContext } from "playwright"
import { POJOPet } from "../pojo/POJOPet";
import { ContextOptionsBuilder } from "../../../utils/contextOptionsBuilder/ContextOptionsBuilder";
import { PetStoreModel } from "../../../dataProviders/dataProvidersModels/api/PetStoreModel";

export class EndpointPet {
    private response!: APIResponse;
    private request!: APIRequestContext;
    private pojoPet!: POJOPet;

    public async sendPostRequestPet(model: PetStoreModel): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestBody: string = this.getExpectedRequestBodyFromFile(model);
        let requestEndpointUrl: string = "pet";

        this.response = await this.request
            .post(requestEndpointUrl, { data: JSON.parse(requestBody) })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendGetRequestPetFindByStatus(model: PetStoreModel): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let petStatus: string = this.getExpectedPetStatusFromDataProvider(model);
        let requestEndpointUrl: string = "pet/findByStatus";

        this.response = await this.request
            .get(requestEndpointUrl, {
                params: {
                    status: petStatus
                }
            })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendGetRequestPetFindById(model: PetStoreModel): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let petId: number = this.getExpectedPetIdFromDataProvider(model);
        let requestEndpointUrl: string = `pet/${petId}`;

        this.response = await this.request
            .get(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        this.pojoPet = POJOPet.fromJSON(await this.response.json())

        return this;
    }

    public async sendPutRequestPet(model: PetStoreModel): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestBody: string = this.getExpectedRequestBodyFromFile(model);
        let requestEndpointUrl: string = "pet";

        this.response = await this.request
            .put(requestEndpointUrl, { data: JSON.parse(requestBody) })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendDeleteRequestPet(model: PetStoreModel): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildAuthorizedRequestContextOptions();
        let petId: number = this.getExpectedPetIdFromDataProvider(model);
        let requestEndpointUrl: string = `pet/${petId}`;

        this.response = await this.request
            .delete(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        return this;
    }

    private async checkRequestStatus(response: APIResponse): Promise<void> {
        console.log(`Status code: ${response.status()}`)

        if (response.status() !== 200) {
            console.log(`Response body ${await response.text()}`)
        }
    }

    private getExpectedPetIdFromDataProvider(model: PetStoreModel): number {
        return model.pet?.id!;
    }

    private getExpectedPetStatusFromDataProvider(model: PetStoreModel): string {
        return model.pet?.status!;
    }

    private getExpectedRequestBodyFromFile(model: PetStoreModel): string {
        let requestBodyPath: string = this.getExpectedApiRequestBodyPathFromDataProvider(model);
        let pojoPet: POJOPet = POJOPet.fromFile(requestBodyPath);

        return JSON.stringify(pojoPet);
    }

    private getExpectedApiRequestBodyPathFromDataProvider(model: PetStoreModel): string {
        return model.apiRequestBodyPath!;
    }

    public getResponse(): APIResponse {
        return this.response;
    }

    public getPOJOPet(): POJOPet {
        return this.pojoPet;
    }
}