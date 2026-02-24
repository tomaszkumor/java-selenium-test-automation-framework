import { DateModel } from "../commonModels/DateModel";
import { DestinationModel } from "../commonModels/DestinationModel";
import { AccommodationModel } from "./AccommodationModel";
import { ChildModel } from "./ChildModel";


export class HotelsPageModel {
    constructor(
        public readonly expectedCheckInDate?: DateModel,
        public readonly expectedCheckOutDate?: DateModel,
        public readonly expectedDestination?: DestinationModel,
        public readonly expectedAccommodation?: AccommodationModel,
        public readonly expectedChildren?: ChildModel[],
        public readonly expectedNationality?: string,
    ) { }

    static builder(): HotelsPageModelBuilder {
        return new HotelsPageModelBuilder();
    }
}

class HotelsPageModelBuilder {
    private expectedCheckInDate?: DateModel;
    private expectedCheckOutDate?: DateModel;
    private expectedDestination?: DestinationModel;
    private expectedAccommodation?: AccommodationModel;
    private expectedChildren?: ChildModel[];
    private expectedNationality?: string;

    setExpectedDepartureLocation(expectedCheckInDate: DateModel): this {
        this.expectedCheckInDate = expectedCheckInDate;

        return this;
    }

    setExpectedArrivalLocation(expectedCheckOutDate: DateModel): this {
        this.expectedCheckOutDate = expectedCheckOutDate;

        return this;
    }

    setExpectedFlightType(expectedDestination: DestinationModel): this {
        this.expectedDestination = expectedDestination;

        return this;
    }

    setExpectedFlightClass(expectedAccommodation: AccommodationModel): this {
        this.expectedAccommodation = expectedAccommodation;

        return this;
    }

    setExpectedDepartureDate(expectedChildren: ChildModel[]): this {
        this.expectedChildren = expectedChildren;

        return this;
    }

    setExpectedReturnDate(expectedNationality: string): this {
        this.expectedNationality = expectedNationality;

        return this;
    }

    build(): HotelsPageModel {
        return new HotelsPageModel(this.expectedCheckInDate, this.expectedCheckOutDate, this.expectedDestination, this.expectedAccommodation, this.expectedChildren, this.expectedNationality);
    }
}