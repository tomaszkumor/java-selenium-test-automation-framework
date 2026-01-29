package models.mobile.menu.discoverPage.discoverSearchPage;

import dataProviders.dataProvidersModels.mobile.wikiAlphaModel.WikiAlphaModel;
import models.mobile.generic.genericSearchPage.GenericSearchPage;
import models.mobile.menu.discoverPage.discoverSpecificSearchResultPage.DiscoverSpecificSearchResultPage;

import static utils.logger.Log4J.log;

public class DiscoverSearchPage extends DiscoverSearchPageLocators {
    public DiscoverSearchPage() {
        check.isElementDisplayed(searchInput, 15);
        log.info("Discover search page is displayed.");
    }

    public DiscoverSearchPage typePhraseToSearchBar(WikiAlphaModel wikiAlphaModel) {
        String expectedPhrase = wikiAlphaModel.getDiscoveryModel().getSearchPhrase();
        new GenericSearchPage().typePhraseToSearchBar(expectedPhrase);

        return this;
    }

    public DiscoverSpecificSearchResultPage tapOnSpecificSearchResult(WikiAlphaModel wikiAlphaModel) {
        String expectedPhrase = wikiAlphaModel.getDiscoveryModel().getSearchPhrase();
        new GenericSearchPage().tapOnSpecificSearchResult(expectedPhrase);

        return new DiscoverSpecificSearchResultPage();
    }
}
