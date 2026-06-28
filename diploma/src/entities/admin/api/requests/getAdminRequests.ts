import { apiClient } from "@shared/api";
import { asRecord, readValue } from "@shared/api/normalize-helpers";
import type {
  AdminRequestsParams,
  AdminRequestsResponse,
} from "../../model/types/adminRequests";
import {
  normalizeAdminRequest,
  normalizeAdminRequestsPagination,
} from "./normalizeAdminRequest";

export const getAdminRequests = async (
  params: AdminRequestsParams = {},
): Promise<AdminRequestsResponse> => {
  const response = await apiClient.get<unknown>("Requests/list", { params });
  const root = asRecord(response.data);
  const dataValue =
    readValue(root, "data", "Data", "items", "Items", "results", "Results") ??
    response.data;
  const data = Array.isArray(dataValue)
    ? dataValue.map(normalizeAdminRequest)
    : [];

  return {
    data,
    pagination: normalizeAdminRequestsPagination(root, data.length, params),
  };
};
