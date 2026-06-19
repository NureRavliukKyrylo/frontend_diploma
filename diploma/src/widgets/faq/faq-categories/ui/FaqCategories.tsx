import { motion } from "framer-motion";
import clsx from "clsx";
import type { FaqCategory } from "../../config/faqData";
import styles from "./FaqCategories.module.scss";

interface FaqCategoriesProps {
  active: FaqCategory;
  onChange: (category: FaqCategory) => void;
}

const CATEGORIES: Array<{ value: FaqCategory; label: string }> = [
  { value: "all", label: "All" },
  { value: "account", label: "Account" },
  { value: "timebank", label: "Time Bank" },
  { value: "missions", label: "Missions" },
  { value: "organizations", label: "Organizations" },
  { value: "gamification", label: "Gamification" },
];

export const FaqCategories = ({
  active,
  onChange,
}: FaqCategoriesProps) => (
  <motion.div
    className={styles.categories}
    initial="hidden"
    animate="show"
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.05, delayChildren: 0.34 } },
    }}
    aria-label="Filter frequently asked questions by category"
  >
    {CATEGORIES.map(category => (
      <motion.button
        key={category.value}
        type="button"
        className={clsx(styles.catBtn, {
          [styles.active]: active === category.value,
        })}
        onClick={() => onChange(category.value)}
        variants={{
          hidden: { opacity: 0, y: 10 },
          show: { opacity: 1, y: 0 },
        }}
        whileTap={{ scale: 0.97 }}
        aria-pressed={active === category.value}
      >
        {category.label}
      </motion.button>
    ))}
  </motion.div>
);
