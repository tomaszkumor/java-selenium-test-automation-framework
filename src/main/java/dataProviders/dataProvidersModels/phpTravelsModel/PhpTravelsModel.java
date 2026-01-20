package dataProviders.dataProvidersModels.phpTravelsModel;

import constants.header.HeaderLanguage;
import dataProviders.dataProvidersModels.flightsPageModels.FlightsPageModel;
import dataProviders.dataProvidersModels.hotelsPageModels.HotelsPageModel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PhpTravelsModel {
    private List<HeaderLanguage> languages;
    private FlightsPageModel flightsPageModel;
    private HotelsPageModel hotelsPageModel;
}
