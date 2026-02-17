export class VisaType {
    static readonly TOURIST = new VisaType("Tourist Visa");
    static readonly BUSINESS = new VisaType("Business Visa");
    static readonly STUDENT = new VisaType("Student Visa");
    static readonly WORK = new VisaType("Work Visa");
    static readonly TRANSIT = new VisaType("Transit Visa");
    static readonly MEDICAL = new VisaType("Medical Visa");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}