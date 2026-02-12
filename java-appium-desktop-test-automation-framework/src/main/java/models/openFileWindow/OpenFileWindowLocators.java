package models.openFileWindow;

import models.systemMenuBar.SystemMenuBar;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class OpenFileWindowLocators extends SystemMenuBar {
    @FindBy(xpath = "//*[@AXClassName = 'FI_TSplitView']")
    WebElement openFileWindow;
    // AXRole = 'AXSplitGroup', AXAutomationType = 'Split Group', AXClassName = 'FI_TSplitView'
    @FindBy(xpath = "//*[@AXIdentifier = 'NewDocumentButton']")
    WebElement newDocumentButton;
    // AXRole = 'AXButton', AXAutomationType = 'Button', AXClassName = 'NSButtonCell', AXIdentifier = 'NewDocumentButton'
}
