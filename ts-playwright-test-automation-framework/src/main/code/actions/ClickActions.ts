import { Locator } from '@playwright/test';
import { PageManager } from '../playwrightFactory/PageManager';

export class ClickActions {
    public async leftClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            await locator.click();
            console.log(`${selectorName} has been clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to click on ${selectorName}: ${e.message}`);
        }
    }

    public async forceLeftClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            await locator.click({ force: true });
            console.log(`${selectorName} has been forced to clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to force left click on ${selectorName}: ${e.message}`);
        }
    }

    public async doubleLeftClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            await locator.dblclick();
            console.log(`${selectorName} has been double clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to double click on ${selectorName}: ${e.message}`);
        }
    }

    public async rightClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            await locator.click({ button: 'right' });
            console.log(`${selectorName} has been right clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to right click on ${selectorName}: ${e.message}`);
        }
    }

    public async clickOnSelectOption(selectionBoxSelector: string, optionToSelect: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selectionBoxSelector);
            await locator.selectOption(optionToSelect);
            console.log(`${optionToSelect} has been selected in ${selectorName}.`);
        } catch (e: any) {
            throw new Error(`Unable to select option in ${selectorName}: ${e.message}`);
        }
    }

    public async checkCheckbox(selector: string, selectorName: string): Promise<void> {
        await this.checkCheckboxOrRadioButton(selector, selectorName);
    }

    public async uncheckCheckbox(selector: string, selectorName: string): Promise<void> {
        await this.uncheckCheckboxOrRadioButton(selector, selectorName);
    }

    public async clickOnRadioButton(selector: string, selectorName: string): Promise<void> {
        await this.checkCheckboxOrRadioButton(selector, selectorName);
    }

    private async checkCheckboxOrRadioButton(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            await locator.check();
            console.log(`${selectorName} has been checked.`);
        } catch (e: any) {
            throw new Error(`Unable to check ${selectorName}: ${e.message}`);
        }
    }

    private async uncheckCheckboxOrRadioButton(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = this.getLocator(selector);
            await locator.uncheck();
            console.log(`${selectorName} has been unchecked.`);
        } catch (e: any) {
            throw new Error(`Unable to uncheck ${selectorName}: ${e.message}`);
        }
    }

    private getLocator(selector: string): Locator {
        return PageManager.getPage().locator(selector);
    }
}