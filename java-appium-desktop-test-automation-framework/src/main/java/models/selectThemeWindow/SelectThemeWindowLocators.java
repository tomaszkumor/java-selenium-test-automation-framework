package models.selectThemeWindow;

import models.systemMenuBar.SystemMenuBar;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class SelectThemeWindowLocators extends SystemMenuBar {
    @FindBy(xpath = "TBD")
    WebElement selectThemeWindow;
    // AXRole = 'AXScrollArea', AXAutomationType = 'Scroll View', AXClassName = 'TSApplication.TemplateChooserScrollView'
    @FindBy(xpath = "TBD")
    WebElement basicThemesHeader;
    // AXDescription = 'Podstawowe', AXIdentifier = 'sectionHeaderCell', AXRole = 'AXUnknown', AXClassName = 'TSApplication.TemplateChooserCategoryHeaderView'
    @FindBy(xpath = "TBD")
    WebElement basicThemeEmptyButton;
    // AXRole = 'AXGroup', AXAutomationType = 'Group', AXClassName = 'NSCollectionViewSupplementaryViewConcreteViewAccessibility', AXIdentifier = ''
    // wyzej jest tekst 'Pusty'; AXValue = 'Pusty', AXRoleDescription = 'tekst', AXAutomationType = 'Static Text', AXRole = 'AXStaticText', AXClassName = 'NSTextFieldCell' i jedno wstecz
}
