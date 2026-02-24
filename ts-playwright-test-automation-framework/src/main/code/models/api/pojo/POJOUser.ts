import { BasePOJO } from "../../../utils/basePOJO/BasePOJO";

export class POJOUser extends BasePOJO<POJOUser> {
    constructor(
        public id: number,
        public name: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public phone: string,
        public userStatus: string
    ) {
        super();
    }
}
