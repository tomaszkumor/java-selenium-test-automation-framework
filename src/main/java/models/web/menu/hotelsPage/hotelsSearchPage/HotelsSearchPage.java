package models.web.menu.hotelsPage.hotelsSearchPage;

import models.web.landingPage.LandingPage;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static utils.logger.Log4J.log;

public class HotelsSearchPage extends HotelsSearchPageLocators {
    public HotelsSearchPage() {
        browser.waitForPageLoaded(15);
        checkUrl();
        hideAd();
        log.info("Hotels search page has been displayed.");
    }

    private void checkUrl() {
        String expectedUrl = "https://phptravels.net/hotels";
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
