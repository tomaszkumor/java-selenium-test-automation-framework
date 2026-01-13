package constants.header;

public enum HeaderDropDown {
    LANGUAGE("Language"),
    CURRENCY("Currency"),
    AGENTS("Agents"),
    CUSTOMER("Customer");

    private final String name;

    HeaderDropDown(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
