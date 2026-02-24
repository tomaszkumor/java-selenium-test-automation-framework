# TypeScript - Playwright - Test Automation Framework

## Overview
This repository contains a comprehensive test automation framework built in TypeScript, 
designed for automated testing of:
- Web application (Playwright)
- REST API (Playwright)

This framework is intended as a **portfolio project** demonstrating practical knowledge of test automation 
architecture, design patterns, configuration management, and scalability considerations commonly used in 
real-world QA Automation projects.

## Environment Requirements

- TypeScript 5.9.x
- Node.js 25.4.x
- npm 11.7.x
- Chromium, Firefox, WebKit engines
- Winston logger

## How to run

### Clone repository:
```bash
git clone https://github.com/tomaszkumor/test-automation-frameworks-portfolio.git
```

### Install dependencies:
```bash
cd test-automation-frameworks-portfolio
npm install
```

### Install Playwright browsers:
```bash
npx playwright install
```

### Navigate to framework directory
```bash
cd ts-playwright-test-automation-framework
```

### Run

#### API tests:
```bash
PLATFORM=api API_DEBUG=true npx playwright test src/test/resources/testSuites/api/PetStoreTest.test.ts
```

#### Web tests:
```bash
PLATFORM=web WEB_ENGINE=firefox WEB_DEBUG=true WEB_HEADLESS=false npx playwright test src/test/resources/testSuites/web/PhpTravelsTest.test.ts
```

### Generate report:

#### Generate latest report:
```bash
npm run show-report-latest
```

#### Generate specific report:
```bash
npx playwright show-report playwright-report/playwright-YYYY-MM-DDTHH-MM-SS
```

#### Example:
```bash
npx playwright show-report playwright-report/playwright-2026-02-22T20-47-11-224Z
``` 

## Technology stack

- **Language:** TypeScript 5.9.x
- **Build Tool:** npm 11.7.x
- **Test Framework:** Playwright in-built runner
- **Web Automation:** Playwright 1.58.x
- **API Automation:** Playwright 1.58.x
- **Reporting:** Playwright
- **Logging:** Winston
- **CI:** TBD

## Design patterns & architectural concepts

### The framework applies multiple design patterns:
- Page Object Model
- Singleton (configuration management)
- Builder (test data and request objects)

### General architectural considerations:
- Centralized configuration management
- Centralized actions management
- Clear separation of test logic and page logic
- Reusable utilities and helpers
- Scalable structure for future extensions

### API testing architectural considerations:
- POJO-based serialization/deserialization
- Independent test execution
- Possible support for E2E-style API flows (e.g. create → validate → delete resource)

### Web testing architectural considerations:
- Chromium, Firefox and Webkit browser engines support
- Remote tests execution support
- Parallel execution support
- Headless mode support
- Separate web Page Object models

## Configuration management

The framework uses **YAML-based configuration files** for local runtime control. To enable configuration control from CI pipelines, special runtime tags were introduced. These tags allow selected configuration values to be overridden without modifying the YAML files, making it possible to adjust test execution dynamically in CI environments.

### Configuration capabilities include:
- Test type selection: `web`, `api`
- Environment selection (e.g. test / staging)
- Browser settings (headless, parallel execution)
- Environment-specific data (URLs, credentials)

Runtime behavior can be controlled via YAML configuration files
and optional npm parameters.


## Project structure:

```
test-automation-frameworks-portfolio
 ├── java-desktop-macos-test-automation-framework
 ├── java-selenium-test-automation-framework
 ├── java-playwright-test-automation-framework
 ├── ts-playwright-test-automation-framework
 │    ├── playwright-report 
 │    ├── src
 │    │    ├── main
 │    │    │     ├── code
 │    │    │     │     ├── actions
 │    │    │     │     ├── actionsFactory
 │    │    │     │     ├── config
 │    │    │     │     ├── constants
 │    │    │     │     ├── dataProviders
 │    │    │     │     ├── models
 │    │    │     │     │     ├── api
 │    │    │     │     │     └── web
 │    │    │     │     ├── playwrightFactory
 │    │    │     │     └── utils
 │    │    │     └── resources
 │    │    │           ├── api
 │    │    │           ├── filesPaths
 │    │    │           ├── settings
 │    │    │           ├── users
 │    │    │           └── BasicSettings.yaml
 │    │    └── test
 │    │          ├── code
 │    │          │     ├── baseTest
 │    │          │     └── tests
 │    │          │           ├── api
 │    │          │           └── web
 │    │          └── resources
 │    │                └── testSuites
 │    │                      ├── api
 │    │                      └── web
 │    ├── test-results
 │    │    └── .last-run.json
 │    ├── package.json
 │    ├── playwright.config.ts
 │    ├── README.md (ts-playwright-test-automation-framework README file)
 │    ├── show-latest-report.js
 │    ├── test-results.json
 │    └── tsconfig.json
 ├── pom.xml (parent POM for multi-module project)
 └── README.md (main overview README file)
```

## Reporting & logging

- Playwright reports for detailed test results
- Winston for structured logging
- Automatic retry mechanism for flaky tests

## Web tests independence

- Each web test runs in its own BrowserContext and Page via the PageManager class
- This ensures complete isolation of cookies, storage, and page state
- Failures in one test do not affect other tests, even in parallel execution
- The architecture mimics Java Playwright’s thread-local contexts in TypeScript

## API tests independence

API tests may follow ordered execution when validating business flows
(e.g. resource creation and cleanup).

## Extensibility & future improvements

Possible extensions:
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