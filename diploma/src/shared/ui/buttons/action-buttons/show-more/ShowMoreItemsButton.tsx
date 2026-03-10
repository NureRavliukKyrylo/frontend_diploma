import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ShowMoreItemsButton.module.scss";

interface ShowMoreItemsButtonProps {
  items: React.ReactNode[];
  initialVisibleCount?: number;
  className?: string;
  classNameButton?: string;
  buttonText?: string;
}

export function ShowMoreItemsButton({
  items,
  initialVisibleCount = 6,
  className = "",
  classNameButton = "",
  buttonText = "Show more",
}: ShowMoreItemsButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreItems = items.length > initialVisibleCount;
  const visibleItems =
    hasMoreItems && !isExpanded ? items.slice(0, initialVisibleCount) : items;

  return (
    <div className={`${styles.showMoreContainer} ${className}`}>
      <div className={styles.itemsList}>
        {visibleItems.map((item, index) => (
          <motion.div
            key={index}
            className={styles.itemWrapper}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {item}
          </motion.div>
        ))}

        {hasMoreItems && !isExpanded && (
          <button
            className={`${styles.showMoreButton} ${classNameButton}`}
            onClick={() => setIsExpanded(true)}
            type="button"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
