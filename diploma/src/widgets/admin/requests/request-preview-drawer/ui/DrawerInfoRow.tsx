import { formatDrawerValue } from "../../requests-config/libs/requestDrawerHelpers";
import { useTranslation } from "react-i18next";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface DrawerInfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

export const DrawerInfoRow = ({ label, value }: DrawerInfoRowProps) => {
  const { t } = useTranslation("admin");
  const displayValue = formatDrawerValue(value, t("common.notProvided"));
  const title = typeof value === "string" ? value : undefined;

  return (
    <div className={styles.drawerInfoRow}>
      <span>{label}</span>
      <strong title={title}>{displayValue}</strong>
    </div>
  );
};
