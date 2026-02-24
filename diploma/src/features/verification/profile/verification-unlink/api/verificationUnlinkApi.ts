import type { ConnectedLinkPlatform } from "@entities/user/profile";
import { apiClient } from "@shared/api";

export interface UnlinkDto {
  code: string;
}

export const verificationUnlink = async (
  data: UnlinkDto,
  link: ConnectedLinkPlatform,
) => {
  const response = await apiClient.post(`Auth/${link}/unlink/confirm`, data);
  return response.data;
};
