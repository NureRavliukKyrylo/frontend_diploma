import { queryOptions } from "@tanstack/react-query";
import { getAdminRequests } from "../../api/adminRequestsApi";
import type { AdminRequestsParams } from "../types/adminRequests";

export const adminRequestKeys = {
  all: () => ["admin-requests"] as const,
  list: (params: AdminRequestsParams) =>
    [...adminRequestKeys.all(), "list", params] as const,
};

export const adminRequestQuery = {
  list: (params: AdminRequestsParams) =>
    queryOptions({
      queryKey: adminRequestKeys.list(params),
      queryFn: () => getAdminRequests(params),
      staleTime: 15_000,
    }),
};
