import { AirportModel } from '../commonModels/AirportModel';
import { DateModel } from '../commonModels/DateModel';
import { DestinationModel } from '../commonModels/DestinationModel';
import { TravellerModel } from '../commonModels/TravellerModel';
import { TimeModel } from './TimeModel'

export class CarsPageModel {
    constructor(
        public readonly expectedDepartureAirport?: AirportModel,
        public readonly expectedArrivalCity?: DestinationModel,
        public readonly expectedPickUpDate?: DateModel,
        public readonly expectedPickUpTime?: TimeModel,
        public readonly expectedDropOffDate?: DateModel,
        public readonly expectedDropOffTime?: TimeModel,
        public readonly expectedTravellers?: TravellerModel,
    ) { }

    static builder(): CarsPageModelBuilder {
        return new CarsPageModelBuilder();
    }
}

class CarsPageModelBuilder {
    private expectedDepartureAirport?: AirportModel;
    private expectedArrivalCity?: DestinationModel;
    private expectedPickUpDate?: DateModel;
    private expectedPickUpTime?: TimeModel;
    private expectedDropOffDate?: DateModel;
    private expectedDropOffTime?: TimeModel;
    private expectedTravellers?: TravellerModel;

    setExpectedDepartureAirport(expectedDepartureAirport: AirportModel): this {
        this.expectedDepartureAirport = expectedDepartureAirport;

        return this;
    }

    setExpectedArrivalCity(expectedArrivalCity: DestinationModel): this {
        this.expectedArrivalCity = expectedArrivalCity;

        return this;
    }

    setExpectedPickUpDate(expectedPickUpDate: DateModel): this {
        this.expectedPickUpDate = expectedPickUpDate;

        return this;
    }

    setExpectedPickUpTime(expectedPickUpTime: TimeModel): this {
        this.expectedPickUpTime = expectedPickUpTime;

        return this;
    }

    setExpectedDropOffDate(expectedDropOffDate: DateModel): this {
        this.expectedDropOffDate = expectedDropOffDate;

        return this;
    }

    setExpectedDropOffTime(expectedDropOffTime: TimeModel): this {
        this.expectedDropOffTime = expectedDropOffTime;

        return this;
    }

    setExpectedTravellers(expectedTravellers: TravellerModel): this {
        this.expectedTravellers = expectedTravellers;

        return this;
    }

    build(): CarsPageModel {
        return new CarsPageModel(this.expectedDepartureAirport, this.expectedArrivalCity, this.expectedPickUpDate, this.expectedPickUpTime, this.expectedDropOffDate, this.expectedDropOffTime, this.expectedTravellers);
    }
}