import axios from "axios";
import { apiClient } from "@shared/api";
import { normalizeOrganization } from "../lib/normalizeOrganization";
import { extractOrganization } from "../lib/normalizeOrganizationResponse";
import type { Organization } from "../model/types";

export const getOrganizationById = async (
  id: string,
): Promise<Organization | null> => {
  try {
    const response = await apiClient.get<unknown>(`/Organization/${id}`);
    return normalizeOrganization(extractOrganization(response.data)) ?? null;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 404 || error.response?.status === 500)
    ) {
      return null;
    }
    throw error;
  }
};
