import { useDebounce } from "@shared/libs/hooks";
import styles from "./SearchBar.module.scss";
import { SearchIcon } from "@shared/assets/icons/actions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "projects" | "chat";
  debounce?: number;
}

export const SearchBar = ({
  value,
  onChange,
  variant = "default",
  debounce = 500,
}: SearchBarProps) => {
  const variantClass = variant !== "default" ? styles[variant] : "";
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, debounce);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (debouncedValue === undefined) return;
    onChange?.(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={`${styles.inputContainer} ${variantClass}`}>
      <input
        type="text"
        placeholder={t("search.title")}
        className={`${styles.input} ${variantClass}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <SearchIcon className={styles.icon} />
    </div>
  );
};
