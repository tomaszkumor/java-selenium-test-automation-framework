import { Locator } from '@playwright/test';
import { PageManager } from '../playwrightFactory/PageManager';

export class GetActions {
    public async getInnerText(selector: string, selectorName: string) {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.innerText();
        } catch (e: any) {
            throw new Error(`Unable to get inner text from ${selectorName}: ${e.message}`);
        }
    }

    public async getAllInnerText(selector: string, selectorName: string): Promise<string[]> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.allInnerTexts();
        } catch (e: any) {
            throw new Error(`Unable to get all inner texts from ${selectorName}: ${e.message}`);
        }
    }

    public async getCount(selector: string, selectorName: string): Promise<number> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.count();
        } catch (e: any) {
            throw new Error(`Unable to get count of selector ${selectorName}: ${e.message}`);
        }
    }

    public async getAttribute(selector: string, attribute: string, selectorName: string): Promise<string | null> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.getAttribute(attribute);
        } catch (e: any) {
            throw new Error(`Unable to get attribute from ${selectorName}: ${e.message}`);
        }
    }

    public async getInnerHtml(selector: string, selectorName: string): Promise<string> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.innerHTML();
        } catch (e: any) {
            throw new Error(`Unable to get inner html from ${selectorName}: ${e.message}`);
        }
    }

    public async getInputValue(selector: string, selectorName: string): Promise<string> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.inputValue();
        } catch (e: any) {
            throw new Error(`Unable to get input value from ${selectorName}: ${e.message}`);
        }
    }

    public async getTextContent(selector: string, selectorName: string): Promise<string | null> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.textContent();
        } catch (e: any) {
            throw new Error(`Unable to get text content from ${selectorName}: ${e.message}`);
        }
    }

    public async isElementChecked(selector: string, selectorName: string): Promise<boolean> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.isChecked();
        } catch (e: any) {
            throw new Error(`Unable to check whether ${selectorName} is checked: ${e.message}`);
        }
    }

    public async isElementDisabled(selector: string, selectorName: string): Promise<boolean> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.isDisabled();
        } catch (e: any) {
            throw new Error(`Unable to check whether ${selectorName} is disabled: ${e.message}`);
        }
    }

    public async isElementEnabled(selector: string, selectorName: string): Promise<boolean> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.isEnabled();
        } catch (e: any) {
            throw new Error(`Unable to check whether ${selectorName} is enabled: ${e.message}`);
        }
    }

    public async isElementHidden(selector: string, selectorName: string): Promise<boolean> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.isHidden();
        } catch (e: any) {
            throw new Error(`Unable to check whether ${selectorName} is hidden: ${e.message}`);
        }
    }

    public async isElementVisible(selector: string, selectorName: string): Promise<boolean> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.isVisible();
        } catch (e: any) {
            throw new Error(`Unable to check whether ${selectorName} is visible: ${e.message}`);
        }
    }

    public async isElementEditable(selector: string, selectorName: string): Promise<boolean> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.isEditable();
        } catch (e: any) {
            throw new Error(`Unable to check whether ${selectorName} is editable: ${e.message}`);
        }
    }

    public async isElementPresent(selector: string, selectorName: string): Promise<boolean> {
        try {
            const locator: Locator = this.getLocator(selector);
            return await locator.count() > 0;
        } catch (e: any) {
            throw new Error(`Unable to check whether ${selectorName} is present: ${e.message}`);
        }
    }

    public async getCurrentUrl() {
        try {
            return await PageManager.getPage().url();
        } catch (e: any) {
            throw new Error(`Unable to get website url: ${e.message}`);
        }
    }

    private getLocator(selector: string): Locator {
        return PageManager.getPage().locator(selector);
    }
}