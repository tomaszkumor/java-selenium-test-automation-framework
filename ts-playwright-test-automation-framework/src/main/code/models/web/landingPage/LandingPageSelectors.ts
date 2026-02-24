import { NavigationHeaderAndFooter } from "../navigation/NavigationHeaderAndFooter";

export class LandingPageSelectors extends NavigationHeaderAndFooter {
    tabHotelsSelector: string = "//span[contains(text(), 'Hotels')]/ancestor::button[@role = 'tab']";
    tabFlightsSelector: string = "//span[contains(text(), 'Flights')]/ancestor::button[@role = 'tab']";
    tabToursSelector: string = "//span[contains(text(), 'Tours')]/ancestor::button[@role = 'tab']";
    tabCarsSelector: string = "//span[contains(text(), 'Cars')]/ancestor::button[@role = 'tab']";
    tabVisaSelector: string = "//span[contains(text(), 'Visa')]/ancestor::button[@role = 'tab']";
    background: string = "//div[contains(@x-show, 'activeTab') and @role = 'tabpanel']/..";
}