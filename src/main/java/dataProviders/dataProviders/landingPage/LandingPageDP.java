package dataProviders.dataProviders.landingPage;

import constants.flightsPage.CabinClass;
import constants.flightsPage.FlightDestination;
import constants.flightsPage.Location;
import constants.header.HeaderLanguage;
import dataProviders.dataProvidersModels.commonModels.DateModel;
import dataProviders.dataProvidersModels.flightsPageModels.AirportModel;
import dataProviders.dataProvidersModels.flightsPageModels.FlightsPageModel;
import dataProviders.dataProvidersModels.flightsPageModels.TravellerModel;
import dataProviders.dataProvidersModels.hotelsPageModels.AccommodationModel;
import dataProviders.dataProvidersModels.hotelsPageModels.ChildModel;
import dataProviders.dataProvidersModels.hotelsPageModels.HotelDestinationModel;
import dataProviders.dataProvidersModels.hotelsPageModels.HotelsPageModel;
import dataProviders.dataProvidersModels.phpTravelsModel.PhpTravelsModel;
import org.testng.annotations.DataProvider;

import java.time.Month;
import java.util.List;

public class LandingPageDP {
    @DataProvider
    Object[][] searchForFlights() {
        List<AirportModel> expectedDepartureLocations = getExpectedDepartureLocations();
        List<AirportModel> expectedArrivalLocations = getExpectedArrivalLocations();
        List<HeaderLanguage> expectedLanguages = getExpectedLanguages();
        DateModel expectedDepartureDate = getExpectedDepartureDate();
        DateModel expectedReturnDate = getExpectedReturnDate();
        TravellerModel expectedTravellers = getExpectedTravellers();

        return new Object[][]{
                {PhpTravelsModel.builder()
                        .languages(expectedLanguages)
                        .flightsPageModel(FlightsPageModel
                                .builder()
                                .expectedDepartureLocation(Location.NEW_YORK_CITY_AA)
                                .expectedArrivalLocation(Location.BERLIN)
                                .expectedCabinClass(CabinClass.FIRST)
                                .expectedFlightDestination(FlightDestination.RETURN)
                                .expectedDepartureDate(expectedDepartureDate)
                                .expectedReturnDate(expectedReturnDate)
                                .expectedTravellers(expectedTravellers)
                                .expectedDepartureLocations(expectedDepartureLocations)
                                .expectedArrivalLocations(expectedArrivalLocations)
                                .build())
                        .build()
                }
        };
    }

    @DataProvider
    Object[][] searchForHotels() {
        return new Object[][]{
                {PhpTravelsModel.builder()
                        .hotelsPageModel(HotelsPageModel
                                .builder()
                                .expectedCheckInDate(new DateModel("2026", Month.JULY, "27"))
                                .expectedCheckOutDate(new DateModel("2026", Month.NOVEMBER, "11"))
                                .accommodation(new AccommodationModel("3", "4", "3"))
                                .hotelDestination(new HotelDestinationModel("Phuket", "Thailand"))
                                .children(List.of(
                                        new ChildModel("1", "12"),
                                        new ChildModel("2", "6"),
                                        new ChildModel("3", "10"))
                                )
                                .nationality("Germany")
                                .build())
                        .build()
                }
        };
    }

    private List<AirportModel> getExpectedDepartureLocations() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> List.of(new AirportModel(Location.NEW_YORK_CITY_AA),
                    new AirportModel(Location.LONDON),
                    new AirportModel(Location.BERLIN),
                    new AirportModel(Location.SINGAPORE),
                    new AirportModel(Location.MOSCOW),
                    new AirportModel(Location.MANILA),
                    new AirportModel(Location.JEDDAH)
            );
            default -> null;
        };
    }

    private List<AirportModel> getExpectedArrivalLocations() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> List.of(new AirportModel(Location.DUBAI),
                    new AirportModel(Location.ISTANBUL),
                    new AirportModel(Location.BERLIN),
                    new AirportModel(Location.DELHI),
                    new AirportModel(Location.NEW_YORK_CITY_JFK),
                    new AirportModel(Location.KUALA_LUMPUR),
                    new AirportModel(Location.PHUKET)
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

    private DateModel getExpectedDepartureDate() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> new DateModel("2026", Month.JULY, "27");
            default -> null;
        };
    }

    private DateModel getExpectedReturnDate() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> new DateModel("2026", Month.NOVEMBER, "07");
            default -> null;
        };
    }

    private TravellerModel getExpectedTravellers() {
        String caller = getCaller();

        return switch (caller) {
            case "searchForFlights" -> new TravellerModel("7", "3", "5");
            default -> null;
        };
    }

    private String getCaller() {
        return Thread.currentThread().getStackTrace()[3].getMethodName();
    }
}
