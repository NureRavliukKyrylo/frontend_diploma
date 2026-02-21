import React from "react";
import type { CircularProgressProps } from "@heroui/react";
import styles from "./BaseButtonWrapper.module.scss";
import { BaseSpinner } from "@shared/ui/spinner/BaseSpinner";

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
  return (
    <button
      className={`${styles.buttonWrapper} ${loading ? styles.loading : ""} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <BaseSpinner color={spinnerColor} className={styles.spinner} />
      )}
      {loading ? (showLoadingText ? "Loading..." : null) : children}
    </button>
  );
};
