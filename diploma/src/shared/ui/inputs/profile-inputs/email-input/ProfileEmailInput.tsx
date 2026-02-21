import React from "react";
import { BaseInput } from "../../base-input/BaseInput";
import styles from "./ProfileEmailInput.module.scss";

interface ProfileEmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  variant?: "default" | "profile" | "verification";
}

export const ProfileEmailInput: React.FC<ProfileEmailInputProps> = ({
  variant = "profile",
  ...props
}) => {
  return (
    <BaseInput
      error={props.error}
      type="email"
      variant={variant}
      mode="email"
      {...props}
    >
      <span className={styles.profileEmailIcon}>
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
      <span className={styles.emailInputProfileDivider}></span>
    </BaseInput>
  );
};
