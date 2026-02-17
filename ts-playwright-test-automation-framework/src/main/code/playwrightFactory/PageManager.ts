// import { Page } from 'playwright';

// export class PageManager {
//     private static pages = new Map<number, Page>();

//     static setPage(page: Page) {
//         const workerId = process.env.TEST_WORKER_ID || 0;
//         this.pages.set(Number(workerId), page);
//     }

//     static getPage(): Page {
//         const workerId = process.env.TEST_WORKER_ID || 0;
//         const page = this.pages.get(Number(workerId));
//         if (!page) throw new Error('Page not set for this worker');
//         return page;
//     }
// }

// PageManager.ts
import { Page, BrowserContext } from 'playwright';

export class PageManager {
    // Mapa workerId -> { context, page }
    private static contexts = new Map<number, { context: BrowserContext; page: Page }>();

    // Ustawia context i page dla danego testu/worker
    static setContextAndPage(context: BrowserContext, page: Page) {
        const workerId = Number(process.env.TEST_WORKER_ID || 0);
        this.contexts.set(workerId, { context, page });
    }

    static getPage(): Page {
        const workerId = Number(process.env.TEST_WORKER_ID || 0);
        const entry = this.contexts.get(workerId);
        if (!entry) throw new Error('Page not set for this worker');
        return entry.page;
    }

    static getContext(): BrowserContext {
        const workerId = Number(process.env.TEST_WORKER_ID || 0);
        const entry = this.contexts.get(workerId);
        if (!entry) throw new Error('Context not set for this worker');
        return entry.context;
    }

    static clear(workerId?: number) {
        const id = workerId ?? Number(process.env.TEST_WORKER_ID || 0);
        this.contexts.delete(id);
    }
}

