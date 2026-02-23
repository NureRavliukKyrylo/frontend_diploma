import styles from "./BackButton.module.scss";
import { Arrow } from "@shared/assets/icons/actions";
import { LinkButtonWrapper } from "../../base-buttons/link-wrapper/LinkButtonWrapper";
import type { LinkProps } from "@tanstack/react-router";

interface BackButtonProps {
  disabled?: boolean;
  className?: string;
  from?: LinkProps["from"];
  to?: LinkProps["to"];
}

export const BackButton = ({ className, from, to = ".." }: BackButtonProps) => {
  return (
    <LinkButtonWrapper
      className={`${styles.prevStepperButton} ${className || ""}`}
      from={from}
      to={to}
    >
      <img src={Arrow} alt="Back" className={styles.arrowIcon} />
    </LinkButtonWrapper>
  );
};
