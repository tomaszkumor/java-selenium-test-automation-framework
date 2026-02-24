import { BasePOJO } from "../../../utils/basePOJO/BasePOJO";

export class POJOTag extends BasePOJO<POJOTag> {
    constructor(
        public id: number,
        public name: string
    ) {
        super();
    }
}
