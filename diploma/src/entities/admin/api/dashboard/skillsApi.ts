import { apiClient } from "@shared/api";
import { normalizePagedApiResponse, normalizeUnknownItem } from "./baseNormalizers";

export const getAdminSkills = async () => {
  const response = await apiClient.get<unknown>("Skills/list", {
    params: { Page: 1, PageSize: 1 },
  });

  return normalizePagedApiResponse(response.data, normalizeUnknownItem);
};
