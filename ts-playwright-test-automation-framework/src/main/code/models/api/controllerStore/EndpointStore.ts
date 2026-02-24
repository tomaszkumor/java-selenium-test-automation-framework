import { APIResponse, APIRequestContext } from "playwright"
import { ContextOptionsBuilder } from "../../../utils/contextOptionsBuilder/ContextOptionsBuilder";
import { PetStoreModel } from "../../../dataProviders/dataProvidersModels/api/PetStoreModel";
import { POJOOrder } from "../pojo/POJOOrder";

export class EndpointStore {
    private response!: APIResponse;
    private request!: APIRequestContext;
    private pojoOrder!: POJOOrder;

    public async sendGetRequestStoreInventory(): Promise<EndpointStore> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestEndpointUrl: string = "store/inventory";

        this.response = await this.request
            .get(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendPostRequestStoreOrder(model: PetStoreModel): Promise<EndpointStore> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let requestBody: string = this.getExpectedRequestBodyFromFile(model);
        let requestEndpointUrl: string = "store/order";

        this.response = await this.request
            .post(requestEndpointUrl, { data: JSON.parse(requestBody) })

        await this.checkRequestStatus(this.response);

        return this;
    }

    public async sendGetRequestStoreOrder(model: PetStoreModel): Promise<EndpointStore> {
        this.request = await ContextOptionsBuilder.buildBasicRequestContextOptions();
        let orderId: number = this.getExpectedOrderIdFromDataProvider(model);
        let requestEndpointUrl: string = `store/order/${orderId}`;

        this.response = await this.request
            .get(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        this.pojoOrder = POJOOrder.fromJSON(await this.response.json())

        return this;
    }

    public async sendDeleteRequestStoreOrder(model: PetStoreModel): Promise<EndpointStore> {
        this.request = await ContextOptionsBuilder.buildAuthorizedRequestContextOptions();
        let orderId: number = this.getExpectedOrderIdFromDataProvider(model);
        let requestEndpointUrl: string = `store/order/${orderId}`;

        this.response = await this.request
            .delete(requestEndpointUrl)

        await this.checkRequestStatus(this.response);

        return this;
    }

    private getExpectedRequestBodyFromFile(model: PetStoreModel): string {
        let requestBodyPath: string = this.getExpectedApiRequestBodyPathFromDataProvider(model);
        let pojoOrder: POJOOrder = POJOOrder.fromFile(requestBodyPath);

        return JSON.stringify(pojoOrder);
    }

    private getExpectedApiRequestBodyPathFromDataProvider(model: PetStoreModel): string {
        return model.apiRequestBodyPath!;
    }

    private getExpectedOrderIdFromDataProvider(model: PetStoreModel): number {
        return model.order?.id!;
    }

    private async checkRequestStatus(response: APIResponse): Promise<void> {
        console.log(`Status code: ${response.status()}`)

        if (response.status() !== 200) {
            console.log(`Response body ${await response.text()}`)
        }
    }

    public getResponse(): APIResponse {
        return this.response;
    }

    public getPOJOOrder(): POJOOrder {
        return this.pojoOrder;
    }
}