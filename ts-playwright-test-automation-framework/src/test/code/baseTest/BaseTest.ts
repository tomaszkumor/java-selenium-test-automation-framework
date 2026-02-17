// import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
// import { TestStackProperties } from '../../../main/code/config/TestStackProperties';
// import { WebProperties } from '../../../main/code/playwrightFactory/WebProperties';
// import { ApiProperties } from '../../../main/code/playwrightFactory/ApiProperties';
// import { BrowserContextCapabilities } from '../../../main/code/playwrightFactory/BrowserContextCapabilities';
// import { LaunchOptionsCapabilities } from '../../../main/code/playwrightFactory/LaunchOptionsCapabilities';
// import { PageManager } from '../../../main/code/playwrightFactory/PageManager';

// export class BaseTest {
//     protected browser!: Browser;
//     protected context!: BrowserContext;
//     protected page!: Page;

//     public async beforeSuite() {
//         console.log("FRAMEWORK: PLAYWRIGHT");

//         let platform: string = TestStackProperties.getPlatform();

//         switch (platform) {
//             case "web":
//                 await this.setLaunchOptions();
//                 await this.runBrowser();
//                 break;
//         }
//     }

//     public getPage(): Page {
//         return this.page;
//     }

    // public async beforeMethod() {
    //     this.logAll();
    //     await this.openNewPage();
    // }

//     public async afterMethod() {
//         let platform: string = TestStackProperties.getPlatform();

//         switch (platform) {
//             case "web":
//                 if (WebProperties.isHeadlessMode()) {
//                     await this.page.pause();
//                 } else {
//                     await this.page.close();
//                     await this.context.close();
//                 }
//                 break;
//         }
//     }

//     public async afterSuite() {
//         let platform: string = TestStackProperties.getPlatform();

//         switch (platform) {
//             case "web":
//                 if (!WebProperties.isHeadlessMode()) {
//                     await this.context.close();
//                     await this.browser.close();
//                 }
//                 break;
//         }
//     }

//     private async openNewPage(): Promise<void> {
//         if (TestStackProperties.getPlatform() === "web") {
//             this.page = await this.context.newPage();
//             PageManager.setPage(this.page);
//         }
//     }

    

//     private async setLaunchOptions(): Promise<void> {
//         let engine: string = WebProperties.getEngine();

//         let launchOptions;
//         switch (engine) {
//             case 'chromium':
//                 launchOptions = LaunchOptionsCapabilities.getChromiumLaunchContextCapabilities();
//                 this.browser = await chromium.launch(launchOptions);
//                 break;
//             case 'firefox':
//                 launchOptions = LaunchOptionsCapabilities.getFirefoxLaunchContextCapabilities();
//                 this.browser = await firefox.launch(launchOptions);
//                 break;
//             case 'webkit':
//                 launchOptions = LaunchOptionsCapabilities.getWebKitLaunchContextCapabilities();
//                 this.browser = await webkit.launch(launchOptions);
//                 break;
//         }
//     }

//     private async runBrowser(): Promise<void> {
//         let engine: string = WebProperties.getEngine();
//         let browserContextOptions;

//         switch (engine) {
//             case 'chromium':
//                 browserContextOptions = BrowserContextCapabilities.getChromiumContextCapabilities();
//                 this.context = await this.browser.newContext(browserContextOptions);
//                 break;
//             case 'firefox':
//                 browserContextOptions = BrowserContextCapabilities.getFirefoxContextCapabilities();
//                 this.context = await this.browser.newContext(browserContextOptions);
//                 break;
//             case 'webkit':
//                 browserContextOptions = BrowserContextCapabilities.getWebkitContextCapabilities();
//                 this.context = await this.browser.newContext(browserContextOptions);
//                 break;
//         }
//     }


// }

// BaseTest.ts
import { Browser, chromium, firefox, webkit } from '@playwright/test';
import { TestStackProperties } from '../../../main/code/config/TestStackProperties';
import { WebProperties } from '../../../main/code/playwrightFactory/WebProperties';
import { BrowserContextCapabilities } from '../../../main/code/playwrightFactory/BrowserContextCapabilities';
import { LaunchOptionsCapabilities } from '../../../main/code/playwrightFactory/LaunchOptionsCapabilities';
import { PageManager } from '../../../main/code/playwrightFactory/PageManager';
import { ApiProperties } from '../../../main/code/playwrightFactory/ApiProperties';

export class BaseTest {
    protected browser!: Browser;

    // Tworzymy nowy context i page dla każdego testu
    public async beforeSuite() {
        console.log("FRAMEWORK: PLAYWRIGHT");
    }

    public async beforeMethod() {
        this.logAll();

        if (TestStackProperties.getPlatform() === 'web') {
            await this.launchBrowser();      // 🔥 przeniesione tutaj
            await this.createTestContext();
        }
    }

    public async afterMethod() {
        if (TestStackProperties.getPlatform() === 'web') {
            const context = PageManager.getContext();
            await context.close();
            await this.browser.close();     // 🔥 zamykamy browser per test
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

        // zapisujemy context + page dla aktualnego workerId
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
}
