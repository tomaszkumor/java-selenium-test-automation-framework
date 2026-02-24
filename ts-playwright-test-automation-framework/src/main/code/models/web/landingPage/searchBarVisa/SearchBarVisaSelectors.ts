import { ActionsFactory } from "../../../../actionsFactory/ActionsFactory";

export class SearchBarVisaSelectors extends ActionsFactory {
    h1Selector: string = "(//h1)[1]";
    visaTabSelector: string = "//span[contains(text(), 'Visa')]/ancestor::button[@role = 'tab']";
    countriesContainerSelector: string = "//div[@class = 'input-dropdown-content show']";
    departureSpanSelector: string = "//label/text()[normalize-space(.) = 'From Country']/ancestor::div[@class = 'form-control']/div[@class = 'input-dropdown']";
    arrivalSpanSelector: string = "//label/text()[normalize-space(.) = 'To Country']/ancestor::div[@class = 'form-control']/div[@class = 'input-dropdown']";
    arrivalCountryInputSelector: string = "//label/text()[normalize-space(.) = 'To Country']/ancestor::div[@class = 'form-control']//input[@x-ref = 'searchInput']";
    departureCountryInputSelector: string = "//label/text()[normalize-space(.) = 'From Country']/ancestor::div[@class = 'form-control']//input[@x-ref = 'searchInput']";
    dateInputSelector: string = "//input[@name = 'travel_date']";
    searchButtonSelector: string = "//span[normalize-space(text()) = 'Check Visa']/ancestor::button";
    countrySelector: string = "//div[@class = 'input-dropdown-content show']/div";
    datePickerWindowSelector: string = "//div[@class = 'datepicker-days']/ancestor::div[contains(@class, 'datepicker') and not(contains(@class, 'hidden'))]";
    visaTypeWindowSelector: string = "//input[@name = 'visa_type']/following-sibling::div[@class = 'input-dropdown-content show']";
    processingSpeedWindowSelector: string = "//input[@name = 'processing_speed']/following-sibling::div[@class = 'input-dropdown-content show']";
    travellersWindowSelector: string = "//input[@name = 'travelers']/following-sibling::div[@class = 'input-dropdown-content show']";
    visaTypeValueSelector: string = "//input[@name = 'visa_type']/following-sibling::div[not(@*[name() = 'x-bind:class'])]/span[@x-text]";
    processingSpeedValueSelector: string = "//input[@name = 'processing_speed']/following-sibling::div[not(@*[name() = 'x-bind:class'])]/span[@x-text]";
    travellersValueSelector: string = "(//input[@name = 'travelers']/following-sibling::div[not(@*[name() = 'x-bind:class'])]/span[@x-text])[1]";
    specificTravellerGroupCountLocator = "//span[@x-text = 'travelers']";
}