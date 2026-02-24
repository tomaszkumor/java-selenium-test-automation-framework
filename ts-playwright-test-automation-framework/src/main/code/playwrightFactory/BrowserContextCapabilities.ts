import { BrowserContextOptions } from 'playwright';

export class BrowserContextCapabilities {
    private static readonly DEFAULT_LOCALE = 'pl-PL';
    private static readonly DEFAULT_TIMEZONE = 'Europe/Warsaw';
    private static readonly DEFAULT_PERMISSIONS = ['geolocation', 'notifications'];

    public static getChromiumContextCapabilities(): BrowserContextOptions {
        return {
            viewport: null,
            ignoreHTTPSErrors: true,
            locale: BrowserContextCapabilities.DEFAULT_LOCALE,
            timezoneId: BrowserContextCapabilities.DEFAULT_TIMEZONE,
            permissions: BrowserContextCapabilities.DEFAULT_PERMISSIONS,
        };
    }

    public static getFirefoxContextCapabilities(): BrowserContextOptions {
        const options: BrowserContextOptions = {
            ignoreHTTPSErrors: true,
            locale: BrowserContextCapabilities.DEFAULT_LOCALE,
            timezoneId: BrowserContextCapabilities.DEFAULT_TIMEZONE,
            permissions: BrowserContextCapabilities.DEFAULT_PERMISSIONS,
        };

        return options;
    }

    public static getWebkitContextCapabilities(): BrowserContextOptions {
        const options: BrowserContextOptions = {
            ignoreHTTPSErrors: true,
            locale: BrowserContextCapabilities.DEFAULT_LOCALE,
            timezoneId: BrowserContextCapabilities.DEFAULT_TIMEZONE,
            permissions: BrowserContextCapabilities.DEFAULT_PERMISSIONS,
        };

        return options;
    }
}
