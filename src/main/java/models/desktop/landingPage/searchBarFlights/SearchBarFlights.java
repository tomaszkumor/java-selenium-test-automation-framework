package models.desktop.landingPage.searchBarFlights;


import constants.Location;
import dataProviders.dataProvidersModels.Airport;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;

import java.util.ArrayList;
import java.util.List;

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
        clickOnDepartureLocationInput();
        checkIfDepartureAirportsAreDisplayed();
        checkDepartureLocationsAvailability(landingPageModel);
        findAndSelectDepartureLocation(landingPageModel);

        return this;
    }

    public SearchBarFlights selectArrivalLocation(LandingPageModel landingPageModel) {
        clickOnArrivalLocationInput();
        checkIfArrivalAirportsAreDisplayed();
        checkArrivalLocationsAvailability(landingPageModel);
        findAndSelectArrivalLocation(landingPageModel);

        return this;
    }

    public SearchBarFlights selectFlightDestiny(LandingPageModel landingPageModel) {
        selectSpecificFlightDestiny(landingPageModel);
        compareFlightDestinies(landingPageModel);

        return this;
    }

    public SearchBarFlights selectCabinClass(LandingPageModel landingPageModel) {
        selectSpecificCabinClass(landingPageModel);
        compareCabinClasses(landingPageModel);

        return this;
    }

    public void clickOnSearchButton() {
        //TODO: Zrób to
    }

    private void selectSpecificFlightDestiny(LandingPageModel landingPageModel) {
        String expectedFlightDestinyValue = getExpectedFlightDestinyFromDataProvider(landingPageModel);
        Select flightDestinySelect = new Select(this.flightDestinySelect);
        flightDestinySelect.selectByContainsVisibleText(expectedFlightDestinyValue);
    }

    private void selectSpecificCabinClass(LandingPageModel landingPageModel) {
        String expectedCabinClassValue = getExpectedCabinClassFromDataProvider(landingPageModel);
        Select cabinClassSelect = new Select(this.cabinClassSelect);
        cabinClassSelect.selectByContainsVisibleText(expectedCabinClassValue);
    }

    private void compareFlightDestinies(LandingPageModel landingPageModel) {
        String expectedFlightDestinyValue = getExpectedFlightDestinyFromDataProvider(landingPageModel);

        Select flightDestinySelect = new Select(this.flightDestinySelect);
        String actualFlightDestinyValue = get.getTextFromElement(flightDestinySelect.getFirstSelectedOption());
        assertThat(actualFlightDestinyValue).isEqualTo(expectedFlightDestinyValue).as("Flight destiny value check");

        log.info("Selected flight destiny value: " + actualFlightDestinyValue);
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

    private void clickOnSpecificLocation(WebElement locationInput, Location location, String destiny) {
        String airportName = location.getAirportName();
        String airportCity = location.getAirportCity();
        String airportCountry = location.getAirportCountry();

        click.clickOnElement(locationInput, 15);
        log.info("{}, {}, {} has been set as {} location.", airportName, airportCity, airportCountry, destiny);
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

    private void clickOnLocationInput(WebElement location, String locationDestiny) {
        click.clickOnEnabledElement(location, 15);
        log.info(locationDestiny + " input has been clicked.");
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

    public void swapDepartureAndArrivalLocations() {

    }

    public void selectDepartureDate() {

    }

    public void selectReturnDate() {

    }

    public void selectPassengersNumber() {
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

    private String getExpectedFlightDestinyFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedFlightDestiny().getFlightDestiny();
    }

    private String getExpectedCabinClassFromDataProvider(LandingPageModel landingPageModel) {
        return landingPageModel.getExpectedCabinClass().getCabinClass();
    }
}
