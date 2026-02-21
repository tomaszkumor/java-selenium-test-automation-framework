export class TimeModel {
    constructor(
        public readonly hours?: string,
        public readonly minutes?: string,
        public readonly dayPeriod?: string,
    ) { }

    static builder(): TimeModelBuilder {
        return new TimeModelBuilder();
    }
}

class TimeModelBuilder {
    private hours?: string;
    private minutes?: string;
    private dayPeriod?: string;

    setExpectedDepartureAirport(hours: string): this {
        this.hours = hours;

        return this;
    }

    setExpectedArrivalCity(minutes: string): this {
        this.minutes = minutes;

        return this;
    }

    setExpectedPickUpDate(dayPeriod: string): this {
        this.dayPeriod = dayPeriod;

        return this;
    }

    build(): TimeModel {
        return new TimeModel(this.hours, this.minutes, this.dayPeriod);
    }
}