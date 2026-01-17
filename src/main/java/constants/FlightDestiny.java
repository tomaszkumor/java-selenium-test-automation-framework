package constants;

import lombok.Getter;

@Getter
public enum FlightDestiny {
    ONE_WAY("One Way"),
    RETURN("Return");

    private String flightDestiny;

    FlightDestiny(String flightDestiny) {
        this.flightDestiny = flightDestiny;
    }
}
