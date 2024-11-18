type SystemOfNumber = "decimal" | "binary" | "hexadecimal";

function parseNumber(value: string, system: SystemOfNumber): number {
  switch (system) {
    case "binary":
      return parseInt(value, 2);
    case "hexadecimal":
      return parseInt(value, 16);
    case "decimal":
    default:
      return parseInt(value, 10);
  }
}

function formatNumber(value: number, system: SystemOfNumber): string {
  switch (system) {
    case "binary":
      return value.toString(2);
    case "hexadecimal":
      return value.toString(16).toUpperCase();
    case "decimal":
    default:
      return value.toString(10);
  }
}

function add(
  a: string,
  b: string,
  system: SystemOfNumber
): string {
  const num1 = parseNumber(a, system);
  const num2 = parseNumber(b, system);
  const result = num1 + num2;
  console.log(`Сложение ${a} и ${b} результат ${formatNumber(result, system)}`);
  return formatNumber(result, system);
}

function deduct(
  a: string,
  b: string,
  system: SystemOfNumber
): string {
  const num1 = parseNumber(a, system);
  const num2 = parseNumber(b, system);
  const result = num1 - num2;
  console.log(`Вычитание ${a} и ${b} результат ${formatNumber(result, system)}`);
  return formatNumber(result, system);
}

function increase(
  a: string,
  b: string,
  system: SystemOfNumber
): string {
  const num1 = parseNumber(a, system);
  const num2 = parseNumber(b, system);
  const result = num1 * num2;
  console.log(`Умножение ${a} и ${b} результат ${formatNumber(result, system)}`);
  return formatNumber(result, system);
}

function division(
  a: string,
  b: string,
  system: SystemOfNumber
): string | null {
  const num1 = parseNumber(a, system);
  const num2 = parseNumber(b, system);

  if (num2 === 0) {
    console.log("Деление на ноль");
    return null;
  }

  const result = Math.floor(num1 / num2);
  console.log(`Деление ${a} и ${b} результат ${formatNumber(result, system)}`);
  return formatNumber(result, system);
}

// Примеры

add("10", "20", "decimal");
division("40", "0", "decimal");

deduct("1100", "101", "binary");
increase("101", "10", "binary");

add("A", "F", "hexadecimal");
increase("C", "2", "hexadecimal");

