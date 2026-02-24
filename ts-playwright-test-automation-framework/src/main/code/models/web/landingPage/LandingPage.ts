import { LandingPageSelectors } from "./LandingPageSelectors";
import { SearchBarCars } from "./searchBarCars/SearchBarCars";
import { SearchBarFlights } from "./searchBarFlights/SearchBarFlights";
import { SearchBarHotels } from "./searchBarHotels/SearchBarHotels";
import { SearchBarTours } from "./searchBarTours/SearchBarTours";
import { SearchBarVisa } from "./searchBarVisa/SearchBarVisa";
import { logger } from "../../../utils/logger/Logger";

export class LandingPage extends LandingPageSelectors {
    private log = logger.child({ label: LandingPage.name });

    public async checkIfPageIsLoaded(): Promise<LandingPage> {
        await this.checkUrl();
        await this.check.isVisible(this.background, "Background")
        this.log.info("Landing page has been displayed.");

        return this;
    }

    public async clickOnFlightsTab(): Promise<SearchBarFlights> {
        await this.click.leftClick(this.tabFlightsSelector, "Flights tab");
        this.log.info("Flights tab has been clicked.");

        return new SearchBarFlights();
    }

    public async clickOnHotelsTab(): Promise<SearchBarHotels> {
        await this.click.leftClick(this.tabHotelsSelector, "Hotels tab");
        this.log.info("Hotels tab has been clicked.");

        return new SearchBarHotels();
    }

    public async clickOnToursTab(): Promise<SearchBarTours> {
        await this.click.leftClick(this.tabToursSelector, "Tours tab");
        this.log.info("Tours tab has been clicked.");

        return new SearchBarTours();
    }

    public async clickOnCarsTab(): Promise<SearchBarCars> {
        await this.click.leftClick(this.tabCarsSelector, "Cars tab");
        this.log.info("Cars tab has been clicked.");

        return new SearchBarCars();
    }

    public async clickOnVisaTab(): Promise<SearchBarVisa> {
        await this.click.leftClick(this.tabVisaSelector, "Visa tab");
        this.log.info("Visa tab has been clicked.");

        return new SearchBarVisa();
    }

    private async checkUrl(): Promise<void> {
        let expectedUrl: string = "https://phptravels.net/";
        await this.check.doesUrlContain(expectedUrl);
    }
}