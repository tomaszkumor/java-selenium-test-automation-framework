package models.mobile.menu.savedPage;

import models.mobile.menu.savedPage.readingListPage.ReadingListPage;
import models.mobile.menu.savedPage.readingListPage.settingsModal.SettingsModal;
import models.mobile.menu.savedPage.recommendedReadingListOnboardingPage.RecommendedReadingListOnboardingPage;
import models.mobile.menu.savedPage.specificResultsListPage.SpecificResultsListPage;

import static utils.logger.Log4J.log;

public class SavedPage extends SavedPageLocators {
    public SavedPage() {
        check.isElementDisplayed(filtersButton, 15);
        log.info("Saved page is displayed.");
    }

    public SpecificResultsListPage tapOnSpecificSavedResultsList() {
        mobile.tapOnElement(specificList, 15);
        log.info("Specific list button has been tapped.");

        return new SpecificResultsListPage();
    }

    public RecommendedReadingListOnboardingPage tapOnGetStartedButton() {
        mobile.tapOnElement(getStartedButton, 15);
        log.info("Get started button has been tapped.");

        return new RecommendedReadingListOnboardingPage();
    }

    public ReadingListPage tapOnDiscoverListButton() {
        mobile.tapOnElement(discoverListButton, 15);
        log.info("Discover list button has been tapped.");

        return new ReadingListPage();
    }
}
