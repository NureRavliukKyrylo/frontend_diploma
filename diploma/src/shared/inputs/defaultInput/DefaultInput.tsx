import React, { useState } from "react";
import styles from "./DefaultInput.module.scss";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
}

export const DefaultInput: React.FC<DefaultInputProps> = ({
  label,
  error,
  type,
  value,
  defaultValue,
  activeLabel,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(!!value || !!defaultValue);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasText(!!e.target.value);
    props.onChange?.(e);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <>
      <div>
        <div
          className={`${styles.inputWrapper} ${
            isFocused || hasText ? styles.focused : ""
          } ${error ? styles.error : ""}`}
        >
          <div className={styles.inputContainer}>
            {label && (
              <label
                className={`${styles.label} ${
                  type === "email" ? styles.email : ""
                }`}
              >
                {isFocused || hasText ? activeLabel : label}
              </label>
            )}
            {type === "email" && (
              <>
                <span className={styles.emailIcon}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.6668 7.00008C25.6668 5.71675 24.6168 4.66675 23.3335 4.66675H4.66683C3.3835 4.66675 2.3335 5.71675 2.3335 7.00008M25.6668 7.00008V21.0001C25.6668 22.2834 24.6168 23.3334 23.3335 23.3334H4.66683C3.3835 23.3334 2.3335 22.2834 2.3335 21.0001V7.00008M25.6668 7.00008L14.0002 15.1667L2.3335 7.00008"
                      stroke="#1E1E1E"
                      stroke-opacity="0.6"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span className={styles.divider}></span>
              </>
            )}

            <input
              className={`${styles.input} ${
                type === "email" ? styles.email : ""
              }`}
              type={inputType}
              value={value}
              defaultValue={defaultValue}
              {...props}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
            />
            {type === "password" && hasText && (
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon path={mdiEyeOff} size={1} color="rgba(0,0,0,0.6)" />
                ) : (
                  <Icon path={mdiEye} size={1} color="rgba(0,0,0,0.6)" />
                )}
              </button>
            )}
          </div>
        </div>
        {error && <div className="errorInput">{error}</div>}
      </div>
    </>
  );
};
