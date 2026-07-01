import type { LucideIcon } from "lucide-react";
import type { AdminUsersStyles } from "../../model/types";

interface DrawerInfoCardProps {
  styles: AdminUsersStyles;
  icon: LucideIcon;
  value: string;
  label: string;
}

export const DrawerInfoCard = ({
  styles,
  icon: Icon,
  value,
  label,
}: DrawerInfoCardProps) => (
  <span className={styles.drawerInfoCard}>
    <span className={styles.drawerInfoCardIconWrap}>
      <Icon
        className={styles.drawerInfoCardIcon}
        size={20}
        aria-hidden="true"
      />
    </span>
    <strong>{value}</strong>
    <small>{label}</small>
  </span>
);
