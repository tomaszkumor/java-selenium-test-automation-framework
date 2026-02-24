export class Month {
  private constructor(
    public readonly number: number,
    public readonly numberWithZero: string,
    public readonly fullName: string,
    public readonly shortName: string
  ) { }

  static readonly JANUARY = new Month(1, "01", "January", "Jan");
  static readonly FEBRUARY = new Month(2, "02", "February", "Feb");
  static readonly MARCH = new Month(3, "03", "March", "Mar");
  static readonly APRIL = new Month(4, "04", "April", "Apr");
  static readonly MAY = new Month(5, "05", "May", "May");
  static readonly JUNE = new Month(6, "06", "June", "Jun");
  static readonly JULY = new Month(7, "07", "July", "Jul");
  static readonly AUGUST = new Month(8, "08", "August", "Aug");
  static readonly SEPTEMBER = new Month(9, "09", "September", "Sep");
  static readonly OCTOBER = new Month(10, "10", "October", "Oct");
  static readonly NOVEMBER = new Month(11, "11", "November", "Nov");
  static readonly DECEMBER = new Month(12, "12", "December", "Dec");

  static readonly VALUES = [
    Month.JANUARY, Month.FEBRUARY, Month.MARCH, Month.APRIL,
    Month.MAY, Month.JUNE, Month.JULY, Month.AUGUST,
    Month.SEPTEMBER, Month.OCTOBER, Month.NOVEMBER, Month.DECEMBER
  ];

  static of(number: number): Month {
    const month = Month.VALUES.find(m => m.number === number);
    if (!month) throw new Error(`Invalid month number: ${number}`);
    return month;
  }

  static fromName(name: string): Month {
    const month = Month.VALUES.find(
      m => m.fullName.toLowerCase() === name.toLowerCase() ||
        m.shortName.toLowerCase() === name.toLowerCase()
    );
    if (!month) throw new Error(`Invalid month name: ${name}`);
    return month;
  }

  next(): Month {
    const nextNumber = this.number === 12 ? 1 : this.number + 1;
    return Month.of(nextNumber);
  }

  previous(): Month {
    const prevNumber = this.number === 1 ? 12 : this.number - 1;
    return Month.of(prevNumber);
  }

  toString(): string {
    return this.fullName;
  }

  toShortString(): string {
    return this.shortName;
  }

  toNumberWithZero(): string {
    return this.numberWithZero;
  }
}