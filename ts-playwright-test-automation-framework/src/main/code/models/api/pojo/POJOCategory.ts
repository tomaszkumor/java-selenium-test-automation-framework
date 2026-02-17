import { BasePOJO } from "../../../utils/basePOJO/BasePOJO";

export class POJOCategory extends BasePOJO<POJOCategory> {
    constructor(
        public id: number,
        public name: string
    ) {
        super();
    }
}
