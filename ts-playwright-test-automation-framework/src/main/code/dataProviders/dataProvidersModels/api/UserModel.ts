export class UserModel {
    constructor(
        public readonly userName?: string,
        public readonly password?: string,
    ) { }

    static builder(): UserModelBuilder {
        return new UserModelBuilder();
    }
}

class UserModelBuilder {
    private userName?: string;
    private password?: string;

    setUserName(userName: string): this {
        this.userName = userName;
        return this;
    }

    setPassword(password: string): this {
        this.password = password;
        return this;
    }

    build(): UserModel {
        return new UserModel(this.userName, this.password);
    }
}
