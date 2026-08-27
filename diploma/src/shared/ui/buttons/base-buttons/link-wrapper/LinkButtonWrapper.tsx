import React from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import styles from "./LinkButtonWrapper.module.scss";

interface LinkButtonWrapperProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const LinkButtonWrapper: React.FC<LinkButtonWrapperProps> = ({
  children,
  className = "",
  disabled,
  ...props
}) => {
  return (
    <Link
      className={`${styles.linkCommonButton} ${className}`}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </Link>
  );
};
