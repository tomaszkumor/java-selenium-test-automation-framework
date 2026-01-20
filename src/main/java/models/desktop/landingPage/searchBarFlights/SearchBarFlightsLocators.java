package models.desktop.landingPage.searchBarFlights;

import basePageFactory.BasePageFactory;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.List;

public class SearchBarFlightsLocators extends BasePageFactory {
    @FindBy(xpath = "//ul[@id = 'tab']//button[@data-bs-target = '#tab-flights']")
    WebElement flightsTab;
    @FindBy(xpath = "//div[@id = 'tab-flights']")
    WebElement flightsSearchBar;
    @FindBy(xpath = "//select[contains(@class, 'flight_way')]")
    WebElement flightDestinationSelect;
    @FindBy(xpath = "//select[@id = 'flight_type']")
    WebElement cabinClassSelect;
    @FindBy(xpath = "//input[@name = 'from']")
    WebElement departureLocationInput;
    @FindBy(xpath = "//input[@name = 'to']")
    WebElement arrivalLocationInput;
    @FindBy(xpath = "//div[@id = 'swap']/*")
    WebElement swapDirectionsButton;
    @FindBy(xpath = "//input[@id = 'departure']")
    WebElement departureDateInput;
    @FindBy(xpath = "//input[@id = 'return_date']")
    WebElement returnDateInput;
    @FindBy(xpath = "//span[@class = 'guest_flights']/ancestor::div[contains(@class, 'dropdown-contain')]")
    WebElement travellersDropDown;
    @FindBy(xpath = "//button[@id = 'flights-search']")
    WebElement searchButton;
    @FindBy(xpath = "//div[contains(@class, 'results-container-from')]/div")
    List<WebElement> departureLocations;
    @FindBy(xpath = "//div[contains(@class, 'results-container-from')]")
    WebElement departureLocationsContainer;
    @FindBy(xpath = "//div[contains(@class, 'results-container-to')]/div")
    List<WebElement> arrivalLocations;
    @FindBy(xpath = "//div[contains(@class, 'results-container-to')]")
    WebElement arrivalLocationsContainer;
}
