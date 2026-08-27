import type { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { ImpactFlowLogo } from "@shared/assets/images/information";
import styles from "./EmptyState.module.scss";

interface OrganizationDetailsEmptyStateProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const OrganizationDetailsEmptyState = ({
  title,
  className,
  ...props
}: OrganizationDetailsEmptyStateProps) => {
  const { t } = useTranslation("organizations");
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
      <p className={styles.title}>
        {title ?? t("details.emptyState.title")}
      </p>
    </div>
  );
};
