export class ParseError extends Error {
  constructor() {
    super();
    this.name = "ParseError";
    this.message = "Specified value is not a valid decimal";
  }
}
