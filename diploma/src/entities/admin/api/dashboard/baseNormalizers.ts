import {
  asRecord,
  readArrayPair as readArray,
  readNumberPair as readNumber,
  readPairValue as read,
} from "@shared/api/normalize-helpers";
import type {
  AdminPagedApiResponse,
  AdminPagedResult,
} from "../../model/types/adminDashboard";

export const unwrapResponsePayload = (value: unknown) => {
  const record = asRecord(value);
  const data = record.data ?? record.Data;
  const result = record.result ?? record.Result;

  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data;
  }

  if (result && typeof result === "object" && !Array.isArray(result)) {
    return result;
  }

  return value;
};

export const normalizeAdminPagedResult = <T>(
  value: unknown,
  normalize: (value: unknown) => T,
): AdminPagedResult<T> => {
  const record = asRecord(value);

  return {
    items: readArray(record, "items", "Items", normalize),
    page: readNumber(record, "page", "Page"),
    pageSize: readNumber(record, "pageSize", "PageSize"),
    totalCount: readNumber(record, "totalCount", "TotalCount"),
    totalPages: readNumber(record, "totalPages", "TotalPages"),
  };
};

export const normalizePagedApiResponse = <T>(
  value: unknown,
  normalize: (value: unknown) => T,
): AdminPagedApiResponse<T> => {
  const record = asRecord(value);
  const pagination = asRecord(read(record, "pagination", "Pagination"));

  return {
    data: readArray(record, "data", "Data", normalize),
    pagination: {
      totalCount: readNumber(pagination, "totalCount", "TotalCount"),
      page: readNumber(pagination, "page", "Page"),
      pageSize: readNumber(pagination, "pageSize", "PageSize"),
      totalPages: readNumber(pagination, "totalPages", "TotalPages"),
      nextPage: readNumber(pagination, "nextPage", "NextPage") || null,
    },
  };
};

export const normalizeUnknownItem = (value: unknown) => asRecord(value);
