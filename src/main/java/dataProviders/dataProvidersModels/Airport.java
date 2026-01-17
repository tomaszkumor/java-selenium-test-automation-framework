package dataProviders.dataProvidersModels;

import constants.Location;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Airport {
    private String airportName;
    private String airportCity;
    private String airportCountry;
    private String airportCode;

    public Airport(Location location) {
        this.airportName =  location.getAirportName();
        this.airportCity = location.getAirportCity();
        this.airportCountry = location.getAirportCountry();
        this.airportCode = location.getAirportCode();
    }


}
