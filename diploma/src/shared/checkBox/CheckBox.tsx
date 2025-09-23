import React from "react";
import styles from "./CheckBox.module.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  error,
  children,
  ...props
}) => {
  return (
    <div className={styles.checkBoxContainer}>
      <div className={styles.checkBoxLabel}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={styles.checkBox}
          {...props}
        />
        {children && <div className={styles.checkBoxText}>{children}</div>}
      </div>
      {error && <div className="errorInput">{error}</div>}
    </div>
  );
};
