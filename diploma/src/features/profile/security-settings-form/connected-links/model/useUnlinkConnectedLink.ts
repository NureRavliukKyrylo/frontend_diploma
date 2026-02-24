import { useMutation } from "@tanstack/react-query";
import { unlinkConnectedLink } from "../api/unlinkConnectedLinkApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import {
  CONNECTED_LINKS_CONFIG,
  type ConnectedLinkPlatform,
} from "@entities/user/profile";
import { useUserProfileStore } from "@entities/user";

export const useUnlinkConnectedLink = () => {
  const { setUnlinkTarget, openVerificationModal } = useUserProfileStore();
  const mutation = useMutation({
    mutationFn: (platform: ConnectedLinkPlatform) =>
      unlinkConnectedLink(platform),
    onSuccess: (_, platform) => {
      addToast({
        title: `Unlink ${platform} request success`,
        description: "You have sent request to unlink successfully",
        color: "success",
      });
      const config = CONNECTED_LINKS_CONFIG.find(
        (c) => c.platform === platform,
      )!;

      setUnlinkTarget(platform, config.otpType);
      openVerificationModal("unlink");
    },
    onError: (error: unknown, platform) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: `Unlink ${platform} failed`,
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    handleUnlink: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    activePlatform: mutation.variables,
  };
};
