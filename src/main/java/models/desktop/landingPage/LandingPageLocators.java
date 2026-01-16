package models.desktop.landingPage;

import models.desktop.navigation.NavigationHeaderAndFooter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LandingPageLocators extends NavigationHeaderAndFooter {
    @FindBy(xpath = "//button[@id = 'cookie_stop']")
    WebElement hideAdButton;
    @FindBy(xpath = "//ul[@id = 'tab']//button[@data-bs-target = '#tab-flights']")
    WebElement tabFlights;
    @FindBy(xpath = "//ul[@id = 'tab']//button[@data-bs-target = '#tab-hotels']")
    WebElement tabHotels;
    @FindBy(xpath = "//ul[@id = 'tab']//button[@data-bs-target = '#tab-tours']")
    WebElement tabTours;
    @FindBy(xpath = "//ul[@id = 'tab']//button[@data-bs-target = '#tab-cars']")
    WebElement tabCars;
    @FindBy(xpath = "//ul[@id = 'tab']//button[@data-bs-target = '#tab-visa']")
    WebElement tabVisa;
}
