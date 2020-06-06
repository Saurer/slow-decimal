import { ParseError } from "./errors";
import { add, CompareResult, compare, sub } from "./math";

const DELIMITER = ".";

export default class Decimal {
  private _parts: [string, string];
  private _negative: boolean;

  public get high(): string {
    return this._parts[0];
  }

  public get low(): string {
    return this._parts[1];
  }

  public get negative(): boolean {
    return this._negative;
  }

  private constructor(high: string, low: string, negative: boolean) {
    this._parts = [high, low];
    this._negative = negative;
  }

  private prepareValues(value: Decimal): [string, string, number] {
    const fractionLength = Math.max(this.low.length, value.low.length);
    const thisZeros = "0".repeat(Math.max(fractionLength - this.low.length, 0));
    const valueZeros = "0".repeat(
      Math.max(fractionLength - value.low.length, 0)
    );
    const thisValue = this.high + this.low + thisZeros;
    const otherValue = value.high + value.low + valueZeros;
    return [thisValue, otherValue, fractionLength];
  }

  public static fromString(value: string): Decimal {
    const [left, right, ...rest] = value.split(DELIMITER);
    if (rest.length > 0) {
      throw new ParseError();
    }

    if (left.charAt(0) === "-") {
      return new Decimal(left.slice(1), right || "", true);
    } else {
      return new Decimal(left, right || "", false);
    }
  }

  public add(value: Decimal): Decimal {
    if (this.negative === value.negative) {
      const [thisValue, otherValue, fractionLength] = this.prepareValues(value);
      const result = add(thisValue, otherValue);
      const newHigh = result.slice(0, result.length - fractionLength);
      const newLow = result.slice(result.length - fractionLength);
      return new Decimal(newHigh, newLow, this.negative);
    } else if (this.negative) {
      return value.sub(this.invert());
    } else {
      return this.sub(value);
    }
  }

  public sub(value: Decimal): Decimal {
    if (value.negative) {
      return this.add(value.invert());
    } else if (this.negative) {
      return this.add(value.invert());
    } else {
      const [thisValue, otherValue, fractionLength] = this.prepareValues(value);
      const result = this.negative
        ? sub(otherValue, thisValue)
        : sub(thisValue, otherValue);

      const newHigh = result.slice(0, result.length - fractionLength);
      const newLow = result.slice(result.length - fractionLength);
      return Decimal.fromString(newHigh + DELIMITER + newLow);
    }
  }

  public compare(value: Decimal): CompareResult {
    if (this.negative === value.negative) {
      const fractionLength = Math.max(this.low.length, value.low.length);
      const thisZeros = "0".repeat(
        Math.max(fractionLength - this.low.length, 0)
      );
      const valueZeros = "0".repeat(
        Math.max(fractionLength - value.low.length, 0)
      );
      const x = this.high + this.low + thisZeros;
      const y = value.high + value.low + valueZeros;
      return this.negative ? compare(y, x) : compare(x, y);
    } else if (this.negative) {
      return CompareResult.LessThan;
    } else {
      return CompareResult.GreaterThan;
    }
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

  public invert(): Decimal {
    return new Decimal(this.high, this.low, !this.negative);
  }

  public toString(): string {
    const high = this.high || "0";
    const sign = this.negative ? "-" : "";

    if (this.low) {
      return sign + [high, DELIMITER, this.low].join("");
    } else {
      return sign + high;
    }
  }
}
