package models.desktop.flightPage.searchPage;

import models.desktop.navigation.NavigationHeaderAndFooter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class SearchPageLocators extends NavigationHeaderAndFooter {
    @FindBy(xpath = "//button[@id = 'cookie_stop']")
    WebElement hideAdButton;
}
