export type UnknownRecord = Record<string, unknown>;

export const asRecord = (value: unknown): UnknownRecord =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};

export const readValue = (record: UnknownRecord, ...keys: string[]) => {
  for (const key of keys) {
    if (record[key] !== undefined) {
      return record[key];
    }
  }

  return undefined;
};

export const readPairValue = (
  record: UnknownRecord,
  camelKey: string,
  pascalKey?: string,
) => readValue(record, camelKey, pascalKey ?? camelKey);
