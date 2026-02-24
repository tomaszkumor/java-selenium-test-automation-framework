import { Locator } from '@playwright/test';
import { PageManager } from '../playwrightFactory/PageManager';
import { logger } from "../utils/logger/Logger";

export class SendActions {
    private log = logger.child({ label: SendActions.name });

    public async sendKeysToElement(selector: string, text: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            locator.clear();
            locator.fill(text);
            this.log.debug(`'${text}' has been typed to ${selectorName}.`);
            this.sendKey(selector, "Tab");
        } catch (e: any) {
            throw new Error(`Unable to send keys to ${selectorName}: ${e.message}`);
        }
    }

    public async sendKeysToElementWithNoLeave(selector: string, text: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            locator.clear();
            locator.fill(text);
            this.log.debug(`'${text}' has been typed to ${selectorName}.`);
        } catch (e: any) {
            throw new Error(`Unable to send keys to ${selectorName}: ${e.message}`);
        }
    }

    public async sendKey(selector: string, key: string): Promise<void> {
        try {
            PageManager.getPage().press(selector, key);
            this.log.debug(`'${key}' has been tapped.`);
        } catch (e: any) {
            throw new Error(`Unable to press ${key} key: ${e.message}`);
        }
    }

    public async uploadFile(selector: string, fileDirectory: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            locator.setInputFiles(fileDirectory);
            this.log.debug(`File from directory '${fileDirectory}' has been attached to file picker input.`);
        } catch (e: any) {
            throw new Error(`Unable to upload file from directory: ${fileDirectory}: ${e.message}`);
        }
    }

    private getLocator(selector: string): Locator {
        return PageManager.getPage().locator(selector);
    }
}