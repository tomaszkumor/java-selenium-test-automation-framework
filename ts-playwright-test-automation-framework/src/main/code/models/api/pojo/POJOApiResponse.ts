import { BasePOJO } from "../../../utils/basePOJO/BasePOJO";

export class POJOApiResponse extends BasePOJO<POJOApiResponse> {
    constructor(
        public code: number,
        public type: string,
        public message: string
    ) {
        super();
    }
}

