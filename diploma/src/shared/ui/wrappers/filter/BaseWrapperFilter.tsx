import { useTranslation } from "react-i18next";
import styles from "./BaseWrapperFilter.module.scss";

interface BaseWrapperFilterProps {
  children: React.ReactNode;
}
export const BaseWrapperFilter = ({ children }: BaseWrapperFilterProps) => {
  const { t } = useTranslation("common");
  return (
    <div className={styles.baseWrapperFilter}>
      <div className={styles.topContent}>
        <h1>{t("filters.title")}</h1>
        <div className={styles.line} />
      </div>
      {children}
    </div>
  );
};
