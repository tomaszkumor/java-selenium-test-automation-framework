package models.desktop.landingPage;

import lombok.SneakyThrows;
import models.desktop.landingPage.searchBarCars.SearchBarCars;
import models.desktop.landingPage.searchBarFlights.SearchBarFlights;
import models.desktop.landingPage.searchBarHotels.SearchBarHotels;
import models.desktop.landingPage.searchBarTours.SearchBarTours;
import models.desktop.landingPage.searchBarVisa.SearchBarVisa;
import org.testng.Assert;

import static utils.logger.Log4J.log;

public class LandingPage extends LandingPageLocators {
    public LandingPage() {
        browser.waitForPageLoaded();
        checkUrl();
        hideAd();
        log.info("Landing page has been displayed.");
    }

    public SearchBarFlights clickOnFlightsTab() {
        click.clickOnElement(tabFlights, 15);
        log.info("Flights tab has been clicked.");

        return new SearchBarFlights();
    }

    public SearchBarHotels clickOnHotelsTab() {
        click.clickOnElement(tabHotels, 15);
        log.info("Hotels tab has been clicked.");

        return new SearchBarHotels();
    }

    public SearchBarTours clickOnToursTab() {
        click.clickOnElement(tabTours, 15);
        log.info("Tours tab has been clicked.");

        return new SearchBarTours();
    }

    public SearchBarCars clickOnCarsTab() {
        click.clickOnElement(tabCars, 15);
        log.info("Cars tab has been clicked.");

        return new SearchBarCars();
    }

    public SearchBarVisa clickOnVisaTab() {
        click.clickOnElement(tabVisa, 15);
        log.info("Visa tab has been clicked.");

        return new SearchBarVisa();
    }

    private void checkUrl() {
        String expectedUrl = "https://phptravels.net/";
        String actualUrl = get.getCurrentUrl();

        Assert.assertEquals(actualUrl, expectedUrl, "URL mismatch.");
    }
//TODO: gdy jest zamkniety to przy ponownej probie zamkniecia czeka 10 sekund z displayem. popraw to na presentBylocator, albo wrzuc flage statyczna
    private void hideAd() {
        if (check.isElementDisplayed(hideAdButton, 10)) {
            click.clickOnVisibleElement(hideAdButton, 10);
            log.info("Hide ad button has been clicked.");
        }
    }
}
