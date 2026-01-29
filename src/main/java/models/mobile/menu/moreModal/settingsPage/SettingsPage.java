package models.mobile.menu.moreModal.settingsPage;

import models.mobile.menu.moreModal.settingsPage.themesModal.ThemesModal;

import static utils.logger.Log4J.log;

public class SettingsPage extends SettingsPageLocators {
    public SettingsPage() {
        check.isElementDisplayed(settingsToolbar, 15);
        log.info("Settings page is displayed.");
    }

    public ThemesModal tapOnThemesButton() {
        check.isElementDisplayed(themesButton, 15);
        log.info("Themes button has been tapped.");

        mobile.tapOnElement(themesButton, 15);

        return new ThemesModal();
    }
}
