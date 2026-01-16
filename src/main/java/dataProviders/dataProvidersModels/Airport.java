package dataProviders.dataProvidersModels;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Airport {
    private String airportName;
    private String airportCity;
    private String airportCountry;
    private String airportCode;


}
