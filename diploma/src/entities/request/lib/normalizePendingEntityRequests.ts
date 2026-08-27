import {
  asRecord,
  readArrayPair,
  readPairValue,
  readStringPair,
} from "@shared/api/normalize-helpers";
import type {
  EntityRequestKind,
  PendingEntityRequest,
} from "../model/types";

const normalizeStatus = (value: unknown) => {
  if (typeof value === "number") {
    return ["new", "inProgress", "resolved", "rejected", "appealed"][
      value
    ] ?? String(value);
  }

  return typeof value === "string" ? value : "";
};

const normalizePendingEntityRequest = (
  value: unknown,
  kind: EntityRequestKind,
): PendingEntityRequest | null => {
  const record = asRecord(value);
  const id = readStringPair(record, "id", "Id");
  const userId = readStringPair(record, "userId", "UserId");
  const createdAt = readStringPair(record, "createdAt", "CreatedAt");
  const updatedAt =
    readStringPair(record, "updatedAt", "UpdatedAt") || createdAt;

  if (!id || !userId || !createdAt) return null;

  return {
    id,
    userId,
    status: normalizeStatus(readPairValue(record, "status", "Status")),
    title: readStringPair(record, "title", "Title"),
    description: readStringPair(record, "description", "Description"),
    createdAt,
    updatedAt,
    kind,
  };
};

export const normalizePendingEntityRequests = (
  value: unknown,
  kind: EntityRequestKind,
): PendingEntityRequest[] => {
  const record = asRecord(value);

  return readArrayPair(record, "data", "Data", (item) => item)
    .map((item) => normalizePendingEntityRequest(item, kind))
    .filter((item): item is PendingEntityRequest => item !== null);
};
