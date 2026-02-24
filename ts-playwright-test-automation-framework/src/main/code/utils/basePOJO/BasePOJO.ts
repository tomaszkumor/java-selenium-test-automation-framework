import fs from "fs";

export abstract class BasePOJO<T> {
    static fromJSON(this: any, json: any): any {
        const instance = Object.create(this.prototype);
        return Object.assign(instance, json);
    }

    static fromFile(this: any, path: string): any {
        const json = fs.readFileSync(path, "utf-8");
        return this.fromJSON(JSON.parse(json));
    }

    equals(other: T): boolean {
        return JSON.stringify(this) === JSON.stringify(other);
    }
}
