import { DateModel } from "../commonModels/DateModel";
import { DestinationModel } from "../commonModels/DestinationModel";
import { TravellerModel } from "../commonModels/TravellerModel";


export class ToursPageModel {
    constructor(
        public readonly expectedDate?: DateModel,
        public readonly expectedDestination?: DestinationModel,
        public readonly expectedTravellers?: TravellerModel,
    ) { }

    static builder(): HotelsPageModelBuilder {
        return new HotelsPageModelBuilder();
    }
}

class HotelsPageModelBuilder {
    private expectedDate?: DateModel;
    private expectedDestination?: DestinationModel;
    private expectedTravellers?: TravellerModel;

    setExpectedDate(expectedDate: DateModel): this {
        this.expectedDate = expectedDate;

        return this;
    }

    setExpectedDestination(expectedDestination: DestinationModel): this {
        this.expectedDestination = expectedDestination;

        return this;
    }

    setExpectedTravellers(expectedTravellers: TravellerModel): this {
        this.expectedTravellers = expectedTravellers;

        return this;
    }

    build(): ToursPageModel {
        return new ToursPageModel(this.expectedDate, this.expectedDestination, this.expectedTravellers);
    }
}