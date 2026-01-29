# Java - Selenium - Test Automation Framework

## Overview
This repository contains a comprehensive test automation framework built in Java, designed for automated testing of:
- Web application (Selenium)
- Mobile application (Appium)
- REST API (RestAssured)

This framework is intended as a **portfolio project** demonstrating practical knowledge of test automation architecture, design patterns, configuration management, and scalability considerations commonly used in real-world QA Automation projects.

---

## Technology stack

- **Language:** Java
- **Build Tool:** Maven
- **Test Framework:** TestNG
- **Web Automation:** Selenium
- **Mobile Automation:** Appium
- **API Testing:** RestAssured
- **Reporting:** Allure
- **Logging:** Log4j2
- **CI/CD readiness:** Yes

---

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
- Chrome browser support (possible extension to Safari, FireFox and Edge)
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
> Mobile tests are executed on physical devices only. Simulators were intentionally not used due to local hardware limitations.

---

## Configuration management

The framework uses **YAML-based configuration files** for runtime control.

### Configuration capabilities include:
- Test type selection: `web`, `mobile`, `api`
- Environment selection (e.g. test / staging)
- Browser settings (headless, parallel execution)
- Mobile platform selection: Android / iOS
- Environment-specific data (URLs, credentials)

No Maven or TestNG parameters are required — all runtime behavior is driven via configuration files.

---

## Reporting & logging

- Allure Reports for detailed test results
- Log4j2 for structured logging
- Automatic retry mechanism for flaky tests
- TestNG listeners integrated

---

## Web tests independence

Web and mobile tests are fully independent.

---

## API tests independence

API tests may follow ordered execution when validating business flows
  (e.g. resource creation and cleanup).

---

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

---

## Mobile platform support

The framework architecture supports both Android and iOS platforms and
was designed with cross-platform extensibility in mind.

However, due to the lack of access to physical iOS devices in the local
development environment, mobile test execution is currently limited to
Android devices only.

All mobile abstractions, driver management, and Page Object models are
implemented in a platform-agnostic way, allowing iOS support to be enabled
with minimal configuration and platform-specific locators.

---

## Extensibility & future improvements

Possible extensions:
- Maven profiles for test selection
- CI pipeline integration (GitHub Actions / Jenkins)
- Enhanced API authentication support

---

## Disclaimer

This project is intended for **demonstration and portfolio purposes**.  
All configuration values, URLs, and credentials are mock or non-sensitive.

---