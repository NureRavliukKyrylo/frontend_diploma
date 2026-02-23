import styles from "./ConnectedLink.module.scss";

interface ConnectedLinkProps {
  isConnected?: boolean;
  title?: string;
  image?: string;
  description?: string;
}

export const ConnectedLink = ({
  isConnected,
  title,
  image,
  description,
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
      <div
        className={`${styles.connectButton} ${isConnected ? styles.active : styles.disabled}`}
      >
        <h1>{isConnected ? "Connected" : "Disabled"}</h1>
      </div>
    </div>
  );
};
