import { BasePOJO } from "../../../utils/basePOJO/BasePOJO";
import { POJOCategory } from "./POJOCategory";
import { POJOTag } from "./POJOTag";

export class POJOPet extends BasePOJO<POJOPet> {
    constructor(
        public id: number,
        public category: POJOCategory,
        public name: string,
        public photoUrls: string[],
        public tags: POJOTag[],
        public status: string
    ) {
        super();
    }

    static fromJSON(json: any): POJOPet {
        const instance = super.fromJSON(json) as POJOPet;

        instance.category = POJOCategory.fromJSON(json.category);
        instance.tags = json.tags?.map((t: any) => POJOTag.fromJSON(t)) || [];

        return instance;
    }
}

