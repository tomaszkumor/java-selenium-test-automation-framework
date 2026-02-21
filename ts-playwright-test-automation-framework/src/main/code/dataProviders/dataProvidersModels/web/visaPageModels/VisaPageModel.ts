import { ProcessingSpeedType } from "../../../../constants/visaPage/ProcessingSpeedType";
import { VisaType } from "../../../../constants/visaPage/VisaType";
import { DateModel } from "../commonModels/DateModel";
import { DestinationModel } from "../commonModels/DestinationModel";
import { TravellerModel } from "../commonModels/TravellerModel";


export class VisaPageModel {
    constructor(
        public readonly expectedDate?: DateModel,
        public readonly expectedDepartureDestination?: DestinationModel,
        public readonly expectedArrivalDestination?: DestinationModel,
        public readonly expectedVisaType?: VisaType,
        public readonly expectedProcessingSpeed?: ProcessingSpeedType,
        public readonly expectedTravellers?: TravellerModel,
    ) { }

    static builder(): VisaPageModelBuilder {
        return new VisaPageModelBuilder();
    }
}

class VisaPageModelBuilder {
    private expectedDate?: DateModel;
    private expectedDepartureDestination?: DestinationModel;
    private expectedArrivalDestination?: DestinationModel;
    private expectedVisaType?: VisaType;
    private expectedProcessingSpeed?: ProcessingSpeedType;
    private expectedTravellers?: TravellerModel;

    setExpectedDate(expectedDate: DateModel): this {
        this.expectedDate = expectedDate;

        return this;
    }

    setExpectedDepartureDestination(expectedDepartureDestination: DestinationModel): this {
        this.expectedDepartureDestination = expectedDepartureDestination;

        return this;
    }

    setExpectedArrivalDestination(expectedArrivalDestination: DestinationModel): this {
        this.expectedArrivalDestination = expectedArrivalDestination;

        return this;
    }

    setExpectedVisaType(expectedVisaType: VisaType): this {
        this.expectedVisaType = expectedVisaType;

        return this;
    }

    setExpectedProcessingSpeed(expectedProcessingSpeed: ProcessingSpeedType): this {
        this.expectedProcessingSpeed = expectedProcessingSpeed;

        return this;
    }

    setExpectedTravellers(expectedTravellers: TravellerModel): this {
        this.expectedTravellers = expectedTravellers;

        return this;
    }

    build(): VisaPageModel {
        return new VisaPageModel(this.expectedDate, this.expectedDepartureDestination, this.expectedArrivalDestination, this.expectedVisaType, this.expectedProcessingSpeed, this.expectedTravellers);
    }
}