package models.desktop.landingPage.searchBarFlights;


import constants.Location;
import constants.LocationType;
import dataProviders.dataProvidersModels.Airport;
import dataProviders.dataProvidersModels.Date;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import lombok.SneakyThrows;
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
@SneakyThrows
    public SearchBarFlights selectFlightDestination(LandingPageModel landingPageModel) {
        selectSpecificFlightDestination(landingPageModel);
        compareFlightDestinies(landingPageModel);
Thread.sleep(5000);
        return this;
    }

    public SearchBarFlights selectCabinClass(LandingPageModel landingPageModel) {
        selectSpecificCabinClass(landingPageModel);
        compareCabinClasses(landingPageModel);

        return this;
    }

    public SearchBarFlights swapDepartureAndArrivalLocations() {
        String departureLocationBeforeSwap = get.getValueFromElement(departureLocationInput);
        String arrivalLocationBeforeSwap = get.getValueFromElement(arrivalLocationInput);

        click.clickOnEnabledElement(swapDirectionsButton, 15);

        String departureLocationAfterSwap = get.getValueFromElement(departureLocationInput);
        String arrivalLocationAfterSwap = get.getValueFromElement(arrivalLocationInput);

        SoftAssertions softAssertions = new SoftAssertions();
        softAssertions.assertThat(departureLocationAfterSwap).isEqualTo(arrivalLocationBeforeSwap);
        softAssertions.assertThat(arrivalLocationAfterSwap).isEqualTo(departureLocationBeforeSwap);
        softAssertions.assertAll();

        log.info("Locations has been swapped correctly.");

        return this;
    }

    public SearchBarFlights selectDepartureDate(LandingPageModel landingPageModel) {
        //TODO: Wprowadz do metod gaszenie DP od returnDate jesli FlightDestination = 'Return'
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

    public void selectDepartureDateYear(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.DEPARTURE, "Departure");
        checkIfDatePickerWindowIsDisplayed(true, "Departure");
        clickOnDatePickerHeader(constants.Date.YEAR);
        selectSpecificDate(landingPageModel, LocationType.DEPARTURE, constants.Date.YEAR);
        checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    public void selectDepartureDateMonth(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.DEPARTURE, "Departure");
        checkIfDatePickerWindowIsDisplayed(true, "Departure");
        clickOnDatePickerHeader(constants.Date.MONTH);
        selectSpecificDate(landingPageModel, LocationType.DEPARTURE, constants.Date.MONTH);
        checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    public void selectDepartureDateDay(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.DEPARTURE, "Departure");
        checkIfDatePickerWindowIsDisplayed(true, "Departure");
        selectSpecificDate(landingPageModel, LocationType.DEPARTURE, constants.Date.DAY);
        checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    public void selectReturnDateYear(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.ARRIVAL, "Arrival");
        checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        clickOnDatePickerHeader(constants.Date.YEAR);
        selectSpecificDate(landingPageModel, LocationType.ARRIVAL, constants.Date.YEAR);
        checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    public void selectReturnDateMonth(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.ARRIVAL, "Arrival");
        checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        clickOnDatePickerHeader(constants.Date.MONTH);
        selectSpecificDate(landingPageModel, LocationType.ARRIVAL, constants.Date.MONTH);
        checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    public void selectReturnDateDay(LandingPageModel landingPageModel) {
        clickOnDateInput(LocationType.ARRIVAL, "Arrival");
        checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        selectSpecificDate(landingPageModel, LocationType.ARRIVAL, constants.Date.DAY);
        checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    private void checkActualDepartureDate(LandingPageModel landingPageModel) {
        checkActualDate(landingPageModel, LocationType.DEPARTURE);
    }

    private void checkActualReturnDate(LandingPageModel landingPageModel) {
        checkActualDate(landingPageModel, LocationType.ARRIVAL);
    }

    private Date getExpectedDateFromDataProvider(LandingPageModel landingPageModel, LocationType locationType) {
        return switch (locationType) {
            case DEPARTURE -> landingPageModel.getExpectedDepartureDate();
            case ARRIVAL -> landingPageModel.getExpectedReturnDate();
        };
    }

    private void checkActualDate(LandingPageModel landingPageModel, LocationType locationType) {
        String actualDepartureDate = switch(locationType) {
            case DEPARTURE -> get.getValueFromElement(departureDateInput);
            case ARRIVAL -> get.getValueFromElement(returnDateInput);
        };

        Date expectedDate = getExpectedDateFromDataProvider(landingPageModel, locationType);

        String year = expectedDate.getYear();
        String month = String.format("%02d", expectedDate.getMonth().getValue());
        String day = String.format("%02d", Integer.parseInt(expectedDate.getDay()));
        String expectedDepartureDateAsString = day.concat("-").concat(month).concat("-").concat(year);

        assertThat(actualDepartureDate).isEqualTo(expectedDepartureDateAsString).as("Departure date check");
        System.out.println("actualDepartureDate: " + actualDepartureDate);
        System.out.println("expectedDepartureDateAsString: " + expectedDepartureDateAsString);
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
            log.info("{} date picker has been closed.", destination);
        }
    }

    private void clickOnDatePickerHeader(constants.Date date) {
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

    private void selectSpecificDate(LandingPageModel landingPageModel, LocationType locationType, constants.Date date) {
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

    public void selectPassengersNumber() {

    }


    public void clickOnSearchButton() {
        //TODO: Zrób to
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
                .isEqualTo(expectedLocationValue)
                .as("{} location check {} input", destination, inputStage);

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
        String expectedFlightDestinationValue = getExpectedFlightDestinationFromDataProvider(landingPageModel);
        Select flightDestinationSelect = new Select(this.flightDestinationSelect);
        flightDestinationSelect.selectByContainsVisibleText(expectedFlightDestinationValue);
    }

    private void selectSpecificCabinClass(LandingPageModel landingPageModel) {
        String expectedCabinClassValue = getExpectedCabinClassFromDataProvider(landingPageModel);
        Select cabinClassSelect = new Select(this.cabinClassSelect);
        cabinClassSelect.selectByContainsVisibleText(expectedCabinClassValue);
    }

    private void compareFlightDestinies(LandingPageModel landingPageModel) {
        String expectedFlightDestinationValue = getExpectedFlightDestinationFromDataProvider(landingPageModel);

        Select flightDestinationSelect = new Select(this.flightDestinationSelect);
        String actualFlightDestinationValue = get.getTextFromElement(flightDestinationSelect.getFirstSelectedOption());
        assertThat(actualFlightDestinationValue).isEqualTo(expectedFlightDestinationValue).as("Flight destination value check");

        log.info("Selected flight destination value: " + actualFlightDestinationValue);
    }

    private void compareCabinClasses(LandingPageModel landingPageModel) {
        String expectedCabinClassValue = getExpectedCabinClassFromDataProvider(landingPageModel);

        Select cabinClassSelect = new Select(this.cabinClassSelect);
        String actualCabinClassValue = get.getTextFromElement(cabinClassSelect.getFirstSelectedOption());
        assertThat(actualCabinClassValue).isEqualTo(expectedCabinClassValue).as("Cabin class value check");

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
                .doesNotHaveDuplicates()
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyInAnyOrderElementsOf(expectedLocations)
                .as("Locations check");
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
                .isTrue()
                .as("Flights tab activity check");

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

    private String getExpectedFlightDestinationFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedFlightDestination().getFlightDestination();
    }

    private String getExpectedCabinClassFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedCabinClass().getCabinClass();
    }
}
