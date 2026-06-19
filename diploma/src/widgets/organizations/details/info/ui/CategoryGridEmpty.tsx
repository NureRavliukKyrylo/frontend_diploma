import { motion, type Variants } from "framer-motion";
import { Grid3X3 } from "lucide-react";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridEmptyProps {
  containerVariants: Variants;
}

export const CategoryGridEmpty = ({
  containerVariants,
}: CategoryGridEmptyProps) => (
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
        <h4>No categories yet</h4>
        <p>This organization does not have categorized activities yet.</p>
      </div>
    </div>
  </motion.section>
);
