export class HeaderDropDown {
    static readonly LANGUAGE = new HeaderDropDown("Language");
    static readonly CURRENCY = new HeaderDropDown("Currency");
    static readonly AGENTS = new HeaderDropDown("Agents");
    static readonly CUSTOMER = new HeaderDropDown("Customer");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}