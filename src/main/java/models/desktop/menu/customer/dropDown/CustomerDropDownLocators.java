package models.desktop.menu.customer.dropDown;

import models.desktop.navigation.NavigationHeaderAndFooter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class CustomerDropDownLocators extends NavigationHeaderAndFooter {
    @FindBy(xpath = "//div[@class = 'nav-item--right']//li[contains(@class, 'nav-item')][4]//ul[contains(@class, 'dropdown-menu')]")
    WebElement customerDropDown;
}
