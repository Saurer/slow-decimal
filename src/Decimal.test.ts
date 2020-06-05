import Decimal from "./";

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
});
