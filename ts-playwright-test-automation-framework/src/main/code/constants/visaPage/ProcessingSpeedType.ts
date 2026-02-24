export class ProcessingSpeedType {
    static readonly STANDARD = new ProcessingSpeedType("Standard");
    static readonly EXPRESS = new ProcessingSpeedType("Express");
    static readonly RUSH = new ProcessingSpeedType("Rush");
    static readonly SUPER_RUSH = new ProcessingSpeedType("Super Rush");

    private constructor(
        private readonly name: string
    ) { }

    getName(): string {
        return this.name;
    }
}