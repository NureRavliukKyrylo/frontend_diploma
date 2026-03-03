import { useDebounce } from "@shared/libs";
import styles from "./SearchBar.module.scss";
import { SearchIcon } from "@shared/assets/icons/actions";
import { useEffect, useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "projects";
  debounce?: number;
}

export const SearchBar = ({
  placeholder = "Search",
  value,
  onChange,
  variant = "default",
  debounce = 500,
}: SearchBarProps) => {
  const variantClass = variant !== "default" ? styles[variant] : "";
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, debounce);

  useEffect(() => {
    if (debouncedValue === undefined) return;
    onChange?.(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder={placeholder}
        className={`${styles.input} ${variantClass}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <img src={SearchIcon} alt="search icon" className={styles.icon} />
    </div>
  );
};
