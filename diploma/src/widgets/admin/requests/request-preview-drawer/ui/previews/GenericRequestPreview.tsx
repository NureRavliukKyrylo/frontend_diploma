import { AlertTriangle } from "lucide-react";
import type { AdminRequestListItem } from "@entities/admin";
import { getCompactEntityLabel } from "../../../requests-config/libs/requestDrawerHelpers";
import { requestTypeLabels } from "../../../requests-config/libs/requestTypeConfig";
import { DrawerInfoRow } from "../DrawerInfoRow";
import { BadgeRequestPreview } from "./BadgeRequestPreview";
import { MembershipRequestPreview } from "./MembershipRequestPreview";
import { ModerationRequestPreview } from "./ModerationRequestPreview";
import styles from "../../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface GenericRequestPreviewProps {
  request: AdminRequestListItem;
}

export const GenericRequestPreview = ({
  request,
}: GenericRequestPreviewProps) => {
  const { t } = useTranslation("admin");

  if (request.typeName.includes("Join") || request.typeName.includes("Leave")) {
    return <MembershipRequestPreview request={request} />;
  }

  if (request.typeName === "badgeAward") {
    return <BadgeRequestPreview request={request} />;
  }

  if (request.typeName === "report" || request.typeName === "appeal") {
    return <ModerationRequestPreview request={request} />;
  }

  return (
    <>
      <div className={styles.drawerDecisionCard}>
        <div className={styles.drawerDecisionIcon}>
          <AlertTriangle size={22} aria-hidden="true" />
        </div>
        <div>
          <span>{t("requests.previews.requestDetails")}</span>
          <strong>{t(requestTypeLabels[request.typeName])}</strong>
          <p>{request.description || t("common.notProvided")}</p>
        </div>
      </div>

      <section className={styles.drawerSection}>
        <div className={styles.drawerSectionLabel}>
          {t("requests.previews.requestContext")}
        </div>
        <div className={styles.drawerInfoGrid}>
          <DrawerInfoRow
            label={t("requests.drawer.requester")}
            value={request.userId}
          />
          <DrawerInfoRow
            label={t("requests.drawer.target")}
            value={getCompactEntityLabel(
              request.targetEntityType,
              request.targetEntityId,
            )}
          />
          <DrawerInfoRow
            label={t("requests.drawer.linkedEntity")}
            value={request.linkedEntityId}
          />
          <DrawerInfoRow
            label={t("requests.drawer.source")}
            value={getCompactEntityLabel(
              request.sourceEntityType,
              request.sourceEntityId,
            )}
          />
        </div>
      </section>
    </>
  );
};
