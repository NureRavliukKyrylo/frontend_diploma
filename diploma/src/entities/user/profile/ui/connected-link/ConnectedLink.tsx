import { BaseButtonWrapper } from "@shared/ui/buttons";
import type { ConnectedLinkPlatform } from "../../config/connectedLinks";
import styles from "./ConnectedLink.module.scss";

interface ConnectedLinkProps {
  platform: ConnectedLinkPlatform;
  isConnected?: boolean;
  title?: string;
  image?: string;
  description?: string;
  isPending: boolean;
  handleMutation: (connectedLink: ConnectedLinkPlatform) => void;
}

export const ConnectedLink = ({
  isConnected,
  title,
  image,
  description,
  isPending,
  platform,
  handleMutation,
}: ConnectedLinkProps) => {
  return (
    <div className={styles.connectedLinkBlock}>
      <div className={styles.connectedLinkPlatform}>
        <img src={image} alt={title} />
        <div className={styles.connectedLinkInfo}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <BaseButtonWrapper
        type="button"
        className={`${styles.connectButton} ${isConnected ? styles.active : styles.disabled}`}
        disabled={isPending}
        onClick={() => {
          if (!isConnected) return;
          handleMutation(platform);
        }}
      >
        <h1>{isConnected ? "Connected" : "Disabled"}</h1>
      </BaseButtonWrapper>
    </div>
  );
};
