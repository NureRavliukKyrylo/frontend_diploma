import { apiClient } from "@shared/api";
import type { OrganizationSocialLink } from "../model/types";

interface OrganizationUpdateCoordinates {
  latitude: number;
  longitude: number;
  regionKey?: string | null;
  regionLabel?: string | null;
}

export interface UpdateOrganizationDto {
  id: string;
  name: string;
  description: string;
  startAt?: string | null;
  contactEmail?: string | null;
  phoneNumber?: string | null;
  website?: string | null;
  socialLinks?: OrganizationSocialLink[];
  location?: OrganizationUpdateCoordinates | null;
  joinPolicy?: string | null;
  leavePolicy?: string | null;
}

export const updateOrganization = async (payload: UpdateOrganizationDto) => {
  const requestBody = {
    Id: payload.id,
    Name: payload.name,
    Description: payload.description,
    StartAt: payload.startAt ?? null,
    ContactEmail: payload.contactEmail ?? null,
    PhoneNumber: payload.phoneNumber ?? null,
    Website: payload.website ?? null,
    SocialLinks: payload.socialLinks ?? [],
    Location: payload.location
      ? {
          Latitude: payload.location.latitude,
          Longitude: payload.location.longitude,
          RegionKey: payload.location.regionKey ?? null,
          RegionLabel: payload.location.regionLabel ?? null,
        }
      : null,
    JoinPolicy: payload.joinPolicy ?? null,
    LeavePolicy: payload.leavePolicy ?? null,
  };

  await apiClient.put("/Organization/update", requestBody);
};
