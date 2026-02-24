import { TestConfig } from "../config/TestConfig";

export class WebProperties {
    public static isDebugMode(): boolean {
        return TestConfig.CONFIG.getProperty("web.debug")!.toLowerCase() === "true";
    }

    public static isHeadlessMode(): boolean {
        return TestConfig.CONFIG.getProperty("web.headless")!.toLowerCase() === "true";
    }

    public static isRemoteMode(): boolean {
        return TestConfig.CONFIG.getProperty("web.remote")!.toLowerCase() === "true";
    }

    public static getEngine(): string {
        return TestConfig.CONFIG.getProperty("web.engine")!.toLowerCase();
    }
}