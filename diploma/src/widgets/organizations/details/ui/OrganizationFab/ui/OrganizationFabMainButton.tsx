import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "../OrganizationFab.module.scss";

interface OrganizationFabMainButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const OrganizationFabMainButton = ({
  isOpen,
  onClick,
}: OrganizationFabMainButtonProps) => {
  const { t } = useTranslation("organizations");

  return (
    <motion.button
    type="button"
    className={`${styles.mainButton} ${isOpen ? styles.mainButtonOpen : ""}`}
    aria-label={isOpen ? t("fab.close") : t("fab.open")}
    aria-expanded={isOpen}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
  >
    {!isOpen ? (
      <>
        <span className={styles.pulseRing} aria-hidden="true" />
        <span className={styles.pulseRingDelayed} aria-hidden="true" />
      </>
    ) : null}

    <Plus
      className={`${styles.mainIcon} ${isOpen ? styles.mainIconHidden : ""}`}
      size="1em"
      strokeWidth={2.8}
    />
    <X
      className={`${styles.mainIcon} ${styles.closeIcon} ${
        isOpen ? styles.closeIconVisible : ""
      }`}
      size="1em"
      strokeWidth={2.8}
    />
    </motion.button>
  );
};
