package tests;

import baseTest.BaseTest;
import lombok.SneakyThrows;
import models.openFileWindow.OpenFileWindow;
import org.testng.annotations.Test;


public class SmokeTest extends BaseTest {
    @Test
    @SneakyThrows
    public void test() {
        new OpenFileWindow()
                .clickOnNewDocumentButton();

        Thread.sleep(15000);
    }

    @Test
    @SneakyThrows
    public void test2() {
        Thread.sleep(15000);
    }

}
