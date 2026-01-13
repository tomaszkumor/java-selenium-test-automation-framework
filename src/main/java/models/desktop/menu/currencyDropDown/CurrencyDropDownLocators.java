package models.desktop.menu.currencyDropDown;

import models.desktop.navigation.NavigationHeaderAndFooter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class CurrencyDropDownLocators extends NavigationHeaderAndFooter {
    @FindBy(xpath = "//div[@class = 'nav-item--right']//li[contains(@class, 'nav-item')][2]//ul[contains(@class, 'dropdown-menu')]")
    WebElement currencyDropDown;
}
