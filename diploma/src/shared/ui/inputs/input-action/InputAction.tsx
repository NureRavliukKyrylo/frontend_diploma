import React from "react";
import styles from "./InputAction.module.scss";

type InputVariant = "default" | "edit" | "editLocalized";

interface InputWithActionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  action?: React.ReactNode;
  wrapperClassName?: string;
  inputClassName?: string;
  variant?: InputVariant;
}

export const InputAction = ({
  error,
  action,
  wrapperClassName,
  inputClassName,
  variant = "default",
  ...props
}: InputWithActionProps) => {
  return (
    <div className={wrapperClassName}>
      <div className={styles.inputWrapper}>
        <input
          {...props}
          className={`${styles.input} ${styles[variant]} ${inputClassName ?? ""}`}
        />
        {action}
      </div>

      {error && <div className="errorInput">{error}</div>}
    </div>
  );
};
