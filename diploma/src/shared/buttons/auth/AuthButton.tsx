import React from "react";
import styles from "./AuthButton.module.scss";

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  loading = false,
  label = "Sign in",
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={loading || props.disabled}
      className={styles.buttonLogin}
      {...props}
    >
      {loading ? "Sending..." : label}
    </button>
  );
};
