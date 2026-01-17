package tests;

import baseTest.BaseTest;
import dataProviders.dataProviders.landingPage.LandingPageDP;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import listeners.DriverListener;
import models.desktop.landingPage.LandingPage;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

@Listeners(value = {DriverListener.class})
public class KlasaTestowa extends BaseTest {
    @Test(dataProvider = "landingPageTest", dataProviderClass = LandingPageDP.class)
    public void metoda(LandingPageModel landingPageModel) {
        new LandingPage()
                .clickOnLanguagesDropDown()
                .checkAvailableLanguages(landingPageModel)
                .selectEnglish()
                .clickOnFlightsTab()
                .selectDepartureLocation(landingPageModel)
                .selectArrivalLocation(landingPageModel);
    }
}
