import React from "react";
import styles from "./ProfileBaseInput.module.scss";

interface ProfileBaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  originalType?: string;
  children?: React.ReactNode;
  placeholder?: string;
}

export const ProfileBaseInput: React.FC<ProfileBaseInputProps> = ({
  error,
  type,
  originalType,
  value,
  defaultValue,
  children,
  placeholder,
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
          placeholder={placeholder}
          {...props}
        />
        {children}
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
