import React from "react";
import { CircularProgress } from "@heroui/react";
import styles from "./BaseButtonWrapper.module.scss";

interface BaseButtonWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export const BaseButtonWrapper: React.FC<BaseButtonWrapperProps> = ({
  loading = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.buttonWrapper} ${
        loading ? styles.loading : ""
      } ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <CircularProgress color="secondary" className={styles.spinner} />
      )}
      <span className={styles.content}>
        {loading ? "Sending..." : children}
      </span>
    </button>
  );
};
