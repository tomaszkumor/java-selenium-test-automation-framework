package models.mobile.menu.discoverPage;

import models.mobile.menu.discoverPage.discoverSearchPage.DiscoverSearchPage;

import static utils.logger.Log4J.log;

public class DiscoverPage extends DiscoverPageLocators {
    public DiscoverPage() {
        check.isElementDisplayed(searchInput, 15);
        log.info("Discover page is displayed.");
    }

    public DiscoverSearchPage tapOnSearchInput() {
        mobile.tapOnElement(searchInput, 15);
        log.info("Search input has been tapped.");

        return new DiscoverSearchPage();
    }
}
