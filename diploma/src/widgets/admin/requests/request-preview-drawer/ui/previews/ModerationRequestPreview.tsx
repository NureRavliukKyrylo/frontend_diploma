import { Flag, Gavel } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { getCompactEntityLabel } from "../../../requests-config/libs/requestDrawerHelpers";
import { DrawerInfoRow } from "../DrawerInfoRow";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";

interface ModerationRequestPreviewProps {
  request: AdminRequestListItem;
}

export const ModerationRequestPreview = ({
  request,
}: ModerationRequestPreviewProps) => (
  <>
    <div className={styles.drawerDecisionCard}>
      <div className={styles.drawerDecisionIcon}>
        {request.typeName === "report" ? (
          <Flag size={22} aria-hidden="true" />
        ) : (
          <Gavel size={22} aria-hidden="true" />
        )}
      </div>
      <div>
        <span>{request.typeName === "report" ? "Report" : "Appeal"}</span>
        <strong>
          {request.typeName === "report"
            ? "Moderation case signal"
            : "Dispute needs review"}
        </strong>
        <p>
          {request.description ||
            "No additional details were provided with this request."}
        </p>
      </div>
    </div>

    <section className={styles.drawerSection}>
      <div className={styles.drawerSectionLabel}>Case context</div>
      <div className={styles.drawerInfoGrid}>
        <DrawerInfoRow label="Submitted by" value={request.userId} />
        <DrawerInfoRow label="Linked case" value={request.linkedEntityId} />
        <DrawerInfoRow
          label="Target"
          value={getCompactEntityLabel(request.targetEntityType, request.targetEntityId)}
        />
        <DrawerInfoRow
          label="Source"
          value={getCompactEntityLabel(request.sourceEntityType, request.sourceEntityId)}
        />
      </div>
    </section>
  </>
);
