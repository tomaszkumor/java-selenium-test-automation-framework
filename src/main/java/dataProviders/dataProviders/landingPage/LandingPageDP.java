package dataProviders.dataProviders.landingPage;

import constants.landingPage.CabinClass;
import constants.landingPage.FlightDestination;
import constants.header.HeaderLanguage;
import constants.landingPage.Location;
import dataProviders.dataProvidersModels.landingPageModels.Airport;
import dataProviders.dataProvidersModels.landingPageModels.Date;
import dataProviders.dataProvidersModels.landingPageModels.Traveller;
import dataProviders.dataProvidersModels.landingPageModels.LandingPageModel;
import org.testng.annotations.DataProvider;

import java.time.Month;
import java.util.List;

public class LandingPageDP {
    @DataProvider
    Object[][] searchForFlights() {
        List<Airport> expectedDepartureLocations = getExpectedDepartureLocations();
        List<Airport> expectedArrivalLocations = getExpectedArrivalLocations();
        List<HeaderLanguage> expectedLanguages = getExpectedLanguages();
        Date expectedDepartureDate = getExpectedDepartureDate();
        Date expectedReturnDate = getExpectedReturnDate();
        Traveller expectedTravellers = getExpectedTravellers();

        return new Object[][]{
                {LandingPageModel.builder()
                        .expectedDepartureLocation(Location.NEW_YORK_CITY_AA)
                        .expectedArrivalLocation(Location.BERLIN)
                        .expectedCabinClass(CabinClass.FIRST)
                        .expectedFlightDestination(FlightDestination.RETURN)
                        .expectedDepartureDate(expectedDepartureDate)
                        .expectedReturnDate(expectedReturnDate)
                        .expectedTravellers(expectedTravellers)
                        .expectedDepartureLocations(expectedDepartureLocations)
                        .expectedArrivalLocations(expectedArrivalLocations)
                        .languages(expectedLanguages)
                        .build()
                }
        };
    }

    private List<Airport> getExpectedDepartureLocations() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> List.of(new Airport(Location.NEW_YORK_CITY_AA),
                    new Airport(Location.LONDON),
                    new Airport(Location.BERLIN),
                    new Airport(Location.SINGAPORE),
                    new Airport(Location.MOSCOW),
                    new Airport(Location.MANILA),
                    new Airport(Location.JEDDAH)
            );
            default -> null;
        };
    }

    private List<Airport> getExpectedArrivalLocations() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> List.of(new Airport(Location.DUBAI),
                    new Airport(Location.ISTANBUL),
                    new Airport(Location.BERLIN),
                    new Airport(Location.DELHI),
                    new Airport(Location.NEW_YORK_CITY_JFK),
                    new Airport(Location.KUALA_LUMPUR),
                    new Airport(Location.PHUKET)
            );
            default -> null;
        };
    }

    private List<HeaderLanguage> getExpectedLanguages() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> List.of(HeaderLanguage.EN,
                    HeaderLanguage.AR,
                    HeaderLanguage.TR,
                    HeaderLanguage.RU,
                    HeaderLanguage.FR,
                    HeaderLanguage.ZH,
                    HeaderLanguage.DE
            );
            default -> null;
        };
    }

    private Date getExpectedDepartureDate() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> new Date("2026", Month.JULY, "27");
            default -> null;
        };
    }

    private Date getExpectedReturnDate() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> new Date("2026", Month.NOVEMBER, "07");
            default -> null;
        };
    }

    private Traveller getExpectedTravellers() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> new Traveller("7", "3", "5");
            default -> null;
        };
    }

    private String getCaller() {
        return Thread.currentThread().getStackTrace()[3].getMethodName();
    }
}
