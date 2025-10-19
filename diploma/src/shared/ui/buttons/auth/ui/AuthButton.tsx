import React from "react";
import styles from "./../styles/AuthButton.module.scss";
import { BaseButtonWrapper } from "../../base";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  loading = false,
  label = "Sign in",
}) => {
  return (
    <BaseButtonWrapper loading={loading} className={styles.buttonLogin}>
      {label}
    </BaseButtonWrapper>
  );
};
