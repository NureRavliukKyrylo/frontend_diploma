import type { HTMLAttributes } from "react";
import { ImpactFlowLogo } from "@shared/assets/images/information";
import styles from "./EmptyState.module.scss";

interface OrganizationDetailsEmptyStateProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const OrganizationDetailsEmptyState = ({
  title = "NOTHING YET",
  className,
  ...props
}: OrganizationDetailsEmptyStateProps) => {
  const rootClassName = className
    ? `${styles.emptyState} ${className}`
    : styles.emptyState;

  return (
    <div className={rootClassName} {...props}>
      <img
        src={ImpactFlowLogo}
        alt=""
        aria-hidden="true"
        className={styles.image}
      />
      <p className={styles.title}>{title}</p>
    </div>
  );
};
