package models.desktop.landingPage;

import models.desktop.navigation.NavigationHeaderAndFooter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LandingPageLocators extends NavigationHeaderAndFooter {
    @FindBy(xpath = "//button[@id = 'cookie_stop']")
    WebElement hideAdButton;
}
