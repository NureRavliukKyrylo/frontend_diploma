import styles from "./SearchBar.module.scss";
import { SearchIcon } from "@shared/assets/common";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchBar = ({
  placeholder = "Search",
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <img src={SearchIcon} alt="search icon" className={styles.icon} />
    </div>
  );
};
