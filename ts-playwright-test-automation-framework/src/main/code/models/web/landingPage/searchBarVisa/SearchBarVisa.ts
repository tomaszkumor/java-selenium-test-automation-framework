import { expect } from "playwright/test";
import { DateModel } from "../../../../dataProviders/dataProvidersModels/web/commonModels/DateModel";
import { DestinationModel } from "../../../../dataProviders/dataProvidersModels/web/commonModels/DestinationModel";
import { PhpTravelsModel } from "../../../../dataProviders/dataProvidersModels/web/phpTravelsModel/PhpTravelsModel";
import { SearchBarVisaSelectors } from "./SearchBarVisaSelectors";
import { Date } from "../../../../constants/common/Date";
import { ProcessingSpeedType } from "../../../../constants/visaPage/ProcessingSpeedType";
import { VisaType } from "../../../../constants/visaPage/VisaType";
import { Arrow } from "../../../../constants/common/Arrow";
import { VisaSearchPage } from "../../menu/visaPage/visaSearchPage/VisaSearchPage";
import { logger } from "../../../../utils/logger/Logger";

export class SearchBarVisa extends SearchBarVisaSelectors {
    private log = logger.child({ label: SearchBarVisa.name });

    public async checkIfPageIsLoaded(): Promise<SearchBarVisa> {
        await this.checkIfTabIsActive();
        await this.checkIfSearchBarIsDisplayed();
        this.log.info("Visa search bar is displayed.");

        return this;
    }

    public async selectDepartureCountry(phpTravelsModel: PhpTravelsModel): Promise<SearchBarVisa> {
        await this.checkDepartureCountryBeforeInput();
        await this.clickOnDepartureCountryInput();
        await this.checkIfCountriesAreDisplayed();
        await this.findAndSelectDepartureCountry(phpTravelsModel);
        await this.checkDepartureCountryAfterInput(phpTravelsModel);

        return this;
    }

    public async selectArrivalCountry(phpTravelsModel: PhpTravelsModel): Promise<SearchBarVisa> {
        await this.checkArrivalCountryBeforeInput();
        await this.clickOnArrivalCountryInput();
        await this.checkIfCountriesAreDisplayed();
        await this.findAndSelectArrivalCountry(phpTravelsModel);
        await this.checkArrivalCountryAfterInput(phpTravelsModel);

        return this;
    }

    public async selectDate(phpTravelsModel: PhpTravelsModel): Promise<SearchBarVisa> {
        await this.clickOnDateInput();
        await this.selectCheckInDateYear(phpTravelsModel);
        await this.selectCheckInDateMonth(phpTravelsModel);
        await this.selectCheckInDateDay(phpTravelsModel);
        await this.checkActualCheckInDate(phpTravelsModel);

        return this;
    }

    public async selectVisaType(phpTravelsModel: PhpTravelsModel): Promise<SearchBarVisa> {
        await this.checkVisaTypeValueBeforeChange();
        await this.clickOnVisaTypeSelect();
        await this.checkIfVisaTypeWindowIsDisplayed(true);
        await this.selectSpecificVisaType(phpTravelsModel);
        await this.checkIfVisaTypeWindowIsDisplayed(false);
        await this.checkVisaTypeValueAfterChange(phpTravelsModel);

        return this;
    }

    public async selectProcessingSpeed(phpTravelsModel: PhpTravelsModel): Promise<SearchBarVisa> {
        await this.checkProcessingSpeedValueBeforeChange();
        await this.clickOnProcessingSpeedSelect();
        await this.checkIfProcessingSpeedWindowIsDisplayed(true);
        await this.selectSpecificProcessingSpeed(phpTravelsModel);
        await this.checkIfProcessingSpeedWindowIsDisplayed(false);
        await this.checkProcessingSpeedValueAfterChange(phpTravelsModel);

        return this;
    }

    public async selectTravellers(phpTravelsModel: PhpTravelsModel): Promise<SearchBarVisa> {
        await this.checkTravellersValueBeforeChange();
        await this.clickOnTravellersSelect();
        await this.checkIfTravellersWindowIsDisplayed(true);
        await this.setTravellersNumber(phpTravelsModel);
        await this.closeTravellersWindow();
        await this.checkIfTravellersWindowIsDisplayed(false);
        await this.checkTravellersValueAfterChange(phpTravelsModel);

        return this;
    }

    public async clickOnSearchButton(): Promise<VisaSearchPage> {
        await this.click.leftClick(this.searchButtonSelector, "Search button");
        this.log.info("Search button has been clicked.");

        return new VisaSearchPage();
    }

    private async setTravellersNumber(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkSpecificTravellersCountBeforeChange();
        await this.changeSpecificTravellersGroupCount(phpTravelsModel);
        await this.checkSpecificTravellersCountAfterChange(phpTravelsModel);
    }

    private async checkSpecificTravellersCountBeforeChange(): Promise<void> {
        let actualSpecificTravellerGroupCount: string = await this.getActualSpecificTravellerGroupCount();
        let expectedSpecificTravellerGroupCount: string = this.getExpectedSpecificTravellerGroupCountBeforeChange();
        this.compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount, expectedSpecificTravellerGroupCount, "before");
    }

    private async checkSpecificTravellersCountAfterChange(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let actualSpecificTravellerGroupCount: string = await this.getActualSpecificTravellerGroupCount();
        let expectedSpecificTravellerGroupCount: string = this.getExpectedTravellersFromDataProvider(phpTravelsModel);
        this.compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount, expectedSpecificTravellerGroupCount, "after");
    }

    private compareSpecificTravellerGroupCount(actualSpecificTravellerGroupCount: string, expectedSpecificTravellerGroupCount: string, stage: string): void {
        expect(actualSpecificTravellerGroupCount, `Travellers count check ${stage} change`).toBe(expectedSpecificTravellerGroupCount);
    }

    private getExpectedSpecificTravellerGroupCountBeforeChange(): string {
        return "1";
    }

    private async getActualSpecificTravellerGroupCount(): Promise<string> {
        return await this.get.getInnerText(this.specificTravellerGroupCountLocator, "Specific traveller group count");
    }

    private async changeSpecificTravellersGroupCount(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let actualTravellersCount: string = await this.getActualSpecificTravellerGroupCount();
        let expectedTravellersCount: string = this.getExpectedTravellersFromDataProvider(phpTravelsModel);
        let actualTravellersCountAsNumber: number = parseInt(actualTravellersCount);
        let expectedTravellersCountAsNumber: number = parseInt(expectedTravellersCount);

        if (actualTravellersCountAsNumber > expectedTravellersCountAsNumber) {
            let arrowSelector: string = this.getArrowButtonSelector(Arrow.LEFT);

            do {
                await this.check.isEnabled(arrowSelector, "Arrow");
                await this.click.leftClick(arrowSelector, "Arrow");
                actualTravellersCount = await this.getActualSpecificTravellerGroupCount();
                actualTravellersCountAsNumber = parseInt(actualTravellersCount);

                this.log.info(`Actual count has been decreased to ${actualTravellersCount}.`);
            } while (actualTravellersCountAsNumber > expectedTravellersCountAsNumber);
        } else if (actualTravellersCountAsNumber < expectedTravellersCountAsNumber) {
            let arrowSelector: string = this.getArrowButtonSelector(Arrow.RIGHT);

            do {
                await this.check.isEnabled(arrowSelector, "Arrow");
                await this.click.leftClick(arrowSelector, "Arrow");
                actualTravellersCount = await this.getActualSpecificTravellerGroupCount();
                actualTravellersCountAsNumber = parseInt(actualTravellersCount);

                this.log.info(`Actual count has been increased to ${actualTravellersCount}.`);
            } while (actualTravellersCountAsNumber < expectedTravellersCountAsNumber);
        }
    }

    private getArrowButtonSelector(arrow: Arrow): string {
        let arrowDirection: string;
        switch (arrow) {
            case Arrow.LEFT:
                arrowDirection = "remove";
                break;
            case Arrow.RIGHT:
                arrowDirection = "add";
                break;
            default:
                throw new Error(`Unsupported arrow: ${arrow}`);
        };

        return this.travellersWindowSelector.concat(`//span[text() = '${arrowDirection}']/..`);
    }

    private async closeTravellersWindow(): Promise<void> {
        await this.click.leftClick(this.h1Selector, "h1");
    }

    private async clickOnVisaTypeSelect(): Promise<void> {
        let visaTypeSelectSelector: string = this.visaTypeValueSelector.concat("/..");
        await this.click.leftClick(visaTypeSelectSelector, "Visa type select");
        this.log.info("Visa type select has been clicked.");
    }

    private async clickOnProcessingSpeedSelect(): Promise<void> {
        let processingSpeedSelectSelector: string = this.processingSpeedValueSelector.concat("/..");
        await this.click.leftClick(processingSpeedSelectSelector, "Processing speed select");
        this.log.info("Processing speed select has been clicked.");
    }

    private async clickOnTravellersSelect(): Promise<void> {
        let travellersSelectSelector: string = this.travellersValueSelector.concat("/..");
        await this.click.leftClick(travellersSelectSelector, "Travellers select");
        this.log.info("Travellers select has been clicked.");
    }

    private async clickOnDateInput(): Promise<void> {
        await this.check.isElementPresent(this.dateInputSelector, "Date input");
        await this.click.leftClick(this.dateInputSelector, "Date input");

        this.log.info("Date picker input has been clicked.");
    }

    private async selectSpecificVisaType(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedVisaTypeValue: string = this.getExpectedVisaTypeFromDataProvider(phpTravelsModel);
        let specificVisaTypeSelector: string = this.visaTypeWindowSelector.concat("//span[text() = '" + expectedVisaTypeValue + "']/..");
        await this.click.leftClick(specificVisaTypeSelector, "Specific visa type select");
    }

    private async selectSpecificProcessingSpeed(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedProcessingSpeedValue: string = this.getExpectedProcessingSpeedFromDataProvider(phpTravelsModel);
        let specificVisaTypeSelector: string = this.processingSpeedWindowSelector.concat(`//div[text() = '${expectedProcessingSpeedValue}']/ancestor::div[@class = 'input-dropdown-item']`);
        await this.click.leftClick(specificVisaTypeSelector, "Processing speed type select");
    }

    private async selectSpecificDate(phpTravelsModel: PhpTravelsModel, date: Date): Promise<void> {
        let expectedDate: DateModel = this.getExpectedDateFromDataProvider(phpTravelsModel);

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
                throw new Error(`Unsupported date: ${specificDate}`);
        };

        await this.click.leftClick(dateButtonSelector, "Date button");
        this.log.info(`Date: ${date.getName()} ${specificDate} has been clicked.`);
    }

    private async checkVisaTypeValueBeforeChange(): Promise<void> {
        let expectedVisaTypeValue: string = VisaType.TOURIST.getName();
        await this.checkSelectValue(this.visaTypeValueSelector, "visa type", expectedVisaTypeValue);
    }

    private async checkProcessingSpeedValueBeforeChange(): Promise<void> {
        let expectedProcessingSpeedValue: string = ProcessingSpeedType.STANDARD.getName();
        await this.checkSelectValue(this.processingSpeedValueSelector, "processing speed", expectedProcessingSpeedValue);
    }

    private async checkTravellersValueBeforeChange(): Promise<void> {
        let expectedTravellersValue: string = "1 Traveler";
        await this.checkSelectValue(this.travellersValueSelector, "travelers", expectedTravellersValue);
    }

    private async checkVisaTypeValueAfterChange(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedVisaTypeValue: string = this.getExpectedVisaTypeFromDataProvider(phpTravelsModel);
        await this.checkSelectValue(this.visaTypeValueSelector, "visa type", expectedVisaTypeValue);
    }

    private async checkProcessingSpeedValueAfterChange(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedProcessingSpeedValue: string = this.getExpectedProcessingSpeedFromDataProvider(phpTravelsModel);
        await this.checkSelectValue(this.processingSpeedValueSelector, "processing speed", expectedProcessingSpeedValue);
    }

    private async checkTravellersValueAfterChange(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedTravellersValue: string = this.getExpectedTravellersFromDataProvider(phpTravelsModel);
        await this.checkSelectValue(this.travellersValueSelector, "travellers", expectedTravellersValue.concat(" Travelers"));
    }

    private async checkSelectValue(selectSelector: string, selectName: string, expectedVisaTypeValue: string): Promise<void> {
        await this.check.hasText(selectSelector, expectedVisaTypeValue, selectName);
        this.log.info(`Selected ${selectName} value: ${expectedVisaTypeValue}.`);
    }

    private async selectCheckInDateYear(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkIfDatePickerWindowIsDisplayed(true);
        await this.clickOnDatePickerHeader(Date.YEAR);
        await this.selectSpecificDate(phpTravelsModel, Date.YEAR);
    }

    private async selectCheckInDateMonth(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.selectSpecificDate(phpTravelsModel, Date.MONTH);
    }

    private async selectCheckInDateDay(phpTravelsModel: PhpTravelsModel): Promise<void> {
        this.selectSpecificDate(phpTravelsModel, Date.DAY);
        await this.checkIfDatePickerWindowIsDisplayed(false);
    }

    private async checkIfDatePickerWindowIsDisplayed(shouldBeDisplayed: boolean): Promise<void> {
        await this.checkIfWindowIsDisplayed(this.datePickerWindowSelector, "Date picker", shouldBeDisplayed);
    }

    private async checkIfVisaTypeWindowIsDisplayed(shouldBeDisplayed: boolean): Promise<void> {
        await this.checkIfWindowIsDisplayed(this.visaTypeWindowSelector, "Date picker", shouldBeDisplayed);
    }

    private async checkIfProcessingSpeedWindowIsDisplayed(shouldBeDisplayed: boolean): Promise<void> {
        await this.checkIfWindowIsDisplayed(this.processingSpeedWindowSelector, "Date picker", shouldBeDisplayed);
    }

    private async checkIfTravellersWindowIsDisplayed(shouldBeDisplayed: boolean): Promise<void> {
        await this.checkIfWindowIsDisplayed(this.travellersWindowSelector, "Date picker", shouldBeDisplayed);
    }

    private async checkIfWindowIsDisplayed(windowSelector: string, selectorName: string, shouldBeDisplayed: boolean): Promise<void> {
        if (shouldBeDisplayed) {
            await this.check.isElementPresent(windowSelector, selectorName + " window");
            await this.check.isVisible(windowSelector, selectorName + " window");
            this.log.info(`${selectorName} window has been displayed.`);
        } else {
            await this.check.isElementNotPresent(windowSelector, selectorName + " window");
            this.log.info(`${selectorName} window has been closed.`);
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
            await this.check.isElementPresent(datePickerWindowHeaderSelector, "Date picker window");
            await this.click.leftClick(datePickerWindowHeaderSelector, "Date picker window");

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

    private async checkActualCheckInDate(phpTravelsModel: PhpTravelsModel): Promise<void> {
        await this.checkActualDate(phpTravelsModel);
    }

    private async checkActualDate(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let actualDate: string = await this.get.getInputValue(this.dateInputSelector, "Date input");

        let expectedDate: DateModel = this.getExpectedDateFromDataProvider(phpTravelsModel);

        let year: string = expectedDate.year!;
        let month: string = expectedDate.month!.toNumberWithZero();
        let day: string = expectedDate.day!.toString().padStart(2, "0");
        let expectedDateAsString: string = day.concat("-").concat(month).concat("-").concat(year);

        expect(actualDate, "date check").toBe(expectedDateAsString);
    }

    private async checkArrivalCountryBeforeInput(): Promise<void> {
        let expectedSelectedCountry: string = this.arrivalSpanSelector.concat("//span[@x-text = 'getSelectedName()']");
        await this.compareCountryBeforeOrAfterInput("Select Country", expectedSelectedCountry, "Arrival", "before");
    }

    private async checkDepartureCountryBeforeInput(): Promise<void> {
        let expectedSelectedCountry: string = this.departureSpanSelector.concat("//span[@x-text = 'getSelectedName()']");
        await this.compareCountryBeforeOrAfterInput("Select Country", expectedSelectedCountry, "Departure", "before");
    }

    private async checkDepartureCountryAfterInput(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedCountry: string = this.getExpectedDepartureCountryFromDataProvider(phpTravelsModel).country!;
        let expectedSelectedCountry: string = this.departureSpanSelector.concat("//span[@x-text = 'getSelectedName()']");
        await this.compareCountryBeforeOrAfterInput(expectedCountry, expectedSelectedCountry, "Departure", "after");
    }

    private async checkArrivalCountryAfterInput(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedCity: string = this.getExpectedArrivalCountryFromDataProvider(phpTravelsModel).country!;
        let expectedSelectedCountry: string = this.arrivalSpanSelector.concat("//span[@x-text = 'getSelectedName()']");
        await this.compareCountryBeforeOrAfterInput(expectedCity, expectedSelectedCountry, "Arrival", "after");
    }

    private async compareCountryBeforeOrAfterInput(expectedLocationValue: string, elementSelector: string, destination: string, inputStage: string): Promise<void> {
        await this.check.hasText(elementSelector, expectedLocationValue, destination + " country check " + inputStage + " input");
        this.log.info(`${destination} country ${inputStage} input value meets expected value.`);
    }

    private async clickOnDepartureCountryInput(): Promise<void> {
        await this.clickOnLocationInput(this.departureSpanSelector, "Departure country");
    }

    private async clickOnArrivalCountryInput(): Promise<void> {
        await this.clickOnLocationInput(this.arrivalSpanSelector, "Arrival country");
    }

    private async clickOnLocationInput(locationSpanSelector: string, locationType: string): Promise<void> {
        await this.click.leftClick(locationSpanSelector, "Location span");
        this.log.info(`${locationType} input has been clicked.`);
    }

    private async checkIfCountriesAreDisplayed(): Promise<void> {
        await this.checkIfCountryIsDisplayed(this.countriesContainerSelector, this.countrySelector);
    }

    private async checkIfCountryIsDisplayed(containerSelector: string, selector: string): Promise<void> {
        await this.check.isVisible(containerSelector, "Country container");
        await this.check.isElementPresent(selector, "Selector");
    }

    private async findAndSelectDepartureCountry(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedDestinationCountryName: string = this.getExpectedDepartureCountryFromDataProvider(phpTravelsModel).country!;

        await this.typeCountryToCountryInput(this.departureCountryInputSelector, expectedDestinationCountryName, "Departure country");

        let countryButtonSelector: string = `//label/text()[normalize-space(.) = 'From Country']/ancestor::div[@class = 'form-control']//div[@class = 'input-dropdown-content show']//span[text() = '${expectedDestinationCountryName}']`;
        this.clickOnCountryButton(expectedDestinationCountryName, countryButtonSelector);
    }

    private async findAndSelectArrivalCountry(phpTravelsModel: PhpTravelsModel): Promise<void> {
        let expectedDestinationCountryName: string = this.getExpectedArrivalCountryFromDataProvider(phpTravelsModel).country!;

        await this.typeCountryToCountryInput(this.arrivalCountryInputSelector, expectedDestinationCountryName, "Arrival country");

        let countryButtonSelector: string = `//label/text()[normalize-space(.) = 'To Country']/ancestor::div[@class = 'form-control']//div[@class = 'input-dropdown-content show']//span[text() = '${expectedDestinationCountryName}']`;
        this.clickOnCountryButton(expectedDestinationCountryName, countryButtonSelector);
    }

    private async typeCountryToCountryInput(countryInputSelector: string, expectedCountry: string, inputType: string): Promise<void> {
        await this.check.isEnabled(countryInputSelector, "Country input");
        await this.send.sendKeysToElementWithNoLeave(countryInputSelector, expectedCountry, "Country input");
        this.log.info(`${expectedCountry} has been typed to ${inputType} input.`);
    }

    private async clickOnCountryButton(expectedCountry: string, countryButtonSelector: string): Promise<void> {
        await this.check.isElementPresent(countryButtonSelector, "Country button");
        await this.click.leftClick(countryButtonSelector, "Country button");

        this.log.info(`${expectedCountry} has been selected.`);
    }

    private async checkIfTabIsActive(): Promise<void> {
        await this.check.containsAttribute(this.visaTabSelector, "class", "text-primary", "Visa tab activity");
        this.log.info("Visa tab is an active tab.");
    }

    private async checkIfSearchBarIsDisplayed(): Promise<void> {
        await this.check.isVisible(this.visaTabSelector, "Search bar");
        this.log.info("Visa search bar has been displayed.");
    }

    private getExpectedDepartureCountryFromDataProvider(phpTravelsModel: PhpTravelsModel): DestinationModel {
        return phpTravelsModel.visaPageModel!.expectedDepartureDestination!;
    }

    private getExpectedArrivalCountryFromDataProvider(phpTravelsModel: PhpTravelsModel): DestinationModel {
        return phpTravelsModel.visaPageModel!.expectedArrivalDestination!;
    }

    private getExpectedDateFromDataProvider(phpTravelsModel: PhpTravelsModel): DateModel {
        return phpTravelsModel.visaPageModel!.expectedDate!;
    }

    private getExpectedVisaTypeFromDataProvider(phpTravelsModel: PhpTravelsModel): string {
        return phpTravelsModel.visaPageModel!.expectedVisaType!.getName();
    }

    private getExpectedProcessingSpeedFromDataProvider(phpTravelsModel: PhpTravelsModel): string {
        return phpTravelsModel.visaPageModel!.expectedProcessingSpeed!.getName();
    }

    private getExpectedTravellersFromDataProvider(phpTravelsModel: PhpTravelsModel): string {
        return phpTravelsModel.visaPageModel!.expectedTravellers!.adultsCount!;
    }
}