package models.desktop.flightPage.searchPage;

import models.desktop.landingPage.LandingPage;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static utils.logger.Log4J.log;

public class SearchPage extends SearchPageLocators {
    public SearchPage() {
        browser.waitForPageLoaded(30);
        checkUrl();
        hideAd();
        log.info("Search page has been displayed.");
    }

    private void checkUrl() {
        String expectedUrl = "https://phptravels.net/flights";
        String actualUrl = get.getCurrentUrl();

        assertThat(actualUrl)
                .as("URL check")
                .contains(expectedUrl);
    }

    private void hideAd() {
        if (!LandingPage.IS_AD_CLOSED.get()) {
            if (check.isElementDisplayed(hideAdButton, 10)) {
                click.clickOnVisibleElement(hideAdButton, 10);
                log.info("Hide ad button has been clicked.");

                LandingPage.IS_AD_CLOSED.set(true);
            }
        }
    }
}
