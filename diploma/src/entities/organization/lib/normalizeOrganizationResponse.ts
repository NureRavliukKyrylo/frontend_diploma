import type { PaginationResponse } from "@shared/config/types";
import type { OrganizationMember } from "../model/types";
import type { OrganizationResponse } from "../model/types/OrganizationResponse";
import {
  normalizeOrganization,
  normalizeOrganizationMember,
} from "./normalizeOrganization";

type RawPaginationResponse = Partial<PaginationResponse> & {
  TotalCount?: number;
  Page?: number;
  PageSize?: number;
  TotalPages?: number;
  NextPage?: number | null;
  PreviousPage?: number | null;
};

export const normalizePagination = (
  raw?: RawPaginationResponse,
): PaginationResponse => {
  const totalCount = raw?.totalCount ?? raw?.TotalCount ?? 0;
  const page = raw?.page ?? raw?.Page ?? 1;
  const pageSize = raw?.pageSize ?? raw?.PageSize ?? 12;
  const totalPages =
    raw?.totalPages ??
    raw?.TotalPages ??
    (pageSize > 0 ? Math.max(1, Math.ceil(totalCount / pageSize)) : 1);
  const nextPage =
    raw?.nextPage ?? raw?.NextPage ?? (page < totalPages ? page + 1 : 0);
  const previousPage =
    raw?.previousPage ?? raw?.PreviousPage ?? (page > 1 ? page - 1 : 0);

  return {
    totalCount,
    page,
    pageSize,
    totalPages,
    nextPage: nextPage ?? 0,
    previousPage: previousPage ?? 0,
  };
};

export const normalizeOrganizationsResponse = (
  payload: unknown,
): OrganizationResponse => {
  if (typeof payload !== "object" || payload === null) {
    return { data: [], pagination: normalizePagination() };
  }

  const value = payload as {
    data?: unknown[];
    Data?: unknown[];
    pagination?: RawPaginationResponse;
    Pagination?: RawPaginationResponse;
  };
  const rawData = value.data ?? value.Data ?? [];

  return {
    data: rawData
      .map((item) => normalizeOrganization(item))
      .filter((item): item is NonNullable<typeof item> => item !== null),
    pagination: normalizePagination(value.pagination ?? value.Pagination),
  };
};

export const extractOrganization = (payload: unknown): unknown => {
  if (typeof payload !== "object" || payload === null) return payload;

  const value = payload as {
    data?: unknown;
    Data?: unknown;
    organization?: unknown;
    Organization?: unknown;
  };

  return (
    value.data ??
    value.Data ??
    value.organization ??
    value.Organization ??
    payload
  );
};

export const normalizeOrganizationMembers = (
  payload: unknown,
): OrganizationMember[] => {
  if (Array.isArray(payload)) {
    return payload
      .map(normalizeOrganizationMember)
      .filter((member): member is OrganizationMember => member !== null);
  }

  if (typeof payload !== "object" || payload === null) return [];

  const value = payload as {
    data?: unknown[];
    Data?: unknown[];
    members?: unknown[];
    Members?: unknown[];
  };
  const members = value.data ?? value.Data ?? value.members ?? value.Members;

  return Array.isArray(members)
    ? members
        .map(normalizeOrganizationMember)
        .filter((member): member is OrganizationMember => member !== null)
    : [];
};
