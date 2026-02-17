import { request, APIRequestContext } from '@playwright/test';
import { TestStackProperties } from '../../config/TestStackProperties';


export class ContextOptionsBuilder {
    public static async buildBasicRequestContextOptions(): Promise<APIRequestContext> {
        let baseUrl: string = TestStackProperties.getApiUrl();

        let contextOptions = {
            baseURL: baseUrl,
            ignoreHTTPSErrors: true,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };

        return await request.newContext(contextOptions);
    }

    public static async buildAuthorizedRequestContextOptions(): Promise<APIRequestContext> {
        let baseUrl: string = TestStackProperties.getApiUrl();

        let contextOptions = {
            baseURL: baseUrl,
            ignoreHTTPSErrors: true,
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'api_key': 'special-key'
            },
        };

        return await request.newContext(contextOptions);
    }
}
