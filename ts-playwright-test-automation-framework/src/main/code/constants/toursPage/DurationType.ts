export class DurationType {
    static readonly ANY_DURATION = new DurationType("Any Duration");
    static readonly DAY_1 = new DurationType("1 Day");
    static readonly DAYS_2_TO_3 = new DurationType("2-3 Days");
    static readonly DAYS_4_TO_7 = new DurationType("4-7 Days");
    static readonly DAYS_15_PLUS = new DurationType("15+ Days");
    static readonly WEEKS_1_TO_2 = new DurationType("1-2 Weeks");

    private constructor(
        private readonly name: string
    ) { }

    getName(): String {
        return this.name;
    }
}