import { CalendarClock, Check, CircleDot } from "lucide-react";
import { formatAdminDate, type AdminRequestListItem } from "@entities/admin";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface DrawerAuditTrailProps {
  request: AdminRequestListItem;
}

export const DrawerAuditTrail = ({ request }: DrawerAuditTrailProps) => (
  <section className={styles.drawerSection}>
    <div className={styles.drawerSectionLabel}>Audit trail</div>
    <div className={styles.drawerTimeline}>
      <div className={styles.drawerTimelineItem}>
        <span className={styles.drawerTimelineIcon}>
          <CalendarClock size={15} aria-hidden="true" />
        </span>
        <div>
          <span>Created</span>
          <strong>{formatAdminDate(request.createdAt)}</strong>
        </div>
      </div>
      <div className={styles.drawerTimelineItem}>
        <span className={styles.drawerTimelineIcon}>
          <CircleDot size={15} aria-hidden="true" />
        </span>
        <div>
          <span>Updated</span>
          <strong>{formatAdminDate(request.updatedAt)}</strong>
        </div>
      </div>
      <div className={styles.drawerTimelineItem}>
        <span className={styles.drawerTimelineIcon}>
          <Check size={15} aria-hidden="true" />
        </span>
        <div>
          <span>Decision</span>
          <strong>
            {request.decidedAt ? formatAdminDate(request.decidedAt) : "Pending"}
          </strong>
        </div>
      </div>
    </div>
  </section>
);
