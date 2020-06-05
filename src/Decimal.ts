import { ParseError } from "./errors";
import { add, CompareResult, compare, sub } from "./math";

const DELIMITER = ".";

export default class Decimal {
  private _parts: [string, string];

  public get high(): string {
    return this._parts[0];
  }

  public get low(): string {
    return this._parts[1];
  }

  private constructor(high: string, low: string) {
    this._parts = [high, low];
  }

  public static fromString(value: string): Decimal {
    const [left, right, ...rest] = value.split(DELIMITER);
    if (rest.length > 0) {
      throw new ParseError();
    }
    return new Decimal(left, right || "");
  }

  public add(value: Decimal): Decimal {
    const fractionLength = Math.max(this.low.length, value.low.length);
    const thisZeros = "0".repeat(Math.max(fractionLength - this.low.length, 0));
    const valueZeros = "0".repeat(
      Math.max(fractionLength - value.low.length, 0)
    );
    const result = add(
      this.high + this.low + thisZeros,
      value.high + value.low + valueZeros
    );

    const newHigh = result.slice(0, result.length - fractionLength);
    const newLow = result.slice(result.length - fractionLength);
    return new Decimal(newHigh, newLow);
  }

  public sub(value: Decimal): Decimal {
    const fractionLength = Math.max(this.low.length, value.low.length);
    const thisZeros = "0".repeat(Math.max(fractionLength - this.low.length, 0));
    const valueZeros = "0".repeat(
      Math.max(fractionLength - value.low.length, 0)
    );
    const result = sub(
      this.high + this.low + thisZeros,
      value.high + value.low + valueZeros
    );

    const newHigh = result.slice(0, result.length - fractionLength);
    const newLow = result.slice(result.length - fractionLength);
    return new Decimal(newHigh, newLow);
  }

  public compare(value: Decimal): CompareResult {
    const fractionLength = Math.max(this.low.length, value.low.length);
    const thisZeros = "0".repeat(Math.max(fractionLength - this.low.length, 0));
    const valueZeros = "0".repeat(
      Math.max(fractionLength - value.low.length, 0)
    );
    const x = this.high + this.low + thisZeros;
    const y = value.high + value.low + valueZeros;
    return compare(x, y);
  }

  public greaterThan(value: Decimal): boolean {
    return this.compare(value) === CompareResult.GreaterThan;
  }

  public lessThan(value: Decimal): boolean {
    return this.compare(value) === CompareResult.LessThan;
  }

  public equalTo(value: Decimal): boolean {
    return this.compare(value) === CompareResult.Equal;
  }

  public toString(): string {
    const high = this.high || "0";

    if (this.low) {
      return [high, DELIMITER, this.low].join("");
    } else {
      return high;
    }
  }
}
