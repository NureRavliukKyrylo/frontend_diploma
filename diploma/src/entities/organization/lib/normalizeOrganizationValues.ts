export const pickString = (
  ...values: Array<string | undefined | null>
): string | undefined => {
  for (const value of values) {
    if (typeof value === "string") return value;
  }
  return undefined;
};

export const pickFiniteNumber = (...values: unknown[]): number | undefined => {
  for (const value of values) {
    const numericValue = Number(value);

    if (
      value !== null &&
      value !== undefined &&
      value !== "" &&
      Number.isFinite(numericValue)
    ) {
      return numericValue;
    }
  }

  return undefined;
};

export const getNestedObjectValue = (
  raw: Record<string, unknown>,
  ...keys: string[]
): unknown => {
  for (const key of keys) {
    if (key in raw) return raw[key];
  }
  return undefined;
};
