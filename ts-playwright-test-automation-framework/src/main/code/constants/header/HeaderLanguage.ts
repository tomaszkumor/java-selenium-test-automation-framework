export class HeaderLanguage {
    static readonly EN = new HeaderLanguage("English");
    static readonly AR = new HeaderLanguage("Arabic");
    static readonly TR = new HeaderLanguage("Turkish");
    static readonly RU = new HeaderLanguage("Russian");
    static readonly FR = new HeaderLanguage("French");
    static readonly ZH = new HeaderLanguage("Chinese");
    static readonly DE = new HeaderLanguage("Germany");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}