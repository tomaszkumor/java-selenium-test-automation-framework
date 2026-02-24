export class DestinationModel {
    constructor(
        public readonly city?: string,
        public readonly country?: string,
    ) { }

    static builder(): DestinationModelBuilder {
        return new DestinationModelBuilder();
    }
}

class DestinationModelBuilder {
    private city?: string;
    private country?: string;

    setCity(city: string): this {
        this.city = city;

        return this;
    }

    setCountry(country: string): this {
        this.country = country;

        return this;
    }

    build(): DestinationModel {
        return new DestinationModel(this.city, this.country);
    }
}