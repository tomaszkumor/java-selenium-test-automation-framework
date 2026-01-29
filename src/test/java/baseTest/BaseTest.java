package baseTest;

import config.TestStackProperties;
import driver.ApiProperties;
import driver.MobileProperties;
import driver.WebProperties;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.ios.IOSDriver;
import lombok.SneakyThrows;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;

import java.time.Duration;

import static driver.BaseDriver.getWebDriver;
import static utils.logger.Log4J.log;

public class BaseTest {
    @BeforeMethod
    public void beforeMethod() {
        String framework = getFramework();
        logAll(framework);

        switch (framework) {
            case "web" -> {
                getWebDriver().setDriver();
                getWebDriver().getDriver().manage().timeouts().implicitlyWait(Duration.ofSeconds(25));
                runBrowserWithUrl();
            }
            case "mobile" -> {
                getWebDriver().setDriver();
                getWebDriver().getDriver().manage().timeouts().implicitlyWait(Duration.ofSeconds(25));
            }
        }
    }

    @SneakyThrows
    @BeforeClass
    public void beforeClass() {
        String framework = getFramework();
        switch (framework) {
            case "mobile" -> Runtime.getRuntime().exec("adb shell pm clear org.wikipedia.alpha");
        }
    }

    @AfterMethod
    public void afterMethod() {
        closeDriver();
    }

    private void closeDriver() {
        String framework = getFramework();
        switch (framework) {
            case "web" -> {
                if (!WebProperties.isDebugMode()) {
                    terminateDriver();
                    log.info("Driver has been terminated.");
                } else {
                    log.info("Driver has not been terminated due to debug mode.");
                }
            }
            case "mobile" -> {
                if (!MobileProperties.isDebugMode()) {
                    terminateApplication();
                    terminateDriver();
                    log.info("Mobile driver has been terminated.");
                } else {
                    log.info("Mobile driver has not been terminated due to debug mode.");
                }
            }
        }
    }

    private void terminateDriver() {
        getWebDriver().getDriver().quit();
    }

    private void terminateApplication() {
        String applicationName = getApplicationName();
        String mobileSystem = getMobileSystem();
        switch (mobileSystem) {
            case "android" -> ((AndroidDriver) getWebDriver().getDriver()).terminateApp(applicationName);
            case "ios" -> ((IOSDriver) getWebDriver().getDriver()).terminateApp(applicationName);
        }
    }

    private void runBrowserWithUrl() {
        String url = TestStackProperties.getWebUrl();

        getWebDriver().getDriver().manage().deleteAllCookies();
        getWebDriver().getDriver().get(url);
        log.info("Browser has been opened.");
    }

    private void logAll(String framework) {
        logAllForEachFramework(framework);

        switch (framework) {
            case "web" -> logAllForWeb();
            case "mobile" -> logAllForMobile();
            case "api" -> logAllForApi();
        }
    }

    private void logAllForEachFramework(String framework) {
        log.info("ENV: " + TestStackProperties.getEnvironment());
        log.info("FRAMEWORK: " + framework.toUpperCase());
    }

    private void logAllForWeb() {
        log.info("HEADLESS MODE: " + WebProperties.isHeadlessMode());
        log.info("GRID MODE: " + WebProperties.isGridMode());
        log.info("DEBUG MODE: " + WebProperties.isDebugMode());
    }

    private void logAllForApi() {
        log.info("DEBUG MODE: " + ApiProperties.isDebugMode());
    }

    private void logAllForMobile() {
        String system = MobileProperties.getMobileSystem();
        log.info("SYSTEM: " + system);
        log.info("DEBUG MODE: " + MobileProperties.isDebugMode());

        switch (system) {
            case "android" -> log.info("ANDROID PATH: " + TestStackProperties.getAndroidPath());
            case "ios" -> log.info("IOS PATH: " + TestStackProperties.getIosPath());
        }
    }

    private String getFramework() {
        return TestStackProperties.getFramework();
    }

    private String getMobileSystem() {
        return MobileProperties.getMobileSystem();
    }

    private String getApplicationName() {
        return TestStackProperties.getApplicationPackage();
    }
}
