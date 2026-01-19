package constants.landingPage;

import lombok.Getter;

@Getter
public enum FlightDestination {
    ONE_WAY("One Way"),
    RETURN("Return");

    private final String flightDestination;

    FlightDestination(String flightDestiny) {
        this.flightDestination = flightDestiny;
    }
}
