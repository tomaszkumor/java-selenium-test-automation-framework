import { Locator, expect } from '@playwright/test';
import { PageManager } from '../playwrightFactory/PageManager';
import { logger } from "../utils/logger/Logger";

export class CheckActions {
    private log = logger.child({ label: CheckActions.name });

    public async containsText(selector: string, expectedText: string, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveText(expectedText);
        this.log.debug(`${selectorName} contains expected value: ${expectedText}`)
    }

    public async hasAttribute(selector: string, attributeName: string, expectedAttributeValue: string, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveAttribute(attributeName, expectedAttributeValue);
        this.log.debug(`${selectorName} with attribute ${attributeName} equals expected value: ${expectedAttributeValue}`)
    }

    public async containsAttribute(selector: string, attributeName: string, expectedAttributeValue: string, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        const regex = new RegExp(expectedAttributeValue);
        await expect(locator).toHaveAttribute(attributeName, regex);
        this.log.debug(`${selectorName} with attribute ${attributeName} contains expected value: ${expectedAttributeValue}`)
    }

    public async hasCount(selector: string, count: number, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveCount(count);
        this.log.debug(`Number of ${selectorName}: ${count}.`);
    }

    public async hasNotCount(selector: string, count: number): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toHaveCount(count);
        this.log.debug(`Number of elements: ${count}.`);
    }

    public async hasText(selector: string, expectedText: string, selectorName: string, options?: { exact?: boolean; timeout?: number }): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveText(expectedText, options);
        this.log.debug(`${selectorName} has text: ${expectedText}.`);
    }

    public async hasValue(selector: string, expectedValue: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveValue(expectedValue);
        this.log.debug(`${selectorName} has value: ${expectedValue}.`);
    }

    public async isChecked(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeChecked();
        this.log.debug(`${selectorName} is checked.`);
    }

    public async isNotChecked(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeChecked();
        this.log.debug(`${selectorName} is unchecked.`);
    }

    public async isDisabled(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeDisabled();
        this.log.debug(`${selectorName} is disabled.`);
    }

    public async isEditable(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeEditable();
        this.log.debug(`${selectorName} is editable.`);
    }

    public async isEmpty(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeEmpty();
        this.log.debug(`${selectorName} is empty.`);
    }

    public async isEnabled(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeEnabled();
        this.log.debug(`${selectorName} is enabled.`);
    }

    public async isNotEnabled(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeEnabled();
        this.log.debug(`${selectorName} is disabled.`);
    }

    public async isFocused(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeFocused();
        this.log.debug(`Focus is on ${selectorName}.`);
    }

    public async isHidden(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeHidden();
        this.log.debug(`${selectorName} is hidden.`);
    }

    public async isInViewport(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeInViewport();
        this.log.debug(`${selectorName} is in viewport.`);
    }

    public async isVisible(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeVisible();
        this.log.debug(`${selectorName} is visible.`);
    }

    public async isNotVisible(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeVisible();
        this.log.debug(`${selectorName} is not visible.`);
    }

    public async isElementPresent(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator.first()).toBeAttached();
        this.log.debug(`${selectorName} is present in DOM.`);
    }

    public async isElementNotPresent(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeAttached();
        this.log.debug(`${selectorName} is not present in DOM.`);
    }

    public async doesUrlContain(expectedUrl: string) {
        const regex = new RegExp(expectedUrl);
        await expect(PageManager.getPage()).toHaveURL(regex);
        this.log.debug("URL contains expected value.");
    }

    public async isUrlEqualTo(expectedUrl: string) {
        await expect(PageManager.getPage()).toHaveURL(expectedUrl);
        this.log.debug("URL equals to expected value.");
    }

    private getLocator(selector: string): Locator {
        return PageManager.getPage().locator(selector);
    }
}