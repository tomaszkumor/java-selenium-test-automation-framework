import { Month } from "../../../../constants/common/Month";

export class DateModel {
    constructor(
        public readonly year?: string,
        public readonly month?: Month,
        public readonly day?: string,
    ) { }

    static builder(): DateModelBuilder {
        return new DateModelBuilder();
    }
}

class DateModelBuilder {
    private year?: string;
    private month?: Month;
    private day?: string;

    setYear(year: string): this {
        this.year = year;

        return this;
    }

    setMonth(month: Month): this {
        this.month = month;

        return this;
    }

    setDay(day: string): this {
        this.day = day;

        return this;
    }

    build(): DateModel {
        return new DateModel(this.year, this.month, this.day);
    }
}