import { APIResponse, APIRequestContext } from "playwright"
import { POJOPet } from "../pojo/POJOPet";
import { ContextOptionsBuilder } from "../../../utils/contextOptionsBuilder/ContextOptionsBuilder";

export class EndpointPet {
    private response!: APIResponse;
    private request!: APIRequestContext;
    private pojoPet!: POJOPet;

    public async sendPostRequestPet(): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestBody: string = this.getExpectedRequestBodyFromFile();
        let requestEndpointUrl: string = "pet";

        this.response = await this.request
            .post(requestEndpointUrl, { data: JSON.parse(requestBody) })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendGetRequestPetFindByStatus(): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let petStatus: string = this.getExpectedPetStatusFromDataProvider();
        let requestEndpointUrl: string = "pet/findByStatus";

        this.response = await this.request
            .get(requestEndpointUrl, { params: { status: petStatus } })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendGetRequestPetFindById(): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let petId: number = this.getExpectedPetIdFromDataProvider();
        let requestEndpointUrl: string = `pet/${petId}`;

        this.response = await this.request
            .get(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        this.pojoPet = POJOPet.fromJSON(await this.response.json())

        return this;
    }

    public async sendPutRequestPet(): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestBody: string = this.getExpectedRequestBodyFromFile2();
        let requestEndpointUrl: string = "pet";

        this.response = await this.request
            .put(requestEndpointUrl, { data: JSON.parse(requestBody) })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendDeleteRequestPet(): Promise<EndpointPet> {
        this.request = await ContextOptionsBuilder.buildAuthorizedRequestContextOptions();
        let petId: number = this.getExpectedPetIdFromDataProvider();
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

    private getExpectedPetIdFromDataProvider(): number {
        return 909091666;
    }

    private getExpectedPetStatusFromDataProvider(): string {
        //TODO: trzeba to pobrac z dataprovidera
        return "available";
    }

    private getExpectedRequestBodyFromFile(): string {
        let requestBodyPath: string = "src/main/resources/api/env1/request/PostRequestPet_requestBody.json";
        //TODO: trzeba to pobrac z dataprovidera
        let pojoPet: POJOPet = POJOPet.fromFile(requestBodyPath);

        return JSON.stringify(pojoPet);
    }

    private getExpectedRequestBodyFromFile2(): string {
        let requestBodyPath: string = "src/main/resources/api/env1/request/PutRequestPet_requestBody.json";
        //TODO: trzeba to pobrac z dataprovidera
        let pojoPet: POJOPet = POJOPet.fromFile(requestBodyPath);

        return JSON.stringify(pojoPet);
    }

    public getResponse(): APIResponse {
        return this.response;
    }

    public getPOJOPet(): POJOPet {
        return this.pojoPet;
    }








}