import { ConnectedLink } from "@entities/user/profile";
import { useConnectedLinks } from "../model/useConnectedLinks";

export const ConnectedLinks = () => {
  const { links } = useConnectedLinks();

  return (
    <>
      {links.map((link) => (
        <>
          <ConnectedLink
            key={link?.provider}
            description={link?.linkDescriprion}
            image={link?.imageLink}
            isConnected={link?.connected}
            title={link?.linkTitle}
            isPending={link?.isPending}
            handleMutation={link.action}
          />
        </>
      ))}
    </>
  );
};
