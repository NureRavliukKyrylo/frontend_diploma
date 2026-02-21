import React from "react";
import { BaseInput } from "../../base-input/BaseInput";

interface ProfilePasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  variant?: "default" | "profile" | "verification";
}

export const ProfilePasswordInput: React.FC<ProfilePasswordInputProps> = ({
  error,
  variant = "profile",
  ...props
}) => {
  return (
    <BaseInput
      {...props}
      type="password"
      error={error}
      variant={variant}
      mode="password"
    ></BaseInput>
  );
};
