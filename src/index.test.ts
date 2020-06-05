import hello from "./";

describe("Test for tests", () => {
  test("It works", () => {
    expect(hello).not.toThrow();
  });
});
