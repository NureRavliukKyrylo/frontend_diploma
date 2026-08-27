import React from "react";
import styles from "../styles/ButtonLayout.module.scss";

interface ButtonLayoutProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const ButtonLayout: React.FC<ButtonLayoutProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button className={`${styles.buttonLayout} ${className}`} {...props}>
      {children}
    </button>
  );
};
