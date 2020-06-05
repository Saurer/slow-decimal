const DIGITS = { ..."0123456789".split("").map((l) => parseInt(l, 10)) };

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
    const sum = DIGITS[x] + DIGITS[y] + (shift ? 1 : 0);

    if (sum >= 10) {
      shift = true;
      result.unshift(String.prototype.charAt.call(sum, 1));
    } else {
      shift = false;
      result.unshift(sum);
    }
  }

  if (shift) {
    result.unshift("1");
  }

  return result.join("");
}
