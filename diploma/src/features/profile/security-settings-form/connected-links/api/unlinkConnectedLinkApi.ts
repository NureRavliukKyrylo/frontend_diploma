import type { ConnectedLinkPlatform } from "@entities/user/profile";
import { apiClient } from "@shared/api";

export const unlinkConnectedLink = async (
  connectedLink: ConnectedLinkPlatform,
) => {
  const response = await apiClient.post(
    `Auth/${connectedLink}/unlink/request-code`,
  );
  return response.data;
};
