import { CONNECTED_LINKS_CONFIG, ConnectedLink } from "@entities/user/profile";
import { useUnlinkConnectedLink } from "../model/useUnlinkConnectedLink";
import { useGoogleLogin } from "@react-oauth/google";

export const ConnectedLinks = () => {
  const { handleUnlink, isLoading, activePlatform } = useUnlinkConnectedLink();

  const dataLinks = [
    { platform: "google", isConnected: true },
    { platform: "apple", isConnected: true },
  ];

  const parsedValues = dataLinks.map(({ platform, isConnected }) => {
    const config = CONNECTED_LINKS_CONFIG.find((c) => c.platform === platform)!;

    return { ...config, isConnected };
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
    flow: "auth-code",
  });

  return (
    <>
      <button type="button" onClick={login}>
        somethinbg
      </button>
      {parsedValues.map((link) => (
        <>
          <ConnectedLink
            key={link?.platform}
            platform={link?.platform}
            description={link?.linkDescriprion}
            image={link?.imageLink}
            isConnected={link?.isConnected}
            title={link?.linkTitle}
            isPending={isLoading && activePlatform === link.platform}
            handleMutation={handleUnlink}
          />
        </>
      ))}
    </>
  );
};
