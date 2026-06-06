import type { ConnectedService } from "@entities/user/profile";
import { apiClient } from "@shared/api";

export interface UnlinkDto {
  code: string;
}

export const verificationUnlink = async (
  data: UnlinkDto,
  link: ConnectedService,
) => {
  const response = await apiClient.post(`Auth/${link}/unlink/confirm`, data);
  return response.data;
};
