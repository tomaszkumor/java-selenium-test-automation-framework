package tests;

import baseTest.BaseTest;
import dataProviders.dataProviders.DesktopDP;
import dataProviders.dataProvidersModels.DesktopModel;
import io.qameta.allure.Description;
import models.numbers.openFileWindow.OpenFileWindow;
import org.testng.annotations.Test;


public class NumbersTests extends BaseTest {
    @Test(dataProvider = "desktop", dataProviderClass = DesktopDP.class)
    @Description("Open settings and change font size")
    public void openSettingsAndChangeFontSize(DesktopModel desktopModel) {
        new OpenFileWindow()
                .clickOnNewDocumentButton()
                .clickOnBasicThemesButton()
                .selectEmptyTheme()
                .clickOnCreateButton()
                .clickOnNumbersButton()
                .clickOnSettingsButton()
                .clickOnFontSizeButton()
                .selectFontSize(desktopModel)
                .checkFontSizeAfterEdit(desktopModel);
    }

    @Test(dataProvider = "desktop", dataProviderClass = DesktopDP.class)
    @Description("Change document name")
    public void changeDocumentName(DesktopModel desktopModel) {
        new OpenFileWindow()
                .deleteFileIfNecessary(desktopModel)
                .clickOnNewDocumentButton()
                .clickOnBasicThemesButton()
                .selectEmptyTheme()
                .clickOnCreateButton()
                .clickOnDocumentNameLabel()
                .checkDocumentNameBeforeEdit()
                .clickOnFilesButton()
                .clickOnChangeNameButton()
                .changeName(desktopModel)
                .closeChangeNameModal()
                .checkDocumentNameAfterEdit(desktopModel);
    }

    @Test(dataProvider = "desktop", dataProviderClass = DesktopDP.class)
    @Description("Change document scale")
    public void changeDocumentScale(DesktopModel desktopModel) {
        new OpenFileWindow()
                .clickOnNewDocumentButton()
                .clickOnBasicThemesButton()
                .selectEmptyTheme()
                .clickOnCreateButton()
                .clickOnScaleButton()
                .selectScale(desktopModel)
                .checkScale(desktopModel);
    }
}
