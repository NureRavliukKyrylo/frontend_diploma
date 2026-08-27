import { apiClient } from "@shared/api";
import { normalizeOrganizationMemberships } from "../lib/normalizeOrganizationMembership";
import type { OrganizationMembership } from "../model/types/OrganizationMembership";

export const getMyOrganizationMemberships = async (): Promise<
  OrganizationMembership[]
> => {
  const response = await apiClient.get<unknown>("Participation/me", {
    params: {
      EntityType: "organization",
      PageSize: 100,
    },
  });

  return normalizeOrganizationMemberships(response.data);
};
