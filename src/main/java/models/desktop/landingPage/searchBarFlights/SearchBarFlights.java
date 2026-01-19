package models.desktop.landingPage.searchBarFlights;

import constants.landingPage.Arrow;
import constants.landingPage.FlightDestination;
import constants.landingPage.Location;
import constants.landingPage.LocationType;
import dataProviders.dataProvidersModels.landingPageModels.Airport;
import dataProviders.dataProvidersModels.landingPageModels.Date;
import dataProviders.dataProvidersModels.landingPageModels.Traveller;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import models.desktop.flightPage.searchPage.SearchPage;
import org.assertj.core.api.SoftAssertions;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import static driver.BaseDriver.getWebDriver;
import static org.assertj.core.api.Assertions.assertThat;
import static utils.logger.Log4J.log;

public class SearchBarFlights extends SearchBarFlightsLocators {
    public SearchBarFlights() {
        checkIfTabIsActive();
        checkIfSearchBarIsDisplayed();
        log.info("Flights search bar is displayed.");
    }

    public SearchBarFlights selectDepartureLocation(LandingPageModel landingPageModel) {
        checkDepartureLocationBeforeInput();
        clickOnDepartureLocationInput();
        checkIfDepartureAirportsAreDisplayed();
        checkDepartureLocationsAvailability(landingPageModel);
        findAndSelectDepartureLocation(landingPageModel);
        checkDepartureLocationAfterInput(landingPageModel);

        return this;
    }

    public SearchBarFlights selectArrivalLocation(LandingPageModel landingPageModel) {
        checkArrivalLocationBeforeInput();
        clickOnArrivalLocationInput();
        checkIfArrivalAirportsAreDisplayed();
        checkArrivalLocationsAvailability(landingPageModel);
        findAndSelectArrivalLocation(landingPageModel);
        checkArrivalLocationAfterInput(landingPageModel);

        return this;
    }

    public SearchBarFlights selectFlightDestination(LandingPageModel landingPageModel) {
        selectSpecificFlightDestination(landingPageModel);
        compareFlightDestinies(landingPageModel);

        return this;
    }

    public SearchBarFlights selectCabinClass(LandingPageModel landingPageModel) {
        selectSpecificCabinClass(landingPageModel);
        compareCabinClasses(landingPageModel);

        return this;
    }

    public SearchBarFlights swapDepartureAndArrivalLocations() {
        swapLocations();
        checkLocationsAfterSwap();

        return this;
    }

    public SearchBarFlights selectDepartureDate(LandingPageModel landingPageModel) {
        selectDepartureDateYear(landingPageModel);
        selectDepartureDateMonth(landingPageModel);
        selectDepartureDateDay(landingPageModel);
        checkActualDepartureDate(landingPageModel);

        return this;
    }

    public SearchBarFlights selectReturnDate(LandingPageModel landingPageModel) {
        selectReturnDateYear(landingPageModel);
        selectReturnDateMonth(landingPageModel);
        selectReturnDateDay(landingPageModel);
        checkActualReturnDate(landingPageModel);

        return this;
    }

    public SearchBarFlights selectTravellers(LandingPageModel landingPageModel) {
        checkInitialTravellersCount();
        clickOnTravellersInput();
        checkIfTravellersWindowIsDisplayed(true);
        setAdultsNumber(landingPageModel);
        setChildrenNumber(landingPageModel);
        setInfantsNumber(landingPageModel);
        closeTravellersWindow();
        checkIfTravellersWindowIsDisplayed(false);
        checkTravellersCountAfterChange(landingPageModel);

        return this;
    }

    public SearchPage clickOnSearchButton() {
        click.clickOnVisibleElement(searchButton, 15);
        log.info("Search button has been clicked.");

        return new SearchPage();
    }

    private void swapLocations() {
        click.clickOnEnabledElement(swapDirectionsButton, 15);

        log.info("Swap locations button has been clicked.");
    }

    private void checkLocationsAfterSwap() {
        String departureLocationBeforeSwap = get.getValueFromElement(departureLocationInput);
        String arrivalLocationBeforeSwap = get.getValueFromElement(arrivalLocationInput);
        String departureLocationAfterSwap = get.getValueFromElement(departureLocationInput);
        String arrivalLocationAfterSwap = get.getValueFromElement(arrivalLocationInput);

        SoftAssertions softAssertions = new SoftAssertions();
        softAssertions.assertThat(departureLocationAfterSwap).isEqualTo(arrivalLocationBeforeSwap);
        softAssertions.assertThat(arrivalLocationAfterSwap).isEqualTo(departureLocationBeforeSwap);
        softAssertions.assertAll();

        log.info("Locations has been swapped correctly.");
    }

    private void closeTravellersWindow() {
        WebElement element = getWebDriver().getDriver().findElement(By.xpath("//body"));
        click.clickOnElement(element, 5);
    }

    private void setAdultsNumber(LandingPageModel landingPageModel) {
        checkSpecificTravellersCountBeforeChange(constants.landingPage.Traveller.ADULTS);
        changeSpecificTravellersGroupCount(landingPageModel, constants.landingPage.Traveller.ADULTS);
        checkSpecificTravellersCountAfterChange(landingPageModel, constants.landingPage.Traveller.ADULTS);
    }

    private void setChildrenNumber(LandingPageModel landingPageModel) {
        checkSpecificTravellersCountBeforeChange(constants.landingPage.Traveller.CHILDS);
        changeSpecificTravellersGroupCount(landingPageModel, constants.landingPage.Traveller.CHILDS);
        checkSpecificTravellersCountAfterChange(landingPageModel, constants.landingPage.Traveller.CHILDS);
    }

    private void setInfantsNumber(LandingPageModel landingPageModel) {

        checkSpecificTravellersCountBeforeChange(constants.landingPage.Traveller.INFANTS);
        changeSpecificTravellersGroupCount(landingPageModel, constants.landingPage.Traveller.INFANTS);
        checkSpecificTravellersCountAfterChange(landingPageModel, constants.landingPage.Traveller.INFANTS);
    }

    private void checkInitialTravellersCount() {
        WebElement travellersCount = travellersDropDown.findElement(By.xpath(".//span"));
        String actualTravellersCount = get.getTextFromElement(travellersCount);
        String expectedTravellersCount = "1";

        assertThat(actualTravellersCount)
                .as("Travellers count check before change")
                .isEqualTo(expectedTravellersCount);
    }

    private void checkTravellersCountAfterChange(LandingPageModel landingPageModel) {
        WebElement travellersCount = travellersDropDown.findElement(By.xpath(".//span"));
        String actualTravellersCount = get.getTextFromElement(travellersCount);
        String expectedTravellersCount = getTotalCountOfTravellers(landingPageModel);

        assertThat(actualTravellersCount)
                .as("Travellers count check after change")
                .isEqualTo(expectedTravellersCount);
    }

    private String getTotalCountOfTravellers(LandingPageModel landingPageModel) {
        String expectedAdultsCount = getExpectedSpecificTravellerGroupCountAfterChange(landingPageModel, constants.landingPage.Traveller.ADULTS);
        String expectedChildrenCount = getExpectedSpecificTravellerGroupCountAfterChange(landingPageModel, constants.landingPage.Traveller.CHILDS);
        String expectedInfantCount = getExpectedSpecificTravellerGroupCountAfterChange(landingPageModel, constants.landingPage.Traveller.INFANTS);

        int expectedAdultsCountAsNumber = Integer.parseInt(expectedAdultsCount);
        int expectedChildrenCountAsNumber = Integer.parseInt(expectedChildrenCount);
        int expectedInfantCountAsNumber = Integer.parseInt(expectedInfantCount);

        return String.valueOf(expectedAdultsCountAsNumber + expectedChildrenCountAsNumber + expectedInfantCountAsNumber);
    }

    private void clickOnTravellersInput() {
        click.clickOnElement(travellersDropDown, 15);
        log.info("Travellers drop down has been clicked.");
    }

    private String getActualSpecificTravellerGroupCount(constants.landingPage.Traveller traveller) {
        By specificTravellerGroupCountLocator = getActualSpecificTravellerGroupCountLocator(traveller);

        return get.getValueFromElement(specificTravellerGroupCountLocator);
    }

    private By getActualSpecificTravellerGroupCountLocator(constants.landingPage.Traveller traveller) {
        String specificTravellerGroupClass = switch (traveller) {
            case ADULTS -> "adult_qty";
            case CHILDS -> "child_qty";
            case INFANTS -> "infant_qty";
        };

        return By.xpath("//div[contains(@class, 'dropdown-menu') and contains(@style, 'block')]//div[contains(@class, '" + specificTravellerGroupClass + "')]//input");
    }

    private void compareSpecificTravellerGroupCount(String actualSpecificTravellerGroupCount, String expectedSpecificTravellerGroupCount, constants.landingPage.Traveller traveller, String stage) {
        assertThat(actualSpecificTravellerGroupCount)
                .as(traveller.getTraveller() + " count check " + stage + " change")
                .isEqualTo(expectedSpecificTravellerGroupCount);
    }

    private String getExpectedSpecificTravellerGroupCountBeforeChange(constants.landingPage.Traveller traveller) {
        return switch (traveller) {
            case ADULTS -> "1";
            case CHILDS, INFANTS -> "0";
        };
    }

    private String getExpectedSpecificTravellerGroupCountAfterChange(LandingPageModel landingPageModel, constants.landingPage.Traveller traveller) {
        Traveller expectedTravellers = landingPageModel.getExpectedTravellers();

        return switch (traveller) {
            case ADULTS -> expectedTravellers.getAdultsCount();
            case CHILDS -> expectedTravellers.getChildrenCount();
            case INFANTS -> expectedTravellers.getInfantsCount();
        };
    }

    private void checkSpecificTravellersCountBeforeChange(constants.landingPage.Traveller traveller) {
        String actualSpecificTravellerGroupCount = getActualSpecificTravellerGroupCount(traveller);
        String expectedSpecificTravellerGroupCount = getExpectedSpecificTravellerGroupCountBeforeChange(traveller);
        compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount, expectedSpecificTravellerGroupCount, traveller, "before");
    }

    private void checkSpecificTravellersCountAfterChange(LandingPageModel landingPageModel, constants.landingPage.Traveller traveller) {
        String actualSpecificTravellerGroupCount = getActualSpecificTravellerGroupCount(traveller);
        String expectedSpecificTravellerGroupCount = getExpectedSpecificTravellerGroupCountAfterChange(landingPageModel, traveller);
        compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount, expectedSpecificTravellerGroupCount, traveller, "after");
    }

    private By getArrowLocator(constants.landingPage.Traveller traveller, Arrow arrow) {
        String arrowClass = switch (arrow) {
            case LEFT -> "qtyDec";
            case RIGHT -> "qtyInc";
        };

        String specificTravellerGroupClass = switch (traveller) {
            case ADULTS -> "adult_qty";
            case CHILDS -> "child_qty";
            case INFANTS -> "infant_qty";
        };

        return By.xpath("//div[contains(@class, 'dropdown-menu') and contains(@style, 'block')]//div[contains(@class, '" + specificTravellerGroupClass + "')]//div[@class = '" + arrowClass + "']");
    }

    private WebElement getArrowButton(constants.landingPage.Traveller traveller, Arrow arrow) {
        By arrowLocator = getArrowLocator(traveller, arrow);

        return getWebDriver().getDriver().findElement(arrowLocator);
    }

    private void changeSpecificTravellersGroupCount(LandingPageModel landingPageModel, constants.landingPage.Traveller traveller) {
        String actualAdultsCount = getActualSpecificTravellerGroupCount(traveller);
        String expectedAdultsCount = getExpectedSpecificTravellerGroupCountAfterChange(landingPageModel, traveller);
        By adultsCountLocator = getActualSpecificTravellerGroupCountLocator(traveller);
        int actualAdultsCountAsNumber = Integer.parseInt(actualAdultsCount);
        int expectedAdultsCountAsNumber = Integer.parseInt(expectedAdultsCount);

        if (expectedAdultsCountAsNumber == 0) {
            WebElement arrow = getArrowButton(traveller, Arrow.LEFT);
            click.clickOnEnabledElement(arrow, 15);

            WebElement travellersCount = getWebDriver().getDriver().findElement(adultsCountLocator);
            check.isAttributeEqualTo(travellersCount, "value", expectedAdultsCount, 15);

            log.info("Actual {} travellers count has been decreased to {}.", traveller.getTraveller(), expectedAdultsCountAsNumber);
        } else if (actualAdultsCountAsNumber < expectedAdultsCountAsNumber) {
            WebElement arrow = getArrowButton(traveller, Arrow.RIGHT);
            int result = expectedAdultsCountAsNumber - actualAdultsCountAsNumber;

            for (int i = 1; i < result + 1; i++) {
                click.clickOnEnabledElement(arrow, 15);
                WebElement travellersCount = getWebDriver().getDriver().findElement(adultsCountLocator);
                check.isAttributeEqualTo(travellersCount, "value", String.valueOf(actualAdultsCountAsNumber + i), 15);

                log.info("Actual {} travellers count has been increased to {}.", traveller.getTraveller(), actualAdultsCountAsNumber + i);
            }
        }
    }

    private void selectDepartureDateYear(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.DEPARTURE, "Departure");
        checkIfDatePickerWindowIsDisplayed(true, "Departure");
        clickOnDatePickerHeader(constants.landingPage.Date.YEAR);
        selectSpecificDate(landingPageModel, LocationType.DEPARTURE, constants.landingPage.Date.YEAR);
        closeReturnDatePickerWindowIfNecessary(landingPageModel);
        checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    private void selectDepartureDateMonth(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.DEPARTURE, "Departure");
        checkIfDatePickerWindowIsDisplayed(true, "Departure");
        clickOnDatePickerHeader(constants.landingPage.Date.MONTH);
        selectSpecificDate(landingPageModel, LocationType.DEPARTURE, constants.landingPage.Date.MONTH);
        closeReturnDatePickerWindowIfNecessary(landingPageModel);
        checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    private void selectDepartureDateDay(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.DEPARTURE, "Departure");
        checkIfDatePickerWindowIsDisplayed(true, "Departure");
        selectSpecificDate(landingPageModel, LocationType.DEPARTURE, constants.landingPage.Date.DAY);
        closeReturnDatePickerWindowIfNecessary(landingPageModel);
        checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    private void selectReturnDateYear(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.ARRIVAL, "Arrival");
        checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        clickOnDatePickerHeader(constants.landingPage.Date.YEAR);
        selectSpecificDate(landingPageModel, LocationType.ARRIVAL, constants.landingPage.Date.YEAR);
        checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    private void selectReturnDateMonth(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.ARRIVAL, "Arrival");
        checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        clickOnDatePickerHeader(constants.landingPage.Date.MONTH);
        selectSpecificDate(landingPageModel, LocationType.ARRIVAL, constants.landingPage.Date.MONTH);
        checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    private void selectReturnDateDay(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.ARRIVAL, "Arrival");
        checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        selectSpecificDate(landingPageModel, LocationType.ARRIVAL, constants.landingPage.Date.DAY);
        checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    private void closeReturnDatePickerWindowIfNecessary(LandingPageModel landingPageModel) {
        FlightDestination flightDestination = getExpectedFlightDestinationFromDataProvider(landingPageModel);

        if (flightDestination == FlightDestination.RETURN) {
            checkIfDatePickerWindowIsDisplayed(true, "Arrival");
            WebElement element = getWebDriver().getDriver().findElement(By.xpath("//body"));
            click.clickOnElement(element, 5);
            checkIfDatePickerWindowIsDisplayed(false, "Arrival");
        }
    }

    private void checkActualDepartureDate(LandingPageModel landingPageModel) {
        checkActualDate(landingPageModel, LocationType.DEPARTURE);
    }

    private void checkActualReturnDate(LandingPageModel landingPageModel) {
        checkActualDate(landingPageModel, LocationType.ARRIVAL);
    }

    private void checkActualDate(LandingPageModel landingPageModel, LocationType locationType) {
        String actualDepartureDate = switch (locationType) {
            case DEPARTURE -> get.getValueFromElement(departureDateInput);
            case ARRIVAL -> get.getValueFromElement(returnDateInput);
        };

        Date expectedDate = getExpectedDateFromDataProvider(landingPageModel, locationType);

        String year = expectedDate.getYear();
        String month = String.format("%02d", expectedDate.getMonth().getValue());
        String day = String.format("%02d", Integer.parseInt(expectedDate.getDay()));
        String expectedDepartureDateAsString = day.concat("-").concat(month).concat("-").concat(year);

        assertThat(actualDepartureDate)
                .as("Departure date check")
                .isEqualTo(expectedDepartureDateAsString);
    }

    private void clickOnDateInput(LocationType locationType, String destination) {
        switch (locationType) {
            case DEPARTURE -> {
                By locator = By.xpath("//input[@id = 'departure']");
                check.isElementPresentByLocator(locator, 10);
                click.clickOnEnabledElement(departureDateInput, 15);
            }
            case ARRIVAL -> {
                By locator = By.xpath("//input[@id = 'return_date']");
                check.isElementPresentByLocator(locator, 10);
                click.clickOnEnabledElement(returnDateInput, 15);
            }
        }

        log.info("{} date picker input has been clicked.", destination);
    }

    private void checkIfDatePickerWindowIsDisplayed(boolean shouldBeDisplayed, String destination) {
        By datePickerWindowLocator = By.xpath("//div[@class = 'datepicker dropdown-menu' and contains(@style, 'block')]");
        if (shouldBeDisplayed) {
            check.isElementPresentByLocator(datePickerWindowLocator, 50, 15);

            WebElement datePickerWindow = getWebDriver().getDriver().findElement(datePickerWindowLocator);
            check.isElementDisplayed(datePickerWindow, 15);
            log.info("{} date picker window has been displayed.", destination);
        } else {
            check.isNumberOfElementsEqualTo(datePickerWindowLocator, 0, 50, 15);
            log.info("{} date picker window has been closed.", destination);
        }
    }

    private void checkIfTravellersWindowIsDisplayed(boolean shouldBeDisplayed) {
        By travellersWindowLocator = By.xpath("//div[contains(@class, 'dropdown-menu') and contains(@style, 'block')]");
        if (shouldBeDisplayed) {
            check.isElementPresentByLocator(travellersWindowLocator, 50, 15);

            WebElement travellersWindow = getWebDriver().getDriver().findElement(travellersWindowLocator);
            check.isElementDisplayed(travellersWindow, 15);
            log.info("Travellers window has been displayed.");
        } else {
            check.isNumberOfElementsEqualTo(travellersWindowLocator, 0, 50, 15);
            log.info("Traveller window has been closed.");
        }
    }

    private void clickOnDatePickerHeader(constants.landingPage.Date date) {
        int iterator = switch (date) {
            case YEAR -> 2;
            case MONTH -> 1;
            default -> 0;
        };

        By datePickerWindowHeaderLocator = By.xpath("//div[@class = 'datepicker dropdown-menu' and contains(@style, 'block')]/div[contains(@style, 'block')]//th[@class = 'switch']");
        for (int i = 0; i < iterator; i++) {
            check.isNumberOfElementsEqualTo(datePickerWindowHeaderLocator, 1, 5);
            WebElement datePickerWindowHeader = getWebDriver().getDriver().findElement(datePickerWindowHeaderLocator);
            click.clickOnVisibleElement(datePickerWindowHeader, 15);

            log.info("Date picker header has been clicked.");
        }
    }

    private void selectSpecificDate(LandingPageModel landingPageModel, LocationType locationType, constants.landingPage.Date date) {
        Date expectedDate = getExpectedDateFromDataProvider(landingPageModel, locationType);

        String specificDate = switch (date) {
            case YEAR -> expectedDate.getYear();
            case MONTH -> expectedDate.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            case DAY -> {
                String day = expectedDate.getDay();
                yield (day.length() == 2 && day.startsWith("0")) ? day.substring(1) : day;
            }
        };

        By dateLocator = switch (date) {
            case YEAR, MONTH ->
                    By.xpath("//div[@class = 'datepicker dropdown-menu' and contains(@style, 'block')]/div[contains(@style, 'block')]//tbody//span[text() = '" + specificDate + "']");
            case DAY ->
                    By.xpath("//div[@class = 'datepicker dropdown-menu' and contains(@style, 'block')]/div[contains(@style, 'block')]//tbody//td[@class = 'day ' and text() = '" + specificDate + "']");
        };

        WebElement dateButton = getWebDriver().getDriver().findElement(dateLocator);
        click.clickOnVisibleElement(dateButton, 15);
        log.info("Departure date: {} {} has been clicked.", date.getName(), specificDate);
    }

    private void checkDepartureLocationBeforeInput() {
        compareLocationBeforeOrAfterInput("", departureLocationInput, "Departure", "before");
    }

    private void checkArrivalLocationBeforeInput() {
        compareLocationBeforeOrAfterInput("", arrivalLocationInput, "Arrival", "before");
    }

    private void checkDepartureLocationAfterInput(LandingPageModel landingPageModel) {
        String expectedDepartureLocation = getExpectedLocationValueAfterInput(landingPageModel, LocationType.DEPARTURE);
        compareLocationBeforeOrAfterInput(expectedDepartureLocation, departureLocationInput, "Departure", "after");
    }

    private void checkArrivalLocationAfterInput(LandingPageModel landingPageModel) {
        String expectedArrivalLocation = getExpectedLocationValueAfterInput(landingPageModel, LocationType.ARRIVAL);
        compareLocationBeforeOrAfterInput(expectedArrivalLocation, arrivalLocationInput, "Arrival", "after");
    }

    private void compareLocationBeforeOrAfterInput(String expectedLocationValue, WebElement element, String destination, String inputStage) {
        String actualLocationValue = get.getValueFromElement(element);

        assertThat(actualLocationValue)
                .as(destination + " location check " + inputStage + " input")
                .isEqualTo(expectedLocationValue);

        log.info("{} location {} input value meets expected value.", destination, inputStage);
    }

    private String getExpectedLocationValueAfterInput(LandingPageModel landingPageModel, LocationType locationType) {
        String expectedLocationCode;
        String expectedLocationName;

        switch (locationType) {
            case DEPARTURE -> {
                expectedLocationCode = getExpectedDepartureLocationFromDataProvider(landingPageModel).getAirportCode();
                expectedLocationName = getExpectedDepartureLocationFromDataProvider(landingPageModel).getAirportName();

                return expectedLocationCode.concat(" - ").concat(expectedLocationName);
            }

            case ARRIVAL -> {
                expectedLocationCode = getExpectedArrivalLocationFromDataProvider(landingPageModel).getAirportCode();
                expectedLocationName = getExpectedArrivalLocationFromDataProvider(landingPageModel).getAirportName();

                return expectedLocationCode.concat(" - ").concat(expectedLocationName);
            }

            default -> {
                return null;
            }
        }
    }

    private void selectSpecificFlightDestination(LandingPageModel landingPageModel) {
        String expectedFlightDestinationValue = getExpectedFlightDestinationAsStringFromDataProvider(landingPageModel);
        Select flightDestinationSelect = new Select(this.flightDestinationSelect);
        flightDestinationSelect.selectByContainsVisibleText(expectedFlightDestinationValue);
    }

    private void selectSpecificCabinClass(LandingPageModel landingPageModel) {
        String expectedCabinClassValue = getExpectedCabinClassFromDataProvider(landingPageModel);
        Select cabinClassSelect = new Select(this.cabinClassSelect);
        cabinClassSelect.selectByContainsVisibleText(expectedCabinClassValue);
    }

    private void compareFlightDestinies(LandingPageModel landingPageModel) {
        String expectedFlightDestinationValue = getExpectedFlightDestinationAsStringFromDataProvider(landingPageModel);

        Select flightDestinationSelect = new Select(this.flightDestinationSelect);
        String actualFlightDestinationValue = get.getTextFromElement(flightDestinationSelect.getFirstSelectedOption());
        assertThat(actualFlightDestinationValue)
                .as("Flight destination value check")
                .isEqualTo(expectedFlightDestinationValue);

        log.info("Selected flight destination value: " + actualFlightDestinationValue);
    }

    private void compareCabinClasses(LandingPageModel landingPageModel) {
        String expectedCabinClassValue = getExpectedCabinClassFromDataProvider(landingPageModel);

        Select cabinClassSelect = new Select(this.cabinClassSelect);
        String actualCabinClassValue = get.getTextFromElement(cabinClassSelect.getFirstSelectedOption());
        assertThat(actualCabinClassValue)
                .as("Cabin class value check")
                .isEqualTo(expectedCabinClassValue);

        log.info("Selected cabin class value: " + actualCabinClassValue);
    }

    private void findAndSelectDepartureLocation(LandingPageModel landingPageModel) {
        Location expectedDepartureLocation = getExpectedDepartureLocationFromDataProvider(landingPageModel);
        WebElement location = getExpectedDepartureLocationInput(expectedDepartureLocation);
        clickOnSpecificLocation(location, expectedDepartureLocation, "departure");
    }

    private void findAndSelectArrivalLocation(LandingPageModel landingPageModel) {
        Location expectedArrivalLocation = getExpectedArrivalLocationFromDataProvider(landingPageModel);
        WebElement location = getExpectedArrivalLocationInput(expectedArrivalLocation);
        clickOnSpecificLocation(location, expectedArrivalLocation, "arrival");
    }

    private void clickOnSpecificLocation(WebElement locationInput, Location location, String destination) {
        String airportName = location.getAirportName();
        String airportCity = location.getAirportCity();
        String airportCountry = location.getAirportCountry();

        click.clickOnElement(locationInput, 15);
        log.info("{}, {}, {} has been set as {} location.", airportName, airportCity, airportCountry, destination);
    }

    private void checkDepartureLocationsAvailability(LandingPageModel landingPageModel) {
        List<Airport> actualDepartureLocations = getActualDepartureLocations();
        List<Airport> expectedDepartureLocations = getExpectedDepartureLocationsFromDataProvider(landingPageModel);

        compareLocations(actualDepartureLocations, expectedDepartureLocations);
    }

    private void checkArrivalLocationsAvailability(LandingPageModel landingPageModel) {
        List<Airport> actualArrivalLocations = getActualArrivalLocations();
        List<Airport> expectedArrivalLocations = getExpectedArrivalLocationsFromDataProvider(landingPageModel);

        compareLocations(actualArrivalLocations, expectedArrivalLocations);
    }

    private void compareLocations(List<Airport> actualLocations, List<Airport> expectedLocations) {
        assertThat(actualLocations)
                .as("Locations check")
                .doesNotHaveDuplicates()
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyInAnyOrderElementsOf(expectedLocations);
    }

    private WebElement getExpectedDepartureLocationInput(Location expectedDepartureLocation) {
        String locationCode = expectedDepartureLocation.getAirportCode();
        By locationLocator = By.xpath("//div[contains(@class, 'results-container-from')]/div[@data-code = '" + locationCode + "']");

        return getWebDriver().getDriver().findElement(locationLocator);
    }

    private WebElement getExpectedArrivalLocationInput(Location expectedDepartureLocation) {
        String locationCode = expectedDepartureLocation.getAirportCode();
        By locationLocator = By.xpath("//div[contains(@class, 'results-container-to')]/div[@data-code = '" + locationCode + "']");

        return getWebDriver().getDriver().findElement(locationLocator);
    }

    private List<Airport> getActualDepartureLocations() {
        List<Airport> actualDepartureLocations = new ArrayList<>();

        for (WebElement departureLocation : departureLocations) {
            String airportName = getActualAirportName(departureLocation);
            String airportCity = getActualAirportCityName(departureLocation);
            String airportCountry = getActualAirportCountryName(departureLocation);
            String airportCode = getActualAirportCodeName(departureLocation);

            actualDepartureLocations.add(new Airport(airportName, airportCity, airportCountry, airportCode));
        }

        return actualDepartureLocations;
    }

    private List<Airport> getActualArrivalLocations() {
        List<Airport> actualArrivalLocations = new ArrayList<>();

        for (WebElement arrivalLocation : arrivalLocations) {
            String airportName = getActualAirportName(arrivalLocation);
            String airportCity = getActualAirportCityName(arrivalLocation);
            String airportCountry = getActualAirportCountryName(arrivalLocation);
            String airportCode = getActualAirportCodeName(arrivalLocation);

            actualArrivalLocations.add(new Airport(airportName, airportCity, airportCountry, airportCode));
        }

        return actualArrivalLocations;
    }

    private String getActualAirportName(WebElement location) {
        return get.getTextFromElement(location.findElement(By.xpath(".//small[contains(@class, 'airport--name')]")));
    }

    private String getActualAirportCityName(WebElement element) {
        JavascriptExecutor js = (JavascriptExecutor) getWebDriver().getDriver();
        return (String) js.executeScript(
                """
                            var node = arguments[0].firstChild;
                            return (node && node.nodeType === 3) ? node.textContent.trim() : '';
                        """,
                element.findElement(By.xpath(".//strong"))
        );
    }

    private String getActualAirportCountryName(WebElement location) {
        return get.getTextFromElement(location.findElement(By.xpath(".//strong/small")));
    }

    private String getActualAirportCodeName(WebElement location) {
        return get.getTextFromElement(location.findElement(By.xpath("./button")));
    }

    private void checkIfTabIsActive() {
        assertThat(check.isAttributeEqualTo(flightsTab, "aria-selected", "true", 50, 5))
                .as("Flights tab activity check")
                .isTrue();

        log.info("Flights tab is an active tab.");
    }

    private void checkIfSearchBarIsDisplayed() {
        check.isElementDisplayed(flightsSearchBar, 15);
        log.info("Flights search bar has been displayed");
    }

    private void clickOnDepartureLocationInput() {
        clickOnLocationInput(departureLocationInput, "Departure");
    }

    private void clickOnArrivalLocationInput() {
        clickOnLocationInput(arrivalLocationInput, "Arrival");
    }

    private void clickOnLocationInput(WebElement location, String locationDestination) {
        click.clickOnEnabledElement(location, 15);
        log.info(locationDestination + " input has been clicked.");
    }

    private void checkIfDepartureAirportsAreDisplayed() {
        checkIfAirportsAreDisplayed(departureLocationsContainer, "from");
    }

    private void checkIfArrivalAirportsAreDisplayed() {
        checkIfAirportsAreDisplayed(arrivalLocationsContainer, "to");
    }

    private void checkIfAirportsAreDisplayed(WebElement airportsContainer, String airportLocator) {
        check.isElementDisplayed(airportsContainer, 15);
        By departureAirportLocator = By.xpath("//div[contains(@class, 'results-container-" + airportLocator + "')]/div");
        check.isNumberOfElementsGreaterThan(departureAirportLocator, 0, 50, 10);
    }

    private Location getExpectedDepartureLocationFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedDepartureLocation();
    }

    private Location getExpectedArrivalLocationFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedArrivalLocation();
    }

    private List<Airport> getExpectedDepartureLocationsFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedDepartureLocations();
    }

    private List<Airport> getExpectedArrivalLocationsFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedArrivalLocations();
    }

    private String getExpectedFlightDestinationAsStringFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedFlightDestination().getFlightDestination();
    }

    private FlightDestination getExpectedFlightDestinationFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedFlightDestination();
    }

    private String getExpectedCabinClassFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedCabinClass().getCabinClass();
    }

    private Date getExpectedDateFromDataProvider(LandingPageModel landingPageModel, LocationType locationType) {
        return switch (locationType) {
            case DEPARTURE -> landingPageModel.getExpectedDepartureDate();
            case ARRIVAL -> landingPageModel.getExpectedReturnDate();
        };
    }
}
