export class OrderModel {
    constructor(
        public readonly id?: number,
    ) { }

    static builder(): OrderModelBuilder {
        return new OrderModelBuilder();
    }
}

class OrderModelBuilder {
    private id?: number;

    setId(id: number): this {
        this.id = id;

        return this;
    }

    build(): OrderModel {
        return new OrderModel(this.id);
    }
}