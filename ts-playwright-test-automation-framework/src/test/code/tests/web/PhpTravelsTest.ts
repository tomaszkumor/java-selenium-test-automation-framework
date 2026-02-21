import { BaseTest } from '../../baseTest/BaseTest';
import { LandingPage } from '../../../../main/code/models/web/landingPage/LandingPage';
import { PhpTravelsModel } from '../../../../main/code/dataProviders/dataProvidersModels/web/phpTravelsModel/PhpTravelsModel';
import { SearchBarVisa } from '../../../../main/code/models/web/landingPage/searchBarVisa/SearchBarVisa';
import { SearchBarFlights } from '../../../../main/code/models/web/landingPage/searchBarFlights/SearchBarFlights';

export class PhpTravelsTest extends BaseTest {
    public async searchForFlights() {
        const model = this.getModel<PhpTravelsModel>('searchForFlights');

        const landingPage = new LandingPage();
        await landingPage.checkIfPageIsLoaded();
        await landingPage.clickOnFlightsTab();

        const searchBarFlights = new SearchBarFlights();
        await searchBarFlights.checkIfPageIsLoaded();
        await searchBarFlights.selectFlightType(model)
        await searchBarFlights.selectFlightClass(model)
        await searchBarFlights.selectDepartureLocation(model)
        await searchBarFlights.selectArrivalLocation(model)
        await searchBarFlights.selectDepartureDate(model)
        await searchBarFlights.selectTravellers(model)
        await searchBarFlights.clickOnSearchButton();
    }

    public async searchForVisa() {
        const model = this.getModel<PhpTravelsModel>('searchForVisa');

        const landingPage = new LandingPage();
        await landingPage.checkIfPageIsLoaded();
        await landingPage.clickOnVisaTab();

        const searchBarVisa = new SearchBarVisa();
        await searchBarVisa.checkIfPageIsLoaded();
        await searchBarVisa.selectDepartureCountry(model);
        await searchBarVisa.selectArrivalCountry(model)
        await searchBarVisa.selectDate(model)
        await searchBarVisa.selectVisaType(model)
        await searchBarVisa.selectProcessingSpeed(model)
        await searchBarVisa.selectTravellers(model)
        await searchBarVisa.clickOnSearchButton();
    }
}