import { CarsPageModel } from "../carsPageModels/CarsPageModel";
import { FlightsPageModel } from "../flightsPageModels/FlightsPageModel";
import { HotelsPageModel } from "../hotelsPageModels/HotelsPageModel";
import { ToursPageModel } from "../toursPageModels/ToursPageModel";
import { VisaPageModel } from "../visaPageModels/VisaPageModel";


export class PhpTravelsModel {
    constructor(
        public readonly flightsPageModel?: FlightsPageModel,
        public readonly hotelsPageModel?: HotelsPageModel,
        public readonly toursPageModel?: ToursPageModel,
        public readonly carsPageModel?: CarsPageModel,
        public readonly visaPageModel?: VisaPageModel,
    ) { }

    static builder(): CarsPageModelBuilder {
        return new CarsPageModelBuilder();
    }
}

class CarsPageModelBuilder {
    private flightsPageModel?: FlightsPageModel;
    private hotelsPageModel?: HotelsPageModel;
    private toursPageModel?: ToursPageModel;
    private carsPageModel?: CarsPageModel;
    private visaPageModel?: VisaPageModel;

    setFlightsPageModel(flightsPageModel: FlightsPageModel): this {
        this.flightsPageModel = flightsPageModel;

        return this;
    }

    setHotelsPageModel(hotelsPageModel: HotelsPageModel): this {
        this.hotelsPageModel = hotelsPageModel;

        return this;
    }

    setToursPageModel(toursPageModel: ToursPageModel): this {
        this.toursPageModel = toursPageModel;

        return this;
    }

    setCarsPageModel(carsPageModel: CarsPageModel): this {
        this.carsPageModel = carsPageModel;

        return this;
    }

    setVisaPageModel(visaPageModel: VisaPageModel): this {
        this.visaPageModel = visaPageModel;

        return this;
    }

    build(): PhpTravelsModel {
        return new PhpTravelsModel(this.flightsPageModel, this.hotelsPageModel, this.toursPageModel, this.carsPageModel, this.visaPageModel);
    }
}