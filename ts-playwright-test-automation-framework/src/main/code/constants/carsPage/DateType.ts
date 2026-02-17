export class DateType {
    static readonly PICK_UP = new DateType("Pick up");
    static readonly DROP_OFF = new DateType("Drop off");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}