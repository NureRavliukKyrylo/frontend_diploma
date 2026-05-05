import styles from "./BackButton.module.scss";
import { Arrow } from "@shared/assets/icons/actions";
import { LinkButtonWrapper } from "../../base-buttons/link-wrapper/LinkButtonWrapper";
import type { LinkProps } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface BackButtonProps {
  disabled?: boolean;
  className?: string;
  from?: LinkProps["from"];
  to?: LinkProps["to"];
}

export const BackButton = ({ className, from, to = ".." }: BackButtonProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <LinkButtonWrapper
        className={`${styles.prevStepperButton} ${className || ""}`}
        from={from}
        to={to}
      >
        <Arrow className={styles.arrowIcon} />
      </LinkButtonWrapper>
    </motion.div>
  );
};
