import { APIResponse, APIRequestContext } from "playwright"
import { POJOPet } from "../pojo/POJOPet";
import { ContextOptionsBuilder } from "../../../utils/contextOptionsBuilder/ContextOptionsBuilder";
import { PetStoreModel } from "../../../dataProviders/dataProvidersModels/api/PetStoreModel";
import { POJOUser } from "../pojo/POJOUser";
import { POJOApiResponse } from "../pojo/POJOApiResponse";

export class EndpointUser {
    private response!: APIResponse;
    private request!: APIRequestContext;
    private pojoUser!: POJOUser;
    private pojoApiResponse!: POJOApiResponse;

    public async sendPostRequestUser(model: PetStoreModel): Promise<EndpointUser> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestBody: string = this.getExpectedRequestBodyFromFile(model);
        let requestEndpointUrl: string = "user";

        this.response = await this.request
            .post(requestEndpointUrl, { data: JSON.parse(requestBody) })

        await this.checkRequestStatus(this.response);

        this.pojoApiResponse = POJOApiResponse.fromJSON(await this.response.json())

        return this;
    }

    public async sendGetRequestUserLogin(model: PetStoreModel): Promise<EndpointUser> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let userName: string = this.getExpectedUserNameFromDataProvider(model);
        let password: string = this.getExpectedPasswordFromDataProvider(model);
        let requestEndpointUrl: string = "user/login";

        this.response = await this.request
            .get(requestEndpointUrl, {
                params: {
                    username: userName,
                    password: password
                }
            })

        await this.checkRequestStatus(this.response);

        this.pojoApiResponse = POJOApiResponse.fromJSON(await this.response.json())

        return this;
    }

    public async sendGetRequestUserLogout(): Promise<EndpointUser> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestEndpointUrl: string = "user/logout";

        this.response = await this.request
            .get(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendGetRequestUser(model: PetStoreModel): Promise<EndpointUser> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let userName: string = this.getExpectedUserNameFromDataProvider(model);
        let requestEndpointUrl: string = `user/${userName}`;

        this.response = await this.request
            .get(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        this.pojoUser = POJOUser.fromJSON(await this.response.json())

        return this;
    }

    public async sendPutRequestUser(model: PetStoreModel): Promise<EndpointUser> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestBody: string = this.getExpectedRequestBodyFromFile(model);
        let userName: string = this.getExpectedUserNameFromDataProvider(model);
        let requestEndpointUrl: string = `user/${userName}`;

        this.response = await this.request
            .put(requestEndpointUrl, { data: JSON.parse(requestBody) })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendDeleteRequestUser(model: PetStoreModel): Promise<EndpointUser> {
        this.request = await ContextOptionsBuilder.buildAuthorizedRequestContextOptions();
        let userName: string = this.getExpectedUserNameFromDataProvider(model);
        let requestEndpointUrl: string = `user/${userName}`;

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

    private getExpectedUserNameFromDataProvider(model: PetStoreModel): string {
        return model.user?.userName!;
    }

    private getExpectedPasswordFromDataProvider(model: PetStoreModel): string {
        return model.user?.password!;
    }

    private getExpectedRequestBodyFromFile(model: PetStoreModel): string {
        let requestBodyPath: string = this.getExpectedApiRequestBodyPathFromDataProvider(model);
        let pojoUser: POJOUser = POJOUser.fromFile(requestBodyPath);

        return JSON.stringify(pojoUser);
    }

    private getExpectedApiRequestBodyPathFromDataProvider(model: PetStoreModel): string {
        return model.apiRequestBodyPath!;
    }

    public getResponse(): APIResponse {
        return this.response;
    }

    public getPOJOApiResponse(): POJOApiResponse {
        return this.pojoApiResponse;
    }

    public getPOJOUser(): POJOUser {
        return this.pojoUser;
    }
}