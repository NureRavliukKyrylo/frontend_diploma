import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./ShowMoreItemsButton.module.scss";
import { useTranslation } from "react-i18next";

interface ShowMoreItemsButtonProps {
  items: React.ReactNode[];
  initialVisibleCount?: number;
  className?: string;
  classNameButton?: string;
  classNameItems?: string;
  buttonContent?: ReactNode;
  buttonPosition?: "inline" | "below";
}

export function ShowMoreItemsButton({
  items,
  initialVisibleCount = 6,
  className = "",
  classNameButton = "",
  buttonContent,
  buttonPosition = "inline",
  classNameItems = "",
}: ShowMoreItemsButtonProps) {
  const { t } = useTranslation(["common"]);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMoreItems = items.length > initialVisibleCount;
  const visibleItems =
    hasMoreItems && !isExpanded ? items.slice(0, initialVisibleCount) : items;

  const resolvedButtonContent =
    buttonContent ??
    t("common:actions.showMore", { defaultValue: "Show more" });

  const button = hasMoreItems && !isExpanded && (
    <motion.button
      className={`${styles.showMoreButton} ${classNameButton}`}
      onClick={() => setIsExpanded(true)}
      type="button"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ ease: "easeInOut", duration: 0.15 }}
    >
      {resolvedButtonContent}
    </motion.button>
  );

  return (
    <div className={`${styles.showMoreContainer} ${className}`}>
      <div className={`${styles.itemsList} ${classNameItems}`}>
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

        {buttonPosition === "inline" && button}
      </div>

      {buttonPosition === "below" && button}
    </div>
  );
}
