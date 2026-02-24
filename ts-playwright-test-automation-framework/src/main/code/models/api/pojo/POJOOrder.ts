import { BasePOJO } from "../../../utils/basePOJO/BasePOJO";

export class POJOOrder extends BasePOJO<POJOOrder> {
    constructor(
        public id: number,
        public petId: number,
        public quantity: number,
        public shipDate: string,
        public status: string,
        public complete: boolean
    ) {
        super();
    }

    public replaceShipDate(actualResponse: POJOOrder): POJOOrder {
        this.shipDate = actualResponse.shipDate;
        return this;
    }
}

