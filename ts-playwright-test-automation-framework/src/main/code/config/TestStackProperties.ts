import { TestConfig } from "./TestConfig";

export class TestStackProperties {
    private static readonly ENVIRONMENT: string = "environment";
    private static readonly PLATFORM: string = "platform";
    private static readonly WEB_URL: string = "web_url";
    private static readonly API_URL: string = "api_url";
    private static readonly REMOTE_BROWSER_WS_URL: string = "remote_browser_ws_url";

    public static getEnvironment(): string {
        return TestConfig.CONFIG.getProperty(this.ENVIRONMENT)!;
    }

    public static getPlatform(): string {
        return TestConfig.CONFIG.getProperty(this.PLATFORM)!;
    }

    public static getWebUrl(): string {
        return TestConfig.CONFIG.getProperty(this.WEB_URL)!;
    }

    public static getApiUrl(): string {
        return TestConfig.CONFIG.getProperty(this.API_URL)!;
    }

    public static getRemoteBrowserWsUrl(): string {
        return TestConfig.CONFIG.getProperty(this.REMOTE_BROWSER_WS_URL)!;
    }
}