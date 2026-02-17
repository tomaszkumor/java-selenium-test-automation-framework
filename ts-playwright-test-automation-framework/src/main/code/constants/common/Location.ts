export class Location {
    static readonly BERLIN = new Location("Brandenburg", "Berlin", "Germany", "BER");
    static readonly NEW_YORK_CITY_AA = new Location("All airports", "New York", "United States", "NYC");

    private constructor(
        private readonly airportName: string,
        private readonly airportCity: string,
        private readonly airportCountry: string,
        private readonly airportCode: string
    ) { }

    getAirportName(): string {
        return this.airportName;
    }

    getAirportCity(): string {
        return this.airportCity;
    }

    getAirportCountry(): string {
        return this.airportCountry;
    }

    getAirportCode(): string {
        return this.airportCode;
    }
}
