import styles from "./OrganizationTab.module.scss";

interface OrganizationTabProps {
  name: string;
  isSelected?: boolean;
  onClick?: (name: string) => void;
}

export const OrganizationTab = ({
  name,
  isSelected,
  onClick,
}: OrganizationTabProps) => {
  return (
    <div
      className={`${styles.organizationTabBlock} ${isSelected ? styles.selected : ""} ${onClick ? styles.clickable : ""}`}
      onClick={() => onClick?.(name)}
    >
      <h1 className={styles.organizationNameText}>{name}</h1>
    </div>
  );
};
