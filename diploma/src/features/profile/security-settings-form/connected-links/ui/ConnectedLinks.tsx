import { ConnectedLink } from "@entities/user/profile";
import { useConnectedServices } from "../model/useConnectedServices";

export const ConnectedLinks = () => {
  const { services } = useConnectedServices();

  return (
    <>
      {services.map((link) => (
        <>
          <ConnectedLink
            key={link?.id}
            description={link?.description}
            image={link?.imageLink}
            isConnected={link?.connected}
            title={link?.title}
            isPending={link?.isPending}
            handleMutation={link.action}
          />
        </>
      ))}
    </>
  );
};
