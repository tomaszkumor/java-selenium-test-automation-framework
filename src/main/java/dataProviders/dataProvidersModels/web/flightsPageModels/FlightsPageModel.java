package dataProviders.dataProvidersModels.web.flightsPageModels;

import constants.flightsPage.CabinClass;
import constants.flightsPage.FlightDestination;
import constants.flightsPage.Location;
import dataProviders.dataProvidersModels.web.commonModels.DateModel;
import dataProviders.dataProvidersModels.web.commonModels.TravellerModel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FlightsPageModel {
    private Location expectedDepartureLocation;
    private Location expectedArrivalLocation;
    private List<AirportModel> expectedDepartureLocations;
    private List<AirportModel> expectedArrivalLocations;
    private FlightDestination expectedFlightDestination;
    private CabinClass expectedCabinClass;
    private DateModel expectedDepartureDate;
    private DateModel expectedReturnDate;
    private TravellerModel expectedTravellers;

}
