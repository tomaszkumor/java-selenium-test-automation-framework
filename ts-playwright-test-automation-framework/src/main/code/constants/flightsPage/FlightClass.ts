export class FlightClass {
    static readonly ECONOMY = new FlightClass("Economy");
    static readonly ECONOMY_PREMIUM = new FlightClass("Economy Premium");
    static readonly BUSINESS = new FlightClass("Business");
    static readonly FIRST = new FlightClass("First");

    private constructor(
        private readonly name: string
    ) { }

    getName(): string {
        return this.name;
    }
}