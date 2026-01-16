package models.desktop.landingPage;

import org.testng.Assert;

import static utils.logger.Log4J.log;

public class LandingPage extends LandingPageLocators {
    public LandingPage() {
        browser.waitForPageLoaded();
        checkUrl();
        hideAd();
        log.info("Landing page has been displayed.");
    }

    private void checkUrl() {
        String expectedUrl = "https://phptravels.net/";
        String actualUrl = get.getCurrentUrl();

        Assert.assertEquals(actualUrl, expectedUrl, "URL mismatch.");
    }

    private void hideAd() {
        if(check.isElementDisplayed(hideAdButton, 10)) {
            click.clickOnVisibleElement(hideAdButton, 10);
            log.info("Hide ad button has been clicked.");
        }
    }
}
