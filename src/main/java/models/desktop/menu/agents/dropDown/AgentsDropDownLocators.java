package models.desktop.menu.agents.dropDown;

import models.desktop.navigation.NavigationHeaderAndFooter;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class AgentsDropDownLocators extends NavigationHeaderAndFooter {
    @FindBy(xpath = "//div[@class = 'nav-item--right']//li[contains(@class, 'nav-item')][3]//ul[contains(@class, 'dropdown-menu')]")
    WebElement agentsDropDown;
}
