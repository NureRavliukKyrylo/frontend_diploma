import React from "react";
import styles from "./CheckBox.module.scss";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  ...props
}) => {
  return (
    <input
      className={styles.checkBox}
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
};
