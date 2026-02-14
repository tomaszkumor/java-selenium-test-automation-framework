package models.numbers.textEditor;

import dataProviders.dataProvidersModels.DesktopModel;
import io.qameta.allure.Step;
import models.numbers.scaleModal.ScaleModal;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;

import java.time.Duration;

import static driver.BaseDriver.getWebDriver;
import static org.assertj.core.api.Assertions.assertThat;
import static utils.logger.Log4J.log;

public class TextEditor extends TextEditorLocators {
    public TextEditor() {
        check.isElementDisplayed(toolbar, 15);
        log.info("New document window has been displayed.");
    }

    @Step("Click on scale button")
    public ScaleModal clickOnScaleButton() {
        click.clickOnVisibleElement(scaleButton, 15);
        log.info("Scale button has been clicked.");

        return new ScaleModal();
    }

    @Step("Check scale")
    public TextEditor checkScale(DesktopModel desktopModel) {
        String expectedScale = getExpectedDocumentScaleFromDataProvider(desktopModel);
        String actualScale = get.getAttributeFromElement(scaleButton, "title");

        assertThat(actualScale)
                .as("Scale check after edit")
                .isEqualTo(expectedScale);

        log.info("Actual scale meets expected value.");

        return this;
    }

    @Step("Click on document name label")
    public TextEditor clickOnDocumentNameLabel() {
        By locator = By.xpath("//XCUIElementTypeWindow/XCUIElementTypeStaticText");
        check.isNumberOfElementsEqualTo(locator, 1, 50, 15);

        WebElement label = getWebDriver().getDriver().findElement(locator);
        int elementWidth = label.getSize().getWidth();
        int width = (int) (-0.3 * elementWidth);
        int height = 0;
//TODO: podziel te akcje na etapy: 1) hover + sprawdzenie czy najechal na element, jako ze ta czynnosc jest wadliwa 2) klik + escape
        Actions actions = new Actions(getWebDriver().getDriver());
        actions.moveToElement(label, width, height)
                .pause(Duration.ofSeconds(7))
                .click()
                .sendKeys(Keys.ESCAPE)
                .perform();

        log.info("Document name label has been clicked.");

        return this;
    }

    @Step("Check document name before edit")
    public TextEditor checkDocumentNameBeforeEdit() {
        checkDocumentName("bez nazwy", "before");

        return this;
    }

    @Step("Check document name after edit")
    public TextEditor checkDocumentNameAfterEdit(DesktopModel desktopModel) {
        String expectedDocumentName = getExpectedFileNameFromDataProvider(desktopModel);
        checkDocumentName(expectedDocumentName, "after");

        return this;
    }

    private String getExpectedFileNameFromDataProvider(DesktopModel desktopModel) {
        return desktopModel.getFileName();
    }

    private void checkDocumentName(String expectedDocumentName, String stage) {
        String actualDocumentName = get.getValueFromElement(documentNameLabel);
        assertThat(actualDocumentName)
                .as("Document name before edit check")
                .isEqualTo(expectedDocumentName);

        log.info("Document name {} edit meets expected value.", stage);
    }

    private String getExpectedDocumentScaleFromDataProvider(DesktopModel desktopModel) {
        return desktopModel.getDocumentScale();
    }
}
