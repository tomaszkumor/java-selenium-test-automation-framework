package dataProviders.dataProvidersModels.flightsPageModels;

import constants.flightsPage.Location;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirportModel {
    private String airportName;
    private String airportCity;
    private String airportCountry;
    private String airportCode;

    public AirportModel(Location location) {
        this.airportName =  location.getAirportName();
        this.airportCity = location.getAirportCity();
        this.airportCountry = location.getAirportCountry();
        this.airportCode = location.getAirportCode();
    }


}
