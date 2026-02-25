import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ConnectedLink.module.scss";

interface ConnectedLinkProps {
  isConnected?: boolean;
  title?: string;
  image?: string;
  description?: string;
  isPending: boolean;
  handleMutation?: () => void;
}

export const ConnectedLink = ({
  isConnected,
  title,
  image,
  description,
  isPending,
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
        onClick={handleMutation}
      >
        <h1>{isConnected ? "Connected" : "Disabled"}</h1>
      </BaseButtonWrapper>
    </div>
  );
};
