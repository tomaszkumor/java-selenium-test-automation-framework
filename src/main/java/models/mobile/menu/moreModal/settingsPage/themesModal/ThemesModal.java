package models.mobile.menu.moreModal.settingsPage.themesModal;

import constants.mobile.Theme;
import dataProviders.dataProvidersModels.mobile.wikiAlphaModel.WikiAlphaModel;
import utils.tipKiller.TipKiller;
import models.mobile.menu.moreModal.settingsPage.SettingsPage;
import org.openqa.selenium.WebElement;

import static utils.logger.Log4J.log;

public class ThemesModal extends ThemesModalLocators {
    public ThemesModal() {
        check.isElementDisplayed(themesHeader, 15);
        log.info("Themes modal is displayed.");
    }

    public ThemesModal tapOnFitToSystemThemeButton() {
        mobile.tapOnElement(fitToSystemThemeSwitch, 15);
        log.info("Fit do system theme switch has been tapped.");

        return this;
    }

    public ThemesModal changeTheme(WikiAlphaModel wikiAlphaModel) {
        Theme theme = wikiAlphaModel.getMoreModel().getTheme();

        WebElement themeButton = switch (theme) {
            case BLACK -> changeThemeBlackButton;
            case DARK -> changeThemeDarkButton;
            case LIGHT -> changeThemeLightButton;
            case SEPIA -> changeThemeSepiaButton;
        };

        mobile.tapOnElement(themeButton, 15);
        log.info("{} theme button has been tapped", theme.getName());

        return this;
    }

    public SettingsPage closeThemesModal() {
        TipKiller.closeThemesModal(themesHeader);
//TODO: wolno to sprawdza, zobacz czemu
        return new SettingsPage();
    }
}
