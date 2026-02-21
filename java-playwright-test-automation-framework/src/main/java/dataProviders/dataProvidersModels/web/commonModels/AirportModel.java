package dataProviders.dataProvidersModels.web.commonModels;

import constants.common.Location;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AirportModel {
    private String airportName;
    private String airportCity;
    private String airportCountry;
    private String airportCode;
}
