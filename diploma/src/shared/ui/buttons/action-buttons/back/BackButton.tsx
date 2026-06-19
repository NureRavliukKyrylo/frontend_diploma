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
  params?: LinkProps["params"];
  search?: LinkProps["search"];
}

export const BackButton = ({
  className,
  from,
  to = "..",
  params,
  search,
}: BackButtonProps) => {
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
        params={params}
        search={search}
      >
        <Arrow className={styles.arrowIcon} />
      </LinkButtonWrapper>
    </motion.div>
  );
};
