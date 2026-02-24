type DPFunction = () => any;

class DataProviderRegistry {
  private static providers = new Map<string, DPFunction>();

  static register(testMethodName: string, fn: DPFunction) {
    this.providers.set(testMethodName, fn);
  }

  static get(testMethodName: string): any {
    const dp = this.providers.get(testMethodName);
    if (!dp) {
      throw new Error(`No DataProvider for test method: ${testMethodName}`);
    }
    return dp();
  }
}

export { DataProviderRegistry };