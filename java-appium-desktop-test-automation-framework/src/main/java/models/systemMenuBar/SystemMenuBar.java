package models.systemMenuBar;

import io.qameta.allure.Step;
import lombok.NoArgsConstructor;
import models.systemMenuBar.filesModal.FilesModal;
import models.systemMenuBar.pagesModal.PagesModal;

import static utils.logger.Log4J.log;

@NoArgsConstructor
public class SystemMenuBar extends SystemMenuBarLocators {
    @Step("Click on pages button")
    public PagesModal clickOnPagesButton() {
        click.clickOnVisibleElement(pagesButton, 15);
        log.info("System menu bar Pages button has been clicked.");

        return new PagesModal();
    }

    @Step("Click on files button")
    public FilesModal clickOnFilesButton() {
        click.clickOnVisibleElement(filesButton, 15);
        log.info("System menu bar Files button has been clicked.");

        return new FilesModal();
    }
}
