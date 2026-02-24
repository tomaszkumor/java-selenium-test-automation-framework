# Java - Desktop - macOS - Test Automation Framework

## Overview
This repository contains a comprehensive test automation framework built in Java, 
designed for automated testing of:
- Desktop applications (Appium)

This framework is intended as a **portfolio project** demonstrating practical knowledge of test automation 
architecture, design patterns, configuration management, and scalability considerations commonly used in 
real-world QA Automation projects.

## Environment Requirements

- macOS Accessibility permissions enabled for Terminal (and IDE if used)
- Java 21
- Maven 3.9+
- Appium 3.x
- Appium Mac2 driver installed

The framework assumes a locally running Appium server.

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
#### Desktop tests

1. Run Appium.
```bash
appium --use-plugins=inspector --allow-cors
```

2. Type command in your PowerShell/Terminal to run test suites for:

- Pages app
```bash
mvn -pl java-desktop-macos-test-automation-framework test -Dsurefire.suiteXmlFiles=src/test/resources/testSuites/PAGES.xml -Denvironment=ENV1 -Dplatform=macos -Dmacos.application=pages -Dmacos.debug=false
```
- Numbers app
```bash
mvn -pl java-desktop-macos-test-automation-framework test -Dsurefire.suiteXmlFiles=src/test/resources/testSuites/NUMBERS.xml -Denvironment=ENV1 -Dplatform=macos -Dmacos.application=numbers -Dmacos.debug=false
```

### Generate Allure report:
```bash
allure serve java-desktop-macos-test-automation-framework/allure-results
```

## Technology stack

- **Language:** Java 21
- **Build Tool:** Maven 3.9.x
- **Test Framework:** TestNG
- **Desktop Automation:** Appium 3.x.x
- **Reporting:** Allure
- **Logging:** Log4j2

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

### Desktop testing architectural considerations:
- Multiple macOS applications support
- Separate Page Object models per application
- Explicit and implicit waits

## Configuration management

The framework uses **YAML-based configuration files** for runtime control.

### Configuration capabilities include:
- Test platform selection: `macos`
- Environment selection (e.g. test / staging)
- Environment-specific data (URLs, credentials)

Runtime behavior can be controlled via YAML configuration files and optional Maven parameters.


## Project structure:
```
test-automation-frameworks-portfolio
 ├── java-playwright-test-automation-framework
 ├── java-selenium-test-automation-framework
 ├── ts-playwright-test-automation-framework
 ├── java-desktop-macos-test-automation-framework
 │    ├── allure-results  
 │    ├── src
 │    │    ├── main
 │    │    │     ├── java
 │    │    │     │     ├── actions
 │    │    │     │     ├── basePageFactory
 │    │    │     │     ├── config
 │    │    │     │     ├── dataProviders
 │    │    │     │     ├── driver
 │    │    │     │     ├── listeners
 │    │    │     │     ├── models
 │    │    │     │     │     ├── pages
 │    │    │     │     │     └── numbers
 │    │    │     │     └── utils
 │    │    │     └── resources
 │    │    │           ├── settings
 │    │    │           ├── users
 │    │    │           └── BasicSettings.yaml
 │    │    └── test
 │    │          ├── java
 │    │          │     ├── baseTest
 │    │          │     └── tests
 │    │          └── resources
 │    │                ├── testSuites
 │    │                └── log4j2.xml
 │    ├── pom.xml (java-desktop-macos-test-automation-framework module POM)
 │    └── README.md (java-desktop-macos-test-automation-framework README file)
 ├── pom.xml (parent POM for multi-module project)
 └── README.md (main overview README file)
```

## Reporting & logging

- Allure Reports for detailed test results
- Log4j2 for structured logging
- Retry mechanism for flaky tests implemented using TestNG Retry Analyzer
- TestNG listeners integrated

## Continuous Integration (CI)

Due to macOS GUI and accessibility requirements, these desktop tests cannot be executed
in headless environments or standard cloud CI runners.

The framework is designed to support CI execution using self-hosted macOS runners
(e.g. GitHub Actions, Jenkins, GitLab CI) running on physical Mac machines with:

- active user session
- Accessibility permissions enabled
- locally running Appium server

## Test Execution Model

Tests are executed sequentially by design.

Parallel execution is intentionally not supported to avoid Appium session conflicts
and macOS accessibility focus issues that can occur when multiple desktop sessions
run simultaneously.

## Test Independence

Each test is self-contained and does not rely on the execution order
or shared state between tests.

## Scope

This framework focuses on demonstrating macOS desktop automation using
Apple Pages and Numbers as example applications.

The goal is to present automation architecture and design patterns rather
than to provide broad application coverage.

## Why Appium for macOS Desktop Testing?

Appium provides macOS automation via the Mac2 driver, enabling UI automation of native macOS 
applications using accessibility APIs. This framework demonstrates how mobile automation tools 
can be extended to desktop environments.

## Limitations

- macOS automation relies on accessibility permissions
- Tests may require screen resolution consistency
- Pages/Numbers UI changes may break locators
- Tested on Apple Silicon Macs
- Intel-based Macs not tested

## Disclaimer

The purpose of this repository is to **demonstrate test automation architecture,
design patterns, configuration management, and best practices**, not to provide
fully passing tests against current Pages and Numbers applications.

All configuration values, URLs, and credentials are mock or non-sensitive.
