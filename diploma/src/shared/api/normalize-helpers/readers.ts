import { readPairValue, readValue, type UnknownRecord } from "./record";

export const readString = (
  record: UnknownRecord,
  keys: string[],
  fallback = "",
) => {
  const value = readValue(record, ...keys);
  return typeof value === "string" ? value : fallback;
};

export const readStringPair = (
  record: UnknownRecord,
  camelKey: string,
  pascalKey?: string,
) => {
  const value = readPairValue(record, camelKey, pascalKey);
  return typeof value === "string" ? value : "";
};

export const readNullableString = (
  record: UnknownRecord,
  keys: string[],
) => {
  const value = readValue(record, ...keys);
  return typeof value === "string" && value.trim() ? value : null;
};

export const readNullableStringPair = (
  record: UnknownRecord,
  camelKey: string,
  pascalKey?: string,
) => {
  const value = readPairValue(record, camelKey, pascalKey);
  return typeof value === "string" ? value : null;
};

export const readTrimmedNullableStringPair = (
  record: UnknownRecord,
  camelKey: string,
  pascalKey?: string,
) => {
  const value = readPairValue(record, camelKey, pascalKey);
  return typeof value === "string" && value.trim() ? value : null;
};

export const readNumber = (
  record: UnknownRecord,
  keys: string[],
  fallback = 0,
) => {
  const value = readValue(record, ...keys);

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
};

export const readNumberPair = (
  record: UnknownRecord,
  camelKey: string,
  pascalKey?: string,
) => readNumber(record, [camelKey, pascalKey ?? camelKey]);

export const readNullableNumber = (
  record: UnknownRecord,
  keys: string[],
) => {
  const value = readValue(record, ...keys);

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

export const readBoolean = (
  record: UnknownRecord,
  keys: string[],
  fallback = false,
) => {
  const value = readValue(record, ...keys);

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }

  return fallback;
};

export const readBooleanPair = (
  record: UnknownRecord,
  camelKey: string,
  pascalKey?: string,
) => readBoolean(record, [camelKey, pascalKey ?? camelKey]);

export const readArray = <T>(
  record: UnknownRecord,
  keys: string[],
  normalize: (value: unknown) => T,
) => {
  const value = readValue(record, ...keys);
  return Array.isArray(value) ? value.map(normalize) : [];
};

export const readArrayPair = <T>(
  record: UnknownRecord,
  camelKey: string,
  pascalKey: string | undefined,
  normalize: (value: unknown) => T,
) => readArray(record, [camelKey, pascalKey ?? camelKey], normalize);

export const readStringArrayPair = (
  record: UnknownRecord,
  camelKey: string,
  pascalKey?: string,
) => {
  const value = readPairValue(record, camelKey, pascalKey);
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
};

export const readJson = (record: UnknownRecord, keys: string[]) => {
  const value = readValue(record, ...keys);

  if (typeof value === "string" && value.trim()) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value ?? null;
};
