import { Page, BrowserContext } from 'playwright';

export class PageManager {
    private static context?: BrowserContext;
    private static page?: Page;

    static setContextAndPage(context: BrowserContext, page: Page) {
        this.context = context;
        this.page = page;
    }

    static getPage(): Page {
        if (!this.page) throw new Error('Page not initialized');
        return this.page;
    }

    static getContext(): BrowserContext {
        if (!this.context) throw new Error('Context not initialized');
        return this.context;
    }

    static clear() {
        this.context = undefined;
        this.page = undefined;
    }
}
