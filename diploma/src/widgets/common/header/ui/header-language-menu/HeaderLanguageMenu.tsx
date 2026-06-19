import { LanguageMenu, type LanguageMenuValue } from "@shared/ui";
import { Globe } from "lucide-react";
import styles from "./HeaderLanguageMenu.module.scss";

interface HeaderLanguageMenuProps {
  value: LanguageMenuValue;
  onChange: (language: LanguageMenuValue) => void;
}

export const HeaderLanguageMenu = ({
  value,
  onChange,
}: HeaderLanguageMenuProps) => (
  <LanguageMenu
    className={styles.root}
    triggerClassName={styles.trigger}
    triggerIcon={<Globe className={styles.icon} strokeWidth={2} />}
    tooltip="Language"
    value={value}
    onChange={onChange}
  />
);
