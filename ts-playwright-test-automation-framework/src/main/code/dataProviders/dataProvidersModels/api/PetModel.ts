export class PetModel {
    constructor(
        public readonly id?: number,
        public readonly name?: string,
        public readonly status?: string,
    ) { }

    static builder(): PetModelBuilder {
        return new PetModelBuilder();
    }
}

class PetModelBuilder {
    private id?: number;
    private name?: string;
    private status?: string;

    setId(id: number): this {
        this.id = id;

        return this;
    }

    setName(name: string): this {
        this.name = name;

        return this;
    }

    setStatus(status: string): this {
        this.status = status;

        return this;
    }


    build(): PetModel {
        return new PetModel(this.id, this.name, this.status);
    }
}