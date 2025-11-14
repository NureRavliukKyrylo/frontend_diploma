import React from "react";
import styles from "./SocialInputProfile.module.scss";
import { Switch } from "@heroui/react";

interface SocialInputProfileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  switchValue?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  error?: string;
}

export const SocialInputProfile: React.FC<SocialInputProfileProps> = ({
  prefix,
  switchValue,
  onSwitchChange,
  error,
  className,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.inputWrapper} ${error ? styles.error : ""} ${
          className || ""
        }`}
      >
        <div className={styles.inputContainer}>
          {prefix && (
            <div className={styles.prefixBlock}>
              <span className={styles.prefix}>{prefix}</span>
            </div>
          )}
          <input className={styles.input} type="text" {...props} />
          <span className={styles.switchWrapper}>
            <Switch
              isSelected={switchValue}
              onValueChange={onSwitchChange}
              aria-label="Visibility toggle"
              classNames={{
                base: "scale-90",
                wrapper: "bg-[rgba(44,44,44,0.6)]",
              }}
            />
          </span>
        </div>
      </div>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
