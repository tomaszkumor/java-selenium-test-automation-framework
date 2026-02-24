import { OrderModel } from "./OrderModel";
import { PetModel } from "./PetModel";
import { UserModel } from "./UserModel";

export class PetStoreModel {
    constructor(
        public readonly apiRequestBodyPath?: string,
        public readonly apiResponseBodyPath?: string,
        public readonly user?: UserModel,
        public readonly pet?: PetModel,
        public readonly order?: OrderModel,
    ) { }

    static builder(): PetStoreModelBuilder {
        return new PetStoreModelBuilder();
    }
}

class PetStoreModelBuilder {
    private apiRequestBodyPath?: string;
    private apiResponseBodyPath?: string;
    private user?: UserModel;
    private pet?: PetModel;
    private order?: OrderModel;

    setApiRequestBodyPath(apiRequestBodyPath: string): this {
        this.apiRequestBodyPath = apiRequestBodyPath;

        return this;
    }

    setApiResponseBodyPath(apiResponseBodyPath: string): this {
        this.apiResponseBodyPath = apiResponseBodyPath;

        return this;
    }

    setUser(user: UserModel): this {
        this.user = user;

        return this;
    }

    setPet(pet: PetModel): this {
        this.pet = pet;

        return this;
    }

    setOrder(order: OrderModel): this {
        this.order = order;

        return this;
    }

    build(): PetStoreModel {
        return new PetStoreModel(this.apiRequestBodyPath, this.apiResponseBodyPath, this.user, this.pet, this.order);
    }
}