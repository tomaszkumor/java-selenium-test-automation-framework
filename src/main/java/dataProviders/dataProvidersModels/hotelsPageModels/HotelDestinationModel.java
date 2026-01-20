package dataProviders.dataProvidersModels.hotelsPageModels;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class HotelDestinationModel {
    private String city;
    private String country;
}
