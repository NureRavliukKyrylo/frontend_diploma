import React from "react";
import styles from "./ProfileBaseInput.module.scss";

interface ProfileBaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  originalType?: string;
  children?: React.ReactNode;
}

export const ProfileBaseInput: React.FC<ProfileBaseInputProps> = ({
  error,
  type,
  originalType,
  value,
  defaultValue,
  children,
  ...props
}) => {
  return (
    <div className={`${styles.inputWrapper} ${error ? styles.error : ""}`}>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${
            originalType ? styles[originalType] : ""
          }`}
          type={type}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
        {children}
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
