package models.openFileWindow;

import static org.assertj.core.api.Assertions.assertThat;
import static utils.logger.Log4J.log;

public class OpenFileWindow extends OpenFileWindowLocators {
    public OpenFileWindow() {
        assertThat(check.isElementDisplayed(openFileWindow, 15)).isTrue();
        log.info("Open file window has been displayed.");
    }

    public void clickOnNewDocumentButton() {
        click.clickOnElement(newDocumentButton, 15);
        log.info("New document button has been clicked.");
    }
}
