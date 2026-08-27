import { UserRound } from "lucide-react";
import { formatAdminDate, type AdminRequestListItem } from "@entities/admin";
import { getShortId } from "../../requests-config/libs/requestDrawerHelpers";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface DrawerRequesterCardProps {
  request: AdminRequestListItem;
}

export const DrawerRequesterCard = ({ request }: DrawerRequesterCardProps) => {
  const { t } = useTranslation("admin");

  return (
    <section className={styles.drawerSection}>
      <div className={styles.drawerSectionLabel}>
        {t("requests.drawer.requester")}
      </div>
      <div className={styles.drawerPersonCard}>
        <span className={styles.drawerPersonAvatar}>
          <UserRound size={19} aria-hidden="true" />
        </span>
        <div>
          <strong title={request.userId}>{getShortId(request.userId)}</strong>
          <span>
            {t("requests.drawer.submitted")}{" "}
            {formatAdminDate(request.createdAt)}
          </span>
        </div>
      </div>
    </section>
  );
};
