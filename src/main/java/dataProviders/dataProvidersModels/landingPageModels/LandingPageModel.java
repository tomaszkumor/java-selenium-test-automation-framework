package dataProviders.dataProvidersModels.landingPageModels;

import constants.landingPage.CabinClass;
import constants.landingPage.FlightDestination;
import constants.header.HeaderLanguage;
import constants.landingPage.Location;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LandingPageModel {
    private List<HeaderLanguage> languages;
    private Location expectedDepartureLocation;
    private Location expectedArrivalLocation;
    private List<Airport> expectedDepartureLocations;
    private List<Airport> expectedArrivalLocations;
    private FlightDestination expectedFlightDestination;
    private CabinClass expectedCabinClass;
    private Date expectedDepartureDate;
    private Date expectedReturnDate;
    private Traveller expectedTravellers;

}
