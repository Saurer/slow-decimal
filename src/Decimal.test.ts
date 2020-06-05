import Decimal from "./";
import { CompareResult } from "./math";

describe("Decimal", () => {
  test("Zero addition", () => {
    const x = Decimal.fromString("123456789");
    const y = Decimal.fromString("0");

    expect(x.add(y).toString()).toBe("123456789");
    expect(y.add(x).toString()).toBe("123456789");
  });

  test("Zero addition fractions", () => {
    const x = Decimal.fromString("12345.6789");
    const y = Decimal.fromString("0");

    expect(x.add(y).toString()).toBe("12345.6789");
    expect(y.add(x).toString()).toBe("12345.6789");
  });

  test("Positive addition", () => {
    const x = Decimal.fromString("223456");
    const y = Decimal.fromString("853724");

    expect(x.add(y).toString()).toBe("1077180");
    expect(y.add(x).toString()).toBe("1077180");
  });

  test("Positive addition with fractions", () => {
    const x = Decimal.fromString("435897.4357");
    const y = Decimal.fromString("489.513");

    expect(x.add(y).toString()).toBe("436386.9487");
    expect(y.add(x).toString()).toBe("436386.9487");
  });

  test("Compare with zero", () => {
    const x = Decimal.fromString("123456789");
    const y = Decimal.fromString("0");

    expect(x.compare(y)).toBe(CompareResult.GreaterThan);
    expect(y.compare(x)).toBe(CompareResult.LessThan);
    expect(x.compare(x)).toBe(CompareResult.Equal);
    expect(y.compare(y)).toBe(CompareResult.Equal);

    expect(x.greaterThan(y)).toBe(true);
    expect(x.lessThan(y)).toBe(false);
    expect(x.equalTo(y)).toBe(false);

    expect(y.greaterThan(x)).toBe(false);
    expect(y.lessThan(x)).toBe(true);
    expect(y.equalTo(x)).toBe(false);
  });

  test("Compare with fractions", () => {
    const x = Decimal.fromString("12345.6789");
    const y = Decimal.fromString("12345");
    const z = Decimal.fromString("12345.6780");

    expect(x.compare(y)).toBe(CompareResult.GreaterThan);
    expect(y.compare(x)).toBe(CompareResult.LessThan);

    expect(x.compare(z)).toBe(CompareResult.GreaterThan);
    expect(z.compare(x)).toBe(CompareResult.LessThan);

    expect(y.compare(z)).toBe(CompareResult.LessThan);
    expect(z.compare(y)).toBe(CompareResult.GreaterThan);
  });

  test("Zero subtraction", () => {
    const x = Decimal.fromString("123456789");
    const y = Decimal.fromString("0");

    expect(x.sub(y).toString()).toBe("123456789");
    expect(y.sub(x).toString()).toBe("-123456789");
  });

  test("Zero subtraction fractions", () => {
    const x = Decimal.fromString("12345.6789");
    const y = Decimal.fromString("0");

    expect(x.sub(y).toString()).toBe("12345.6789");
    expect(y.sub(x).toString()).toBe("-12345.6789");
  });

  test("Positive subtraction", () => {
    const x = Decimal.fromString("223456");
    const y = Decimal.fromString("853724");

    expect(x.sub(y).toString()).toBe("-630268");
    expect(y.sub(x).toString()).toBe("630268");
  });

  test("Positive subtraction with fractions", () => {
    const x = Decimal.fromString("435897.4357");
    const y = Decimal.fromString("489.513");

    expect(x.sub(y).toString()).toBe("435407.9227");
    expect(y.sub(x).toString()).toBe("-435407.9227");
  });
});
