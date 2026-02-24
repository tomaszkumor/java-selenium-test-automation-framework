export class Accommodation {
    static readonly ROOMS = new Accommodation("Rooms");
    static readonly ADULTS = new Accommodation("Adults");
    static readonly CHILDS = new Accommodation("Childs");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}