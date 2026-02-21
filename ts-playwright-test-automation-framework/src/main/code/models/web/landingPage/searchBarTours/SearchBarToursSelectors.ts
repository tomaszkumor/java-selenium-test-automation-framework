import { ActionsFactory } from "../../../../actionsFactory/ActionsFactory";

export class SearchBarToursSelectors extends ActionsFactory {
    toursTabSelector: string = "//ul[@id = 'tab']//button[@data-bs-target = '#tab-tours']";
    toursSearchBarSelector: string = "//div[@id = 'tab-tours']";
    citySpanSelector: string = "//select[@id = 'tours_city']/following-sibling::span[@dir = 'ltr']//span[@id = 'select2-tours_city-container']";
    cityInputSelector: string = "//input[@class = 'select2-search__field']";
    dateInputSelector: string = "//form[@id = 'tours-search']//input[@id = 'date']";
    travellersDropDownSelector: string = "//span[@class = 'guest_tours']/ancestor::div[contains(@class, 'dropdown-contain')]";
    citiesContainerSelector: string = "//div[@class = 'most--popular-tours']";
    searchButtonSelector: string = "//form[@id = 'tours-search']//button[@type = 'submit']";
    citySelector: string = "//div[@class = 'most--popular-tours']/div";
    datePickerWindowHeaderSelector: string = "//div[@class = 'datepicker dropdown-menu' and contains(@style, 'block')]/div[contains(@style, 'block')]//th[@class = 'switch']";
    datePickerWindowSelector: string = "//div[@class = 'datepicker dropdown-menu' and contains(@style, 'block')]";
    travellersWindowSelector: string = "//div[contains(@class, 'dropdown-menu') and contains(@style, 'block')]";
    h4Selector: string = "(//h4)[1]";
}