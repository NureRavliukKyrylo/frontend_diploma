import {
  motion,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import { Grid3X3, RefreshCw } from "lucide-react";
import { getErrorMessage } from "@shared/libs/error-message/format-error/getErrorMessage";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridErrorProps {
  error: unknown;
  refetch: () => unknown;
  containerVariants: Variants;
  buttonHover: TargetAndTransition;
  prefersReducedMotion: boolean;
}

export const CategoryGridError = ({
  error,
  refetch,
  containerVariants,
  buttonHover,
  prefersReducedMotion,
}: CategoryGridErrorProps) => (
  <motion.section
    className={styles.categorySection}
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className={styles.statusCard}>
      <div className={styles.statusIcon}>
        <Grid3X3 aria-hidden="true" />
      </div>
      <div className={styles.statusText}>
        <h4>Unable to load categories</h4>
        <p>{getErrorMessage(error)}</p>
      </div>
      <motion.button
        type="button"
        className={styles.statusAction}
        onClick={() => void refetch()}
        whileHover={prefersReducedMotion ? undefined : buttonHover}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      >
        <RefreshCw aria-hidden="true" />
        <span>Try again</span>
      </motion.button>
    </div>
  </motion.section>
);
