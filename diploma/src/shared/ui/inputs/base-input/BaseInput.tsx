import React, { useEffect, useState } from "react";
import styles from "./BaseInput.module.scss";

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
  variant?: "default" | "profile" | "verification";
  mode?: "default" | "email" | "password" | "social";
  children?: React.ReactNode;
  inputClassName?: string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  activeLabel,
  error,
  type,
  value,
  defaultValue,
  variant = "default",
  mode = "default",
  children,
  inputClassName,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(!!value || !!defaultValue);

  useEffect(() => {
    setHasText(!!value);
  }, [value]);

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

  const isActive = isFocused || hasText;
  const variantClass = variant !== "default" ? styles[variant] : "";

  const modeClass = mode !== "default" ? styles[mode] : "";

  return (
    <div
      className={`${styles.inputWrapper} ${variantClass} ${
        isActive ? styles.focused : ""
      } ${error ? styles.error : ""}`}
    >
      <div className={`${styles.inputContainer} ${variantClass}`}>
        {label && (
          <label className={`${styles.label} ${modeClass}`}>
            {isActive ? activeLabel || label : label}
          </label>
        )}
        <input
          className={`${styles.input} ${modeClass} ${inputClassName || ""}`}
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
      {error && <div className="errorInput">{error}</div>}
    </div>
  );
};
