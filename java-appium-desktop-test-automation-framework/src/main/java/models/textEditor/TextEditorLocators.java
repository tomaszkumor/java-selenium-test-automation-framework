package models.textEditor;

import models.systemMenuBar.SystemMenuBar;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class TextEditorLocators extends SystemMenuBar {
    @FindBy(xpath = "TBD")
    WebElement sheet;
    // AXRole = 'AXScrollArea', AXAutomationType = 'Scroll View', AXClassName = 'TSKScrollView', AXIdentifier = '_NS:21'
    @FindBy(xpath = "TBD")
    WebElement styleOptionsButton;
    // AXRole = 'AXRadioButton', AXAutomationType = 'Radio Button', AXClassName = '_NSToolbarSegmentedViewSegmentProxy', AXDescription = 'Format'
}
