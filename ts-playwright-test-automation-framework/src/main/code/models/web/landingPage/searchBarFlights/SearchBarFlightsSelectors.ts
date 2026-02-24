import { ActionsFactory } from "../../../../actionsFactory/ActionsFactory";

export class SearchBarFlightsSelectors extends ActionsFactory {
    flightsTabSelector: string = "//span[text() = 'flight_takeoff']/ancestor::button";
    h1Selector: string = "(//h1)[1]";
    bodySelector: string = "//body";
    flightsSearchBarSelector: string = "//div[@x-data = 'flightSearchData()']/..";
    flightTypeSelectSelector: string = "//label/text()[normalize-space(.) = 'Flight Type']/ancestor::div[@class = 'form-control']/div[@class = 'input-dropdown']//span[@x-text = 'getSelectedName()']";
    flightClassSelectSelector: string = "//label/text()[normalize-space(.) = 'Flight Class']/ancestor::div[@class = 'form-control']/div[@class = 'input-dropdown']//span[@x-text = 'getSelectedName()']";
    passengersDropDownSelector: string = "//label/text()[normalize-space(.) = 'Passengers']/ancestor::div[contains(@class, 'form-control')]/div[@class = 'input-dropdown']";
    departureLocationInputSelector: string = "//input[@x-ref = 'fromInput']";
    arrivalLocationInputSelector: string = "//input[@x-ref = 'toInput']";
    departureDateInputSelector: string = "//input[@name = 'flights_departure_date']";
    returnDateInputSelector: string = "//input[@name = 'flights_arrival_date']";
    searchButtonSelector: string = "//span[text() = 'Search Flights']/..";
    datePickerWindowSelector: string = "//div[@class = 'datepicker-days']/ancestor::div[contains(@class, 'datepicker') and not(contains(@class, 'hidden'))]";
    travellersWindowSelector: string = "//input[@name = 'passengers']/following-sibling::div[contains(@class, 'input-dropdown-content')]";
}