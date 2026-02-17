import { Locator, expect } from '@playwright/test';
import { PageManager } from '../playwrightFactory/PageManager';

export class CheckActions {
    public async containsText(selector: string, expectedText: string, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveText(expectedText);
        console.log(`${selectorName} contains expected value: ${expectedText}`)
    }

    public async hasAttribute(selector: string, attributeName: string, expectedAttributeValue: string, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveAttribute(attributeName, expectedAttributeValue);
        console.log(`${selectorName} with attribute ${attributeName} equals expected value: ${expectedAttributeValue}`)
    }

    public async containsAttribute(selector: string, attributeName: string, expectedAttributeValue: string, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        const regex = new RegExp(expectedAttributeValue);
        await expect(locator).toHaveAttribute(attributeName, regex);
        console.log(`${selectorName} with attribute ${attributeName} contains expected value: ${expectedAttributeValue}`)
    }

    public async hasCount(selector: string, count: number, selectorName: string): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveCount(count);
        console.log(`Number of ${selectorName}: ${count}.`);
    }

    public async hasNotCount(selector: string, count: number): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toHaveCount(count);
        console.log(`Number of elements: ${count}.`);
    }

    public async hasText(selector: string, expectedText: string, selectorName: string, options?: { exact?: boolean; timeout?: number }): Promise<void> {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveText(expectedText, options);
        console.log(`${selectorName} has text: ${expectedText}.`);
    }

    public async hasValue(selector: string, expectedValue: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toHaveValue(expectedValue);
        console.log(`${selectorName} has value: ${expectedValue}.`);
    }

    public async isChecked(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeChecked();
        console.log(`${selectorName} is checked.`);
    }

    public async isNotChecked(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeChecked();
        console.log(`${selectorName} is unchecked.`);
    }

    public async isDisabled(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeDisabled();
        console.log(`${selectorName} is disabled.`);
    }

    public async isEditable(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeEditable();
        console.log(`${selectorName} is editable.`);
    }

    public async isEmpty(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeEmpty();
        console.log(`${selectorName} is empty.`);
    }

    public async isEnabled(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeEnabled();
        console.log(`${selectorName} is enabled.`);
    }

    public async isNotEnabled(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeEnabled();
        console.log(`${selectorName} is disabled.`);
    }

    public async isFocused(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeFocused();
        console.log(`Focus is on ${selectorName}.`);
    }

    public async isHidden(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeHidden();
        console.log(`${selectorName} is hidden.`);
    }

    public async isInViewport(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeInViewport();
        console.log(`${selectorName} is in viewport.`);
    }

    public async isVisible(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).toBeVisible();
        console.log(`${selectorName} is visible.`);
    }

    public async isNotVisible(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeVisible();
        console.log(`${selectorName} is not visible.`);
    }

    public async isElementPresent(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator.first()).toBeAttached();
        console.log(`${selectorName} is present in DOM.`);
    }

    public async isElementNotPresent(selector: string, selectorName: string) {
        const locator: Locator = this.getLocator(selector);
        await expect(locator).not.toBeAttached();
        console.log(`${selectorName} is not present in DOM.`);
    }

    public async doesUrlContain(expectedUrl: string) {
        const regex = new RegExp(expectedUrl);
        await expect(PageManager.getPage()).toHaveURL(regex);
        console.log("URL contains expected value.");
    }

    public async isUrlEqualTo(expectedUrl: string) {
        await expect(PageManager.getPage()).toHaveURL(expectedUrl);
        console.log("URL equals to expected value.");
    }

    private getLocator(selector: string): Locator {
        return PageManager.getPage().locator(selector);
    }
}