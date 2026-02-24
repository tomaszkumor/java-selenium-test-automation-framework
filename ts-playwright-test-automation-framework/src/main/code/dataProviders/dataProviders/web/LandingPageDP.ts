import { PhpTravelsModel } from '../../dataProvidersModels/web/phpTravelsModel/PhpTravelsModel';
import { DestinationModel } from '../../dataProvidersModels/web/commonModels/DestinationModel';
import { DateModel } from '../../dataProvidersModels/web/commonModels/DateModel';
import { Month } from '../../../constants/common/Month';
import { TravellerModel } from '../../dataProvidersModels/web/commonModels/TravellerModel';
import { VisaPageModel } from '../../dataProvidersModels/web/visaPageModels/VisaPageModel';
import { VisaType } from '../../../constants/visaPage/VisaType';
import { ProcessingSpeedType } from '../../../constants/visaPage/ProcessingSpeedType';
import { FlightsPageModel } from '../../dataProvidersModels/web/flightsPageModels/FlightsPageModel';
import { Location } from '../../../constants/common/Location';
import { FlightClass } from '../../../constants/flightsPage/FlightClass';
import { FlightType } from '../../../constants/flightsPage/FlightType';

export class LandingPageDP {
  static searchForFlights(): PhpTravelsModel {
    return PhpTravelsModel
      .builder()
      .setFlightsPageModel(FlightsPageModel
        .builder()
        .setExpectedDepartureLocation(Location.NEW_YORK_CITY_AA)
        .setExpectedArrivalLocation(Location.BERLIN)
        .setExpectedFlightClass(FlightClass.BUSINESS)
        .setExpectedFlightType(FlightType.ONE_WAY)
        .setExpectedDepartureDate(new DateModel("2026", Month.JULY, "27"))
        .setExpectedReturnDate(new DateModel("2026", Month.NOVEMBER, "07"))
        .setExpectedTravellers(new TravellerModel("7", "3", "5"))
        .build())
      .build();
  }

  static searchForVisa(): PhpTravelsModel {
    return PhpTravelsModel
      .builder()
      .setVisaPageModel(VisaPageModel
        .builder()
        .setExpectedDate(new DateModel("2026", Month.JUNE, "19"))
        .setExpectedDepartureDestination(DestinationModel.builder().setCountry("Poland").build())
        .setExpectedArrivalDestination(DestinationModel.builder().setCountry("Spain").build())
        .setExpectedVisaType(VisaType.MEDICAL)
        .setExpectedProcessingSpeed(ProcessingSpeedType.RUSH)
        .setExpectedTravellers(new TravellerModel("5", "0", "0"))
        .build())
      .build();
  }
}