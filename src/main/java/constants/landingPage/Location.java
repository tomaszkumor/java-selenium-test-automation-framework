package constants.landingPage;

import lombok.Getter;

@Getter
public enum Location {
    JEDDAH("King Abdulaziz International Airport", "Jeddah", "Saudi Arabia", "JED"),
    BERLIN("Berlin Brandenburg Willy Brandt", "Berlin", "Germany", "BER"),
    MANILA("Ninoy Aquino International Airport", "Manila", "Philippines", "MNL"),
    LONDON("London Heathrow Airport", "London", "United Kingdom", "LHR"),
    NEW_YORK_CITY_AA("All Airports", "New York", "United States", "NYC"),
    MOSCOW("Domodedovo International Airport", "Moscow", "Russia", "DME"),
    SINGAPORE("Singapore Changi Airport", "Singapore", "Singapore", "SIN"),
    DUBAI("Dubai International Airport", "Dubai", "United Arab Emirates", "DXB"),
    ISTANBUL("Istanbul Airport", "Istanbul", "Turkey", "IST"),
    DELHI("Indira Gandhi International Airport", "Delhi", "India", "DEL"),
    NEW_YORK_CITY_JFK("John F Kennedy International Airport", "New York", "United States", "JFK"),
    KUALA_LUMPUR("Kuala Lumpur International Airport", "Kuala Lumpur", "Malaysia", "KUL"),
    PHUKET("Phuket International Airport", "Phuket", "Thailand", "HKT");

    private final String airportName;
    private final String airportCity;
    private final String airportCountry;
    private final String airportCode;

    Location(String airportName, String airportCity, String airportCountry, String airportCode) {
        this.airportName = airportName;
        this.airportCity = airportCity;
        this.airportCountry = airportCountry;
        this.airportCode = airportCode;
    }
}
