export class CheckType {
    static readonly IN = new CheckType("Check in");
    static readonly OUT = new CheckType("Check out");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}