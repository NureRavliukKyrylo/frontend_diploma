import React from "react";
import { BaseInput } from "../../base-input/BaseInput";
import styles from "./ProfileSocialNetworksInput.module.scss";
import { Switch } from "@shared/ui";

interface ProfileSocialNetworksInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: string;
  switchValue?: boolean;
  onSwitchChange?: (checked: boolean) => void;
}

export const ProfileSocialNetworksInput: React.FC<
  ProfileSocialNetworksInputProps
> = ({ icon, error, switchValue, onSwitchChange, ...props }) => {
  return (
    <BaseInput
      type="text"
      variant="profile"
      mode="social"
      error={error}
      {...props}
    >
      {icon && (
        <span className={styles.iconProfileInputWrapper}>
          <img src={icon} alt="iconProfileSocial" />
        </span>
      )}

      {icon && <span className={styles.socialProfileInputDivider}></span>}

      <span className={styles.switchProfileInputWrapper}>
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
