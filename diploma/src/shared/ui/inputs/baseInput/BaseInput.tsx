import React, { useState } from "react";
import styles from "./BaseInput.module.scss";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
  originalType?: string;
  children?: React.ReactNode;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  activeLabel,
  error,
  type,
  originalType,
  value,
  defaultValue,
  children,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(!!value || !!defaultValue);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasText(!!e.target.value);
    props.onChange?.(e);
  };

  return (
    <div
      className={`${styles.inputWrapper} ${
        isFocused || hasText ? styles.focused : ""
      } ${error ? styles.error : ""}`}
    >
      <div className={styles.inputContainer}>
        {label && (
          <label
            className={`${styles.label} ${
              originalType === "email" ? styles.email : ""
            } ${originalType === "password" ? styles.passwordLabel : ""} ${
              originalType === "social" ? styles.social : ""
            }`}
          >
            {isFocused || hasText ? activeLabel : label}
          </label>
        )}

        <input
          className={`${styles.input} ${
            originalType ? styles[originalType] : ""
          }`}
          type={type}
          value={value}
          defaultValue={defaultValue}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {children}
      </div>
      {error && <div className={styles.errorInput}>{error}</div>}
    </div>
  );
};
