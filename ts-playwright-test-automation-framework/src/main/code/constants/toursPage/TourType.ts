export class TourType {
    static readonly ANY_TYPE = new TourType("Any Type");
    static readonly CULTURAL = new TourType("Cultural");
    static readonly ADVENTURE = new TourType("Adnventure");
    static readonly WILDLIFE = new TourType("Wildlife");
    static readonly CITY_TOURS = new TourType("City Tours");
    static readonly BEACH = new TourType("Beach");
    static readonly HISTORICAL = new TourType("Historical");
    static readonly FOOD_AND_DRINK = new TourType("Food & Drink");
    static readonly SHOPPING = new TourType("Shopping");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}