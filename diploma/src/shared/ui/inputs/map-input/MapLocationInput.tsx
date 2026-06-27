import { FullSizeIcon } from "@shared/assets/icons/actions";
import styles from "./MapLocationInput.module.scss";
import { MapIcon } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("common");
  return (
    <div className={`${styles.mapLocationWrapper} ${variantClass}`}>
      <div className={styles.leftMapContent}>
        <span className={styles.mapIconBlock}>
          <MapIcon className={styles.mapIcon} />
        </span>

        <span className={styles.divider}></span>
        <h1 title={label ?? t("filters.setDistanceLocationPlaceholder")}>
          {label ?? t("filters.setDistanceLocationPlaceholder")}
        </h1>
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
