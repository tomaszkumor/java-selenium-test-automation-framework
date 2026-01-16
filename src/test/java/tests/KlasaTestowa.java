package tests;

import baseTest.BaseTest;
import listeners.DriverListener;
import models.desktop.landingPage.LandingPage;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

@Listeners(value = {DriverListener.class})
public class KlasaTestowa extends BaseTest {
    @Test
    public void metoda() {
        new LandingPage()
                .clickOnLanguagesDropDown()
                .checkAvailableLanguages();
    }
}
