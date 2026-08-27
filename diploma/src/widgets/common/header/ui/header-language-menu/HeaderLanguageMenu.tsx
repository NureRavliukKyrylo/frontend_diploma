import { LanguageMenu, type LanguageMenuValue } from "@shared/ui";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./HeaderLanguageMenu.module.scss";

interface HeaderLanguageMenuProps {
  value: LanguageMenuValue;
  onChange: (language: LanguageMenuValue) => void;
}

export const HeaderLanguageMenu = ({
  value,
  onChange,
}: HeaderLanguageMenuProps) => {
  const { t } = useTranslation("common");

  return (
    <LanguageMenu
      className={styles.root}
      triggerClassName={styles.trigger}
      triggerIcon={<Globe className={styles.icon} strokeWidth={2} />}
      tooltip={t("header.language")}
      value={value}
      onChange={onChange}
    />
  );
};
