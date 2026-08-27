import { apiClient } from "@shared/api";
import { extractOrganizationId } from "../lib/normalizeOrganizationMutationResponse";

export interface CreateOrganizationDto {
  name: string;
  description: string;
  contactEmail?: string | null;
  website?: string | null;
  joinPolicy?: string | null;
  leavePolicy?: string | null;
}

export const createOrganization = async (payload: CreateOrganizationDto) => {
  const response = await apiClient.post<unknown>(
    "/Organization/create",
    {
      Name: payload.name,
      Description: payload.description,
      ContactEmail: payload.contactEmail ?? null,
      Website: payload.website ?? null,
      SocialLinks: [],
      JoinPolicy: payload.joinPolicy ?? null,
      LeavePolicy: payload.leavePolicy ?? null,
    },
  );

  const organizationId = extractOrganizationId(response.data);

  if (!organizationId) {
    throw new Error("Failed to create organization");
  }

  return organizationId;
};
