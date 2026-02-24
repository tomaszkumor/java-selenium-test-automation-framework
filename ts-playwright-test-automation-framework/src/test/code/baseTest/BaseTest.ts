import { Browser, chromium, expect, firefox, webkit } from '@playwright/test';
import { TestStackProperties } from '../../../main/code/config/TestStackProperties';
import { WebProperties } from '../../../main/code/playwrightFactory/WebProperties';
import { BrowserContextCapabilities } from '../../../main/code/playwrightFactory/BrowserContextCapabilities';
import { LaunchOptionsCapabilities } from '../../../main/code/playwrightFactory/LaunchOptionsCapabilities';
import { PageManager } from '../../../main/code/playwrightFactory/PageManager';
import { ApiProperties } from '../../../main/code/playwrightFactory/ApiProperties';
import { DataProviderRegistry } from '../../../main/code/utils/dataProviderRegistry/DataProviderRegistry';
import { logger } from "../../../../src/main/code/utils/logger/Logger";
import '../../../main/code/dataProviders/dataProvidersRegisters/api/PetStoreRegisterDP'
import '../../../main/code/dataProviders/dataProvidersRegisters/web/LandingPageRegisterDP'
import { TestConfig } from '../../../main/code/config/TestConfig';

export class BaseTest {
    private log = logger.child({ label: BaseTest.name });
    protected browser!: Browser;

    public async beforeSuite() {
        this.log.info("FRAMEWORK: PLAYWRIGHT");
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
            if (!WebProperties.isDebugMode()) {
                const context = PageManager.getContext();
                await context.close();
                this.log.debug("Context has been closed via PageManager.")

                await this.browser.close();
                this.log.debug("Browser has been closed.")

                PageManager.clear();
                this.log.debug("Page and context have been cleared via PageManager.")
            } else {
                await PageManager.getPage().pause();
            }
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

        this.log.debug("Browser has been launched.")
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
        this.log.debug("Context has been set via PageManager.")

        const page = await context.newPage();
        this.log.debug("Page has been opened.")

        PageManager.setContextAndPage(context, page);
        this.log.debug("Context and page have been set via PageManager.")

        page.goto(TestStackProperties.getWebUrl());
        this.log.debug(`Page has been opened with url: ${TestStackProperties.getWebUrl()}.`)
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
        this.log.info("ENV: " + TestStackProperties.getEnvironment());
        this.log.info("FRAMEWORK: " + platform.toUpperCase());
    }

    private logAllForWeb(): void {
        this.log.info("ENGINE: " + WebProperties.getEngine().toUpperCase());
        this.log.info("HEADLESS MODE: " + WebProperties.isHeadlessMode());
        this.log.info("REMOTE MODE: " + WebProperties.isRemoteMode());
        this.log.info("DEBUG MODE: " + WebProperties.isDebugMode());
    }

    private logAllForApi(): void {
        this.log.info("DEBUG MODE: " + ApiProperties.isDebugMode());
    }

    protected getModel<T>(dpName: string): T {
        return DataProviderRegistry.get(dpName);
    }
}