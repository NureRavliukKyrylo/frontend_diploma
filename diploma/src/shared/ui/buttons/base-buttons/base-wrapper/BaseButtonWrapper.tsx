import React from "react";
import type { CircularProgressProps } from "@heroui/react";
import styles from "./BaseButtonWrapper.module.scss";
import { BaseSpinner } from "@shared/ui/spinner/BaseSpinner";
import { useTranslation } from "react-i18next";

interface BaseButtonWrapperProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> {
  loading?: boolean;
  children: React.ReactNode;
  showLoadingText?: boolean;
  spinnerColor?: CircularProgressProps["color"];
}

export const BaseButtonWrapper: React.FC<BaseButtonWrapperProps> = ({
  loading = false,
  children,
  className = "",
  spinnerColor = "secondary",
  showLoadingText = true,
  ...props
}) => {
  const { t } = useTranslation("common");
  return (
    <button
      className={`${styles.buttonWrapper} ${loading ? styles.loading : ""} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <BaseSpinner color={spinnerColor} className={styles.spinner} />
      )}
      {loading ? (showLoadingText ? t("loading.title") : null) : children}
    </button>
  );
};
