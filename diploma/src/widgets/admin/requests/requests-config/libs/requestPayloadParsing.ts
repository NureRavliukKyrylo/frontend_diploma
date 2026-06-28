export const asRequestRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

const readPayloadValue = (record: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }

  return undefined;
};

export const readPayloadString = (
  record: Record<string, unknown>,
  keys: string[],
) => {
  const value = readPayloadValue(record, keys);

  return typeof value === "string" && value.trim() ? value.trim() : "";
};

export const readPayloadStringArray = (
  record: Record<string, unknown>,
  keys: string[],
) => {
  const value = readPayloadValue(record, keys);

  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === "string")
      .filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const stringifyData = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};
