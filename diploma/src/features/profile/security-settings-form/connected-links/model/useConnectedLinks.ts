import { CONNECTED_LINKS_CONFIG, profileQuery } from "@entities/user/profile";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useUnlinkConnectedLink } from "./useUnlinkConnectedLink";
import { useLinkGoogle } from "./useLinkGoogle";

export const useConnectedLinks = () => {
  const { data: user } = useSuspenseQuery(profileQuery.all());

  const {
    handleUnlink,
    isLoading: isUnlinking,
    activePlatform,
  } = useUnlinkConnectedLink();

  const { loginWithGoogle: linkGoogle, isLoading: isLinkingGoogle } =
    useLinkGoogle();

  const providerLinkActions = {
    google: linkGoogle,
  } as const;

  const links = CONNECTED_LINKS_CONFIG.map((config) => {
    const userConnection = user.connectedServices.find(
      (s) => s.provider === config.provider,
    );

    const connected = userConnection?.connected ?? false;

    const action = connected
      ? () => handleUnlink(config.provider)
      : providerLinkActions[config.provider];

    const isPending = connected
      ? isUnlinking && activePlatform === config.provider
      : config.provider === "google" && isLinkingGoogle;

    return {
      ...config,
      connected,
      action,
      isPending,
    };
  });

  return { links };
};
