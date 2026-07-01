import { formatAdminDate, type AdminUserListItem } from "@entities/admin";
import { Calendar, UserRound } from "lucide-react";
import type { AdminUsersStyles } from "../../model/types";
import { DrawerInfoCard } from "./DrawerInfoCard";
import { useTranslation } from "react-i18next";

interface DrawerInfoGridProps {
  styles: AdminUsersStyles;
  user: AdminUserListItem;
}

export const DrawerInfoGrid = ({ styles, user }: DrawerInfoGridProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.drawerInfoGrid}>
      <DrawerInfoCard
        styles={styles}
        icon={UserRound}
        value={user.roleName || t("users.role.roles.User")}
        label={t("users.drawer.systemRole")}
      />
      <DrawerInfoCard
        styles={styles}
        icon={Calendar}
        value={formatAdminDate(user.registeredAt)}
        label={t("users.drawer.registered")}
      />
    </div>
  );
};
