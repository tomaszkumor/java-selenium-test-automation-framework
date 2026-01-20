package tests;

import baseTest.BaseTest;
import dataProviders.dataProviders.landingPage.LandingPageDP;
import dataProviders.dataProvidersModels.phpTravelsModel.PhpTravelsModel;
import listeners.DriverListener;
import models.desktop.landingPage.LandingPage;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

@Listeners(value = {DriverListener.class})
public class LandingPageTests extends BaseTest {
    @Test(dataProvider = "searchForFlights", dataProviderClass = LandingPageDP.class)
    public void searchForFlights(PhpTravelsModel phpTravelsModel) {
        new LandingPage()
                .clickOnFlightsTab()
                .selectFlightDestination(phpTravelsModel)
                .selectCabinClass(phpTravelsModel)
                .selectDepartureLocation(phpTravelsModel)
                .selectArrivalLocation(phpTravelsModel)
                .selectDepartureDate(phpTravelsModel)
                .selectReturnDate(phpTravelsModel)
                .selectTravellers(phpTravelsModel)
                .clickOnSearchButton();
    }

    @Test(dataProvider = "searchForHotels", dataProviderClass = LandingPageDP.class)
    public void searchForHotels(PhpTravelsModel phpTravelsModel) {
        new LandingPage()
                .clickOnHotelsTab()
                .selectCity(phpTravelsModel)
                .selectCheckInDate(phpTravelsModel)
                .selectCheckOutDate(phpTravelsModel)
                .selectAccommodation(phpTravelsModel);
    }
}
