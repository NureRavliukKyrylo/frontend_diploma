import axios from "axios";
import { apiClient } from "@shared/api";

export const getOrganizationEditAccess = async (
  organizationId: string,
): Promise<boolean> => {
  try {
    await apiClient.get(`/Projects/organization/${organizationId}/list`, {
      params: {
        Page: 1,
        PageSize: 1,
      },
    });

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 403 || status === 404) {
        return false;
      }
    }

    throw error;
  }
};
