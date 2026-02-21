export class LocationType {
    static readonly DEPARTURE = new LocationType("Departure");
    static readonly ARRIVAL = new LocationType("Arrival");

    private constructor(
        private readonly name: string
    ) { }

    getName(): string {
        return this.name;
    }
}