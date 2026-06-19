import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "../../../shared/filters/Filters.module.scss";

interface OrganizationProjectFiltersFooterProps {
  onReset: () => void;
}

export const OrganizationProjectFiltersFooter = ({
  onReset,
}: OrganizationProjectFiltersFooterProps) => {
  return (
    <div className={styles.buttonClear}>
      <motion.div
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={styles.animationButtonBlock}
      >
        <BaseButtonWrapper onClick={onReset} className={styles.clearFiltersButton}>
          Clear Filters
        </BaseButtonWrapper>
      </motion.div>
    </div>
  );
};
