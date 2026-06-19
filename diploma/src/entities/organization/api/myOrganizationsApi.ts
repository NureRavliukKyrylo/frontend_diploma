import axios from "axios";
import { apiClient } from "@shared/api";
import { normalizeOrganizationsResponse } from "../lib/normalizeOrganizationResponse";
import type { OrganizationSearchParams } from "../lib/search-schema/organizationSearchSchema";
import type { MyOrganizationsResponse } from "../model/types/OrganizationResponse";

const RECOVERY_PAGE_SIZE = 1;
const MAX_RECOVERY_PROBE_PAGES = 100;

const requestMyOrganizations = async (
  params: OrganizationSearchParams,
  page: number,
  pageSize: number,
  archivedOnly = false,
): Promise<MyOrganizationsResponse> => {
  const response = await apiClient.get<unknown>("/Organization/my", {
    params: {
      Page: page,
      PageSize: pageSize,
      Search: params.Search,
      IncludeArchived: archivedOnly,
      Statuses: archivedOnly ? "archived" : undefined,
    },
  });

  return normalizeOrganizationsResponse(response.data);
};

const recoverMyOrganizations = async (
  params: OrganizationSearchParams,
  archivedOnly = false,
): Promise<MyOrganizationsResponse | null> => {
  const recoveredPages = new Map<number, MyOrganizationsResponse>();
  let totalPages: number | null = null;

  for (
    let page = 1;
    page <= (totalPages ?? MAX_RECOVERY_PROBE_PAGES);
    page += 1
  ) {
    try {
      const response = await requestMyOrganizations(
        params,
        page,
        RECOVERY_PAGE_SIZE,
        archivedOnly,
      );

      recoveredPages.set(page, response);
      totalPages = response.pagination.totalPages;
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== 500) {
        throw error;
      }
    }

    if (totalPages !== null && page >= totalPages) break;
  }

  if (recoveredPages.size === 0 || totalPages === null) return null;

  const organizations = Array.from(recoveredPages.values()).flatMap(
    (response) => response.data,
  );
  const uniqueOrganizations = Array.from(
    new Map(
      organizations.map((organization) => [organization.id, organization]),
    ).values(),
  );
  const requestedPageSize = Math.max(params.pageSize ?? 12, 1);

  return {
    data: uniqueOrganizations,
    pagination: {
      totalCount: uniqueOrganizations.length,
      page: 1,
      pageSize: requestedPageSize,
      totalPages: Math.max(
        1,
        Math.ceil(uniqueOrganizations.length / requestedPageSize),
      ),
      nextPage: 0,
      previousPage: 0,
    },
  };
};

export const getMyOrganizations = async (
  params: OrganizationSearchParams,
): Promise<MyOrganizationsResponse> => {
  try {
    return await requestMyOrganizations(
      params,
      params.Page ?? 1,
      params.pageSize ?? 12,
    );
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 500) {
      throw error;
    }

    const recoveredResponse = await recoverMyOrganizations(params);

    if (recoveredResponse) return recoveredResponse;

    throw error;
  }
};

export const getMyArchivedOrganizations = async (
  params: OrganizationSearchParams,
): Promise<MyOrganizationsResponse> => {
  try {
    return await requestMyOrganizations(
      params,
      params.Page ?? 1,
      params.pageSize ?? params.PageSize ?? 12,
      true,
    );
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 500) {
      throw error;
    }

    const recoveredResponse = await recoverMyOrganizations(params, true);

    if (recoveredResponse) return recoveredResponse;

    throw error;
  }
};
