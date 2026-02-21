export class TravellerModel {
    constructor(
        public readonly adultsCount?: string,
        public readonly childrenCount?: string,
        public readonly infantsCount?: string,
    ) { }

    static builder(): TravellerModelBuilder {
        return new TravellerModelBuilder();
    }
}

class TravellerModelBuilder {
    private adultsCount?: string;
    private childrenCount?: string;
    private infantsCount?: string;

    setAdultsCount(adultsCount: string): this {
        this.adultsCount = adultsCount;

        return this;
    }

    setChildrenCount(childrenCount: string): this {
        this.childrenCount = childrenCount;

        return this;
    }

    setInfantsCount(infantsCount: string): this {
        this.infantsCount = infantsCount;

        return this;
    }

    build(): TravellerModel {
        return new TravellerModel(this.adultsCount, this.childrenCount, this.infantsCount);
    }
}