package models.mobile.menu.searchPage;

import utils.tipKiller.TipKiller;
import models.mobile.menu.searchPage.searchSearchPage.SearchSearchPage;

import static utils.logger.Log4J.log;

public class SearchPage extends SearchPageLocators {
    public SearchPage() {
        closeTip();
        check.isElementDisplayed(searchInput, 15);
        log.info("Search page is displayed.");
    }

    public SearchSearchPage tapOnSearchInput() {
        mobile.tapOnElement(searchInput, 15);
        log.info("Search input has been tapped.");

        return new SearchSearchPage();
    }

    private void closeTip() {
        TipKiller.closeSearchPageTip(toolbarHeader);
    }
}
