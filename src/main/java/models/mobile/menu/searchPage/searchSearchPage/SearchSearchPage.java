package models.mobile.menu.searchPage.searchSearchPage;

import dataProviders.dataProvidersModels.mobile.wikiAlphaModel.WikiAlphaModel;
import models.mobile.generic.genericSearchPage.GenericSearchPage;
import models.mobile.menu.searchPage.searchSpecificSearchResultPage.SearchSpecificSearchResultPage;

import static utils.logger.Log4J.log;

public class SearchSearchPage extends SearchSearchPageLocators {
    public SearchSearchPage() {
        check.isElementDisplayed(searchInput, 15);
        log.info("Search search page is displayed.");
    }

    public SearchSearchPage typePhraseToSearchBar(WikiAlphaModel wikiAlphaModel) {
        String expectedPhrase = getExpectedPhraseFromDataProvider(wikiAlphaModel);
        new GenericSearchPage().typePhraseToSearchBar(expectedPhrase);

        return this;
    }

    public SearchSpecificSearchResultPage tapOnSpecificSearchResult(WikiAlphaModel wikiAlphaModel) {
        String expectedPhrase = getExpectedPhraseFromDataProvider(wikiAlphaModel);
        new GenericSearchPage().tapOnSpecificSearchResult(expectedPhrase);

        return new SearchSpecificSearchResultPage();
    }

    private String getExpectedPhraseFromDataProvider(WikiAlphaModel wikiAlphaModel) {
        return wikiAlphaModel.getSearchModel().getSearchPhrase();
    }
}
