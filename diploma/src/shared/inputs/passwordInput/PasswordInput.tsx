import React, { useState } from "react";
import { BaseInput } from "./../baseInput/BaseInput";
import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";
import styles from "./PasswordInput.module.scss";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? "text" : "password";

  return (
    <BaseInput {...props} type={inputType} originalType="password">
      <button
        type="button"
        className={styles.eyeButton}
        onClick={() => setShowPassword(!showPassword)}
      >
        <Icon
          path={showPassword ? mdiEyeOff : mdiEye}
          size={1}
          color="rgba(0,0,0,0.6)"
        />
      </button>
    </BaseInput>
  );
};
