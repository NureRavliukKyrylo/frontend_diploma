import { Award } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { getCompactEntityLabel } from "../../../requests-config/libs/requestDrawerHelpers";
import { DrawerInfoRow } from "../DrawerInfoRow";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";

interface BadgeRequestPreviewProps {
  request: AdminRequestListItem;
}

export const BadgeRequestPreview = ({ request }: BadgeRequestPreviewProps) => (
  <>
    <div className={styles.drawerDecisionCard}>
      <div className={styles.drawerDecisionIcon}>
        <Award size={23} aria-hidden="true" />
      </div>
      <div>
        <span>Recognition review</span>
        <strong>Badge award request</strong>
        <p>
          {request.description ||
            "Confirm the recipient and linked achievement before approving this award."}
        </p>
      </div>
    </div>

    <section className={styles.drawerSection}>
      <div className={styles.drawerSectionLabel}>Award context</div>
      <div className={styles.drawerInfoGrid}>
        <DrawerInfoRow label="Recipient" value={request.userId} />
        <DrawerInfoRow
          label="Badge target"
          value={getCompactEntityLabel(request.targetEntityType, request.targetEntityId)}
        />
        <DrawerInfoRow label="Linked proof" value={request.linkedEntityId} />
        <DrawerInfoRow
          label="Priority minutes"
          value={request.priorityBoostMinutesReserved}
        />
      </div>
    </section>
  </>
);
