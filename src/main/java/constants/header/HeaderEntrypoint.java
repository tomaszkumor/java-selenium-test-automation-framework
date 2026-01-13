package constants.header;

public enum HeaderEntrypoint {
    LANDING_PAGE("Landing page"),
    FLIGHTS("Flights"),
    HOTELS("Hotels"),
    TOURS("Tours"),
    CARS("Cars"),
    VISA("Visa"),
    BLOGS("Blogs");

    private final String name;

    HeaderEntrypoint(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
