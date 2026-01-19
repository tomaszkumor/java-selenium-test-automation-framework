package dataProviders.dataProvidersModels.landingPageModels;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Traveller {
    private String adultsCount;
    private String childrenCount;
    private String infantsCount;
}
