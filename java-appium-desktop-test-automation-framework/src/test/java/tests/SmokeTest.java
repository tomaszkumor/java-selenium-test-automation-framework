package tests;

import baseTest.BaseTest;
import models.openFileWindow.OpenFileWindow;
import org.testng.annotations.Test;


public class SmokeTest extends BaseTest {
    @Test()
    public void openSettingsAndChangeFontSize() {
        new OpenFileWindow()
                .clickOnNewDocumentButton()
                .clickOnBasicThemesButton()
                .selectEmptyTheme()
                .clickOnCreateButton()
                .clickOnPagesButton()
                .clickOnSettingsButton()
                .clickOnFontSizeButton()
                .selectFontSize("14")
                .checkFontSizeAfterEdit("14");

        //TODO: wprowadz w DP losowanie liczby z zakresu 11-16
    }

    @Test()
    public void changeDocumentName() {
        new OpenFileWindow()
                .deleteFileIfNecessary("huehue")
                .clickOnNewDocumentButton()
                .clickOnBasicThemesButton()
                .selectEmptyTheme()
                .clickOnCreateButton()
                .clickOnDocumentNameLabel()
                .checkDocumentNameBeforeEdit()
                .clickOnFilesButton()
                .clickOnChangeNameButton()
                .changeName("huehue")
                .closeChangeNameModal()
                .checkDocumentNameAfterEdit("huehue");
    }

    @Test()
    public void changeDocumentScale() {
        new OpenFileWindow()
                .clickOnNewDocumentButton()
                .clickOnBasicThemesButton()
                .selectEmptyTheme()
                .clickOnCreateButton()
                .clickOnScaleButton()
                .selectScale("100%")
                .checkScale("100%");
    }
//todo: zrob obsluge drugiej aplikacji w zaleznosci od nazwy
}
