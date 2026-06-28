import { formatDrawerValue } from "../../requests-config/libs/requestDrawerHelpers";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface DrawerInfoRowProps {
  label: string;
  value: string | number | null | undefined;
}

export const DrawerInfoRow = ({ label, value }: DrawerInfoRowProps) => {
  const displayValue = formatDrawerValue(value);
  const title = typeof value === "string" ? value : undefined;

  return (
    <div className={styles.drawerInfoRow}>
      <span>{label}</span>
      <strong title={title}>{displayValue}</strong>
    </div>
  );
};
