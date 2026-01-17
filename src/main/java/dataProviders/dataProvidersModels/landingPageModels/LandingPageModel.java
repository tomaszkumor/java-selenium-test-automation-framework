package dataProviders.dataProvidersModels.landingPageModels;

import constants.Language;
import constants.Location;
import dataProviders.dataProvidersModels.Airport;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LandingPageModel {
    private List<Language> languages;
    private Location expectedDepartureLocation;
    private Location expectedArrivalLocation;
    private List<Airport> expectedDepartureLocations;
    private List<Airport> expectedArrivalLocations;

}
