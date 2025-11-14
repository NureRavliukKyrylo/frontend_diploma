import React from "react";
import { Link } from "@tanstack/react-router";
import styles from "./LinkButtonWrapper.module.scss";

interface LinkButtonWrapperProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const LinkButtonWrapper: React.FC<LinkButtonWrapperProps> = ({
  to,
  children,
  className = "",
  ...props
}) => {
  return (
    <Link
      to={to}
      className={`${styles.linkCommonButton} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};
