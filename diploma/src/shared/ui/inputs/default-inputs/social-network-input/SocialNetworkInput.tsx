import React from "react";
import { BaseInput } from "../../base-input/BaseInput";
import styles from "./SocialNetworksInput.module.scss";
import { Switch } from "@heroui/react";

interface SocialNetworksInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
  icon?: string;
  switchValue?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

export const SocialNetworksInput: React.FC<SocialNetworksInputProps> = ({
  icon,
  error,
  switchValue,
  onSwitchChange,
  ...props
}) => {
  return (
    <BaseInput type="text" mode="social" error={error} {...props}>
      {icon && (
        <span className={styles.iconWrapper}>
          <img src={icon} alt="iconSocial" />
        </span>
      )}

      {icon && <span className={styles.socialDivider}></span>}

      <span className={styles.switchWrapper}>
        <Switch
          isSelected={switchValue}
          onValueChange={onSwitchChange}
          aria-label="Visibility toggle"
          classNames={{
            base: "scale-80 sm:scale-90 lg:scale-110",
            wrapper: "bg-[rgba(44,44,44,0.6)]",
          }}
        />
      </span>
    </BaseInput>
  );
};
