export class Date {
    static readonly YEAR = new Date("year");
    static readonly MONTH = new Date("month");
    static readonly DAY = new Date("day");

    private constructor(
        private readonly name: string
    ) { }

    getname(): string {
        return this.name;
    }
}