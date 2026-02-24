import { Locator } from "playwright";
import { Date } from "../../../../constants/common/Date";
import { Location } from "../../../../constants/common/Location";
import { LocationType } from "../../../../constants/common/LocationType";
import { DateModel } from "../../../../dataProviders/dataProvidersModels/web/commonModels/DateModel";
import { TravellerModel } from "../../../../dataProviders/dataProvidersModels/web/commonModels/TravellerModel";
import { PhpTravelsModel } from "../../../../dataProviders/dataProvidersModels/web/phpTravelsModel/PhpTravelsModel";
import { SearchBarFlightsSelectors } from "./SearchBarFlightsSelectors";
import { expect } from "playwright/test";
import { Traveller } from "../../../../constants/common/Traveller";
import { Arrow } from "../../../../constants/common/Arrow";
import { FlightsSearchPage } from "../../menu/flightsPage/flightsSearchPage/FlightsSearchPage";
import { logger } from "../../../../utils/logger/Logger";

export class SearchBarFlights extends SearchBarFlightsSelectors {
    private log = logger.child({ label: SearchBarFlights.name });

    public async checkIfPageIsLoaded(): Promise<FlightsSearchPage> {
        await this.checkIfTabIsActive();
        await this.checkIfSearchBarIsDisplayed();
        this.log.info("Flights search bar is displayed.");

        return this;
    }

    public async selectDepartureLocation(phpTravelsModel: PhpTravelsModel): Promise<FlightsSearchPage> {
        await this.checkDepartureLocationBeforeInput();
        await this.clickOnDepartureLocationInput();
        await this.typeCityNameToDepartureSearchInput(phpTravelsModel);
        await this.findAndSelectDepartureLocation(phpTravelsModel);
        await this.checkDepartureLocationAfterInput(phpTravelsModel);

        return this;
    }

    public async selectArrivalLocation(phpTravelsModel: PhpTravelsModel): Promise<FlightsSearchPage> {
        await this.checkArrivalLocationBeforeInput();
        await this.clickOnArrivalLocationInput();
        await this.typeCityNameToArrivalSearchInput(phpTravelsModel);
        await this.findAndSelectArrivalLocation(phpTravelsModel);
        await this.checkArrivalLocationAfterInput(phpTravelsModel);
        await this.closeDepartureDatePickerWindowIfNecessary();

        return this;
    }

    public async selectFlightType(phpTravelsModel: PhpTravelsModel): Promise<FlightsSearchPage> {
        await this.checkFlightTypeBeforeChange();
        await this.clickOnFlightTypeSelect();
        await this.selectSpecificFlightType(phpTravelsModel);
        await this.checkFlightTypeAfterChange(phpTravelsModel);

        return this;
    }

    public async selectFlightClass(phpTravelsModel: PhpTravelsModel): Promise<FlightsSearchPage> {
        await this.checkFlightClassBeforeChange();
        await this.clickOnFlightClassSelect();
        await this.selectSpecificFlightClass(phpTravelsModel);
        await this.checkFlightClassAfterChange(phpTravelsModel);

        return this;
    }

    public async selectDepartureDate(phpTravelsModel: PhpTravelsModel): Promise<FlightsSearchPage> {
        await this.clickOnDateInput(LocationType.DEPARTURE);
        await this.selectDepartureDateYear(phpTravelsModel);
        await this.selectDepartureDateMonth(phpTravelsModel);
        await this.selectDepartureDateDay(phpTravelsModel);
        await this.checkActualDepartureDate(phpTravelsModel);
        await this.scrollIntoSearchBarIfNecessary();

        return this;
    }

    public async selectReturnDate(phpTravelsModel: PhpTravelsModel): Promise<FlightsSearchPage> {
        await this.selectReturnDateYear(phpTravelsModel);
        await this.selectReturnDateMonth(phpTravelsModel);
        await this.selectReturnDateDay(phpTravelsModel);
        await this.checkActualReturnDate(phpTravelsModel);

        return this;
    }

    public async selectTravellers(phpTravelsModel: PhpTravelsModel): Promise<FlightsSearchPage> {
        await this.checkTravellersCountBeforeChange();
        await this.clickOnTravellersInput();
        await this.checkIfTravellersWindowIsDisplayed(true);
        await this.setAdultsNumber(phpTravelsModel);
        await this.setChildrenNumber(phpTravelsModel);
        await this.setInfantsNumber(phpTravelsModel);
        await this.closeTravellersWindow();
        await this.checkIfTravellersWindowIsDisplayed(false);
        await this.checkTravellersCountAfterChange(phpTravelsModel);

        return this;
    }

    public async clickOnSearchButton(): Promise<FlightsSearchPage> {
        await this.click.leftClick(this.searchButtonSelector, "Search button");
        this.log.info("Search button has been clicked.");

        return new FlightsSearchPage();
    }

    private async typeCityNameToDepartureSearchInput(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let city: string = this.getExpectedDepartureLocationFromDataProvider(phpTravelsModel).getAirportCity();
        await this.send.sendKeysToElementWithNoLeave(this.departureLocationInputSelector, city, "Departure location search input");
        this.log.info(`${city} has been typed to departure location search input.`);
    }

    private async typeCityNameToArrivalSearchInput(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let city: string = this.getExpectedArrivalLocationFromDataProvider(phpTravelsModel).getAirportCity();
        await this.send.sendKeysToElementWithNoLeave(this.arrivalLocationInputSelector, city, "Arrival location search input");
        this.log.info(`${city} has been typed to arrival location search input.`);
    }

    private async clickOnFlightTypeSelect(): Promise<void> {
        await this.click.leftClick(this.flightTypeSelectSelector, "Flight Type");
        this.log.info("Flight type select has been clicked.");
    }

    private async clickOnFlightClassSelect(): Promise<void> {
        await this.click.leftClick(this.flightClassSelectSelector, "Flight Class");
        this.log.info("Flight class select has been clicked.");
    }

    private async checkFlightTypeBeforeChange(): Promise<void> {
        let expectedFlightTypeValue: string = "One Way";
        await this.checkSelectValue(this.flightTypeSelectSelector, "flight type", expectedFlightTypeValue);
    }

    private async checkFlightTypeAfterChange(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedFlightTypeValue: string = this.getExpectedFlightTypeAsStringFromDataProvider(phpTravelsModel);
        await this.checkSelectValue(this.flightTypeSelectSelector, "flight type", expectedFlightTypeValue);
    }

    private async checkFlightClassBeforeChange(): Promise<void> {
        let expectedFlightClassValue: string = "Economy";
        await this.checkSelectValue(this.flightClassSelectSelector, "flight class", expectedFlightClassValue);
    }

    private async checkFlightClassAfterChange(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedFlightClassValue: string = this.getExpectedFlightClassFromDataProvider(phpTravelsModel);
        await this.checkSelectValue(this.flightClassSelectSelector, "flight class", expectedFlightClassValue);
    }

    private async checkSelectValue(selectSelector: string, selectName: string, expectedVisaTypeValue: string): Promise<void> {
        await this.check.hasText(selectSelector, expectedVisaTypeValue, selectName);
        this.log.info(`Selected ${selectName} value: ${expectedVisaTypeValue}.`);
    }

    private async closeTravellersWindow(): Promise<void> {
        await this.click.leftClick(this.h1Selector, "body");
    }

    private async setAdultsNumber(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkSpecificTravellersCountBeforeChange(Traveller.ADULTS);
        await this.changeSpecificTravellersGroupCount(phpTravelsModel, Traveller.ADULTS);
        await this.checkSpecificTravellersCountAfterChange(phpTravelsModel, Traveller.ADULTS);
    }

    private async setChildrenNumber(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkSpecificTravellersCountBeforeChange(Traveller.CHILDS);
        await this.changeSpecificTravellersGroupCount(phpTravelsModel, Traveller.CHILDS);
        await this.checkSpecificTravellersCountAfterChange(phpTravelsModel, Traveller.CHILDS);
    }

    private async setInfantsNumber(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkSpecificTravellersCountBeforeChange(Traveller.INFANTS);
        await this.changeSpecificTravellersGroupCount(phpTravelsModel, Traveller.INFANTS);
        await this.checkSpecificTravellersCountAfterChange(phpTravelsModel, Traveller.INFANTS);
    }

    private async checkTravellersCountBeforeChange(): Promise<void> {
        let travellersCountSelector: string = this.passengersDropDownSelector.concat("/div/span[@x-text = 'getPassengerText()']");
        let expectedTravellersCount: string = "1 Passenger";
        await this.check.hasText(travellersCountSelector, expectedTravellersCount, "Travellers count check before change");
    }

    private async checkTravellersCountAfterChange(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let travellersCountSelector: string = this.passengersDropDownSelector.concat("/div/span[@x-text = 'getPassengerText()']");
        let expectedTravellersCount: string = this.getTotalCountOfTravellers(phpTravelsModel).concat(" Passengers");
        await this.check.hasText(travellersCountSelector, expectedTravellersCount, "Travellers count check after change");
    }

    private getTotalCountOfTravellers(phpTravelsModel: PhpTravelsModel): string {
        let expectedAdultsCount: string = this.getExpectedSpecificTravellerGroupCountAfterChange(phpTravelsModel, Traveller.ADULTS);
        let expectedChildrenCount: string = this.getExpectedSpecificTravellerGroupCountAfterChange(phpTravelsModel, Traveller.CHILDS);
        let expectedInfantCount: string = this.getExpectedSpecificTravellerGroupCountAfterChange(phpTravelsModel, Traveller.INFANTS);

        let expectedAdultsCountAsNumber: number = parseInt(expectedAdultsCount);
        let expectedChildrenCountAsNumber: number = parseInt(expectedChildrenCount);
        let expectedInfantCountAsNumber: number = parseInt(expectedInfantCount);

        return String(expectedAdultsCountAsNumber + expectedChildrenCountAsNumber + expectedInfantCountAsNumber);
    }

    private async clickOnTravellersInput(): Promise<void> {
        await this.click.leftClick(this.passengersDropDownSelector, "Travellers drop down");
        this.log.info("Travellers drop down has been clicked.");
    }

    private async getActualSpecificTravellerGroupCount(traveller: Traveller): Promise<string> {
        let specificTravellerGroupCountLocator: string = this.getActualSpecificTravellerGroupCountSelector(traveller);

        return await this.get.getInnerText(specificTravellerGroupCountLocator, "Specific traveller group count");
    }

    private getActualSpecificTravellerGroupCountSelector(traveller: Traveller): string {
        let specificTravellerGroupClass: string;
        switch (traveller) {
            case Traveller.ADULTS:
                specificTravellerGroupClass = "adults";
                break;
            case Traveller.CHILDS:
                specificTravellerGroupClass = "children";
                break;
            case Traveller.INFANTS:
                specificTravellerGroupClass = "infants";
                break;
            default:
                throw new Error(`Unsupported traveller type ${traveller.getName()}`);
        };

        return `//div[contains(@class, 'show')]//span[@x-text = '${specificTravellerGroupClass}']`;
    }

    private compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount: string, expectedSpecificTravellerGroupCount: string, traveller: Traveller, stage: string): void {
        expect(actualSpecificTravellerGroupCount, `${traveller.getName()} count check ${stage} change`).toBe(expectedSpecificTravellerGroupCount);
    }

    private getExpectedSpecificTravellerGroupCountBeforeChange(traveller: Traveller): string {
        switch (traveller) {
            case Traveller.ADULTS:
                return "1";
            case Traveller.CHILDS:
            case Traveller.INFANTS:
                return "0";
            default:
                throw new Error(`Unsupported traveller type ${traveller.getName()}`);
        };
    }

    private getExpectedSpecificTravellerGroupCountAfterChange(phpTravelsModel: PhpTravelsModel, traveller: Traveller): string {
        let expectedTravellers: TravellerModel = this.getExpectedTravellersFromDataProvider(phpTravelsModel);

        switch (traveller) {
            case Traveller.ADULTS:
                return expectedTravellers.adultsCount!
            case Traveller.CHILDS:
                return expectedTravellers.childrenCount!;
            case Traveller.INFANTS:
                return expectedTravellers.infantsCount!;
            default:
                throw new Error(`Unsupported traveller type ${traveller.getName()}`);
        };
    }

    private async checkSpecificTravellersCountBeforeChange(traveller: Traveller): Promise<void> {
        let actualSpecificTravellerGroupCount: string = await this.getActualSpecificTravellerGroupCount(traveller);
        let expectedSpecificTravellerGroupCount: string = this.getExpectedSpecificTravellerGroupCountBeforeChange(traveller);
        this.compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount, expectedSpecificTravellerGroupCount, traveller, "before");
    }

    private async checkSpecificTravellersCountAfterChange(phpTravelsModel: PhpTravelsModel, traveller: Traveller): Promise<void> {
        let actualSpecificTravellerGroupCount: string = await this.getActualSpecificTravellerGroupCount(traveller);
        let expectedSpecificTravellerGroupCount: string = this.getExpectedSpecificTravellerGroupCountAfterChange(phpTravelsModel, traveller);
        this.compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount, expectedSpecificTravellerGroupCount, traveller, "after");
    }

    private getArrowButtonSelector(traveller: Traveller, arrow: Arrow): string {
        let arrowNumber: string
        switch (arrow) {
            case Arrow.LEFT:
                arrowNumber = "1";
                break;
            case Arrow.RIGHT:
                arrowNumber = "2";
                break;
            default:
                throw new Error(`Unsupported arrow ${arrow}`);
        };

        let specificTravellerGroupClass: string;
        switch (traveller) {
            case Traveller.ADULTS:
                specificTravellerGroupClass = "adults";
                break;
            case Traveller.CHILDS:
                specificTravellerGroupClass = "children";
                break;
            case Traveller.INFANTS:
                specificTravellerGroupClass = "infants";
                break;
            default:
                throw new Error(`Unsupported traveller type ${traveller.getName()}`);
        };

        return `//div[contains(@class, 'show')]//span[@x-text = '${specificTravellerGroupClass}']/../button[${arrowNumber}]`;
    }

    private async changeSpecificTravellersGroupCount(phpTravelsModel: PhpTravelsModel, traveller: Traveller): Promise<void> {
        let actualTravellersCount: string = await this.getActualSpecificTravellerGroupCount(traveller);
        let expectedTravellersCount: string = this.getExpectedSpecificTravellerGroupCountAfterChange(phpTravelsModel, traveller);
        let actualTravellersCountAsNumber: number = parseInt(actualTravellersCount);
        let expectedTravellersCountAsNumber: number = parseInt(expectedTravellersCount);

        if (actualTravellersCountAsNumber > expectedTravellersCountAsNumber) {
            let arrowSelector: string = this.getArrowButtonSelector(traveller, Arrow.LEFT);

            do {
                await this.check.isEnabled(arrowSelector, "Arrow");
                await this.click.leftClick(arrowSelector, "Arrow");
                actualTravellersCount = await this.getActualSpecificTravellerGroupCount(traveller);
                actualTravellersCountAsNumber = parseInt(actualTravellersCount);

                this.log.info(`Actual ${traveller.getName()} count has been decreased to ${actualTravellersCount}.`);
            } while (actualTravellersCountAsNumber > expectedTravellersCountAsNumber);
        } else if (actualTravellersCountAsNumber < expectedTravellersCountAsNumber) {
            let arrowSelector: string = this.getArrowButtonSelector(traveller, Arrow.RIGHT);

            do {
                await this.check.isEnabled(arrowSelector, "Arrow");
                await this.click.leftClick(arrowSelector, "Arrow");
                actualTravellersCount = await this.getActualSpecificTravellerGroupCount(traveller);
                actualTravellersCountAsNumber = parseInt(actualTravellersCount);

                this.log.info(`Actual ${traveller.getName()} count has been increased to ${actualTravellersCount}.`);
            } while (actualTravellersCountAsNumber < expectedTravellersCountAsNumber);
        }
    }

    private async selectDepartureDateYear(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkIfDatePickerWindowIsDisplayed(true, "Departure");
        await this.clickOnDatePickerHeader(Date.YEAR);
        await this.selectSpecificDate(phpTravelsModel, LocationType.DEPARTURE, Date.YEAR);
    }

    private async selectDepartureDateMonth(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.selectSpecificDate(phpTravelsModel, LocationType.DEPARTURE, Date.MONTH);
    }

    private async selectDepartureDateDay(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.selectSpecificDate(phpTravelsModel, LocationType.DEPARTURE, Date.DAY);
        await this.checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    private async selectReturnDateYear(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.clickOnDateInput(LocationType.ARRIVAL);
        await this.checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        await this.scrollIntoSearchBarIfNecessary();
        await this.clickOnDatePickerHeader(Date.YEAR);
        await this.selectSpecificDate(phpTravelsModel, LocationType.ARRIVAL, Date.YEAR);
        await this.checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    private async selectReturnDateMonth(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.clickOnDateInput(LocationType.ARRIVAL);
        await this.checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        await this.scrollIntoSearchBarIfNecessary();
        await this.clickOnDatePickerHeader(Date.MONTH);
        await this.selectSpecificDate(phpTravelsModel, LocationType.ARRIVAL, Date.MONTH);
        await this.checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    private async selectReturnDateDay(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.clickOnDateInput(LocationType.ARRIVAL);
        await this.checkIfDatePickerWindowIsDisplayed(true, "Arrival");
        await this.scrollIntoSearchBarIfNecessary();
        await this.selectSpecificDate(phpTravelsModel, LocationType.ARRIVAL, Date.DAY);
        await this.checkIfDatePickerWindowIsDisplayed(false, "Arrival");
    }

    private async closeDepartureDatePickerWindowIfNecessary(): Promise<void> {
        await this.checkIfDatePickerWindowIsDisplayed(true, "Departure");
        await this.click.leftClick(this.bodySelector, "body");
        await this.checkIfDatePickerWindowIsDisplayed(false, "Departure");
    }

    private async scrollIntoSearchBarIfNecessary(): Promise<void> {
        let locator: Locator = await this.get.getLocator(this.flightsSearchBarSelector);
        await locator.scrollIntoViewIfNeeded();
    }

    private async checkActualDepartureDate(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkActualDate(phpTravelsModel, LocationType.DEPARTURE);
    }

    private async checkActualReturnDate(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkActualDate(phpTravelsModel, LocationType.ARRIVAL);
    }

    private async checkActualDate(phpTravelsModel: PhpTravelsModel, locationType: LocationType): Promise<void> {
        switch (locationType) {
            case LocationType.DEPARTURE:
                await this.check.isEnabled(this.departureDateInputSelector, "Departure date input");
                break;
            case LocationType.ARRIVAL:
                await this.check.isEnabled(this.returnDateInputSelector, "Return date input");
                break;
        }

        let actualDate: string;
        switch (locationType) {
            case LocationType.DEPARTURE:
                actualDate = await this.get.getInputValue(this.departureDateInputSelector, "Departure date input");
                break;
            case LocationType.ARRIVAL:
                actualDate = await this.get.getInputValue(this.returnDateInputSelector, "Return date input");
                break;
            default:
                throw new Error(`Unsupported location type ${locationType.getName()}`);
        };

        let expectedDate: DateModel = this.getExpectedDateFromDataProvider(phpTravelsModel, locationType);

        let year: string = expectedDate.year!;
        let month: string = expectedDate.month!.toNumberWithZero();
        let day: string = expectedDate.day!.toString().padStart(2, "0");
        let expectedDateAsString: string = day.concat("-").concat(month).concat("-").concat(year);

        expect(actualDate, "date check").toBe(expectedDateAsString);
    }

    private async clickOnDateInput(locationType: LocationType): Promise<void> {
        switch (locationType) {
            case LocationType.DEPARTURE:
                await this.check.isElementPresent(this.departureDateInputSelector, "Selector");
                await this.click.leftClick(this.departureDateInputSelector, "Departure date input");
                break;
            case LocationType.ARRIVAL:
                await this.check.isElementPresent(this.returnDateInputSelector, "Selector");
                await this.click.leftClick(this.returnDateInputSelector, "Return date input");
                break;
        }

        this.log.info(`${locationType.getName()} date picker input has been clicked.`);
    }

    private async checkIfDatePickerWindowIsDisplayed(shouldBeDisplayed: boolean, destination: string): Promise<void> {
        await this.checkIfWindowIsDisplayed(this.datePickerWindowSelector, destination + " date picker window", shouldBeDisplayed);
    }

    private async checkIfTravellersWindowIsDisplayed(shouldBeDisplayed: boolean): Promise<void> {
        await this.checkIfWindowIsDisplayed(this.travellersWindowSelector, "Travellers window", shouldBeDisplayed);
    }

    private async checkIfWindowIsDisplayed(windowSelector: string, windowName: string, shouldBeDisplayed: boolean): Promise<void> {
        if (shouldBeDisplayed) {
            await this.check.isElementPresent(windowSelector, windowName);
            await this.check.isVisible(windowSelector, windowName);
            this.log.info(`${windowName} window has been displayed.`);
        } else {
            await this.check.isNotVisible(windowSelector, windowName);
            this.log.info(`${windowName} window has been closed.`);
        }
    }

    private async clickOnDatePickerHeader(date: Date): Promise<void> {
        let iterator: number;
        switch (date) {
            case Date.YEAR:
                iterator = 2;
                break;
            case Date.MONTH:
                iterator = 1;
                break;
            default:
                iterator = 0;
                break;
        };

        for (let i = 0; i < iterator; i++) {
            let datePickerWindowHeaderSelector: string = this.getDatePickerWindowHeaderSelector(i);

            await this.check.isElementPresent(datePickerWindowHeaderSelector, "Date picker window header");
            await this.click.leftClick(datePickerWindowHeaderSelector, "Date picker window header");

            this.log.info("Date picker header has been clicked.");
        }
    }

    private getDatePickerWindowHeaderSelector(i: number): string {
        let selectorPart: string;
        switch (i) {
            case 0:
                selectorPart = "days";
                break;
            case 1:
                selectorPart = "months";
                break;
            default:
                throw new Error("Unsupported number");
        };

        return `//div[@class = 'datepicker-${selectorPart}']/ancestor::div[contains(@class, 'datepicker') and not(contains(@class, 'hidden'))]/div[@class = 'datepicker-${selectorPart}']//th[contains(@class, 'switch')]`;
    }

    private async selectSpecificDate(phpTravelsModel: PhpTravelsModel, locationType: LocationType, date: Date): Promise<void> {
        let expectedDate: DateModel = this.getExpectedDateFromDataProvider(phpTravelsModel, locationType);

        let specificDate: string;
        switch (date) {
            case Date.YEAR:
                specificDate = expectedDate.year!;
                break;
            case Date.MONTH:
                specificDate = expectedDate.month!.toShortString();
                break;
            case Date.DAY:
                let day: string = expectedDate.day!;
                specificDate = day.length == 2 && day.startsWith("0") ? day.substring(1) : day;
                break;
            default:
                throw new Error(`Unsupported date: ${date}`);
        }

        let dateButtonSelector: string;
        switch (date) {
            case Date.YEAR:
                dateButtonSelector = `//div[@class = 'datepicker-years']/ancestor::div[contains(@class, 'datepicker') and not(contains(@class, 'hidden'))]/div[@class = 'datepicker-years']//span[text() = '${specificDate}']`;
                break;
            case Date.MONTH:
                dateButtonSelector = `//div[@class = 'datepicker-months']/ancestor::div[contains(@class, 'datepicker') and not(contains(@class, 'hidden'))]/div[@class = 'datepicker-months']//span[text() = '${specificDate}']`;
                break;
            case Date.DAY:
                dateButtonSelector = `//div[@class = 'datepicker-days']/ancestor::div[contains(@class, 'datepicker') and not(contains(@class, 'hidden'))]/div[@class = 'datepicker-days']//div[text() = '${specificDate}' and not(contains(@class, 'old'))]`;
                break;
            default:
                throw new Error(`Unsupported date: ${date}`);
        }

        let locator: Locator = await this.get.getLocator(this.flightsSearchBarSelector);
        await locator.scrollIntoViewIfNeeded();
        await this.check.isInViewport(dateButtonSelector, "Date picker window");
        await this.check.isElementPresent(dateButtonSelector, "Date picker window");

        await this.click.leftClick(dateButtonSelector, "Date button");
        this.log.info(`${locationType.getName()} date: ${date.getName()} ${specificDate} has been clicked.`);
    }

    private async checkDepartureLocationBeforeInput(): Promise<void> {
        await this.compareLocationBeforeOrAfterInput("", this.departureLocationInputSelector, "Departure", "before");
    }

    private async checkArrivalLocationBeforeInput(): Promise<void> {
        await this.compareLocationBeforeOrAfterInput("", this.arrivalLocationInputSelector, "Arrival", "before");
    }

    private async checkDepartureLocationAfterInput(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedDepartureLocation: string = this.getExpectedLocationValueAfterInput(phpTravelsModel, LocationType.DEPARTURE);
        await this.compareLocationBeforeOrAfterInput(expectedDepartureLocation, this.departureLocationInputSelector, "Departure", "after");
    }

    private async checkArrivalLocationAfterInput(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedArrivalLocation: string = this.getExpectedLocationValueAfterInput(phpTravelsModel, LocationType.ARRIVAL);
        await this.compareLocationBeforeOrAfterInput(expectedArrivalLocation, this.arrivalLocationInputSelector, "Arrival", "after");
    }

    private async compareLocationBeforeOrAfterInput(expectedLocationValue: string, elementSelector: string, destination: string, inputStage: string): Promise<void> {
        await this.check.hasValue(elementSelector, expectedLocationValue, "Location value");
        this.log.info(`${destination} location ${inputStage} input value meets expected value.`);
    }

    private getExpectedLocationValueAfterInput(phpTravelsModel: PhpTravelsModel, locationType: LocationType): string {
        let expectedLocationCode: string;
        let expectedLocationName: string;

        switch (locationType) {
            case LocationType.DEPARTURE:
                expectedLocationCode = this.getExpectedDepartureLocationFromDataProvider(phpTravelsModel).getAirportCode();
                expectedLocationName = this.getExpectedDepartureLocationFromDataProvider(phpTravelsModel).getAirportName();
                return expectedLocationCode.concat(" - ").concat(expectedLocationName);

            case LocationType.ARRIVAL:
                expectedLocationCode = this.getExpectedArrivalLocationFromDataProvider(phpTravelsModel).getAirportCode();
                expectedLocationName = this.getExpectedArrivalLocationFromDataProvider(phpTravelsModel).getAirportName();
                return expectedLocationCode.concat(" - ").concat(expectedLocationName);

            default:
                throw new Error(`Unsupported arrow: ${locationType.getName()}`);
        }
    }

    private async selectSpecificFlightType(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedFlightTypeValue: string = this.getExpectedFlightTypeAsStringFromDataProvider(phpTravelsModel);
        let specificFlightTypeSelector: string = `//span[@x-text = 'type.name' and text() = '${expectedFlightTypeValue}']/..`;
        await this.click.leftClick(specificFlightTypeSelector, `${expectedFlightTypeValue} flight type select`);
    }

    private async selectSpecificFlightClass(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedFlightClassValue: string = this.getExpectedFlightClassFromDataProvider(phpTravelsModel);
        let specificFlightClassSelector: string = `//span[@x-text = 'cls.name' and text() = '${expectedFlightClassValue}']/..`;
        await this.click.leftClick(specificFlightClassSelector, `${expectedFlightClassValue} flight type select`);
    }

    private async findAndSelectDepartureLocation(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedDepartureLocation: Location = this.getExpectedDepartureLocationFromDataProvider(phpTravelsModel);
        let locationSelector: string = this.getExpectedDepartureLocationInputSelector(expectedDepartureLocation);
        await this.clickOnSpecificLocation(locationSelector, expectedDepartureLocation, "departure");
    }

    private async findAndSelectArrivalLocation(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedArrivalLocation: Location = this.getExpectedArrivalLocationFromDataProvider(phpTravelsModel);
        let locationSelector: string = this.getExpectedArrivalLocationInputSelector(expectedArrivalLocation);
        await this.clickOnSpecificLocation(locationSelector, expectedArrivalLocation, "arrival");
    }

    private async clickOnSpecificLocation(locationInputSelector: string, location: Location, destination: string): Promise<void> {
        let airportName: string = location.getAirportName();
        let airportCity: string = location.getAirportCity();
        let airportCountry: string = location.getAirportCountry();

        await this.click.leftClick(locationInputSelector, "Location input");
        this.log.info(`${airportName}, ${airportCity}, ${airportCountry} has been set as ${destination} location.`);
    }

    private getExpectedDepartureLocationInputSelector(expectedDepartureLocation: Location): string {
        let locationCode: string = expectedDepartureLocation.getAirportCode();

        return `//span[@x-text = 'a.id' and text() = '${locationCode}']/../..`;
    }

    private getExpectedArrivalLocationInputSelector(expectedDepartureLocation: Location): string {
        let locationCode: string = expectedDepartureLocation.getAirportCode();

        return `//span[@x-text = 'a.id' and text() = '${locationCode}']/../..`;
    }

    private async checkIfTabIsActive(): Promise<void> {
        await this.check.containsAttribute(this.flightsTabSelector, "class", "text-primary", "Flights tab activity");
        this.log.info("Flights tab is an active tab.");
    }

    private async checkIfSearchBarIsDisplayed(): Promise<void> {
        await this.check.isVisible(this.flightsSearchBarSelector, "Flights search bar");
        this.log.info("Flights search bar has been displayed.");
    }

    private async clickOnDepartureLocationInput(): Promise<void> {
        await this.clickOnLocationInput(this.departureLocationInputSelector, "Departure");
    }

    private async clickOnArrivalLocationInput(): Promise<void> {
        await this.clickOnLocationInput(this.arrivalLocationInputSelector, "Arrival");
    }

    private async clickOnLocationInput(cabinClassLocator: string, locationDestination: string): Promise<void> {
        await this.click.leftClick(cabinClassLocator, "Location");
        this.log.info(`${locationDestination} input has been clicked.`);
    }

    private getExpectedDepartureLocationFromDataProvider(phpTravelsModel: PhpTravelsModel): Location {
        return phpTravelsModel.flightsPageModel!.expectedDepartureLocation!;
    }

    private getExpectedArrivalLocationFromDataProvider(phpTravelsModel: PhpTravelsModel): Location {
        return phpTravelsModel.flightsPageModel!.expectedArrivalLocation!;
    }

    private getExpectedFlightTypeAsStringFromDataProvider(phpTravelsModel: PhpTravelsModel): string {
        return phpTravelsModel.flightsPageModel!.expectedFlightType!.getName();;
    }

    private getExpectedFlightClassFromDataProvider(phpTravelsModel: PhpTravelsModel): string {
        return phpTravelsModel.flightsPageModel!.expectedFlightClass!.getName();
    }

    private getExpectedDateFromDataProvider(phpTravelsModel: PhpTravelsModel, locationType: LocationType): DateModel {
        switch (locationType) {
            case LocationType.DEPARTURE:
                return phpTravelsModel.flightsPageModel!.expectedDepartureDate!;
            case LocationType.ARRIVAL:
                return phpTravelsModel.flightsPageModel!.expectedReturnDate!;
            default:
                throw new Error(`Unsupported location type ${locationType.getName()}`);
        };
    }

    private getExpectedTravellersFromDataProvider(phpTravelsModel: PhpTravelsModel): TravellerModel {
        return phpTravelsModel.flightsPageModel!.expectedTravellers!;
    }
}