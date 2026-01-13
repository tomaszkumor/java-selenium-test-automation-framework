package actions;

import com.google.common.collect.ImmutableMap;
import driver.MobileProperties;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.nativekey.KeyEvent;
import io.appium.java_client.ios.IOSDriver;
import lombok.SneakyThrows;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Pause;
import org.openqa.selenium.interactions.PointerInput;
import org.openqa.selenium.interactions.Sequence;
import org.openqa.selenium.remote.RemoteWebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static driver.BaseDriver.getWebDriver;
import static utils.keyMapper.KeyMapper.mapper;
import static utils.logger.Log4J.log;
import static utils.screenshot.Screenshot.attachScreenshot;

public class MobileActions extends BaseActions {
    public void tapOnElement(WebElement element) {
        String mobileSystem = getMobileSystem();

        switch (mobileSystem) {
            case "android" -> {
                try {
                    getAndroidDriver().executeScript("mobile: clickGesture",
                            ImmutableMap.of("elementId", ((RemoteWebElement) element).getId()));
                } catch (Exception e) {
                    attachScreenshot();
                    throw new RuntimeException("Unable to tap on element: " + e.getMessage());
                }
            }

            case "ios" -> {
                try {
                    Map<String, Object> params = new HashMap<>();
                    params.put("elementId", ((RemoteWebElement) element).getId());
                    params.put("x", 0);
                    params.put("y", 0);
                    getIOSDriver().executeScript("mobile: tap", params);
                } catch (Exception e) {
                    attachScreenshot();
                    throw new RuntimeException("Unable to tap on element: " + e.getMessage());
                }
            }
        }
    }

    public void tapOnElement(int width, int height) {
        try {
            PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
            Sequence tap = new Sequence(finger, 1);
            tap.addAction(finger.createPointerMove(Duration.ofMillis(0), PointerInput.Origin.viewport(), width, height));
            tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
            tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

            String mobileSystem = getMobileSystem();
            switch (mobileSystem) {
                case "android" -> getAndroidDriver().perform(List.of(tap));
                case "ios" -> getIOSDriver().perform(List.of(tap));
            }

        } catch (Exception e) {
            attachScreenshot();
            throw new RuntimeException("Unable to tap on element with coordinates: " + e.getMessage());
        }
    }

    public void pressKey(WebElement element, String key) {
        String mobileSystem = getMobileSystem();

        switch (mobileSystem) {
            case "android" -> {
                try {
                    getAndroidDriver().pressKey(new KeyEvent(mapper(key)));
                } catch (Exception e) {
                    attachScreenshot();
                    throw new RuntimeException("Unable to press key on screen keyboard: " + e.getMessage());
                }
            }

            case "ios" -> {
                try {
                    element.sendKeys(key);
                } catch (Exception e) {
                    attachScreenshot();
                    throw new RuntimeException("Unable to press key on screen keyboard: " + e.getMessage());
                }
            }
        }
    }

    public void tapLongOnElement(WebElement element) {
        String mobileSystem = getMobileSystem();

        switch (mobileSystem) {
            case "android" -> {
                try {
                    getAndroidDriver().executeScript("mobile: longClickGesture",
                            ImmutableMap.of(
                                    "elementId", ((RemoteWebElement) element).getId(),
                                    "duration", 2000)
                    );
                } catch (Exception e) {
                    attachScreenshot();
                    throw new RuntimeException("Unable to long tap on element: " + e.getMessage());
                }
            }

            case "ios" -> {
                try {
                    Map<String, Object> params = new HashMap<>();
                    params.put("elementId", ((RemoteWebElement) element).getId());
                    params.put("duration", 5);
                    getIOSDriver().executeScript("mobile: touchAndHold", params);
                } catch (Exception e) {
                    attachScreenshot();
                    throw new RuntimeException("Unable to long tap on element: " + e.getMessage());
                }
            }
        }
    }

    public void scrollDown() {
        try {
            Dimension size = getWindowSize();
            int startX = size.width / 2;
            int startY = (int) (size.height * 0.7);
            int endY = (int) (size.height * 0.2);

            performScroll(startX, startY, endY);
        } catch (Exception e) {
            attachScreenshot();
            throw new RuntimeException("Unable to scroll down: " + e.getMessage());
        }
    }

    public void scrollUp() {
        try {
            Dimension size = getWindowSize();
            int startX = size.width / 2;
            int startY = (int) (size.height * 0.2);
            int endY = (int) (size.height * 0.7);

            performScroll(startX, startY, endY);
        } catch (Exception e) {
            attachScreenshot();
            throw new RuntimeException("Unable to scroll up: " + e.getMessage());
        }
    }

    public void hideKeyboard() {
        try {
            PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
            Sequence tap = new Sequence(finger, 1);
            tap.addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), 250, 250));
            tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
            tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
            tap.addAction(new Pause(finger, Duration.ofMillis(1000)));

            String mobileSystem = getMobileSystem();
            switch (mobileSystem) {
                case "android" -> getAndroidDriver().perform(Collections.singletonList(tap));
                case "ios" -> getIOSDriver().perform(Collections.singletonList(tap));
            }

        } catch (Exception e) {
            attachScreenshot();
            throw new RuntimeException("Unable to hide keyboard: " + e.getMessage());
        }

        log.info("Keyboard has been hidden.");
    }

    @SneakyThrows
    public void sendKeysToWebElement(WebElement element, String text) {
        new WebDriverWait(getWebDriver().getDriver(), Duration.ofSeconds(10))
                .until(ExpectedConditions.visibilityOf(element));

        try {
            element.sendKeys(text);
        } catch (Exception e) {
            attachScreenshot();
            throw new RuntimeException("Unable to send keys to element: " + e.getMessage());
        }
    }

    private void performScroll(int startX, int startY, int endY) {
        PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger");
        Sequence tap = new Sequence(finger, 1);
        tap.addAction(finger.createPointerMove(Duration.ofMillis(0), PointerInput.Origin.viewport(), startX, startY));
        tap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
        tap.addAction(finger.createPointerMove(Duration.ofMillis(0), PointerInput.Origin.viewport(), startX, endY));
        tap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

        String mobileSystem = getMobileSystem();
        switch (mobileSystem) {
            case "android" -> getAndroidDriver().perform(List.of(tap));
            case "ios" -> getIOSDriver().perform(List.of(tap));
        }
    }

    private Dimension getWindowSize() {
        String mobileSystem = getMobileSystem();

        return switch (mobileSystem) {
            case "android" -> getAndroidDriver().manage().window().getSize();
            case "ios" -> getIOSDriver().manage().window().getSize();
            default -> null;
        };
    }

    private AndroidDriver getAndroidDriver() {
        return ((AndroidDriver) getWebDriver().getDriver());
    }

    private IOSDriver getIOSDriver() {
        return ((IOSDriver) getWebDriver().getDriver());
    }

    private String getMobileSystem() {
        return MobileProperties.getSystem().toLowerCase();
    }
}
