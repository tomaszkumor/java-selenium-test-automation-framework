import { Locator } from '@playwright/test';
import { PageManager } from '../playwrightFactory/PageManager';
import { logger } from "../utils/logger/Logger";

export class ClickActions {
    private log = logger.child({ label: ClickActions.name });

    public async leftClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = await this.getLocator(selector);
            await locator.click();
            this.log.debug(`${selectorName} has been clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to click on ${selectorName}: ${e.message}`);
        }
    }

    public async forceLeftClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = await this.getLocator(selector);
            await locator.click({ force: true });
            this.log.debug(`${selectorName} has been forced to clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to force left click on ${selectorName}: ${e.message}`);
        }
    }

    public async doubleLeftClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = await this.getLocator(selector);
            await locator.dblclick();
            this.log.debug(`${selectorName} has been double clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to double click on ${selectorName}: ${e.message}`);
        }
    }

    public async rightClick(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = await this.getLocator(selector);
            await locator.click({ button: 'right' });
            this.log.debug(`${selectorName} has been right clicked.`);
        } catch (e: any) {
            throw new Error(`Unable to right click on ${selectorName}: ${e.message}`);
        }
    }

    public async clickOnSelectOption(selectionBoxSelector: string, optionToSelect: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = await this.getLocator(selectionBoxSelector);
            await locator.selectOption(optionToSelect);
            this.log.debug(`${optionToSelect} has been selected in ${selectorName}.`);
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
            const locator: Locator = await this.getLocator(selector);
            await locator.check();
            this.log.debug(`${selectorName} has been checked.`);
        } catch (e: any) {
            throw new Error(`Unable to check ${selectorName}: ${e.message}`);
        }
    }

    private async uncheckCheckboxOrRadioButton(selector: string, selectorName: string): Promise<void> {
        try {
            const locator: Locator = await this.getLocator(selector);
            await locator.uncheck();
            this.log.debug(`${selectorName} has been unchecked.`);
        } catch (e: any) {
            throw new Error(`Unable to uncheck ${selectorName}: ${e.message}`);
        }
    }

    private async getLocator(selector: string): Promise<Locator> {
        return await PageManager.getPage().locator(selector);
    }
}