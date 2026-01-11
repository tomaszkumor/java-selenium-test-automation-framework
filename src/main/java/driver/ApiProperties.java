package driver;

import static config.TestConfig.CONFIG;

public class ApiProperties {
    public static boolean debugMode() {
        return Boolean.parseBoolean(CONFIG.getProperty("api.debug"));
    }
}