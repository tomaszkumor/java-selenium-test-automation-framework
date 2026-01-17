package dataProviders.dataProviders.landingPage;

import constants.CabinClass;
import constants.FlightDestiny;
import constants.Language;
import constants.Location;
import dataProviders.dataProvidersModels.Airport;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import org.testng.annotations.DataProvider;

import java.util.List;
//TODO: Porob tu metody zeby zwracaly listy elementow w zaleznosci od nazwy testu
public class LandingPageDP {
    @DataProvider
    Object[][] landingPageTest() {
        return new Object[][]{
                {LandingPageModel.builder()
                        .expectedDepartureLocation(Location.NEW_YORK_CITY_AA)
                        .expectedArrivalLocation(Location.BERLIN)
                        .expectedCabinClass(CabinClass.FIRST)
                        .expectedFlightDestiny(FlightDestiny.ONE_WAY)
                        .expectedDepartureLocations(
                                List.of(new Airport(Location.NEW_YORK_CITY_AA),
                                        new Airport(Location.LONDON),
                                        new Airport(Location.BERLIN),
                                        new Airport(Location.SINGAPORE),
                                        new Airport(Location.MOSCOW),
                                        new Airport(Location.MANILA),
                                        new Airport(Location.JEDDAH)
                                )
                        )
                        .expectedArrivalLocations(
                                List.of(new Airport(Location.DUBAI),
                                        new Airport(Location.ISTANBUL),
                                        new Airport(Location.BERLIN),
                                        new Airport(Location.DELHI),
                                        new Airport(Location.NEW_YORK_CITY_JFK),
                                        new Airport(Location.KUALA_LUMPUR),
                                        new Airport(Location.PHUKET)
                                )
                        )
                        .languages(
                                List.of(Language.EN,
                                        Language.AR,
                                        Language.TR,
                                        Language.RU,
                                        Language.FR,
                                        Language.ZH,
                                        Language.DE
                                )
                        )
                        .build()
                }
        };
    }
}
