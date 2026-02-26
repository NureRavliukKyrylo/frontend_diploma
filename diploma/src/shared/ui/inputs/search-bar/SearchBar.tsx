import styles from "./SearchBar.module.scss";
import { SearchIcon } from "@shared/assets/icons/actions";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "projects";
}

export const SearchBar = ({
  placeholder = "Search",
  value,
  onChange,
  variant = "default",
}: SearchBarProps) => {
  const variantClass = variant !== "default" ? styles[variant] : "";

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder={placeholder}
        className={`${styles.input} ${variantClass}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <img src={SearchIcon} alt="search icon" className={styles.icon} />
    </div>
  );
};
