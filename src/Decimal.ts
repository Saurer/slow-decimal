import { ParseError } from "./errors";
import { add } from "./math";

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

  public toString(): string {
    if (this.low && this.high) {
      return [this.high, DELIMITER, this.low].join("");
    } else if (this.high) {
      return this.high;
    } else if (this.low) {
      return ["0", DELIMITER, this.low].join("");
    } else {
      return "0";
    }
  }
}
