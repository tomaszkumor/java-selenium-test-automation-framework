package tests;

import baseTest.BaseTest;
import dataProviders.dataProviders.landingPage.LandingPageDP;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import listeners.DriverListener;
import models.desktop.landingPage.LandingPage;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

@Listeners(value = {DriverListener.class})
public class LandingPageTests extends BaseTest {
    @Test(dataProvider = "searchForFlights", dataProviderClass = LandingPageDP.class)
    public void searchForFlights(LandingPageModel landingPageModel) {
        new LandingPage()
                .clickOnFlightsTab()
                .selectFlightDestination(landingPageModel)
                .selectCabinClass(landingPageModel)
                .selectDepartureLocation(landingPageModel)
                .selectArrivalLocation(landingPageModel)
                .selectDepartureDate(landingPageModel)
                .selectReturnDate(landingPageModel)
                .selectTravellers(landingPageModel)
                .clickOnSearchButton();
    }
}
