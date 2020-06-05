const DIGITS = { ..."0123456789".split("").map((l) => parseInt(l, 10)) };

export enum CompareResult {
  LessThan,
  Equal,
  GreaterThan,
}

function flipLength(a: string, b: string): [string, string, number] {
  if (a.length > b.length) {
    return [a, b, a.length - b.length];
  } else {
    return [b, a, b.length - a.length];
  }
}

export function add(a: string, b: string): string {
  const [long, short, diff] = flipLength(a, b);
  const result: string[] = [];

  let shift = false;
  for (let i = short.length - 1; i >= -diff; i--) {
    const x = long.charAt(i + diff);
    const y = i < 0 ? "0" : short.charAt(i);
    const sum: number = DIGITS[x] + DIGITS[y] + (shift ? 1 : 0);

    if (sum >= 10) {
      shift = true;
      result.unshift(String.prototype.charAt.call(sum, 1));
    } else {
      shift = false;
      result.unshift(String(sum));
    }
  }

  if (shift) {
    result.unshift("1");
  }

  return result.join("");
}

export function sub(value: string, subtrahend: string): string {
  const compareResult = compare(value, subtrahend);
  let valueA: string, valueB: string;
  let negate: boolean;
  const result: number[] = [];

  switch (compareResult) {
    case CompareResult.Equal:
      return "0";

    case CompareResult.GreaterThan:
      valueA = value;
      valueB = subtrahend;
      negate = false;
      break;

    case CompareResult.LessThan:
      valueA = subtrahend;
      valueB = value;
      negate = true;
      break;
  }

  let shift = false;
  for (let i = 1; i <= valueA.length; i++) {
    let x = DIGITS[valueA.charAt(valueA.length - i)] - Number(shift);
    if (x < 0) {
      x = DIGITS[9];
      shift = true;
    } else {
      shift = false;
    }
    const y = DIGITS[valueB.length - i < 0 ? "0" : valueB[valueB.length - i]];

    if (x >= y) {
      result.unshift(x - y);
    } else {
      const index = 10 - (y - x);
      result.unshift(DIGITS[index]);
      shift = true;
    }
  }

  return (negate ? "-" : "") + result.join("");
}

export function compare(valueA: string, valueB: string): CompareResult {
  if (valueA.length > valueB.length) {
    return CompareResult.GreaterThan;
  } else if (valueB.length > valueA.length) {
    return CompareResult.LessThan;
  } else {
    for (let i = 0; i < valueA.length; i++) {
      const x = DIGITS[valueA.charAt(i)];
      const y = DIGITS[valueB.charAt(i)];

      if (x > y) {
        return CompareResult.GreaterThan;
      } else if (y > x) {
        return CompareResult.LessThan;
      }
    }

    return CompareResult.Equal;
  }
}
