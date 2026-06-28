import { LogIn, LogOut, MessageSquareText } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import {
  getCompactEntityLabel,
  getRequestEntityName,
} from "../../../requests-config/libs/requestDrawerHelpers";
import { DrawerInfoRow } from "../DrawerInfoRow";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";

interface MembershipRequestPreviewProps {
  request: AdminRequestListItem;
}

export const MembershipRequestPreview = ({
  request,
}: MembershipRequestPreviewProps) => {
  const isLeave = request.typeName.includes("Leave");
  const entityName = getRequestEntityName(request);

  return (
    <>
      <div className={styles.drawerDecisionCard}>
        <div className={styles.drawerDecisionIcon}>
          {isLeave ? (
            <LogOut size={22} aria-hidden="true" />
          ) : (
            <LogIn size={22} aria-hidden="true" />
          )}
        </div>
        <div>
          <span>{isLeave ? "Exit request" : "Access request"}</span>
          <strong>
            {isLeave
              ? `Member leaves this ${entityName}`
              : `Member wants to join this ${entityName}`}
          </strong>
          <p>
            {request.description ||
              (isLeave
                ? "No additional reason was provided for this leave request."
                : "No additional note was provided for this join request.")}
          </p>
        </div>
      </div>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>Membership context</div>
        <div className={styles.drawerInfoGrid}>
          <DrawerInfoRow label="Member" value={request.userId} />
          <DrawerInfoRow
            label={`${entityName} target`}
            value={getCompactEntityLabel(request.targetEntityType, request.targetEntityId)}
          />
          <DrawerInfoRow label="Linked entity" value={request.linkedEntityId} />
          <DrawerInfoRow
            label="Source"
            value={getCompactEntityLabel(request.sourceEntityType, request.sourceEntityId)}
          />
        </div>
      </section>

      {request.decisionComment && (
        <section className={styles.drawerSection}>
          <div className={styles.drawerSectionLabel}>Decision note</div>
          <div className={styles.drawerNoteCard}>
            <MessageSquareText size={17} aria-hidden="true" />
            <p>{request.decisionComment}</p>
          </div>
        </section>
      )}
    </>
  );
};
