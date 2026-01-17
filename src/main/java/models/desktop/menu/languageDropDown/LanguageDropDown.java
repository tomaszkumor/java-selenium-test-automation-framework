package models.desktop.menu.languageDropDown;

import constants.Language;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import io.qameta.allure.Step;
import models.desktop.landingPage.LandingPage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static utils.logger.Log4J.log;


public class LanguageDropDown extends LanguageDropDownLocators {
    public LanguageDropDown() {
        browser.waitForPageLoaded();
        check.isElementDisplayed(languageDropDown, 10);
        log.info("Language drop down has been displayed.");
    }

    @Step("Check available languages")
    public LanguageDropDown checkAvailableLanguages(LandingPageModel landingPageModel) {
        List<String> actualLanguages = getActualLanguages();
        List<String> expectedLanguages = getExpectedLanguages(landingPageModel);
        compareLanguages(actualLanguages, expectedLanguages);

        return this;
    }

    @Step("Click on english language")
    public LandingPage selectEnglish() {
        selectLanguage(Language.EN);

        return new LandingPage();
    }

    @Step("Click on arabic language")
    public LandingPage selectArabic() {
        selectLanguage(Language.AR);

        return new LandingPage();
    }

    @Step("Click on turkish language")
    public LandingPage selectTurkish() {
        selectLanguage(Language.TR);

        return new LandingPage();
    }

    @Step("Click on russian language")
    public LandingPage selectRussian() {
        selectLanguage(Language.RU);

        return new LandingPage();
    }

    @Step("Click on french language")
    public LandingPage selectFrench() {
        selectLanguage(Language.FR);

        return new LandingPage();
    }

    @Step("Click on chinese language")
    public LandingPage selectChinese() {
        selectLanguage(Language.ZH);

        return new LandingPage();
    }

    @Step("Click on german language")
    public LandingPage selectGerman() {
        selectLanguage(Language.DE);

        return new LandingPage();
    }

    private void compareLanguages(List<String> actualLanguages, List<String> expectedLanguages) {
        assertThat(actualLanguages)
                .containsExactlyInAnyOrderElementsOf(expectedLanguages)
                .doesNotHaveDuplicates();
    }

    private List<String> getActualLanguages() {
        By languageNameLocator = By.xpath("//a[contains(@href, 'language')]/span");
        check.isNumberOfElementsGreaterThan(languageNameLocator, 0, 50, 10);

        List<String> actualLanguages = new ArrayList<>();
        for (WebElement language : languages) {
            actualLanguages.add(get.getTextFromElement(language));
        }

        return actualLanguages;
    }

    private List<String> getExpectedLanguages(LandingPageModel landingPageModel) {
        List<Language> expectedLanguagesA = getExpectedLanguagesFromDataProvider(landingPageModel);

        return expectedLanguagesA.stream().map(Language::getLanguage).toList();
    }

    private void selectLanguage(Language language) {
        WebElement languageButton = getLanguageButton(language);
        String languageName = language.getLanguage();
        click.clickOnVisibleElement(languageButton, 10);
        log.info(languageName + " language button has been clicked.");
    }

    private WebElement getLanguageButton(Language language) {
        return switch (language) {
            case EN -> englishLanguageButton;
            case AR -> arabicLanguageButton;
            case TR -> turkishLanguageButton;
            case RU -> russianLanguageButton;
            case FR -> frenchLanguageButton;
            case ZH -> chineseLanguageButton;
            case DE -> germanLanguageButton;
        };
    }

    private List<Language> getExpectedLanguagesFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getLanguages();
    }

}
