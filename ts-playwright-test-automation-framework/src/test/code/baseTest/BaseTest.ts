import { Browser, chromium, firefox, webkit } from '@playwright/test';
import { TestStackProperties } from '../../../main/code/config/TestStackProperties';
import { WebProperties } from '../../../main/code/playwrightFactory/WebProperties';
import { BrowserContextCapabilities } from '../../../main/code/playwrightFactory/BrowserContextCapabilities';
import { LaunchOptionsCapabilities } from '../../../main/code/playwrightFactory/LaunchOptionsCapabilities';
import { PageManager } from '../../../main/code/playwrightFactory/PageManager';
import { ApiProperties } from '../../../main/code/playwrightFactory/ApiProperties';
import { DataProviderRegistry } from '../../../main/code/utils/dataProviderRegistry/DataProviderRegistry';
import '../../../main/code/dataProviders/dataProvidersRegisters/api/PetStoreRegisterDP'

export class BaseTest {
    protected browser!: Browser;

    public async beforeSuite() {
        console.log("FRAMEWORK: PLAYWRIGHT");
    }

    public async beforeMethod() {
        this.logAll();

        if (TestStackProperties.getPlatform() === 'web') {
            await this.launchBrowser();
            await this.createTestContext();
        }
    }

    public async afterMethod() {
        if (TestStackProperties.getPlatform() === 'web') {
            const context = PageManager.getContext();
            await context.close();
            await this.browser.close();
            PageManager.clear();
        }
    }

    private async launchBrowser(): Promise<void> {
        const engine = WebProperties.getEngine();
        let launchOptions;

        switch (engine) {
            case 'chromium':
                launchOptions = LaunchOptionsCapabilities.getChromiumLaunchContextCapabilities();
                this.browser = await chromium.launch(launchOptions);
                break;
            case 'firefox':
                launchOptions = LaunchOptionsCapabilities.getFirefoxLaunchContextCapabilities();
                this.browser = await firefox.launch(launchOptions);
                break;
            case 'webkit':
                launchOptions = LaunchOptionsCapabilities.getWebKitLaunchContextCapabilities();
                this.browser = await webkit.launch(launchOptions);
                break;
        }
    }

    private async createTestContext(): Promise<void> {
        const engine = WebProperties.getEngine();
        let contextOptions;

        switch (engine) {
            case 'chromium':
                contextOptions = BrowserContextCapabilities.getChromiumContextCapabilities();
                break;
            case 'firefox':
                contextOptions = BrowserContextCapabilities.getFirefoxContextCapabilities();
                break;
            case 'webkit':
                contextOptions = BrowserContextCapabilities.getWebkitContextCapabilities();
                break;
        }

        const context = await this.browser.newContext(contextOptions);
        const page = await context.newPage();

        PageManager.setContextAndPage(context, page);
    }

    private logAll(): void {
        let platform: string = TestStackProperties.getPlatform();
        this.logAllForEachPlatform(platform);

        switch (platform) {
            case "web":
                this.logAllForWeb();
                break;
            case "api":
                this.logAllForApi();
                break;
        }
    }

    private logAllForEachPlatform(platform: string): void {
        console.log("ENV: " + TestStackProperties.getEnvironment());
        console.log("FRAMEWORK: " + platform.toUpperCase());
    }

    private logAllForWeb(): void {
        console.log("ENGINE: " + WebProperties.getEngine().toUpperCase());
        console.log("HEADLESS MODE: " + WebProperties.isHeadlessMode());
        console.log("REMOTE MODE: " + WebProperties.isRemoteMode());
        console.log("DEBUG MODE: " + WebProperties.isDebugMode());
    }

    private logAllForApi(): void {
        console.log("DEBUG MODE: " + ApiProperties.isDebugMode());
    }

    protected getModel<T>(dpName: string): T {
    return DataProviderRegistry.get(dpName);
}
}