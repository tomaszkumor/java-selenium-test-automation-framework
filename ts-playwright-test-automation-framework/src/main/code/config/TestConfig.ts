import { ConfigManager } from "./ConfigManager";

export class TestConfig {
    private static readonly PROPERTIES_PATH: string = "src/main/resources/";
    public static readonly CONFIG = this.loadConfig();

    private static loadConfig(): ConfigManager {
        let config: ConfigManager = new ConfigManager(this.PROPERTIES_PATH + "BasicSettings.yaml")
        let environment: string = config.getProperty("environment")!.toUpperCase();
        config.loadFileSettings(`${this.PROPERTIES_PATH}settings/${environment}Settings.yaml`);
        config.loadFileSettings(`${this.PROPERTIES_PATH}users/${environment}Users.yaml`);
        config.loadFileSettings(`${this.PROPERTIES_PATH}filesPaths/${environment}FilesPaths.yaml`);

        return config;
    }
}