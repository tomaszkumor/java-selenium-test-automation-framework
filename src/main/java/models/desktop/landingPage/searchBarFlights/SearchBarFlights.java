package models.desktop.landingPage.searchBarFlights;


import constants.Language;
import dataProviders.dataProvidersModels.Airport;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

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

    //TODO: Tu trzeba przekazac obiekt z nazwa lotniska
    public void selectFlightDirection() {
        // kliknij na inputa z miejscami wylotu
        click.clickOnEnabledElement(departureLocationInput, 15);

        // sprawdz czy pojawil sie container
        check.isElementDisplayed(departureLocationsContainer, 15);

        // Sprawdz czy na liscie lotnisk pojawily sie lotniska
        By departureAirportLocator = By.xpath("//div[contains(@class, 'results-container-from')]/div");
        check.isNumberOfElementsGreaterThan(departureAirportLocator, 0, 50, 10);

        // pobierz aktualna liste lotnisk
        List<Airport> actualDepartureAirports = getActualDepartureAirportsFromDataProvider();

        // pobierz oczekiwana liste lotnisk
        List<Airport> expectedDepartureAirports = getExpectedDepartureAirportsFromDataProvider();

        // porownaj obie listy
        compareAirports(actualDepartureAirports, expectedDepartureAirports);
        // napisz lokator do ktorego wpiszesz nazwe lotniska
        // stworz webelement
        // kliknij w niego
    }

    private void compareAirports(List<Airport> actualDepartureAirports, List<Airport> expectedDepartureAirports) {
        assertThat(actualDepartureAirports)
                .doesNotHaveDuplicates()
                .usingRecursiveFieldByFieldElementComparator()
                .containsExactlyInAnyOrderElementsOf(expectedDepartureAirports);
    }

    private List<Airport> getActualDepartureAirportsFromDataProvider() {
        List<Airport> actualDepartureLocations = new ArrayList<>();

        for (WebElement departureLocation : departureLocations) {
            String airportName = get.getTextFromElement(departureLocation.findElement(By.xpath(".//small[contains(@class, 'airport--name')]")));
            String airportCountry = get.getTextFromElement(departureLocation.findElement(By.xpath(".//strong/small")));
            String airportCode = get.getTextFromElement(departureLocation.findElement(By.xpath("./button")));

            JavascriptExecutor js = (JavascriptExecutor) getWebDriver().getDriver();
            String airportCity = (String) js.executeScript(
                    """
                                var node = arguments[0].firstChild;
                                return (node && node.nodeType === 3) ? node.textContent.trim() : '';
                            """,
                    departureLocation.findElement(By.xpath(".//strong"))
            );

            actualDepartureLocations.add(new Airport(airportName, airportCity, airportCountry, airportCode));
        }

        return actualDepartureLocations;
    }

    private List<Airport> getExpectedDepartureAirportsFromDataProvider() {
        //TODO: To trzeba dostarczyc z DP
        return List.of(
                new Airport("London Heathrow Airport", "London", "United Kingdom", "LHR"),
                new Airport("Berlin Brandenburg Willy Brandt", "Berlin", "Germany", "BER"),
                new Airport("Ninoy Aquino International Airport", "Manila", "Philippines", "MNL"),
                new Airport("King Abdulaziz International Airport", "Jeddah", "Saudi Arabia", "JED"),
                new Airport("All Airports", "New York", "United States", "NYC"),
                new Airport("Domodedovo International Airport", "Moscow", "Russia", "DME"),
                new Airport("Singapore Changi Airport", "Singapore", "Singapore", "SIN")
        );
    }

    public void selectCabinClass() {
    }

    public void selectDepartureLocation() {

    }

    public void selectArrivalLocation() {

    }

    public void swapDepartureAndArrivalLocations() {

    }

    public void selectDepartureDate() {

    }

    public void selectReturnDate() {

    }

    public void selectPassengersNumber() {
    }


    private void checkIfTabIsActive() {
        assertThat(check.isAttributeEqualTo(flightsTab, "aria-selected", "true", 50, 5))
                .as("Check whether 'Flights' tab is an active tab")
                .isTrue();

        log.info("Flights tab is an active tab.");
    }

    private void checkIfSearchBarIsDisplayed() {
        check.isElementDisplayed(flightsSearchBar, 15);
        log.info("Flights search bar has been displayed");
    }
}
