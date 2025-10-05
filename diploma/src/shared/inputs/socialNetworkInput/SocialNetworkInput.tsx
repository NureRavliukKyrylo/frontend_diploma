import React from "react";
import { BaseInput } from "../baseInput/BaseInput";
import styles from "./SocialNetworksInput.module.scss";
import { Switch } from "@heroui/react";

interface SocialNetworksInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  activeLabel?: string;
  error?: string;
  icon?: string;
}

export const SocialNetworksInput: React.FC<SocialNetworksInputProps> = ({
  icon,
  ...props
}) => {
  return (
    <BaseInput type="text" originalType="social" {...props}>
      {icon && (
        <span className={styles.iconWrapper}>
          <img src={icon} alt="iconSocial" />
        </span>
      )}

      {icon && <span className={styles.socialDivider}></span>}

      <span className={styles.switchWrapper}>
        <Switch
          defaultSelected
          aria-label="Automatic updates"
          classNames={{
            wrapper: `
      bg-[rgba(44,44,44,0.6)]           
      transition-all
    `,
          }}
        />
      </span>
    </BaseInput>
  );
};
