import { useState } from "react";
import styles from "./DropdownMenu.module.scss";

interface CustomSelectProps<T> {
  value: T | null;
  options: { value: T; label: string }[];
  onChange: (val: T) => void;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export const DropdownMenu = <T extends string | number>({
  value,
  options,
  onChange,
  disabled = false,
  placeholder = "Choose your role",
  error,
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (newValue: T) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <>
      <div className={styles.base}>
        <div className={styles.customSelectWrapper}>
          <button
            type="button"
            className={`${styles.selectUpdateLevel} 
          ${isOpen ? styles.open : ""} 
          ${value != null ? styles.selected : ""} 
          ${error ? styles.error : ""}`}
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
          >
            {value == null ? (
              <span className={styles.placeholder}>{placeholder}</span>
            ) : (
              selectedLabel
            )}
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
        {error && <div className="errorInput">{error}</div>}
      </div>
    </>
  );
};
