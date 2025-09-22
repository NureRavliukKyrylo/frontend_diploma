import { useState } from "react";
import styles from "./DropdownMenu.module.scss";

interface CustomSelectProps<T> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (val: T) => void;
  disabled?: boolean;
}

export const DropdownMenu = <T extends string | number>({
  value,
  options,
  onChange,
  disabled = false,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className={styles.customSelectWrapper}>
      <button
        type="button"
        className={styles.selectUpdateLevel}
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
        <span className={styles.arrow} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              className={styles.option}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
