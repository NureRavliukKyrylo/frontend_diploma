import React from "react";
import { BaseInput } from "./../baseInput/BaseInput";
import styles from "./EmailInput.module.scss";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
}

export const EmailInput: React.FC<EmailInputProps> = (props) => {
  return (
    <BaseInput type="email" originalType="email" {...props}>
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
            strokeOpacity="0.6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.divider}></span>
    </BaseInput>
  );
};
