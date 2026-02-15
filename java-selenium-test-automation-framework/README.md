# Java - Selenium - Test Automation Framework

## Overview
This repository contains a comprehensive test automation framework built in Java, 
designed for automated testing of:
- Web application (Selenium)
- Mobile application (Appium)
- REST API (RestAssured)

This framework is intended as a **portfolio project** demonstrating practical knowledge of test automation 
architecture, design patterns, configuration management, and scalability considerations commonly used in 
real-world QA Automation projects.

## Environment Requirements

- Java 21
- Maven 3.9+
- Node.js
- Chrome/Firefox/Safari browsers (for web tests)
- Appium 3.x (for mobile tests)
- Android device with ADB enabled (for mobile tests)
- Appium UiAutomator2 (for Android) and XCUITest (for iOS) drivers installed (for mobile tests)

## How to run

### Clone repository:
```bash
git clone https://github.com/tomaszkumor/test-automation-frameworks-portfolio.git
```
### Install dependencies:
```bash
cd test-automation-frameworks-portfolio
mvn clean install
```
### Run
#### API tests:

```bash
mvn -pl java-selenium-test-automation-framework test -Dsurefire.suiteXmlFiles=src/test/resources/testSuites/api/PET_STORE.xml -Denvironment=ENV1 -Dplatform=api -Dapi.debug=false
```

#### Web tests:

```bash
mvn -pl java-selenium-test-automation-framework test -Dsurefire.suiteXmlFiles=src/test/resources/testSuites/web/PHP_TRAVELS.xml -Denvironment=ENV1 -Dplatform=web -Dweb.browser=chrome -Dweb.grid=false -Dweb.debug=false -Dweb.headless=false
```

#### Mobile tests (Android):

1. Connect your Android smartphone via USB cable to computer.
2. Start Android Debug Bridge (ADB).
```bash
adb start-server
```
3. Find your device udid.
```bash
adb devices
```
4. Let ADB to establish a connection with an Android device.
```bash
adb connect device_udid
```
5. Run Appium.
```bash
appium --use-plugins=inspector --allow-cors
```
6. Change udid in `MobileCapabilitiesManager` class in `setAndroidCapabilities` method.
```java
public UiAutomator2Options setAndroidCapabilities() {
...
.setUdid("udid")
...
}
```
7. Type command in your PowerShell/Terminal.
```bash
mvn -pl java-selenium-test-automation-framework test -Dsurefire.suiteXmlFiles=src/test/resources/testSuites/mobile/WIKI_ALPHA.xml -Denvironment=ENV1 -Dplatform=mobile -Dmobile.system=android -Dmobile.debug=false
```

> **Note:**
> Due to the lack of access to physical iOS devices in the local development environment, 
> mobile test execution is currently limited to Android devices only.


### Generate Allure report:
```bash
allure serve java-selenium-test-automation-framework/allure-results
```

## Technology stack

- **Language:** Java 21
- **Build Tool:** Maven 3.9.x
- **Test Framework:** TestNG
- **Web Automation:** Selenium 4.x.x
- **Mobile Automation:** Appium 3.x.x
- **API Automation:** RestAssured
- **Reporting:** Allure
- **Logging:** Log4j2
- **CI:** GitHub Actions (scheduled & manual execution)

## Design patterns & architectural concepts

### The framework applies multiple design patterns:

- Fluent Page Object
- Page Factory
- Singleton (driver and configuration management)
- Builder (test data and request objects)

### General architectural considerations:
- Centralized driver management
- Centralized actions management
- Clear separation of test logic and page logic
- Reusable utilities and helpers
- Scalable structure for future extensions

### API testing architectural considerations:
- POJO-based serialization/deserialization
- Independent test execution
- Possible support for E2E-style API flows (e.g. create → validate → delete resource)

### Web testing architectural considerations:
- Chrome, Firefox and Safari browsers support
- Selenium Grid support
- Parallel execution support
- Headless mode support
- Separate web Page Object models
- Explicit and implicit waits

### Mobile testing architectural considerations:
- Android and iOS platforms support
- Physical devices support
- Separate mobile Page Object models
- Explicit and implicit waits

> **Note:**  
> Mobile tests are executed on physical devices only. Simulators were intentionally not used due to 
> local hardware limitations.

## Configuration management

The framework uses **YAML-based configuration files** for runtime control.

### Configuration capabilities include:
- Test type selection: `web`, `mobile`, `api`
- Environment selection (e.g. test / staging)
- Browser settings (headless, parallel execution)
- Mobile platform selection: Android / iOS
- Environment-specific data (URLs, credentials)

Runtime behavior can be controlled via YAML configuration files
and optional Maven parameters.

## Project structure:

```
test-automation-frameworks-portfolio
 ├── java-desktop-macos-test-automation-framework
 ├── java-playwright-test-automation-framework
 ├── java-selenium-test-automation-framework
 │    ├── allure-results  
 │    ├── src
 │    │    ├── main
 │    │    │     ├── java
 │    │    │     │     ├── actions
 │    │    │     │     ├── basePageFactory
 │    │    │     │     ├── config
 │    │    │     │     ├── constants
 │    │    │     │     ├── dataProviders
 │    │    │     │     ├── driver
 │    │    │     │     ├── listeners
 │    │    │     │     ├── models
 │    │    │     │     │     ├── api
 │    │    │     │     │     ├── mobile
 │    │    │     │     │     └── web
 │    │    │     │     └── utils
 │    │    │     └── resources
 │    │    │           ├── api
 │    │    │           ├── filesPaths
 │    │    │           ├── mobileApp
 │    │    │           ├── settings
 │    │    │           ├── users
 │    │    │           └── BasicSettings.yaml
 │    │    └── test
 │    │          ├── java
 │    │          │     ├── baseTest
 │    │          │     └── tests
 │    │          │           ├── api
 │    │          │           ├── mobile
 │    │          │           └── web
 │    │          └── resources
 │    │                ├── testSuites
 │    │                │     ├── api
 │    │                │     ├── mobile
 │    │                │     └── web
 │    │                └── log4j2.xml
 │    ├── pom.xml (java-selenium-test-automation-framework module POM)
 │    └── README.md (java-selenium-test-automation-framework README file)
 ├── pom.xml (parent POM for multi-module project)
 └── README.md (main overview README file)
```

## Reporting & logging

- Allure Reports for detailed test results
- Log4j2 for structured logging
- Retry mechanism for flaky tests implemented using TestNG Retry Analyzer
- TestNG listeners integrated

## Continuous Integration (CI)

The project is integrated with **GitHub Actions** to enable automated and repeatable test 
execution in a CI environment.

### CI capabilities:
- Separate GitHub Actions workflows for:
  - **API tests**
  - **Web tests**
- Scheduled execution:
  - Tests are automatically executed **every Monday**
- Manual execution:
  - Workflows can also be triggered manually via **workflow_dispatch**
- Maven-based execution aligned with local run commands
- Headless browser execution for web tests in CI environment
- CI-ready configuration without code changes

### Purpose of CI setup:
- Demonstrate CI integration for test automation frameworks
- Validate framework stability in a clean, isolated environment
- Enable regular, unattended regression checks

The CI configuration reflects a typical industry setup where API and UI test
suites are executed independently and can be scaled or extended in the future
(e.g. nightly runs, environment-based pipelines, reporting integration).

## Web tests independence

Web tests are fully independent.

## API tests independence

API tests may follow ordered execution when validating business flows
  (e.g. resource creation and cleanup).

## Mobile tests independence & E2E scenario constraints

Due to the fact that the tested application is a production environment,
no login operations or actions that could permanently affect production
data are performed.

As a result, certain end-to-end functional flows introduce a limitation:
some application state changes cannot be reliably re-created between
independent test executions without impacting production data.

To address this constraint, selected mobile E2E scenarios are executed as
ordered test sequences:
- The application is freshly installed and initialized only before the
  first test in a given scenario.
- Subsequent tests within the same scenario reuse the existing application
  state preserved in memory.
- Each test validates a distinct functional aspect of the flow.

This approach intentionally relaxes the principle of full test independence
in favor of safe execution against a production system.

While this introduces a dependency between tests within a scenario,
the decision is deliberate and documented, reflecting a real-world trade-off
between test isolation and production data safety.

## Mobile platform support

The framework architecture supports both Android and iOS platforms and
was designed with cross-platform extensibility in mind.

However, due to the lack of access to physical iOS devices in the local
development environment, mobile test execution is currently limited to
Android devices only.

All mobile abstractions, driver management, and Page Object models are
implemented in a platform-agnostic way, allowing iOS support to be enabled
with minimal configuration and platform-specific locators.

## Extensibility & future improvements

Possible extensions:
- Maven profiles for test selection
- Enhanced API authentication support

## Disclaimer

Web tests in this framework were originally developed against an older version
of the PHPTravels demo website. Since then, the live demo site has undergone a complete
redesign, which changed whole page structure.

As a result, tests relying on the live PHPTravels site fail and not run as expected.

The purpose of this repository is to **demonstrate test automation architecture,
design patterns, configuration management, and best practices**, not to provide
fully passing tests against the current live PHPTravels site.

All configuration values, URLs, and credentials are mock or non-sensitive.