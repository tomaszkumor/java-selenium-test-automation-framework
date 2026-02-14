package driver;

import config.TestStackProperties;
import io.appium.java_client.mac.options.Mac2Options;

public class DesktopCapabilitiesManager {
    public Mac2Options setMacCapabilities() {
        String applicationBundleId = setApplicationBundleId();
        Mac2Options options = new Mac2Options()
                .setPlatformName("macOS")
                .setAutomationName("mac2")
                .setBundleId(applicationBundleId);

        options.setCapability("deviceName", "Mac");

        return options;
    }

    public static String setApplicationBundleId() {
        String applicationBundleId = DesktopProperties.getApplication().toLowerCase();

        return switch(applicationBundleId) {
            case "pages" -> TestStackProperties.getBundleIdPages();
            case "numbers" -> TestStackProperties.getBundleIdNumbers();
            default -> null;
        };
    }

    public static String setApplicationName() {
        String applicationBundleId = DesktopProperties.getApplication().toLowerCase();

        return switch(applicationBundleId) {
            case "pages" -> TestStackProperties.getApplicationNamePages();
            case "numbers" -> TestStackProperties.getApplicationNameNumbers();
            default -> null;
        };
    }
}
