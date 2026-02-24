export class AccommodationModel {
    constructor(
        public readonly roomsCount?: string,
        public readonly adultsCount?: string,
        public readonly childrenCount?: string,
    ) { }

    static builder(): AccommodationModelBuilder {
        return new AccommodationModelBuilder();
    }
}

class AccommodationModelBuilder {
    private roomsCount?: string;
    private adultsCount?: string;
    private childrenCount?: string;

    setRoomsCount(roomsCount: string): this {
        this.roomsCount = roomsCount;

        return this;
    }

    setAdultsCount(adultsCount: string): this {
        this.adultsCount = adultsCount;

        return this;
    }

    setChildrenCount(childrenCount: string): this {
        this.childrenCount = childrenCount;

        return this;
    }

    build(): AccommodationModel {
        return new AccommodationModel(this.roomsCount, this.adultsCount, this.childrenCount);
    }
}