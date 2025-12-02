import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ShowMoreItemsButton.module.scss";

interface ShowMoreItemsButtonProps {
  items: React.ReactNode[];
  initialVisibleCount?: number;
  className?: string;
  classNameButton?: string;
  buttonText?: string;
  buttonTextCollapsed?: string;
}

export function ShowMoreItemsButton({
  items,
  initialVisibleCount = 6,
  className = "",
  classNameButton = "",
  buttonText = "Show more",
  buttonTextCollapsed = "Show less",
}: ShowMoreItemsButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreItems = items.length > initialVisibleCount;
  const visibleItems =
    hasMoreItems && !isExpanded ? items.slice(0, initialVisibleCount) : items;

  return (
    <div className={`${styles.showMoreContainer} ${className}`}>
      <div className={styles.itemsGrid}>
        <AnimatePresence mode="sync">
          {visibleItems.map((item, index) => (
            <motion.div
              key={index}
              className={styles.test}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.4,
                delay: isExpanded
                  ? index * 0.03
                  : (visibleItems.length - index - 1) * 0.03,
                ease: [0.4, 0, 0.2, 1],
              }}
              layout
            >
              {item}
            </motion.div>
          ))}

          {hasMoreItems && (
            <motion.button
              key="show-more-btn"
              className={`${styles.showMoreButton} ${classNameButton}`}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              onClick={() => setIsExpanded(!isExpanded)}
              type="button"
              layout
            >
              {isExpanded ? buttonTextCollapsed : buttonText}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
