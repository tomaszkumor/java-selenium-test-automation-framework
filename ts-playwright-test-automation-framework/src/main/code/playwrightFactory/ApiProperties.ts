import { TestConfig } from "../config/TestConfig";

export class ApiProperties {
    public static isDebugMode(): boolean {
        return TestConfig.CONFIG.getProperty("api.debug")!.toLowerCase() === "true";
    }
}