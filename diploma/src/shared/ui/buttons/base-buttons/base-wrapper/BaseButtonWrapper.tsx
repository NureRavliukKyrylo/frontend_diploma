import React from "react";
import { CircularProgress } from "@heroui/react";
import styles from "./BaseButtonWrapper.module.scss";

interface BaseButtonWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  spinnerColor?:
    | "secondary"
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger";
}

export const BaseButtonWrapper: React.FC<BaseButtonWrapperProps> = ({
  loading = false,
  children,
  className = "",
  spinnerColor = "secondary",
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
        <CircularProgress
          color={spinnerColor}
          className={styles.spinner}
          classNames={{
            base: "flex justify-center items-center",
            svg: "w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8",
          }}
        />
      )}

      {loading ? "Loading..." : children}
    </button>
  );
};
