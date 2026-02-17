export class Traveller {
    static readonly ADULTS = new Traveller("Adults");
    static readonly CHILDS = new Traveller("Childs");
    static readonly INFANTS = new Traveller("Infants");
     
    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}