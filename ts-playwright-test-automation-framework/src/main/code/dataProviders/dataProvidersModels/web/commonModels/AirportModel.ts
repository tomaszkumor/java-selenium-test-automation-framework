export class AirportModel {
    constructor(
        public readonly expectedAirportName?: string,
        public readonly expectedAirportCity?: string,
        public readonly expectedAirportCountry?: string,
        public readonly expectedAirportCode?: string,
    ) { }

    static builder(): AirportModelBuilder {
        return new AirportModelBuilder();
    }
}

class AirportModelBuilder {
    private expectedAirportName?: string;
    private expectedAirportCity?: string;
    private expectedAirportCountry?: string;
    private expectedAirportCode?: string;

    setExpectedAirportName(expectedAirportName: string): this {
        this.expectedAirportName = expectedAirportName;

        return this;
    }

    setExpectedAirportCity(expectedAirportCity: string): this {
        this.expectedAirportCity = expectedAirportCity;

        return this;
    }

    setExpectedAirportCountry(expectedAirportCountry: string): this {
        this.expectedAirportCountry = expectedAirportCountry;

        return this;
    }

    setExpectedAirportCode(expectedAirportCode: string): this {
        this.expectedAirportCode = expectedAirportCode;

        return this;
    }

    build(): AirportModel {
        return new AirportModel(this.expectedAirportName, this.expectedAirportCity, this.expectedAirportCountry, this.expectedAirportCode);
    }
}