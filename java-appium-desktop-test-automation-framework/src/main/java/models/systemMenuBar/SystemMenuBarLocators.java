package models.systemMenuBar;

import basePageFactory.BasePageFactory;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class SystemMenuBarLocators extends BasePageFactory {
    @FindBy(xpath = "TBD")
    WebElement pagesButton;
    // AXAutomationType = 'Menu Bar Item', AXRole = 'AXMenuBarItem', AXClassName = 'NSMenuItem', AXIdentifier = '_NS:3534'
    @FindBy(xpath = "TBD")
    WebElement fileButton;
    // AXAutomationType = 'Menu Bar Item', AXRole = 'AXMenuBarItem', AXClassName = 'NSMenuItem', AXIdentifier = '_NS:3559'
    @FindBy(xpath = "TBD")
    WebElement editButton;
    // AXAutomationType = 'Menu Bar Item', AXRole = 'AXMenuBarItem', AXClassName = 'NSMenuItem', AXIdentifier = '_NS:3603'
    @FindBy(xpath = "TBD")
    WebElement insertButton;
    // AXAutomationType = 'Menu Bar Item', AXRole = 'AXMenuBarItem', AXClassName = 'NSMenuItem', AXIdentifier = '_NS:3606'
}
