export class HeaderEntrypoint {
    static readonly LANDING_PAGE = new HeaderEntrypoint("Landing page");
    static readonly FLIGHTS = new HeaderEntrypoint("Flights");
    static readonly HOTELS = new HeaderEntrypoint("Hotels");
    static readonly TOURS = new HeaderEntrypoint("Tours");
    static readonly CARS = new HeaderEntrypoint("Cars");
    static readonly VISA = new HeaderEntrypoint("Visa");
    static readonly BLOGS = new HeaderEntrypoint("Blogs");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}