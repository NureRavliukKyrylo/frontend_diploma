import { formatAdminDate, type AdminUserListItem } from "@entities/admin";
import { Calendar, UserRound } from "lucide-react";
import type { AdminUsersStyles } from "../../model/types";
import { DrawerInfoCard } from "./DrawerInfoCard";

interface DrawerInfoGridProps {
  styles: AdminUsersStyles;
  user: AdminUserListItem;
}

export const DrawerInfoGrid = ({ styles, user }: DrawerInfoGridProps) => (
  <div className={styles.drawerInfoGrid}>
    <DrawerInfoCard
      styles={styles}
      icon={UserRound}
      value={user.roleName || "User"}
      label="System role"
    />
    <DrawerInfoCard
      styles={styles}
      icon={Calendar}
      value={formatAdminDate(user.registeredAt)}
      label="Registered"
    />
  </div>
);
