package config;

import static config.TestConfig.CONFIG;

public class TestStackProperties {
    private static final String ENVIRONMENT = "environment";
    private static final String FRAMEWORK = "framework";
    private static final String WEB_URL = "web_url";
    private static final String API_URL = "api_url";
    private static final String ONEAPP_ANDROID_PATH = "oneapp_android_path";
    private static final String ONEAPP_IOS_PATH = "oneapp_ios_path";

    public static String getEnvironment() {
        return CONFIG.getProperty(ENVIRONMENT);
    }

    public static String getFramework() {
        return CONFIG.getProperty(FRAMEWORK);
    }

    public static String getWebUrl() {
        return CONFIG.getProperty(WEB_URL);
    }

    public static String getApiUrl() {
        return CONFIG.getProperty(API_URL);
    }

    public static String getOneappAndroidPath() {
        return CONFIG.getProperty(ONEAPP_ANDROID_PATH);
    }

    public static String getOneappIosPath() {
        return CONFIG.getProperty(ONEAPP_IOS_PATH);
    }
}