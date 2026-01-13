package models.desktop.landingPage;

import org.testng.Assert;

import static utils.logger.Log4J.log;

public class LandingPage extends LandingPageLocators {
    public LandingPage() {
        browser.waitForPageLoaded();
        checkUrl();
        log.info("Landing page has been displayed.");
    }

    private void checkUrl() {
        String expectedUrl = "https://phptravels.net/";
        String actualUrl = get.getCurrentUrl();

        Assert.assertEquals(actualUrl, expectedUrl, "URL mismatch.");
    }
}
