import axios from "axios";
import { apiClient } from "@shared/api";
import type { OrganizationMember } from "../model/types";
import { normalizeOrganizationMembers } from "../lib/normalizeOrganizationResponse";

export const getOrganizationMembers = async (
  id: string,
): Promise<OrganizationMember[]> => {
  try {
    const response = await apiClient.get<unknown>(
      `/Participation/entity/organization/${id}/member-previews`,
      {
        params: {
          Page: 1,
          PageSize: 100,
        },
      },
    );
    return normalizeOrganizationMembers(response.data);
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 404 || error.response?.status === 500)
    ) {
      return [];
    }
    throw error;
  }
};
