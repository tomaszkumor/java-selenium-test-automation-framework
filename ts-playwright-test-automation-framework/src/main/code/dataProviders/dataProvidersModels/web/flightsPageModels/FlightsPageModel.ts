import { Location } from "../../../../constants/common/Location";
import { FlightClass } from "../../../../constants/flightsPage/FlightClass";
import { FlightType } from "../../../../constants/flightsPage/FlightType";
import { DateModel } from "../commonModels/DateModel";
import { TravellerModel } from "../commonModels/TravellerModel";


export class FlightsPageModel {
    constructor(
        public readonly expectedDepartureLocation?: Location,
        public readonly expectedArrivalLocation?: Location,
        public readonly expectedFlightType?: FlightType,
        public readonly expectedFlightClass?: FlightClass,
        public readonly expectedDepartureDate?: DateModel,
        public readonly expectedReturnDate?: DateModel,
        public readonly expectedTravellers?: TravellerModel,
    ) { }

    static builder(): CarsPageModelBuilder {
        return new CarsPageModelBuilder();
    }
}

class CarsPageModelBuilder {
    private expectedDepartureLocation?: Location;
    private expectedArrivalLocation?: Location;
    private expectedFlightType?: FlightType;
    private expectedFlightClass?: FlightClass;
    private expectedDepartureDate?: DateModel;
    private expectedReturnDate?: DateModel;
    private expectedTravellers?: TravellerModel;

    setExpectedDepartureLocation(expectedDepartureLocation: Location): this {
        this.expectedDepartureLocation = expectedDepartureLocation;

        return this;
    }

    setExpectedArrivalLocation(expectedArrivalLocation: Location): this {
        this.expectedArrivalLocation = expectedArrivalLocation;

        return this;
    }

    setExpectedFlightType(expectedFlightType: FlightType): this {
        this.expectedFlightType = expectedFlightType;

        return this;
    }

    setExpectedFlightClass(expectedFlightClass: FlightClass): this {
        this.expectedFlightClass = expectedFlightClass;

        return this;
    }

    setExpectedDepartureDate(expectedDepartureDate: DateModel): this {
        this.expectedDepartureDate = expectedDepartureDate;

        return this;
    }

    setExpectedReturnDate(expectedReturnDate: DateModel): this {
        this.expectedReturnDate = expectedReturnDate;

        return this;
    }

    setExpectedTravellers(expectedTravellers: TravellerModel): this {
        this.expectedTravellers = expectedTravellers;

        return this;
    }

    build(): FlightsPageModel {
        return new FlightsPageModel(this.expectedDepartureLocation, this.expectedArrivalLocation, this.expectedFlightType, this.expectedFlightClass, this.expectedDepartureDate, this.expectedReturnDate, this.expectedTravellers);
    }
}