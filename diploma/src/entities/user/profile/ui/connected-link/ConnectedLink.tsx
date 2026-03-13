import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ConnectedLink.module.scss";
import { motion } from "framer-motion";

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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 150 }}
        className={styles.wrapperConnectButton}
      >
        <BaseButtonWrapper
          type="button"
          disabled={isPending}
          onClick={handleMutation}
          className={`${styles.connectButton} ${isConnected ? styles.active : styles.disabled}`}
        >
          <h1>{isConnected ? "Connected" : "Disabled"}</h1>
        </BaseButtonWrapper>
      </motion.div>
    </div>
  );
};
