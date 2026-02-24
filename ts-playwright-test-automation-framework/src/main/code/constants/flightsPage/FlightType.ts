export class FlightType {
    static readonly ONE_WAY = new FlightType("One Way");
    static readonly ROUND_TRIP = new FlightType("Round Trip");

    private constructor(
        private readonly name: string
    ) { }

    getName(): string {
        return this.name;
    }
}