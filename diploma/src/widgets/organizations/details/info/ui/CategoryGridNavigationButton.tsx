import { motion, type TargetAndTransition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridNavigationButtonProps {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
  buttonHover: TargetAndTransition;
  prefersReducedMotion: boolean;
}

export const CategoryGridNavigationButton = ({
  direction,
  disabled,
  onClick,
  buttonHover,
  prefersReducedMotion,
}: CategoryGridNavigationButtonProps) => {
  const isPrevious = direction === "previous";

  return (
    <motion.button
      type="button"
      className={`${styles.carouselNavButton} ${
        isPrevious
          ? styles.carouselNavButtonLeft
          : styles.carouselNavButtonRight
      } ${disabled ? styles.carouselNavButtonDisabled : ""}`}
      aria-label={`${isPrevious ? "Previous" : "Next"} category group`}
      disabled={disabled}
      onClick={onClick}
      whileHover={
        prefersReducedMotion || disabled ? undefined : buttonHover
      }
      whileTap={
        prefersReducedMotion || disabled ? undefined : { scale: 0.97 }
      }
    >
      {isPrevious ? (
        <ChevronLeft aria-hidden="true" />
      ) : (
        <ChevronRight aria-hidden="true" />
      )}
    </motion.button>
  );
};
