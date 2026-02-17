import { WebProperties } from './WebProperties';

export class LaunchOptionsCapabilities {
    public static getChromiumLaunchContextCapabilities(): object {
        const isHeadlessMode = WebProperties.isHeadlessMode();

        return {
            headless: isHeadlessMode,
            args: [
                '--disable-features=TranslateUI',
                '--disable-infobars',
                '--disable-extensions',
                '--disable-notifications',
                '--disable-dev-shm-usage',
                '--no-sandbox',
                '--ignore-certificate-errors',
                '--remote-allow-origins=*',
                '--start-maximized'
            ]
        };
    }

    public static getFirefoxLaunchContextCapabilities(): object {
        const isHeadlessMode = WebProperties.isHeadlessMode();

        return {
            headless: isHeadlessMode,
            slowMo: 100,
            args: ['--start-maximized']
        };
    }

    public static getWebKitLaunchContextCapabilities(): object {
        const isHeadlessMode = WebProperties.isHeadlessMode();

        return {
            headless: isHeadlessMode,
            slowMo: 100
        };
    }
}
