export class ChildModel {
    constructor(
        public readonly childNo?: string,
        public readonly childAge?: string,
    ) { }

    static builder(): ChildModelBuilder {
        return new ChildModelBuilder();
    }
}

class ChildModelBuilder {
    private childNo?: string;
    private childAge?: string;

    setChildNo(childNo: string): this {
        this.childNo = childNo;

        return this;
    }

    setChildAge(childAge: string): this {
        this.childAge = childAge;

        return this;
    }

    build(): ChildModel {
        return new ChildModel(this.childNo, this.childAge);
    }
}