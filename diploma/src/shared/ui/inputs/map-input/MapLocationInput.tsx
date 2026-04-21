import { FullSizeIcon } from "@shared/assets/icons/actions";
import styles from "./MapLocationInput.module.scss";
import { MapIcon } from "@shared/assets/icons/info";

interface MapLocationInputProps {
  label?: string;
  handleMapOpen?: () => void;
  variant?: "default" | "profile" | "editProfile" | "entity";
}

export const MapLocationInput: React.FC<MapLocationInputProps> = ({
  label,
  handleMapOpen,
  variant = "default",
}) => {
  const variantClass = variant !== "default" ? styles[variant] : "";

  return (
    <div className={`${styles.mapLocationWrapper} ${variantClass}`}>
      <div className={styles.leftMapContent}>
        <span className={styles.mapIconBlock}>
          <MapIcon className={styles.mapIcon} />
        </span>

        <span className={styles.divider}></span>
        <h1>{label ?? "Location"}</h1>
      </div>
      {handleMapOpen && (
        <button
          type="button"
          onClick={handleMapOpen}
          className={styles.mapOpenButton}
        >
          <FullSizeIcon className={styles.fullSizeIcon} />
        </button>
      )}
    </div>
  );
};
