import type { AdminQueueItem } from "@entities/admin";
import { Gift } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { AdminUsersStyles } from "../../model/types";
import { RequestRow } from "../../ui/RequestRow";

interface DrawerRecentRequestsSectionProps {
  styles: AdminUsersStyles;
  requests: AdminQueueItem[];
}

export const DrawerRecentRequestsSection = ({
  styles,
  requests,
}: DrawerRecentRequestsSectionProps) => {
  const { t } = useTranslation(["admin", "common"]);

  return (
    <div className={styles.drawerSection}>
      <div className={styles.drawerSectionTitle}>
        {t("admin:users.drawer.recentRequests")}
      </div>
      {requests.length ? (
        <div className={styles.requestList}>
          {requests.map((item) => (
            <RequestRow
              key={item.requestId}
              styles={styles}
              item={item}
              t={t}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyRequests}>
          <Gift size={20} aria-hidden="true" />
          <span>{t("admin:users.drawer.requestsEmpty")}</span>
        </div>
      )}
    </div>
  );
};
