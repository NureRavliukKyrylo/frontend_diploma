import { CalendarClock, Check, CircleDot } from "lucide-react";
import { formatAdminDate, type AdminRequestListItem } from "@entities/admin";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface DrawerAuditTrailProps {
  request: AdminRequestListItem;
}

export const DrawerAuditTrail = ({ request }: DrawerAuditTrailProps) => {
  const { t } = useTranslation("admin");

  return (
    <section className={styles.drawerSection}>
      <div className={styles.drawerSectionLabel}>
        {t("requests.drawer.auditTrail")}
      </div>
      <div className={styles.drawerTimeline}>
        <div className={styles.drawerTimelineItem}>
          <span className={styles.drawerTimelineIcon}>
            <CalendarClock size={15} aria-hidden="true" />
          </span>
          <div>
            <span>{t("requests.drawer.created")}</span>
            <strong>{formatAdminDate(request.createdAt)}</strong>
          </div>
        </div>
        <div className={styles.drawerTimelineItem}>
          <span className={styles.drawerTimelineIcon}>
            <CircleDot size={15} aria-hidden="true" />
          </span>
          <div>
            <span>{t("requests.drawer.updated")}</span>
            <strong>{formatAdminDate(request.updatedAt)}</strong>
          </div>
        </div>
        <div className={styles.drawerTimelineItem}>
          <span className={styles.drawerTimelineIcon}>
            <Check size={15} aria-hidden="true" />
          </span>
          <div>
            <span>{t("requests.drawer.decision")}</span>
            <strong>
              {request.decidedAt
                ? formatAdminDate(request.decidedAt)
                : t("requests.metrics.pending")}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};
